#!/usr/bin/env python3
"""Normalize newly generated alpha masters without changing retained artwork.

Original PNGs are immutable rollback/intake sources. Only bounded delivery working
copies get padding and metadata stripping; no generative retouching occurs here.
"""
from hashlib import sha256
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MASTERS = ROOT / 'src/assets/source/vnext/masters'
OUTPUT = ROOT / 'src/assets/source/vnext/delivery/media/vnext'
records = []
for source in sorted(MASTERS.glob('*.png')):
    image = Image.open(source).convert('RGBA')
    # Fit the full canvas inside a consistent safe area. No crop or enlargement.
    is_ghostie = source.stem.startswith('ghostie-')
    is_aligned = source.stem in ('haven-room', 'nari-window-seat')
    pad = 0 if is_aligned else 0.10 if is_ghostie else 0.06
    image.thumbnail((round(image.width * (1 - pad * 2)), round(image.height * (1 - pad * 2))), Image.Resampling.LANCZOS)
    original = Image.open(source)
    padded = Image.new('RGBA', original.size)
    position = ((padded.width - image.width) // 2, (padded.height - image.height) // 2)
    padded.alpha_composite(image, position)
    target = OUTPUT / ('ghosties' if is_ghostie else 'scenes' if source.stem == 'haven-room' else 'characters' if source.stem == 'nari-window-seat' else 'layers') / f'{source.stem}.webp'
    target.parent.mkdir(parents=True, exist_ok=True)
    if source.stem == 'haven-room':
        padded = padded.convert('RGB')
    padded.save(target, 'WEBP', quality=94, method=6, exact=True)
    records.append({'id': source.stem, 'sourceFile': str(source.relative_to(ROOT)),
                    'sourceSha256': sha256(source.read_bytes()).hexdigest(),
                    'workingFile': str(target.relative_to(ROOT)),
                    'workingSha256': sha256(target.read_bytes()).hexdigest(),
                    'width': padded.width, 'height': padded.height, 'alpha': source.stem != 'haven-room',
                    'safeArea': pad, 'crop': 'none; full canvas fitted inside safe area',
                    'generation': 'Built-in imagegen, 6 October 2026; exact briefs in ASSET-2026-022',
                    'approvalStatus': 'pending', 'publicationStatus': 'blocked' if is_aligned else 'pending'})
(ROOT / 'src/assets/source/vnext/intake.json').write_text(json.dumps(records, indent=2) + '\n')
print(f'Prepared {len(records)} padded alpha working copies; original PNGs unchanged.')
