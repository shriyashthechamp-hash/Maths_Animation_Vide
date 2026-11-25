import React from "react";
import { useCurrentFrame } from "remotion";
import { getCaptionAtGlobalFrame } from "../../timeline/speechActivity";
import { COLORS, TYPOGRAPHY } from "../../styles/tokens";

interface CaptionsProps {
  offsetFrame?: number; // Optional frame offset if inside a local scene sequence
}

export const Captions: React.FC<CaptionsProps> = ({ offsetFrame = 0 }) => {
  const localFrame = useCurrentFrame();
  const globalFrame = localFrame + offsetFrame;
  const currentCaption = getCaptionAtGlobalFrame(globalFrame);

  if (!currentCaption) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: 36,
        transform: "translateX(-50%)",
        zIndex: 90,
        maxWidth: 1100,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "10px 24px",
          backgroundColor: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(10px)",
          borderRadius: 14,
          border: `1.5px solid ${COLORS.borderLight}`,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontBody,
            fontSize: 18,
            fontWeight: 600,
            color: COLORS.textPrimary,
            lineHeight: 1.4,
            letterSpacing: "0.01em",
          }}
        >
          {currentCaption}
        </span>
      </div>
    </div>
  );
};
