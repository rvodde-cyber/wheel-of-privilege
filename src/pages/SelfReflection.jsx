import { useRef, useState, useEffect } from "react";
import IntroScreen from "../components/IntroScreen.jsx";
import AxisSelector from "../components/AxisSelector.jsx";
import PowerWheel from "../components/PowerWheel.jsx";
import IndividueleAnalyse from "../components/IndividueleAnalyse.jsx";
import { AXES_SELF } from "../data/axesSelf.js";
import { BRONNEN_APA } from "../data/adviesTeksten.js";
import { config, getFraming } from "../config.js";
import { printIndividuPdf } from "../utils/individuPrint.js";

export default function SelfReflection() {
  const framing = getFraming();
  const copy = framing.self;
  const [step, setStep] = useState("intro");
  const [axisIndex, setAxisIndex] = useState(0);
  const [selections, setSelections] = useState({});
  const wheelRef = useRef(null);

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
        justify-content: center;
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

  const currentAxis = AXES_SELF[axisIndex];

  function handleSelect(position) {
    setSelections((prev) => ({
      ...prev,
      [currentAxis.id]: position,
    }));
  }

  function goNext() {
    if (axisIndex < AXES_SELF.length - 1) {
      setAxisIndex((i) => i + 1);
    } else {
      setStep("result");
    }
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

  async function downloadWheel() {
    const svg = wheelRef.current?.querySelector("svg");
    if (!svg) return;

    const clone = svg.cloneNode(true);
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const svgData = new XMLSerializer().serializeToString(clone);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const scale = 2;
      const vb = svg.viewBox.baseVal;
      const w = vb.width || 504;
      const h = vb.height || 504;
      const canvas = document.createElement("canvas");
      canvas.width = w * scale;
      canvas.height = h * scale;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = config.colors.surface2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${framing.title.replace(/\s+/g, "-").toLowerCase()}-reflectie.png`;
        link.click();
        URL.revokeObjectURL(link.href);
      }, "image/png");
    };
    img.src = url;
  }

  if (step === "intro") {
    return (
      <div style={styles.page}>
        <IntroScreen mode="self" onStart={() => setStep("survey")} />
      </div>
    );
  }

  if (step === "result") {
    return (
      <div style={styles.page}>
        <div style={styles.resultWrap}>
          <h1 style={styles.resultTitle}>{copy.resultTitle}</h1>

          <div ref={wheelRef} style={styles.wheelBox}>
            <PowerWheel
              variant="dots"
              size="large"
              selections={selections}
              axes={AXES_SELF}
              ariaLabel="Jouw Machtskruising"
              animateEntrance
            />
          </div>

          <IndividueleAnalyse selections={selections} axes={AXES_SELF} />

          <div style={styles.actions}>
            <button
              type="button"
              onClick={() => printIndividuPdf({ selections, axes: AXES_SELF })}
              style={styles.primaryBtn}
            >
              {copy.downloadPdfLabel}
            </button>
            <button type="button" onClick={downloadWheel} style={styles.secondaryBtn}>
              {copy.downloadLabel}
            </button>
            <button type="button" onClick={restart} style={styles.secondaryBtn}>
              {copy.restartLabel}
            </button>
          </div>

          <section aria-label="Bronnen" style={styles.sourcesSection}>
            <h2 style={styles.sourcesTitle}>Bronnen</h2>
            <ul style={styles.sources}>
              {BRONNEN_APA.map((bron) => (
                <li key={bron} style={styles.sourceItem}>
                  {bron}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    );
  }

  const canGoNext = Boolean(selections[currentAxis.id]);

  return (
    <div style={styles.page}>
      <div className="wop-survey-layout" style={styles.surveyLayout}>
        <div className="wop-wheel-hero">
          <PowerWheel
            variant="dots"
            size="large"
            selections={selections}
            axes={AXES_SELF}
            highlightAxisIndex={axisIndex}
            ariaLabel="Machtskruising — live bijgewerkt"
          />
        </div>

        <div className="wop-form-col" style={styles.formCol}>
          <p style={styles.progress}>
            {copy.progressLabel} {axisIndex + 1} / {AXES_SELF.length}
          </p>

          <AxisSelector
            axis={currentAxis}
            selected={selections[currentAxis.id]}
            onSelect={handleSelect}
            instruction={copy.axisInstruction}
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
              disabled={!canGoNext}
              style={{
                ...styles.primaryBtn,
                opacity: canGoNext ? 1 : 0.45,
                cursor: canGoNext ? "pointer" : "not-allowed",
              }}
            >
              {axisIndex < AXES_SELF.length - 1 ? copy.nextLabel : copy.finishLabel}
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
  resultWrap: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "28px 20px 56px",
    textAlign: "center",
  },
  resultTitle: {
    fontFamily: config.fonts.voice,
    fontSize: "1.75rem",
    fontWeight: 600,
    margin: "0 0 12px",
  },
  wheelBox: {
    marginBottom: 28,
    padding: "12px 0",
    background: "linear-gradient(180deg, #EEF9F4 0%, #FFFFFF 100%)",
    borderRadius: 16,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 32,
  },
  sourcesSection: {
    textAlign: "left",
    marginTop: 16,
  },
  sourcesTitle: {
    fontFamily: config.fonts.ui,
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: config.colors.textMuted,
    margin: "0 0 8px",
  },
  sources: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  sourceItem: {
    fontFamily: config.fonts.ui,
    fontSize: "0.75rem",
    color: config.colors.textMuted,
    lineHeight: 1.45,
    marginBottom: 8,
    paddingLeft: "1.5em",
    textIndent: "-1.5em",
  },
};
