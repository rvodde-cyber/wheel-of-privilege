import { config, ATTRIBUTION, getFraming } from "../config.js";

export default function IntroScreen({ mode = "self", onStart }) {
  const framing = getFraming();
  const copy = mode === "self" ? framing.self : framing.team;

  return (
    <div style={styles.wrap}>
      <header style={styles.header}>
        <h1 style={styles.title}>{framing.title}</h1>
        <p style={styles.subtitle}>{copy.subtitle}</p>
      </header>

      <p style={styles.intro}>{copy.intro}</p>

      <p style={styles.attribution}>{ATTRIBUTION}</p>

      {mode === "self" && (
        <p style={styles.privacy}>{copy.privacyNote}</p>
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
  intro: {
    fontFamily: config.fonts.voice,
    fontSize: "1rem",
    color: config.colors.text,
    lineHeight: 1.65,
    margin: "0 0 20px",
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
    margin: "0 0 28px",
    fontWeight: 500,
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
