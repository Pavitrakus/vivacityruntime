import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { motionAllowed } from '@/lib/motion-preference';

export type PandaController = {
  point(x: number, y: number): boolean;
  hit(x: number, y: number): boolean;
  highlight(active: boolean): void;
  dispose(): void;
};
type MotionFrame = number[];

/** A kinematic motion study, not a dynamics simulation or autonomous controller. */
export async function createPandaScene(
  host: HTMLElement,
  signal: AbortSignal,
  onUnavailable: () => void,
): Promise<PandaController> {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  let model: THREE.Group;
  let motion: MotionFrame[];
  try {
    const [modelResponse, motionResponse] = await Promise.all([
      fetch('/robot/panda.glb', { signal }),
      fetch('/robot/motion.json', { signal }),
    ]);
    if (!modelResponse.ok || !motionResponse.ok)
      throw new Error('Robot assets unavailable');
    const [buffer, frames] = await Promise.all([
      modelResponse.arrayBuffer(),
      motionResponse.json() as Promise<MotionFrame[]>,
    ]);
    const gltf = await new GLTFLoader().parseAsync(buffer, '');
    model = gltf.scene;
    motion = frames;
  } catch (error) {
    renderer.dispose();
    throw error;
  }
  scene.add(model);
  const meshes = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const track = (object: THREE.Object3D) =>
    object.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        meshes.add(node.geometry);
        for (const m of Array.isArray(node.material)
          ? node.material
          : [node.material])
          materials.add(m);
      }
    });
  track(model);
  const robotMeshes: THREE.Mesh[] = [];
  model.traverse((node) => {
    if (node instanceof THREE.Mesh) robotMeshes.push(node);
  });
  const robotMaterials = [...materials].filter(
    (m): m is THREE.MeshStandardMaterial =>
      m instanceof THREE.MeshStandardMaterial,
  );
  for (const material of robotMaterials) {
    material.roughness = 0.36;
    material.metalness = 0.22;
    if (material.name === 'black') material.color.setHex(0x18202a);
    else if (material.name === 'white' || material.name === 'off_white')
      material.color.setHex(0xcbd0d5);
  }
  const raycaster = new THREE.Raycaster();
  const rayPointer = new THREE.Vector2();
  let hoverTarget = 0;
  let hoverAmount = 0;
  function hit(x: number, y: number) {
    rayPointer.set(x * 2, -y * 2);
    raycaster.setFromCamera(rayPointer, camera);
    return raycaster.intersectObjects(robotMeshes, false).length > 0;
  }

  const joints = Array.from({ length: 7 }, (_, i) => {
    const node = model.getObjectByName(`link${i + 1}`);
    if (!node) throw new Error('Missing Panda joint');
    return { node, fixed: node.quaternion.clone() };
  });
  const hand = model.getObjectByName('hand')!;
  const left = model.getObjectByName('left_finger')!;
  const right = model.getObjectByName('right_finger')!;
  const leftY = left.position.y;
  const rightY = right.position.y;
  const camera = new THREE.PerspectiveCamera(34, 1, 0.05, 20);
  camera.up.set(0, 0, 1);
  const look = new THREE.Vector3(0.25, 0, 0.32);
  const cameraPosition = new THREE.Vector3(1.45, -1.8, 1.18);
  camera.position.copy(cameraPosition);
  camera.lookAt(look);
  scene.add(new THREE.HemisphereLight(0xf3f4ff, 0x505968, 1.7));
  const key = new THREE.DirectionalLight(0xfff7eb, 2.8);
  key.position.set(0.7, -1, 2.8);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -1;
  key.shadow.camera.right = 1;
  key.shadow.camera.top = 1;
  key.shadow.camera.bottom = -1;
  key.shadow.normalBias = 0.005;
  key.shadow.bias = -0.0001;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x8faaff, 2);
  rim.position.set(-1, 1.5, 1.4);
  scene.add(rim);
  function box(
    size: [number, number, number],
    pos: [number, number, number],
    color: number,
    roughness = 0.65,
  ) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(...size),
      new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.08 }),
    );
    mesh.position.set(...pos);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    track(mesh);
    return mesh;
  }
  const table = box([1.05, 0.9, 0.045], [0.25, 0, -0.024], 0xd9d8d0);
  box([0.2, 0.2, 0.01], [0, 0, -0.001], 0x9c9fa6);
  box([0.19, 0.19, 0.014], [0.45, 0.2, 0.007], 0x7d8bb8);
  const cube = box([0.05, 0.05, 0.05], [0.45, -0.19, 0.025], 0x2455ff, 0.3);
  const grid = new THREE.GridHelper(1, 20, 0x7f8290, 0xa1a3ab);
  grid.rotation.x = Math.PI / 2;
  grid.position.set(0.25, 0, 0.0005);
  const gridMaterial = grid.material as THREE.Material;
  gridMaterial.transparent = true;
  gridMaterial.opacity = 0.18;
  scene.add(grid);
  materials.add(gridMaterial);
  meshes.add(grid.geometry);

  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let playing = motionAllowed();
  let elapsed = 0;
  let index = 0;
  let raf = 0;
  let disposed = false;
  let visible = true;
  let last = 0;
  let lastDraw = 0;
  const pointer = new THREE.Vector2();
  const currentPointer = new THREE.Vector2();
  const axis = new THREE.Vector3(0, 0, 1);
  const rotation = new THREE.Quaternion();
  const tcp = new THREE.Vector3(0, 0, 0.1034);
  const duration = motion[motion.length - 1][0];
  function pose() {
    while (index < motion.length - 2 && motion[index + 1][0] <= elapsed)
      index++;
    const a = motion[index],
      b = motion[index + 1];
    const mix = THREE.MathUtils.clamp((elapsed - a[0]) / (b[0] - a[0]), 0, 1);
    joints.forEach(({ node, fixed }, i) =>
      node.quaternion
        .copy(fixed)
        .multiply(
          rotation.setFromAxisAngle(
            axis,
            THREE.MathUtils.lerp(a[i + 1], b[i + 1], mix),
          ),
        ),
    );
    const opening = THREE.MathUtils.lerp(a[8], b[8], mix);
    left.position.y = leftY + opening;
    right.position.y = rightY - opening;
    model.updateMatrixWorld(true);
    if (elapsed >= 3.7 && elapsed < 9.6)
      cube.position.copy(tcp).applyMatrix4(hand.matrixWorld);
    else if (elapsed >= 9.6) cube.position.set(0.45, 0.2, 0.04);
    else cube.position.set(0.45, -0.19, 0.025);
  }
  function request() {
    if (!disposed && !raf && visible && !document.hidden)
      raf = requestAnimationFrame(draw);
  }
  function draw(now: number) {
    raf = 0;
    if (disposed || !visible || document.hidden) {
      last = 0;
      return;
    }
    const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
    last = now;
    if (playing) {
      elapsed += dt;
      if (elapsed >= duration + 1.6) {
        elapsed = 0;
        index = 0;
      }
    }
    if (now - lastDraw >= 1000 / 30) {
      lastDraw = now;
      pose();
      currentPointer.lerp(pointer, 0.12);
      hoverAmount = motionAllowed()
        ? THREE.MathUtils.lerp(hoverAmount, hoverTarget, 0.14)
        : hoverTarget;
      for (const material of robotMaterials) {
        material.emissive.setHex(0x2455ff);
        material.emissiveIntensity = hoverAmount * 0.2;
      }
      camera.position
        .copy(cameraPosition)
        .add(
          new THREE.Vector3(
            currentPointer.x * 0.09,
            0,
            -currentPointer.y * 0.05,
          ),
        );
      camera.lookAt(look);
      renderer.render(scene, camera);
    }
    if (
      playing ||
      Math.abs(hoverAmount - hoverTarget) > 0.001 ||
      currentPointer.distanceTo(pointer) > 0.001
    )
      request();
    else last = 0;
  }
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    renderer.setSize(width, height);
    camera.aspect = width / Math.max(1, height);
    camera.fov = width / height < 0.8 ? 43 : 34;
    camera.updateProjectionMatrix();
    pose();
    renderer.render(scene, camera);
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    last = 0;
    if (visible) request();
    else {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  });
  intersection.observe(host);
  const visibility = () => {
    last = 0;
    if (!document.hidden) request();
  };
  document.addEventListener('visibilitychange', visibility);
  const reduce = () => {
    playing = motionAllowed();
    if (!playing) {
      pointer.set(0, 0);
      currentPointer.set(0, 0);
    }
    request();
  };
  media.addEventListener('change', reduce);
  const theme = () => {
    const dark = document.documentElement.classList.contains('dark');
    (table.material as THREE.MeshStandardMaterial).color.setHex(
      dark ? 0x4a5261 : 0x7c8896,
    );
    renderer.toneMappingExposure = dark ? 1.12 : 0.95;
    resize();
  };
  const themeObserver = new MutationObserver(theme);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
  const lost = (event: Event) => {
    event.preventDefault();
    playing = false;
    onUnavailable();
  };
  renderer.domElement.addEventListener('webglcontextlost', lost);
  host.appendChild(renderer.domElement);
  theme();
  request();
  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    intersection.disconnect();
    themeObserver.disconnect();
    document.removeEventListener('visibilitychange', visibility);
    media.removeEventListener('change', reduce);
    renderer.domElement.removeEventListener('webglcontextlost', lost);
    for (const geometry of meshes) geometry.dispose();
    for (const material of materials) material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  }
  if (signal.aborted) dispose();
  return {
    point(x, y) {
      const active = hit(x, y);
      hoverTarget = active ? 1 : 0;
      if (active && elapsed >= duration && motionAllowed()) {
        elapsed = 0;
        index = 0;
        playing = true;
        last = 0;
      }
      if (motionAllowed()) pointer.set(x, y);
      request();
      return active;
    },
    hit,
    highlight(active) {
      hoverTarget = active ? 1 : 0;
      if (!active) pointer.set(0, 0);
      request();
    },
    dispose,
  };
}
