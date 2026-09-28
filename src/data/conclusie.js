import { adviesVoorNiveau } from "./adviesTeksten.js";

export const MIN_AXES_FOR_CONCLUSION = 6;
export const SHARE_HIGH_THRESHOLD = 0.7;
export const SHARE_LOW_THRESHOLD = 0.35;

/** @typedef {'hoog' | 'gemengd' | 'laag' | null} ConclusieNiveau */

/**
 * @param {string | undefined} selection
 * @returns {0 | 1 | 2 | null}
 */
export function selectionToScore(selection) {
  if (selection == null || selection === "unknown") return null;
  if (selection === "center") return 0;
  if (selection === "middle") return 1;
  if (selection === "periphery") return 2;
  return null;
}

export const POSITION_DUIDING = {
  0: "Hier lijkt de norm in jouw organisatie gedeeld en dus vanzelfsprekend.",
  1: "Hier lijkt sprake van een gemengd beeld of van verschil tussen werkvloer en top.",
  2: "Hier lijkt de grootste groep juist af te wijken van de maatschappelijke norm.",
  null: "Niet ingeschat.",
};

export const INSUFFICIENT_MESSAGE =
  "Te weinig ingeschatte onderwerpen voor een conclusie (minimaal 6). Vul meer onderwerpen in.";

/**
 * @param {Record<string, string>} selections
 * @param {{ id: string }[]} axes
 */
export function computeOrgConclusion(selections, axes) {
  const scores = axes.map((axis) => selectionToScore(selections[axis.id]));
  const ingeschat = scores.filter((s) => s !== null);
  const m = ingeschat.length;
  const n = ingeschat.filter((s) => s === 0).length;

  if (m < MIN_AXES_FOR_CONCLUSION) {
    return {
      ok: false,
      m,
      n,
      niveau: null,
      share: null,
      message: INSUFFICIENT_MESSAGE,
      advies: null,
    };
  }

  const share = n / m;
  /** @type {ConclusieNiveau} */
  let niveau = "gemengd";
  if (share >= SHARE_HIGH_THRESHOLD) niveau = "hoog";
  else if (share < SHARE_LOW_THRESHOLD) niveau = "laag";

  const advies = adviesVoorNiveau(niveau, n, m);

  return {
    ok: true,
    m,
    n,
    niveau,
    share,
    message: advies.samenvatting,
    advies,
  };
}

export function formatIngeschatLabel(n, m) {
  return `${n} van de ${m} ingeschatte onderwerpen`;
}
