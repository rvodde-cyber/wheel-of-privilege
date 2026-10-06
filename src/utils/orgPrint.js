import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PowerWheel from "../components/PowerWheel.jsx";
import { BRONNEN_APA } from "../data/adviesTeksten.js";
import { LENZEN } from "../data/axesTeam.js";
import {
  computeKloof,
  computeOrgConclusion,
  duidingForAxisRow,
  INSUFFICIENT_MESSAGE,
  KLOOF_INSUFFICIENT_MESSAGE,
  ORG_DISCLAIMER,
} from "../data/conclusie.js";
import { config } from "../config.js";
import { buildInclusieLoontHtml, inclusieLoontPrintCss } from "./inclusieLoontHtml.js";

const POSITION_LABEL = {
  center: "Machtscentrum",
  middle: "Tussen",
  periphery: "Periferie",
  unknown: "Niet ingeschat",
};

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function keuzeLabel(selection) {
  if (!selection) return "—";
  return POSITION_LABEL[selection] ?? selection;
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

function adviesBlock(advies) {
  if (!advies) return "";
  return `
    <p>${escapeHtml(advies.samenvatting)}</p>
    <h3>Onderbouwing</h3>
    <p>${escapeHtml(advies.onderbouwing)}</p>
    <h3>Advies</h3>
    <p>${escapeHtml(advies.advies)}</p>`;
}

/**
 * @param {{
 *   selections: { organisatie: Record<string, string>, top: Record<string, string> },
 *   axes: { id: string, titel: string }[],
 *   orgCode?: string,
 *   lensMode?: "een" | "twee",
 * }} params
 */
export function printOrganisatiePdf({ selections, axes, orgCode = "", lensMode = "een" }) {
  const tweeLenzen = lensMode === "twee";
  const selOrg = selections?.organisatie ?? {};
  const selTop = selections?.top ?? {};
  const conclusion = computeOrgConclusion(selOrg, axes);
  const kloof = tweeLenzen ? computeKloof(selOrg, selTop, axes) : null;

  const wheelHtml = renderToStaticMarkup(
    createElement(PowerWheel, {
      variant: "filled",
      size: "large",
      selections: selOrg,
      layers: tweeLenzen ? lensLayers(selections) : undefined,
      axes,
      ariaLabel: "Organisatie-indruk op het machtskruising",
      legendDotLabel: "Indruk organisatie",
      forPrint: true,
      showLegend: true,
    })
  );

  const datum = new Date().toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const rows = axes
    .map((axis) => {
      const duiding = duidingForAxisRow(axis, selOrg, selTop, tweeLenzen, kloof?.perAs);
      const topCell = tweeLenzen ? `<td>${escapeHtml(keuzeLabel(selTop[axis.id]))}</td>` : "";
      return `
        <tr>
          <td>${escapeHtml(axis.titel)}</td>
          <td>${escapeHtml(keuzeLabel(selOrg[axis.id]))}</td>
          ${topCell}
          <td>${escapeHtml(duiding)}</td>
        </tr>`;
    })
    .join("");

  const topHeader = tweeLenzen ? "<th>Top</th>" : "";

  const conclusieBlock =
    conclusion.ok && conclusion.advies
      ? adviesBlock(conclusion.advies)
      : `<p class="warn">${escapeHtml(INSUFFICIENT_MESSAGE)}</p>`;

  let kloofBlock = "";
  if (tweeLenzen && kloof) {
    const lijst =
      kloof.ok && kloof.topDichterBij.length > 0
        ? `<h3>Onderwerpen waar de top dichter bij het machtscentrum zit</h3>
           <ul>${kloof.topDichterBij.map((as) => `<li>${escapeHtml(as.titel)}</li>`).join("")}</ul>`
        : "";
    const body =
      kloof.ok && kloof.advies
        ? `<p>${escapeHtml(kloof.advies.samenvatting)}</p>
           ${lijst}
           <h3>Onderbouwing</h3>
           <p>${escapeHtml(kloof.advies.onderbouwing)}</p>
           <h3>Advies</h3>
           <p>${escapeHtml(kloof.advies.advies)}</p>`
        : `<p class="warn">${escapeHtml(KLOOF_INSUFFICIENT_MESSAGE)}</p>`;
    kloofBlock = `<h2>Kloof tussen organisatie en top</h2>${body}`;
  }

  const bronnen = BRONNEN_APA.map((bron) => `<li>${escapeHtml(bron)}</li>`).join("");
  const inclusieBlock = buildInclusieLoontHtml(escapeHtml);
  const orgLine = orgCode ? `<p class="meta">Organisatie: ${escapeHtml(orgCode)}</p>` : "";

  const html = `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8" />
  <title>Machtskruising · Organisatiescan</title>
  <style>
    body {
      font-family: ${config.fonts.voice};
      color: ${config.colors.text};
      margin: 24px;
      line-height: 1.55;
      font-size: 11pt;
    }
    h1 { font-size: 1.5rem; margin: 0 0 8px; }
    h2 { font-size: 1.15rem; margin: 24px 0 8px; }
    h3 { font-size: 0.85rem; margin: 16px 0 6px; letter-spacing: 0.04em; text-transform: uppercase; }
    .kicker { font-family: ${config.fonts.ui}; font-weight: 700; margin: 0 0 4px; }
    .disclaimer {
      background: #f4faf7;
      border: 1px solid ${config.colors.border};
      padding: 12px 14px;
      border-radius: 8px;
      margin: 0 0 20px;
      font-size: 10pt;
      font-family: ${config.fonts.ui};
    }
    .meta { color: ${config.colors.textMuted}; font-size: 10pt; font-family: ${config.fonts.ui}; margin: 0 0 4px; }
    .wiel { margin: 8px 0 16px; }
    .wiel svg { width: 100%; max-width: 520px; height: auto; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 10pt; font-family: ${config.fonts.ui}; }
    th, td { border: 1px solid ${config.colors.border}; padding: 8px 10px; text-align: left; vertical-align: top; }
    th { background: #eef9f4; }
    .warn { color: #9b2c2c; font-weight: 600; }
    .bronnen { list-style: none; padding: 0; margin: 28px 0 0; font-size: 9pt; color: ${config.colors.textMuted}; font-family: ${config.fonts.ui}; }
    .bronnen li { padding-left: 1.5em; text-indent: -1.5em; margin: 0 0 0.45em; }
    ${inclusieLoontPrintCss()}
    @media print { body { margin: 12mm; } }
  </style>
</head>
<body>
  <p class="kicker">Machtskruising · Organisatiescan</p>
  <p class="meta">${escapeHtml(datum)}</p>
  ${orgLine}
  <h1>Jouw beeld van de organisatie</h1>
  <p class="disclaimer">${escapeHtml(ORG_DISCLAIMER)}</p>
  <div class="wiel">${wheelHtml}</div>
  <h2>Conclusie</h2>
  ${conclusieBlock}
  ${kloofBlock}
  <h2>Per onderwerp</h2>
  <table>
    <thead>
      <tr><th>Onderwerp</th><th>Organisatie</th>${topHeader}<th>Duiding</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  ${inclusieBlock}
  <h2>Bronnen</h2>
  <ul class="bronnen">${bronnen}</ul>
</body>
</html>`;

  const iframe = document.createElement("iframe");
  iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
  document.body.appendChild(iframe);
  iframe.srcdoc = html;
  iframe.onload = () => {
    const win = iframe.contentWindow;
    if (!win) return;
    const cleanup = () => {
      if (iframe.parentNode) iframe.remove();
    };
    win.addEventListener("afterprint", cleanup);
    win.focus();
    win.print();
    setTimeout(cleanup, 60000);
  };
}
