import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelfReflection from "./pages/SelfReflection.jsx";
import TeamSurvey from "./pages/TeamSurvey.jsx";
import ProjectionScreen from "./pages/ProjectionScreen.jsx";
import { config } from "./config.js";

const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { margin: 0; padding: 0; min-height: 100%; }
  body {
    font-family: ${config.fonts.ui};
    color: ${config.colors.text};
    background: ${config.colors.surface2};
    -webkit-font-smoothing: antialiased;
  }
  button:hover:not(:disabled) { filter: brightness(0.95); }
  button:active:not(:disabled) { filter: brightness(0.9); }
`;

const styleEl = document.createElement("style");
styleEl.textContent = globalStyles;
document.head.appendChild(styleEl);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelfReflection />} />
        <Route path="/team/:orgCode" element={<TeamSurvey />} />
        <Route path="/scan/:orgCode" element={<ProjectionScreen />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
