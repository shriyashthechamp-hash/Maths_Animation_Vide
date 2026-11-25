import React from "react";
import { COLORS, TYPOGRAPHY } from "../../styles/tokens";

interface MatrixDisplayProps {
  label?: string; // e.g. "S ="
  matrix: [[number | string, number | string], [number | string, number | string]];
  highlightColumn?: 0 | 1 | null; // 0 for col 1 (e1), 1 for col 2 (e2)
  columnLabels?: [string, string]; // e.g. ["T(e1)", "T(e2)"]
  size?: "medium" | "large";
}

export const MatrixDisplay: React.FC<MatrixDisplayProps> = ({
  label = "S =",
  matrix,
  highlightColumn = null,
  columnLabels,
  size = "medium",
}) => {
  const isLarge = size === "large";
  const fontSize = isLarge ? 32 : 24;
  const colWidth = isLarge ? 48 : 38;
  const bracketHeight = isLarge ? 88 : 72;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 24px",
        backgroundColor: COLORS.background,
        borderRadius: 12,
        border: `1px solid ${COLORS.borderLight}`,
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* Matrix Name / Label */}
      {label && (
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontTitle,
            fontSize,
            fontWeight: 700,
            color: COLORS.textPrimary,
          }}
        >
          {label}
        </span>
      )}

      {/* Matrix Bracket Container */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Optional Column Header Labels */}
        {columnLabels && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontFamily: TYPOGRAPHY.fontTitle,
                fontSize: 12,
                fontWeight: 600,
                color: highlightColumn === 0 ? COLORS.cobaltPrimary : COLORS.textMuted,
              }}
            >
              {columnLabels[0]}
            </span>
            <span
              style={{
                fontFamily: TYPOGRAPHY.fontTitle,
                fontSize: 12,
                fontWeight: 600,
                color: highlightColumn === 1 ? COLORS.coralAccent : COLORS.textMuted,
              }}
            >
              {columnLabels[1]}
            </span>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Left Bracket */}
          <svg width="12" height={bracketHeight} viewBox={`0 0 12 ${bracketHeight}`}>
            <path
              d={`M 10 2 L 2 2 L 2 ${bracketHeight - 2} L 10 ${bracketHeight - 2}`}
              fill="none"
              stroke={COLORS.textPrimary}
              strokeWidth="2.5"
            />
          </svg>

          {/* Column 1 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              width: colWidth,
              height: bracketHeight - 16,
              borderRadius: 6,
              backgroundColor:
                highlightColumn === 0 ? "rgba(49, 92, 186, 0.12)" : "transparent",
              transition: "background-color 0.2s ease",
            }}
          >
            <span
              style={{
                fontFamily: TYPOGRAPHY.fontTitle,
                fontSize,
                fontWeight: 600,
                color: highlightColumn === 0 ? COLORS.cobaltPrimary : COLORS.textPrimary,
              }}
            >
              {matrix[0][0]}
            </span>
            <span
              style={{
                fontFamily: TYPOGRAPHY.fontTitle,
                fontSize,
                fontWeight: 600,
                color: highlightColumn === 0 ? COLORS.cobaltPrimary : COLORS.textPrimary,
              }}
            >
              {matrix[1][0]}
            </span>
          </div>

          {/* Spacer */}
          <div style={{ width: 8 }} />

          {/* Column 2 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              width: colWidth,
              height: bracketHeight - 16,
              borderRadius: 6,
              backgroundColor:
                highlightColumn === 1 ? "rgba(228, 119, 99, 0.12)" : "transparent",
              transition: "background-color 0.2s ease",
            }}
          >
            <span
              style={{
                fontFamily: TYPOGRAPHY.fontTitle,
                fontSize,
                fontWeight: 600,
                color: highlightColumn === 1 ? COLORS.coralAccent : COLORS.textPrimary,
              }}
            >
              {matrix[0][1]}
            </span>
            <span
              style={{
                fontFamily: TYPOGRAPHY.fontTitle,
                fontSize,
                fontWeight: 600,
                color: highlightColumn === 1 ? COLORS.coralAccent : COLORS.textPrimary,
              }}
            >
              {matrix[1][1]}
            </span>
          </div>

          {/* Right Bracket */}
          <svg width="12" height={bracketHeight} viewBox={`0 0 12 ${bracketHeight}`}>
            <path
              d={`M 2 2 L 10 2 L 10 ${bracketHeight - 2} L 2 ${bracketHeight - 2}`}
              fill="none"
              stroke={COLORS.textPrimary}
              strokeWidth="2.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
