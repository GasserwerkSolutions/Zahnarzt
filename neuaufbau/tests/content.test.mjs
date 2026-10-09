import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { treatments, team, site } from "../src/data/site.mjs";
const out = resolve(import.meta.dirname, "..", "dist");

test("acht eigenständige, belegte Behandlungsseiten", () => {
  assert.equal(treatments.length, 8);
  assert.equal(new Set(treatments.map(t => t.slug)).size, 8);
  assert.ok(treatments.some(t => t.slug === "wurzelkanalbehandlung"));
  assert.ok(!treatments.some(t => t.slug === "bleaching"));
  assert.ok(treatments.find(t => t.slug === "implantatberatung").title.includes("beratung"));
});
test("Praxisadresse, Kontakt und Personen zugeordnet", () => {
  assert.equal(site.phoneHref, "tel:+41326793788");
  assert.equal(site.address[0], "Bürenstrasse 13");
  assert.equal(team.length, 6);
  assert.equal(new Set(team.map(p => p.image)).size, 6);
});
test("alle Behandlungsseiten enthalten ausreichende Inhalte und gültige Querverweise", () => {
  const slugs = new Set(treatments.map(t => t.slug));
  for (const t of treatments) {
    assert.ok(t.lead.length > 40, t.slug);
    assert.ok(t.sections.length >= 2, t.slug);
    assert.ok(t.decision, t.slug);
    for (const related of t.related ?? []) assert.ok(slugs.has(related));
  }
});
test("Build enthält sämtliche Seiten und vollständige grundlegende Semantik", async () => {
  for (const t of treatments) {
    const html = await readFile(resolve(out, "behandlungen", t.slug, "index.html"), "utf8");
    for (const fragment of ["<h1", "<title>", 'rel="canonical"', "<main", "<footer", 'data-design-system="builder"']) {
      assert.ok(html.includes(fragment), t.slug + ": " + fragment);
    }
  }
  for (const page of ["index.html","praxis-team/index.html","kontakt-anfahrt/index.html","datenschutz.html","impressum.html","404.html"]) {
    assert.ok((await stat(resolve(out, page))).size > 1000, page);
  }
  for (const person of team) await stat(resolve(out, person.image.slice(1)));
});
test("Startseite navigiert zu allen acht Behandlungen", async () => {
  const html = await readFile(resolve(out, "index.html"), "utf8");
  for (const t of treatments) assert.ok(html.includes("/behandlungen/" + t.slug + "/"), t.slug);
  assert.ok(html.includes(site.phoneHref));
  assert.ok(/_astro\/[^"' ]+\.css/.test(html), "DS stylesheet must be bundled");
});
test("Sitemap und Redirects sind im Output enthalten", async () => {
  const siteMap = await readFile(resolve(out, "sitemap.xml"), "utf8");
  assert.equal((siteMap.match(/<url>/g) ?? []).length, 13);
  const redirects = await readFile(resolve(out, "_redirects"), "utf8");
  assert.ok(redirects.includes("/behandlungen/sthetischer-zahnerhalt"));
  assert.ok(redirects.includes("/behandlungen/wurzelkanalbehandlung/") === false);
});

