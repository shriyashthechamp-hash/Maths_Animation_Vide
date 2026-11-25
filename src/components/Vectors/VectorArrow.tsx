import React from "react";
import { COLORS } from "../../styles/tokens";

interface VectorArrowProps {
  originX?: number;
  originY?: number;
  unitSize?: number;
  x: number; // mathematical x coordinate
  y: number; // mathematical y coordinate
  color?: string;
  label?: string;
  sublabel?: string;
  strokeWidth?: number;
  progress?: number; // 0 to 1 for draw-in animation
  labelPosition?: "auto" | "top" | "bottom" | "left" | "right";
}

export const VectorArrow: React.FC<VectorArrowProps> = ({
  originX = 960,
  originY = 540,
  unitSize = 120,
  x,
  y,
  color = COLORS.cobaltPrimary,
  label,
  sublabel,
  strokeWidth = 3.5,
  progress = 1,
  labelPosition = "auto",
}) => {
  // Target screen coordinates
  const targetScreenX = originX + x * unitSize * progress;
  const targetScreenY = originY - y * unitSize * progress;

  // Vector angle for arrowhead
  const dx = targetScreenX - originX;
  const dy = targetScreenY - originY;
  const length = Math.sqrt(dx * dx + dy * dy);

  if (length < 2) return null;

  const angle = Math.atan2(dy, dx);
  const headLength = 14;
  const headWidth = 8;

  // Arrowhead polygon vertices
  const p1x = targetScreenX;
  const p1y = targetScreenY;
  const p2x = targetScreenX - headLength * Math.cos(angle) + headWidth * Math.sin(angle);
  const p2y = targetScreenY - headLength * Math.sin(angle) - headWidth * Math.cos(angle);
  const p3x = targetScreenX - headLength * Math.cos(angle) - headWidth * Math.sin(angle);
  const p3y = targetScreenY - headLength * Math.sin(angle) + headWidth * Math.cos(angle);

  const pillWidth = label ? label.length * 11 + (sublabel ? sublabel.length * 9 : 0) + 14 : 0;
  let labelOffsetX = Math.cos(angle) * 16;
  let labelOffsetY = Math.sin(angle) * 16;

  if (labelPosition === "left") {
    labelOffsetX = -pillWidth - 14;
    labelOffsetY = -6;
  } else if (labelPosition === "right") {
    labelOffsetX = 16;
    labelOffsetY = -6;
  } else if (labelPosition === "top") {
    labelOffsetX = -pillWidth / 2;
    labelOffsetY = -26;
  } else if (labelPosition === "bottom") {
    labelOffsetX = -pillWidth / 2;
    labelOffsetY = 24;
  }

  return (
    <g id={`vector-${label || "arrow"}`}>
      {/* Shadow */}
      <line
        x1={originX}
        y1={originY + 2}
        x2={targetScreenX}
        y2={targetScreenY + 2}
        stroke="#111111"
        strokeOpacity="0.08"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Main Vector Shaft */}
      <line
        x1={originX}
        y1={originY}
        x2={targetScreenX}
        y2={targetScreenY}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Sharp Modern Arrowhead */}
      <polygon
        points={`${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y}`}
        fill={color}
      />

      {/* Origin Ring */}
      <circle cx={originX} cy={originY} r={strokeWidth * 0.9} fill={color} />

      {/* Label and Sublabel */}
      {label && progress > 0.4 && (
        <g
          transform={`translate(${targetScreenX + labelOffsetX}, ${
            targetScreenY + labelOffsetY
          })`}
        >
          <rect
            x="-6"
            y="-16"
            width={pillWidth}
            height="24"
            rx="4"
            fill={COLORS.background}
            fillOpacity="0.94"
            stroke={COLORS.borderLight}
            strokeWidth="1"
          />
          <text
            x="2"
            y="1"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="15"
            fontWeight="700"
            fill={color}
          >
            {label}
          </text>
          {sublabel && (
            <text
              x={label.length * 11 + 6}
              y="1"
              fontFamily="'Inter', sans-serif"
              fontSize="13"
              fill={COLORS.textMuted}
            >
              {sublabel}
            </text>
          )}
        </g>
      )}
    </g>
  );
};
