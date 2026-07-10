import { kv } from "@vercel/kv";
import {
  AXIS_IDS,
  POSITIONS,
  THRESHOLD_DEFAULT,
  counterKey,
  dominantPosition,
  normalizeOrgCode,
  respondentsKey,
  thresholdKey,
} from "./lib/wheelConstants.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const orgCode = normalizeOrgCode(req.query?.orgCode);
    if (!orgCode) {
      return res.status(400).json({ error: "Ongeldige organisatiecode." });
    }

    const [respondents, customThreshold] = await Promise.all([
      kv.get(respondentsKey(orgCode)),
      kv.get(thresholdKey(orgCode)),
    ]);

    const count = Number(respondents) || 0;
    const threshold = Number(customThreshold) || THRESHOLD_DEFAULT;

    if (count < threshold) {
      return res.status(200).json({
        ready: false,
        count,
        threshold,
      });
    }

    const countFetches = AXIS_IDS.flatMap((axisId) =>
      POSITIONS.map((position) => kv.get(counterKey(orgCode, axisId, position)))
    );
    const countValues = await Promise.all(countFetches);

    const axes = {};
    const profile = {};
    let index = 0;

    for (const axisId of AXIS_IDS) {
      const axisCounts = {};
      for (const position of POSITIONS) {
        axisCounts[position] = Number(countValues[index]) || 0;
        index += 1;
      }
      axes[axisId] = axisCounts;
      profile[axisId] = dominantPosition(axisCounts);
    }

    return res.status(200).json({
      ready: true,
      count,
      threshold,
      axes,
      profile,
    });
  } catch (error) {
    console.error("results error:", error);
    const missingKv =
      error?.message?.includes("KV") ||
      error?.message?.includes("UPSTASH") ||
      !process.env.KV_REST_API_URL;

    if (missingKv) {
      return res.status(503).json({
        error: "Opslag niet beschikbaar. Koppel Vercel KV aan dit project.",
      });
    }

    return res.status(500).json({ error: "Resultaten konden niet worden opgehaald." });
  }
}
