# DesignSystem-Migration — Zahnärztehaus Arch

Diese ZIP ist keine optische Neuerstellung der Website.

Die bestehende hochwertige Zahnärztehaus-Arch-Seite bleibt die visuelle und funktionale Quelle der Wahrheit. Die Migration legt das DesignSystem darunter und schafft eine saubere Brücke für spätere Component-/Pattern-Migration.

## Ergänzte Dateien

```text
assets/design-system.css
assets/design-system-bridge.css
MIGRATION-DESIGNSYSTEM.md
```

## Lade-Reihenfolge

Auf den öffentlichen HTML-Seiten wurde die CSS-Reihenfolge so ergänzt:

```html
<link rel="stylesheet" href="/assets/design-system.css?v=1">
<link rel="stylesheet" href="/assets/main.css?v=85">
<link rel="stylesheet" href="/assets/design-system-bridge.css?v=1">
```

Bei Unterseiten entsprechend mit `subpages.css`. Bei Seiten mit Inline-CSS liegt `design-system.css` vor dem Inline-Style und `design-system-bridge.css` danach.

## HTML-Marker

Die öffentlichen Seiten tragen nun:

```html
<html lang="de-CH" data-tone="zahnaerztehaus" data-mode="light" data-density="comfortable">
```

## Migrationsprinzip

1. Originaldesign bleibt erhalten.
2. Bestehende `--c-*` Variablen bleiben die visuelle Quelle.
3. `design-system-bridge.css` mappt diese Werte auf System-Tokens:
   - `--color-bg-primary`
   - `--color-surface`
   - `--color-text-primary`
   - `--color-interactive`
   - `--card-*`
   - `--btn-*`
   - `--section-py`
4. Neue oder überarbeitete Komponenten können künftig direkt DesignSystem-Tokens nutzen.
5. Erst danach sollten einzelne Bereiche aus `main.css` / `subpages.css` in wiederverwendbare Components und Patterns überführt werden.

## Bewusst erhalten

- vorhandene Bildwelt
- `assets/main.css`
- `assets/subpages.css`
- `assets/main.js`
- `assets/subpages.js`
- `assets/common.js`
- SEO-/OpenGraph-/Schema-Struktur
- Cloudflare `_headers` / `_redirects`
- `manifest.json`
- `sitemap.xml`
- Behandlungs-Unterseiten
- Praxis-Seite
- Legal-Seiten
- Cloudflare Functions

## Nicht enthalten

Die ursprünglichen Font-Binärdateien aus `assets/fonts/` wurden nicht in dieses abgeleitete Paket übernommen. Die Seite fällt dadurch auf System-/Fallback-Fonts zurück, solange keine eigenen Font-Dateien wieder bereitgestellt werden.

## Empfohlene nächsten Schritte

1. Visuellen Screenshot-Vergleich gegen die Original-ZIP durchführen.
2. `main.css` und `subpages.css` in Schichten aufteilen:
   - Tokens
   - Base
   - Components
   - Patterns
   - Page-specific
3. Wiederkehrende Blöcke nach und nach in DesignSystem-Patterns überführen.
4. Keine Sektion neu designen, bevor ihre originale Wirkung gesichert ist.
