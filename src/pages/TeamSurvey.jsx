import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import IntroScreen from "../components/IntroScreen.jsx";
import AchtergrondDocumentLink from "../components/AchtergrondDocumentLink.jsx";
import InclusieLoontSection from "../components/InclusieLoontSection.jsx";
import AxisSelector from "../components/AxisSelector.jsx";
import PowerWheel from "../components/PowerWheel.jsx";
import {
  AXES_TEAM,
  LENZEN,
  TUSSEN_EEN_LENS,
  TUSSEN_TWEE_LENZEN,
  formatTeamQuestion,
  formatTopQuestion,
} from "../data/axesTeam.js";
import { BRONNEN_APA } from "../data/adviesTeksten.js";
import {
  computeOrgConclusion,
  computeKloof,
  duidingForAxisRow,
  INSUFFICIENT_MESSAGE,
  KLOOF_INSUFFICIENT_MESSAGE,
  ORG_DISCLAIMER,
} from "../data/conclusie.js";
import { printOrganisatiePdf } from "../utils/orgPrint.js";
import { config, getFraming } from "../config.js";

const ORG_CODE_PATTERN = /^[a-z0-9][a-z0-9_-]{0,31}$/i;

function isValidOrgCode(code) {
  return typeof code === "string" && ORG_CODE_PATTERN.test(code.trim());
}

function lensLayers(selections) {
  return [
    {
      id: LENZEN.organisatie.id,
      selections: selections.organisatie,
      fill: config.colors.lensOrg,
      fillOpacity: 0.35,
      stroke: config.colors.lensOrg,
      dash: null,
      label: LENZEN.organisatie.label,
    },
    {
      id: LENZEN.top.id,
      selections: selections.top,
      fill: config.colors.lensTop,
      fillOpacity: 0.28,
      stroke: config.colors.lensTop,
      dash: "6 4",
      label: LENZEN.top.label,
    },
  ];
}

const EMPTY_SELECTIONS = { organisatie: {}, top: {} };

const POSITION_LABEL = {
  center: "Machtscentrum",
  middle: "Tussen",
  periphery: "Periferie",
  unknown: "Niet ingeschat",
};

function keuzeLabel(selection) {
  if (!selection) return "—";
  return POSITION_LABEL[selection] ?? selection;
}

export default function TeamSurvey() {
  const { orgCode: rawOrgCode } = useParams();
  const orgCode = rawOrgCode?.trim().toLowerCase() ?? "";
  const framing = getFraming();
  const copy = framing.team;

  const [step, setStep] = useState("intro");
  const [axisIndex, setAxisIndex] = useState(0);
  const [lensMode, setLensMode] = useState("twee");
  const [selections, setSelections] = useState(EMPTY_SELECTIONS);
  const wheelRef = useRef(null);
  const tweeLenzen = lensMode === "twee";

  const conclusion = useMemo(
    () =>
      step === "result" ? computeOrgConclusion(selections.organisatie, AXES_TEAM) : null,
    [step, selections]
  );
  const kloof = useMemo(
    () =>
      step === "result" && tweeLenzen
        ? computeKloof(selections.organisatie, selections.top, AXES_TEAM)
        : null,
    [step, tweeLenzen, selections]
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
  const activeLenses = tweeLenzen ? ["organisatie", "top"] : ["organisatie"];
  const canProceed = activeLenses.every((lens) => Boolean(selections[lens]?.[currentAxis.id]));

  function handleSelect(lens, position) {
    setSelections((prev) => ({
      ...prev,
      [lens]: {
        ...prev[lens],
        [currentAxis.id]: position,
      },
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
    setLensMode("twee");
    setSelections({ organisatie: {}, top: {} });
  }

  if (step === "intro") {
    return (
      <div style={styles.page}>
        <IntroScreen
          mode="team"
          orgCode={orgCode}
          onStart={(mode) => {
            setLensMode(mode === "een" ? "een" : "twee");
            setSelections({ organisatie: {}, top: {} });
            setAxisIndex(0);
            setStep("survey");
          }}
        />
      </div>
    );
  }

  if (step === "result") {
    return (
      <div style={styles.page}>
        <div style={styles.resultWrap}>
          <h1 style={styles.resultTitle}>{copy.resultTitle}</h1>
          <p style={styles.disclaimer}>{ORG_DISCLAIMER}</p>

          <div ref={wheelRef} style={styles.wheelBox}>
            <PowerWheel
              variant="filled"
              size="large"
              selections={selections.organisatie}
              layers={tweeLenzen ? lensLayers(selections) : undefined}
              axes={AXES_TEAM}
              ariaLabel="Organisatie-indruk op het machtskruising"
              legendDotLabel="Indruk organisatie"
              animateEntrance
            />
          </div>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Conclusie</h2>
            {conclusion && !conclusion.ok && (
              <p style={styles.warnText}>{INSUFFICIENT_MESSAGE}</p>
            )}
            {conclusion?.ok && conclusion.advies && (
              <>
                <p style={styles.bodyText}>{conclusion.advies.samenvatting}</p>
                <h3 style={styles.subTitle}>Onderbouwing</h3>
                <p style={styles.bodyText}>{conclusion.advies.onderbouwing}</p>
                <h3 style={styles.subTitle}>Advies</h3>
                <p style={styles.bodyText}>{conclusion.advies.advies}</p>
              </>
            )}
          </section>

          {tweeLenzen && kloof && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Kloof tussen organisatie en top</h2>
              {!kloof.ok && <p style={styles.warnText}>{KLOOF_INSUFFICIENT_MESSAGE}</p>}
              {kloof.ok && kloof.advies && (
                <>
                  <p style={styles.bodyText}>{kloof.advies.samenvatting}</p>
                  {kloof.topDichterBij.length > 0 && (
                    <>
                      <h3 style={styles.subTitle}>
                        Onderwerpen waar de top dichter bij het machtscentrum zit
                      </h3>
                      <ul style={styles.kloofList}>
                        {kloof.topDichterBij.map((as) => (
                          <li key={as.id}>{as.titel}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  <h3 style={styles.subTitle}>Onderbouwing</h3>
                  <p style={styles.bodyText}>{kloof.advies.onderbouwing}</p>
                  <h3 style={styles.subTitle}>Advies</h3>
                  <p style={styles.bodyText}>{kloof.advies.advies}</p>
                </>
              )}
            </section>
          )}

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Per onderwerp</h2>
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Onderwerp</th>
                    <th style={styles.th}>Organisatie</th>
                    {tweeLenzen && <th style={styles.th}>Top</th>}
                    <th style={styles.th}>Duiding</th>
                  </tr>
                </thead>
                <tbody>
                  {AXES_TEAM.map((axis) => (
                    <tr key={axis.id}>
                      <td style={styles.td}>{axis.titel}</td>
                      <td style={styles.td}>{keuzeLabel(selections.organisatie[axis.id])}</td>
                      {tweeLenzen && (
                        <td style={styles.td}>{keuzeLabel(selections.top[axis.id])}</td>
                      )}
                      <td style={styles.td}>
                        {duidingForAxisRow(
                          axis,
                          selections.organisatie,
                          selections.top,
                          tweeLenzen,
                          kloof?.perAs
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div style={styles.actions}>
            <button
              type="button"
              onClick={() =>
                printOrganisatiePdf({
                  selections,
                  axes: AXES_TEAM,
                  orgCode,
                  lensMode,
                })
              }
              style={styles.primaryBtn}
            >
              {copy.downloadPdfLabel}
            </button>
            <button type="button" onClick={restart} style={styles.secondaryBtn}>
              {copy.restartLabel}
            </button>
            <Link to="/" style={styles.textLink}>
              {copy.backToStartLabel}
            </Link>
          </div>

          <p style={styles.verantwoordingLinkWrap}>
            <Link to="/onderbouwing" style={styles.textLink}>
              Lees en download de volledige verantwoording
            </Link>
          </p>

          <InclusieLoontSection />
          <AchtergrondDocumentLink />

          <section aria-label="Bronnen">
            <h2 style={styles.subTitle}>Bronnen</h2>
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

  return (
    <div style={styles.page}>
      <div className="wop-survey-layout" style={styles.surveyLayout}>
        <div className="wop-wheel-hero">
          <PowerWheel
            variant="filled"
            size="large"
            selections={selections.organisatie}
            layers={tweeLenzen ? lensLayers(selections) : undefined}
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

          {tweeLenzen ? (
            <div>
              <h2 style={styles.axisTitle}>{currentAxis.titel}</h2>
              {currentAxis.hint && <p style={styles.axisHint}>{currentAxis.hint}</p>}
              <AxisSelector
                mode="team"
                compact
                heading={LENZEN.organisatie.label}
                accent={config.colors.lensOrg}
                axis={currentAxis}
                question={formatTeamQuestion(currentAxis)}
                tussenText={TUSSEN_TWEE_LENZEN}
                showTitle={false}
                showHint={false}
                selected={selections.organisatie[currentAxis.id]}
                onSelect={(position) => handleSelect("organisatie", position)}
              />
              <AxisSelector
                mode="team"
                compact
                heading={LENZEN.top.label}
                accent={config.colors.lensTop}
                axis={currentAxis}
                question={formatTopQuestion(currentAxis)}
                tussenText={TUSSEN_TWEE_LENZEN}
                showTitle={false}
                showHint={false}
                selected={selections.top[currentAxis.id]}
                onSelect={(position) => handleSelect("top", position)}
              />
            </div>
          ) : (
            <AxisSelector
              mode="team"
              axis={currentAxis}
              tussenText={TUSSEN_EEN_LENS}
              selected={selections.organisatie[currentAxis.id]}
              onSelect={(position) => handleSelect("organisatie", position)}
            />
          )}

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
  axisTitle: {
    fontFamily: config.fonts.voice,
    fontSize: "1.375rem",
    fontWeight: 600,
    color: config.colors.text,
    margin: "0 0 8px",
    padding: "0 12px",
    lineHeight: 1.35,
  },
  axisHint: {
    fontFamily: config.fonts.voice,
    fontSize: "0.9375rem",
    fontStyle: "italic",
    color: config.colors.textMuted,
    margin: "0 0 16px",
    padding: "0 12px",
    lineHeight: 1.5,
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
    maxWidth: 760,
    margin: "0 auto",
    padding: "28px 20px 56px",
  },
  resultTitle: {
    fontFamily: config.fonts.voice,
    fontSize: "1.75rem",
    fontWeight: 600,
    margin: "0 0 12px",
    lineHeight: 1.25,
  },
  disclaimer: {
    fontFamily: config.fonts.ui,
    fontSize: "0.875rem",
    color: config.colors.textMuted,
    lineHeight: 1.5,
    margin: "0 0 16px",
    padding: "12px 14px",
    background: "#F4FAF7",
    border: `1px solid ${config.colors.border}`,
    borderRadius: 8,
  },
  section: {
    margin: "8px 0 28px",
  },
  sectionTitle: {
    fontFamily: config.fonts.voice,
    fontSize: "1.25rem",
    fontWeight: 600,
    margin: "0 0 10px",
  },
  subTitle: {
    fontFamily: config.fonts.ui,
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: config.colors.textMuted,
    margin: "16px 0 6px",
  },
  bodyText: {
    fontFamily: config.fonts.voice,
    fontSize: "1rem",
    color: config.colors.text,
    lineHeight: 1.6,
    margin: "0 0 8px",
  },
  kloofList: {
    fontFamily: config.fonts.voice,
    fontSize: "1rem",
    lineHeight: 1.5,
    margin: "0 0 8px",
    paddingLeft: 20,
  },
  tableWrap: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: config.fonts.ui,
    fontSize: "0.875rem",
  },
  th: {
    textAlign: "left",
    padding: "8px 10px",
    background: "#EEF9F4",
    border: `1px solid ${config.colors.border}`,
    fontWeight: 700,
  },
  td: {
    textAlign: "left",
    padding: "8px 10px",
    border: `1px solid ${config.colors.border}`,
    verticalAlign: "top",
    lineHeight: 1.45,
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
    flexWrap: "wrap",
    gap: 12,
    alignItems: "center",
    marginTop: 8,
  },
  verantwoordingLinkWrap: {
    margin: "24px 0 8px",
    fontFamily: config.fonts.ui,
  },
  textLink: {
    fontFamily: config.fonts.ui,
    fontSize: "0.9375rem",
    color: config.colors.dotStrong,
    fontWeight: 600,
  },
  sources: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 8px",
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
