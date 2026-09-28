import { useEffect } from "react";
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
  question,
  tussenText,
  compact = false,
  heading,
  accent,
  showTitle = true,
  showHint = true,
}) {
  const isTeam = mode === "team";

  useEffect(() => {
    const id = "wop-axis-compact";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = `
      .wop-axis-options-compact { display: flex; flex-direction: column; }
      @media (min-width: 560px) {
        .wop-axis-options-compact { display: grid; grid-template-columns: 1fr 1fr; }
      }
    `;
    document.head.appendChild(el);
  }, []);

  const teamOptions = TEAM_OPTIONS.map((opt) =>
    opt.key === "middle" ? { ...opt, text: tussenText || TUSSEN } : opt
  );
  const vraagTekst = question || (isTeam ? formatTeamQuestion(axis) : "");

  return (
    <div style={{ ...styles.wrap, ...(compact ? styles.wrapCompact : {}) }}>
      {showTitle && (
        <h2 style={{ ...styles.question, ...(compact ? styles.questionCompact : {}) }}>
          {isTeam ? axis.titel : axis.label}
        </h2>
      )}

      {heading && (
        <p style={{ ...styles.heading, color: accent || config.colors.dotStrong }}>{heading}</p>
      )}

      {isTeam && (
        <>
          <p style={{ ...styles.vraag, ...(compact ? styles.vraagCompact : {}) }}>{vraagTekst}</p>
          {showHint && axis.hint && <p style={styles.hint}>{axis.hint}</p>}
        </>
      )}

      {!isTeam && instruction && <p style={styles.instruction}>{instruction}</p>}

      <div
        className={compact ? "wop-axis-options-compact" : undefined}
        style={compact ? { gap: 8 } : styles.options}
      >
        {isTeam
          ? teamOptions.map((opt) => {
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
                    ...(compact ? styles.optionCompact : {}),
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
  wrapCompact: {
    maxWidth: "none",
    margin: "0 0 8px",
    padding: "0 12px",
  },
  heading: {
    fontFamily: config.fonts.ui,
    fontSize: "0.8125rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    margin: "0 0 6px",
  },
  question: {
    fontFamily: config.fonts.voice,
    fontSize: "1.375rem",
    fontWeight: 600,
    color: config.colors.text,
    margin: "0 0 10px",
    lineHeight: 1.35,
  },
  questionCompact: {
    fontSize: "1.125rem",
  },
  vraag: {
    fontFamily: config.fonts.voice,
    fontSize: "1rem",
    fontWeight: 600,
    color: config.colors.text,
    margin: "0 0 8px",
    lineHeight: 1.45,
  },
  vraagCompact: {
    fontSize: "0.9375rem",
    margin: "0 0 10px",
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
  optionCompact: {
    padding: "10px 12px",
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
