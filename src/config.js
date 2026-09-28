/**
 * Geïnspireerd op intersectionaliteitstheorie (Kimberlé Crenshaw, 1989),
 * "White Privilege: Unpacking the Invisible Knapsack" (Peggy McIntosh, 1989),
 * matrix of domination (Patricia Hill Collins), en De zeven vinkjes (Joris Luyendijk, 2022).
 */

/** @type {'onderwijs' | 'zakelijk'} */
export const FRAMING = "onderwijs";

export const ATTRIBUTION =
  "Geïnspireerd op intersectionaliteitstheorie (Kimberlé Crenshaw, 1989), " +
  '"White Privilege: Unpacking the Invisible Knapsack" (Peggy McIntosh, 1989), ' +
  "matrix of domination (Patricia Hill Collins), en De zeven vinkjes (Joris Luyendijk, 2022).";

export const ORG_ATTRIBUTION =
  "Geïnspireerd op Crenshaw (1989), McIntosh (1989) en Luyendijk (2022).";

export const POSITIONS = {
  center: { key: "center", label: "Machtscentrum", ring: 0 },
  middle: { key: "middle", label: "Tussenpositie", ring: 1 },
  periphery: { key: "periphery", label: "Periferie", ring: 2 },
};

export const config = {
  framing: FRAMING,

  fonts: {
    voice: '"Source Serif 4", Georgia, "Times New Roman", serif',
    ui: '"Source Sans 3", system-ui, -apple-system, sans-serif',
  },

  colors: {
    surface: "#FFFFFF",
    surface2: "#FFFFFF",
    text: "#1A2422",
    textMuted: "#5A6B66",
    border: "#D8E8E2",

    dotLight: "#9FE1CB",
    dotMid: "#5DCAA5",
    dotStrong: "#1D9E75",

    projectionBg: "#1A2422",
    projectionFill: "#1D9E75",
    projectionStroke: "#5DCAA5",
    projectionText: "#F1F5F3",

    buttonBg: "#1D9E75",
    buttonText: "#FFFFFF",
    buttonHover: "#178A66",
    selectedBg: "#E8F7F1",
    selectedBorder: "#1D9E75",

    lensOrg: "#1D9E75",
    lensTop: "#5B2D8E",
  },

  onderwijs: {
    title: "Machtskruising",
    self: {
      subtitle: "Waar sta jij ten opzichte van het machtscentrum?",
      intro:
        "Machtskruising helpt je te verkennen waar jij — op elf verschillende assen — " +
        "ten opzichte van het machtscentrum staat. Er zijn geen goede of foute antwoorden. " +
        "Je antwoorden blijven volledig op je eigen apparaat; er wordt niets opgeslagen of verstuurd.",
      resultTitle: "Jouw positie",
      resultText:
        "Dit kruispunt laat zien waar jij op de elf assen staat. Gebruik het als startpunt " +
        "voor reflectie — niet als oordeel over jezelf of anderen.",
      downloadLabel: "Download als afbeelding",
      restartLabel: "Opnieuw beginnen",
      startLabel: "Begin reflectie",
      nextLabel: "Volgende",
      prevLabel: "Vorige",
      finishLabel: "Bekijk resultaat",
      progressLabel: "As",
      axisInstruction: "Kies het onderdeel dat het beste bij jouw situatie past.",
      privacyNote: "Alles blijft lokaal op dit apparaat. Geen data verlaat je toestel.",
    },
    team: {
      subtitle: "",
      intro:
        "Geef per onderwerp aan waar volgens jou de grootste groep collega's zit. " +
        "Je geeft geen eigen positie aan, alleen je indruk van de organisatie. " +
        "Alles blijft op dit apparaat; er wordt niets verstuurd of opgeslagen.",
      startLabel: "Begin organisatiescan",
      nextLabel: "Volgende",
      prevLabel: "Vorige",
      finishLabel: "Bekijk resultaat",
      progressLabel: "Onderwerp",
      axisInstruction: "",
      privacyNote:
        "Je antwoorden blijven op dit apparaat. Er wordt niets verstuurd of opgeslagen.",
      previewNote: "Live voorvertoning van jouw indruk.",
      resultTitle: "Jouw beeld van de organisatie",
      downloadPdfLabel: "Download als PDF",
      restartLabel: "Opnieuw beginnen",
      backToStartLabel: "Terug naar start",
    },
  },

  zakelijk: {
    title: "Machtskruising",
    self: {
      subtitle: "Waar sta jij ten opzichte van het machtscentrum?",
      intro:
        "Machtskruising helpt je te verkennen waar jij — op elf verschillende assen — " +
        "ten opzichte van het machtscentrum staat. Er zijn geen goede of foute antwoorden. " +
        "Je antwoorden blijven volledig op je eigen apparaat; er wordt niets opgeslagen of verstuurd.",
      resultTitle: "Jouw positie",
      resultText:
        "Dit kruispunt laat zien waar jij op de elf assen staat. Gebruik het als startpunt " +
        "voor reflectie — niet als oordeel over jezelf of anderen.",
      downloadLabel: "Download als afbeelding",
      restartLabel: "Opnieuw beginnen",
      startLabel: "Begin scan",
      nextLabel: "Volgende",
      prevLabel: "Vorige",
      finishLabel: "Bekijk resultaat",
      progressLabel: "As",
      axisInstruction: "Kies het onderdeel dat het beste bij jouw situatie past.",
      privacyNote: "Alles blijft lokaal op dit apparaat. Geen data verlaat je toestel.",
    },
    team: {
      subtitle: "",
      intro:
        "Geef per onderwerp aan waar volgens jou de grootste groep collega's zit. " +
        "Je geeft geen eigen positie aan, alleen je indruk van de organisatie. " +
        "Alles blijft op dit apparaat; er wordt niets verstuurd of opgeslagen.",
      startLabel: "Begin organisatiescan",
      nextLabel: "Volgende",
      prevLabel: "Vorige",
      finishLabel: "Bekijk resultaat",
      progressLabel: "Onderwerp",
      axisInstruction: "",
      privacyNote:
        "Je antwoorden blijven op dit apparaat. Er wordt niets verstuurd of opgeslagen.",
      previewNote: "Live voorvertoning van jouw indruk.",
      resultTitle: "Jouw beeld van de organisatie",
      downloadPdfLabel: "Download als PDF",
      restartLabel: "Opnieuw beginnen",
      backToStartLabel: "Terug naar start",
    },
  },

  landing: {
    intro:
      "Verken macht en privilege op elf assen. Kies de variant die bij jouw situatie past.",
    individualTitle: "Individuele reflectie",
    individualDescription:
      "Waar sta jij ten opzichte van het machtscentrum? Volledig lokaal — " +
      "niets wordt opgeslagen of verstuurd.",
    individualCta: "Start individuele reflectie",
    teamTitle: "Organisatiescan",
    teamDescription:
      "Geef als professional je indruk van de grootste groep collega's per onderwerp. " +
      "Volledig lokaal — aan het eind kun je een PDF downloaden.",
    teamCta: "Start organisatiescan",
    orgCodeLabel: "Organisatiecode",
    orgCodePlaceholder: "bijv. demo",
    orgCodeError: "Voer een geldige organisatiecode in (letters, cijfers, - of _).",
  },
};

export function getFraming() {
  return config[config.framing];
}
