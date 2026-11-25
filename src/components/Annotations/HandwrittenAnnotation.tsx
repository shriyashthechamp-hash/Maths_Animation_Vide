import React from "react";
import { COLORS, TYPOGRAPHY } from "../../styles/tokens";

interface HandwrittenAnnotationProps {
  text: string;
  x?: number;
  y?: number;
  rotation?: number;
  color?: string;
  showArrow?: boolean;
  arrowDirection?: "right" | "down" | "left" | "up";
  highlightBox?: boolean;
}

export const HandwrittenAnnotation: React.FC<HandwrittenAnnotationProps> = ({
  text,
  x = 0,
  y = 0,
  rotation = -2,
  color = COLORS.cobaltPrimary,
  showArrow = false,
  arrowDirection = "right",
  highlightBox = false,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `rotate(${rotation}deg)`,
        display: "inline-flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        gap: 8,
        padding: highlightBox ? "6px 14px" : "0",
        backgroundColor: highlightBox ? COLORS.yellowHighlight : "transparent",
        borderRadius: highlightBox ? 6 : 0,
        boxShadow: highlightBox ? "0 2px 8px rgba(255, 228, 94, 0.4)" : "none",
        pointerEvents: "none",
      }}
    >
      <span
        style={{
          fontFamily: TYPOGRAPHY.fontHandwriting,
          fontSize: 26,
          fontWeight: 700,
          color: highlightBox ? COLORS.textPrimary : color,
          letterSpacing: "0.5px",
        }}
      >
        {text}
      </span>

      {showArrow && (
        <svg width="28" height="20" viewBox="0 0 28 20" style={{ overflow: "visible" }}>
          {arrowDirection === "right" && (
            <path
              d="M 2 10 Q 14 6 24 10 M 18 4 Q 22 8 26 10 Q 20 14 17 17"
              stroke={highlightBox ? COLORS.textPrimary : color}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          )}
          {arrowDirection === "down" && (
            <path
              d="M 10 2 Q 12 12 10 20 M 4 14 Q 9 18 10 22 Q 13 17 17 14"
              stroke={highlightBox ? COLORS.textPrimary : color}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          )}
        </svg>
      )}
    </div>
  );
};
