import { VERANTWOORDING } from "./verantwoording.js";
import { VERANTWOORDING_POPULAIR } from "./verantwoordingPopulair.js";

export const VERSIES = {
  populair: VERANTWOORDING_POPULAIR,
  wetenschappelijk: VERANTWOORDING,
};

export const STANDAARD_VERSIE = "populair";

export const VERSIE_LABELS = {
  populair: "Voor organisaties",
  wetenschappelijk: "Wetenschappelijk",
};

/**
 * @param {string | null | undefined} waarde
 */
export function kiesVersie(waarde) {
  if (waarde && Object.hasOwn(VERSIES, waarde)) {
    return waarde;
  }
  return STANDAARD_VERSIE;
}

/**
 * @param {string} versie
 */
export function andereVersie(versie) {
  return versie === "populair" ? "wetenschappelijk" : "populair";
}
