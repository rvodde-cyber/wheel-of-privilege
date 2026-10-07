/**
 * @param {string} kop
 */
export function sectieAnchorId(kop) {
  const stripped = kop.replace(/^\d+\.\s*/, "").trim();
  return stripped
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
