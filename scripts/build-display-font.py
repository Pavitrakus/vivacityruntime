"""Create Vivacity Raster, a pixel-edged derivative of OFL Instrument Serif.
Requires Pillow and fonttools[woff]. Original and license are in public/fonts.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1] / 'public/fonts'
source = root / 'InstrumentSerif-Regular.ttf'
raster = ImageFont.truetype(str(source), 72)
upstream = TTFont(source)
supported = upstream.getBestCmap()
codes = [n for n in list(range(32, 256)) + list(range(0x2010, 0x2027)) if n in supported]
builder = FontBuilder(1024, isTTF=True)
names = ['.notdef'] + [f'uni{n:04X}' for n in codes]
builder.setupGlyphOrder(names)
builder.setupCharacterMap({n: f'uni{n:04X}' for n in codes})
glyphs = {'.notdef': TTGlyphPen(None).glyph()}
metrics = {'.notdef': (512, 0)}
scale = 1024 / 72
for code in codes:
    char, name = chr(code), f'uni{code:04X}'
    l, t, r, b = raster.getbbox(char, anchor='ls')
    image = Image.new('L', (max(1, r-l+4), max(1, b-t+4)))
    ImageDraw.Draw(image).text((2-l, 2-t), char, font=raster, fill=255, anchor='ls')
    pen = TTGlyphPen(None)
    filled = {(x,y) for y in range(image.height) for x in range(image.width) if image.getpixel((x,y)) >= 108}
    edges = {}
    for x,y in filled:
        for neighbor,start,end in [((x,y-1),(x,y),(x+1,y)),((x+1,y),(x+1,y),(x+1,y+1)),((x,y+1),(x+1,y+1),(x,y+1)),((x-1,y),(x,y+1),(x,y))]:
            if neighbor not in filled: edges.setdefault(start,[]).append(end)
    directions = {(1,0):0,(0,1):1,(-1,0):2,(0,-1):3}
    while edges:
        start = next(iter(edges)); current = start; previous_direction = None; contour = []
        while True:
            contour.append(current)
            candidates = edges[current]
            if previous_direction is None: end = candidates[0]
            else:
                def priority(end):
                    direction = directions[(end[0]-current[0],end[1]-current[1])]
                    return [1,0,3,2].index((direction-previous_direction)%4)
                end = min(candidates,key=priority)
            candidates.remove(end)
            if not candidates: del edges[current]
            previous_direction = directions[(end[0]-current[0],end[1]-current[1])]
            current = end
            if current == start: break
        corners = [pt for i,pt in enumerate(contour) if (pt[0]-contour[i-1][0],pt[1]-contour[i-1][1]) != (contour[(i+1)%len(contour)][0]-pt[0],contour[(i+1)%len(contour)][1]-pt[1])]
        points = [(round((x+l-2)*scale),round(-(y+t-2)*scale)) for x,y in corners]
        if points:
            pen.moveTo(points[0])
            for point in points[1:]: pen.lineTo(point)
            pen.closePath()
    glyphs[name] = pen.glyph()
    metrics[name] = (round(raster.getlength(char)*scale), round(l*scale))
builder.setupGlyf(glyphs)
builder.setupHorizontalMetrics(metrics)
builder.setupHorizontalHeader(ascent=1000, descent=-260)
builder.setupNameTable({'familyName': 'Vivacity Raster', 'styleName': 'Regular', 'uniqueFontIdentifier': 'VivacityRaster-Regular-1', 'fullName': 'Vivacity Raster Regular', 'psName': 'VivacityRaster-Regular', 'version': 'Version 1.0', 'copyright': 'Derived from Instrument Serif. Copyright 2022 The Instrument Serif Project Authors. SIL OFL 1.1.'})
builder.setupOS2(sTypoAscender=1000, sTypoDescender=-260, usWinAscent=1000, usWinDescent=260)
builder.setupPost()
builder.font.flavor = 'woff2'
builder.font.save(root / 'vivacity-raster.woff2')
print((root / 'vivacity-raster.woff2').stat().st_size)
