import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS } from "../../styles/tokens";

interface AmbientGridProps {
  opacity?: number;
  speed?: number; // drift speed
  spacing?: number;
  accentColor?: string;
  showTicks?: boolean;
}

export const AmbientGrid: React.FC<AmbientGridProps> = ({
  opacity = 0.12,
  speed = 0.25,
  spacing = 160,
  accentColor = COLORS.gridLine,
  showTicks = true,
}) => {
  const frame = useCurrentFrame();

  // Subtle continuous horizontal drift
  const offsetX = (frame * speed) % spacing;
  const pulse = 0.85 + Math.sin(frame / 45) * 0.15;

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
        opacity: opacity * pulse,
      }}
    >
      {/* Drifting faint grid lines */}
      <g stroke={accentColor} strokeWidth="1" strokeDasharray="3 6">
        {Array.from({ length: 14 }).map((_, i) => {
          const x = i * spacing + offsetX - spacing;
          return <line key={`v-grid-${i}`} x1={x} y1={0} x2={x} y2={1080} />;
        })}
        {Array.from({ length: 8 }).map((_, j) => {
          const y = j * spacing + 40;
          return <line key={`h-grid-${j}`} x1={0} y1={y} x2={1920} y2={y} />;
        })}
      </g>

      {/* Grid Intersections / Precision Crosses */}
      {showTicks && (
        <g stroke={COLORS.textPrimary} strokeWidth="1" opacity={0.6}>
          {Array.from({ length: 14 }).map((_, i) =>
            Array.from({ length: 8 }).map((_, j) => {
              const x = i * spacing + offsetX - spacing;
              const y = j * spacing + 40;
              return (
                <g key={`cross-${i}-${j}`}>
                  <line x1={x - 4} y1={y} x2={x + 4} y2={y} />
                  <line x1={x} y1={y - 4} x2={x} y2={y + 4} />
                </g>
              );
            })
          )}
        </g>
      )}
    </svg>
  );
};
