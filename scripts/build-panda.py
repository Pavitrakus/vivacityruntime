"""Build the local Panda visual asset and a validated kinematic motion study.

Requires: numpy, scipy, trimesh, fast-simplification.
Usage: python scripts/build-panda.py path/to/franka_emika_panda
The source directory must contain panda.xml, LICENSE and assets/*.obj (or *.obj).
This is an offline build step. No IK, physics WASM, remote model fetching, or
scientific performance claims are included in the marketing-site runtime.
"""
from pathlib import Path
import sys
import json
import xml.etree.ElementTree as ET
import numpy as np
import trimesh
from scipy.spatial.transform import Rotation
from scipy.optimize import least_squares

source = Path(sys.argv[1])
out = Path(__file__).resolve().parents[1] / 'public' / 'robot'
out.mkdir(parents=True, exist_ok=True)
root = ET.parse(source / 'panda.xml').getroot()
scene = trimesh.Scene(base_frame='world')
materials = {m.get('name'): [float(v) for v in m.get('rgba').split()] for m in root.findall('asset/material')}
meshes = {m.get('name', Path(m.get('file')).stem): m.get('file') for m in root.findall('asset/mesh')}

def transform(body):
    t = np.eye(4)
    t[:3, 3] = [float(v) for v in body.get('pos', '0 0 0').split()]
    w, x, y, z = [float(v) for v in body.get('quat', '1 0 0 0').split()]
    t[:3, :3] = Rotation.from_quat([x, y, z, w]).as_matrix()
    return t

def build(body, parent):
    name = body.get('name')
    scene.graph.update(frame_to=name, frame_from=parent, matrix=transform(body))
    groups = {}
    for geom in body.findall('geom'):
        if geom.get('class') != 'visual':
            continue
        file = source / meshes[geom.get('mesh')]
        if not file.exists():
            file = source / 'assets' / file.name
        mesh = trimesh.load(file, force='mesh', process=True, skip_materials=True)
        # OBJ normal/UV seams duplicate vertices. Weld those before decimation;
        # simplifying disconnected triangle islands can destroy closed surfaces.
        mesh.merge_vertices(merge_tex=True, merge_norm=True)
        if len(mesh.faces) > 1400:
            mesh = mesh.simplify_quadric_decimation(face_count=max(1400, int(len(mesh.faces) * .26)))
        groups.setdefault(geom.get('material'), []).append(mesh)
    for material, parts in groups.items():
        mesh = trimesh.util.concatenate(parts)
        rgba = materials[material]
        mesh.visual = trimesh.visual.TextureVisuals(material=trimesh.visual.material.PBRMaterial(
            name=material, baseColorFactor=rgba, metallicFactor=.12, roughnessFactor=.4))
        scene.add_geometry(mesh, node_name=name+'_'+material, parent_node_name=name)
    for child in body.findall('body'):
        build(child, name)

build(root.find('worldbody/body'), 'world')
(out / 'panda.glb').write_bytes(scene.export(file_type='glb', include_normals=True))
(out / 'LICENSE').write_bytes((source / 'LICENSE').read_bytes())

# Same serial transforms as the asset; seven revolute Panda joints, local Z.
bodies = [root.find(f'.//body[@name="link{i}"]') for i in range(1, 8)]
fixed = [transform(b) for b in bodies]
hand = transform(root.find('.//body[@name="hand"]'))
tcp = np.eye(4)
tcp[2, 3] = .1034
lower = np.array([-2.8973, -1.7628, -2.8973, -3.0718, -2.8973, -.0175, -2.8973])
upper = np.array([2.8973, 1.7628, 2.8973, -.0698, 2.8973, 3.7525, 2.8973])

def fk(q):
    t = np.eye(4)
    for base, angle in zip(fixed, q):
        r = np.eye(4)
        r[:3, :3] = Rotation.from_rotvec([0, 0, angle]).as_matrix()
        t = t @ base @ r
    return t @ hand @ tcp

down = Rotation.from_euler('x', np.pi).as_matrix()
q = np.array([0, -.4, 0, -2, 0, 1.6, .7854])
max_error = 0

def solve(position):
    global q, max_error
    previous = q.copy()
    def error(angles):
        t = fk(angles)
        return np.r_[8 * (t[:3, 3] - position), Rotation.from_matrix(t[:3, :3].T @ down).as_rotvec(), .0001 * (angles - previous)]
    result = least_squares(error, q, bounds=(lower, upper), max_nfev=100, ftol=1e-10, xtol=1e-10, gtol=1e-10)
    q = result.x
    distance = np.linalg.norm(fk(q)[:3, 3] - position)
    max_error = max(max_error, distance)
    assert distance < .0005, f'Unreachable waypoint: {position}, error {distance}'
    return q.copy()

# time, TCP position, finger opening, object attached. Authored motion, no dynamics.
keyframes = [
    (0, [.38, -.08, .34], .04, False),
    (1.5, [.45, -.19, .20], .04, False),
    (3.1, [.45, -.19, .025], .04, False),
    (3.7, [.45, -.19, .025], .025, True),
    (5.1, [.45, -.19, .26], .025, True),
    (7.4, [.45, .20, .26], .025, True),
    (9, [.45, .20, .04], .025, True),
    (9.6, [.45, .20, .04], .04, False),
    (11, [.45, .20, .26], .04, False),
    (12.6, [.38, -.08, .34], .04, False),
]
frames = []
solve(np.array(keyframes[0][1]))
for index in range(len(keyframes)-1):
    a, b = keyframes[index:index+2]
    for t in np.linspace(a[0], b[0], max(2, round((b[0]-a[0])*20)), endpoint=False):
        u = (t-a[0])/(b[0]-a[0])
        u = u*u*u*(10+u*(-15+6*u))
        position = np.array(a[1])*(1-u) + np.array(b[1])*u
        angles = solve(position)
        frames.append([round(float(t), 5), *[round(float(v), 7) for v in angles], round(a[2]*(1-u)+b[2]*u, 5)])
last = keyframes[-1]
frames.append([last[0], *solve(np.array(last[1])).tolist(), last[2]])
assert max(np.max(np.abs(np.array(b[1:8])-np.array(a[1:8]))) for a,b in zip(frames,frames[1:])) < .15
(out/'motion.json').write_text(json.dumps(frames, separators=(',', ':')))
print(json.dumps({'modelBytes': (out/'panda.glb').stat().st_size, 'motionFrames':len(frames),'maxTcpErrorMeters':max_error}))
