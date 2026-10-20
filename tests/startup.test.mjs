// Real npm -> Astro startup checks catch both lost flags and duplicate CLI defaults. Every child owns a process group.
import { spawn } from "node:child_process";
import { once } from "node:events";
import { networkInterfaces } from "node:os";
import net from "node:net";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { setTimeout as delay } from "node:timers/promises";
import { describe, expect, it } from "vitest";

async function freePort(port = 0) {
  const server = net.createServer();
  server.listen(port, "0.0.0.0");
  await once(server, "listening");
  const selected = server.address().port;
  await new Promise((done) => server.close(done));
  return selected;
}
function start(args) {
  const child = spawn("npm", ["start", "--", ...args], { detached: process.platform !== "win32", stdio: ["ignore", "pipe", "pipe"] });
  let output = "";
  child.stdout.on("data", (chunk) => { output += chunk; });
  child.stderr.on("data", (chunk) => { output += chunk; });
  return { child, output: () => output, async close() {
    if (child.exitCode !== null) return;
    const exited = once(child, "exit");
    if (process.platform !== "win32") process.kill(-child.pid, "SIGTERM");
    else child.kill();
    await exited;
  } };
}
async function waitForHttp(run, port, hostname = "127.0.0.1") {
  for (let attempt = 0; attempt < 150; attempt++) {
    if (run.child.exitCode !== null) throw new Error(run.output());
    try {
      const response = await fetch(`http://${hostname}:${port}/`, { signal: AbortSignal.timeout(300) });
      if (response.ok) return response.text();
    } catch { /* Retry only until the owned process starts or exits. */ }
    await delay(50);
  }
  throw new Error(`Startup timed out: ${run.output()}`);
}

let canEnumerateInterfaces = true;
try { networkInterfaces(); } catch { canEnumerateInterfaces = false; }

describe("preview startup contract", () => {
  it.skipIf(!canEnumerateInterfaces)("starts on all interfaces at 8080 by default (requires OS interface enumeration)", async () => {
    await freePort(8080);
    const run = start([]);
    try {
      expect(await waitForHttp(run, 8080)).toContain("Nari Nuna");
      if (process.platform === "linux") expect(await waitForHttp(run, 8080, "127.0.0.2")).toContain("Nari Nuna");
    } finally { await run.close(); }
  }, 20_000);
  it("honors caller-supplied host and a nondefault port", async () => {
    const port = await freePort();
    const run = start(["--host", "127.0.0.1", "--port", String(port)]);
    try {
      expect(await waitForHttp(run, port)).toContain("Nari Nuna");
      if (process.platform === "linux") await expect(fetch(`http://127.0.0.2:${port}/`, { signal: AbortSignal.timeout(400) })).rejects.toThrow();
    }
    finally { await run.close(); }
  }, 20_000);
  it("fails understandably when build output is absent", async () => {
    const root = await mkdtemp(`${tmpdir()}/nari-no-build-`);
    const run = start(["--outDir", `${root}/missing`]);
    try {
      const code = await Promise.race([once(run.child, "exit").then(([code]) => code), delay(8000).then(() => "timeout")]);
      expect(code).not.toBe("timeout");
      expect(code).not.toBe(0);
      expect(run.output()).toMatch(/output directory .* does not exist\. Did you run `astro build`/i);
    } finally { await run.close(); await rm(root, { recursive: true, force: true }); }
  }, 15_000);
});
