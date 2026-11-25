import React from "react";
import { COLORS, TYPOGRAPHY } from "../../styles/tokens";

interface ColorPanelProps {
  variant?: "cobalt" | "coral" | "yellow" | "neutral" | "dark";
  title?: string;
  badge?: string;
  width?: number | string;
  minHeight?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const ColorPanel: React.FC<ColorPanelProps> = ({
  variant = "neutral",
  title,
  badge,
  width = "auto",
  minHeight,
  children,
  style,
}) => {
  const getColors = () => {
    switch (variant) {
      case "cobalt":
        return {
          bg: COLORS.cobaltUltraLight,
          border: COLORS.cobaltLight,
          accent: COLORS.cobaltPrimary,
          headerBg: COLORS.cobaltPrimary,
          headerText: "#FFFFFF",
          text: COLORS.textPrimary,
        };
      case "coral":
        return {
          bg: COLORS.coralUltraLight,
          border: COLORS.coralLight,
          accent: COLORS.coralAccent,
          headerBg: COLORS.coralAccent,
          headerText: "#FFFFFF",
          text: COLORS.textPrimary,
        };
      case "yellow":
        return {
          bg: COLORS.yellowUltraLight,
          border: COLORS.yellowPale,
          accent: COLORS.yellowHighlight,
          headerBg: COLORS.yellowHighlight,
          headerText: COLORS.textPrimary,
          text: COLORS.textPrimary,
        };
      case "dark":
        return {
          bg: "#18181B",
          border: "#2E2E33",
          accent: COLORS.yellowHighlight,
          headerBg: COLORS.yellowHighlight,
          headerText: COLORS.textPrimary,
          text: "#F4F4F5",
        };
      case "neutral":
      default:
        return {
          bg: "#FFFFFF",
          border: COLORS.borderLight,
          accent: COLORS.cobaltPrimary,
          headerBg: COLORS.canvasMuted,
          headerText: COLORS.textPrimary,
          text: COLORS.textPrimary,
        };
    }
  };

  const c = getColors();

  return (
    <div
      style={{
        width,
        minHeight,
        backgroundColor: c.bg,
        borderRadius: 20,
        border: `2px solid ${c.border}`,
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.06)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {(title || badge) && (
        <div
          style={{
            padding: "14px 24px",
            backgroundColor: c.headerBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {title && (
            <span
              style={{
                fontFamily: TYPOGRAPHY.fontTitle,
                fontSize: 20,
                fontWeight: 800,
                color: c.headerText,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {title}
            </span>
          )}
          {badge && (
            <span
              style={{
                fontFamily: TYPOGRAPHY.fontTitle,
                fontSize: 14,
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: 6,
                backgroundColor: "rgba(0, 0, 0, 0.15)",
                color: c.headerText,
                letterSpacing: "0.08em",
              }}
            >
              {badge}
            </span>
          )}
        </div>
      )}
      <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", flex: 1 }}>
        {children}
      </div>
    </div>
  );
};

interface SketchBadgeProps {
  text: string;
  variant?: "yellow" | "coral" | "cobalt";
  style?: React.CSSProperties;
}

export const SketchBadge: React.FC<SketchBadgeProps> = ({
  text,
  variant = "yellow",
  style,
}) => {
  const bg =
    variant === "yellow"
      ? COLORS.yellowHighlight
      : variant === "coral"
      ? COLORS.coralAccent
      : COLORS.cobaltPrimary;

  const textColor = variant === "yellow" ? COLORS.textPrimary : "#FFFFFF";

  return (
    <span
      style={{
        fontFamily: TYPOGRAPHY.fontTitle,
        fontSize: 16,
        fontWeight: 800,
        backgroundColor: bg,
        color: textColor,
        padding: "4px 12px",
        borderRadius: 6,
        letterSpacing: "0.06em",
        display: "inline-block",
        ...style,
      }}
    >
      {text}
    </span>
  );
};
