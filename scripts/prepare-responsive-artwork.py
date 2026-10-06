#!/usr/bin/env python3
"""Create budgeted, content-addressed delivery copies. Requires Pillow with WebP.

Existing review artwork is the input; source files are never overwritten or cropped.
Run from any directory. Generated files and manifest are committed, so CI needs no Pillow.
"""
from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
from PIL import Image, features

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
SOURCES = ROOT / 'src/assets/source/delivery'
OUTPUT = PUBLIC / 'media' / 'responsive'
MANIFEST = ROOT / 'src' / 'data' / 'responsive-artwork.json'
RUNTIME_MANIFEST = MANIFEST.with_name('responsive-artwork.runtime.json')


def write_manifests(manifest):
    """Keep integrity records in tooling; ship only image-selection fields to Vue.

    Candidate order is ascending width and is part of the runtime selection API.
    Both outputs come from the same result set; Vitest rejects stale projections.
    """
    MANIFEST.write_text(json.dumps({'_generated': 'GENERATED FILE. Do not edit manually. Regenerate with: npm run artwork:prepare', 'artworks': manifest}, indent=2) + '\n')
    runtime = {
        key: {'width': asset['width'], 'height': asset['height'],
              'candidates': [{field: candidate[field] for field in ('src', 'width', 'height')}
                             for candidate in asset['candidates']]}
        for key, asset in manifest.items()
    }
    # This is generated strict JSON, not hand-maintained source; avoid duplicate pretty-print weight.
    RUNTIME_MANIFEST.write_text(json.dumps(runtime, separators=(',', ':')) + '\n')


# Regenerate candidates and both manifests together; old hashed files are retained, never broadly deleted.
def generate():
    if not features.check('webp'):
        raise SystemExit('Pillow must include WebP support')
    OUTPUT.mkdir(parents=True, exist_ok=True)
    families = [
        ('scene', sorted((SOURCES / 'media/storybook/scenes').glob('*.webp')), [768, 1280, 1672], 148_000),
        ('postcard', sorted((SOURCES / 'media/storybook/postcards').glob('*.webp')), [128, 256, 480, 768], 70_000),
        ('ghostie', sorted((SOURCES / 'media/ghosties/community').glob('*.webp')), [64, 128, 256, 512, 768], 90_000),
        ('motif', [SOURCES / 'media/motifs/lavender-sprig.webp'], [128, 256], 30_000),
        ('haven-scene', sorted((SOURCES / 'media/haven/environments').glob('*.webp')), [480, 768, 1280, 1672], 148_000),
        ('haven-postcard', sorted((SOURCES / 'media/haven/postcards').glob('*.webp')), [128, 256, 480, 768], 70_000),
        ('haven-object', sorted((SOURCES / 'media/haven/objects').glob('*.webp')), [128, 256, 480, 768], 70_000),
        ('haven-ghostie', sorted((SOURCES / 'media/haven/ghosties').glob('*.webp')), [64, 128, 256, 512, 768], 70_000),
    ]
    jobs = [(role, source, widths, budget) for role, paths, widths, budget in families for source in paths]
    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(prepare_source, jobs))
    manifest = dict(result for result in results if result is not None)
    write_manifests(manifest)
    print(f'Prepared {sum(len(item["candidates"]) for item in manifest.values())} immutable delivery candidates.')


# Encode from preserved originals, without cropping/upscaling; stop rather than silently exceed a role budget.
def prepare_source(job):
    role, source, widths, budget = job
    # Alternate atmospheres remain available as originals, outside active delivery.
    if source.stem.startswith('ghostie-strip-') or source.stem in ('haven-midnight', 'haven-daybreak', 'haven-doorway-gathering'):
        return None
    image = Image.open(source)
    sizes = [320, 640, 768] if source.stem == 'haven-doorway-interior' else widths
    # Padded props are small physical objects. Only the broad monitor needs 768px;
    # the remaining objects and inhabitants cap delivery without changing masters.
    if role == 'haven-object' and source.stem != 'monitor':
        sizes = [width for width in widths if width <= 480]
    if role == 'haven-ghostie':
        sizes = [width for width in widths if width <= 512]
    # Retain a full-resolution delivery copy up to the scene ceiling, without upscaling.
    if role == 'haven-scene':
        sizes = sorted(set([width for width in widths if width <= image.width] + [min(image.width, 1672)]))
    candidates = []
    for width in sizes:
        if width > image.width:
            continue
        height = round(image.height * width / image.width)
        resized = image.resize((width, height), Image.Resampling.LANCZOS)
        # Try the highest allowed quality first. Content hashes name the exact final encoded bytes.
        for quality in range(84, 39 if role == 'haven-scene' else 49, -2):
            output = BytesIO()
            resized.save(output, format='WEBP', quality=quality, method=6, exact=True)
            data = output.getvalue()
            if len(data) <= budget:
                break
        else:
            raise RuntimeError(f'{source.name} at {width}px exceeds {budget} bytes at minimum quality')
        digest = sha256(data).hexdigest()
        filename = f'{role}-{source.stem}-{width}.{digest[:16]}.webp'
        (OUTPUT / filename).write_bytes(data)
        candidates.append({'src': f'/media/responsive/{filename}', 'width': width,
                           'height': height, 'bytes': len(data), 'sha256': digest, 'quality': quality})
    return "/" + source.relative_to(SOURCES).as_posix(), {
        "sourceFile": source.relative_to(ROOT).as_posix(),
        "role": role, "sourceSha256": sha256(source.read_bytes()).hexdigest(),
        "width": image.width, "height": image.height, "alpha": "A" in image.getbands(),
        "candidates": candidates,
    }


if __name__ == '__main__':
    generate()
