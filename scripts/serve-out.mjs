// Serves the static export in out/ the way GitHub Pages does: /path/ maps to
// /path/index.html, and anything missing gets 404.html with a 404 status.
// Used by Playwright; plain node:http so no server dependency is added.
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const ROOT = join(process.cwd(), "out");
const PORT = Number(process.env.PORT ?? 4321);
const TYPES = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".txt": "text/plain; charset=utf-8",
    ".xml": "application/xml",
    ".png": "image/png",
    ".ico": "image/x-icon",
    ".svg": "image/svg+xml",
    ".woff2": "font/woff2",
    ".webmanifest": "application/manifest+json",
};

function resolve(urlPath) {
    const safe = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
    const file = join(ROOT, safe);
    if (!file.startsWith(ROOT)) return null;
    if (existsSync(file) && statSync(file).isFile()) return file;
    const index = join(file, "index.html");
    return existsSync(index) ? index : null;
}

createServer((req, res) => {
    const file = resolve(req.url ?? "/");
    const target = file ?? join(ROOT, "404.html");
    res.writeHead(file ? 200 : 404, { "content-type": TYPES[extname(target)] ?? "application/octet-stream" });
    createReadStream(target).pipe(res);
}).listen(PORT, () => console.log(`serving out/ on http://localhost:${PORT}`));
