import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import IntroScreen from "../components/IntroScreen.jsx";
import AxisSelector from "../components/AxisSelector.jsx";
import PowerWheel from "../components/PowerWheel.jsx";
import { AXES_TEAM } from "../data/axesTeam.js";
import { computeOrgConclusion, INSUFFICIENT_MESSAGE } from "../data/conclusie.js";
import { printOrganisatiePdf } from "../utils/orgPrint.js";
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
  const wheelRef = useRef(null);

  const conclusion = useMemo(
    () => (step === "result" ? computeOrgConclusion(selections, AXES_TEAM) : null),
    [step, selections]
  );

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
        padding: 12px 8px 8px;
        background: linear-gradient(180deg, #EEF9F4 0%, #FFFFFF 100%);
        border-bottom: 1px solid #D8E8E2;
        overflow: visible;
      }
      .wop-form-col { padding-top: 24px; }
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
        .wop-form-col { flex: 1; min-width: 0; padding-top: 8px; }
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
  }

  function goNext() {
    if (!canProceed) return;
    if (isLastAxis) {
      setStep("result");
      return;
    }
    setAxisIndex((i) => i + 1);
  }

  function goPrev() {
    if (axisIndex > 0) {
      setAxisIndex((i) => i - 1);
    }
  }

  function restart() {
    setStep("intro");
    setAxisIndex(0);
    setSelections({});
  }

  if (step === "intro") {
    return (
      <div style={styles.page}>
        <IntroScreen mode="team" orgCode={orgCode} onStart={() => setStep("survey")} />
      </div>
    );
  }

  if (step === "result") {
    return (
      <div style={styles.page}>
        <div style={styles.resultWrap}>
          <h1 style={styles.resultTitle}>{copy.resultTitle}</h1>
          {conclusion && !conclusion.ok && (
            <p style={styles.warnText}>{INSUFFICIENT_MESSAGE}</p>
          )}
          {conclusion?.ok && conclusion.advies && (
            <p style={styles.resultText}>{conclusion.advies.samenvatting}</p>
          )}

          <div ref={wheelRef} style={styles.wheelBox}>
            <PowerWheel
              variant="filled"
              size="large"
              selections={selections}
              axes={AXES_TEAM}
              ariaLabel="Organisatie-indruk op het machtskruising"
            />
          </div>

          <div style={styles.actions}>
            <button
              type="button"
              onClick={() => printOrganisatiePdf(selections, AXES_TEAM, orgCode)}
              style={styles.primaryBtn}
            >
              {copy.downloadPdfLabel}
            </button>
            <button type="button" onClick={restart} style={styles.secondaryBtn}>
              {copy.restartLabel}
            </button>
          </div>
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
            ariaLabel="Voorvertoning organisatie-indruk"
          />
          <p style={styles.previewNote}>{copy.previewNote}</p>
        </div>

        <div className="wop-form-col" style={styles.formCol}>
          <p style={styles.orgLine}>Organisatie: {orgCode}</p>
          <p style={styles.progress}>
            {copy.progressLabel} {axisIndex + 1} / {AXES_TEAM.length}
          </p>

          <AxisSelector
            mode="team"
            axis={currentAxis}
            selected={selections[currentAxis.id]}
            onSelect={handleSelect}
          />

          <div style={styles.nav}>
            {axisIndex > 0 && (
              <button type="button" onClick={goPrev} style={styles.secondaryBtn}>
                {copy.prevLabel}
              </button>
            )}
            <button
              type="button"
              onClick={goNext}
              disabled={!canProceed}
              style={{
                ...styles.primaryBtn,
                opacity: canProceed ? 1 : 0.45,
                cursor: canProceed ? "pointer" : "not-allowed",
              }}
            >
              {isLastAxis ? copy.finishLabel : copy.nextLabel}
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
    padding: "16px 8px 48px",
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
    padding: "12px 20px 0",
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
  resultWrap: {
    maxWidth: 680,
    margin: "0 auto",
    padding: "24px 12px 48px",
    textAlign: "center",
  },
  resultTitle: {
    fontFamily: config.fonts.voice,
    fontSize: "1.75rem",
    fontWeight: 600,
    margin: "0 0 12px",
  },
  resultText: {
    fontFamily: config.fonts.voice,
    fontSize: "1rem",
    color: config.colors.textMuted,
    lineHeight: 1.6,
    margin: "0 0 20px",
  },
  warnText: {
    fontFamily: config.fonts.ui,
    fontSize: "0.9375rem",
    color: "#9B2C2C",
    fontWeight: 600,
    margin: "0 0 16px",
  },
  wheelBox: {
    marginBottom: 28,
    padding: "12px 0",
    background: "linear-gradient(180deg, #EEF9F4 0%, #FFFFFF 100%)",
    borderRadius: 16,
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    alignItems: "center",
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
};
