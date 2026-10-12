export const TUSSEN =
  "Gemengd beeld zonder duidelijke meerderheid, of het beeld verschilt tussen de werkvloer en de top.";

export const ONBEKEND = "Dat kan ik niet inschatten.";

export const LENZEN = {
  organisatie: { id: "organisatie", label: "Hele organisatie" },
  top: { id: "top", label: "De top" },
};

export const TUSSEN_EEN_LENS = TUSSEN;
export const TUSSEN_TWEE_LENZEN = "Gemengd beeld zonder duidelijke meerderheid.";

/** @param {{ vraagdeel: string }} axis */
export function formatTopQuestion(axis) {
  return `Waar zit volgens jou de grootste groep collega's in de top (directie en management) ${axis.vraagdeel}?`;
}

/** @param {{ vraagdeel: string }} axis */
export function formatTeamQuestion(axis) {
  return `Waar zit volgens jou de grootste groep collega's ${axis.vraagdeel}?`;
}

export const AXES_TEAM = [
  {
    id: "opleiding",
    label: "Opleiding",
    shortLabel: "Opleiding",
    titel: "Opleidingsniveau",
    vraagdeel: "qua opleidingsniveau",
    hint:
      "Denk aan diploma's op de werkvloer én in management en directie. Gaat om formele opleiding, niet om de achtergrond van ouders.",
    instructie: "Kies waar volgens jou de grootste groep collega's zit.",
    opties: {
      centrum: "De meeste collega's hebben hoger onderwijs afgerond (hbo of wo).",
      periferie:
        "De meeste collega's hebben vmbo, mbo 1-2, praktijkonderwijs of geen diploma als hoogste opleiding.",
    },
  },
  {
    id: "klasse",
    label: "Klasse",
    shortLabel: "Klasse",
    titel: "Sociaaleconomische klasse",
    vraagdeel: "qua sociaaleconomische achtergrond",
    hint:
      "Denk aan financiële ruimte en levensstijl die je om je heen ziet, en aan de wijk of regio waar mensen opgroeiden.",
    instructie: "Kies waar volgens jou de grootste groep collega's zit.",
    opties: {
      centrum:
        "De meeste collega's groeiden op met financiële zekerheid en weinig structurele geldzorgen.",
      periferie:
        "De meeste collega's groeiden op met weinig financiële ruimte of regelmatige geldzorgen.",
    },
  },
  {
    id: "ouders",
    label: "Ouders",
    shortLabel: "Ouders",
    titel: "Ouderlijke achtergrond",
    vraagdeel: "qua achtergrond van hun ouders",
    hint: "Denk aan de hoogste opleiding van de ouders, voor zover bekend.",
    instructie: "Kies waar volgens jou de grootste groep collega's zit.",
    opties: {
      centrum: "De meeste collega's hebben minstens één ouder met hoger onderwijs.",
      periferie:
        "De meeste collega's hebben ouders met vmbo, mbo 1-2, praktijkonderwijs of geen diploma.",
    },
  },
  {
    id: "etniciteit",
    label: "Etniciteit",
    shortLabel: "Etniciteit",
    titel: "Etniciteit / huidskleur",
    vraagdeel: "qua etniciteit en huidskleur",
    hint:
      "Kijk zowel naar de werkvloer als naar de top. Het gaat om hoe collega's gelezen worden, niet om paspoort (zie Paspoort en verblijfsstatus). Machtsverschillen tussen witte Nederlanders onderling komen terug bij klasse, ouders, opleiding en taal.",
    instructie:
      "Denk aan: hoe worden collega's in jouw organisatie meestal gezien en behandeld?",
    opties: {
      centrum: "De meeste collega's worden vanzelf als 'gewoon Nederlands' gezien.",
      periferie:
        "De meeste collega's worden vaak als 'anders' gezien vanwege hun uiterlijk of huidskleur.",
    },
  },
  {
    id: "gender",
    label: "Gender",
    shortLabel: "Gender",
    titel: "Gender",
    vraagdeel: "qua gender",
    hint:
      "Kijk zowel naar de werkvloer als naar de top; het beeld kan verschillen. Voorbeelden van anders behandeld worden: als vrouw, non-binair of transgender.",
    instructie:
      "Denk aan: hoe worden collega's in jouw organisatie meestal gezien en behandeld?",
    opties: {
      centrum: "Mannen vormen de grootste groep, zeker in leidinggevende functies.",
      periferie: "Vrouwen vormen de grootste groep, ook in leidinggevende functies.",
    },
  },
  {
    id: "seksualiteit",
    label: "Seksualiteit",
    shortLabel: "Seksualiteit",
    titel: "Seksuele oriëntatie",
    vraagdeel: "qua seksuele oriëntatie",
    hint: "Kijk naar wat in de cultuur als vanzelfsprekend geldt; vaak niet zichtbaar.",
    instructie: "Denk aan: waar horen collega's in jouw organisatie zichzelf bij?",
    opties: {
      centrum: "Volgens mijn indruk is heteroseksualiteit de onuitgesproken norm.",
      periferie:
        "Volgens mijn indruk is niet-heteroseksualiteit in de organisatie de grootste groep.",
    },
  },
  {
    id: "religie",
    label: "Religie",
    shortLabel: "Religie",
    titel: "Religie / levensbeschouwing",
    vraagdeel: "qua religie en levensbeschouwing",
    hint:
      "Denk aan feestdagen, gebruiken en wat als 'gewoon' geldt. Een meerderheid van de Nederlanders is niet-religieus.",
    instructie: "Denk aan: waar horen collega's in jouw organisatie zichzelf bij?",
    opties: {
      centrum:
        "De meeste collega's zijn niet-religieus, atheïst, agnost of christelijk (kerkelijk of cultureel).",
      periferie:
        "De meeste collega's hebben een levensbeschouwing die vaak bevraagd wordt of tot nadeel leidt (bijvoorbeeld moslim of joods).",
    },
  },
  {
    id: "taal",
    label: "Taal",
    shortLabel: "Taal",
    titel: "Taal",
    vraagdeel: "qua moedertaal",
    hint:
      "Gaat om de moedertaal. Een hoorbaar accent kan ook meetellen in hoe collega's gezien worden, ook als ze de taal goed spreken.",
    instructie:
      "Denk aan: hoe worden collega's in jouw organisatie meestal gezien en behandeld?",
    opties: {
      centrum: "De meeste collega's hebben Nederlands als moedertaal.",
      periferie:
        "De meeste collega's hebben een andere moedertaal of zijn meertalig.",
    },
  },
  {
    id: "gezondheid",
    label: "Gezondheid",
    shortLabel: "Gezondheid",
    titel: "Gezondheid / lichamelijke beperking",
    vraagdeel: "qua gezondheid en beperkingen",
    hint: "Baseer je alleen op wat bekend en bespreekbaar is.",
    instructie:
      "Denk aan: hoe worden collega's in jouw organisatie meestal gezien en behandeld?",
    opties: {
      centrum:
        "Voor zover bekend heeft de meerderheid geen chronische ziekte of beperking.",
      periferie:
        "Voor zover bekend heeft de meerderheid een chronische ziekte of beperking.",
    },
  },
  {
    id: "neuro",
    label: "Neuro",
    shortLabel: "Neuro",
    titel: "Neurodiversiteit",
    vraagdeel: "qua neurodiversiteit",
    hint: "Baseer je alleen op wat bekend en bespreekbaar is.",
    instructie: "Denk aan: waar horen collega's in jouw organisatie zichzelf bij?",
    opties: {
      centrum: "Voor zover bekend is de meerderheid neurotypisch.",
      periferie: "Voor zover bekend is de meerderheid neurodivergent.",
    },
  },
  {
    id: "migratie",
    label: "Paspoort",
    shortLabel: "Paspoort",
    titel: "Paspoort en verblijfsstatus",
    vraagdeel: "qua paspoort en verblijfsstatus",
    hint:
      "Gaat om wat het paspoort of de verblijfsstatus toestaat, niet om culturele achtergrond of uiterlijk.",
    instructie: "Kies waar volgens jou de grootste groep collega's zit.",
    opties: {
      centrum: "De meeste collega's hebben een paspoort dat veel deuren opent.",
      periferie:
        "De meeste collega's hebben een paspoort of verblijfsstatus die hun mogelijkheden beperkt.",
    },
  },
];
