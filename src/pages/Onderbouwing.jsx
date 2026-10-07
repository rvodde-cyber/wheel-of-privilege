import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SiteNav from "../components/SiteNav.jsx";
import VerantwoordingBlokken from "../components/VerantwoordingBlokken.jsx";
import { bronnenLijst } from "../data/bronnenVerantwoording.js";
import { VERSIES } from "../data/verantwoordingVersies.js";
import { printVerantwoordingPdf } from "../utils/printVerantwoordingPdf.js";
import { sectieAnchorId } from "../utils/verantwoordingIds.js";
import { config } from "../config.js";

function resolveVersie(raw) {
  if (raw && VERSIES[raw]) return raw;
  return "wetenschappelijk";
}

export default function Onderbouwing() {
  const [searchParams] = useSearchParams();
  const versie = resolveVersie(searchParams.get("versie"));
  const doc = VERSIES[versie];
  const bronnen = useMemo(() => bronnenLijst(doc.bronnenIds), [doc.bronnenIds]);

  useEffect(() => {
    const previous = document.title;
    document.title = `${doc.titel} · Machtskruising`;
    return () => {
      document.title = previous;
    };
  }, [doc.titel]);

  return (
    <div style={styles.page}>
      <SiteNav />
      <main className="wop-onderbouwing-main" style={styles.main}>
        <Link to="/" style={styles.backLink}>← Terug naar start</Link>

        <p style={styles.eyebrow}>{doc.eyebrow}</p>
        <h1 style={styles.title}>{doc.titel}</h1>
        <p style={styles.subtitle}>{doc.ondertitel}</p>

        <div style={styles.actionsTop}>
          <button type="button" onClick={() => printVerantwoordingPdf(versie)} style={styles.primaryBtn}>
            Download als PDF
          </button>
          <p style={styles.privacy}>
            De PDF wordt in je browser gemaakt. Er wordt niets verzonden of opgeslagen.
          </p>
        </div>

        <div style={styles.kader}>
          <p style={styles.kaderTitel}>Samenvatting</p>
          <p style={styles.kaderText}>{doc.samenvatting}</p>
        </div>

        <nav aria-label="Inhoudsopgave" style={styles.toc}>
          <h2 style={styles.tocTitle}>Inhoud</h2>
          <ol style={styles.tocList}>
            {doc.secties.map((sectie) => {
              const id = sectieAnchorId(sectie.kop);
              return (
                <li key={sectie.kop}>
                  <a href={`#${id}`} style={styles.tocLink}>{sectie.kop}</a>
                </li>
              );
            })}
            <li>
              <a href="#bronnen" style={styles.tocLink}>Bronnen</a>
            </li>
          </ol>
        </nav>

        {doc.secties.map((sectie) => {
          const id = sectieAnchorId(sectie.kop);
          return (
            <section key={sectie.kop} id={id} style={styles.section}>
              <h2 style={styles.sectionTitle}>{sectie.kop}</h2>
              <VerantwoordingBlokken blokken={sectie.blokken} />
            </section>
          );
        })}

        <section id="bronnen" style={styles.section} aria-label="Bronnen">
          <h2 style={styles.sectionTitle}>Bronnen</h2>
          <ul style={styles.bronnen}>
            {bronnen.map((bron) => (
              <li key={bron} style={styles.bronItem}>{bron}</li>
            ))}
          </ul>
        </section>

        <div style={styles.actionsBottom}>
          <button type="button" onClick={() => printVerantwoordingPdf(versie)} style={styles.primaryBtn}>
            Download als PDF
          </button>
          <p style={styles.privacy}>
            De PDF wordt in je browser gemaakt. Er wordt niets verzonden of opgeslagen.
          </p>
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
    maxWidth: 720,
    margin: "0 auto",
    padding: "8px 20px 72px",
  },
  backLink: {
    display: "inline-block",
    fontFamily: config.fonts.ui,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: config.colors.dotStrong,
    textDecoration: "none",
    margin: "8px 0 16px",
  },
  eyebrow: {
    fontFamily: config.fonts.ui,
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: config.colors.dotStrong,
    margin: "0 0 10px",
  },
  title: {
    fontFamily: config.fonts.voice,
    fontSize: "clamp(1.75rem, 4vw, 2.35rem)",
    fontWeight: 600,
    lineHeight: 1.15,
    margin: "0 0 10px",
  },
  subtitle: {
    fontFamily: config.fonts.voice,
    fontStyle: "italic",
    fontSize: "1.0625rem",
    lineHeight: 1.5,
    color: config.colors.textMuted,
    margin: "0 0 20px",
  },
  actionsTop: {
    margin: "0 0 24px",
  },
  actionsBottom: {
    margin: "36px 0 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
  },
  primaryBtn: {
    fontFamily: config.fonts.ui,
    fontSize: "0.975rem",
    fontWeight: 600,
    color: config.colors.buttonText,
    background: config.colors.buttonBg,
    border: "none",
    borderRadius: 999,
    padding: "12px 20px",
    cursor: "pointer",
  },
  privacy: {
    fontFamily: config.fonts.ui,
    fontSize: "0.8125rem",
    color: config.colors.textMuted,
    margin: 0,
    maxWidth: 420,
    lineHeight: 1.45,
  },
  kader: {
    background: config.colors.selectedBg,
    border: `1px solid ${config.colors.border}`,
    borderRadius: 12,
    padding: "16px 18px",
    margin: "0 0 28px",
  },
  kaderTitel: {
    fontFamily: config.fonts.ui,
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: config.colors.dotStrong,
    margin: "0 0 8px",
  },
  kaderText: {
    fontFamily: config.fonts.voice,
    fontSize: "1.0625rem",
    lineHeight: 1.6,
    margin: 0,
  },
  toc: {
    margin: "0 0 32px",
    padding: "0 0 24px",
    borderBottom: `1px solid ${config.colors.border}`,
  },
  tocTitle: {
    fontFamily: config.fonts.ui,
    fontSize: "0.8125rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: config.colors.textMuted,
    margin: "0 0 10px",
  },
  tocList: {
    fontFamily: config.fonts.ui,
    fontSize: "0.9375rem",
    lineHeight: 1.55,
    margin: 0,
    paddingLeft: "1.25em",
  },
  tocLink: {
    color: config.colors.dotStrong,
    textDecoration: "underline",
    textUnderlineOffset: 3,
  },
  section: {
    padding: "8px 0 20px",
    borderBottom: `1px solid ${config.colors.border}`,
  },
  sectionTitle: {
    fontFamily: config.fonts.voice,
    fontSize: "1.25rem",
    fontWeight: 600,
    margin: "0 0 12px",
  },
  bronnen: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    fontFamily: config.fonts.ui,
    fontSize: "0.8125rem",
    lineHeight: 1.5,
    color: config.colors.textMuted,
  },
  bronItem: {
    paddingLeft: "1.5em",
    textIndent: "-1.5em",
    marginBottom: "0.5em",
  },
};
