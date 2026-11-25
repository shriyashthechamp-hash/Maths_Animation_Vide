import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../../styles/tokens";

interface GeometricWipeProps {
  progress: number;
  direction?: "left-to-right" | "top-to-bottom" | "iris-expand";
  color?: string;
  zIndex?: number;
}

export const GeometricWipe: React.FC<GeometricWipeProps> = ({
  progress,
  direction = "left-to-right",
  color = COLORS.cobaltPrimary,
  zIndex = 100,
}) => {
  if (progress <= 0 || progress >= 1) return null;

  if (direction === "iris-expand") {
    const radius = progress * 1500;
    return (
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1920,
          height: 1080,
          pointerEvents: "none",
          zIndex,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: radius * 2,
            height: radius * 2,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
      </div>
    );
  }

  const widthPct = direction === "left-to-right" ? progress * 100 : 100;
  const heightPct = direction === "top-to-bottom" ? progress * 100 : 100;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: `${widthPct}%`,
        height: `${heightPct}%`,
        backgroundColor: color,
        zIndex,
        pointerEvents: "none",
      }}
    />
  );
};
