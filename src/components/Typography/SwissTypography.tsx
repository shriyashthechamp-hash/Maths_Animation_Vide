import React from "react";
import { COLORS, TYPOGRAPHY } from "../../styles/tokens";

interface SwissSceneHeaderProps {
  tag: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  theme?: "light" | "cobalt" | "coral" | "dark" | "paleBlue";
  maxWidth?: number;
  titleSize?: number;
  subtitleSize?: number;
  style?: React.CSSProperties;
}

export const SwissSceneHeader: React.FC<SwissSceneHeaderProps> = ({
  tag,
  title,
  titleAccent,
  subtitle,
  theme = "light",
  maxWidth = 1200,
  titleSize = 84,
  subtitleSize = 30,
  style,
}) => {
  const isDark = theme === "dark" || theme === "cobalt";
  const tagColor =
    theme === "cobalt"
      ? COLORS.yellowHighlight
      : theme === "coral"
      ? COLORS.yellowHighlight
      : theme === "dark"
      ? COLORS.yellowHighlight
      : COLORS.cobaltPrimary;

  const titleColor = isDark ? COLORS.textInverted : COLORS.textPrimary;
  const accentColor =
    theme === "cobalt" || theme === "dark"
      ? COLORS.yellowHighlight
      : COLORS.coralAccent;

  const subtitleColor = isDark ? "rgba(251, 250, 245, 0.88)" : COLORS.textMuted;

  return (
    <header
      style={{
        position: "absolute",
        left: 96,
        top: 72,
        maxWidth,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        ...style,
      }}
    >
      {/* Category / Tracker Tag */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontTitle,
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: tagColor,
          }}
        >
          {tag}
        </span>
        <div
          style={{
            height: 2,
            width: 32,
            backgroundColor: tagColor,
            opacity: 0.6,
          }}
        />
      </div>

      {/* Hero Headline (76 - 96px) */}
      <h1
        style={{
          fontFamily: TYPOGRAPHY.fontTitle,
          fontSize: titleSize,
          fontWeight: 800,
          lineHeight: 0.98,
          letterSpacing: "-0.04em",
          color: titleColor,
          margin: 0,
          textTransform: "uppercase",
        }}
      >
        {title}{" "}
        {titleAccent && (
          <span style={{ color: accentColor }}>
            {titleAccent}
          </span>
        )}
      </h1>

      {/* Subtitle / Explanatory Sentence (30 - 34px) */}
      {subtitle && (
        <p
          style={{
            fontFamily: TYPOGRAPHY.fontBody,
            fontSize: subtitleSize,
            fontWeight: 500,
            lineHeight: 1.35,
            color: subtitleColor,
            margin: "4px 0 0 0",
            maxWidth: 1050,
          }}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
};

export const SwissSectionTitle: React.FC<{
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, color = COLORS.textPrimary, style }) => (
  <h2
    style={{
      fontFamily: TYPOGRAPHY.fontTitle,
      fontSize: 52,
      fontWeight: 800,
      lineHeight: 1.05,
      letterSpacing: "-0.03em",
      color,
      margin: 0,
      ...style,
    }}
  >
    {children}
  </h2>
);

export const SwissBodyText: React.FC<{
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, color = COLORS.textMuted, style }) => (
  <p
    style={{
      fontFamily: TYPOGRAPHY.fontBody,
      fontSize: 32,
      fontWeight: 500,
      lineHeight: 1.4,
      color,
      margin: 0,
      ...style,
    }}
  >
    {children}
  </p>
);
