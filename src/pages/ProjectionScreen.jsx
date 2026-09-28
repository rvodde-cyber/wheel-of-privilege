import { useParams, Link } from "react-router-dom";
import { config } from "../config.js";

export default function ProjectionScreen() {
  const { orgCode } = useParams();

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <h1 style={styles.title}>Projectiescherm</h1>
        <p style={styles.text}>
          In de lokale organisatiescan worden antwoorden niet centraal verzameld.
          Er is daarom geen live projectiewiel via <code>/scan/{orgCode}</code>.
        </p>
        <p style={styles.text}>
          Gebruik het resultaat en de PDF op het apparaat waarmee de scan is ingevuld.
        </p>
        <Link to="/" style={styles.link}>Terug naar start</Link>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: config.colors.projectionBg,
    color: config.colors.projectionText,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wrap: {
    textAlign: "center",
    padding: 32,
    maxWidth: 480,
  },
  title: {
    fontFamily: config.fonts.voice,
    fontSize: "1.5rem",
    marginBottom: 12,
  },
  text: {
    fontFamily: config.fonts.ui,
    opacity: 0.85,
    lineHeight: 1.6,
    marginBottom: 12,
  },
  link: {
    fontFamily: config.fonts.ui,
    color: config.colors.projectionStroke,
    fontWeight: 600,
    textDecoration: "none",
  },
};
