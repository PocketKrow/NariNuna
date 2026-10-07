#!/usr/bin/env python3
"""Create a deterministic share composition from original model pixels and live-site text."""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import hashlib,json,io
root=Path('src/assets/source/minimal');root.mkdir(parents=True,exist_ok=True)
source=Path('public/media/nari/nari-model-portrait.webp')
canvas=Image.new('RGB',(1200,630),'#f7f1e8');draw=ImageDraw.Draw(canvas)
model=Image.open(source);model.thumbnail((420,560),Image.Resampling.LANCZOS)
draw.ellipse((775,50,1130,600),fill='#e7d9d4',outline='#d9c6c1',width=2)
canvas.paste(model,(950-model.width//2,35),model)
serif='/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf';sans='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
draw.text((90,160),'Nari Nuna',font=ImageFont.truetype(serif,74),fill='#24584b')
draw.text((94,277),'Your chaotic big sister.',font=ImageFont.truetype(sans,29),fill='#73566e')
draw.line((94,365,630,365),fill='#d8ccc5',width=2)
draw.text((94,400),'Streams. Games. A little nail polish.',font=ImageFont.truetype(sans,22),fill='#342c33')
master=root/'nari-creator-share.png';canvas.save(master)
buffer=io.BytesIO();canvas.save(buffer,format='JPEG',quality=90,optimize=True)
content=buffer.getvalue();digest=hashlib.sha256(content).hexdigest();url=f'/media/minimal/nari-share.{digest[:16]}.jpg'
path=Path('public'+url);path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(content)
record=dict(source=str(source),sourceSha256=hashlib.sha256(source.read_bytes()).hexdigest(),master=str(master),masterSha256=hashlib.sha256(master.read_bytes()).hexdigest(),src=url,sha256=digest,bytes=len(content),width=1200,height=630)
Path('src/data/creator-identity.json').write_text(json.dumps(record,indent=2)+'\n')
print('Prepared original-model share image:',len(content),'bytes; preserved master and source hashes.')
