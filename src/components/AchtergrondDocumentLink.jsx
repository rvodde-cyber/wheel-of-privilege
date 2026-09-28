import { config } from "../config.js";

export default function AchtergrondDocumentLink() {
  return (
    <a
      href="/downloads/Machtskruising_Waarom-inclusie-loont.pdf"
      download
      style={styles.btn}
    >
      Download achtergronddocument (PDF) ↓
    </a>
  );
}

const styles = {
  btn: {
    display: "inline-block",
    fontFamily: config.fonts.ui,
    fontSize: "0.9375rem",
    fontWeight: 500,
    color: config.colors.text,
    background: "transparent",
    border: `1.5px solid ${config.colors.border}`,
    borderRadius: 8,
    padding: "12px 24px",
    textDecoration: "none",
    margin: "0 0 16px",
  },
};
