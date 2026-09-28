export const BRONNEN_APA = [
  "Crenshaw, K. (1989). Demarginalizing the intersection of race and sex: A Black feminist critique of antidiscrimination doctrine, feminist theory and antiracist politics. University of Chicago Legal Forum, 1989(1), 139–167.",
  "Ely, R. J., & Thomas, D. A. (2001). Cultural diversity at work: The effects of diversity perspectives on work group processes and outcomes. Administrative Science Quarterly, 46(2), 229–273. https://doi.org/10.2307/2667087",
  "Kanter, R. M. (1977). Men and women of the corporation. Basic Books.",
  "Luyendijk, J. (2022). De zeven vinkjes: Hoe mannen zoals ik de samenleving domineren. Pluim.",
  "McIntosh, P. (1989). White privilege: Unpacking the invisible knapsack. Peace and Freedom, July/August, 10–12.",
  "Nishii, L. H. (2013). The benefits of climate for inclusion for gender-diverse groups. Academy of Management Journal, 56(6), 1754–1774. https://doi.org/10.5465/amj.2009.0823",
  "Page, S. E. (2007). The difference: How the power of diversity creates better groups, firms, schools, and societies. Princeton University Press.",
  "van Knippenberg, D., De Dreu, C. K. W., & Homan, A. C. (2004). Work group diversity and group performance: An integrative model and research agenda. Journal of Applied Psychology, 89(6), 1008–1022. https://doi.org/10.1037/0021-9010.89.6.1008",
];

/**
 * @param {'kloof' | 'beperkt' | 'geen'} niveau
 * @param {number} n
 * @param {number} m
 */
export function kloofAdvies(niveau, n, m) {
  const templates = {
    kloof: {
      samenvatting:
        `Op ${n} van de ${m} vergeleken onderwerpen zit de top volgens jouw indruk dichter bij het machtscentrum dan de rest van de organisatie. ` +
        "Dat wijst op een verschil in wie er meebeslist.",
      onderbouwing:
        "Diversiteit levert pas betere besluiten op als verschillende perspectieven ook invloed hebben (Ely & Thomas, 2001; Nishii, 2013). " +
        "Een homogene top met een diverse werkvloer brengt het risico van tokenisme en ongelijke doorstroom (Kanter, 1977).",
      advies:
        "Bekijk doorstroom, werving en wie aan tafel zit bij besluiten; bespreek het beeld met verschillende lagen.",
    },
    beperkt: {
      samenvatting:
        `Op ${n} van de ${m} vergeleken onderwerpen zit de top iets dichter bij het machtscentrum dan de rest van de organisatie.`,
      onderbouwing: "De verschillen zijn beperkt; ze kunnen samenhangen met specifieke teams of functies.",
      advies:
        "Verken of die verschillen samenhangen met specifieke functies of teams.",
    },
    geen: {
      samenvatting:
        "Organisatie en top lijken volgens jouw indruk op elkaar qua positie op de vergeleken onderwerpen.",
      onderbouwing:
        "Een gelijk beeld betekent niet dat iedereen dezelfde ervaring heeft, maar dat jouw indruk van werkvloer en top niet sterk uiteenloopt.",
      advies:
        "Vergelijk dit beeld met de omgeving en de doelgroep van de organisatie.",
    },
  };
  return templates[niveau];
}

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
        "Diversiteit kan de kwaliteit van probleemoplossing en besluitvorming vergroten (Page, 2007), mits er een inclusief klimaat is (Nishii, 2013). " +
        "Zonder inclusie kan diversiteit ook tot spanning leiden (van Knippenberg et al., 2004).",
      advies:
        "Gebruik dit beeld om te verkennen waar blinde vlekken kunnen zitten: wie valt buiten het zichtbare 'normaal'? " +
        "Betrek verschillende lagen en teams in het gesprek.",
    },
    gemengd: {
      samenvatting:
        `Op ${teller} is het beeld gemengd: sommige onderwerpen wijzen naar het centrum, andere naar tussen of periferie.`,
      onderbouwing:
        "Gemengde patronen zijn gebruikelijk. Diversiteit levert vooral winst wanneer verschillende perspectieven invloed hebben (Ely & Thomas, 2001; Page, 2007).",
      advies:
        "Vergelijk per onderwerp waar het beeld uiteenloopt. Welke onderwerpen vragen om verder onderzoek of dialoog?",
    },
    laag: {
      samenvatting:
        `Op ${teller} lijkt de grootste groep collega's vaker aan de periferie te zitten dan in het machtscentrum.`,
      onderbouwing:
        "Een organisatiebeeld met meer periferie beschrijft jouw indruk, geen objectieve telling. " +
        "Inclusief klimaat blijft nodig om van diversiteit te profiteren (Nishii, 2013; van Knippenberg et al., 2004).",
      advies:
        "Bespreek welke onderwerpen het sterkst naar de periferie wijzen en welke structuren inclusie versterken.",
    },
  };

  return templates[niveau];
}
