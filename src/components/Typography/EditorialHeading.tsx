import React from "react";
import { COLORS, TYPOGRAPHY } from "../../styles/tokens";

interface EditorialHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  topic?: string;
  theme?: "light" | "dark" | "cobalt";
}

export const EditorialHeading: React.FC<EditorialHeadingProps> = ({
  title,
  subtitle,
  badge = "MATHEMATICS-3",
  topic = "LINEAR TRANSFORMATIONS",
  theme = "light",
}) => {
  const isDark = theme === "dark";
  const isCobalt = theme === "cobalt";

  const badgeColor = isDark
    ? COLORS.yellowHighlight
    : isCobalt
    ? COLORS.yellowHighlight
    : COLORS.cobaltPrimary;

  const topicColor = isDark
    ? "rgba(255, 255, 255, 0.65)"
    : isCobalt
    ? "rgba(255, 255, 255, 0.75)"
    : COLORS.textMuted;

  const titleColor = isDark || isCobalt ? COLORS.textInverted : COLORS.textPrimary;
  const subtitleColor = isDark || isCobalt ? "rgba(255, 255, 255, 0.85)" : COLORS.textMuted;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {/* Top Tagline / Category */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontTitle,
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "2px",
            color: badgeColor,
            textTransform: "uppercase",
          }}
        >
          {badge}
        </span>
        <span style={{ color: isDark || isCobalt ? "rgba(255, 255, 255, 0.3)" : COLORS.borderLight, fontSize: 16 }}>/</span>
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontTitle,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "1.5px",
            color: topicColor,
            textTransform: "uppercase",
          }}
        >
          {topic}
        </span>
      </div>

      {/* Main Title */}
      <h1
        style={{
          fontFamily: TYPOGRAPHY.fontTitle,
          fontSize: 56,
          fontWeight: 800,
          color: titleColor,
          margin: 0,
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
        }}
      >
        {title}
      </h1>

      {/* Optional Subtitle */}
      {subtitle && (
        <p
          style={{
            fontFamily: TYPOGRAPHY.fontBody,
            fontSize: 22,
            fontWeight: 500,
            color: subtitleColor,
            margin: "4px 0 0 0",
            lineHeight: 1.35,
            maxWidth: 1100,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
