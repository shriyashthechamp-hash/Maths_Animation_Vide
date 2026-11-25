import React from "react";
import { COLORS } from "../../styles/tokens";

interface CrosshairProps {
  x: number;
  y: number;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const Crosshair: React.FC<CrosshairProps> = ({
  x,
  y,
  size = 12,
  color = COLORS.gridLine,
  strokeWidth = 1.5,
}) => (
  <g transform={`translate(${x}, ${y})`}>
    <line x1={-size / 2} y1={0} x2={size / 2} y2={0} stroke={color} strokeWidth={strokeWidth} />
    <line x1={0} y1={-size / 2} x2={0} y2={size / 2} stroke={color} strokeWidth={strokeWidth} />
  </g>
);

interface CropMarksProps {
  x: number;
  y: number;
  width: number;
  height: number;
  size?: number;
  color?: string;
}

export const CropMarks: React.FC<CropMarksProps> = ({
  x,
  y,
  width,
  height,
  size = 16,
  color = COLORS.borderLight,
}) => (
  <g stroke={color} strokeWidth="1.5" fill="none">
    {/* Top-Left */}
    <path d={`M ${x - size} ${y} L ${x} ${y} L ${x} ${y - size}`} />
    {/* Top-Right */}
    <path d={`M ${x + width + size} ${y} L ${x + width} ${y} L ${x + width} ${y - size}`} />
    {/* Bottom-Left */}
    <path d={`M ${x - size} ${y + height} L ${x} ${y + height} L ${x} ${y + height + size}`} />
    {/* Bottom-Right */}
    <path d={`M ${x + width + size} ${y + height} L ${x + width} ${y + height} L ${x + width} ${y + height + size}`} />
  </g>
);

interface GeometricAccentsProps {
  theme?: "light" | "dark" | "cobalt";
  gridOpacity?: number;
  showBleedCircle?: boolean;
  circleColor?: string;
  circleRadius?: number;
  circleX?: number;
  circleY?: number;
}

export const GeometricAccents: React.FC<GeometricAccentsProps> = ({
  theme = "light",
  gridOpacity = 0.35,
  showBleedCircle = true,
  circleColor = COLORS.cobaltUltraLight,
  circleRadius = 420,
  circleX = 1750,
  circleY = 820,
}) => {
  const crossColor =
    theme === "light"
      ? COLORS.gridLine
      : theme === "dark"
      ? "#2A2A2A"
      : "rgba(255, 255, 255, 0.18)";

  return (
    <svg
      width="1920"
      height="1080"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {/* Editorial Giant Bleed Circle */}
      {showBleedCircle && (
        <circle
          cx={circleX}
          cy={circleY}
          r={circleRadius}
          fill={circleColor}
          opacity={0.85}
        />
      )}

      {/* Swiss Precision Grid Crosses */}
      <g opacity={gridOpacity}>
        {[120, 480, 840, 1200, 1560, 1820].map((x) =>
          [100, 320, 540, 760, 980].map((y) => (
            <Crosshair key={`cross-${x}-${y}`} x={x} y={y} size={14} color={crossColor} />
          ))
        )}
      </g>

      {/* Editorial Frame Rule Lines */}
      <line x1={96} y1={52} x2={1824} y2={52} stroke={crossColor} strokeWidth="1" strokeDasharray="4 6" />
      <line x1={96} y1={1028} x2={1824} y2={1028} stroke={crossColor} strokeWidth="1" strokeDasharray="4 6" />
      <line x1={72} y1={72} x2={72} y2={1008} stroke={crossColor} strokeWidth="1" strokeDasharray="4 6" />
      <line x1={1848} y1={72} x2={1848} y2={1008} stroke={crossColor} strokeWidth="1" strokeDasharray="4 6" />
    </svg>
  );
};

export const BauhausAccentStrip: React.FC<{
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  orientation?: "horizontal" | "vertical";
}> = ({ x = 96, y = 140, width = 360, height = 6 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      height,
      display: "flex",
      gap: 0,
      borderRadius: 3,
      overflow: "hidden",
      zIndex: 5,
    }}
  >
    <div style={{ flex: 3, backgroundColor: COLORS.cobaltPrimary }} />
    <div style={{ flex: 1.5, backgroundColor: COLORS.yellowHighlight }} />
    <div style={{ flex: 2, backgroundColor: COLORS.coralAccent }} />
  </div>
);

