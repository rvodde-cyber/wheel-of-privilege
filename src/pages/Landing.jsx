import { Link } from "react-router-dom";
import PowerWheel from "../components/PowerWheel.jsx";
import SiteNav, { StartActions } from "../components/SiteNav.jsx";
import { AXES_SELF } from "../data/axesSelf.js";
import { config } from "../config.js";

const VOORBEELD_SELECTIES = {
  opleiding: "center",
  klasse: "center",
  ouders: "middle",
  etniciteit: "center",
  gender: "middle",
  seksualiteit: "center",
  religie: "middle",
  taal: "center",
  gezondheid: "periphery",
  neurodiversiteit: "middle",
  migratie: "center",
};

const KENMERKEN = ["Geen account", "Niets verlaat je apparaat", "Eindigt in een PDF-verslag"];

export default function Landing() {
  return (
    <div style={styles.page}>
      <SiteNav />
      <main style={styles.main}>
        <div className="wop-landing-grid">
          <div className="wop-landing-copy">
            <p style={styles.eyebrow}>Zelfreflectie · Organisatiescan</p>
            <h1 style={styles.title}>
              Wie staat er <em style={styles.accent}>dicht bij</em> de macht?
            </h1>
            <p style={styles.lead}>
              Bij jezelf of in je organisatie: maak zichtbaar wie vanzelf voordeel heeft. Als
              vertrekpunt, niet als oordeel.
            </p>
            <StartActions />
            <div style={styles.textLinks}>
              <Link to="/uitleg" style={styles.textLink}>
                Hoe het werkt
              </Link>
              <Link to="/onderbouwing" style={styles.textLink}>
                Lees de onderbouwing
              </Link>
            </div>
            <ul style={styles.features}>
              {KENMERKEN.map((item) => (
                <li key={item} style={styles.feature}>
                  <span style={styles.dot} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="wop-landing-visual">
            <div style={styles.card}>
              <PowerWheel
                variant="dots"
                size="large"
                selections={VOORBEELD_SELECTIES}
                axes={AXES_SELF}
                ariaLabel="Voorbeeldprofiel op het machtskruising"
              />
              <p style={styles.caption}>Voorbeeldprofiel</p>
            </div>
          </div>
        </div>

        <section style={styles.onderbouwingSect} aria-labelledby="landing-onderbouwing">
          <h2 id="landing-onderbouwing" style={styles.sectTitle}>Onderbouwing</h2>
          <p style={styles.sectText}>
            Wetenschappelijke verantwoording bij de organisatiescan: diversiteit, inclusie en wat
            de literatuur wel en niet laat zien.
          </p>
          <Link to="/onderbouwing" style={styles.textLink}>Lees de onderbouwing</Link>
        </section>
      </main>
      <footer style={styles.footer}>
        <Link to="/onderbouwing" style={styles.footerLink}>Lees de onderbouwing</Link>
      </footer>
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
    padding: "12px 24px 72px",
  },
  eyebrow: {
    fontFamily: config.fonts.ui,
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: config.colors.dotStrong,
    margin: "18px 0 14px",
  },
  title: {
    fontFamily: config.fonts.voice,
    fontSize: "clamp(2.4rem, 5vw, 3.75rem)",
    fontWeight: 600,
    lineHeight: 1.08,
    letterSpacing: "-0.02em",
    margin: "0 0 16px",
  },
  accent: {
    fontStyle: "italic",
    fontWeight: 500,
    color: config.colors.dotStrong,
  },
  lead: {
    fontFamily: config.fonts.ui,
    fontSize: "1.125rem",
    lineHeight: 1.5,
    color: config.colors.textMuted,
    margin: "0 0 8px",
    maxWidth: 520,
  },
  features: {
    listStyle: "none",
    padding: 0,
    margin: "18px 0 0",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  feature: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontFamily: config.fonts.ui,
    fontSize: "0.9375rem",
    color: config.colors.text,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: config.colors.dotStrong,
    flexShrink: 0,
  },
  textLinks: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px 20px",
    margin: "4px 0 0",
  },
  textLink: {
    fontFamily: config.fonts.ui,
    fontSize: "0.975rem",
    fontWeight: 600,
    color: config.colors.dotStrong,
    textDecoration: "underline",
    textUnderlineOffset: 3,
  },
  card: {
    background: config.colors.surface,
    border: `1px solid ${config.colors.border}`,
    borderRadius: 28,
    padding: "20px 12px 16px",
    boxShadow: "0 16px 40px rgba(26, 36, 34, 0.06)",
  },
  caption: {
    fontFamily: config.fonts.voice,
    fontStyle: "italic",
    fontSize: "0.95rem",
    color: config.colors.textMuted,
    textAlign: "center",
    margin: "4px 0 8px",
  },
  onderbouwingSect: {
    marginTop: 48,
    paddingTop: 32,
    borderTop: `1px solid ${config.colors.border}`,
    maxWidth: 520,
  },
  sectTitle: {
    fontFamily: config.fonts.voice,
    fontSize: "1.35rem",
    fontWeight: 600,
    margin: "0 0 10px",
  },
  sectText: {
    fontFamily: config.fonts.ui,
    fontSize: "1rem",
    lineHeight: 1.55,
    color: config.colors.textMuted,
    margin: "0 0 12px",
  },
  footer: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "24px 24px 40px",
    borderTop: `1px solid ${config.colors.border}`,
  },
  footerLink: {
    fontFamily: config.fonts.ui,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: config.colors.dotStrong,
    textDecoration: "underline",
    textUnderlineOffset: 3,
  },
};
