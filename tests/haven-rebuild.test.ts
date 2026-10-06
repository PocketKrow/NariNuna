import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import provenance from '@/assets/source/haven/provenance.json';
import { heroSources } from '@/data/artworkDelivery';
import { havenArtwork } from '@/data/havenArtwork';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
describe('home rebuild identity and asset boundaries', () => {
  it('preserves every supplied identity reference and new master byte-for-byte', () => {
    for (const reference of provenance.identityReferences) expect(hash(reference.path)).toBe(reference.sha256);
    for (const asset of provenance.assets) expect(hash(asset.master)).toBe(asset.masterSha256);
    for (const asset of provenance.rejected) expect(hash(asset.master)).toBe(asset.sha256);
    for (const asset of provenance.socialExports) expect(hash(asset.path)).toBe(asset.sha256);
    for (const asset of provenance.iconExports) expect(hash(asset.path)).toBe(asset.sha256);
  });
  it('never substitutes a generated character in ordinary built pages or their social artwork', () => {
    for (const route of ['index.html', 'meet-nari/index.html', 'haven/index.html']) {
      const html = readFileSync(`dist/${route}`, 'utf8');
      expect(html).not.toMatch(/nari-painted-|nari-painted-avatar|haven-doorway-interior/);
    }
    expect(readFileSync('dist/meet-nari/index.html', 'utf8')).toContain('/media/nari/nari-model-portrait.webp');
  });
  it('preloads the deliberate mobile painting until desktop object placement begins', () => {
    const [mobile, desktop] = heroSources(havenArtwork.home);
    expect(mobile.media).toBe('(width < 1024px)');
    expect(mobile.source).toBe(havenArtwork.mobile);
    expect(desktop.source).toBe(havenArtwork.home);
  });
});
