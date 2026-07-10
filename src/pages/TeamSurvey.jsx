import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IntroScreen from "../components/IntroScreen.jsx";
import AxisSelector from "../components/AxisSelector.jsx";
import PowerWheel from "../components/PowerWheel.jsx";
import { AXES_TEAM } from "../data/axesTeam.js";
import { config, getFraming } from "../config.js";

const ORG_CODE_PATTERN = /^[a-z0-9][a-z0-9_-]{0,31}$/i;

function isValidOrgCode(code) {
  return typeof code === "string" && ORG_CODE_PATTERN.test(code.trim());
}

export default function TeamSurvey() {
  const { orgCode: rawOrgCode } = useParams();
  const orgCode = rawOrgCode?.trim().toLowerCase() ?? "";
  const framing = getFraming();
  const copy = framing.team;

  const [step, setStep] = useState("intro");
  const [axisIndex, setAxisIndex] = useState(0);
  const [selections, setSelections] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const id = "wop-survey-layout";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = `
      .wop-survey-layout { display: flex; flex-direction: column; gap: 8px; }
      .wop-wheel-hero {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px 4px 4px;
        background: linear-gradient(180deg, #EEF9F4 0%, #FFFFFF 100%);
        border-bottom: 1px solid #D8E8E2;
      }
      @media (min-width: 768px) {
        .wop-survey-layout { flex-direction: row; align-items: flex-start; gap: 24px; padding-top: 16px; }
        .wop-wheel-hero {
          flex: 0 0 48%;
          position: sticky;
          top: 12px;
          border-bottom: none;
          border-radius: 16px;
          padding: 16px 8px;
        }
        .wop-form-col { flex: 1; min-width: 0; }
      }
    `;
    document.head.appendChild(el);
  }, []);

  if (!isValidOrgCode(orgCode)) {
    return (
      <div style={styles.page}>
        <div style={styles.centerWrap}>
          <h1 style={styles.errorTitle}>Ongeldige organisatiecode</h1>
          <p style={styles.errorText}>
            De link bevat geen geldige code. Vraag je begeleider om een correcte scan-link.
          </p>
        </div>
      </div>
    );
  }

  const currentAxis = AXES_TEAM[axisIndex];
  const isLastAxis = axisIndex === AXES_TEAM.length - 1;
  const canProceed = Boolean(selections[currentAxis.id]);

  function handleSelect(position) {
    setSelections((prev) => ({
      ...prev,
      [currentAxis.id]: position,
    }));
    setSubmitError("");
  }

  async function submitSurvey() {
    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/aggregate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgCode, answers: selections }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || copy.errorLabel);
      }

      setStep("thanks");
    } catch (error) {
      setSubmitError(error.message || copy.errorLabel);
    } finally {
      setSubmitting(false);
    }
  }

  async function goNext() {
    if (!canProceed || submitting) return;

    if (isLastAxis) {
      await submitSurvey();
      return;
    }

    setAxisIndex((i) => i + 1);
  }

  function goPrev() {
    if (axisIndex > 0 && !submitting) {
      setAxisIndex((i) => i - 1);
    }
  }

  if (step === "intro") {
    return (
      <div style={styles.page}>
        <IntroScreen mode="team" orgCode={orgCode} onStart={() => setStep("survey")} />
      </div>
    );
  }

  if (step === "thanks") {
    return (
      <div style={styles.page}>
        <div style={styles.centerWrap}>
          <h1 style={styles.thanksTitle}>{copy.thankYouTitle}</h1>
          <p style={styles.thanksText}>{copy.thankYouText}</p>
          <p style={styles.orgBadge}>Organisatie: {orgCode}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div className="wop-survey-layout" style={styles.surveyLayout}>
        <div className="wop-wheel-hero">
          <PowerWheel
            variant="filled"
            size="large"
            selections={selections}
            axes={AXES_TEAM}
            highlightAxisIndex={axisIndex}
            ariaLabel="Voorvertoning organisatieperceptie"
          />
          <p style={styles.previewNote}>{copy.previewNote}</p>
        </div>

        <div className="wop-form-col" style={styles.formCol}>
          <p style={styles.orgLine}>Organisatie: {orgCode}</p>
          <p style={styles.progress}>
            {copy.progressLabel} {axisIndex + 1} / {AXES_TEAM.length}
          </p>

          <AxisSelector
            axis={currentAxis}
            selected={selections[currentAxis.id]}
            onSelect={handleSelect}
            instruction={copy.axisInstruction}
          />

          {submitError && <p style={styles.errorBanner}>{submitError}</p>}

          <div style={styles.nav}>
            {axisIndex > 0 && (
              <button
                type="button"
                onClick={goPrev}
                disabled={submitting}
                style={styles.secondaryBtn}
              >
                {copy.prevLabel}
              </button>
            )}
            <button
              type="button"
              onClick={goNext}
              disabled={!canProceed || submitting}
              style={{
                ...styles.primaryBtn,
                opacity: canProceed && !submitting ? 1 : 0.45,
                cursor: canProceed && !submitting ? "pointer" : "not-allowed",
              }}
            >
              {submitting
                ? copy.submittingLabel
                : isLastAxis
                  ? copy.finishLabel
                  : copy.nextLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: config.colors.surface2,
    color: config.colors.text,
  },
  surveyLayout: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 8px 48px",
  },
  formCol: {
    flex: 1,
  },
  orgLine: {
    fontFamily: config.fonts.ui,
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: config.colors.dotStrong,
    margin: "12px 0 0",
    padding: "0 20px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  progress: {
    fontFamily: config.fonts.ui,
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: config.colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    margin: "8px 0 12px",
    padding: "0 20px",
  },
  previewNote: {
    fontFamily: config.fonts.ui,
    fontSize: "0.75rem",
    color: config.colors.textMuted,
    textAlign: "center",
    margin: "8px 12px 0",
    maxWidth: 320,
    lineHeight: 1.45,
  },
  nav: {
    display: "flex",
    gap: 12,
    justifyContent: "flex-end",
    padding: "24px 20px 0",
    flexWrap: "wrap",
  },
  primaryBtn: {
    fontFamily: config.fonts.ui,
    fontSize: "0.9375rem",
    fontWeight: 600,
    color: config.colors.buttonText,
    background: config.colors.buttonBg,
    border: "none",
    borderRadius: 8,
    padding: "12px 24px",
    cursor: "pointer",
  },
  secondaryBtn: {
    fontFamily: config.fonts.ui,
    fontSize: "0.9375rem",
    fontWeight: 500,
    color: config.colors.text,
    background: "transparent",
    border: `1.5px solid ${config.colors.border}`,
    borderRadius: 8,
    padding: "12px 24px",
    cursor: "pointer",
  },
  centerWrap: {
    maxWidth: 480,
    margin: "0 auto",
    padding: "48px 24px",
    textAlign: "center",
  },
  thanksTitle: {
    fontFamily: config.fonts.voice,
    fontSize: "1.75rem",
    fontWeight: 600,
    margin: "0 0 16px",
  },
  thanksText: {
    fontFamily: config.fonts.voice,
    fontSize: "1rem",
    color: config.colors.textMuted,
    lineHeight: 1.65,
    margin: "0 0 20px",
  },
  orgBadge: {
    fontFamily: config.fonts.ui,
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: config.colors.dotStrong,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  errorTitle: {
    fontFamily: config.fonts.voice,
    fontSize: "1.5rem",
    margin: "0 0 12px",
  },
  errorText: {
    fontFamily: config.fonts.voice,
    fontSize: "1rem",
    color: config.colors.textMuted,
    lineHeight: 1.6,
  },
  errorBanner: {
    fontFamily: config.fonts.ui,
    fontSize: "0.875rem",
    color: "#9B2C2C",
    background: "#FEF2F2",
    border: "1px solid #FECACA",
    borderRadius: 8,
    margin: "16px 20px 0",
    padding: "10px 14px",
  },
};
