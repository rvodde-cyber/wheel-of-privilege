import { useEffect, useState } from "react";
import { config, ATTRIBUTION, ORG_ATTRIBUTION, getFraming } from "../config.js";
import { formatTeamQuestion } from "../data/axesTeam.js";

const ORG_STEPS = [
  "Loop in gedachten door de organisatie: de werkvloer, de teamoverleggen, de kantine.",
  "Kijk daarna omhoog: het management, de directie, de plekken waar besluiten vallen. Wie zit daar aan tafel?",
  "Kies per onderwerp je algemene indruk. Het gaat om een globale inschatting, niet om exacte aantallen.",
  "Weet je het niet? Kies 'Dat kan ik niet inschatten'. Dat is een volwaardig en eerlijk antwoord.",
  "Beoordeel nooit individuele collega's. Baseer je op wat zichtbaar, bekend of bespreekbaar is in de organisatie.",
];

const LENS_OPTIONS = [
  {
    id: "een",
    title: "Eén lens",
    text: "Hele organisatie",
  },
  {
    id: "twee",
    title: "Twee lenzen",
    text: "Hele organisatie én de top (directie en management)",
    recommended: true,
  },
];

const VASTE_VRAAG = formatTeamQuestion({ vraagdeel: "…" }).replace(/\?$/, "");

function LensChoice({ lensMode, setLensMode }) {
  return (
    <div role="radiogroup" aria-label="Aantal lenzen" className="wop-team-lenses">
      {LENS_OPTIONS.map((option) => {
        const selected = lensMode === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setLensMode(option.id)}
            className={selected ? "wop-team-lens is-selected" : "wop-team-lens"}
          >
            <span className={selected ? "wop-team-radio is-selected" : "wop-team-radio"} aria-hidden="true" />
            <span className="wop-team-lens-copy">
              <span className="wop-team-lens-title-row">
                <span className="wop-team-lens-title">{option.title}</span>
                {option.recommended && <span className="wop-team-badge">aanbevolen</span>}
              </span>
              <span className="wop-team-lens-text">{option.text}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function IntroScreen({ mode = "self", orgCode, onStart }) {
  const framing = getFraming();
  const copy = mode === "self" ? framing.self : framing.team;
  const isTeam = mode === "team";
  const [lensMode, setLensMode] = useState("twee");

  useEffect(() => {
    const id = "wop-team-intro-css";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = `
      .wop-team-intro {
        display: flex;
        flex-direction: column;
        gap: 20px;
        max-width: 1040px;
        margin: 0 auto;
        padding: 24px 20px 40px;
      }
      .wop-team-main { display: contents; }
      .wop-team-head { order: 1; }
      .wop-team-aside { order: 2; }
      .wop-team-body { order: 3; }
      .wop-team-title {
        font-family: ${config.fonts.voice};
        font-size: clamp(1.75rem, 4vw, 2.25rem);
        font-weight: 600;
        color: ${config.colors.text};
        margin: 0 0 8px;
        line-height: 1.15;
      }
      .wop-team-org {
        font-family: ${config.fonts.ui};
        font-size: 0.8125rem;
        font-weight: 600;
        color: ${config.colors.dotStrong};
        margin: 0 0 8px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .wop-team-sub {
        font-family: ${config.fonts.voice};
        font-size: 1.125rem;
        font-style: italic;
        color: ${config.colors.textMuted};
        line-height: 1.45;
        margin: 0;
      }
      .wop-team-card {
        background: ${config.colors.surface};
        border: 1px solid ${config.colors.border};
        border-radius: 16px;
        padding: 16px;
      }
      .wop-team-kicker {
        font-family: ${config.fonts.ui};
        font-size: 0.8125rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: ${config.colors.textMuted};
        margin: 0 0 10px;
      }
      .wop-team-lenses { display: flex; flex-direction: column; gap: 8px; }
      .wop-team-lens {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        text-align: left;
        width: 100%;
        font-family: ${config.fonts.ui};
        background: ${config.colors.surface};
        border: 1.5px solid ${config.colors.border};
        border-radius: 12px;
        padding: 14px 16px;
        cursor: pointer;
      }
      .wop-team-lens.is-selected {
        background: ${config.colors.selectedBg};
        border-color: ${config.colors.selectedBorder};
      }
      .wop-team-radio {
        width: 18px;
        height: 18px;
        margin-top: 2px;
        border-radius: 50%;
        border: 2px solid ${config.colors.border};
        flex-shrink: 0;
        box-sizing: border-box;
      }
      .wop-team-radio.is-selected {
        border-color: ${config.colors.dotStrong};
        background: ${config.colors.dotStrong};
        box-shadow: inset 0 0 0 3px #FFFFFF;
      }
      .wop-team-lens-copy { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
      .wop-team-lens-title-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
      .wop-team-lens-title { font-size: 1rem; font-weight: 700; color: ${config.colors.text}; }
      .wop-team-lens-text {
        font-family: ${config.fonts.voice};
        font-size: 0.9375rem;
        color: ${config.colors.text};
        line-height: 1.4;
      }
      .wop-team-badge {
        font-size: 0.6875rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: ${config.colors.buttonText};
        background: ${config.colors.buttonBg};
        border-radius: 999px;
        padding: 2px 8px;
      }
      .wop-team-start {
        font-family: ${config.fonts.ui};
        font-size: 1rem;
        font-weight: 600;
        color: ${config.colors.buttonText};
        background: ${config.colors.buttonBg};
        border: none;
        border-radius: 8px;
        padding: 14px 18px;
        cursor: pointer;
        width: 100%;
        margin-top: 12px;
      }
      .wop-team-duration {
        font-family: ${config.fonts.ui};
        font-size: 0.8125rem;
        color: ${config.colors.textMuted};
        text-align: center;
        margin: 10px 0 0;
      }
      .wop-team-steps-title {
        font-family: ${config.fonts.ui};
        font-size: 0.8125rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: ${config.colors.textMuted};
        margin: 0 0 8px;
      }
      .wop-team-steps {
        font-family: ${config.fonts.voice};
        font-size: 1rem;
        line-height: 1.5;
        color: ${config.colors.text};
        margin: 0 0 16px;
        padding-left: 1.25rem;
      }
      .wop-team-steps li { margin: 0 0 6px; }
      .wop-team-steps li:last-child { margin-bottom: 0; }
      .wop-team-privacy {
        font-family: ${config.fonts.ui};
        font-size: 0.875rem;
        color: ${config.colors.dotStrong};
        margin: 0 0 12px;
        font-weight: 500;
        line-height: 1.5;
      }
      .wop-team-sources {
        font-family: ${config.fonts.ui};
        font-size: 0.8125rem;
        color: ${config.colors.textMuted};
        line-height: 1.5;
        margin: 0;
        padding: 12px 14px;
        background: #F4FAF7;
        border-radius: 8px;
        border: 1px solid ${config.colors.border};
      }
      @media (min-width: 900px) {
        .wop-team-intro {
          flex-direction: row;
          align-items: flex-start;
          gap: 48px;
          padding: 28px 24px 48px;
        }
        .wop-team-main {
          display: block;
          flex: 1.1;
          min-width: 0;
        }
        .wop-team-head, .wop-team-body, .wop-team-aside { order: 0; }
        .wop-team-aside {
          flex: 1;
          position: sticky;
          top: 24px;
          align-self: flex-start;
        }
      }
    `;
    document.head.appendChild(el);
  }, []);

  if (!isTeam) {
    return (
      <div style={styles.wrap}>
        <header style={styles.header}>
          <h1 style={styles.title}>{framing.title}</h1>
          <p style={styles.subtitle}>{copy.subtitle}</p>
        </header>
        <p style={styles.intro}>{copy.intro}</p>
        <p style={styles.attribution}>{ATTRIBUTION}</p>
        {copy.privacyNote && <p style={styles.privacy}>{copy.privacyNote}</p>}
        <button type="button" onClick={onStart} style={styles.button}>
          {copy.startLabel}
        </button>
      </div>
    );
  }

  return (
    <div className="wop-team-intro">
      <div className="wop-team-main">
        <header className="wop-team-head">
          <h1 className="wop-team-title">Organisatiescan</h1>
          {orgCode && <p className="wop-team-org">Organisatie: {orgCode}</p>}
          <p className="wop-team-sub">{VASTE_VRAAG}</p>
        </header>
        <div className="wop-team-body">
          <p className="wop-team-steps-title">Zo vul je in</p>
          <ol className="wop-team-steps">
            {ORG_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="wop-team-privacy">
            Alles blijft op dit apparaat. Er wordt niets verzonden of opgeslagen;
            aan het eind kun je een PDF downloaden.
          </p>
          <p className="wop-team-sources">{ORG_ATTRIBUTION}</p>
        </div>
      </div>
      <aside className="wop-team-aside">
        <div className="wop-team-card">
          <p className="wop-team-kicker">Kies je lens</p>
          <LensChoice lensMode={lensMode} setLensMode={setLensMode} />
          <button type="button" onClick={() => onStart(lensMode)} className="wop-team-start">
            {copy.startLabel}
          </button>
          <p className="wop-team-duration">Duurt ongeveer 5 minuten · 11 onderwerpen</p>
        </div>
      </aside>
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
    margin: "0 0 16px",
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
