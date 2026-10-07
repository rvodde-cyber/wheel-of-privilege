import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Uitleg from "./pages/Uitleg.jsx";
import SelfReflection from "./pages/SelfReflection.jsx";
import TeamSurvey from "./pages/TeamSurvey.jsx";
import Onderbouwing from "./pages/Onderbouwing.jsx";
import ProjectionScreen from "./pages/ProjectionScreen.jsx";
import { config } from "./config.js";

const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { margin: 0; padding: 0; min-height: 100%; }
  body {
    font-family: ${config.fonts.ui};
    color: ${config.colors.text};
    background: ${config.colors.pageBg};
    -webkit-font-smoothing: antialiased;
  }
  a { color: inherit; }
  button:hover:not(:disabled) { filter: brightness(0.95); }
  button:active:not(:disabled) { filter: brightness(0.9); }
  .wop-landing-grid { display: flex; flex-direction: column; gap: 36px; }
  .wop-start-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 8px 0 14px;
  }
  .wop-start-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
    font-family: ${config.fonts.ui};
    font-size: 0.975rem;
    font-weight: 600;
    line-height: 1.3;
    text-decoration: none;
    text-align: center;
    color: ${config.colors.buttonText};
    background: ${config.colors.buttonBg};
    border-radius: 999px;
    padding: 12px 16px;
  }
  .wop-variant-cards { display: flex; flex-direction: column; gap: 16px; }
  .wop-uitleg-row {
    padding: 28px 0;
    border-top: 1px solid ${config.colors.border};
  }
  @media (min-width: 560px) {
    .wop-start-actions { flex-direction: row; align-items: stretch; }
    .wop-start-btn { flex: 1 1 0; width: auto; min-width: 0; }
  }
  .wop-table-scroll { max-width: 100%; }
  @media (max-width: 360px) {
    .wop-onderbouwing-main { padding-left: 16px; padding-right: 16px; }
  }
  @media (min-width: 880px) {
    .wop-landing-grid { flex-direction: row; align-items: center; gap: 56px; }
    .wop-landing-copy { flex: 1.05; min-width: 0; }
    .wop-landing-visual { flex: 0.95; min-width: 0; }
    .wop-variant-cards { flex-direction: row; align-items: stretch; }
    .wop-variant-cards > * { flex: 1; min-width: 0; }
    .wop-uitleg-row {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 40px;
      align-items: start;
    }
  }
`;

const styleEl = document.createElement("style");
styleEl.textContent = globalStyles;
document.head.appendChild(styleEl);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/uitleg" element={<Uitleg />} />
        <Route path="/onderbouwing" element={<Onderbouwing />} />
        <Route path="/individu" element={<SelfReflection />} />
        <Route path="/team/:orgCode" element={<TeamSurvey />} />
        <Route path="/scan/:orgCode" element={<ProjectionScreen />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
