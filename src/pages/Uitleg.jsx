import PowerWheel from "../components/PowerWheel.jsx";
import SiteNav, { StartActions } from "../components/SiteNav.jsx";
import { AXES_SELF } from "../data/axesSelf.js";
import { AXES_TEAM, LENZEN, formatTeamQuestion } from "../data/axesTeam.js";
import { BRONNEN_APA } from "../data/adviesTeksten.js";
import { config } from "../config.js";

const VOORBEELD_ZELF = {
  opleiding: "center",
  klasse: "middle",
  ouders: "center",
  etniciteit: "center",
  gender: "periphery",
  seksualiteit: "middle",
  religie: "center",
  taal: "center",
  gezondheid: "middle",
  neurodiversiteit: "periphery",
  migratie: "middle",
};

const VOORBEELD_ORG = {
  opleiding: "middle",
  klasse: "middle",
  ouders: "periphery",
  etniciteit: "middle",
  gender: "middle",
  seksualiteit: "center",
  religie: "middle",
  taal: "middle",
  gezondheid: "periphery",
  neuro: "middle",
  migratie: "periphery",
};

const VOORBEELD_TOP = {
  opleiding: "center",
  klasse: "center",
  ouders: "center",
  etniciteit: "center",
  gender: "center",
  seksualiteit: "center",
  religie: "center",
  taal: "center",
  gezondheid: "middle",
  neuro: "center",
  migratie: "center",
};

const POSITIES = [
  {
    titel: "Machtscentrum",
    tekst: "Dicht bij de dominante norm. Voordeel dat vaak vanzelfsprekend voelt.",
  },
  {
    titel: "Tussenpositie",
    tekst: "Noch duidelijk in het centrum, noch aan de rand.",
  },
  {
    titel: "Periferie",
    tekst: "Verder van de dominante norm. Minder vanzelfsprekend voordeel.",
  },
];

const STAPPEN = [
  { titel: "Kies je variant", tekst: "Individuele reflectie, of een indruk van de organisatie." },
  { titel: "Plaats per as", tekst: "Elf onderwerpen, elk met een eigen positie." },
  { titel: "Zie je kruising", tekst: "Het wiel toont hoe die posities samenkomen." },
  { titel: "Ontvang je verslag", tekst: "Een PDF of afbeelding, gemaakt op dit apparaat." },
];

const VRAGEN = [
  "Welk voordeel was voor jou zo vanzelfsprekend dat je het nauwelijks zag?",
  "Op welke as wijkt jouw positie het sterkst af van de mensen om je heen?",
  "Wat verandert er in het gesprek als ook de positie van de top zichtbaar wordt?",
];

const VASTE_VRAAG = formatTeamQuestion({ vraagdeel: "…" }).replace(" …?", "\u00a0…");

function lensLayers() {
  return [
    {
      id: LENZEN.organisatie.id,
      selections: VOORBEELD_ORG,
      fill: config.colors.lensOrg,
      fillOpacity: 0.35,
      stroke: config.colors.lensOrg,
      dash: null,
      label: LENZEN.organisatie.label,
    },
    {
      id: LENZEN.top.id,
      selections: VOORBEELD_TOP,
      fill: config.colors.lensTop,
      fillOpacity: 0.28,
      stroke: config.colors.lensTop,
      dash: "6 4",
      label: LENZEN.top.label,
    },
  ];
}

function Row({ label, children }) {
  return (
    <section className="wop-uitleg-row">
      <h2 style={styles.label}>{label}</h2>
      <div>{children}</div>
    </section>
  );
}

export default function Uitleg() {
  return (
    <div style={styles.page}>
      <SiteNav />
      <main style={styles.main}>
        <Row label="Intro">
          <h2 style={styles.h2}>Een spiegel voor privilege, op elf assen tegelijk</h2>
          <p style={styles.prose}>
            Kimberlé Crenshaw (1989) liet zien dat assen van voordeel en nadeel elkaar kruisen:
            je positie is nooit één kenmerk. Peggy McIntosh (1989) beschreef privilege als een
            onzichtbare rugzak van meegekregen voordeel. Machtskruising brengt die twee ideeën
            samen op elf assen. Het resultaat is een spiegel, geen oordeel.
          </p>
        </Row>

        <Row label="Varianten">
          <div className="wop-variant-cards">
            <article style={styles.card}>
              <h3 style={styles.cardTitle}>Individuele reflectie</h3>
              <p style={styles.cardText}>
                Waar sta jij ten opzichte van het machtscentrum? Je vult je eigen positie in.
              </p>
              <PowerWheel
                variant="dots"
                maxWidth={240}
                selections={VOORBEELD_ZELF}
                axes={AXES_SELF}
                ariaLabel="Voorbeeld van een individueel profiel"
              />
            </article>
            <article style={styles.card}>
              <h3 style={styles.cardTitle}>Organisatiescan</h3>
              <p style={styles.cardText}>
                Je geeft geen eigen positie aan, alleen je indruk van de grootste groep.
              </p>
              <blockquote style={styles.quote}>{VASTE_VRAAG}</blockquote>
              <PowerWheel
                variant="filled"
                maxWidth={240}
                selections={VOORBEELD_ORG}
                layers={lensLayers()}
                axes={AXES_TEAM}
                ariaLabel="Voorbeeld van organisatie en top"
              />
            </article>
          </div>
        </Row>

        <Row label="Posities">
          <h3 style={styles.h3}>Drie posities per as</h3>
          <div style={styles.positions}>
            {POSITIES.map((positie) => (
              <div key={positie.titel} style={styles.position}>
                <p style={styles.positionTitle}>{positie.titel}</p>
                <p style={styles.cardText}>{positie.tekst}</p>
              </div>
            ))}
          </div>
        </Row>

        <Row label="De assen">
          <div style={styles.chips}>
            {AXES_SELF.map((axis) => (
              <span key={axis.id} style={styles.chip}>
                {axis.label}
              </span>
            ))}
          </div>
        </Row>

        <Row label="Zo werkt het">
          <ol style={styles.steps}>
            {STAPPEN.map((stap, index) => (
              <li key={stap.titel} style={styles.step}>
                <span style={styles.stepNo}>{index + 1}</span>
                <span>
                  <span style={styles.stepTitle}>{stap.titel}</span>
                  <span style={styles.cardText}>{stap.tekst}</span>
                </span>
              </li>
            ))}
          </ol>
        </Row>

        <Row label="Reflectie">
          <div style={styles.questions}>
            {VRAGEN.map((vraag) => (
              <p key={vraag} style={styles.question}>
                {vraag}
              </p>
            ))}
          </div>
        </Row>

        <Row label="Privacy">
          <p style={styles.prose}>
            Niets verlaat dit apparaat. Er is geen account, geen opslag en geen verzending.
            Het verslag maak je zelf, hier, als PDF of afbeelding.
          </p>
        </Row>

        <Row label="Wat het niet is">
          <p style={styles.prose}>
            Geen meting en geen oordeel over personen. De organisatiescan vraagt niet naar jouw
            eigen positie en niet naar individuele collega's. Eén ingevuld beeld is een
            persoonlijke indruk.
          </p>
        </Row>

        <Row label="Bronnen">
          <ul style={styles.sources}>
            {BRONNEN_APA.map((bron) => (
              <li key={bron} style={styles.source}>
                {bron}
              </li>
            ))}
          </ul>
        </Row>

        <div style={styles.closing}>
          <StartActions />
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: config.colors.pageBg,
    color: config.colors.text,
  },
  main: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "8px 24px 72px",
  },
  label: {
    fontFamily: config.fonts.ui,
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: config.colors.textMuted,
    margin: "0 0 12px",
  },
  h2: {
    fontFamily: config.fonts.voice,
    fontSize: "clamp(1.7rem, 3vw, 2.25rem)",
    fontWeight: 600,
    lineHeight: 1.2,
    margin: "0 0 12px",
  },
  h3: {
    fontFamily: config.fonts.voice,
    fontSize: "1.35rem",
    fontWeight: 600,
    margin: "0 0 14px",
  },
  prose: {
    fontFamily: config.fonts.ui,
    fontSize: "1.05rem",
    lineHeight: 1.65,
    margin: 0,
    maxWidth: 640,
  },
  card: {
    background: config.colors.surface,
    border: `1px solid ${config.colors.border}`,
    borderRadius: 20,
    padding: "18px 16px 12px",
  },
  cardTitle: {
    fontFamily: config.fonts.ui,
    fontSize: "1.05rem",
    fontWeight: 700,
    margin: "0 0 6px",
  },
  cardText: {
    display: "block",
    fontFamily: config.fonts.ui,
    fontSize: "0.95rem",
    lineHeight: 1.5,
    color: config.colors.textMuted,
    margin: 0,
  },
  quote: {
    fontFamily: config.fonts.voice,
    fontStyle: "italic",
    fontSize: "1.02rem",
    lineHeight: 1.45,
    margin: "12px 0",
    padding: "0 0 0 12px",
    borderLeft: `3px solid ${config.colors.dotStrong}`,
  },
  positions: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  position: {
    background: config.colors.surface,
    border: `1px solid ${config.colors.border}`,
    borderRadius: 14,
    padding: "14px 16px",
  },
  positionTitle: {
    fontFamily: config.fonts.ui,
    fontWeight: 700,
    margin: "0 0 4px",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    fontFamily: config.fonts.ui,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: config.colors.text,
    background: config.colors.surface,
    border: `1px solid ${config.colors.border}`,
    borderRadius: 999,
    padding: "6px 12px",
  },
  steps: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  step: {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
  },
  stepNo: {
    fontFamily: config.fonts.ui,
    fontWeight: 700,
    color: config.colors.buttonText,
    background: config.colors.buttonBg,
    width: 28,
    height: 28,
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: "0.875rem",
  },
  stepTitle: {
    display: "block",
    fontFamily: config.fonts.ui,
    fontWeight: 700,
    marginBottom: 2,
  },
  questions: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  question: {
    fontFamily: config.fonts.voice,
    fontSize: "1.25rem",
    fontStyle: "italic",
    lineHeight: 1.4,
    margin: 0,
  },
  sources: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  source: {
    fontFamily: config.fonts.ui,
    fontSize: "0.8rem",
    color: config.colors.textMuted,
    lineHeight: 1.45,
    marginBottom: 8,
    paddingLeft: "1.5em",
    textIndent: "-1.5em",
  },
  closing: {
    padding: "28px 0 0",
    borderTop: `1px solid ${config.colors.border}`,
  },
};
