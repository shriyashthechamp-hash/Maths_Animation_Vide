import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, TYPOGRAPHY } from "../styles/tokens";
import { SwissSceneHeader } from "../components/Typography/SwissTypography";
import { HandwrittenAnnotation } from "../components/Annotations/HandwrittenAnnotation";
import { ProfDot } from "../components/ProfDot/ProfDot";
import { FontLoader } from "../styles/FontLoader";
import { AmbientBackground } from "../components/Ambient/AmbientBackground";
import { isSpeakingInScene } from "../timeline/speechActivity";

export const Scene04Linearity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: 0 - 300 (0s - 10s) Axiom intro & two rules drop in
  const cardsSpring = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  
  // Phase 2: 300 - 890 (10s - 29.6s) Additivity diagram
  const additivityProgress = interpolate(frame, [300, 440], [0, 1], { extrapolateRight: "clamp" });
  
  // Phase 3: 890 - 1300 (29.6s - 43.3s) Homogeneity scaling diagram
  const scalingProgress = interpolate(frame, [890, 1050], [0, 1], { extrapolateRight: "clamp" });
  const currentScale = 1 + scalingProgress * 0.85;

  // Phase 4: 1300 - 1590 (43.3s - 53s) Formal proof review
  const proofSpring = spring({ frame: frame - 1300, fps, config: { damping: 13 } });
  const proofStep1 = frame >= 1340;
  const proofStep2 = frame >= 1420;

  // Character presence & gestures
  const dotX = 1440;
  const dotY = 440;

  const characterGesture =
    frame < 300
      ? "explaining"
      : frame < 890
      ? "comparing"
      : frame < 1300
      ? "noting"
      : "concluding";

  const characterExpression =
    frame < 300
      ? "thinking"
      : frame < 890
      ? "focused"
      : frame < 1300
      ? "realization"
      : "happy";

  const isSpeaking = isSpeakingInScene("scene04", frame);

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: COLORS.background,
        overflow: "hidden",
      }}
    >
      <FontLoader />
      <AmbientBackground scene="scene04" />

      {/* 1. BOLD SPLIT-COLOUR BACKGROUND ARCHITECTURE */}
      {/* Left Half: Pale Blue Field */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 710,
          height: 1080,
          backgroundColor: COLORS.canvasPaleBlue,
          opacity: 0.65,
          borderRight: `2px solid rgba(43, 76, 126, 0.15)`,
          zIndex: 1,
        }}
      />
      {/* Right Column / Prof Dot Stage: Soft Coral Field */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 580,
          height: 1080,
          backgroundColor: COLORS.canvasPaleCoral,
          opacity: 0.5,
          borderLeft: `2px solid rgba(232, 93, 74, 0.15)`,
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -60,
            right: -60,
            width: 380,
            height: 380,
            borderRadius: "50%",
            backgroundColor: COLORS.yellowHighlight,
            opacity: 0.2,
          }}
        />
      </div>

      {/* 2. UNIFIED SCENE HEADER */}
      <SwissSceneHeader
        tag="SCENE 04 / MATHEMATICAL FOUNDATIONS"
        title={frame < 810 ? "TWO SACRED RULES" : "THE FORMAL PROOF"}
        titleAccent={frame < 810 ? "OF LINEARITY." : "IN ACTION."}
        subtitle={
          frame < 810
            ? "Additivity and Homogeneity: the two non-negotiable geometric and algebraic axioms."
            : "Testing T(x, y) = (x + y, x - y) on Lecture Sheet 10 Example 1 with algebraic rigor."
        }
        titleSize={68}
        subtitleSize={26}
        maxWidth={1260}
      />

      {/* 3. MAIN AXIOM COMPARISON PANELS (Phase 1 & 2) */}
      {frame < 1300 && (
        <div
          style={{
            position: "absolute",
            left: 96,
            top: 292,
            display: "flex",
            gap: 36,
            transform: `scale(${Math.max(0, cardsSpring)})`,
            zIndex: 10,
          }}
        >
          {/* Axiom 1: Additivity (Cobalt Identity) */}
          <div
            style={{
              width: 570,
              padding: "26px 32px",
              backgroundColor: "#FFFFFF",
              borderRadius: 22,
              border: `2px solid ${COLORS.cobaltPrimary}`,
              borderTop: `8px solid ${COLORS.cobaltPrimary}`,
              boxShadow: "0 16px 40px rgba(43, 76, 126, 0.12)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontTitle,
                  fontSize: 14,
                  fontWeight: 800,
                  backgroundColor: COLORS.cobaltPrimary,
                  color: "#FFFFFF",
                  padding: "4px 10px",
                  borderRadius: 6,
                  letterSpacing: "0.1em",
                }}
              >
                RULE 01 : ADDITIVITY
              </span>
              <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.cobaltPrimary, fontFamily: TYPOGRAPHY.fontTitle }}>
                SUPERPOSITION
              </span>
            </div>

            <div
              style={{
                fontFamily: TYPOGRAPHY.fontMath,
                fontSize: 32,
                fontWeight: 800,
                color: COLORS.cobaltPrimary,
                padding: "16px 20px",
                backgroundColor: COLORS.cobaltUltraLight,
                borderRadius: 14,
                border: `1.5px solid rgba(43, 76, 126, 0.25)`,
              }}
            >
              T(u + v) = T(u) + T(v)
            </div>

            <div style={{ fontSize: 18, fontWeight: 500, color: COLORS.textMuted, lineHeight: 1.45, fontFamily: TYPOGRAPHY.fontBody }}>
              Adding vectors before or after transformation yields identical results.
            </div>

            {/* Vector Addition Diagram */}
            <div style={{ position: "relative", height: 135, backgroundColor: "#FBFAF5", borderRadius: 14, overflow: "hidden", border: `1.5px solid ${COLORS.borderLight}` }}>
              <svg width="100%" height="100%" viewBox="0 0 520 135">
                <line x1="40" y1="95" x2="160" y2="65" stroke={COLORS.cobaltPrimary} strokeWidth="3.5" />
                <line x1="160" y1="65" x2="280" y2="28" stroke={COLORS.coralAccent} strokeWidth="3.5" />
                <line x1="40" y1="95" x2="280" y2="28" stroke={COLORS.textPrimary} strokeWidth="3.5" strokeDasharray="5 5" />
                <text x="100" y="68" fontSize="16" fontWeight="bold" fill={COLORS.cobaltPrimary} fontFamily={TYPOGRAPHY.fontTitle}>u</text>
                <text x="225" y="40" fontSize="16" fontWeight="bold" fill={COLORS.coralAccent} fontFamily={TYPOGRAPHY.fontTitle}>v</text>
                <text x="140" y="112" fontSize="16" fontWeight="bold" fill={COLORS.textPrimary} fontFamily={TYPOGRAPHY.fontTitle}>u + v</text>
                <text x="350" y="70" fontSize="22" fontWeight="bold" fill={COLORS.cobaltPrimary} fontFamily={TYPOGRAPHY.fontTitle}>T(u + v)</text>
              </svg>
            </div>
          </div>

          {/* Axiom 2: Homogeneity (Coral Identity) */}
          <div
            style={{
              width: 570,
              padding: "26px 32px",
              backgroundColor: "#FFFFFF",
              borderRadius: 22,
              border: `2px solid ${COLORS.coralAccent}`,
              borderTop: `8px solid ${COLORS.coralAccent}`,
              boxShadow: "0 16px 40px rgba(232, 93, 74, 0.12)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontTitle,
                  fontSize: 14,
                  fontWeight: 800,
                  backgroundColor: COLORS.coralAccent,
                  color: "#FFFFFF",
                  padding: "4px 10px",
                  borderRadius: 6,
                  letterSpacing: "0.1em",
                }}
              >
                RULE 02 : HOMOGENEITY
              </span>
              <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.coralAccent, fontFamily: TYPOGRAPHY.fontTitle }}>
                SCALING
              </span>
            </div>

            <div
              style={{
                fontFamily: TYPOGRAPHY.fontMath,
                fontSize: 32,
                fontWeight: 800,
                color: COLORS.coralAccent,
                padding: "16px 20px",
                backgroundColor: COLORS.coralUltraLight,
                borderRadius: 14,
                border: `1.5px solid rgba(232, 93, 74, 0.25)`,
              }}
            >
              T(c · v) = c · T(v)
            </div>

            <div style={{ fontSize: 18, fontWeight: 500, color: COLORS.textMuted, lineHeight: 1.45, fontFamily: TYPOGRAPHY.fontBody }}>
              Scaling an input vector by scalar c scales the output vector by the exact same scalar.
            </div>

            {/* Vector Scaling Diagram */}
            <div style={{ position: "relative", height: 135, backgroundColor: "#FBFAF5", borderRadius: 14, overflow: "hidden", border: `1.5px solid ${COLORS.borderLight}` }}>
              <svg width="100%" height="100%" viewBox="0 0 520 135">
                <line x1="40" y1="88" x2="160" y2="38" stroke={COLORS.coralAccent} strokeWidth="3.5" />
                <line x1="40" y1="88" x2={40 + 120 * currentScale} y2={88 - 50 * currentScale} stroke={COLORS.coralAccent} strokeWidth="3.5" strokeDasharray="4 4" />
                <text x="110" y="50" fontSize="16" fontWeight="bold" fill={COLORS.coralAccent} fontFamily={TYPOGRAPHY.fontTitle}>v</text>
                <text x="210" y="28" fontSize="16" fontWeight="bold" fill={COLORS.textPrimary} fontFamily={TYPOGRAPHY.fontTitle}>c · v (c = {currentScale.toFixed(1)})</text>
                <text x="350" y="70" fontSize="22" fontWeight="bold" fill={COLORS.coralAccent} fontFamily={TYPOGRAPHY.fontTitle}>c · T(v)</text>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* 4. FORMAL LECTURE PROOF BOARD (Phase 3: Frame >= 1300) */}
      {frame >= 1300 && (
        <div
          style={{
            position: "absolute",
            left: 96,
            top: 280,
            width: 1220,
            padding: "36px 44px",
            backgroundColor: "#FFFFFF",
            borderRadius: 22,
            border: `2px solid ${COLORS.borderLight}`,
            borderLeft: `8px solid ${COLORS.cobaltPrimary}`,
            boxShadow: "0 20px 48px rgba(0, 0, 0, 0.08)",
            transform: `scale(${Math.max(0, proofSpring)})`,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontTitle,
                  fontSize: 14,
                  fontWeight: 800,
                  backgroundColor: COLORS.cobaltPrimary,
                  color: "#FFFFFF",
                  padding: "4px 12px",
                  borderRadius: 6,
                  letterSpacing: "0.1em",
                }}
              >
                RIGOROUS PROOF
              </span>
              <span style={{ fontSize: 28, fontWeight: 800, fontFamily: TYPOGRAPHY.fontTitle, color: COLORS.textPrimary }}>
                Testing T(x, y) = (x + y, x - y)
              </span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 600, color: COLORS.textMuted, fontFamily: TYPOGRAPHY.fontBody }}>
              Lecture Sheet 10 Example 1
            </span>
          </div>

          {/* Proof Grid: 2 Columns */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {/* Left: Additivity Step */}
            <div
              style={{
                padding: "24px 28px",
                backgroundColor: proofStep1 ? COLORS.cobaltUltraLight : "#FBFAF5",
                borderRadius: 16,
                border: `2px solid ${proofStep1 ? COLORS.cobaltPrimary : COLORS.borderLight}`,
                transition: "all 0.4s ease",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.cobaltPrimary, letterSpacing: "1.2px", marginBottom: 14 }}>
                1. ADDITIVITY CHECK
              </div>
              <div style={{ fontFamily: TYPOGRAPHY.fontMath, fontSize: 19, lineHeight: 1.6, color: COLORS.textPrimary }}>
                <div>Let u = (x₁, y₁), v = (x₂, y₂)</div>
                <div>u + v = (x₁ + x₂, y₁ + y₂)</div>
                <div style={{ marginTop: 8, color: COLORS.cobaltPrimary, fontWeight: 700 }}>
                  T(u + v) = ((x₁+x₂)+(y₁+y₂), (x₁+x₂)-(y₁+y₂))
                </div>
                <div style={{ color: COLORS.cobaltPrimary, fontWeight: 700 }}>
                  = (x₁+y₁, x₁-y₁) + (x₂+y₂, x₂-y₂)
                </div>
                <div style={{ marginTop: 8, fontSize: 22, fontWeight: 800, color: "#1E7E34" }}>
                  = T(u) + T(v)  ✓
                </div>
              </div>
            </div>

            {/* Right: Homogeneity Step */}
            <div
              style={{
                padding: "24px 28px",
                backgroundColor: proofStep2 ? COLORS.coralUltraLight : "#FBFAF5",
                borderRadius: 16,
                border: `2px solid ${proofStep2 ? COLORS.coralAccent : COLORS.borderLight}`,
                transition: "all 0.4s ease",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.coralAccent, letterSpacing: "1.2px", marginBottom: 14 }}>
                2. HOMOGENEITY CHECK
              </div>
              <div style={{ fontFamily: TYPOGRAPHY.fontMath, fontSize: 19, lineHeight: 1.6, color: COLORS.textPrimary }}>
                <div>Let c ∈ ℝ, v = (x, y)</div>
                <div>c · v = (cx, cy)</div>
                <div style={{ marginTop: 8, color: COLORS.coralAccent, fontWeight: 700 }}>
                  T(c · v) = (cx + cy, cx - cy)
                </div>
                <div style={{ color: COLORS.coralAccent, fontWeight: 700 }}>
                  = c · (x + y, x - y)
                </div>
                <div style={{ marginTop: 8, fontSize: 22, fontWeight: 800, color: "#1E7E34" }}>
                  = c · T(v)  ✓
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. HANDWRITTEN ANNOTATION (Placed with generous margin) */}
      {frame >= 240 && frame < 780 && (
        <div style={{ position: "absolute", left: 96, top: 695, zIndex: 25 }}>
          <HandwrittenAnnotation
            text="If it breaks either rule, it isn't linear. Period."
            x={0}
            y={0}
            rotation={-1.5}
            color={COLORS.coralAccent}
            highlightBox={true}
          />
        </div>
      )}

      {/* 6. PROF. DOT - Heroic 1.5x presence */}
      <ProfDot
        position={{ x: dotX, y: dotY }}
        scale={1.5}
        expression={characterExpression}
        gesture={characterGesture}
        speaking={isSpeaking}
      />
    </div>
  );
};
