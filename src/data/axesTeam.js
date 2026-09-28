export const TUSSEN =
  "Gemengd beeld zonder duidelijke meerderheid, of het beeld verschilt tussen de werkvloer en de top.";

export const ONBEKEND = "Dat kan ik niet inschatten.";

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
    hint: "Denk aan diploma's op de werkvloer én in management en directie.",
    opties: {
      centrum:
        "De meeste collega's hebben een hbo-, wo- of vergelijkbaar academisch diploma.",
      periferie:
        "De meeste collega's hebben vmbo, lbo of geen formele diploma's als hoogste opleiding.",
    },
  },
  {
    id: "klasse",
    label: "Klasse",
    shortLabel: "Klasse",
    titel: "Sociaaleconomische klasse",
    vraagdeel: "qua sociaaleconomische achtergrond",
    hint: "Denk aan financiële ruimte en levensstijl die je om je heen ziet.",
    opties: {
      centrum:
        "De meeste collega's komen uit een midden- of hogere klasse en hebben weinig financiële zorgen.",
      periferie:
        "De meeste collega's komen uit de arbeidersklasse of hebben regelmatig financiële zorgen.",
    },
  },
  {
    id: "ouders",
    label: "Ouders",
    shortLabel: "Ouders",
    titel: "Ouderlijke achtergrond",
    vraagdeel: "qua achtergrond van hun ouders",
    hint: "Denk aan opleiding en welstand van de ouders, voor zover bekend.",
    opties: {
      centrum:
        "De meeste collega's hebben minstens één hoogopgeleide of welgestelde ouder.",
      periferie:
        "De meeste collega's hebben ouders zonder hoge opleiding of met weinig financiële middelen.",
    },
  },
  {
    id: "etniciteit",
    label: "Etniciteit",
    shortLabel: "Etniciteit",
    titel: "Etniciteit / huidskleur",
    vraagdeel: "qua etniciteit en huidskleur",
    hint: "Kijk zowel naar de werkvloer als naar de top.",
    opties: {
      centrum:
        "De meeste collega's zijn wit en hebben een Nederlandse of westerse achtergrond.",
      periferie:
        "De meeste collega's hebben een niet-westerse achtergrond of behoren tot een minderheidsgroep.",
    },
  },
  {
    id: "gender",
    label: "Gender",
    shortLabel: "Gender",
    titel: "Gender",
    vraagdeel: "qua gender",
    hint: "Kijk zowel naar de werkvloer als naar de top; het beeld kan verschillen.",
    opties: {
      centrum: "Mannen vormen de grootste groep, zeker in de hogere lagen.",
      periferie:
        "Vrouwen, non-binaire of transgender collega's vormen de grootste groep, ook in de hogere lagen.",
    },
  },
  {
    id: "seksualiteit",
    label: "Seksualiteit",
    shortLabel: "Seksualiteit",
    titel: "Seksuele oriëntatie",
    vraagdeel: "qua seksuele oriëntatie",
    hint:
      "Vaak niet zichtbaar: kijk naar wat in de cultuur als vanzelfsprekend geldt, niet naar individuen.",
    opties: {
      centrum: "Volgens mijn indruk is heteroseksualiteit de onuitgesproken norm.",
      periferie: "Volgens mijn indruk is de LHBTIQ+-gemeenschap de grootste groep.",
    },
  },
  {
    id: "religie",
    label: "Religie",
    shortLabel: "Religie",
    titel: "Religie / levensbeschouwing",
    vraagdeel: "qua religie en levensbeschouwing",
    hint: "Denk aan feestdagen, gebruiken en wat als 'gewoon' geldt.",
    opties: {
      centrum:
        "De meeste collega's zijn seculier of christelijk (de dominante culturele norm).",
      periferie:
        "De meeste collega's zijn moslim, joods of hebben een andere levensovertuiging.",
    },
  },
  {
    id: "taal",
    label: "Taal",
    shortLabel: "Taal",
    titel: "Taal",
    vraagdeel: "qua moedertaal",
    hint: "Denk aan de taal in overleg en op de gang.",
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
    opties: {
      centrum: "Voor zover bekend is de meerderheid neurotypisch.",
      periferie:
        "Voor zover bekend is de meerderheid neurodivers (bijvoorbeeld ADHD, autisme, dyslexie).",
    },
  },
  {
    id: "migratie",
    label: "Migratie",
    shortLabel: "Migratie",
    titel: "Migratieachtergrond",
    vraagdeel: "qua migratieachtergrond",
    hint:
      "Het gaat om geboorteland van collega's en hun ouders, nooit om verblijfsstatus.",
    opties: {
      centrum: "De meeste collega's zijn in Nederland geboren, net als hun ouders.",
      periferie:
        "De meeste collega's zijn zelf of via hun ouders buiten Nederland geboren.",
    },
  },
];
