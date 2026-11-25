import React from "react";
import { COLORS } from "../../styles/tokens";

interface UnitSquareMorphProps {
  originX?: number;
  originY?: number;
  unitSize?: number;
  // Matrix transformation:
  // v1 is transformed (1, 0) -> [m00, m10]
  // v2 is transformed (0, 1) -> [m01, m11]
  m00?: number;
  m10?: number;
  m01?: number;
  m11?: number;
  progress?: number; // 0 (identity) to 1 (full transformed state)
  fillOpacity?: number;
  showAreaLabel?: boolean;
}

export const UnitSquareMorph: React.FC<UnitSquareMorphProps> = ({
  originX = 960,
  originY = 540,
  unitSize = 120,
  m00 = 1,
  m10 = 1, // for shear S, m10 = 1
  m01 = 0,
  m11 = 1,
  progress = 0,
  fillOpacity = 0.18,
  showAreaLabel = true,
}) => {
  // Interpolated matrix components between Identity [[1, 0], [0, 1]] and Target
  const currentM00 = 1 + (m00 - 1) * progress;
  const currentM10 = 0 + m10 * progress;
  const currentM01 = 0 + m01 * progress;
  const currentM11 = 1 + (m11 - 1) * progress;

  // Vertex 0: (0, 0) -> (0, 0)
  const p0 = { x: originX, y: originY };

  // Vertex 1: (1, 0) -> (m00, m10)
  const p1 = {
    x: originX + currentM00 * unitSize,
    y: originY - currentM10 * unitSize,
  };

  // Vertex 2: (1, 1) -> (m00 + m01, m10 + m11)
  const p2 = {
    x: originX + (currentM00 + currentM01) * unitSize,
    y: originY - (currentM10 + currentM11) * unitSize,
  };

  // Vertex 3: (0, 1) -> (m01, m11)
  const p3 = {
    x: originX + currentM01 * unitSize,
    y: originY - currentM11 * unitSize,
  };

  // Centroid for area badge
  const centroidX = (p0.x + p1.x + p2.x + p3.x) / 4;
  const centroidY = (p0.y + p1.y + p2.y + p3.y) / 4;

  const pointsString = `${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;

  return (
    <g id="unit-square-morph">
      {/* Translucent fill representing transformed surface area */}
      <polygon
        points={pointsString}
        fill={COLORS.cobaltPrimary}
        fillOpacity={fillOpacity}
        stroke={COLORS.cobaltPrimary}
        strokeWidth={2}
        strokeDasharray={progress === 0 ? "none" : "none"}
      />

      {/* Vertex Dots */}
      <circle cx={p0.x} cy={p0.y} r="3" fill={COLORS.cobaltPrimary} />
      <circle cx={p1.x} cy={p1.y} r="3" fill={COLORS.cobaltPrimary} />
      <circle cx={p2.x} cy={p2.y} r="3" fill={COLORS.cobaltPrimary} />
      <circle cx={p3.x} cy={p3.y} r="3" fill={COLORS.cobaltPrimary} />

      {/* Area Badge */}
      {showAreaLabel && (
        <g transform={`translate(${centroidX - 32}, ${centroidY - 12})`}>
          <rect
            width="64"
            height="24"
            rx="4"
            fill={COLORS.background}
            stroke={COLORS.borderLight}
            strokeWidth="1"
          />
          <text
            x="32"
            y="16"
            textAnchor="middle"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="12"
            fontWeight="600"
            fill={COLORS.cobaltPrimary}
          >
            Area = 1
          </text>
        </g>
      )}
    </g>
  );
};
