import { config, POSITIONS } from "../config.js";
import { TUSSEN, ONBEKEND, formatTeamQuestion } from "../data/axesTeam.js";

const SELF_POSITION_ORDER = ["center", "middle", "periphery"];

const TEAM_OPTIONS = [
  { key: "center", label: "Machtscentrum", textKey: "centrum" },
  { key: "middle", label: "Tussen", text: TUSSEN },
  { key: "periphery", label: "Periferie", textKey: "periferie" },
  { key: "unknown", label: "Niet inschatten", text: ONBEKEND, muted: true },
];

export default function AxisSelector({
  axis,
  selected,
  onSelect,
  instruction,
  mode = "self",
}) {
  const isTeam = mode === "team";

  return (
    <div style={styles.wrap}>
      <h2 style={styles.question}>{isTeam ? axis.titel : axis.label}</h2>

      {isTeam && (
        <>
          <p style={styles.vraag}>{formatTeamQuestion(axis)}</p>
          {axis.hint && <p style={styles.hint}>{axis.hint}</p>}
        </>
      )}

      {!isTeam && instruction && <p style={styles.instruction}>{instruction}</p>}

      <div style={styles.options}>
        {isTeam
          ? TEAM_OPTIONS.map((opt) => {
              const isSelected = selected === opt.key;
              const bodyText =
                opt.text ??
                (opt.textKey && axis.opties ? axis.opties[opt.textKey] : "");
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => onSelect(opt.key)}
                  style={{
                    ...styles.option,
                    ...(opt.muted ? styles.optionMuted : {}),
                    ...(isSelected ? styles.optionSelected : {}),
                  }}
                >
                  <span
                    style={{
                      ...styles.optionLabel,
                      ...(opt.muted ? styles.optionLabelMuted : {}),
                    }}
                  >
                    {opt.label}
                  </span>
                  <span style={styles.optionText}>{bodyText}</span>
                </button>
              );
            })
          : SELF_POSITION_ORDER.map((key) => {
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
  vraag: {
    fontFamily: config.fonts.voice,
    fontSize: "1rem",
    fontWeight: 600,
    color: config.colors.text,
    margin: "0 0 8px",
    lineHeight: 1.45,
  },
  hint: {
    fontFamily: config.fonts.voice,
    fontSize: "0.9375rem",
    fontStyle: "italic",
    color: config.colors.textMuted,
    margin: "0 0 16px",
    lineHeight: 1.5,
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
  optionMuted: {
    background: "#F8FAF9",
    borderColor: "#E2E8E5",
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
  optionLabelMuted: {
    color: config.colors.textMuted,
  },
  optionText: {
    display: "block",
    fontFamily: config.fonts.voice,
    fontSize: "0.9375rem",
    color: config.colors.text,
    lineHeight: 1.5,
  },
};
