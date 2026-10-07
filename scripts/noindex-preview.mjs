// Applied only to review contexts; preserve the existing global security block.
import { readFile, writeFile } from "node:fs/promises";
const headers = await readFile("dist/_headers", "utf8");
if (!headers.includes("/*\n")) throw new Error("Preview lacks the global security header block");
await writeFile("dist/_headers", headers.replace("/*\n", "/*\n  X-Robots-Tag: noindex, nofollow\n"));
