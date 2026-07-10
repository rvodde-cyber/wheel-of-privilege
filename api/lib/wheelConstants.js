export const THRESHOLD_DEFAULT = 8;

export const POSITIONS = ["center", "middle", "periphery"];

export const AXIS_IDS = [
  "opleiding",
  "klasse",
  "ouders",
  "etniciteit",
  "gender",
  "seksualiteit",
  "religie",
  "taal",
  "gezondheid",
  "neurodiversiteit",
  "migratie",
];

const ORG_CODE_PATTERN = /^[a-z0-9][a-z0-9_-]{0,31}$/;

export function normalizeOrgCode(orgCode) {
  if (typeof orgCode !== "string") return null;
  const normalized = orgCode.trim().toLowerCase();
  return ORG_CODE_PATTERN.test(normalized) ? normalized : null;
}

export function counterKey(orgCode, axis, position) {
  return `wheel:${orgCode}:${axis}:${position}`;
}

export function respondentsKey(orgCode) {
  return `wheel:${orgCode}:respondents`;
}

export function thresholdKey(orgCode) {
  return `wheel:${orgCode}:threshold`;
}

export function validateAnswers(answers) {
  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    return { ok: false, error: "Antwoorden ontbreken of zijn ongeldig." };
  }

  for (const axisId of AXIS_IDS) {
    const value = answers[axisId];
    if (!POSITIONS.includes(value)) {
      return { ok: false, error: `Ongeldig of ontbrekend antwoord voor as '${axisId}'.` };
    }
  }

  const extraKeys = Object.keys(answers).filter((key) => !AXIS_IDS.includes(key));
  if (extraKeys.length > 0) {
    return { ok: false, error: "Onbekende assen in antwoorden." };
  }

  return { ok: true, answers };
}

export function dominantPosition(counts) {
  let best = POSITIONS[0];
  let bestCount = -1;
  for (const position of POSITIONS) {
    const count = counts[position] ?? 0;
    if (count > bestCount) {
      best = position;
      bestCount = count;
    }
  }
  return best;
}
