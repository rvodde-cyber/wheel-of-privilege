export const AXES_SELF = [
  {
    id: "opleiding",
    label: "Opleidingsniveau",
    shortLabel: "Opleiding",
    hint:
      "Gaat om je eigen formele opleiding. Opleiding van je ouders komt bij een andere as aan bod.",
    instructie: "Kies wat het beste past bij je hoogst afgeronde opleiding.",
    positions: {
      center: "Hoger onderwijs afgerond (hbo of wo)",
      middle: "Middelbaar beroepsonderwijs of havo/vwo (mbo 3-4)",
      periphery: "Vmbo, mbo 1-2, praktijkonderwijs of geen diploma",
    },
  },
  {
    id: "klasse",
    label: "Sociaaleconomische klasse",
    shortLabel: "Klasse",
    hint: "Denk aan de financiële ruimte waarin je opgroeide, niet aan je huidige inkomen alleen.",
    instructie: "Kies wat het beste past bij je achtergrond.",
    positions: {
      center:
        "Ik groeide op met financiële zekerheid: eigen woning, ruimte voor onverwachte uitgaven en goede voorzieningen in de buurt.",
      middle:
        "Ik groeide op met voldoende middelen, maar zonder grote buffer of vermogen.",
      periphery:
        "Ik groeide op met weinig financiële ruimte; zorgen over geld waren een vast onderdeel van het dagelijks leven.",
    },
  },
  {
    id: "ouders",
    label: "Ouderlijke achtergrond",
    shortLabel: "Ouders",
    hint:
      "Gaat om de hoogste opleiding van je ouders of verzorgers, voor zover je die kent. Geld en woning komen bij klasse aan bod.",
    instructie: "Kies wat het beste past bij de hoogst opgeleide ouder of verzorger.",
    positions: {
      center: "Minstens één ouder of verzorger had hoger onderwijs afgerond (hbo of wo).",
      middle: "Mijn ouders of verzorgers hadden mbo 3-4 of havo/vwo als hoogste opleiding.",
      periphery:
        "Mijn ouders of verzorgers hadden vmbo, mbo 1-2, praktijkonderwijs of geen diploma.",
    },
  },
  {
    id: "etniciteit",
    label: "Etniciteit / huidskleur",
    shortLabel: "Etniciteit",
    hint:
      "Het gaat om hoe je in de samenleving gelezen wordt, niet om je paspoort (dat komt bij Paspoort en verblijfsstatus aan bod). Machtsverschillen tussen witte Nederlanders onderling komen terug bij klasse, ouders, opleiding en taal.",
    instructie: "Denk aan: hoe word je meestal gezien en behandeld?",
    positions: {
      center:
        "Ik word in Nederland vanzelf als 'gewoon Nederlands' gezien en hoef zelden uit te leggen waar ik vandaan kom.",
      middle:
        "Ik word soms als 'anders' gezien, maar dat is niet het hele beeld dat mensen van mij hebben.",
      periphery:
        "Ik word vaak of structureel als 'anders' gezien vanwege mijn uiterlijk of huidskleur.",
    },
  },
  {
    id: "gender",
    label: "Gender",
    shortLabel: "Gender",
    hint: "Het gaat om hoe je gezien en behandeld wordt, niet alleen om hoe je jezelf noemt.",
    instructie: "Denk aan: hoe word je meestal gezien en behandeld?",
    positions: {
      center: "Ik word als man gezien en behandeld.",
      middle:
        "Mijn genderidentiteit of -expressie wijkt af van de norm, maar ik ervaar dat zelden als belemmerend.",
      periphery:
        "Ik word vaak of structureel anders behandeld vanwege mijn gender (bijvoorbeeld als vrouw, non-binair of transgender).",
    },
  },
  {
    id: "seksualiteit",
    label: "Seksuele oriëntatie",
    shortLabel: "Seksualiteit",
    hint:
      "Denk aan: hoe vanzelfsprekend is jouw relatie of gezinssituatie in jouw omgeving? Voorbeelden van niet-heteroseksuele oriëntaties: homo, lesbisch, bi, pan, queer.",
    instructie: "Denk aan: waar hoor je zelf bij?",
    positions: {
      center:
        "Ik ben heteroseksueel en hoef mijn relatie of gezinssituatie zelden te verantwoorden of te verbergen.",
      middle:
        "Mijn oriëntatie is niet heteroseksueel; ik ervaar acceptatie, maar niet altijd als vanzelfsprekend.",
      periphery:
        "Mijn oriëntatie is niet heteroseksueel; ik ervaar vaak uitsluiting of moet mezelf verbergen.",
    },
  },
  {
    id: "religie",
    label: "Religie / levensbeschouwing",
    shortLabel: "Religie",
    hint:
      "Het gaat erom wiens feestdagen, gewoonten en vanzelfsprekendheden in jouw omgeving de norm zijn.",
    instructie: "Denk aan: waar hoor je zelf bij?",
    positions: {
      center:
        "Geen religie, atheïst, agnost of christelijk (kerkelijk of cultureel)",
      middle:
        "Een religie of levensbeschouwing die in mijn omgeving soms opvalt of uitleg vraagt",
      periphery:
        "Een religie of levensbeschouwing die in mijn omgeving vaak bevraagd wordt of tot nadeel leidt (bijvoorbeeld moslim of joods)",
    },
  },
  {
    id: "taal",
    label: "Taal (moedertaal)",
    shortLabel: "Taal",
    hint:
      "Gaat om je moedertaal. Een hoorbaar accent kan ook meetellen in hoe je gezien wordt, ook als je de taal goed spreekt.",
    instructie: "Denk aan: hoe word je meestal gezien en behandeld?",
    positions: {
      center: "Nederlands is mijn moedertaal.",
      middle: "Ik spreek Nederlands vloeiend, maar het is niet mijn moedertaal.",
      periphery:
        "Nederlands is niet mijn moedertaal en ik moet regelmatig extra moeite doen om mee te komen of begrepen te worden.",
    },
  },
  {
    id: "gezondheid",
    label: "Gezondheid / lichamelijke beperking",
    shortLabel: "Gezondheid",
    hint: "Ook onzichtbare kenmerken tellen mee. Kies wat in de praktijk voor jou merkbaar is.",
    instructie: "Denk aan: hoe word je meestal gezien en behandeld?",
    positions: {
      center:
        "Ik heb geen chronische ziekte of lichamelijke beperking die mijn dagelijks functioneren structureel beïnvloedt.",
      middle:
        "Ik heb een beperking of aandoening die soms impact heeft, met redelijke aanpassingen beschikbaar.",
      periphery:
        "Ik heb een beperking of chronische aandoening die mijn toegang tot werk, onderwijs of openbare ruimtes regelmatig beperkt.",
    },
  },
  {
    id: "neurodiversiteit",
    label: "Neurodiversiteit",
    shortLabel: "Neuro",
    hint: "Ook onzichtbare kenmerken tellen mee. Kies wat in de praktijk voor jou merkbaar is.",
    instructie: "Denk aan: waar hoor je zelf bij?",
    positions: {
      center:
        "Mijn manier van denken, leren en communiceren sluit aan bij wat als normaal wordt gezien in onderwijs en werk.",
      middle:
        "Ik ben neurodivergent en heb soms extra aanpassing nodig, maar dat beperkt me niet structureel.",
      periphery:
        "Mijn neurodivergentie beïnvloedt mijn functioneren structureel en vraagt vaak om aanpassingen die niet vanzelf komen.",
    },
  },
  {
    id: "migratie",
    label: "Paspoort en verblijfsstatus",
    shortLabel: "Paspoort",
    hint:
      "Gaat om wat je paspoort of verblijfsstatus je toestaat (reizen, wonen, werken, zekerheid), niet om je culturele achtergrond.",
    instructie: "Denk aan: welke deuren opent of sluit jouw paspoort?",
    positions: {
      center:
        "Mijn paspoort opent veel deuren: ik kan vrij reizen, wonen en werken zonder visum of verblijfsvergunning.",
      middle:
        "Ik heb een sterk paspoort, maar merk soms extra drempels (bijvoorbeeld bij visa, grenscontroles of naturalisatie).",
      periphery:
        "Mijn paspoort of verblijfsstatus beperkt wat ik kan: reizen, wonen of werken is niet vanzelfsprekend of niet zeker.",
    },
  },
];
