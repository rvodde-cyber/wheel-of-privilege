import { useEffect, useMemo, useState } from "react";
import { config, POSITIONS } from "../config.js";

const AXIS_COUNT = 11;
const CX = 200;
const CY = 200;
const WHEEL_R = 140;

/** Ringgrenzen: centrum 0–35%, tussen 35–67,5%, periferie 67,5–100% */
const RING_BOUNDARY_FRAC = [0.35, 0.675, 1];
const RING_RADII = RING_BOUNDARY_FRAC.map((f) => WHEEL_R * f);

/** Stippen midden in de band */
const DOT_FRAC = [0.21, 0.51, 0.84];
const DOT_RADII = DOT_FRAC.map((f) => WHEEL_R * f);

const LABEL_RADIUS = WHEEL_R + 22;
const VIEWBOX_MIN = -76;
const VIEWBOX_SIZE = 552;

const POSITION_RING = {
  center: 0,
  middle: 1,
  periphery: 2,
};

const SIZE_PRESETS = {
  mini: { maxWidth: 200, dotR: 5 },
  default: { maxWidth: 360, dotR: 5 },
  large: { maxWidth: "min(96vw, 620px)", dotR: 7 },
};

const ACCENT = config.colors.dotStrong;

function axisAngle(index) {
  return -Math.PI / 2 + (index * 2 * Math.PI) / AXIS_COUNT;
}

function pointAt(index, radius) {
  const a = axisAngle(index);
  return {
    x: CX + radius * Math.cos(a),
    y: CY + radius * Math.sin(a),
  };
}

function diamondPoints(x, y, r) {
  return `${x},${y - r} ${x + r},${y} ${x},${y + r} ${x - r},${y}`;
}

function positionToRing(position) {
  if (position == null || position === "unknown") return null;
  return POSITION_RING[position] ?? null;
}

function positionLabel(selection) {
  if (selection == null || selection === "") return null;
  if (selection === "unknown") return "Niet ingeschat";
  return POSITIONS[selection]?.label ?? selection;
}

/** Gesloten polygoon; unknown/null overslaan en buren verbinden */
export function getWheelPoints(selections, axes) {
  const pts = [];
  for (let i = 0; i < axes.length; i++) {
    const ring = positionToRing(selections[axes[i].id]);
    if (ring == null) continue;
    pts.push(pointAt(i, DOT_RADII[ring]));
  }
  return pts;
}

function polygonPointsString(pts) {
  if (pts.length < 2) return "";
  return pts.map((p) => `${p.x},${p.y}`).join(" ");
}

function buildAccessibleDesc(selections, axes) {
  const counts = { center: 0, middle: 0, periphery: 0, unknown: 0 };
  const details = [];
  for (const axis of axes) {
    const sel = selections[axis.id];
    if (sel == null || sel === "") continue;
    if (sel === "unknown") {
      counts.unknown += 1;
      continue;
    }
    if (counts[sel] != null) counts[sel] += 1;
    const label = axis.shortLabel || axis.label;
    const pos = positionLabel(sel);
    if (pos) details.push(`${label}: ${pos}`);
  }
  const parts = [];
  if (counts.center) parts.push(`dicht bij het machtscentrum op ${counts.center} assen`);
  if (counts.middle) parts.push(`tussenpositie op ${counts.middle} assen`);
  if (counts.periphery) parts.push(`periferie op ${counts.periphery} assen`);
  if (counts.unknown) parts.push(`${counts.unknown} niet ingeschat`);
  const summary = parts.length ? parts.join(", ") : "nog geen posities ingevuld";
  return { summary, details };
}

function WheelLegend({ layered, layers, dotLabel, forPrint }) {
  const ringItems = [
    { key: "center", label: "Machtscentrum", opacity: 0.14, border: false },
    { key: "middle", label: "Tussen", opacity: 0.09, border: false },
    { key: "periphery", label: "Periferie", opacity: 0.07, border: true },
  ];

  return (
    <div
      className="wop-wheel-legend"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, auto))",
        gap: forPrint ? "8px 16px" : "10px 18px",
        justifyContent: "center",
        alignItems: "center",
        marginTop: forPrint ? 10 : 12,
        padding: "0 8px 4px",
        maxWidth: 560,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {ringItems.map((item) => (
        <span
          key={item.key}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: config.fonts.ui,
            fontSize: forPrint ? "9pt" : "0.8125rem",
            color: config.colors.text,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 14,
              height: 14,
              borderRadius: 2,
              background: ACCENT,
              opacity: item.opacity,
              border: item.border ? `1px solid ${config.colors.border}` : "none",
              boxSizing: "border-box",
              flexShrink: 0,
            }}
          />
          {item.label}
        </span>
      ))}
      {layered && layers?.length >= 2 ? (
        <span
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
          }}
        >
          {layers.map((layer) => (
            <span
              key={`legend-${layer.id}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: config.fonts.ui,
                fontSize: forPrint ? "9pt" : "0.8125rem",
                color: config.colors.text,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 3,
                  background: layer.fill,
                  border: `2px ${layer.dash ? "dashed" : "solid"} ${layer.stroke}`,
                  boxSizing: "border-box",
                }}
              />
              {layer.label}
            </span>
          ))}
        </span>
      ) : (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: config.fonts.ui,
            fontSize: forPrint ? "9pt" : "0.8125rem",
            color: config.colors.text,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: ACCENT,
              border: `2px solid ${config.colors.pageBg}`,
              boxSizing: "border-box",
            }}
          />
          {dotLabel}
        </span>
      )}
    </div>
  );
}

export default function PowerWheel({
  variant = "dots",
  selections = {},
  axes = [],
  width = "100%",
  maxWidth,
  size = "default",
  highlightAxisIndex = null,
  ariaLabel = "Machtskruising",
  projection = false,
  layers = null,
  showLegend = true,
  legendDotLabel = "Jouw positie",
  animateEntrance = false,
  forPrint = false,
}) {
  const resolvedMaxWidth = maxWidth ?? SIZE_PRESETS[size]?.maxWidth ?? SIZE_PRESETS.default.maxWidth;
  const dotR = SIZE_PRESETS[size]?.dotR ?? SIZE_PRESETS.default.dotR;
  const layered = Array.isArray(layers) && layers.length > 0;
  const isMini = size === "mini";
  const showLegendResolved = showLegend && !isMini;

  const [motionOk, setMotionOk] = useState(false);
  const [entered, setEntered] = useState(!animateEntrance);

  useEffect(() => {
    if (!animateEntrance || forPrint) {
      setMotionOk(false);
      setEntered(true);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      setMotionOk(false);
      setEntered(true);
      return;
    }
    setEntered(false);
    setMotionOk(true);
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [animateEntrance, forPrint]);

  const transition = motionOk ? "transform 600ms ease-out, opacity 600ms ease-out" : undefined;

  function selectionOnAxis(axisId) {
    if (layered) {
      for (const layer of layers) {
        const sel = layer.selections?.[axisId];
        if (sel != null && sel !== "") return sel;
      }
      return undefined;
    }
    return selections[axisId];
  }

  const profilePts = useMemo(() => getWheelPoints(selections, axes), [selections, axes]);
  const profilePoints = polygonPointsString(profilePts);

  const a11y = useMemo(() => buildAccessibleDesc(selections, axes), [selections, axes]);
  const titleId = "wop-wheel-title";
  const descId = "wop-wheel-desc";

  const isFilled = variant === "filled";
  const isDots = variant === "dots";
  const bg = projection ? config.colors.projectionBg : config.colors.surface2;
  const guideStroke = projection ? "rgba(93, 202, 165, 0.35)" : `rgba(29, 158, 117, 0.35)`;
  const axisStroke = projection ? "rgba(93, 202, 165, 0.25)" : "rgba(29, 158, 117, 0.18)";
  const axisHighlight = projection ? config.colors.projectionStroke : ACCENT;
  const labelColor = projection ? config.colors.projectionText : config.colors.text;
  const labelMuted = projection ? "rgba(241, 245, 243, 0.55)" : config.colors.textMuted;
  const dotStroke = projection ? config.colors.projectionBg : config.colors.pageBg;

  const ringFills = [
    { r: RING_RADII[2], opacity: 0.07 },
    { r: RING_RADII[1], opacity: 0.09 },
    { r: RING_RADII[0], opacity: 0.14 },
  ];

  function motionTransform(pt) {
    if (!motionOk || entered) return undefined;
    return `translate(${CX - pt.x} ${CY - pt.y})`;
  }

  function renderPolygon(pointsStr, fill, fillOpacity, stroke, strokeWidth, dash) {
    if (!pointsStr) return null;
    return (
      <g style={{ opacity: entered ? 1 : 0, transition: motionOk ? "opacity 600ms ease-out" : undefined }}>
        <polygon
          points={pointsStr}
          fill={fill}
          fillOpacity={fillOpacity}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={dash || undefined}
          strokeLinejoin="round"
        />
      </g>
    );
  }

  const svg = (
    <>
      {!forPrint && (
        <style>
          {`@media (max-width: 560px) {
            .wop-wheel-legend { grid-template-columns: repeat(2, minmax(0, auto)) !important; }
          }`}
        </style>
      )}
      <svg
        viewBox={`${VIEWBOX_MIN} ${VIEWBOX_MIN} ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        overflow="visible"
        role="img"
        aria-labelledby={titleId}
        aria-describedby={descId}
        style={{
          width,
          maxWidth: resolvedMaxWidth,
          height: "auto",
          display: "block",
          overflow: "visible",
          filter: isDots && !projection ? "drop-shadow(0 8px 24px rgba(29, 158, 117, 0.18))" : "none",
        }}
      >
        <title id={titleId}>{`${ariaLabel}: ${a11y.summary}`}</title>
        <desc id={descId}>
          {ariaLabel}: {a11y.summary}.
        </desc>

        <rect
          x={VIEWBOX_MIN}
          y={VIEWBOX_MIN}
          width={VIEWBOX_SIZE}
          height={VIEWBOX_SIZE}
          fill={bg}
          rx={isFilled || projection ? 0 : 16}
        />

        {ringFills.map((band) => (
          <circle
            key={band.r}
            cx={CX}
            cy={CY}
            r={band.r}
            fill={projection ? config.colors.projectionFill : ACCENT}
            fillOpacity={projection ? band.opacity * 1.2 : band.opacity}
          />
        ))}

        {RING_RADII.map((r) => (
          <circle
            key={`ring-${r}`}
            cx={CX}
            cy={CY}
            r={r}
            fill="none"
            stroke={guideStroke}
            strokeWidth={0.5}
          />
        ))}

        {Array.from({ length: AXIS_COUNT }).map((_, i) => {
          const axisId = axes[i]?.id;
          const sel = axisId != null ? selectionOnAxis(axisId) : undefined;
          const isAnswered = sel != null && sel !== "";
          const isActive = highlightAxisIndex === i;

          if (isActive && !isAnswered) return null;

          const outer = pointAt(i, WHEEL_R);
          return (
            <line
              key={`axis-${i}`}
              x1={CX}
              y1={CY}
              x2={outer.x}
              y2={outer.y}
              stroke={isActive ? axisHighlight : isAnswered ? "rgba(29, 158, 117, 0.35)" : axisStroke}
              strokeWidth={isActive ? 2.5 : 1.25}
            />
          );
        })}

        {layered &&
          layers.map((layer) => {
            const pts = getWheelPoints(layer.selections || {}, axes);
            const ptsStr = polygonPointsString(pts);
            if (!ptsStr) return null;
            return renderPolygon(
              ptsStr,
              layer.fill,
              layer.fillOpacity,
              layer.stroke,
              1.5,
              layer.dash
            );
          })}

        {!layered &&
          (isDots || isFilled) &&
          profilePoints &&
          renderPolygon(
            profilePoints,
            isFilled && projection ? config.colors.projectionFill : ACCENT,
            isFilled && projection ? 0.55 : 0.22,
            isFilled && projection ? config.colors.projectionStroke : ACCENT,
            1.5
          )}

        {layered &&
          layers.map((layer) =>
            axes.map((axis, i) => {
              const ring = positionToRing(layer.selections?.[axis.id]);
              if (ring == null) return null;
              const pt = pointAt(i, DOT_RADII[ring]);
              const isDiamond = Boolean(layer.dash);
              const isActive = highlightAxisIndex === i;
              const r = isActive ? dotR + 1 : dotR;
              const posLabel = positionLabel(layer.selections?.[axis.id]);
              const axisName = axis.shortLabel || axis.label;

              return (
                <g
                  key={`dot-${layer.id}-${axis.id}`}
                  style={{ transform: motionTransform(pt), transition, opacity: entered ? 1 : 0 }}
                >
                  {isDiamond ? (
                    <polygon
                      points={diamondPoints(pt.x, pt.y, r)}
                      fill={layer.stroke}
                      stroke={dotStroke}
                      strokeWidth={2}
                    />
                  ) : (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={r}
                      fill={layer.stroke}
                      stroke={dotStroke}
                      strokeWidth={2}
                    />
                  )}
                  <title>{`${axisName}: ${posLabel}`}</title>
                </g>
              );
            })
          )}

        {!layered &&
          axes.map((axis, i) => {
            const selection = selections[axis.id];
            if (selection == null || selection === "") return null;

            const isUnknown = selection === "unknown";
            const ring = positionToRing(selection);
            const pt = pointAt(i, isUnknown ? DOT_RADII[1] : DOT_RADII[ring]);
            const isActive = highlightAxisIndex === i;
            const r = isActive ? dotR + 1 : dotR;
            const axisName = axis.shortLabel || axis.label;
            const posLabel = positionLabel(selection);

            if (isUnknown) {
              return (
                <g key={`dot-${axis.id}`}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={r}
                    fill="none"
                    stroke={config.colors.textMuted}
                    strokeWidth={2}
                    strokeDasharray="3 2"
                  />
                  <title>{`${axisName}: Niet ingeschat`}</title>
                </g>
              );
            }

            if (ring == null) return null;

            return (
              <g
                key={`dot-${axis.id}`}
                style={{ transform: motionTransform(pt), transition, opacity: entered ? 1 : 0 }}
              >
                {isActive && (
                  <circle cx={pt.x} cy={pt.y} r={r + 6} fill="rgba(29, 158, 117, 0.2)" />
                )}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={r}
                  fill={projection ? config.colors.projectionStroke : ACCENT}
                  stroke={dotStroke}
                  strokeWidth={2}
                />
                <title>{`${axisName}: ${posLabel}`}</title>
              </g>
            );
          })}

        {axes.map((axis, i) => {
          const pt = pointAt(i, LABEL_RADIUS);
          const cos = Math.cos(axisAngle(i));
          const sin = Math.sin(axisAngle(i));
          const anchor = cos > 0.2 ? "start" : cos < -0.2 ? "end" : "middle";
          const isActive = highlightAxisIndex === i;
          const isAnswered = selectionOnAxis(axis.id) != null;
          const labelOffset = 4;
          const lx = pt.x + (anchor === "start" ? labelOffset : anchor === "end" ? -labelOffset : 0);
          const ly = pt.y + (sin < -0.85 ? -4 : sin > 0.85 ? 4 : 0);

          return (
            <text
              key={`label-${axis.id}`}
              x={lx}
              y={ly}
              textAnchor={anchor}
              dominantBaseline="middle"
              fill={isActive ? labelColor : isAnswered ? labelColor : labelMuted}
              style={{
                fontFamily: config.fonts.ui,
                fontSize: 12,
                fontWeight: isActive ? 700 : isAnswered ? 600 : 500,
              }}
            >
              {axis.shortLabel || axis.label}
            </text>
          );
        })}
      </svg>
    </>
  );

  if (!showLegendResolved) {
    return (
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {svg}
      </div>
    );
  }

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {svg}
      <WheelLegend
        layered={Boolean(layered && layers.length >= 2)}
        layers={layered && layers.length >= 2 ? layers : null}
        dotLabel={legendDotLabel}
        forPrint={forPrint}
      />
    </div>
  );
}

export { AXIS_COUNT, POSITION_RING, RING_RADII, DOT_RADII, POSITIONS, VIEWBOX_SIZE };
