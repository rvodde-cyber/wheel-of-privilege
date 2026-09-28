const BRONNEN =
  "Geïnspireerd op intersectionaliteitstheorie (Kimberlé Crenshaw, 1989), " +
  '"White Privilege: Unpacking the Invisible Knapsack" (Peggy McIntosh, 1989), ' +
  "en De zeven vinkjes (Joris Luyendijk, 2022).";

/**
 * @param {'hoog' | 'gemengd' | 'laag'} niveau
 * @param {number} n
 * @param {number} m
 */
export function adviesVoorNiveau(niveau, n, m) {
  const teller = `${n} van de ${m} ingeschatte onderwerpen`;

  const templates = {
    hoog: {
      samenvatting:
        `Op ${teller} lijkt de grootste groep collega's dicht bij het maatschappelijke machtscentrum te zitten. ` +
        "Dat wijst op een organisatiebeeld waarin dominante normen breed gedeeld lijken.",
      onderbouwing:
        "Een hoge concentratie richting het centrum betekent niet dat iedereen hetzelfde ervaart, " +
        "maar dat jouw algemene indruk is dat de meerderheid past binnen wat maatschappelijk als norm geldt.",
      advies:
        "Gebruik dit beeld om te verkennen waar blinde vlekken kunnen zitten: wie valt buiten het zichtbare 'normaal'? " +
        "Betrek verschillende lagen en teams in het gesprek.",
    },
    gemengd: {
      samenvatting:
        `Op ${teller} is het beeld gemengd: sommige onderwerpen wijzen naar het centrum, andere naar tussen of periferie. ` +
        "Dat past bij organisaties waar werkvloer en top niet hetzelfde lijken.",
      onderbouwing:
        "Gemengde patronen zijn gebruikelijk. Ze kunnen wijzen op verschil tussen lagen, afdelingen of wat bespreekbaar is.",
      advies:
        "Vergelijk per onderwerp waar het beeld uiteenloopt. Waar zie je verschil tussen werkvloer en leiding? " +
        "Welke onderwerpen vraagt om verder onderzoek of dialoog?",
    },
    laag: {
      samenvatting:
        `Op ${teller} lijkt de grootste groep collega's vaker aan de periferie te zitten dan in het machtscentrum. ` +
        "Dat wijst op een organisatiebeeld waarin afwijking van dominante normen relatief zichtbaar is.",
      onderbouwing:
        "Een lager aandeel richting het centrum beschrijft jouw indruk, geen objectieve telling. " +
        "Het kan helpen om te onderzoeken welke structuren en cultuur dit beeld voeden.",
      advies:
        "Bespreek welke onderwerpen het sterkst naar de periferie wijzen. " +
        "Welke maatregelen of gewoonten versterken inclusie en gelijke kansen?",
    },
  };

  const block = templates[niveau];
  return {
    ...block,
    bronnen: BRONNEN,
  };
}

export { BRONNEN };
