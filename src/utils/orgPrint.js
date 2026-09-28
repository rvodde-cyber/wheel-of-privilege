import {
  computeOrgConclusion,
  POSITION_DUIDING,
  selectionToScore,
  INSUFFICIENT_MESSAGE,
} from "../data/conclusie.js";
import { BRONNEN } from "../data/adviesTeksten.js";

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

/**
 * @param {Record<string, string>} selections
 * @param {import("../data/axesTeam.js").AXES_TEAM} axes
 * @param {string} [orgCode]
 */
export function printOrganisatiePdf(selections, axes, orgCode = "") {
  const conclusion = computeOrgConclusion(selections, axes);
  const rows = axes
    .map((axis) => {
      const sel = selections[axis.id];
      const score = selectionToScore(sel);
      const duidingKey = score === null ? "null" : score;
      const duiding = POSITION_DUIDING[duidingKey];
      const keuze = sel ? POSITION_LABEL[sel] ?? sel : "—";
      return `
        <tr>
          <td>${escapeHtml(axis.titel)}</td>
          <td>${escapeHtml(keuze)}</td>
          <td>${escapeHtml(duiding)}</td>
        </tr>`;
    })
    .join("");

  const disclaimer =
    "Ingevuld door één professional op basis van een persoonlijke indruk; geen meting.";

  let conclusieBlock = `<p class="warn">${escapeHtml(INSUFFICIENT_MESSAGE)}</p>`;
  if (conclusion.ok && conclusion.advies) {
    conclusieBlock = `
      <h2>Conclusie</h2>
      <p>${escapeHtml(conclusion.advies.samenvatting)}</p>
      <h3>Onderbouwing</h3>
      <p>${escapeHtml(conclusion.advies.onderbouwing)}</p>
      <h3>Advies</h3>
      <p>${escapeHtml(conclusion.advies.advies)}</p>`;
  }

  const orgLine = orgCode
    ? `<p class="meta">Organisatiecode (label): ${escapeHtml(orgCode)}</p>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8" />
  <title>Organisatiescan — resultaat</title>
  <style>
    body { font-family: Georgia, "Times New Roman", serif; color: #1a2422; margin: 24px; line-height: 1.55; font-size: 11pt; }
    h1 { font-size: 1.5rem; margin: 0 0 8px; }
    h2 { font-size: 1.15rem; margin: 24px 0 8px; }
    h3 { font-size: 1rem; margin: 16px 0 6px; }
    .disclaimer { background: #f4faf7; border: 1px solid #d8e8e2; padding: 12px 14px; border-radius: 8px; margin: 0 0 20px; font-size: 10pt; }
    .meta { color: #5a6b66; font-size: 10pt; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 10pt; }
    th, td { border: 1px solid #d8e8e2; padding: 8px 10px; text-align: left; vertical-align: top; }
    th { background: #eef9f4; }
    .warn { color: #9b2c2c; font-weight: 600; }
    .bron { margin-top: 28px; font-size: 9pt; color: #5a6b66; }
    @media print { body { margin: 12mm; } }
  </style>
</head>
<body>
  <p class="disclaimer">${escapeHtml(disclaimer)}</p>
  <h1>Organisatiescan</h1>
  ${orgLine}
  ${conclusieBlock}
  <h2>Overzicht per onderwerp</h2>
  <table>
    <thead>
      <tr><th>Onderwerp</th><th>Jouw indruk</th><th>Duiding</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  <p class="bron">${escapeHtml(BRONNEN)}</p>
  <script>window.onload = function() { window.print(); };</script>
</body>
</html>`;

  const win = window.open("", "_blank", "noopener,noreferrer");
  if (!win) return;
  win.document.write(html);
  win.document.close();
}
