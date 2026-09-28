import { config, ATTRIBUTION, ORG_ATTRIBUTION, getFraming } from "../config.js";

const ORG_STEPS = [
  "Loop in gedachten door de organisatie: de werkvloer, de teamoverleggen, de kantine.",
  "Kijk daarna omhoog: het management, de directie, de plekken waar besluiten vallen. Wie zit daar aan tafel?",
  "Kies per onderwerp je algemene indruk. Het gaat om een globale inschatting, niet om exacte aantallen.",
  "Weet je het niet? Kies 'Dat kan ik niet inschatten'. Dat is een volwaardig en eerlijk antwoord.",
  "Beoordeel nooit individuele collega's. Baseer je op wat zichtbaar, bekend of bespreekbaar is in de organisatie.",
];

export default function IntroScreen({ mode = "self", orgCode, onStart }) {
  const framing = getFraming();
  const copy = mode === "self" ? framing.self : framing.team;
  const isTeam = mode === "team";

  return (
    <div style={styles.wrap}>
      <header style={styles.header}>
        <h1 style={styles.title}>{isTeam ? "Organisatiescan" : framing.title}</h1>
        {!isTeam && <p style={styles.subtitle}>{copy.subtitle}</p>}
        {orgCode && (
          <p style={styles.orgCode}>Organisatie: {orgCode}</p>
        )}
      </header>

      {isTeam ? (
        <>
          <p style={styles.intro}>
            Deze scan vul je in als professional, bijvoorbeeld als HR-adviseur,
            leidinggevende, diversiteitsfunctionaris of facilitator. Je geeft per
            onderwerp je indruk van de grootste groep mensen in de organisatie.
          </p>
          <p style={styles.stepsTitle}>Zo vul je in:</p>
          <ol style={styles.steps}>
            {ORG_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p style={styles.privacy}>
            Alles blijft op dit apparaat. Er wordt niets verzonden of opgeslagen;
            aan het eind kun je een PDF downloaden.
          </p>
          <p style={styles.attribution}>{ORG_ATTRIBUTION}</p>
        </>
      ) : (
        <>
          <p style={styles.intro}>{copy.intro}</p>
          <p style={styles.attribution}>{ATTRIBUTION}</p>
          {copy.privacyNote && (
            <p style={styles.privacy}>{copy.privacyNote}</p>
          )}
        </>
      )}

      <button type="button" onClick={onStart} style={styles.button}>
        {copy.startLabel}
      </button>
    </div>
  );
}

const styles = {
  wrap: {
    maxWidth: 520,
    margin: "0 auto",
    padding: "32px 20px 48px",
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontFamily: config.fonts.voice,
    fontSize: "clamp(1.75rem, 5vw, 2.25rem)",
    fontWeight: 600,
    color: config.colors.text,
    margin: "0 0 8px",
    lineHeight: 1.2,
  },
  subtitle: {
    fontFamily: config.fonts.voice,
    fontSize: "1.125rem",
    fontStyle: "italic",
    color: config.colors.textMuted,
    margin: 0,
    lineHeight: 1.5,
  },
  orgCode: {
    fontFamily: config.fonts.ui,
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: config.colors.dotStrong,
    margin: "10px 0 0",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  intro: {
    fontFamily: config.fonts.voice,
    fontSize: "1rem",
    color: config.colors.text,
    lineHeight: 1.65,
    margin: "0 0 16px",
  },
  stepsTitle: {
    fontFamily: config.fonts.ui,
    fontSize: "0.8125rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: config.colors.textMuted,
    margin: "0 0 8px",
  },
  steps: {
    fontFamily: config.fonts.voice,
    fontSize: "0.9375rem",
    color: config.colors.text,
    lineHeight: 1.6,
    margin: "0 0 16px",
    paddingLeft: 22,
  },
  attribution: {
    fontFamily: config.fonts.ui,
    fontSize: "0.8125rem",
    color: config.colors.textMuted,
    lineHeight: 1.55,
    margin: "0 0 16px",
    padding: "12px 14px",
    background: "#F4FAF7",
    borderRadius: 8,
    border: `1px solid ${config.colors.border}`,
  },
  privacy: {
    fontFamily: config.fonts.ui,
    fontSize: "0.875rem",
    color: config.colors.dotStrong,
    margin: "0 0 16px",
    fontWeight: 500,
    lineHeight: 1.55,
  },
  button: {
    fontFamily: config.fonts.ui,
    fontSize: "1rem",
    fontWeight: 600,
    color: config.colors.buttonText,
    background: config.colors.buttonBg,
    border: "none",
    borderRadius: 8,
    padding: "14px 28px",
    cursor: "pointer",
    width: "100%",
    maxWidth: 280,
  },
};
