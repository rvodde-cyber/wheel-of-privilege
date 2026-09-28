import { Link, useLocation } from "react-router-dom";
import { config } from "../config.js";

function LogoMark() {
  const color = config.colors.dotStrong;
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="12" fill="none" stroke={color} strokeWidth="1.6" />
      <circle cx="14" cy="14" r="8" fill="none" stroke={color} strokeWidth="1.6" />
      <circle cx="14" cy="14" r="3.2" fill={color} />
    </svg>
  );
}

export default function SiteNav() {
  const { pathname } = useLocation();
  const onUitleg = pathname === "/uitleg";

  return (
    <header style={styles.bar}>
      <div style={styles.inner}>
        <Link to="/" style={styles.brand}>
          <LogoMark />
          <span style={styles.brandName}>Machtskruising</span>
        </Link>
        <div style={styles.segment} role="navigation" aria-label="Pagina">
          <Link to="/" style={segmentStyle(!onUitleg)} aria-current={!onUitleg ? "page" : undefined}>
            Start
          </Link>
          <Link to="/uitleg" style={segmentStyle(onUitleg)} aria-current={onUitleg ? "page" : undefined}>
            Uitleg
          </Link>
        </div>
      </div>
    </header>
  );
}

export function StartActions() {
  return (
    <div className="wop-start-actions">
      <Link to="/individu" className="wop-start-btn">
        Reflecteer op jezelf →
      </Link>
      <Link to="/team/demo" className="wop-start-btn">
        Scan je organisatie →
      </Link>
    </div>
  );
}

function segmentStyle(active) {
  return {
    fontFamily: config.fonts.ui,
    fontSize: "0.875rem",
    fontWeight: 600,
    textDecoration: "none",
    padding: "7px 14px",
    borderRadius: 999,
    color: active ? config.colors.buttonText : config.colors.text,
    background: active ? config.colors.buttonBg : "transparent",
  };
}

const styles = {
  bar: {
    background: config.colors.pageBg,
  },
  inner: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  brand: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    color: config.colors.text,
  },
  brandName: {
    fontFamily: config.fonts.ui,
    fontSize: "1rem",
    fontWeight: 700,
  },
  segment: {
    display: "inline-flex",
    padding: 3,
    borderRadius: 999,
    border: `1px solid ${config.colors.border}`,
    background: config.colors.surface,
  },
};
