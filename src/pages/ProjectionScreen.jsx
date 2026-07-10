import { useParams } from "react-router-dom";
import { config } from "../config.js";

export default function ProjectionScreen() {
  const { orgCode } = useParams();

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <h1 style={styles.title}>Projectiescherm</h1>
        <p style={styles.text}>
          Route <code>/scan/{orgCode}</code> — beschikbaar in sessie 3.
        </p>
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
  },
  title: {
    fontFamily: config.fonts.voice,
    fontSize: "1.5rem",
    marginBottom: 12,
  },
  text: {
    fontFamily: config.fonts.ui,
    opacity: 0.8,
  },
};
