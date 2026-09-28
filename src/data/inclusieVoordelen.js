/**
 * Pagina "Waarom inclusie loont" — laatste inhoudelijke pagina van de
 * organisatiescan (resultaatscherm en PDF), direct vóór de bronvermelding.
 * Tekst: Richard Vodde / Lectoraat Ethisch Werken, Fontys (28-9-2026).
 * Nieuwe bronnen staan onderaan in BRONNEN_INCLUSIE en moeten worden
 * samengevoegd met BRONNEN_APA (alfabetisch, zonder dubbelingen).
 */

export const INCLUSIE_TITEL = "Waarom inclusie loont";

export const INCLUSIE_INTRO =
  "Diversiteit is een gegeven: in elke organisatie werken mensen met verschillende achtergronden. " +
  "Inclusie is een keuze: doen die verschillen ook mee als er wordt nagedacht, besproken en besloten? " +
  "Onderzoek laat zien dat organisaties vooral profiteren van verschil als het tweede lukt.";

export const INCLUSIE_VOORDELEN = [
  {
    titel: "Betere besluiten",
    tekst:
      "Groepen met verschillende achtergronden wisselen meer informatie uit, controleren elkaar scherper en maken minder feitelijke fouten. " +
      "Leden van homogene groepen voelen zich vaak zekerder, maar besluiten niet beter.",
    bronnen: "Phillips et al., 2009; Sommers, 2006",
  },
  {
    titel: "Meer oplossingsrichtingen",
    tekst:
      "Mensen met verschillende ervaringen kijken anders naar een probleem. Daardoor komen er meer ideeën op tafel en blijft een team minder hangen in de eerste oplossing die opkomt.",
    bronnen: "Page, 2007; van Knippenberg et al., 2004",
  },
  {
    titel: "Minder blinde vlekken aan de top",
    tekst:
      "Een top die sterk lijkt op zichzelf, mist signalen van medewerkers en klanten die anders zijn. " +
      "Wie als enige 'anders' is, wordt bovendien snel als uitzondering gezien in plaats van als volwaardige stem.",
    bronnen: "Kanter, 1977",
  },
  {
    titel: "Meer betrokkenheid, minder verloop",
    tekst:
      "In een inclusief klimaat, waar iedereen gelijke kansen krijgt en zichzelf kan zijn, is er minder conflict tussen groepen en blijven medewerkers langer.",
    bronnen: "Nishii, 2013; Shore et al., 2011",
  },
  {
    titel: "Een organisatie die leert",
    tekst:
      "Als mensen zich veilig voelen om een afwijkende mening, een fout of een vraag te delen, leert een team sneller. " +
      "Verschil wordt dan een bron van leren in plaats van een risico.",
    bronnen: "Edmondson, 1999; Ely & Thomas, 2001",
  },
];

export const INCLUSIE_NUANCE = {
  titel: "Geen automatisme",
  tekst:
    "Diversiteit alleen is geen garantie. Zonder inclusie kan verschil ook leiden tot wij-zij-denken, spanning en uitval. " +
    "De voordelen ontstaan pas als verschil gezien, gehoord en meegewogen wordt. Dat vraagt bewuste keuzes van leiding en teams.",
  bronnen: "Eagly, 2016; Galinsky et al., 2015; van Knippenberg et al., 2004",
};

export const INCLUSIE_GESPREKSVRAGEN = {
  titel: "Om over door te praten",
  vragen: [
    "Wie zit er aan tafel als bij ons belangrijke besluiten vallen, en wie niet?",
    "Welke perspectieven missen we nu, en wat kost ons dat?",
    "Wat is één concrete stap waarmee we verschil dit jaar meer invloed geven?",
  ],
};

/** Nieuwe bronnen (APA 7). Samenvoegen met BRONNEN_APA. */
export const BRONNEN_INCLUSIE = [
  "Eagly, A. H. (2016). When passionate advocates meet research on diversity, does the honest broker stand a chance? Journal of Social Issues, 72(1), 199–222. https://doi.org/10.1111/josi.12163",
  "Edmondson, A. (1999). Psychological safety and learning behavior in work teams. Administrative Science Quarterly, 44(2), 350–383. https://doi.org/10.2307/2666999",
  "Galinsky, A. D., Todd, A. R., Homan, A. C., Phillips, K. W., Apfelbaum, E. P., Sasaki, S. J., Richeson, J. A., Olayon, J. B., & Maddux, W. W. (2015). Maximizing the gains and minimizing the pains of diversity: A policy perspective. Perspectives on Psychological Science, 10(6), 742–748. https://doi.org/10.1177/1745691615598513",
  "Phillips, K. W., Liljenquist, K. A., & Neale, M. A. (2009). Is the pain worth the gain? The advantages and liabilities of agreeing with socially distinct newcomers. Personality and Social Psychology Bulletin, 35(3), 336–350. https://doi.org/10.1177/0146167208328062",
  "Shore, L. M., Randel, A. E., Chung, B. G., Dean, M. A., Holcombe Ehrhart, K., & Singh, G. (2011). Inclusion and diversity in work groups: A review and model for future research. Journal of Management, 37(4), 1262–1289. https://doi.org/10.1177/0149206310385943",
  "Sommers, S. R. (2006). On racial diversity and group decision making: Identifying multiple effects of racial composition on jury deliberations. Journal of Personality and Social Psychology, 90(4), 597–612. https://doi.org/10.1037/0022-3514.90.4.597",
];
