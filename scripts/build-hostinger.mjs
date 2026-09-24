import { cp, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

const root = resolve(fileURLToPath(new URL("../", import.meta.url)));
const nextBin = resolve(root, "node_modules", "next", "dist", "bin", "next");

const buildArgs = [nextBin, "build", "--webpack"];

function runBuild() {
  return new Promise((resolveBuild, reject) => {
    const child = spawn(process.execPath, buildArgs, { cwd: root, stdio: "inherit" });
    child.once("error", reject);
    child.once("exit", (code) => code === 0 ? resolveBuild() : reject(new Error(`next build exited with code ${code}`)));
  });
}

await runBuild();
const exportDir = resolve(root, "out");
await cp(exportDir, root, { recursive: true, force: true });
await rm(exportDir, { recursive: true, force: true });
console.log("Static export copied to the project root for Hostinger public_html.");
