import { useParams } from "react-router-dom";
import { config } from "../config.js";

export default function TeamSurvey() {
  const { orgCode } = useParams();

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <h1 style={styles.title}>Organisatiescan</h1>
        <p style={styles.text}>
          Route <code>/team/{orgCode}</code> — beschikbaar in sessie 2.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: config.colors.surface2,
    color: config.colors.text,
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
    color: config.colors.textMuted,
  },
};
