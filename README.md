# Rechner

<!-- Kreditrechner-Tool zur Berechnung von Kreditkonditionen und KPI-Auswertung -->

Annuitätenkreditrechner mit quartalsweiser Zinsabrechnung (taggenau/360), Sondertilgungen, Fixzins/Folgezins und Szenarien.

- **Live:** https://2023dean.github.io/rechner/ (GitHub Pages aus `main`, Datei `index.html`)
- **Rechentests im Browser:** https://2023dean.github.io/rechner/tests/
- **Rechentests lokal:** `node tests/run-tests.mjs` (benötigt Playwright; `--golden` gibt die aktuellen Referenzwerte aus)

`vendor/chart.umd.js` ist Chart.js 4.4.4 (MIT, siehe `vendor/chart.js-LICENSE.md`), damit der Rechner ohne CDN funktioniert.
`kreditrechner_co_v4_2_1_FIX_kpi_cards.html` und `kreditrechner_perp_v3_5_1b.html` sind ältere Versionen (Archiv).
