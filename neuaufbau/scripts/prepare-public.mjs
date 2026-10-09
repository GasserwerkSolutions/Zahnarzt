import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
const cwd = process.cwd();
const root = resolve(cwd, "..");
const publicDir = resolve(cwd, "public");
const paths = [
  "assets/favicon.svg", "assets/apple-touch-icon.svg", "assets/logo-text.svg", "assets/og-image.png",
  "assets/main.css", "assets/subpages.css", "assets/design-system.css", "assets/design-system-bridge.css",
  "assets/main.js", "assets/subpages.js", "assets/common.js",
  "assets/images/praxis-aussen.webp", "assets/images/wartezimmer.webp",
  "assets/images/behandlung-team.webp", "assets/images/detail-fuersorge.webp",
  "assets/images/patientin-senior.webp", "assets/images/kinder-daumen.webp",
  "assets/images/team/team-tamas-hess.webp", "assets/images/team/team-ritz.webp",
  "assets/images/team/team-eggli.webp", "assets/images/team/team-schwaegli.webp",
  "assets/images/team/team-von-allmen.webp", "assets/images/team/team-tamas.webp",
  "datenschutz.html", "impressum.html"
];
for (const rel of paths) {
  const to = resolve(publicDir, rel);
  await mkdir(dirname(to), { recursive: true });
  await copyFile(resolve(root, rel), to);
}
const urls = [
  "/", "/praxis-team/", "/kontakt-anfahrt/",
  "/behandlungen/prophylaxe-vorsorge/", "/behandlungen/notfall/",
  "/behandlungen/zahnerhalt/", "/behandlungen/wurzelkanalbehandlung/",
  "/behandlungen/parodontitis/", "/behandlungen/zahnersatz/",
  "/behandlungen/implantatberatung/", "/behandlungen/kinderzahnheilkunde/",
  "/datenschutz.html", "/impressum.html"
];
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(u => '  <url><loc>https://zahnaerztehaus-arch.ch' + u + '</loc></url>').join("\n") +
  '\n</urlset>\n';
await writeFile(resolve(publicDir, "sitemap.xml"), xml);
await writeFile(resolve(publicDir, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://zahnaerztehaus-arch.ch/sitemap.xml\n");
console.log("[assets] Bestehende Medien und Rechtsseiten übernommen; " + urls.length + " Sitemap-Einträge");

