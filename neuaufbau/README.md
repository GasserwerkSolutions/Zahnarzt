# Zahnärztehaus Arch – Neuaufbau

**Status:** Review-Entwurf, kein produktiver Deploy. Die bisherige Website im Repo-Root bleibt unverändert.

## Architektur

- Astro, statisches HTML, ohne Client-JavaScript für den normalen Seitenablauf.
- Versionierte Gasserwerk-DesignSystem-Abhängigkeit `v0.32.0`, Builder-Profil und Trust-Tone mit Marken-Tokens in der CSS-Schicht `treatments`.
- Acht Behandlungsentscheidungen plus Startseite, Praxis/Team und Kontakt/Anfahrt.
- Datenschutz und Impressum werden technisch unverändert aus dem bestehenden Repository übernommen.
- Keine neue Terminformular-Schnittstelle ohne vorherige Prozess- und Sicherheitsfreigabe; Telefon und E-Mail sind anklickbar.

## Lokal entwickeln und testen

Vom Repository-Root aus `cd neuaufbau`, dann `npm install`, `npm run dev` beziehungsweise `npm run build` und `npm test`.
Der Prebuild kopiert gezielt Bilder, Logos sowie die bestehenden Rechtsseiten aus dem Root nach `public` und erstellt Sitemap und Robots-Datei.
Der Output liegt unter `neuaufbau/dist/`. Das Verzeichnis `neuaufbau/` muss innerhalb des Repository-Checkouts gebaut werden.

## Bereitstellung

Cloudflare Pages (nach Freigabe): Buildbefehl `cd neuaufbau && npm install && npm run build`, Output `neuaufbau/dist`.
Es ist absichtlich **kein automatischer Deploy** eingerichtet; der bisherige Root und die Cloudflare-Pages-Functions bleiben unberührt.

## Redaktionelle und rechtliche offene Punkte

1. Öffnungszeiten und Notfalldienst ausserhalb der Erreichbarkeit bestätigen und ergänzen.
2. Umfang operativer Implantatleistungen mit der Praxis klären; in der Site ist nur die belegte Beratung beschrieben.
3. Bleachingmethode, Eignung, Kosten und Prozess klären; vorerst keine dünne eigenständige Seite.
4. Besuchsweg, ÖV, Parkierung, Barrierefreiheit und Terminprozess verifizieren.
5. Bildnutzungsrechte und alle Teamrollen vor Veröffentlichung bestätigen.
6. Übernommene Rechtsseiten auf korrekte Angaben und neuen technischen Betrieb prüfen; ihre alte Gestaltung wird erst nach rechtlicher Freigabe migriert.
7. Mobile und Desktop visuell, mit Tastatur und Screenreader prüfen. Ein grüner Build ist keine fachliche Publikationsfreigabe.

## Quellenprinzip

Die in `src/data/site.mjs` enthaltenen Aussagen folgen der Seitennormalisierung vom 9. Oktober 2026 und den bestehenden öffentlich sichtbaren Praxisseiten. Technische Wahl und Gestaltung sind neue Umsetzungsentscheidungen, keine neuen Praxisbehauptungen.

## Qualität

Der CI-Job führt Build und inhaltliche Regressionstests aus. Eine Browser- und End-to-End-Prüfung am ausgelieferten Preview sowie rechtliche und medizinische Freigaben bleiben erforderlich.
