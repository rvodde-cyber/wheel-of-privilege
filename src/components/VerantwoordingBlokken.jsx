import { config } from "../config.js";

const blockStyles = {
  p: {
    fontFamily: config.fonts.voice,
    fontSize: "1.0625rem",
    lineHeight: 1.65,
    margin: "0 0 1em",
    color: config.colors.text,
  },
  h2: {
    fontFamily: config.fonts.voice,
    fontSize: "0.9375rem",
    fontWeight: 600,
    margin: "1.5em 0 0.5em",
    color: config.colors.text,
  },
  ul: {
    fontFamily: config.fonts.voice,
    fontSize: "1.0625rem",
    lineHeight: 1.6,
    margin: "0 0 1em",
    paddingLeft: "1.25em",
  },
  ol: {
    fontFamily: config.fonts.voice,
    fontSize: "1.0625rem",
    lineHeight: 1.6,
    margin: "0 0 1em",
    paddingLeft: "1.35em",
  },
  quote: {
    fontFamily: config.fonts.voice,
    fontStyle: "italic",
    fontSize: "1.3em",
    lineHeight: 1.45,
    color: config.colors.dotStrong,
    margin: "1.25em 0",
    paddingLeft: 16,
    borderLeft: `3px solid ${config.colors.dotMid}`,
  },
  tabelWrap: {
    overflowX: "auto",
    margin: "0 0 1em",
    WebkitOverflowScrolling: "touch",
  },
  table: {
    width: "100%",
    minWidth: 280,
    borderCollapse: "collapse",
    fontFamily: config.fonts.ui,
    fontSize: "0.875rem",
    lineHeight: 1.45,
  },
  th: {
    border: `1px solid ${config.colors.border}`,
    padding: "10px",
    textAlign: "left",
    verticalAlign: "top",
    background: config.colors.selectedBg,
    fontWeight: 600,
  },
  td: {
    border: `1px solid ${config.colors.border}`,
    padding: "10px",
    textAlign: "left",
    verticalAlign: "top",
  },
  noot: {
    fontFamily: config.fonts.ui,
    fontSize: "0.8125rem",
    fontStyle: "italic",
    lineHeight: 1.5,
    color: config.colors.textMuted,
    margin: "0.35em 0 1em",
  },
};

/**
 * @param {{ blokken: object[], classPrefix?: string }} props
 */
export default function VerantwoordingBlokken({ blokken }) {
  return (
    <>
      {blokken.map((blok, index) => {
        switch (blok.type) {
          case "p":
            return <p key={index} style={blockStyles.p}>{blok.tekst}</p>;
          case "h2":
            return <h3 key={index} style={blockStyles.h2}>{blok.tekst}</h3>;
          case "ul":
            return (
              <ul key={index} style={blockStyles.ul}>
                {blok.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={index} style={blockStyles.ol}>
                {blok.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={index} style={blockStyles.quote}>
                {blok.tekst}
              </blockquote>
            );
          case "tabel":
            return (
              <div key={index} className="wop-table-scroll" style={blockStyles.tabelWrap}>
                <table style={blockStyles.table}>
                  <thead>
                    <tr>
                      {blok.kolommen.map((kol) => (
                        <th key={kol} style={blockStyles.th}>{kol}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {blok.rijen.map((rij, rijIndex) => (
                      <tr key={rijIndex}>
                        {rij.map((cel, celIndex) => (
                          <td key={celIndex} style={blockStyles.td}>{cel}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {blok.noot ? <p style={blockStyles.noot}>{blok.noot}</p> : null}
              </div>
            );
          case "noot":
            return <p key={index} style={blockStyles.noot}>{blok.tekst}</p>;
          default:
            return null;
        }
      })}
    </>
  );
}
