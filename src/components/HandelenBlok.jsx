import { useMemo } from "react";
import { config } from "../config.js";
import {
  HANDELEN_KOP,
  HANDELEN_PROFIELEN,
  computeHandelenProfiel,
} from "../data/handelen.js";

const styles = {
  section: {
    textAlign: "left",
    margin: "32px 0 28px",
  },
  kop: {
    fontFamily: config.fonts.voice,
    fontSize: "1.25rem",
    fontWeight: 600,
    margin: "0 0 10px",
    textAlign: "center",
  },
  inleiding: {
    fontFamily: config.fonts.voice,
    fontSize: "1rem",
    fontStyle: "italic",
    color: config.colors.textMuted,
    lineHeight: 1.6,
    margin: "0 0 20px",
  },
  profielTitel: {
    fontFamily: config.fonts.voice,
    fontSize: "1.125rem",
    fontWeight: 600,
    margin: "0 0 14px",
  },
  actieItem: {
    margin: "0 0 16px",
  },
  faseLabel: {
    fontFamily: config.fonts.ui,
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: config.colors.dotStrong,
    margin: "0 0 4px",
  },
  actieText: {
    fontFamily: config.fonts.voice,
    fontSize: "1rem",
    lineHeight: 1.55,
    margin: 0,
  },
  reflectieTitle: {
    fontFamily: config.fonts.voice,
    fontSize: "1.0625rem",
    fontWeight: 600,
    margin: "24px 0 12px",
  },
  stapLabel: {
    fontFamily: config.fonts.ui,
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: config.colors.text,
    margin: "20px 0 8px",
    display: "block",
  },
  stapInput: {
    fontFamily: config.fonts.voice,
    fontSize: "1rem",
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    borderRadius: 8,
    border: `1.5px solid ${config.colors.border}`,
    background: config.colors.surface,
    color: config.colors.text,
    lineHeight: 1.5,
    resize: "vertical",
    minHeight: 72,
  },
};

export default function HandelenBlok({ selections, axes, eersteStap, onEersteStapChange }) {
  const profielKey = useMemo(
    () => computeHandelenProfiel(selections, axes),
    [selections, axes]
  );
  const profiel = HANDELEN_PROFIELEN[profielKey];

  if (!profiel) return null;

  return (
    <section style={styles.section} aria-labelledby="handelen-kop">
      <h3 id="handelen-kop" style={styles.kop}>{HANDELEN_KOP}</h3>
      <p style={styles.inleiding}>{profiel.inleiding}</p>
      <p style={styles.profielTitel}>{profiel.titel}</p>

      {profiel.acties.map((actie) => (
        <div key={actie.tekst} style={styles.actieItem}>
          <p style={styles.faseLabel}>{actie.fase}</p>
          <p style={styles.actieText}>{actie.tekst}</p>
        </div>
      ))}

      <h4 style={styles.reflectieTitle}>Reflectie</h4>
      {profiel.reflectievragen.map((v) => (
        <div key={v.tekst} style={styles.actieItem}>
          <p style={styles.faseLabel}>{v.fase}</p>
          <p style={styles.actieText}>{v.tekst}</p>
        </div>
      ))}

      <label style={styles.stapLabel} htmlFor="handelen-eerste-stap">
        Mijn eerste kleine stap
      </label>
      <textarea
        id="handelen-eerste-stap"
        value={eersteStap}
        onChange={(e) => onEersteStapChange(e.target.value)}
        style={styles.stapInput}
        rows={3}
        placeholder="Optioneel — alleen voor nu en je PDF"
      />
    </section>
  );
}
