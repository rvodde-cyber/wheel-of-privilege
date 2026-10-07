export const BRONNEN_VERANTWOORDING = {
  DixonFyle2020:
    "Dixon-Fyle, S., Dolan, K., Hunt, V., & Prince, S. (2020). Diversity wins: How inclusion matters. McKinsey & Company.",
  Dobbin2016:
    "Dobbin, F., & Kalev, A. (2016). Why diversity programs fail. Harvard Business Review, 94(7–8), 52–60.",
  Duhigg2016:
    "Duhigg, C. (2016, 25 februari). What Google learned from its quest to build the perfect team. The New York Times Magazine.",
  Edmondson1999:
    "Edmondson, A. (1999). Psychological safety and learning behavior in work teams. Administrative Science Quarterly, 44(2), 350–383.",
  Ely2001:
    "Ely, R. J., & Thomas, D. A. (2001). Cultural diversity at work: The effects of diversity perspectives on work group processes and outcomes. Administrative Science Quarterly, 46(2), 229–273.",
  Green2024:
    "Green, J., & Hand, J. R. M. (2024). McKinsey's diversity matters/delivers/wins results revisited. Econ Journal Watch, 21(1), 5–34.",
  Hunt2015: "Hunt, V., Layton, D., & Prince, S. (2015). Why diversity matters. McKinsey & Company.",
  Hunt2018:
    "Hunt, V., Prince, S., Dixon-Fyle, S., & Yee, L. (2018). Delivering through diversity. McKinsey & Company.",
  Kanter1977: "Kanter, R. M. (1977). Men and women of the corporation. Basic Books.",
  Lau1998:
    "Lau, D. C., & Murnighan, J. K. (1998). Demographic diversity and faultlines: The compositional dynamics of organizational groups. Academy of Management Review, 23(2), 325–340.",
  McPherson2001:
    "McPherson, M., Smith-Lovin, L., & Cook, J. M. (2001). Birds of a feather: Homophily in social networks. Annual Review of Sociology, 27, 415–444.",
  Nishii2013:
    "Nishii, L. H. (2013). The benefits of climate for inclusion for gender-diverse groups. Academy of Management Journal, 56(6), 1754–1774.",
  Phillips2009:
    "Phillips, K. W., Liljenquist, K. A., & Neale, M. A. (2009). Is the pain worth the gain? The advantages and liabilities of agreeing with socially distinct newcomers. Personality and Social Psychology Bulletin, 35(3), 336–350.",
  Sommers2006:
    "Sommers, S. R. (2006). On racial diversity and group decision making: Identifying multiple effects of racial composition on jury deliberations. Journal of Personality and Social Psychology, 90(4), 597–612.",
  vanDijk2012:
    "van Dijk, H., van Engen, M. L., & van Knippenberg, D. (2012). Defying conventional wisdom: A meta-analytical examination of the differences between demographic and job-related diversity relationships with performance. Organizational Behavior and Human Decision Processes, 119(1), 38–53.",
  vanKnippenberg2004:
    "van Knippenberg, D., De Dreu, C. K. W., & Homan, A. C. (2004). Work group diversity and group performance: An integrative model and research agenda. Journal of Applied Psychology, 89(6), 1008–1022.",
  Wallrich2024:
    "Wallrich, L., Opara, V., Wesołowska, M., Barnoth, D., & Yousefi, S. (2024). The relationship between team diversity and team performance: Reconciling promise and reality through a comprehensive meta-analysis registered report. Journal of Business and Psychology, 39(6), 1303–1354.",
};

function bronSortKey(line) {
  return line.replace(/^van /i, "").toLocaleLowerCase("nl");
}

/**
 * @param {string[]} ids
 * @returns {string[]}
 */
export function bronnenLijst(ids) {
  const texts = ids.map((id) => BRONNEN_VERANTWOORDING[id]).filter(Boolean);
  return texts.sort((a, b) => bronSortKey(a).localeCompare(bronSortKey(b), "nl"));
}
