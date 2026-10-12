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
    hint: "Gaat om de opleiding en positie van je ouders of verzorgers, voor zover je die kent.",
    instructie: "Kies wat het beste past bij je opvoeding.",
    positions: {
      center:
        "Mijn ouders of verzorgers hadden hoger onderwijs afgerond en een stevige maatschappelijke of financiële positie.",
      middle:
        "Mijn ouders of verzorgers hadden middenbaar onderwijs en een stabiele maar bescheiden positie.",
      periphery:
        "Mijn ouders of verzorgers hadden weinig formele opleiding en beperkte financiële en maatschappelijke middelen.",
    },
  },
  {
    id: "etniciteit",
    label: "Herkomst en paspoort",
    shortLabel: "Herkomst",
    hint:
      "Machtsverschillen tussen witte Nederlanders onderling (regio, klasse, opleiding, ouders) komen terug bij de andere assen.",
    instructie: "Denk aan hoe de samenleving je meestal behandelt en leest.",
    positions: {
      center:
        "Nederlands paspoort vanaf geboorte, ouders in Nederland geboren, en in de samenleving vanzelf als 'gewoon Nederlands' gezien",
      middle:
        "Nederlands of Europees paspoort, maar ik of mijn ouders komen uit het buitenland; ik word soms als 'anders' gezien",
      periphery:
        "Ik word vaak als 'anders' gezien, of mijn paspoort of verblijfsstatus beperkt wat ik kan (reizen, werken, zekerheid)",
    },
  },
  {
    id: "gender",
    label: "Gender",
    shortLabel: "Gender",
    hint: "Ook onzichtbare kenmerken tellen mee. Kies wat in de praktijk voor jou merkbaar is.",
    instructie: "Denk aan: hoe word je meestal gezien en behandeld?",
    positions: {
      center:
        "Ik identificeer als man en word over het algemeen als man gezien — de norm in veel machtsstructuren.",
      middle:
        "Mijn genderidentiteit of -expressie wijkt af van de dominante norm, maar ik ervaar dat zelden als belemmerend.",
      periphery:
        "Ik identificeer niet als man, of word structureel anders behandeld vanwege mijn gender.",
    },
  },
  {
    id: "seksualiteit",
    label: "Seksuele oriëntatie",
    shortLabel: "Seksualiteit",
    hint: "Kies wat in de praktijk voor jou het zwaarst weegt in je dagelijks leven.",
    instructie: "Denk aan: waar hoor je zelf bij?",
    positions: {
      center:
        "Ik ben heteroseksueel en hoef mijn relatie of gezinssituatie zelden te verantwoorden of te verbergen.",
      middle:
        "Ik identificeer als bi, pan of queer en ervaar acceptatie, maar niet altijd als vanzelfsprekend.",
      periphery:
        "Ik identificeer als lhbtiq+ en ervaar dat mijn oriëntatie soms of vaak een bron van uitsluiting of onzichtbaarheid is.",
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
    hint: "Een hoorbaar accent kan meetellen, ook als je de taal goed spreekt.",
    instructie: "Denk aan: hoe word je meestal gezien en behandeld?",
    positions: {
      center:
        "Nederlands is mijn moedertaal en ik spreek deze vloeiend zonder dat mijn manier van spreken opvalt.",
      middle:
        "Ik spreek Nederlands vloeiend, maar het is niet mijn moedertaal of mijn accent valt op.",
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
    label: "Immigratiestatus",
    shortLabel: "Migratie",
    hint: "Paspoort en herkomst komen ook bij de as Herkomst aan bod; hier gaat het om geboorte en nationaliteit.",
    instructie: "Kies wat het beste past bij je situatie.",
    positions: {
      center:
        "Ik ben in Nederland geboren en mijn ouders ook; ik heb de Nederlandse nationaliteit.",
      middle:
        "Ik ben in Nederland geboren, maar minstens één van mijn ouders is in een ander land geboren.",
      periphery:
        "Ik ben zelf in een ander land geboren, of mijn migratieachtergrond beïnvloedt mijn status of toegang.",
    },
  },
];
