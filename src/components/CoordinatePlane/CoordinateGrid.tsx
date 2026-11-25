import React from "react";
import { COLORS } from "../../styles/tokens";

interface CoordinateGridProps {
  originX?: number;
  originY?: number;
  unitSize?: number; // pixels per mathematical unit
  rangeX?: [number, number];
  rangeY?: [number, number];
  shearProgress?: number; // 0 to 1 for vertical shear by S = [[1, 0], [1, 1]]
  opacity?: number;
}

export const CoordinateGrid: React.FC<CoordinateGridProps> = ({
  originX = 960,
  originY = 540,
  unitSize = 120,
  rangeX = [-5, 5],
  rangeY = [-3, 3],
  shearProgress = 0,
  opacity = 1,
}) => {
  const [minX, maxX] = rangeX;
  const [minY, maxY] = rangeY;

  // Grid lines
  const verticalLines = [];
  for (let x = minX; x <= maxX; x++) {
    verticalLines.push(x);
  }

  const horizontalLines = [];
  for (let y = minY; y <= maxY; y++) {
    horizontalLines.push(y);
  }

  return (
    <g id="coordinate-grid" opacity={opacity}>
      {/* Background Secondary Grid Lines */}
      {horizontalLines.map((y) => {
        // Under shear: y' = y + shearProgress * x
        // For horizontal line at y: from (minX, y) to (maxX, y)
        const x1 = originX + minX * unitSize;
        const y1 = originY - (y + shearProgress * minX) * unitSize;
        const x2 = originX + maxX * unitSize;
        const y2 = originY - (y + shearProgress * maxX) * unitSize;

        return (
          <line
            key={`h-${y}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={y === 0 ? "none" : COLORS.gridLine}
            strokeWidth={1}
            strokeDasharray={y % 2 === 0 ? "none" : "4 4"}
          />
        );
      })}

      {verticalLines.map((x) => {
        // Under vertical shear, vertical lines stay vertical!
        // At coordinate x: from (x, minY) to (x, maxY)
        // y' = y + shearProgress * x
        const xPos = originX + x * unitSize;
        const y1 = originY - (minY + shearProgress * x) * unitSize;
        const y2 = originY - (maxY + shearProgress * x) * unitSize;

        return (
          <line
            key={`v-${x}`}
            x1={xPos}
            y1={y1}
            x2={xPos}
            y2={y2}
            stroke={x === 0 ? "none" : COLORS.gridLine}
            strokeWidth={1}
            strokeDasharray={x % 2 === 0 ? "none" : "4 4"}
          />
        );
      })}

      {/* Primary Axes */}
      {/* X Axis */}
      <line
        x1={originX + minX * unitSize}
        y1={originY - shearProgress * minX * unitSize}
        x2={originX + maxX * unitSize}
        y2={originY - shearProgress * maxX * unitSize}
        stroke={COLORS.gridAxis}
        strokeWidth={2}
      />
      {/* Y Axis (stays vertical because x=0) */}
      <line
        x1={originX}
        y1={originY - minY * unitSize}
        x2={originX}
        y2={originY - maxY * unitSize}
        stroke={COLORS.gridAxis}
        strokeWidth={2}
      />

      {/* Axis Arrows */}
      <polygon
        points={`${originX + maxX * unitSize + 8},${originY - shearProgress * maxX * unitSize} ${originX + maxX * unitSize - 4},${originY - shearProgress * maxX * unitSize - 5} ${originX + maxX * unitSize - 4},${originY - shearProgress * maxX * unitSize + 5}`}
        fill={COLORS.gridAxis}
      />
      <polygon
        points={`${originX},${originY - maxY * unitSize - 8} ${originX - 5},${originY - maxY * unitSize + 4} ${originX + 5},${originY - maxY * unitSize + 4}`}
        fill={COLORS.gridAxis}
      />

      {/* Axis Labels */}
      <text
        x={originX + maxX * unitSize + 16}
        y={originY - shearProgress * maxX * unitSize + 5}
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="16"
        fontWeight="600"
        fill={COLORS.textPrimary}
      >
        x
      </text>
      <text
        x={originX - 18}
        y={originY - maxY * unitSize - 12}
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="16"
        fontWeight="600"
        fill={COLORS.textPrimary}
      >
        y
      </text>

      {/* Origin Point */}
      <circle cx={originX} cy={originY} r="4" fill={COLORS.gridAxis} />
      <text
        x={originX - 16}
        y={originY + 20}
        fontFamily="'Inter', sans-serif"
        fontSize="14"
        fill={COLORS.textMuted}
      >
        (0,0)
      </text>
    </g>
  );
};
