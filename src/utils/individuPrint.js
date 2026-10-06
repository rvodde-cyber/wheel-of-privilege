import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PowerWheel from "../components/PowerWheel.jsx";
import { BRONNEN_APA } from "../data/adviesTeksten.js";
import { buildIndividueleAnalyse } from "../data/analyseIndividu.js";
import { config } from "../config.js";

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function paragraphBlock(text) {
  return `<p>${escapeHtml(text)}</p>`;
}

function axisBlocks(items) {
  return items
    .map(
      (item) =>
        `<p class="axis-label">${escapeHtml(item.titel)}</p><p>${escapeHtml(item.tekst)}</p>`
    )
    .join("");
}

function writeLines() {
  return `<div class="write-lines">${[0, 1, 2, 3]
    .map(() => `<div class="write-line"></div>`)
    .join("")}</div>`;
}

function vragenHtml(analyse) {
  const reflectie = analyse.vragen.filter((v) => v.fase !== "Volhouden");
  const volhouden = analyse.vragen.find((v) => v.fase === "Volhouden");
  let html = "";
  if (reflectie.length > 0) {
    html += `<h2>Om over na te denken</h2>`;
    for (const v of reflectie) {
      html += `<p class="fase">${escapeHtml(v.fase)}</p><p class="vraag">${escapeHtml(v.tekst)}</p>${writeLines()}`;
    }
    html += `<p class="mmv">Deze vragen volgen het Model Moreel Vakmanschap: zien, voelen, wegen, handelen en volhouden.</p>`;
  }
  if (volhouden) {
    html += `<h2>Om mee te nemen</h2><div class="soft-card"><p class="fase">${escapeHtml(volhouden.fase)}</p><p class="vraag">${escapeHtml(volhouden.tekst)}</p>${writeLines()}</div>`;
  }
  return html;
}

/**
 * @param {{ selections: Record<string, string>, axes: { id: string, label: string }[] }} params
 */
export function printIndividuPdf({ selections, axes }) {
  const analyse = buildIndividueleAnalyse(selections, axes);

  const wheelHtml = renderToStaticMarkup(
    createElement(PowerWheel, {
      variant: "dots",
      size: "large",
      selections,
      axes,
      ariaLabel: "Jouw Machtskruising",
      forPrint: true,
      showLegend: true,
    })
  );

  const datum = new Date().toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let bodySections = `
    <h1>Jouw kruising</h1>
    <p class="opening">${escapeHtml(analyse.opening)}</p>
    <div class="wiel">${wheelHtml}</div>`;

  if (analyse.algemeen) {
    const tussenLijst =
      analyse.tussen.length > 0
        ? `<ul>${analyse.tussen.map((t) => `<li>${escapeHtml(t.titel)}</li>`).join("")}</ul>`
        : "";
    bodySections += `<h2>Algemeen beeld</h2>${paragraphBlock(analyse.algemeen)}${tussenLijst}`;
  }

  if (analyse.windMee.length > 0) {
    bodySections += `<h2>Waar je wind mee hebt</h2>${axisBlocks(analyse.windMee)}`;
  }
  if (analyse.windTegen.length > 0) {
    bodySections += `<h2>Waar je wind tegen kunt ervaren</h2>${axisBlocks(analyse.windTegen)}`;
  }
  if (analyse.kruisingen.length > 0) {
    bodySections += `<h2>Waar het kruist</h2>${analyse.kruisingen.map((t) => paragraphBlock(t)).join("")}`;
  }
  if (analyse.richtingTop.length > 0) {
    bodySections += `<h2>Richting de top</h2>${analyse.richtingTop.map((t) => paragraphBlock(t)).join("")}`;
  }

  bodySections += vragenHtml(analyse);
  bodySections += `<p class="opening closing">${escapeHtml(analyse.afsluiting)}</p>`;

  const bronnen = BRONNEN_APA.map((bron) => `<li>${escapeHtml(bron)}</li>`).join("");

  const html = `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8" />
  <title>Machtskruising · Individuele reflectie</title>
  <style>
    body {
      font-family: ${config.fonts.voice};
      color: ${config.colors.text};
      margin: 24px;
      line-height: 1.55;
      font-size: 11pt;
    }
    h1 { font-size: 1.5rem; margin: 0 0 12px; text-align: center; }
    h2 { font-size: 1.15rem; margin: 24px 0 8px; }
    .kicker { font-family: ${config.fonts.ui}; font-weight: 700; margin: 0 0 4px; }
    .meta { color: ${config.colors.textMuted}; font-size: 10pt; font-family: ${config.fonts.ui}; margin: 0 0 16px; }
    .opening { font-style: italic; color: ${config.colors.textMuted}; text-align: center; margin: 0 0 20px; }
    .closing { margin-top: 28px; }
    .wiel { margin: 16px 0 20px; text-align: center; }
    .wiel svg { width: 100%; max-width: 480px; height: auto; }
    .axis-label {
      font-family: ${config.fonts.ui};
      font-size: 8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: ${config.colors.textMuted};
      margin: 14px 0 4px;
    }
    .fase {
      font-family: ${config.fonts.ui};
      font-size: 8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: ${config.colors.dotStrong};
      margin: 16px 0 4px;
    }
    .vraag { margin: 0 0 8px; }
    .mmv {
      font-family: ${config.fonts.ui};
      font-size: 9pt;
      color: ${config.colors.textMuted};
      margin: 8px 0 20px;
    }
    .write-lines { margin: 0 0 20px; }
    .write-line {
      border-bottom: 1px solid ${config.colors.border};
      height: 28px;
      margin: 0;
    }
    .soft-card {
      background: #f4faf7;
      border: 1px solid ${config.colors.border};
      border-radius: 8px;
      padding: 12px 14px;
      margin: 0 0 8px;
    }
    ul { margin: 8px 0 0; padding-left: 1.25em; }
    .bronnen {
      list-style: none;
      padding: 0;
      margin: 28px 0 0;
      font-size: 9pt;
      color: ${config.colors.textMuted};
      font-family: ${config.fonts.ui};
    }
    .bronnen li { padding-left: 1.5em; text-indent: -1.5em; margin: 0 0 0.45em; }
    @media print { body { margin: 12mm; } }
  </style>
</head>
<body>
  <p class="kicker">Machtskruising · Individuele reflectie</p>
  <p class="meta">${escapeHtml(datum)}</p>
  ${bodySections}
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
