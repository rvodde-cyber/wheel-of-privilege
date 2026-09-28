# Bouwspecificatie Machtskruising: organisatiescan lokaal afronden, twee lenzen, nieuwe landingspagina

Werkmap (enige juiste): `Cursor projecten/rvodde-cyber-community-moreel-vakmanschap/wheel-of-privilege`
Stack: React 18 + Vite, geen TypeScript, geen Tailwind, inline styles, react-router-dom. Kleuren en fonts alleen via `src/config.js`.

## 0. Harde randvoorwaarden
- Niets verlaat het apparaat. Geen fetch, geen opslag op server, geen tracking, geen login.
- Vaste framing organisatiescan, letterlijk: "Waar zit volgens jou de grootste groep collega's …" (via `formatTeamQuestion`). Nooit eigen positie vragen.
- Bronvermelding (Crenshaw 1989, McIntosh 1989, Luyendijk 2022) blijft in UI en als commentaar in `config.js`.
- `api/` en `@vercel/kv` NIET verwijderen (geparkeerd), maar ook nergens meer aanroepen.

## 1. Organisatiescan volledig lokaal maken (afronden huidig werk)
In `src/pages/TeamSurvey.jsx`:
1. Verwijder `submitSurvey()` en de fetch naar `/api/aggregate`, plus `submitting`/`submitError`-state.
2. Geef `mode="team"` mee aan `<AxisSelector>` (nu ontbreekt dit; daardoor verschijnen de teamopties en "Niet inschatten" niet).
3. Laatste as → `setStep("result")` in plaats van versturen.
4. Nieuwe stap `result` (zie §3).

In `src/config.js` → `framing.*.team` (beide framings) teksten aanpassen:
- `intro`: "Geef per onderwerp aan waar volgens jou de grootste groep collega's zit. Je geeft geen eigen positie aan, alleen je indruk van de organisatie. Alles blijft op dit apparaat; er wordt niets verstuurd of opgeslagen."
- `finishLabel`: "Bekijk resultaat"
- `privacyNote`: "Je antwoorden blijven op dit apparaat. Er wordt niets verstuurd of opgeslagen."
- `previewNote`: "Live voorvertoning van jouw indruk."
- Verwijder `thankYouTitle`, `thankYouText`, `submittingLabel`, `errorLabel` (niet meer gebruikt).

## 2. Twee lenzen
### 2a. Keuze vooraf
In `IntroScreen` (mode team) een keuze toevoegen, twee grote kaarten (radiogedrag):
- **Eén lens**: "Hele organisatie"
- **Twee lenzen** (aanbevolen): "Hele organisatie én de top (directie en management)"
Opslaan als `lensMode: "een" | "twee"` in TeamSurvey-state; `onStart(lensMode)`.

### 2b. Data en vraagstelling
In `src/data/axesTeam.js` toevoegen:
```js
export const LENZEN = {
  organisatie: { id: "organisatie", label: "Hele organisatie" },
  top: { id: "top", label: "De top" },
};
export const TUSSEN_EEN_LENS = TUSSEN; // bestaande tekst
export const TUSSEN_TWEE_LENZEN = "Gemengd beeld zonder duidelijke meerderheid.";
export function formatTopQuestion(axis) {
  return `Waar zit volgens jou de grootste groep collega's in de top (directie en management) ${axis.vraagdeel}?`;
}
```
In tweelenzenmodus gebruikt de Tussen-optie `TUSSEN_TWEE_LENZEN` (het verschil werkvloer/top wordt nu apart gemeten). De `hint` per as blijft.

### 2c. State
```js
const [selections, setSelections] = useState({ organisatie: {}, top: {} });
// selections[lens][axis.id] = "center" | "middle" | "periphery" | "unknown"
```
Eén lens: alleen `organisatie` wordt gevuld.

### 2d. Scherm per as
- Eén lens: zoals nu (AxisSelector, mode team).
- Twee lenzen: onder de titel twee blokken onder elkaar, elk met kopje en een compacte AxisSelector:
  1. "Hele organisatie" + `formatTeamQuestion(axis)`
  2. "De top" + `formatTopQuestion(axis)`
- AxisSelector krijgt props `question` (override van vraagtekst), `tussenText` en `compact` (kleinere padding, 2×2-grid vanaf 560px).
- "Volgende" is actief als elke getoonde lens een keuze heeft ("Niet inschatten" telt als keuze).

### 2e. PowerWheel met lagen
`src/components/PowerWheel.jsx`: nieuwe optionele prop `layers`:
```js
layers = [
  { id: "organisatie", selections, fill: "#1D9E75", fillOpacity: 0.35, stroke: "#1D9E75", dash: null, label: "Hele organisatie" },
  { id: "top", selections, fill: "#5B2D8E", fillOpacity: 0.28, stroke: "#5B2D8E", dash: "6 4", label: "De top" },
]
```
- Als `layers` is meegegeven: teken per laag een polygoon (volgorde: organisatie eerst, top erbovenop) en stippen per laag (top: ruitvormig of met witte rand + dash-lijn, zodat het verschil ook zonder kleur zichtbaar is).
- Zonder `layers`: huidig gedrag ongewijzigd (`variant` dots/filled blijft werken voor individu).
- "unknown" levert geen punt op (bestaat al via `positionToRing`).
- Kleuren toevoegen aan `config.colors`: `lensOrg: "#1D9E75"`, `lensTop: "#5B2D8E"`.
- Legenda onder het wiel (kleurvlak + label), alleen in tweelenzenmodus.

### 2f. Kloofberekening
Nieuw in `src/data/conclusie.js`:
```js
export const MIN_AXES_FOR_KLOOF = 6;
export const KLOOF_THRESHOLD = 3;
/** Score: 0 = centrum, 1 = tussen, 2 = periferie (selectionToScore) */
export function computeKloof(selOrg, selTop, axes) {
  const perAs = axes.map((axis) => {
    const o = selectionToScore(selOrg[axis.id]);
    const t = selectionToScore(selTop[axis.id]);
    if (o === null || t === null) return { id: axis.id, titel: axis.titel, verschil: null };
    return { id: axis.id, titel: axis.titel, verschil: o - t }; // >0: top dichter bij machtscentrum
  });
  const vergeleken = perAs.filter((a) => a.verschil !== null);
  const topDichterBij = vergeleken.filter((a) => a.verschil > 0);
  const topVerder = vergeleken.filter((a) => a.verschil < 0);
  if (vergeleken.length < MIN_AXES_FOR_KLOOF) return { ok: false, perAs, vergeleken: vergeleken.length };
  const niveau = topDichterBij.length >= KLOOF_THRESHOLD ? "kloof" : topDichterBij.length > 0 ? "beperkt" : "geen";
  return { ok: true, perAs, vergeleken: vergeleken.length, topDichterBij, topVerder, niveau, advies: kloofAdvies(niveau, topDichterBij.length, vergeleken.length) };
}
```
`POSITION_DUIDING` per as in tweelenzenmodus uitbreiden met een kloofregel: "De top zit hier dichter bij het machtscentrum dan de organisatie." / "Hier lijken organisatie en top op elkaar." / "De top zit hier verder van het machtscentrum dan de organisatie."

### 2g. Adviesteksten en wetenschappelijke onderbouwing
In `src/data/adviesTeksten.js` toevoegen `kloofAdvies(niveau, n, m)` met `samenvatting`, `onderbouwing`, `advies`:
- **kloof**: "Op {n} van de {m} vergeleken onderwerpen zit de top volgens jouw indruk dichter bij het machtscentrum dan de rest van de organisatie. Dat wijst op een verschil in wie er meebeslist." Onderbouwing: diversiteit levert pas betere besluiten op als verschillende perspectieven ook invloed hebben (Ely & Thomas, 2001; Nishii, 2013). Een homogene top met een diverse werkvloer brengt het risico van tokenisme en ongelijke doorstroom (Kanter, 1977). Advies: bekijk doorstroom, werving en wie aan tafel zit bij besluiten; bespreek het beeld met verschillende lagen.
- **beperkt**: kleinere verschillen; advies: verken of die verschillen samenhangen met specifieke functies of teams.
- **geen**: organisatie en top lijken op elkaar; advies: vergelijk dit beeld met de omgeving en de doelgroep van de organisatie.

Bestaande organisatieconclusie (hoog/gemengd/laag) ook voorzien van onderbouwing waarom diverse organisaties beter functioneren, genuanceerd: diversiteit vergroot de kwaliteit van probleemoplossing en besluitvorming (Page, 2007), mits er een inclusief klimaat is; zonder inclusie kan diversiteit ook tot spanning leiden (van Knippenberg et al., 2004; Nishii, 2013).

`BRONNEN` vervangen door een APA-lijst (array, in UI en PDF als lijst tonen):
```js
export const BRONNEN_APA = [
  "Crenshaw, K. (1989). Demarginalizing the intersection of race and sex: A Black feminist critique of antidiscrimination doctrine, feminist theory and antiracist politics. University of Chicago Legal Forum, 1989(1), 139–167.",
  "Ely, R. J., & Thomas, D. A. (2001). Cultural diversity at work: The effects of diversity perspectives on work group processes and outcomes. Administrative Science Quarterly, 46(2), 229–273. https://doi.org/10.2307/2667087",
  "Kanter, R. M. (1977). Men and women of the corporation. Basic Books.",
  "Luyendijk, J. (2022). De zeven vinkjes: Hoe mannen zoals ik de samenleving domineren. Pluim.",
  "McIntosh, P. (1989). White privilege: Unpacking the invisible knapsack. Peace and Freedom, July/August, 10–12.",
  "Nishii, L. H. (2013). The benefits of climate for inclusion for gender-diverse groups. Academy of Management Journal, 56(6), 1754–1774. https://doi.org/10.5465/amj.2009.0823",
  "Page, S. E. (2007). The difference: How the power of diversity creates better groups, firms, schools, and societies. Princeton University Press.",
  "van Knippenberg, D., De Dreu, C. K. W., & Homan, A. C. (2004). Work group diversity and group performance: An integrative model and research agenda. Journal of Applied Psychology, 89(6), 1008–1022. https://doi.org/10.1037/0021-9010.89.6.1008",
];
```

## 3. Resultaatscherm organisatiescan (step "result")
Volgorde:
1. Kop "Jouw beeld van de organisatie" + disclaimer: "Ingevuld door één professional op basis van een persoonlijke indruk; geen meting."
2. PowerWheel groot (met `layers` bij twee lenzen, anders `variant="filled"`), legenda.
3. Conclusie organisatie (`computeOrgConclusion` op `selections.organisatie`): samenvatting, onderbouwing, advies.
4. Alleen bij twee lenzen: blok "Kloof tussen organisatie en top" (`computeKloof`) met samenvatting, lijstje assen waar de top dichter bij het centrum zit, onderbouwing, advies.
5. Tabel per onderwerp: Onderwerp | Organisatie | Top (alleen bij twee lenzen) | Duiding.
6. Knoppen: "Download als PDF" (primair), "Opnieuw beginnen" (secundair, reset state), "Terug naar start" (link `/`).
7. Bronnenlijst APA (klein).

## 4. PDF-export repareren en uitbreiden
`src/utils/orgPrint.js`:
- Bug: `window.open("", "_blank", "noopener,noreferrer")` geeft altijd `null` terug, dus er opent nooit iets. Vervang door printen via een verborgen iframe:
```js
const iframe = document.createElement("iframe");
iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
document.body.appendChild(iframe);
iframe.srcdoc = html; // html zonder window.onload-script
iframe.onload = () => { iframe.contentWindow.focus(); iframe.contentWindow.print(); setTimeout(() => iframe.remove(), 1000); };
```
- Signature: `printOrganisatiePdf({ selections, axes, orgCode, lensMode })`.
- Inhoud gelijk aan resultaatscherm (§3), inclusief kloofblok en Top-kolom bij twee lenzen.
- Wiel in PDF: render PowerWheel naar SVG-string met `renderToStaticMarkup` uit `react-dom/server` en plaats inline.
- Kop PDF: "Machtskruising · Organisatiescan", datum (nl-NL), organisatielabel.
- Bronnen als APA-lijst met hangende inspringing.
- Controleer dat de individuele route (`/individu`) dezelfde iframe-printaanpak gebruikt als daar een PDF-knop zit.

## 5. Landingspagina en uitlegpagina
Referentieontwerp: Claude-artifact "Machtskruising" (twee pagina's: start + uitleg). Overnemen in de app:
- `src/pages/Landing.jsx` herschrijven. Tweekolom (≥ 880px), één kolom op mobiel:
  - Links: eyebrow "ZELFREFLECTIE · ORGANISATIESCAN"; h1 (serif, groot) "Waar sta jij ten opzichte van de macht?" met "ten opzichte van" cursief in accentkleur; één zin: "Maak zichtbaar welk voordeel je meekreeg. Als vertrekpunt, niet als oordeel."; knoppen "Start de reflectie →" (`/individu`, primair) en "Organisatiescan" (`/team/demo`, secundair); drie kleine kenmerken met stip: "Geen account", "Niets verlaat je apparaat", "Eindigt in een PDF-verslag"; tekstlink "Hoe het werkt" naar `/uitleg`.
  - Rechts: witte kaart (radius 28, rand `config.colors.border`) met `PowerWheel variant="dots" size="large"` en een vast voorbeeldprofiel (constante `VOORBEELD_SELECTIES` met 11 assen, gemengde posities), onderschrift cursief "Voorbeeldprofiel".
- Nieuwe route `/uitleg` → `src/pages/Uitleg.jsx`, secties met label links (≥ 880px) en inhoud rechts, gescheiden door dunne lijnen:
  1. Intro: h2 "Een spiegel voor privilege, op elf assen tegelijk" + korte alinea met Crenshaw (1989) en McIntosh (1989).
  2. Twee varianten: twee kaarten (individueel met mini-wiel dots; organisatiescan met mini-wiel twee lagen, vaste vraag als citaat, legenda).
  3. Drie posities per as: Machtscentrum / Tussenpositie / Periferie.
  4. De assen: 11 chips uit `axesSelf.js`.
  5. Zo werkt het: 4 stappen (Kies je variant · Plaats per as · Zie je kruising · Ontvang je verslag).
  6. Reflectievragen (3, serif).
  7. Privacy.
  8. Wat het niet is.
  9. Bronnen (APA, `BRONNEN_APA`).
  10. Onderaan dezelfde twee knoppen als op de landingspagina.
- Kleine navigatiebalk bovenaan op `/` en `/uitleg`: logo (drie concentrische cirkels, accentkleur) + "Machtskruising", rechts segmentknop "Start | Uitleg".
- Gebruik uitsluitend `config.fonts` (Source Serif 4 / Source Sans 3) en `config.colors`; achtergrond pagina licht teal `#F3F8F6` (toevoegen als `config.colors.pageBg`).
- `index.html`: `<title>Machtskruising</title>`, `lang="nl"`, meta description.

## 6. Testchecklist
- [ ] `/team/demo`: geen netwerkverzoeken (DevTools → Network leeg na laden).
- [ ] Eén lens: 11 assen, "Niet inschatten" werkt, resultaat zonder kloofblok.
- [ ] Twee lenzen: per as twee vragen, wiel toont twee lagen met legenda, kloofblok verschijnt.
- [ ] Minder dan 6 ingeschatte assen: nette melding in plaats van conclusie.
- [ ] PDF opent printdialoog in Chrome, Edge en Safari; bevat wiel, conclusie, (kloof), tabel, bronnen.
- [ ] `/individu` werkt ongewijzigd.
- [ ] `/` en `/uitleg` goed op 390px en 1280px breed.
- [ ] `npm run build` zonder fouten.

## 7. Oplevering
Eén commit per paragraaf (§1 t/m §5), daarna `git push` naar `origin main` zodat Vercel automatisch deployt. Let op: sinds 10 juli is niets gecommit; begin met één commit "Huidige stand: conclusie, advies en printbestand" vóór §1.
