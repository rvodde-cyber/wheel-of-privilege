import { kv } from "@vercel/kv";
import {
  AXIS_IDS,
  counterKey,
  normalizeOrgCode,
  respondentsKey,
  validateAnswers,
} from "./lib/wheelConstants.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const orgCode = normalizeOrgCode(body?.orgCode);
    if (!orgCode) {
      return res.status(400).json({ error: "Ongeldige organisatiecode." });
    }

    const validation = validateAnswers(body?.answers);
    if (!validation.ok) {
      return res.status(400).json({ error: validation.error });
    }

    const pipeline = kv.pipeline();
    for (const axisId of AXIS_IDS) {
      const position = validation.answers[axisId];
      pipeline.incr(counterKey(orgCode, axisId, position));
    }
    pipeline.incr(respondentsKey(orgCode));
    await pipeline.exec();

    return res.status(200).json({
      ok: true,
      message: "Bedankt — je antwoord is anoniem opgeteld.",
    });
  } catch (error) {
    console.error("aggregate error:", error);
    const missingKv =
      error?.message?.includes("KV") ||
      error?.message?.includes("UPSTASH") ||
      !process.env.KV_REST_API_URL;

    if (missingKv) {
      return res.status(503).json({
        error: "Opslag niet beschikbaar. Koppel Vercel KV aan dit project.",
      });
    }

    return res.status(500).json({ error: "Inzending kon niet worden verwerkt." });
  }
}
