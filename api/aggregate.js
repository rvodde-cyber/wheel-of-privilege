/**
 * Vercel serverless function — organisatiescan tellers.
 * Sessie 2: implementatie volgt.
 */
export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(501).json({ error: "Nog niet geïmplementeerd (sessie 2)" });
  }
  if (req.method === "POST") {
    return res.status(501).json({ error: "Nog niet geïmplementeerd (sessie 2)" });
  }
  return res.status(405).json({ error: "Method not allowed" });
}
