/**
 * Bron van waarheid voor de persoonlijke analyse. Wordt later ongewijzigd gekopieerd naar moral-maps.
 * Bronnen: Collins (2000), Crenshaw (1989), Davidai & Gilovich (2016), Elder (1998), Kanter (1977),
 * Luyendijk (2022), McAdams & McLean (2013), McIntosh (1989).
 */

import { selectionToScore } from "./conclusie.js";

export const OPENING =
  "Dit wiel laat zien waar je staat op een aantal maatschappelijke assen. Het laat niet zien wie je bent. " +
  "Wie je wordt, wordt ook gevormd door wat je meemaakt, goed en minder goed, en door de mensen die je onderweg tegenkomt. " +
  "Daarover kan deze app niets zeggen. Lees wat volgt daarom als een mogelijke spiegel, niet als een beschrijving van jou.";

export const AFSLUITING =
  "Dit is een momentopname op basis van je eigen inschatting. Jouw leven is rijker dan een wiel kan laten zien, " +
  "en jij kent je eigen verhaal het best. Raakt dit iets bij je? Bespreek het dan met iemand die je vertrouwt.";

export const TUSSEN_DUIDING_TEMPLATE =
  "Op {as} ervaar je misschien wisselend voor- en nadeel, afhankelijk van de situatie.";

export const AS_DUIDING = {
  opleiding: {
    center:
      "Je opleiding kan je toegang geven tot de taal en codes van onderwijs en organisaties, vaak zonder dat dat opvalt.",
    periphery:
      "Misschien heb je je kennis langs andere wegen opgebouwd dan via een diploma. Formele eisen kunnen dan drempels opwerpen die weinig zeggen over wat je kunt.",
  },
  klasse: {
    center:
      "Financiële ruimte kan het makkelijker maken om risico's te nemen, zoals een onbetaalde stage, een studieswitch of een extra jaar.",
    periphery:
      "Krappe middelen kunnen planning en energie vragen die anderen aan iets anders kunnen besteden.",
  },
  ouders: {
    center:
      "Ouders die het systeem kennen, kunnen advies, netwerk en vanzelfsprekendheid meegeven.",
    periphery:
      "Als je de weg zelf hebt moeten vinden, heb je misschien dingen uitgezocht die anderen thuis meekregen.",
  },
  etniciteit: {
    center:
      "Het kan zijn dat je zelden wordt gezien als vertegenwoordiger van een groep en je achtergrond zelden hoeft uit te leggen.",
    periphery:
      "Je kunt te maken krijgen met aannames, extra zichtbaarheid of de vraag waar je 'echt' vandaan komt.",
  },
  gender: {
    center:
      "Je gedrag wordt misschien minder snel via je gender beoordeeld. Ambitie of stelligheid kan bij jou eerder als vanzelfsprekend gelden.",
    periphery:
      "Het kan zijn dat er andere verwachtingen worden gesteld aan je gedrag, je uiterlijk of je ambitie.",
  },
  seksualiteit: {
    center:
      "Het kan zijn dat je weinig hoeft na te denken over of, wanneer en bij wie je iets over je relatie vertelt.",
    periphery:
      "Steeds opnieuw inschatten of je open kunt zijn, kan aandacht kosten, ook als het meestal goed gaat.",
  },
  religie: {
    center:
      "Feestdagen, ritmes en gewoonten in de meeste organisaties sluiten misschien aan bij hoe jij leeft.",
    periphery:
      "Het kan zijn dat roosters, gewoonten of grappen geen rekening houden met jouw levensbeschouwing.",
  },
  taal: {
    center:
      "Nuance, humor en subtiele codes gebruiken gaat je misschien moeiteloos af, en dat kan bijdragen aan hoe deskundig je wordt gevonden.",
    periphery:
      "Werken in een andere taal kan extra inspanning vragen, en een accent kan ten onrechte iets lijken te zeggen over je kennis.",
  },
  gezondheid: {
    center:
      "Gebouwen, werktijden en tempo zijn grotendeels ingericht op lichamen zoals het jouwe.",
    periphery:
      "Je energie verdelen, aanpassingen regelen of uitleggen wat je nodig hebt, kan werk zijn dat anderen niet zien.",
  },
  neurodiversiteit: {
    center:
      "De manier waarop organisaties communiceren, vergaderen en plannen, sluit misschien aan bij hoe jij denkt en waarneemt.",
    periphery:
      "Het kan zijn dat je je vaak aanpast aan verwachtingen over communicatie en prikkels. Dat kan energie kosten die buiten beeld blijft.",
  },
  migratie: {
    center:
      "Misschien hoef je zelden na te denken over papieren, nationaliteit of waar je 'eigenlijk' thuishoort.",
    periphery:
      "Het kan zijn dat je migratieachtergrond of je status vragen oproept die anderen niet krijgen, ook als je hier geboren bent of er al lang woont.",
  },
};

const PATROON_TEKST = {
  te_weinig:
    "Je hebt op te weinig assen een positie gekozen voor een analyse. Je kunt teruggaan en meer assen invullen; dat mag, maar het hoeft niet.",
  veel_mee:
    "Op de meeste assen sta je dicht bij het machtscentrum. Dat zegt niets over de inspanning, keuzes en tegenslagen in jouw leven; die laat dit wiel niet zien. " +
    "Het kan wel betekenen dat je op sommige momenten minder weerstand ervaart dan anderen, zonder dat dat opvalt. " +
    "Mensen merken hun eigen tegenwind namelijk sterker op dan hun meewind (Davidai & Gilovich, 2016). " +
    "Daarom kan het waardevol zijn om er af en toe bewust bij stil te staan (McIntosh, 1989).",
  veel_tegen:
    "Op veel assen sta je verder van het machtscentrum. Dat zegt niets over wat je kunt of wat je waard bent. Het zegt iets over hoe onderwijs en organisaties zijn ingericht. " +
    "Misschien herken je dat sommige dingen meer energie vragen dan je bij anderen ziet. Misschien ook niet; dat hangt af van jouw weg en de mensen die je onderweg hebt ontmoet.",
  tussen:
    "Op veel assen sta je tussenin. Of je voordeel of nadeel ervaart, hangt dan sterk af van de context: wie er in de kamer zit, welke taal er gesproken wordt, wat er als 'normaal' geldt. " +
    "Misschien herken je situaties waarin de balans omslaat.",
  gemengd:
    "Je profiel laat een gemengd beeld zien: op sommige assen heb je wind mee, op andere wind tegen. Misschien herken je daardoor iets van beide kanten. Macht werkt op meerdere assen tegelijk (Collins, 2000).",
};

const KRUISING_PAIRS = [
  {
    ids: ["opleiding", "ouders"],
    text:
      "Als eerste in je omgeving de weg door onderwijs of organisatie vinden, kan betekenen dat je ongeschreven regels zelf moet ontdekken.",
  },
  {
    ids: ["klasse", "ouders"],
    text:
      "Weinig financiële ruimte en weinig meegekregen netwerk kunnen elkaar versterken, bijvoorbeeld als er iets tegenzit.",
  },
  {
    ids: ["etniciteit", "gender"],
    text:
      "Aannames over afkomst en over gender kunnen samenvallen tot een ervaring die meer is dan de som van beide (Crenshaw, 1989).",
  },
  {
    ids: ["etniciteit", "taal"],
    text:
      "Afkomst en taal worden vaak in één adem gelezen. Daardoor word je mogelijk sneller als 'anders' gezien dan je zelf voelt.",
  },
  {
    ids: ["gezondheid", "neurodiversiteit"],
    text:
      "Zowel lichaam als brein kunnen om aanpassingen vragen in een omgeving die daar meestal niet op is ingericht.",
  },
  {
    ids: ["gender", "seksualiteit"],
    text:
      "Verwachtingen over gender en relaties kunnen elkaar versterken, bijvoorbeeld in informele gesprekken op het werk.",
  },
];

const KRUISING_FALLBACK =
  "Tegenwind op meerdere assen kan elkaar versterken. Het gaat dan niet om losse drempels, maar om hoe ze samen uitwerken (Crenshaw, 1989).";

const KRUISING_BRUG =
  "Omdat je op de ene as wind mee en op de andere wind tegen hebt, kun je je misschien verplaatsen in mensen aan beide kanten.";

const RICHTING_TOP_INTRO =
  "In de top van organisaties is het profiel vaak eenzijdiger dan in de samenleving: wie daar zit, staat meestal op veel assen dicht bij het machtscentrum (Luyendijk, 2022).";

const RICHTING_TOP_WIND_MEE =
  "Je wind mee op {centrumassen} kan deuren openen zonder dat je daar zelf voor hoeft te kiezen.";

const RICHTING_TOP_PERIFERIE =
  "Op {periferieassen} ben je in hogere lagen mogelijk vaker de enige. Dat kan extra zichtbaarheid en druk geven (Kanter, 1977).";

const RICHTING_TOP_AFSLUIT =
  "Dit is geen voorspelling over jouw loopbaan. Het is een uitnodiging om te kijken welke steun, netwerken en bondgenoten voor jou het verschil maken, en voor wie jij dat verschil kunt maken.";

const VOLHOUDEN_VRAAG =
  "Wie heeft je onderweg wind mee gegeven, op een moment dat die niet vanzelf kwam? En voor wie zou jij zo iemand kunnen zijn?";

function asLabel(axis) {
  return axis.label.charAt(0).toLowerCase() + axis.label.slice(1);
}

function formatList(items) {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} en ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} en ${items[items.length - 1]}`;
}

function isPeriphery(selections, axisId) {
  return selectionToScore(selections[axisId]) === 2;
}

function buildKruisingen(selections, centrumCount, periferieCount) {
  const kruisingen = [];
  for (const pair of KRUISING_PAIRS) {
    if (kruisingen.length >= 2) break;
    const [a, b] = pair.ids;
    if (isPeriphery(selections, a) && isPeriphery(selections, b)) {
      kruisingen.push(pair.text);
    }
  }
  if (kruisingen.length === 0 && periferieCount >= 2) {
    kruisingen.push(KRUISING_FALLBACK);
  }
  if (centrumCount >= 1 && periferieCount >= 1) {
    kruisingen.push(KRUISING_BRUG);
  }
  return kruisingen;
}

function buildRichtingTop(axes, selections, n, centrumLabels, periferieLabels) {
  if (n < 5) return [];
  const lines = [RICHTING_TOP_INTRO];
  if (centrumLabels.length >= 1) {
    lines.push(RICHTING_TOP_WIND_MEE.replace("{centrumassen}", formatList(centrumLabels)));
  }
  if (periferieLabels.length >= 1) {
    lines.push(RICHTING_TOP_PERIFERIE.replace("{periferieassen}", formatList(periferieLabels)));
  }
  lines.push(RICHTING_TOP_AFSLUIT);
  return lines;
}

function eersteAsLabel(axes, selections, score) {
  const axis = axes.find((a) => selectionToScore(selections[a.id]) === score);
  return axis ? asLabel(axis) : "";
}

function buildVragen(patroon, selections, axes, centrumCount, periferieCount) {
  const centrumAs = eersteAsLabel(axes, selections, 0);
  const periferieAs = eersteAsLabel(axes, selections, 2);
  const vragen = [];

  if (centrumCount >= 1) {
    vragen.push({
      fase: "Zien",
      tekst: `Op ${centrumAs} heb je wind mee. Wanneer merkte je dat voor het laatst, of juist helemaal niet?`,
    });
  } else if (periferieCount >= 1) {
    vragen.push({
      fase: "Zien",
      tekst: `Op ${periferieAs} ervaar je mogelijk tegenwind. In welke situaties merk je dat het sterkst, en wanneer raakt het op de achtergrond?`,
    });
  } else {
    vragen.push({
      fase: "Zien",
      tekst: "Wat viel je als eerste op toen je je eigen wiel zag?",
    });
  }

  const voelen = {
    veel_mee:
      "Wat gebeurt er in je als je leest dat je op veel assen wind mee hebt? Herkenning, ongemak, verzet? Alle drie zijn begrijpelijk.",
    veel_tegen:
      "Wat roept het bij je op om je wiel zo te zien? Neem de tijd; er is geen goed of fout antwoord.",
    tussen:
      "Herken je een situatie waarin de balans omslaat, van erbij horen naar er net niet bij horen?",
    gemengd:
      "Op welke as voel je je het meest thuis, en op welke het minst? Hoe merk je dat verschil?",
  };
  vragen.push({ fase: "Voelen", tekst: voelen[patroon] || voelen.gemengd });

  if (centrumCount >= 1) {
    vragen.push({
      fase: "Wegen",
      tekst:
        "Stel dat je iemand beoordeelt of selecteert. Welke vanzelfsprekendheid van jou zou je dan bewust willen bevragen?",
    });
  } else if (periferieCount >= 1) {
    vragen.push({
      fase: "Wegen",
      tekst:
        "Is er een ongeschreven regel die jij hebt moeten leren en anderen misschien niet? Wat zegt dat over de regel?",
    });
  } else {
    vragen.push({
      fase: "Wegen",
      tekst:
        "Welke waarden ervaar jij als vanzelfsprekend, en wie heeft daar misschien een andere ervaring mee?",
    });
  }

  if (centrumCount >= 1 && periferieCount >= 1) {
    vragen.push({
      fase: "Handelen",
      tekst: `Hoe zou je jouw meewind op ${centrumAs} kunnen inzetten voor iemand die daar tegenwind ervaart?`,
    });
  } else if (centrumCount >= 1) {
    vragen.push({
      fase: "Handelen",
      tekst:
        "Wie in je omgeving heeft misschien tegenwind waar jij wind mee hebt? Wat zou een kleine, concrete stap naar die persoon kunnen zijn?",
    });
  } else if (periferieCount >= 1) {
    vragen.push({
      fase: "Handelen",
      tekst: `Als je op ${periferieAs} tegenwind ervaart of hebt ervaren: wie of wat hielp je daarbij? En hoe zou je dat kunnen doorgeven?`,
    });
  } else {
    vragen.push({
      fase: "Handelen",
      tekst: "Welke kleine stap zou je deze week kunnen zetten met wat je vandaag hebt gezien?",
    });
  }

  vragen.push({ fase: "Volhouden", tekst: VOLHOUDEN_VRAAG });
  return vragen;
}

/**
 * @param {Record<string, string>} selections
 * @param {{ id: string, label: string }[]} axes
 */
export function buildIndividueleAnalyse(selections, axes) {
  const answered = axes.filter((axis) => selectionToScore(selections[axis.id]) !== null);
  const n = answered.length;
  let c = 0;
  let t = 0;
  let p = 0;

  const windMee = [];
  const windTegen = [];
  const tussen = [];
  const centrumLabels = [];
  const periferieLabels = [];

  for (const axis of axes) {
    const score = selectionToScore(selections[axis.id]);
    if (score === null) continue;
    if (score === 0) {
      c += 1;
      centrumLabels.push(asLabel(axis));
      windMee.push({ titel: axis.label, tekst: AS_DUIDING[axis.id].center });
    } else if (score === 2) {
      p += 1;
      periferieLabels.push(asLabel(axis));
      windTegen.push({ titel: axis.label, tekst: AS_DUIDING[axis.id].periphery });
    } else {
      t += 1;
      const tekst = TUSSEN_DUIDING_TEMPLATE.replace("{as}", asLabel(axis));
      tussen.push({ titel: axis.label, tekst });
    }
  }

  let patroon = "gemengd";
  if (n < 5) patroon = "te_weinig";
  else if (c / n >= 0.6) patroon = "veel_mee";
  else if (p / n >= 0.5) patroon = "veel_tegen";
  else if (t / n >= 0.5) patroon = "tussen";

  const opening = OPENING;
  const afsluiting = AFSLUITING;
  const algemeen = PATROON_TEKST[patroon];

  if (patroon === "te_weinig") {
    return {
      patroon,
      opening,
      algemeen,
      windMee: [],
      windTegen: [],
      tussen: [],
      kruisingen: [],
      richtingTop: [],
      vragen: [],
      afsluiting,
    };
  }

  const kruisingen = buildKruisingen(selections, c, p);
  const richtingTop = buildRichtingTop(axes, selections, n, centrumLabels, periferieLabels);
  const vragen = buildVragen(patroon, selections, axes, c, p);

  return {
    patroon,
    opening,
    algemeen,
    windMee,
    windTegen,
    tussen,
    kruisingen,
    richtingTop,
    vragen,
    afsluiting,
  };
}
