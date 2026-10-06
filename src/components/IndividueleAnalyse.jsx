import { useMemo } from "react";
import { config } from "../config.js";
import { buildIndividueleAnalyse } from "../data/analyseIndividu.js";

const styles = {
  wrap: {
    textAlign: "left",
    marginTop: 8,
  },
  mainTitle: {
    fontFamily: config.fonts.voice,
    fontSize: "1.75rem",
    fontWeight: 600,
    margin: "0 0 10px",
    textAlign: "center",
  },
  opening: {
    fontFamily: config.fonts.voice,
    fontSize: "1rem",
    fontStyle: "italic",
    color: config.colors.textMuted,
    lineHeight: 1.6,
    margin: "0 0 24px",
    textAlign: "center",
  },
  section: {
    margin: "0 0 28px",
  },
  sectionTitle: {
    fontFamily: config.fonts.voice,
    fontSize: "1.25rem",
    fontWeight: 600,
    margin: "0 0 10px",
  },
  bodyText: {
    fontFamily: config.fonts.voice,
    fontSize: "1rem",
    color: config.colors.text,
    lineHeight: 1.6,
    margin: "0 0 10px",
  },
  axisItem: {
    margin: "0 0 14px",
  },
  axisTitle: {
    fontFamily: config.fonts.ui,
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: config.colors.textMuted,
    margin: "0 0 4px",
  },
  tussenList: {
    fontFamily: config.fonts.voice,
    fontSize: "1rem",
    lineHeight: 1.5,
    margin: "12px 0 0",
    paddingLeft: 20,
  },
  kruisingItem: {
    margin: "0 0 10px",
  },
  faseLabel: {
    fontFamily: config.fonts.ui,
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: config.colors.dotStrong,
    margin: "0 0 6px",
  },
  vraagText: {
    fontFamily: config.fonts.voice,
    fontSize: "1.0625rem",
    lineHeight: 1.55,
    margin: "0 0 18px",
  },
  vraagBlock: {
    margin: "0 0 8px",
  },
  mmvNote: {
    fontFamily: config.fonts.ui,
    fontSize: "0.75rem",
    color: config.colors.textMuted,
    lineHeight: 1.45,
    margin: "8px 0 0",
  },
  volhoudenCard: {
    background: "#F4FAF7",
    border: `1px solid ${config.colors.border}`,
    borderRadius: 8,
    padding: "16px 18px",
    margin: "0 0 8px",
  },
  afsluiting: {
    fontFamily: config.fonts.voice,
    fontSize: "1rem",
    fontStyle: "italic",
    color: config.colors.textMuted,
    lineHeight: 1.6,
    margin: "8px 0 0",
    textAlign: "center",
  },
};

function AxisBlock({ titel, tekst }) {
  return (
    <div style={styles.axisItem}>
      <p style={styles.axisTitle}>{titel}</p>
      <p style={styles.bodyText}>{tekst}</p>
    </div>
  );
}

export default function IndividueleAnalyse({ selections, axes }) {
  const analyse = useMemo(() => buildIndividueleAnalyse(selections, axes), [selections, axes]);

  const reflectieVragen = analyse.vragen.filter((v) => v.fase !== "Volhouden");
  const volhouden = analyse.vragen.find((v) => v.fase === "Volhouden");

  return (
    <div style={styles.wrap}>
      <h2 style={styles.mainTitle}>Jouw kruising</h2>
      <p style={styles.opening}>{analyse.opening}</p>

      {analyse.algemeen && (
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Algemeen beeld</h3>
          <p style={styles.bodyText}>{analyse.algemeen}</p>
          {analyse.tussen.length > 0 && (
            <ul style={styles.tussenList}>
              {analyse.tussen.map((item) => (
                <li key={item.titel}>{item.titel}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {analyse.windMee.length > 0 && (
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Waar je wind mee hebt</h3>
          {analyse.windMee.map((item) => (
            <AxisBlock key={item.titel} titel={item.titel} tekst={item.tekst} />
          ))}
        </section>
      )}

      {analyse.windTegen.length > 0 && (
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Waar je wind tegen kunt ervaren</h3>
          {analyse.windTegen.map((item) => (
            <AxisBlock key={item.titel} titel={item.titel} tekst={item.tekst} />
          ))}
        </section>
      )}

      {analyse.kruisingen.length > 0 && (
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Waar het kruist</h3>
          {analyse.kruisingen.map((tekst, i) => (
            <p key={i} style={{ ...styles.bodyText, ...styles.kruisingItem }}>{tekst}</p>
          ))}
        </section>
      )}

      {analyse.richtingTop.length > 0 && (
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Richting de top</h3>
          {analyse.richtingTop.map((tekst, i) => (
            <p key={i} style={styles.bodyText}>{tekst}</p>
          ))}
        </section>
      )}

      {reflectieVragen.length > 0 && (
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Om over na te denken</h3>
          {reflectieVragen.map((v) => (
            <div key={v.fase} style={styles.vraagBlock}>
              <p style={styles.faseLabel}>{v.fase}</p>
              <p style={styles.vraagText}>{v.tekst}</p>
            </div>
          ))}
          <p style={styles.mmvNote}>
            Deze vragen volgen het Model Moreel Vakmanschap: zien, voelen, wegen, handelen en volhouden.
          </p>
        </section>
      )}

      {volhouden && (
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Om mee te nemen</h3>
          <div style={styles.volhoudenCard}>
            <p style={styles.faseLabel}>{volhouden.fase}</p>
            <p style={{ ...styles.vraagText, margin: 0 }}>{volhouden.tekst}</p>
          </div>
        </section>
      )}

      <p style={styles.afsluiting}>{analyse.afsluiting}</p>
    </div>
  );
}
