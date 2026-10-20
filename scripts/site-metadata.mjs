// Only an explicitly selected production build may advertise the approved origin. Preview builds stay noindex.
export function siteConfiguration(env = process.env) {
  const context = env.NARI_DEPLOY_CONTEXT ?? "preview";
  if (!["preview", "production"].includes(context)) throw new Error("NARI_DEPLOY_CONTEXT must be preview or production.");
  const value = env.NARI_SITE_ORIGIN?.trim();
  let origin;
  if (value) {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port || url.pathname !== "/" || url.search || url.hash
      || url.hostname === "localhost" || url.hostname.endsWith(".localhost") || url.hostname.endsWith(".local")
      || !url.hostname.includes(".") || /^[\d.]+$/.test(url.hostname) || url.hostname.includes(":")) {
      throw new Error("NARI_SITE_ORIGIN must be an approved public HTTPS origin without credentials, port, path, query or fragment.");
    }
    origin = url.origin;
  }
  if (context === "production" && !origin) throw new Error("Production builds require the approved NARI_SITE_ORIGIN.");
  return { production: context === "production", origin };
}

export function pageMetadata(page, config) {
  const indexable = Boolean(page.socialImage);
  const canonical = config.production && indexable ? new URL(page.path, config.origin).href : undefined;
  return {
    canonical,
    image: page.socialImage && config.production ? new URL(page.socialImage, config.origin).href : page.socialImage,
    noindex: !config.production || !indexable,
  };
}

export function sitemap(pages, config) {
  if (!config.production) return null;
  const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const urls = pages.filter((page) => page.socialImage).map((page) => `<url><loc>${escape(new URL(page.path, config.origin).href)}</loc></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>\n`;
}
