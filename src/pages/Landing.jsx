import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config, ATTRIBUTION, getFraming } from "../config.js";

const ORG_CODE_PATTERN = /^[a-z0-9][a-z0-9_-]{0,31}$/i;

export default function Landing() {
  const framing = getFraming();
  const copy = config.landing;
  const [orgCode, setOrgCode] = useState("");
  const [orgError, setOrgError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const id = "wop-landing-layout";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = `
      @media (min-width: 640px) {
        .wop-landing-cards { flex-direction: row; align-items: stretch; }
        .wop-landing-cards > section { flex: 1; }
      }
    `;
    document.head.appendChild(el);
  }, []);

  function startTeam() {
    const code = orgCode.trim().toLowerCase();
    if (!ORG_CODE_PATTERN.test(code)) {
      setOrgError(copy.orgCodeError);
      return;
    }
    setOrgError("");
    navigate(`/team/${code}`);
  }

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <header style={styles.header}>
          <h1 style={styles.title}>{framing.title}</h1>
          <p style={styles.intro}>{copy.intro}</p>
        </header>

        <div className="wop-landing-cards" style={styles.cards}>
          <section style={styles.card}>
            <h2 style={styles.cardTitle}>{copy.individualTitle}</h2>
            <p style={styles.cardText}>{copy.individualDescription}</p>
            <Link to="/individu" style={styles.primaryLink}>
              {copy.individualCta}
            </Link>
          </section>

          <section style={styles.card}>
            <h2 style={styles.cardTitle}>{copy.teamTitle}</h2>
            <p style={styles.cardText}>{copy.teamDescription}</p>
            <label style={styles.label} htmlFor="org-code">
              {copy.orgCodeLabel}
            </label>
            <input
              id="org-code"
              type="text"
              value={orgCode}
              onChange={(e) => {
                setOrgCode(e.target.value);
                setOrgError("");
              }}
              placeholder={copy.orgCodePlaceholder}
              style={{
                ...styles.input,
                borderColor: orgError ? "#FECACA" : config.colors.border,
              }}
              onKeyDown={(e) => e.key === "Enter" && startTeam()}
            />
            {orgError && <p style={styles.error}>{orgError}</p>}
            <button type="button" onClick={startTeam} style={styles.primaryBtn}>
              {copy.teamCta}
            </button>
          </section>
        </div>

        <p style={styles.attribution}>{ATTRIBUTION}</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: config.colors.surface2,
    color: config.colors.text,
  },
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "40px 20px 56px",
  },
  header: {
    marginBottom: 36,
    textAlign: "center",
  },
  title: {
    fontFamily: config.fonts.voice,
    fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
    fontWeight: 600,
    margin: "0 0 12px",
    lineHeight: 1.2,
  },
  intro: {
    fontFamily: config.fonts.voice,
    fontSize: "1.0625rem",
    color: config.colors.textMuted,
    lineHeight: 1.6,
    margin: 0,
  },
  cards: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  card: {
    background: config.colors.surface,
    border: `1.5px solid ${config.colors.border}`,
    borderRadius: 14,
    padding: "24px 22px",
  },
  cardTitle: {
    fontFamily: config.fonts.voice,
    fontSize: "1.25rem",
    fontWeight: 600,
    margin: "0 0 10px",
  },
  cardText: {
    fontFamily: config.fonts.voice,
    fontSize: "0.9375rem",
    color: config.colors.textMuted,
    lineHeight: 1.6,
    margin: "0 0 20px",
  },
  label: {
    display: "block",
    fontFamily: config.fonts.ui,
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: config.colors.textMuted,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    fontFamily: config.fonts.ui,
    fontSize: "1rem",
    padding: "12px 14px",
    border: `1.5px solid ${config.colors.border}`,
    borderRadius: 8,
    marginBottom: 12,
    outline: "none",
    boxSizing: "border-box",
  },
  error: {
    fontFamily: config.fonts.ui,
    fontSize: "0.8125rem",
    color: "#9B2C2C",
    margin: "0 0 12px",
  },
  primaryBtn: {
    fontFamily: config.fonts.ui,
    fontSize: "0.9375rem",
    fontWeight: 600,
    color: config.colors.buttonText,
    background: config.colors.buttonBg,
    border: "none",
    borderRadius: 8,
    padding: "12px 24px",
    cursor: "pointer",
    width: "100%",
    maxWidth: 280,
  },
  primaryLink: {
    display: "inline-block",
    fontFamily: config.fonts.ui,
    fontSize: "0.9375rem",
    fontWeight: 600,
    color: config.colors.buttonText,
    background: config.colors.buttonBg,
    borderRadius: 8,
    padding: "12px 24px",
    textDecoration: "none",
    textAlign: "center",
    maxWidth: 280,
  },
  attribution: {
    fontFamily: config.fonts.ui,
    fontSize: "0.8125rem",
    color: config.colors.textMuted,
    lineHeight: 1.55,
    margin: "32px 0 0",
    padding: "12px 14px",
    background: "#F4FAF7",
    borderRadius: 8,
    border: `1px solid ${config.colors.border}`,
  },
};
