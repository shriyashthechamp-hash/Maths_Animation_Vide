import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS } from "../../styles/tokens";

export interface FloatingShapeConfig {
  type: "circle" | "semicircle" | "rect" | "pill" | "arc";
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  opacity: number;
  driftX?: number; // max pixel horizontal drift
  driftY?: number; // max pixel vertical drift
  rotationSpeed?: number; // degrees per 100 frames
  period?: number; // frames per cycle
  phase?: number; // offset
}

interface FloatingShapesProps {
  shapes: FloatingShapeConfig[];
}

export const FloatingShapes: React.FC<FloatingShapesProps> = ({ shapes }) => {
  const frame = useCurrentFrame();

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
      <defs>
        {/* Subtle radial falloff for ambient circles */}
        <radialGradient id="ambient-radial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {shapes.map((shape, idx) => {
        const period = shape.period || 360; // 12 seconds default cycle at 30fps
        const phase = shape.phase || idx * 45;
        const driftX = shape.driftX ?? 30;
        const driftY = shape.driftY ?? 20;
        const rotSpeed = shape.rotationSpeed ?? 10;

        const currentX =
          shape.baseX + Math.sin(((frame + phase) * 2 * Math.PI) / period) * driftX;
        const currentY =
          shape.baseY + Math.cos(((frame + phase * 1.3) * 2 * Math.PI) / (period * 1.2)) * driftY;
        const currentRot = ((frame * rotSpeed) / 100) % 360;

        const r = shape.size / 2;

        return (
          <g
            key={`ambient-shape-${idx}`}
            transform={`translate(${currentX}, ${currentY}) rotate(${currentRot})`}
            opacity={shape.opacity}
          >
            {shape.type === "circle" && (
              <circle cx={0} cy={0} r={r} fill={shape.color} />
            )}

            {shape.type === "semicircle" && (
              <path
                d={`M ${-r} 0 A ${r} ${r} 0 0 1 ${r} 0 Z`}
                fill={shape.color}
              />
            )}

            {shape.type === "arc" && (
              <path
                d={`M ${-r} 0 A ${r} ${r} 0 0 1 ${r} 0`}
                fill="none"
                stroke={shape.color}
                strokeWidth={shape.size * 0.08}
                strokeDasharray="6 6"
              />
            )}

            {shape.type === "rect" && (
              <rect
                x={-r}
                y={-r * 0.6}
                width={shape.size}
                height={shape.size * 1.2}
                rx={12}
                fill={shape.color}
              />
            )}

            {shape.type === "pill" && (
              <rect
                x={-shape.size * 0.75}
                y={-shape.size * 0.25}
                width={shape.size * 1.5}
                height={shape.size * 0.5}
                rx={shape.size * 0.25}
                fill={shape.color}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};
