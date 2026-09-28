import { useMemo } from "react";
import { config, POSITIONS } from "../config.js";

const AXIS_COUNT = 11;
const CX = 200;
const CY = 200;
const RING_RADII = [52, 96, 140];
const LABEL_RADIUS = 158;
const VIEWBOX_MIN = -52;
const VIEWBOX_SIZE = 504;
const AXIS_OUTER = RING_RADII[2] + 2;

const POSITION_RING = {
  center: 0,
  middle: 1,
  periphery: 2,
};

const DOT_COLORS = [config.colors.dotStrong, config.colors.dotMid, config.colors.dotLight];

const SIZE_PRESETS = {
  default: { maxWidth: 360 },
  large: { maxWidth: "min(96vw, 620px)" },
};

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
  if (position == null || position === "unknown") return null;
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
  maxWidth,
  size = "default",
  highlightAxisIndex = null,
  ariaLabel = "Machtskruising",
  projection = false,
}) {
  const resolvedMaxWidth = maxWidth ?? SIZE_PRESETS[size]?.maxWidth ?? SIZE_PRESETS.default.maxWidth;

  const profilePoints = useMemo(() => {
    const pts = getWheelPoints(selections, axes).filter(Boolean);
    if (pts.length < 2) return "";
    return pts.map((p) => `${p.x},${p.y}`).join(" ");
  }, [selections, axes]);

  const filledPoints = profilePoints;

  const isFilled = variant === "filled";
  const isDots = variant === "dots";
  const bg = projection ? config.colors.projectionBg : config.colors.surface2;
  const guideStroke = projection ? "rgba(93, 202, 165, 0.45)" : "rgba(29, 158, 117, 0.35)";
  const axisStroke = projection ? "rgba(93, 202, 165, 0.25)" : "rgba(29, 158, 117, 0.18)";
  const axisHighlight = projection ? config.colors.projectionStroke : config.colors.dotStrong;
  const labelColor = projection ? config.colors.projectionText : config.colors.text;
  const labelMuted = projection ? "rgba(241, 245, 243, 0.55)" : config.colors.textMuted;

  const ringBands = [
    { r: RING_RADII[2], fill: projection ? "rgba(29, 158, 117, 0.08)" : "rgba(159, 225, 203, 0.22)" },
    { r: RING_RADII[1], fill: projection ? "rgba(29, 158, 117, 0.12)" : "rgba(93, 202, 165, 0.18)" },
    { r: RING_RADII[0], fill: projection ? "rgba(29, 158, 117, 0.2)" : "rgba(29, 158, 117, 0.12)" },
  ];

  return (
    <svg
      viewBox={`${VIEWBOX_MIN} ${VIEWBOX_MIN} ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
      overflow="visible"
      role="img"
      aria-label={ariaLabel}
      style={{
        width,
        maxWidth: resolvedMaxWidth,
        height: "auto",
        display: "block",
        overflow: "visible",
        filter: isDots && !projection ? "drop-shadow(0 8px 24px rgba(29, 158, 117, 0.18))" : "none",
      }}
    >
      <defs>
        <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        x={VIEWBOX_MIN}
        y={VIEWBOX_MIN}
        width={VIEWBOX_SIZE}
        height={VIEWBOX_SIZE}
        fill={bg}
        rx={isFilled || projection ? 0 : 16}
      />

      {ringBands.map((band) => (
        <circle key={band.r} cx={CX} cy={CY} r={band.r} fill={band.fill} />
      ))}

      {RING_RADII.map((r, i) => (
        <circle
          key={r}
          cx={CX}
          cy={CY}
          r={r}
          fill="none"
          stroke={guideStroke}
          strokeWidth={i === 0 ? 2 : 1.5}
          strokeDasharray={isFilled ? "none" : "6 5"}
        />
      ))}

      {Array.from({ length: AXIS_COUNT }).map((_, i) => {
        const axisId = axes[i]?.id;
        const sel = axisId != null ? selections[axisId] : undefined;
        const isAnswered = sel != null && sel !== "";
        const isActive = highlightAxisIndex === i;

        if (isActive && !isAnswered) {
          return null;
        }

        const inner = pointAt(i, RING_RADII[0]);
        const outer = pointAt(i, AXIS_OUTER);
        return (
          <line
            key={`axis-${i}`}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke={isActive ? axisHighlight : isAnswered ? "rgba(29, 158, 117, 0.35)" : axisStroke}
            strokeWidth={isActive ? 2.5 : 1.25}
          />
        );
      })}

      {isDots && profilePoints && (
        <polygon
          points={profilePoints}
          fill="rgba(29, 158, 117, 0.07)"
          stroke="rgba(29, 158, 117, 0.35)"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      )}

      {isFilled && filledPoints && (
        <polygon
          points={filledPoints}
          fill={config.colors.projectionFill}
          fillOpacity={0.55}
          stroke={config.colors.projectionStroke}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
      )}

      {axes.map((axis, i) => {
        const selection = selections[axis.id];
        if (selection == null || selection === "") return null;

        const isUnknown = selection === "unknown";
        const ring = positionToRing(selection);
        const pt = pointAt(i, isUnknown ? RING_RADII[1] : RING_RADII[ring]);
        const isActive = highlightAxisIndex === i;

        if (isUnknown) {
          return (
            <g key={`dot-${axis.id}`}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={7}
                fill="none"
                stroke={config.colors.textMuted}
                strokeWidth={2}
                strokeDasharray="3 2"
              />
              <title>niet ingeschat</title>
            </g>
          );
        }

        if (ring == null) return null;

        if (isFilled) {
          return (
            <circle
              key={`dot-${axis.id}`}
              cx={pt.x}
              cy={pt.y}
              r={6}
              fill={config.colors.projectionStroke}
              stroke={config.colors.projectionBg}
              strokeWidth={2}
            />
          );
        }

        return (
          <g key={`dot-${axis.id}`} filter={isActive ? "url(#dot-glow)" : undefined}>
            {isActive && (
              <circle cx={pt.x} cy={pt.y} r={14} fill="rgba(29, 158, 117, 0.2)" />
            )}
            <circle
              cx={pt.x}
              cy={pt.y}
              r={isActive ? 11 : 9}
              fill={DOT_COLORS[ring]}
              stroke="#FFFFFF"
              strokeWidth={3}
            />
          </g>
        );
      })}

      {axes.map((axis, i) => {
        const pt = pointAt(i, LABEL_RADIUS);
        const cos = Math.cos(axisAngle(i));
        const sin = Math.sin(axisAngle(i));
        const anchor = cos > 0.2 ? "start" : cos < -0.2 ? "end" : "middle";
        const isActive = highlightAxisIndex === i;
        const isAnswered = selections[axis.id] != null;
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
              fontSize: isActive ? 10.5 : 9.5,
              fontWeight: isActive ? 700 : isAnswered ? 600 : 500,
            }}
          >
            {axis.shortLabel || axis.label}
          </text>
        );
      })}

      <circle
        cx={CX}
        cy={CY}
        r={5}
        fill={projection ? config.colors.projectionStroke : config.colors.dotStrong}
        stroke="#FFFFFF"
        strokeWidth={2}
      />

      {!projection && (
        <>
          <text
            x={CX}
            y={CY - 18}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={config.colors.dotStrong}
            style={{ fontFamily: config.fonts.ui, fontSize: 8, fontWeight: 700, letterSpacing: "0.08em" }}
          >
            MACHT
          </text>
          <text
            x={CX}
            y={CY + RING_RADII[1]}
            textAnchor="middle"
            fill={config.colors.textMuted}
            style={{ fontFamily: config.fonts.ui, fontSize: 8, fontWeight: 500 }}
          >
            tussen
          </text>
          <text
            x={CX}
            y={CY + RING_RADII[2] - 6}
            textAnchor="middle"
            fill={config.colors.textMuted}
            style={{ fontFamily: config.fonts.ui, fontSize: 8, fontWeight: 500 }}
          >
            periferie
          </text>
        </>
      )}
    </svg>
  );
}

export { AXIS_COUNT, POSITION_RING, RING_RADII, POSITIONS, VIEWBOX_SIZE };
