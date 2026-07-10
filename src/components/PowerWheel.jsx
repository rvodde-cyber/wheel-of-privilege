import { useMemo } from "react";
import { config, POSITIONS } from "../config.js";

const AXIS_COUNT = 11;
const CX = 200;
const CY = 200;
const RING_RADII = [48, 88, 128];
const LABEL_RADIUS = 158;

const POSITION_RING = {
  center: 0,
  middle: 1,
  periphery: 2,
};

const DOT_COLORS = [config.colors.dotStrong, config.colors.dotMid, config.colors.dotLight];

function axisAngle(index) {
  return (-Math.PI / 2) + (index * 2 * Math.PI) / AXIS_COUNT;
}

function pointAt(index, radius) {
  const a = axisAngle(index);
  return {
    x: CX + radius * Math.cos(a),
    y: CY + radius * Math.sin(a),
  };
}

function positionToRing(position) {
  if (position == null) return null;
  return POSITION_RING[position] ?? null;
}

export function getWheelPoints(selections, axes) {
  return axes.map((axis, index) => {
    const ring = positionToRing(selections[axis.id]);
    if (ring == null) return null;
    return pointAt(index, RING_RADII[ring]);
  });
}

export default function PowerWheel({
  variant = "dots",
  selections = {},
  axes = [],
  width = "100%",
  maxWidth = 360,
  ariaLabel = "Machtswiel",
  projection = false,
}) {
  const filledPoints = useMemo(() => {
    const pts = getWheelPoints(selections, axes).filter(Boolean);
    if (pts.length < 3) return "";
    return pts.map((p) => `${p.x},${p.y}`).join(" ");
  }, [selections, axes]);

  const isFilled = variant === "filled";
  const bg = projection ? config.colors.projectionBg : config.colors.surface2;
  const guideStroke = projection ? "rgba(93, 202, 165, 0.25)" : config.colors.border;
  const axisStroke = projection ? "rgba(93, 202, 165, 0.2)" : "#E8F0ED";
  const labelColor = projection ? config.colors.projectionText : config.colors.textMuted;

  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label={ariaLabel}
      style={{ width, maxWidth, height: "auto", display: "block" }}
    >
      <rect width="400" height="400" fill={bg} rx={isFilled || projection ? 0 : 12} />

      {RING_RADII.map((r) => (
        <circle
          key={r}
          cx={CX}
          cy={CY}
          r={r}
          fill="none"
          stroke={guideStroke}
          strokeWidth={1}
          strokeDasharray={isFilled ? "none" : "4 4"}
        />
      ))}

      {Array.from({ length: AXIS_COUNT }).map((_, i) => {
        const outer = pointAt(i, RING_RADII[2] + 6);
        return (
          <line
            key={`axis-${i}`}
            x1={CX}
            y1={CY}
            x2={outer.x}
            y2={outer.y}
            stroke={axisStroke}
            strokeWidth={1}
          />
        );
      })}

      {isFilled && filledPoints && (
        <polygon
          points={filledPoints}
          fill={config.colors.projectionFill}
          fillOpacity={0.55}
          stroke={config.colors.projectionStroke}
          strokeWidth={2}
          strokeLinejoin="round"
        />
      )}

      {axes.map((axis, i) => {
        const ring = positionToRing(selections[axis.id]);
        if (ring == null) return null;
        const pt = pointAt(i, RING_RADII[ring]);

        if (isFilled) {
          return (
            <circle
              key={`dot-${axis.id}`}
              cx={pt.x}
              cy={pt.y}
              r={5}
              fill={config.colors.projectionStroke}
              stroke={config.colors.projectionBg}
              strokeWidth={1.5}
            />
          );
        }

        return (
          <circle
            key={`dot-${axis.id}`}
            cx={pt.x}
            cy={pt.y}
            r={7}
            fill={DOT_COLORS[ring]}
            stroke="#FFFFFF"
            strokeWidth={2}
          />
        );
      })}

      {axes.map((axis, i) => {
        const pt = pointAt(i, LABEL_RADIUS);
        const anchor = Math.cos(axisAngle(i)) > 0.15 ? "start" : Math.cos(axisAngle(i)) < -0.15 ? "end" : "middle";
        return (
          <text
            key={`label-${axis.id}`}
            x={pt.x}
            y={pt.y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fill={labelColor}
            style={{
              fontFamily: config.fonts.ui,
              fontSize: 9,
              fontWeight: 500,
            }}
          >
            {axis.shortLabel || axis.label}
          </text>
        );
      })}

      <circle cx={CX} cy={CY} r={3} fill={projection ? config.colors.projectionStroke : config.colors.dotMid} />

      {!projection && (
        <text
          x={CX}
          y={CY + RING_RADII[0] - 14}
          textAnchor="middle"
          fill={config.colors.textMuted}
          style={{ fontFamily: config.fonts.ui, fontSize: 8 }}
        >
          macht
        </text>
      )}
    </svg>
  );
}

export { AXIS_COUNT, POSITION_RING, RING_RADII, POSITIONS };
