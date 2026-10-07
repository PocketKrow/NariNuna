#!/usr/bin/env python3
"""Resize supplied-model delivery copies only; never redraw, crop, upscale or replace masters."""
from pathlib import Path
from PIL import Image
import hashlib,json,io
manifest={}
for name,filename in [('fullbody','nari-model-fullbody.webp'),('portrait','nari-model-portrait.webp')]:
 source=Path('public/media/nari')/filename
 data=source.read_bytes();image=Image.open(io.BytesIO(data))
 candidates=[]
 for width in [160,240,320,480,640,image.width]:
  height=round(image.height*width/image.width)
  out=io.BytesIO();image.resize((width,height),Image.Resampling.LANCZOS).save(out,format='WEBP',quality=80,method=6)
  content=out.getvalue();digest=hashlib.sha256(content).hexdigest()
  url=f'/media/responsive/nari-{name}-{width}.{digest[:16]}.webp'
  Path('public'+url).write_bytes(content)
  candidates.append(dict(src=url,width=width,height=height,bytes=len(content),sha256=digest))
 manifest[name]=dict(source=str(source),sourceSha256=hashlib.sha256(data).hexdigest(),width=image.width,height=image.height,candidates=candidates)
Path('src/data/model-delivery.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Prepared original-model delivery; source identity and alpha preserved.')
