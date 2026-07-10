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
      subtitle: "Waar zit volgens jou de grootste groep collega's?",
      intro:
        "Geef per as aan waar jij denkt dat de grootste groep collega's zit. " +
        "Je geeft geen eigen positie aan — alleen je perceptie van de organisatie. " +
        "Je antwoord wordt anoniem opgeteld; er worden geen individuele gegevens bewaard.",
      startLabel: "Begin organisatiescan",
      nextLabel: "Volgende",
      prevLabel: "Vorige",
      finishLabel: "Versturen",
      progressLabel: "As",
      axisInstruction:
        "Kies het onderdeel dat volgens jou het beste past bij de grootste groep collega's.",
      privacyNote:
        "Alleen tellers worden opgeslagen — nooit jouw individuele antwoorden.",
      previewNote: "Live voorvertoning van jouw perceptie — niet het org-resultaat.",
      thankYouTitle: "Bedankt",
      thankYouText:
        "Je antwoord telt mee. Het organisatiewiel wordt zichtbaar zodra voldoende " +
        "collega's hebben bijgedragen.",
      submittingLabel: "Versturen…",
      errorLabel: "Versturen mislukt. Probeer het opnieuw.",
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
      subtitle: "Waar zit volgens jou de grootste groep collega's?",
      intro:
        "Geef per as aan waar jij denkt dat de grootste groep collega's zit. " +
        "Je geeft geen eigen positie aan — alleen je perceptie van de organisatie. " +
        "Je antwoord wordt anoniem opgeteld; er worden geen individuele gegevens bewaard.",
      startLabel: "Begin scan",
      nextLabel: "Volgende",
      prevLabel: "Vorige",
      finishLabel: "Versturen",
      progressLabel: "As",
      axisInstruction:
        "Kies het onderdeel dat volgens jou het beste past bij de grootste groep collega's.",
      privacyNote:
        "Alleen tellers worden opgeslagen — nooit jouw individuele antwoorden.",
      previewNote: "Live voorvertoning van jouw perceptie — niet het org-resultaat.",
      thankYouTitle: "Bedankt",
      thankYouText:
        "Je antwoord telt mee. Het organisatiewiel wordt zichtbaar zodra voldoende " +
        "collega's hebben bijgedragen.",
      submittingLabel: "Versturen…",
      errorLabel: "Versturen mislukt. Probeer het opnieuw.",
    },
  },
};

export function getFraming() {
  return config[config.framing];
}
