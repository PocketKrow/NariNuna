// A local test server uses the same CSP and document behavior as the built static site.
import { startBrowserPreview } from "./browser-preview.mjs";
process.env.NARI_PREVIEW_PORT = "4175";
const preview = await startBrowserPreview();
console.log(`Browser test preview: ${preview.origin}`);
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, async () => { await preview.close(); process.exit(0); });
