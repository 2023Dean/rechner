# Arbeitsregeln für dieses Repo

## Nie direkt live gehen
- `main` ist die Live-Seite (GitHub Pages). **Nie direkt auf `main` pushen.**
- Änderungen auf dem Arbeitsbranch machen, testen, dann einen Pull Request nach `main` öffnen.
- Erst mergen, wenn der Besitzer im Chat ausdrücklich zustimmt (z.B. „mergen“). Ein früheres OK gilt nicht für spätere Änderungen.

## Vor jedem Pull Request
- `node tests/run-tests.mjs` muss vollständig grün sein. Ändert sich eine Referenz bewusst, das im PR begründen.
- UI-Änderungen im Headless-Browser prüfen, auch am Handy (360–430 px, hell/dunkel), und Screenshots ansehen.
- Bei Änderungen an mitgelieferten Dateien `CACHE` in `sw.js` hochzählen.

## Kommunikation
- Antworten und PR-Beschreibungen auf Deutsch.
