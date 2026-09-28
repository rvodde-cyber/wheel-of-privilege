import {
  INCLUSIE_GESPREKSVRAGEN,
  INCLUSIE_INTRO,
  INCLUSIE_NUANCE,
  INCLUSIE_TITEL,
  INCLUSIE_VOORDELEN,
} from "../data/inclusieVoordelen.js";
import { config } from "../config.js";

/**
 * @param {(text: string) => string} escapeHtml
 */
export function buildInclusieLoontHtml(escapeHtml) {
  const voordelen = INCLUSIE_VOORDELEN.map(
    (v) => `
      <article class="inclusie-voordeel">
        <p class="inclusie-voordeel-titel"><strong>${escapeHtml(v.titel)}</strong></p>
        <p>${escapeHtml(v.tekst)}</p>
        <p class="inclusie-bron">(${escapeHtml(v.bronnen)})</p>
      </article>`
  ).join("");

  const vragen = INCLUSIE_GESPREKSVRAGEN.vragen
    .map((vraag, i) => `<li value="${i + 1}">${escapeHtml(vraag)}</li>`)
    .join("");

  return `
  <section class="inclusie-page" aria-labelledby="inclusie-pdf-titel">
    <h2 id="inclusie-pdf-titel">${escapeHtml(INCLUSIE_TITEL)}</h2>
    <p>${escapeHtml(INCLUSIE_INTRO)}</p>
    <div class="inclusie-grid">${voordelen}</div>
    <div class="inclusie-nuance">
      <p><strong>${escapeHtml(INCLUSIE_NUANCE.titel)}</strong></p>
      <p>${escapeHtml(INCLUSIE_NUANCE.tekst)}</p>
      <p class="inclusie-bron">(${escapeHtml(INCLUSIE_NUANCE.bronnen)})</p>
    </div>
    <h3 class="inclusie-gesprek-kop">${escapeHtml(INCLUSIE_GESPREKSVRAGEN.titel)}</h3>
    <ol class="inclusie-gesprek">${vragen}</ol>
  </section>`;
}

export function inclusieLoontPrintCss() {
  return `
    .inclusie-page { page-break-before: always; margin-top: 8px; }
    .inclusie-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;
      margin: 16px 0;
    }
    .inclusie-voordeel { margin: 0; }
    .inclusie-voordeel-titel { margin: 0 0 4px; font-family: ${config.fonts.ui}; }
    .inclusie-voordeel p { margin: 0 0 6px; }
    .inclusie-bron {
      font-family: ${config.fonts.ui};
      font-size: 9pt;
      color: ${config.colors.textMuted};
      margin: 0;
    }
    .inclusie-nuance {
      background: #eef9f4;
      border: 1px solid ${config.colors.border};
      border-radius: 8px;
      padding: 12px 14px;
      margin: 16px 0;
    }
    .inclusie-nuance p { margin: 0 0 6px; }
    .inclusie-nuance p:last-child { margin-bottom: 0; }
    .inclusie-gesprek-kop {
      font-family: ${config.fonts.ui};
      font-size: 0.85rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin: 20px 0 8px;
    }
    .inclusie-gesprek {
      font-family: ${config.fonts.voice};
      font-size: 11pt;
      line-height: 1.5;
      margin: 0;
      padding-left: 1.25rem;
    }
    .inclusie-gesprek li { margin: 0 0 8px; }
    @media (min-width: 760px) {
      .inclusie-grid { grid-template-columns: 1fr 1fr; }
    }
  `;
}
