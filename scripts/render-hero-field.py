"""Render an original abstract field loop. Visual artwork, not simulation data."""
from pathlib import Path
import subprocess
import numpy as np
from PIL import Image

root = Path(__file__).resolve().parents[1]
width, height, fps, seconds = 960, 600, 24, 8
y, x = np.mgrid[0:height, 0:width].astype(np.float32)
x = x / width * 2 - 1
y = y / height * 2 - 1
output = root / 'public/media/field-render.mp4'
process = subprocess.Popen(['ffmpeg','-hide_banner','-loglevel','error','-y','-f','rawvideo','-vcodec','rawvideo','-pix_fmt','rgb24','-s',f'{width}x{height}','-r',str(fps),'-i','-','-an','-c:v','libx264','-crf','23','-preset','fast','-pix_fmt','yuv420p','-movflags','+faststart',str(output)],stdin=subprocess.PIPE)
for frame in range(fps*seconds):
    phase = frame/(fps*seconds)*2*np.pi
    angle = -.55 + .09*np.sin(phase)
    u = x*np.cos(angle)-y*np.sin(angle)
    v = x*np.sin(angle)+y*np.cos(angle)
    rgb = np.zeros((height,width,3),dtype=np.float32)+np.array([.004,.007,.023],dtype=np.float32)
    for index, offset in enumerate([-.58,.12,.75]):
        center = offset + .20*np.sin(u*1.8+phase+index*.6) + .12*u*u
        # Folded ridges and fine interference produce visible structure at every scale.
        turbulence = .014*np.sin(18*u + 4*np.sin(6*v + phase) + phase) + .006*np.sin(48*u-17*v-phase)
        distance = v-center+turbulence
        spread = .085+.065*(1+np.sin(u*1.7-phase+index))
        ribbon = np.exp(-(distance/spread)**2)
        edge = np.exp(-((distance+spread*.85)/(.018+spread*.12))**2)
        shade = .35+.65*(.5+.5*np.cos(u*1.3+index+phase))
        rgb += ribbon[:,:,None]*shade[:,:,None]*np.array([.32,.23,.59],dtype=np.float32)
        rgb += edge[:,:,None]*np.array([.07,.19,.57],dtype=np.float32)
        rgb += np.exp(-(distance/(spread*.38))**2)[:,:,None]*shade[:,:,None]*np.array([.24,.25,.30],dtype=np.float32)
        filaments = (.5+.5*np.cos(distance*430+5*np.sin(u*9+phase)))**14
        rgb += (ribbon*filaments*shade)[:,:,None]*np.array([.10,.13,.28],dtype=np.float32)
    vignette = np.clip(1.15-.24*(x*x+y*y),.15,1)
    rgb *= vignette[:,:,None]
    pixels = (np.clip(rgb,0,1)**.9*255).astype(np.uint8)
    process.stdin.write(pixels.tobytes())
    if frame == 36: Image.fromarray(pixels).save(root/'public/media/field-poster.jpg',quality=90)
process.stdin.close()
if process.wait(): raise SystemExit('Field render failed')
output.replace(root / 'public/media/field-loop.mp4')
output = root / 'public/media/field-loop.mp4'
print(output.stat().st_size)
