import { bronnenLijst } from "../data/bronnenVerantwoording.js";
import { VERSIES, kiesVersie } from "../data/verantwoordingVersies.js";
import { config } from "../config.js";

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function blokkenHtml(blokken) {
  return blokken
    .map((blok) => {
      switch (blok.type) {
        case "p":
          return `<p>${escapeHtml(blok.tekst)}</p>`;
        case "h2":
          return `<h3 class="sub">${escapeHtml(blok.tekst)}</h3>`;
        case "ul":
          return `<ul>${blok.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
        case "ol":
          return `<ol>${blok.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>`;
        case "quote":
          return `<blockquote class="quote">${escapeHtml(blok.tekst)}</blockquote>`;
        case "tabel": {
          const head = blok.kolommen.map((k) => `<th>${escapeHtml(k)}</th>`).join("");
          const body = blok.rijen
            .map(
              (rij) =>
                `<tr>${rij.map((cel) => `<td>${escapeHtml(cel)}</td>`).join("")}</tr>`
            )
            .join("");
          const noot = blok.noot ? `<p class="noot">${escapeHtml(blok.noot)}</p>` : "";
          return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>${noot}</div>`;
        }
        case "noot":
          return `<p class="noot">${escapeHtml(blok.tekst)}</p>`;
        default:
          return "";
      }
    })
    .join("");
}

function kaderHtml(doc) {
  if (doc.samenvatting) {
    return `<div class="kader">
      <p class="kader-titel">Samenvatting</p>
      <p>${escapeHtml(doc.samenvatting)}</p>
    </div>`;
  }
  if (doc.kader) {
    const regels = doc.kader.regels
      .map((regel) => `<li>${escapeHtml(regel)}</li>`)
      .join("");
    return `<div class="kader">
      <p class="kader-titel">${escapeHtml(doc.kader.titel)}</p>
      <ul class="kader-lijst">${regels}</ul>
    </div>`;
  }
  return "";
}

const DOC_TITLES = {
  populair: "Machtskruising - Een team dat meer ziet",
  wetenschappelijk: "Machtskruising - Wetenschappelijke verantwoording",
};

/**
 * @param {string} [versie]
 */
export function printVerantwoordingPdf(versie) {
  const key = kiesVersie(versie);
  const doc = VERSIES[key];
  const datum = new Date().toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const bronnen = bronnenLijst(doc.bronnenIds)
    .map((bron) => `<li>${escapeHtml(bron)}</li>`)
    .join("");

  const sectiesHtml = doc.secties
    .map(
      (sectie) => `<section>
        <h2>${escapeHtml(sectie.kop)}</h2>
        ${blokkenHtml(sectie.blokken)}
      </section>`
    )
    .join("");

  const docTitle = DOC_TITLES[key] ?? DOC_TITLES.wetenschappelijk;

  const html = `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(docTitle)}</title>
  <style>
    @page { size: A4; margin: 20mm; }
    body {
      font-family: ${config.fonts.voice};
      color: ${config.colors.text};
      margin: 0;
      line-height: 1.55;
      font-size: 11pt;
    }
    h1 {
      font-family: ${config.fonts.voice};
      font-size: 1.55rem;
      margin: 0 0 8px;
      line-height: 1.2;
      page-break-after: avoid;
    }
    .subtitle {
      font-family: ${config.fonts.voice};
      font-style: italic;
      font-size: 1rem;
      color: ${config.colors.textMuted};
      margin: 0 0 20px;
    }
    .kicker { font-family: ${config.fonts.ui}; font-weight: 700; margin: 0 0 12px; font-size: 10pt; }
    .kader {
      background: ${config.colors.selectedBg};
      border: 1px solid ${config.colors.border};
      border-radius: 8px;
      padding: 14px 16px;
      margin: 0 0 24px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .kader-titel {
      font-family: ${config.fonts.ui};
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin: 0 0 8px;
      color: ${config.colors.dotStrong};
    }
    .kader-lijst { margin: 0; padding-left: 1.25em; }
    .kader-lijst li { margin: 0 0 0.5em; }
    h2 {
      font-family: ${config.fonts.voice};
      font-size: 1.12rem;
      margin: 28px 0 10px;
      page-break-after: avoid;
    }
    h3.sub {
      font-family: ${config.fonts.voice};
      font-size: 1rem;
      font-weight: 600;
      margin: 16px 0 6px;
      page-break-after: avoid;
    }
    p { margin: 0 0 0.85em; }
    ul, ol { margin: 0 0 0.85em; padding-left: 1.35em; }
    blockquote.quote {
      font-style: italic;
      font-size: 1.3em;
      line-height: 1.45;
      color: ${config.colors.dotStrong};
      margin: 1em 0;
      padding-left: 16px;
      border-left: 3px solid ${config.colors.dotMid};
    }
    .table-wrap { margin: 0 0 1em; }
    table { width: 100%; border-collapse: collapse; font-family: ${config.fonts.ui}; font-size: 9.5pt; }
    thead { display: table-header-group; }
    tr { page-break-inside: avoid; break-inside: avoid; }
    th, td { border: 1px solid ${config.colors.border}; padding: 10px; text-align: left; vertical-align: top; }
    th {
      background: ${config.colors.selectedBg};
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .noot {
      font-family: ${config.fonts.ui};
      font-size: 9pt;
      font-style: italic;
      color: ${config.colors.textMuted};
      margin: 0.35em 0 0.85em;
    }
    .bronnen {
      list-style: none;
      padding: 0;
      margin: 28px 0 0;
      font-size: 9pt;
      color: ${config.colors.textMuted};
      font-family: ${config.fonts.ui};
    }
    .bronnen li {
      padding-left: 10mm;
      text-indent: -10mm;
      margin: 0 0 0.45em;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .voet {
      margin-top: 32px;
      padding-top: 12px;
      border-top: 1px solid ${config.colors.border};
      font-family: ${config.fonts.ui};
      font-size: 9pt;
      color: ${config.colors.textMuted};
    }
  </style>
</head>
<body>
  <p class="kicker">${escapeHtml(doc.eyebrow)} · ${escapeHtml(datum)}</p>
  <h1>${escapeHtml(doc.titel)}</h1>
  <p class="subtitle">${escapeHtml(doc.ondertitel)}</p>
  ${kaderHtml(doc)}
  ${sectiesHtml}
  <h2>Bronnen</h2>
  <ul class="bronnen">${bronnen}</ul>
  <p class="voet">Lokaal gegenereerd, er is niets verzonden of opgeslagen.</p>
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
