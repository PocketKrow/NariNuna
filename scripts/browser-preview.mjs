// Local browser QA simulates the emitted static-host security policy; it never publishes the build.
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

export async function startBrowserPreview() {
  const root = resolve("dist");
  const lines = (await readFile(`${root}/_headers`, "utf8")).split("\n");
  const headers = {};
  for (const line of lines.slice(lines.indexOf("/*") + 1)) {
    if (!line.trim()) break;
    const colon = line.indexOf(":");
    headers[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
  const types = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".webp": "image/webp",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".woff2": "font/woff2",
    ".webmanifest": "application/manifest+json",
  };
  const server = http.createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
      let path = resolve(root, `.${pathname}`);
      let status = 200;
      // Keep this development server confined to its public build directory, including encoded URLs.
      if (path !== root && !path.startsWith(`${root}${sep}`)) {
        response.writeHead(400);
        response.end();
        return;
      }
      try {
        if ((await stat(path)).isDirectory()) path += "/index.html";
        await stat(path);
      } catch {
        path = `${root}/404.html`;
        status = 404;
      }
      const content = await readFile(path);
      response.writeHead(status, { ...headers, "Content-Type": types[extname(path)] ?? "application/octet-stream" });
      response.end(content);
    } catch {
      response.writeHead(500);
      response.end("Preview could not read this build artifact.");
    }
  });
  await new Promise((done, reject) => {
    server.once("error", reject);
    server.listen(Number(process.env.NARI_PREVIEW_PORT ?? 0), "127.0.0.1", done);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Preview did not receive a TCP address.");
  return {
    origin: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((done, reject) => server.close((error) => (error ? reject(error) : done()))),
  };
}
