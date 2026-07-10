import { config, POSITIONS } from "../config.js";

const POSITION_ORDER = ["center", "middle", "periphery"];

export default function AxisSelector({ axis, selected, onSelect, instruction }) {
  return (
    <div style={styles.wrap}>
      <h2 style={styles.question}>{axis.label}</h2>

      {instruction && <p style={styles.instruction}>{instruction}</p>}

      <div style={styles.options}>
        {POSITION_ORDER.map((key) => {
          const isSelected = selected === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              style={{
                ...styles.option,
                ...(isSelected ? styles.optionSelected : {}),
              }}
            >
              <span style={styles.optionLabel}>{POSITIONS[key].label}</span>
              <span style={styles.optionText}>{axis.positions[key]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    maxWidth: 520,
    margin: "0 auto",
    padding: "0 20px",
  },
  question: {
    fontFamily: config.fonts.voice,
    fontSize: "1.375rem",
    fontWeight: 600,
    color: config.colors.text,
    margin: "0 0 10px",
    lineHeight: 1.35,
  },
  instruction: {
    fontFamily: config.fonts.voice,
    fontSize: "0.9375rem",
    fontStyle: "italic",
    color: config.colors.textMuted,
    margin: "0 0 18px",
    lineHeight: 1.5,
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  option: {
    fontFamily: config.fonts.ui,
    textAlign: "left",
    background: config.colors.surface,
    border: `1.5px solid ${config.colors.border}`,
    borderRadius: 10,
    padding: "14px 16px",
    cursor: "pointer",
    transition: "border-color 0.15s, background 0.15s",
  },
  optionSelected: {
    background: config.colors.selectedBg,
    borderColor: config.colors.selectedBorder,
  },
  optionLabel: {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    color: config.colors.dotStrong,
    marginBottom: 6,
  },
  optionText: {
    display: "block",
    fontFamily: config.fonts.voice,
    fontSize: "0.9375rem",
    color: config.colors.text,
    lineHeight: 1.5,
  },
};
