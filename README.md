# Rechner

<!-- Kreditrechner-Tool zur Berechnung von Kreditkonditionen und KPI-Auswertung -->

Kreditrechner (v4.7) für Annuitäten-Wohnkredite nach österreichischer Bankpraxis: quartalsweise Zinsabrechnung, taggenaue Zinsen, Sondertilgungen, Fix- und variabler Zins. Läuft komplett im Browser, ohne Server und ohne Konto.

- **Live:** https://2023dean.github.io/rechner/ (GitHub Pages aus `main`, Datei `index.html`)
- **Rechentests im Browser:** https://2023dean.github.io/rechner/tests/
- **Rechentests lokal:** `node tests/run-tests.mjs` (benötigt Playwright; `--golden` gibt die aktuellen Referenzwerte aus)

## Funktionen

### Rechenkern
- **Zinsabrechnung** wie bei der Bank: Zinsen taggenau (act/360, wahlweise act/365 oder monatlich vereinfacht) vom 1. bis zum letzten Quartalstag. Die Zinsen werden am Quartalsende dem Saldo zugeschlagen.
- **Zahlungstag** frei wählbar (1–28). Fällt er auf ein Wochenende oder einen **österreichischen Feiertag**, wird am nächsten Bankarbeitstag gebucht. Berücksichtigt werden auch die beweglichen Feiertage (aus dem Osterdatum berechnet) und die Bankschließtage Karfreitag, 24.12. und 31.12. Abschaltbar.
- **Planstart** an einem beliebigen Tag, auch mitten im Quartal. Ein Zinsvortrag (vor dem Planstart aufgelaufene Quartalszinsen) ist möglich.
- **Fixzins mit Folgezins:** Der Zinswechsel wird taggenau ab dem Tag nach dem Fixzins-Ende gerechnet.
- **Quartalsgebühr:** steigt um 3 % pro Vertragsjahr.
- **Tilgungsquartal:** Die letzte Zahlung wird auf die Restschuld begrenzt (Schlusszahlung). Sondertilgungen über der Restschuld werden gekappt.

### Sondertilgungen
- Eingabe mit Datum (Valuta), Betrag und Kommentar. Je Eintrag gibt es einen **Status „erfolgt“ / „geplant“** und **„Spart ca. … Zinsen“** über die gesamte Laufzeit.
- **Wirkung je Sondertilgung:**
  - **„Laufzeit verkürzen“:** Die Rate bleibt gleich.
  - **„Rate senken“:** Die niedrigste Rate wird berechnet, mit der der Kredit trotzdem zum bisherigen Ende getilgt ist.
- **Sondertilgungslimit** je Kalender- oder Vertragsjahr. Für den Betrag über dem Limit wird eine **Vorfälligkeitsentschädigung** berechnet:
  - Satz einstellbar
  - optional nur in der Fixzinsperiode
  - optionaler Deckel 1 % / 0,5 % (Staffel nach VKrG)
- **Entscheidungshilfe „Sondertilgung oder Geld anlegen?“:**
  - vergleicht das Vermögen zum ursprünglichen Kreditende
  - berücksichtigt die VFE
  - zeigt die Gleichstand-Rendite (ohne VFE = Effektivzins)

### Raten und variabler Zins
- **Ratenänderungen ab Datum:** z.B. eine Anpassung durch die Bank.
- **Zinsperioden (variabler Zins):**
  - Sollzins = Indikator (z.B. Euribor, Untergrenze 0 %) + Aufschlag ab einem Datum
  - beliebig viele Wechsel, auch mitten im Quartal
  - optional **„Rate anpassen“**: Das Kreditende bleibt, wie bei den meisten variablen Krediten
- **Zinspfad-Generator** für Szenarien, z.B. Euribor +0,25 %-Punkte pro Jahr.
- Automatische Ratenanpassungen rechnen wie die Bank nur mit dem, was zum jeweiligen Datum bekannt ist.

### Auswertungen
- **Übersicht:**
  - Restschuld heute
  - Schuldenfrei am (tatsächliches Tilgungsdatum)
  - Gesamtzinsen
  - **Effektivzins** (XIRR über alle Zahlungstermine)
  - Restschuld bei Fixzins-Ende
  - Zinsersparnis durch Sondertilgungen
- **Charts:**
  - Restschuldverlauf mit Markierungen „Heute“ und „Fixzins-Ende“, Vergleichslinie „ohne Sondertilgungen“ und Ist-Salden vom Kontoauszug
  - Quartalszinsen und Sondertilgungen (erfolgt/geplant)
- **Restschuld zu einem Stichtag** (banknaher Saldo).
- **Tilgungsplan:** monatlich, mit Quartalsabschluss und Hinweisen (Zinswechsel, Feiertagsverschiebung, Ratenänderung, Schlusszahlung).
- **Jahresübersicht:** Raten, Sondertilgungen, Zinsen, Gebühren, Schuldabbau.
- **Zielanalyse:** Welche zusätzliche jährliche Sondertilgung braucht es, um in X Jahren schuldenfrei zu sein? Der Betrag lässt sich mit einem Klick übernehmen.
- **Zinsänderungs-Simulator** und **Anschlussfinanzierung:** Folgezins-Szenarien mit Mehrkosten.

### Kontoauszug-Abgleich
- Saldo laut Bank mit Datum eintragen. Der Rechner zeigt seinen Saldo am selben Tag und die Abweichung; die Ist-Salden erscheinen im Chart.
- **„Als Planstart“:** richtet den Rechner auf einen Auszug neu aus. Der Plan startet dann am Folgetag, inklusive Zinsvortrag.

### Daten, Export und App
- **Automatisches Speichern** im Browser (localStorage).
- **JSON-Export/-Import** zum Übertragen zwischen Geräten.
- **Teilen per Link:** Das ganze Szenario steckt im Link, kein Server. Vor dem Ersetzen der eigenen Daten kommt eine Rückfrage.
- **CSV-Export** von Tilgungsplan und Jahresübersicht (Dezimalkomma für Excel).
- **Bericht als PDF herunterladen** (direkt, ohne Druckdialog, auch offline) oder **drucken**: Eckdaten, Kennzahlen, Charts und Tabellen, z.B. fürs Bankgespräch.
- **Installierbare App (PWA):** Startbildschirm am Handy, funktioniert nach dem ersten Aufruf offline.
- Hell/Dunkel-Modus (wird gespeichert), Handy-Layout, Eingabeprüfung mit verständlichen Meldungen.

## Hinweise
- Die Werte sind eine Planungsrechnung und ersetzen nicht die Abrechnung der Bank. Regeln zu Sondertilgungslimit und Vorfälligkeitsentschädigung bitte mit dem Kreditvertrag abgleichen.
- Alle Daten bleiben im Browser des jeweiligen Geräts. Ein Teilen-Link enthält alle Kreditdaten.

## Technik
- Alles in einer Datei: `index.html` (HTML, CSS, JavaScript).
- `vendor/chart.umd.js` ist Chart.js 4.4.4 (MIT, siehe `vendor/chart.js-LICENSE.md`), lokal eingebunden mit CDN als Fallback.
- `vendor/jspdf.umd.min.js` (jsPDF 4.2.1) und `vendor/jspdf.plugin.autotable.min.js` (jspdf-autotable 5.0.8), beide MIT (Lizenzen in `vendor/`). Sie werden erst beim PDF-Download geladen.
- PWA: `manifest.webmanifest`, `sw.js`, `icons/`. Bei Änderungen an mitgelieferten Dateien `CACHE` in `sw.js` hochzählen.
- Tests: `tests/index.html` mit 124 Tests (Referenzszenarien und Rechenregeln, geprüft gegen eine unabhängige Nachrechnung).
- `kreditrechner_co_v4_2_1_FIX_kpi_cards.html` und `kreditrechner_perp_v3_5_1b.html` sind ältere Versionen (Archiv).
