import { useEffect } from "react";
import {
  INCLUSIE_GESPREKSVRAGEN,
  INCLUSIE_INTRO,
  INCLUSIE_NUANCE,
  INCLUSIE_TITEL,
  INCLUSIE_VOORDELEN,
} from "../data/inclusieVoordelen.js";
import { config } from "../config.js";

export default function InclusieLoontSection() {
  useEffect(() => {
    const id = "wop-inclusie-layout";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = `
      .wop-inclusie-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
        margin: 16px 0 20px;
      }
      @media (min-width: 760px) {
        .wop-inclusie-grid { grid-template-columns: 1fr 1fr; }
      }
    `;
    document.head.appendChild(el);
  }, []);

  return (
    <section style={styles.section} aria-labelledby="inclusie-titel">
      <h2 id="inclusie-titel" style={styles.title}>{INCLUSIE_TITEL}</h2>
      <p style={styles.intro}>{INCLUSIE_INTRO}</p>

      <div className="wop-inclusie-grid">
        {INCLUSIE_VOORDELEN.map((voordeel) => (
          <article key={voordeel.titel}>
            <p style={styles.voordeelTitel}>
              <strong>{voordeel.titel}</strong>
            </p>
            <p style={styles.voordeelTekst}>{voordeel.tekst}</p>
            <p style={styles.voordeelBron}>({voordeel.bronnen})</p>
          </article>
        ))}
      </div>

      <div style={styles.nuance}>
        <p style={styles.nuanceTitel}>
          <strong>{INCLUSIE_NUANCE.titel}</strong>
        </p>
        <p style={styles.nuanceTekst}>{INCLUSIE_NUANCE.tekst}</p>
        <p style={styles.voordeelBron}>({INCLUSIE_NUANCE.bronnen})</p>
      </div>

      <h3 style={styles.gesprekKop}>{INCLUSIE_GESPREKSVRAGEN.titel}</h3>
      <ol style={styles.gesprekList}>
        {INCLUSIE_GESPREKSVRAGEN.vragen.map((vraag) => (
          <li key={vraag} style={styles.gesprekItem}>{vraag}</li>
        ))}
      </ol>
    </section>
  );
}

const styles = {
  section: {
    margin: "32px 0 28px",
    paddingTop: 8,
    borderTop: `1px solid ${config.colors.border}`,
  },
  title: {
    fontFamily: config.fonts.voice,
    fontSize: "1.25rem",
    fontWeight: 600,
    margin: "0 0 10px",
  },
  intro: {
    fontFamily: config.fonts.voice,
    fontSize: "1rem",
    lineHeight: 1.6,
    margin: "0 0 4px",
  },
  voordeelTitel: {
    fontFamily: config.fonts.ui,
    fontSize: "0.9375rem",
    margin: "0 0 6px",
  },
  voordeelTekst: {
    fontFamily: config.fonts.voice,
    fontSize: "0.9375rem",
    lineHeight: 1.55,
    margin: "0 0 4px",
  },
  voordeelBron: {
    fontFamily: config.fonts.ui,
    fontSize: "0.8125rem",
    color: config.colors.textMuted,
    margin: "0 0 8px",
  },
  nuance: {
    background: "#EEF9F4",
    border: `1px solid ${config.colors.border}`,
    borderRadius: 10,
    padding: "14px 16px",
    margin: "4px 0 20px",
  },
  nuanceTitel: {
    fontFamily: config.fonts.ui,
    fontSize: "0.9375rem",
    margin: "0 0 6px",
  },
  nuanceTekst: {
    fontFamily: config.fonts.voice,
    fontSize: "0.9375rem",
    lineHeight: 1.55,
    margin: "0 0 6px",
  },
  gesprekKop: {
    fontFamily: config.fonts.ui,
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: config.colors.textMuted,
    margin: "0 0 10px",
  },
  gesprekList: {
    fontFamily: config.fonts.voice,
    fontSize: "1.0625rem",
    lineHeight: 1.5,
    margin: 0,
    paddingLeft: "1.35rem",
  },
  gesprekItem: {
    margin: "0 0 10px",
  },
};
