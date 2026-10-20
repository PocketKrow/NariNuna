// Local browser QA simulates the emitted static-host security policy; it never publishes the build.
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

export async function startBrowserPreview() {
  const root = resolve("dist");
  const lines = (await readFile(`${root}/_headers`, "utf8")).split("\n");
  const policies = [];
  let policy;
  for (const line of lines) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    if (!line.startsWith(" ")) {
      policy = { pattern: line.trim(), headers: {} };
      policies.push(policy);
    } else if (policy) {
      const colon = line.indexOf(":");
      policy.headers[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
    }
  }
  const responseHeaders = (pathname) => {
    const headers = Object.assign({}, ...policies
      .filter(({ pattern }) => pattern.endsWith("*") ? pathname.startsWith(pattern.slice(0, -1)) : pathname === pattern)
      .map(({ headers }) => headers));
    // This listener is loopback HTTP: WebKit otherwise upgrades local files to a nonexistent TLS server.
    // Keep hashes and every other CSP directive exact; production dist/_headers retains HTTPS enforcement.
    headers["Content-Security-Policy"] = headers["Content-Security-Policy"]?.replace(/;?\s*upgrade-insecure-requests\b/, "");
    return headers;
  };
  const types = {
    ".xml": "application/xml",
    ".txt": "text/plain",
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
        if ((await stat(path)).isDirectory()) {
          if (!pathname.endsWith("/")) {
            response.writeHead(301, { ...responseHeaders(pathname), Location: `${pathname}/${new URL(request.url, "http://localhost").search}` });
            response.end();
            return;
          }
          path += "/index.html";
        }
        await stat(path);
      } catch {
        path = `${root}/404.html`;
        status = 404;
      }
      const content = await readFile(path);
      response.writeHead(status, { ...responseHeaders(pathname), "Content-Type": types[extname(path)] ?? "application/octet-stream" });
      response.end(request.method === "HEAD" ? undefined : content);
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
