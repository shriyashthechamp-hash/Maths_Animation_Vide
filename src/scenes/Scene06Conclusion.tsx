import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, TYPOGRAPHY } from "../styles/tokens";
import { SwissSceneHeader } from "../components/Typography/SwissTypography";
import { ProfDot } from "../components/ProfDot/ProfDot";
import { FontLoader } from "../styles/FontLoader";
import { AmbientBackground } from "../components/Ambient/AmbientBackground";
import { isSpeakingInScene } from "../timeline/speechActivity";

export const Scene06Conclusion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: 0 - 630 (0s - 21s) 3 Core Principles Reveal
  const p1Spring = spring({ frame: frame - 20, fps, config: { damping: 14 } });
  const p2Spring = spring({ frame: frame - 180, fps, config: { damping: 14 } });
  const p3Spring = spring({ frame: frame - 360, fps, config: { damping: 14 } });

  // Phase 2: 630 - 1130 (21s - 37.6s) Sign-off & Waving
  const signoffQuoteSpring = spring({ frame: frame - 630, fps, config: { damping: 13 } });
  const isWaving = frame >= 750 && frame < 1130;

  // Phase 3: 1130 - 1410 (37.6s - 47s) Official Swiss Credit Roll
  const creditsSpring = spring({ frame: frame - 1130, fps, config: { damping: 14 } });
  const canvasFadeOut = interpolate(frame, [1360, 1410], [1, 0], { extrapolateRight: "clamp" });

  // Presenter scale & position
  const dotX = interpolate(frame, [0, 1100, 1160], [1440, 1440, 1980], { extrapolateRight: "clamp" });
  const dotY = 440;

  const isSpeaking = isSpeakingInScene("scene06", frame);

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: COLORS.canvasCobalt,
        opacity: canvasFadeOut,
        overflow: "hidden",
      }}
    >
      <FontLoader />
      <AmbientBackground scene="scene06" />

      {/* 1. BOLD COLOR FIELD: Giant Overlapping Bauhaus Shapes in Yellow and Coral */}
      <div
        style={{
          position: "absolute",
          right: -120,
          top: -100,
          width: 600,
          height: 600,
          borderRadius: "50%",
          backgroundColor: COLORS.yellowHighlight,
          opacity: 0.12,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -100,
          bottom: -100,
          width: 520,
          height: 520,
          borderRadius: "50%",
          backgroundColor: COLORS.coralAccent,
          opacity: 0.14,
          pointerEvents: "none",
        }}
      />

      {/* 2. UNIFIED SCENE HEADER (Cobalt Theme) */}
      <SwissSceneHeader
        tag="SCENE 06 / SYNTHESIS & CONCLUSION"
        title={frame < 600 ? "THE THREE" : "SEE BEYOND"}
        titleAccent={frame < 600 ? "CORE LAWS." : "THE GRID."}
        subtitle={
          frame < 600
            ? "Three fundamental insights that unite linear algebra from geometry to algebra."
            : "A matrix is not a prison of static numbers — it is an engine of transformation."
        }
        theme="cobalt"
        maxWidth={1220}
      />

      {/* 3. THREE CORE LAWS ASYMMETRIC EDITORIAL LAYOUT */}
      {frame < 1130 && (
        <div
          style={{
            position: "absolute",
            left: 96,
            top: 280,
            width: 1240,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            zIndex: 10,
          }}
        >
          {/* Principle 1 */}
          <div
            style={{
              padding: "22px 32px",
              backgroundColor: "rgba(255, 255, 255, 0.96)",
              borderRadius: 20,
              border: `2px solid #FFFFFF`,
              borderLeft: `8px solid ${COLORS.yellowHighlight}`,
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.18)",
              display: "flex",
              alignItems: "center",
              gap: 28,
              transform: `scale(${Math.max(0, p1Spring)})`,
            }}
          >
            <span
              style={{
                fontFamily: TYPOGRAPHY.fontTitle,
                fontSize: 44,
                fontWeight: 900,
                color: COLORS.cobaltPrimary,
                lineHeight: 1,
              }}
            >
              01
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontFamily: TYPOGRAPHY.fontTitle, fontSize: 24, fontWeight: 800, color: COLORS.textPrimary }}>
                A Matrix is an Action, Not a Table
              </span>
              <span style={{ fontFamily: TYPOGRAPHY.fontBody, fontSize: 18, fontWeight: 500, color: COLORS.textMuted, lineHeight: 1.4 }}>
                It is a dynamic machine that reshapes space while preserving the origin and parallel gridlines.
              </span>
            </div>
          </div>

          {/* Principle 2 */}
          <div
            style={{
              padding: "22px 32px",
              backgroundColor: "rgba(255, 255, 255, 0.96)",
              borderRadius: 20,
              border: `2px solid #FFFFFF`,
              borderLeft: `8px solid ${COLORS.coralAccent}`,
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.18)",
              display: "flex",
              alignItems: "center",
              gap: 28,
              transform: `scale(${Math.max(0, p2Spring)})`,
            }}
          >
            <span
              style={{
                fontFamily: TYPOGRAPHY.fontTitle,
                fontSize: 44,
                fontWeight: 900,
                color: COLORS.coralAccent,
                lineHeight: 1,
              }}
            >
              02
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontFamily: TYPOGRAPHY.fontTitle, fontSize: 24, fontWeight: 800, color: COLORS.textPrimary }}>
                Columns Are the Destinations of the Basis
              </span>
              <span style={{ fontFamily: TYPOGRAPHY.fontBody, fontSize: 18, fontWeight: 500, color: COLORS.textMuted, lineHeight: 1.4 }}>
                Column 1 is where (1, 0) goes. Column 2 is where (0, 1) goes. The two columns tell the whole story.
              </span>
            </div>
          </div>

          {/* Principle 3 */}
          <div
            style={{
              padding: "22px 32px",
              backgroundColor: "rgba(255, 255, 255, 0.96)",
              borderRadius: 20,
              border: `2px solid #FFFFFF`,
              borderLeft: `8px solid ${COLORS.electricBlue}`,
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.18)",
              display: "flex",
              alignItems: "center",
              gap: 28,
              transform: `scale(${Math.max(0, p3Spring)})`,
            }}
          >
            <span
              style={{
                fontFamily: TYPOGRAPHY.fontTitle,
                fontSize: 44,
                fontWeight: 900,
                color: COLORS.textPrimary,
                lineHeight: 1,
              }}
            >
              03
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontFamily: TYPOGRAPHY.fontTitle, fontSize: 24, fontWeight: 800, color: COLORS.textPrimary }}>
                Linearity Unlocks the Entire Space
              </span>
              <span style={{ fontFamily: TYPOGRAPHY.fontBody, fontSize: 18, fontWeight: 500, color: COLORS.textMuted, lineHeight: 1.4 }}>
                Because T(c·u + d·v) = c·T(u) + d·T(v), knowing the basis determines the fate of every point in ℝ².
              </span>
            </div>
          </div>

          {/* Final Callout Quote Box (Signal Yellow on Cobalt) */}
          {frame >= 630 && (
            <div
              style={{
                marginTop: 12,
                padding: "22px 32px",
                backgroundColor: COLORS.yellowHighlight,
                borderRadius: 20,
                border: `2px solid #FFFFFF`,
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.24)",
                transform: `scale(${Math.max(0, signoffQuoteSpring)})`,
                display: "flex",
                alignItems: "center",
                gap: 24,
              }}
            >
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontTitle,
                  fontSize: 14,
                  fontWeight: 900,
                  backgroundColor: COLORS.textPrimary,
                  color: COLORS.yellowHighlight,
                  padding: "4px 12px",
                  borderRadius: 6,
                  letterSpacing: "0.12em",
                }}
              >
                FINAL INSIGHT
              </span>
              <span style={{ fontFamily: TYPOGRAPHY.fontTitle, fontSize: 24, fontWeight: 800, color: COLORS.textPrimary, letterSpacing: "-0.01em" }}>
                "Next time you see a matrix, don’t see four numbers. See space in motion."
              </span>
            </div>
          )}
        </div>
      )}

      {/* 4. OFFICIAL SWISS CREDITS ROLL (Frame >= 1130) */}
      {frame >= 1130 && (
        <div
          style={{
            position: "absolute",
            left: 180,
            top: 180,
            width: 1560,
            padding: "54px 64px",
            backgroundColor: "#FFFFFF",
            borderRadius: 28,
            border: `2px solid ${COLORS.yellowHighlight}`,
            boxShadow: "0 32px 80px rgba(0, 0, 0, 0.3)",
            transform: `scale(${Math.max(0, creditsSpring)})`,
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            gap: 36,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: `2px solid ${COLORS.borderLight}`, paddingBottom: 28 }}>
            <div>
              <h1 style={{ fontFamily: TYPOGRAPHY.fontTitle, fontSize: 54, fontWeight: 900, color: COLORS.textPrimary, margin: 0, letterSpacing: "-0.03em" }}>
                THE MATRIX EFFECT
              </h1>
              <span style={{ fontFamily: TYPOGRAPHY.fontBody, fontSize: 24, fontWeight: 500, color: COLORS.textMuted }}>
                How Matrices Transform Space · Linear Transformations
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontFamily: TYPOGRAPHY.fontTitle, fontSize: 22, fontWeight: 800, color: COLORS.cobaltPrimary, letterSpacing: "0.1em" }}>
                MATHEMATICS 3
              </span>
              <div style={{ fontFamily: TYPOGRAPHY.fontBody, fontSize: 16, fontWeight: 600, color: COLORS.textMuted }}>
                Newton School of Technology
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: "1.2px", color: COLORS.cobaltPrimary, textTransform: "uppercase", marginBottom: 10 }}>
                PRODUCTION & ANIMATION
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.textPrimary, fontFamily: TYPOGRAPHY.fontTitle }}>
                Remotion 4.0 Engine
              </div>
              <div style={{ fontSize: 16, color: COLORS.textMuted, fontFamily: TYPOGRAPHY.fontBody, marginTop: 4 }}>
                Vector Motion Graphics & Swiss Layout
              </div>
            </div>

            <div>
              <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: "1.2px", color: COLORS.coralAccent, textTransform: "uppercase", marginBottom: 10 }}>
                ACADEMIC REFERENCE
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.textPrimary, fontFamily: TYPOGRAPHY.fontTitle }}>
                Lecture Sheet 10
              </div>
              <div style={{ fontSize: 16, color: COLORS.textMuted, fontFamily: TYPOGRAPHY.fontBody, marginTop: 4 }}>
                Matrices in Motion — Linear Algebra
              </div>
            </div>

            <div>
              <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: "1.2px", color: COLORS.cobaltPrimary, textTransform: "uppercase", marginBottom: 10 }}>
                PRESENTER
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.textPrimary, fontFamily: TYPOGRAPHY.fontTitle }}>
                Prof. Dot
              </div>
              <div style={{ fontSize: 16, color: COLORS.textMuted, fontFamily: TYPOGRAPHY.fontBody, marginTop: 4 }}>
                Original Character & Gesture System
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. PROF. DOT ON COBALT POSTER */}
      {frame < 1160 && (
        <ProfDot
          position={{ x: dotX, y: dotY }}
          scale={1.48}
          expression={isWaving ? "happy" : frame < 630 ? "explaining" : "realization"}
          gesture={isWaving ? "concluding" : frame < 630 ? "summarizing" : "explaining"}
          speaking={isSpeaking}
        />
      )}
    </div>
  );
};
