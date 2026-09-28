import { adviesVoorNiveau, kloofAdvies } from "./adviesTeksten.js";

export const MIN_AXES_FOR_CONCLUSION = 6;
export const SHARE_HIGH_THRESHOLD = 0.7;
export const SHARE_LOW_THRESHOLD = 0.35;

export const MIN_AXES_FOR_KLOOF = 6;
export const KLOOF_THRESHOLD = 3;

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
 * @param {number | null} verschil
 */
export function kloofDuidingForAxis(verschil) {
  if (verschil === null) return "";
  if (verschil > 0) return "De top zit hier dichter bij het machtscentrum dan de organisatie.";
  if (verschil < 0) return "De top zit hier verder van het machtscentrum dan de organisatie.";
  return "Hier lijken organisatie en top op elkaar.";
}

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

/**
 * @param {Record<string, string>} selOrg
 * @param {Record<string, string>} selTop
 * @param {{ id: string, titel: string }[]} axes
 */
export function computeKloof(selOrg, selTop, axes) {
  const perAs = axes.map((axis) => {
    const o = selectionToScore(selOrg[axis.id]);
    const t = selectionToScore(selTop[axis.id]);
    if (o === null || t === null) {
      return { id: axis.id, titel: axis.titel, verschil: null };
    }
    return { id: axis.id, titel: axis.titel, verschil: o - t };
  });
  const vergeleken = perAs.filter((a) => a.verschil !== null);
  const topDichterBij = vergeleken.filter((a) => a.verschil > 0);
  const topVerder = vergeleken.filter((a) => a.verschil < 0);

  if (vergeleken.length < MIN_AXES_FOR_KLOOF) {
    return { ok: false, perAs, vergeleken: vergeleken.length };
  }

  const niveau =
    topDichterBij.length >= KLOOF_THRESHOLD
      ? "kloof"
      : topDichterBij.length > 0
        ? "beperkt"
        : "geen";

  return {
    ok: true,
    perAs,
    vergeleken: vergeleken.length,
    topDichterBij,
    topVerder,
    niveau,
    advies: kloofAdvies(niveau, topDichterBij.length, vergeleken.length),
  };
}

export function formatIngeschatLabel(n, m) {
  return `${n} van de ${m} ingeschatte onderwerpen`;
}

/**
 * @param {Record<string, string>} selOrg
 * @param {Record<string, string>} [selTop]
 * @param {{ id: string, titel: string }[]} axes
 * @param {boolean} tweeLenzen
 */
export function duidingForAxisRow(axis, selOrg, selTop, tweeLenzen, perAsKloof) {
  const score = selectionToScore(selOrg[axis.id]);
  const base = POSITION_DUIDING[score === null ? "null" : score];
  if (!tweeLenzen || !perAsKloof) return base;
  const row = perAsKloof.find((a) => a.id === axis.id);
  const kloof = kloofDuidingForAxis(row?.verschil ?? null);
  return kloof ? `${base} ${kloof}` : base;
}
