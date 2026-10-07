"""Prepare inspected project art: retain masters; crop only for declared slots; never upscale."""
from pathlib import Path
from hashlib import sha256
import json
import sys
from PIL import Image, ImageFont, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'src/assets/source/anime-creator'
OUT = ROOT / 'public/media/anime'
OUT.mkdir(parents=True, exist_ok=True)
SPECS = {
    'home-seat': ('../haven-scenes/home-seat.png', None, 'Nari Nuna invites you onto a lavender sofa beside two friendly Ghosties, a cozy throw and a small lamp.'),
    'meet-nook': ('../haven-scenes/meet-nook-hands-fixed.png', None, 'Nari smiles and waves from a cushioned Haven nook, with two Ghosties settled beside her.'),
    'creativity-desk': ('../haven-scenes/creativity-desk.png', None, 'Nari concentrates on polish practice at her desk while Ghosties help with bottles and color swatches.'),
    'connections-game': ('../haven-scenes/connections-game.png', None, 'Nari laughs with a game controller as two Ghosties celebrate around a cozy gaming desk.'),
    'work-table': ('../haven-scenes/work-table.png', None, 'Nari plans at a cream desk with an open notebook and a Ghostie carrying an envelope.'),
    'credits-makers': ('../haven-scenes/credits-makers.png', None, 'Nari keeps two Ghosties company at a small drawing table with pencils and an abstract color study.'),
    '404-wayfinding': ('../haven-scenes/404-wayfinding.png', None, 'Nari and two Ghosties find their way with a folded map beside a small lavender doorway and lantern.'),
    'haven-banner': ('../haven-identity/nari-haven-banner.png', None, 'Nari Nuna smiles and waves beside a friendly Ghostie, leaning on a cream ledge.'),
    'haven-mark': ('../haven-identity/haven-mark.png', None, ''),
    'welcome': ('nari-welcome.png', None, 'Nari Nuna welcomes you with an open hand, wearing her lavender-and-black outfit.'),
    'welcome-portrait': ('nari-welcome.png', (0, 0, 763, 1100), 'Nari Nuna welcomes you with an open hand, wearing her lavender-and-black outfit.'),
    'nails': ('nari-nails.png', None, 'Nari Nuna holding a polish brush and bottle, seated on a small cream stool.'),
    'ghostie-play': ('ghostie-play.png', None, ''),
    'ghostie-bloom': ('ghostie-bloom.png', None, ''),
    'lavender': ('lavender-flourish.png', None, ''),
    'correspondence': ('correspondence.png', None, ''),
    'ghostie-recovery': ('ghostie-recovery.png', None, ''),
}

def digest(data):
    return sha256(data).hexdigest()

def framed(image, crop=None):
    area = image.crop(crop) if crop else image.copy()
    bbox = area.getchannel('A').point(lambda a: 255 if a > 8 else 0).getbbox()
    if not bbox:
        raise ValueError('Empty illustrated source')
    area = area.crop(bbox)
    # Transparent breathing room is delivery framing, not extra character pixels.
    padded = Image.new('RGBA', (area.width + 48, area.height + 48))
    padded.alpha_composite(area, (24, 24))
    return padded, list(bbox)

haven_only = '--haven-only' in sys.argv
scenes_only = '--scenes-only' in sys.argv
scene_keys = {k for k, (filename, _, _) in SPECS.items() if filename.startswith('../haven-scenes/')}
manifest = json.loads((ROOT / 'src/data/anime-artwork.json').read_text()) if haven_only or scenes_only else {'schemaVersion': 1, 'record': 'docs/asset-records/ASSET-2026-022-anime-creator-family.md', 'artworks': {}}
selected = {k: v for k, v in SPECS.items() if k in scene_keys} if scenes_only else {k: v for k, v in SPECS.items() if k.startswith('haven-')} if haven_only else SPECS
for key, (filename, crop, alt) in ({} if '--identity-only' in sys.argv else selected).items():
    source = (SOURCE / filename).resolve()
    data = source.read_bytes()
    original = Image.open(source).convert('RGBA')
    image, bbox = framed(original, crop)
    character = key in ('welcome', 'welcome-portrait', 'nails')
    widths = [160, 240, 320, 480, 640, 720] if character else [96, 160, 240, 320, 480]
    if key in scene_keys:
        widths = [160, 240, 320, 480, 640] if key in ('credits-makers', '404-wayfinding') else [240, 320, 480, 640, 960]
    elif key == 'haven-mark':
        widths = [48, 96, 160, 240]
    elif key == 'haven-banner':
        widths = [320, 480, 640, 960]
    widths = [w for w in widths if w <= original.width and w <= image.width]
    candidates = []
    for width in widths:
        size = (width, round(image.height * width / image.width))
        resized = image.resize(size, Image.Resampling.LANCZOS)
        quality = 84
        # Interrupted encodes stay outside the served directory.
        temporary = SOURCE / f'{key}-{width}.working.webp'
        while True:
            resized.save(temporary, 'WEBP', quality=quality, method=6)
            encoded = temporary.read_bytes()
            if len(encoded) <= 150_000 or quality <= 70:
                break
            quality -= 3
        if len(encoded) > 150_000:
            raise ValueError(f'{key} exceeds its image budget')
        hashed = OUT / f'{key}-{width}.{digest(encoded)[:16]}.webp'
        temporary.rename(hashed)
        temporary.unlink(missing_ok=True)
        candidates.append({'src': '/' + str(hashed.relative_to(ROOT / 'public')), 'width': width, 'height': size[1], 'bytes': len(encoded), 'sha256': digest(encoded), 'quality': quality})
    manifest['artworks'][key] = {'source': str(source.relative_to(ROOT)), 'sourceSha256': digest(data), 'sourceBytes': len(data), 'sourceWidth': original.width, 'sourceHeight': original.height, 'alpha': True, 'slotCrop': list(crop) if crop else None, 'alphaBounds': bbox, 'padding': 24, 'width': image.width, 'height': image.height, 'alt': alt, 'candidates': candidates}
    if key in scene_keys:
        manifest['artworks'][key]['record'] = 'docs/asset-records/ASSET-2026-024-inhabited-haven-scenes.md'

if '--identity-only' not in sys.argv:
    (ROOT / 'src/data/anime-artwork.json').write_text(json.dumps(manifest, indent=2) + '\n')
else:
    manifest = json.loads((ROOT / 'src/data/anime-artwork.json').read_text())

if scenes_only:
    print(f'Prepared {len(scene_keys)} inhabited scenes / {sum(len(manifest["artworks"][key]["candidates"]) for key in scene_keys)} responsive candidates. Existing identity and delivery bytes retained.')
    sys.exit(0)

if haven_only:
    identity_file = ROOT / 'src/data/creator-identity.json'
    identity = json.loads(identity_file.read_text())
    icon, _ = framed(Image.open(SOURCE / '../haven-identity/haven-mark.png').convert('RGBA'))
    icon.thumbnail((64, 64), Image.Resampling.LANCZOS)
    favicon = Image.new('RGBA', (64, 64))
    favicon.alpha_composite(icon, ((64 - icon.width) // 2, (64 - icon.height) // 2))
    temporary = SOURCE / 'haven-favicon.working.png'
    favicon.save(temporary, optimize=True)
    data = temporary.read_bytes()
    path = OUT / f'haven-favicon.{digest(data)[:16]}.png'
    temporary.rename(path)
    identity['faviconSrc'] = '/' + str(path.relative_to(ROOT / 'public'))
    identity['faviconSha256'] = digest(data)
    identity_file.write_text(json.dumps(identity, indent=2) + '\n')
    print('Prepared 8 Haven candidates and the provisional mark favicon.')
    sys.exit(0)

# Exact HTML text is retained in the page. This separate metadata composition is a share graphic.
share = Image.new('RGB', (1200, 630), '#fffaf4')
draw = ImageDraw.Draw(share)
draw.rounded_rectangle((660, -140, 1350, 770), radius=290, fill='#eae0f2')
portrait, _ = framed(Image.open(SOURCE / 'nari-welcome.png').convert('RGBA'), (0, 0, 763, 1100))
portrait.thumbnail((510, 640), Image.Resampling.LANCZOS)
share.paste(portrait, (690, 18), portrait)
font_root = Path('/usr/share/fonts/truetype/dejavu')
title_font = ImageFont.truetype(str(font_root / 'DejaVuSans.ttf'), 68)
body_font = ImageFont.truetype(str(font_root / 'DejaVuSans.ttf'), 26)
draw.text((72, 155), 'Nari Nuna', fill='#44314f', font=title_font)
draw.text((76, 256), 'Your chaotic big sister.', fill='#705b7a', font=body_font)
draw.text((76, 420), 'Streams. Nails. A little chaos.', fill='#24584b', font=body_font)
share_master = SOURCE / 'nari-anime-share.png'
share.save(share_master)
share_temp = OUT / 'nari-share.jpg'
share.save(share_temp, quality=84, optimize=True)
share_data = share_temp.read_bytes()
share_path = OUT / f'nari-share.{digest(share_data)[:16]}.jpg'
share_temp.rename(share_path)
identity = {'source': 'src/assets/source/anime-creator/nari-welcome.png', 'sourceSha256': digest((SOURCE / 'nari-welcome.png').read_bytes()), 'master': str(share_master.relative_to(ROOT)), 'masterSha256': digest(share_master.read_bytes()), 'src': '/' + str(share_path.relative_to(ROOT / 'public')), 'sha256': digest(share_data), 'bytes': len(share_data), 'width': 1200, 'height': 630}
(ROOT / 'src/data/creator-identity.json').write_text(json.dumps(identity, indent=2) + '\n')
icon, _ = framed(Image.open(SOURCE / '../haven-identity/haven-mark.png').convert('RGBA'))
icon.thumbnail((64, 64), Image.Resampling.LANCZOS)
favicon = Image.new('RGBA', (64, 64))
favicon.alpha_composite(icon, ((64 - icon.width) // 2, (64 - icon.height) // 2))
favicon_temp = SOURCE / 'haven-favicon.working.png'
favicon.save(favicon_temp, optimize=True)
favicon_data = favicon_temp.read_bytes()
favicon_path = OUT / f'haven-favicon.{digest(favicon_data)[:16]}.png'
favicon_temp.rename(favicon_path)
identity['faviconSrc'] = '/' + str(favicon_path.relative_to(ROOT / 'public'))
identity['faviconSha256'] = digest(favicon_data)
(ROOT / 'src/data/creator-identity.json').write_text(json.dumps(identity, indent=2) + '\n')
pages_path = ROOT / 'src/data/projectPages.json'
pages = json.loads(pages_path.read_text())
for page in pages:
    if page['socialImage']:
        page['socialImage'] = identity['src']
pages_path.write_text(json.dumps(pages, indent=2) + '\n')
print(f'Prepared {len(SPECS)} artwork slots / {sum(len(a["candidates"]) for a in manifest["artworks"].values())} responsive images; share {len(share_data)} bytes.')
