import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, TYPOGRAPHY } from "../../styles/tokens";

interface MaskedRevealTextProps {
  text: string;
  delay?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  direction?: "up" | "down" | "left" | "right";
  style?: React.CSSProperties;
}

export const MaskedRevealText: React.FC<MaskedRevealTextProps> = ({
  text,
  delay = 0,
  fontSize = 36,
  fontWeight = 700,
  color = COLORS.textPrimary,
  direction = "up",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const getTransform = () => {
    switch (direction) {
      case "up":
        return `translateY(${(1 - Math.max(0, Math.min(1, progress))) * 100}%)`;
      case "down":
        return `translateY(${-(1 - Math.max(0, Math.min(1, progress))) * 100}%)`;
      case "left":
        return `translateX(${(1 - Math.max(0, Math.min(1, progress))) * 100}%)`;
      case "right":
        return `translateX(${-(1 - Math.max(0, Math.min(1, progress))) * 100}%)`;
    }
  };

  return (
    <div
      style={{
        overflow: "hidden",
        display: "inline-block",
        lineHeight: 1.15,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: TYPOGRAPHY.fontTitle,
          fontSize,
          fontWeight,
          color,
          transform: getTransform(),
          letterSpacing: "-0.03em",
          display: "inline-block",
        }}
      >
        {text}
      </div>
    </div>
  );
};

interface OversizedStatementProps {
  primaryText: string;
  accentText?: string;
  tag?: string;
  number?: string;
  delay?: number;
  fontSize?: number;
  theme?: "light" | "dark" | "cobalt" | "coral";
  style?: React.CSSProperties;
}

export const OversizedStatement: React.FC<OversizedStatementProps> = ({
  primaryText,
  accentText,
  tag,
  number,
  delay = 0,
  fontSize = 88,
  theme = "light",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 13, mass: 0.9, stiffness: 100 },
  });

  const primaryColor =
    theme === "light"
      ? COLORS.textPrimary
      : theme === "dark"
      ? COLORS.textInverted
      : theme === "coral"
      ? "#FFFFFF"
      : COLORS.textInverted;

  const accentColor =
    theme === "light"
      ? COLORS.cobaltPrimary
      : theme === "dark"
      ? COLORS.yellowHighlight
      : theme === "coral"
      ? COLORS.yellowHighlight
      : COLORS.yellowHighlight;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        transform: `scale(${Math.max(0, entrance)})`,
        transformOrigin: "left top",
        ...style,
      }}
    >
      {/* Top Tag & Number row */}
      {(tag || number) && (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {number && (
            <span
              style={{
                fontFamily: TYPOGRAPHY.fontTitle,
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: "0.15em",
                color: accentColor,
              }}
            >
              [{number}]
            </span>
          )}
          {tag && (
            <span
              style={{
                fontFamily: TYPOGRAPHY.fontBody,
                fontSize: 16,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: theme === "light" ? COLORS.textMuted : "rgba(255,255,255,0.8)",
              }}
            >
              {tag}
            </span>
          )}
        </div>
      )}

      {/* Main Massive Kinetic Statement */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 16 }}>
        <h1
          style={{
            fontFamily: TYPOGRAPHY.fontTitle,
            fontSize,
            fontWeight: 800,
            lineHeight: 0.96,
            letterSpacing: "-0.04em",
            color: primaryColor,
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          {primaryText}
        </h1>
        {accentText && (
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontTitle,
              fontSize,
              fontWeight: 800,
              lineHeight: 0.96,
              letterSpacing: "-0.04em",
              color: accentColor,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            {accentText}
          </span>
        )}
      </div>
    </div>
  );
};

interface SwissIndexTagProps {
  index: string;
  label: string;
  delay?: number;
  color?: string;
}

export const SwissIndexTag: React.FC<SwissIndexTagProps> = ({
  index,
  label,
  delay = 0,
  color = COLORS.cobaltPrimary,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const anim = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, mass: 0.8 },
  });

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "6px 14px",
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        borderRadius: 8,
        border: `1.5px solid ${COLORS.borderLight}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        transform: `translateY(${(1 - Math.max(0, anim)) * 14}px)`,
        opacity: Math.max(0, Math.min(1, anim)),
      }}
    >
      <span
        style={{
          fontFamily: TYPOGRAPHY.fontTitle,
          fontSize: 12,
          fontWeight: 800,
          color,
          letterSpacing: "0.1em",
        }}
      >
        {index}
      </span>
      <div style={{ width: 1, height: 12, backgroundColor: COLORS.borderLight }} />
      <span
        style={{
          fontFamily: TYPOGRAPHY.fontTitle,
          fontSize: 12,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: COLORS.textPrimary,
        }}
      >
        {label}
      </span>
    </div>
  );
};
