import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, TYPOGRAPHY } from "../styles/tokens";
import { SwissSceneHeader } from "../components/Typography/SwissTypography";
import { MatrixDisplay } from "../components/Matrices/MatrixDisplay";
import { ProfDot } from "../components/ProfDot/ProfDot";
import { FontLoader } from "../styles/FontLoader";
import { AmbientBackground } from "../components/Ambient/AmbientBackground";
import { isSpeakingInScene } from "../timeline/speechActivity";

export const Scene05MatrixConstruction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: 0 - 860 Setup empty matrix brackets & function intro
  const setupSpring = spring({ frame: frame - 40, fps, config: { damping: 14 } });

  // Phase 2: 860 - 1060 Step 1: e1 = (1, 0) -> (1, 1) docks into Column 1
  const col1Done = frame >= 960;

  // Phase 3: 1060 - 1350 Step 2: e2 = (0, 1) -> (1, -1) docks into Column 2
  const col2Done = frame >= 1200;
  const matrixBuilt = frame >= 1350;

  // Phase 4: 1770 - 2130 Dual Verification Box reveals & Method A runs
  const verificationSpring = spring({ frame: frame - 1770, fps, config: { damping: 14 } });
  const methodAResolved = frame >= 1950;

  // Phase 5: 2130 - 2430 Method B Matrix Multiplication runs & convergence
  const methodBResolved = frame >= 2200;
  const convergenceSpring = spring({ frame: frame - 2260, fps, config: { damping: 12 } });

  // Presenter scale & position
  const dotX = 1440;
  const dotY = 440;

  const characterGesture =
    frame < 860
      ? "explaining"
      : frame < 1060
      ? "pointing"
      : frame < 1350
      ? "pointing"
      : frame < 1770
      ? "comparing"
      : "concluding";

  const characterExpression =
    frame < 860
      ? "focused"
      : frame < 1060
      ? "explaining"
      : frame < 1350
      ? "realization"
      : frame < 2200
      ? "thinking"
      : "happy";

  const isSpeaking = isSpeakingInScene("scene05", frame);

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
      <AmbientBackground scene="scene05" />

      {/* 1. BOLD COLOR FIELD: Pale Blue Column Section on Right */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 580,
          height: 1080,
          backgroundColor: COLORS.canvasPaleBlue,
          borderLeft: `2px solid rgba(43, 76, 126, 0.15)`,
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 120,
            right: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            backgroundColor: COLORS.yellowHighlight,
            opacity: 0.25,
          }}
        />
      </div>

      {/* 2. UNIFIED SCENE HEADER */}
      <SwissSceneHeader
        tag="SCENE 05 / MATRIX CONSTRUCTION & VERIFICATION"
        title={frame < 600 ? "CONSTRUCTING" : frame < 1590 ? "DOCKING" : "DUAL"}
        titleAccent={frame < 600 ? "MATRIX M." : frame < 1590 ? "THE COLUMNS." : "VERIFICATION."}
        subtitle={
          frame < 600
            ? "T(x, y) = (x + y, x - y): We evaluate the two standard basis vectors to build the matrix."
            : frame < 1590
            ? "Column 1 is T(e₁) = (1, 1)ᵀ. Column 2 is T(e₂) = (1, -1)ᵀ. The matrix is complete."
            : "Testing on v = (3, 2)ᵀ: Method A (formula) and Method B (matrix multiplication) must yield the exact same vector."
        }
        titleSize={74}
        subtitleSize={26}
        maxWidth={1240}
      />

      {/* 3. DYNAMIC STEP CARDS & MATRIX CANVAS */}
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 280,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          zIndex: 10,
        }}
      >
        {/* Step Evaluation Cards */}
        <div style={{ display: "flex", gap: 24 }}>
          {/* Step 1: e1 (Cobalt) */}
          <div
            style={{
              width: 440,
              padding: "22px 26px",
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              border: `2px solid ${frame >= 600 ? COLORS.cobaltPrimary : COLORS.borderLight}`,
              borderLeft: `6px solid ${COLORS.cobaltPrimary}`,
              boxShadow: "0 12px 32px rgba(43, 76, 126, 0.08)",
              opacity: frame >= 500 ? 1 : 0.45,
              transition: "all 0.4s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
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
                COL 1 : EVALUATE E₁
              </span>
            </div>
            <div style={{ fontFamily: TYPOGRAPHY.fontMath, fontSize: 18, color: COLORS.textMuted }}>
              Input: e₁ = (1, 0)ᵀ
            </div>
            <div style={{ fontFamily: TYPOGRAPHY.fontMath, fontSize: 26, fontWeight: 800, color: COLORS.cobaltPrimary, marginTop: 6 }}>
              T(1, 0) = (1+0, 1-0) = <span style={{ textDecoration: "underline" }}>(1, 1)ᵀ</span>
            </div>
          </div>

          {/* Step 2: e2 (Coral) */}
          <div
            style={{
              width: 440,
              padding: "22px 26px",
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              border: `2px solid ${frame >= 1110 ? COLORS.coralAccent : COLORS.borderLight}`,
              borderLeft: `6px solid ${COLORS.coralAccent}`,
              boxShadow: "0 12px 32px rgba(232, 93, 74, 0.08)",
              opacity: frame >= 1110 ? 1 : 0.45,
              transition: "all 0.4s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
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
                COL 2 : EVALUATE E₂
              </span>
            </div>
            <div style={{ fontFamily: TYPOGRAPHY.fontMath, fontSize: 18, color: COLORS.textMuted }}>
              Input: e₂ = (0, 1)ᵀ
            </div>
            <div style={{ fontFamily: TYPOGRAPHY.fontMath, fontSize: 26, fontWeight: 800, color: COLORS.coralAccent, marginTop: 6 }}>
              T(0, 1) = (0+1, 0-1) = <span style={{ textDecoration: "underline" }}>(1, -1)ᵀ</span>
            </div>
          </div>
        </div>

        {/* Matrix Assembly Stage */}
        <div
          style={{
            padding: "24px 32px",
            backgroundColor: "#FFFFFF",
            borderRadius: 22,
            border: `2px solid ${matrixBuilt ? COLORS.cobaltPrimary : COLORS.borderLight}`,
            boxShadow: "0 16px 40px rgba(0,0,0,0.06)",
            width: 904,
            transform: `scale(${Math.max(0, setupSpring)})`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <MatrixDisplay
              label="M ="
              matrix={[
                [col1Done ? "1" : "?", col2Done ? "1" : "?"],
                [col1Done ? "1" : "?", col2Done ? "-1" : "?"],
              ]}
              highlightColumn={col1Done && !col2Done ? 0 : col2Done ? null : null}
              columnLabels={["Col 1: T(e₁)", "Col 2: T(e₂)"]}
              size="large"
            />

            {matrixBuilt && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  padding: "18px 24px",
                  backgroundColor: COLORS.cobaltUltraLight,
                  borderRadius: 14,
                  border: `2px solid rgba(43, 76, 126, 0.25)`,
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 800, color: COLORS.cobaltPrimary, fontFamily: TYPOGRAPHY.fontTitle, letterSpacing: "0.08em" }}>
                  MATRIX M COMPLETE
                </span>
                <span style={{ fontSize: 15, fontWeight: 500, color: COLORS.textMuted, fontFamily: TYPOGRAPHY.fontBody }}>
                  Every vector in ℝ² transforms via M · v!
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Dual Verification Panel (Phase 4 & 5) */}
        {frame >= 1770 && (
          <div
            style={{
              padding: "24px 32px",
              backgroundColor: "#FFFFFF",
              borderRadius: 22,
              border: `2px solid ${COLORS.textPrimary}`,
              boxShadow: "0 20px 48px rgba(0, 0, 0, 0.08)",
              width: 904,
              transform: `scale(${Math.max(0, verificationSpring)})`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span
                  style={{
                    fontFamily: TYPOGRAPHY.fontTitle,
                    fontSize: 14,
                    fontWeight: 800,
                    backgroundColor: COLORS.textPrimary,
                    color: "#FFFFFF",
                    padding: "4px 10px",
                    borderRadius: 6,
                    letterSpacing: "0.1em",
                  }}
                >
                  TEST VECTOR
                </span>
                <span style={{ fontSize: 22, fontWeight: 800, fontFamily: TYPOGRAPHY.fontMath, color: COLORS.textPrimary }}>
                  v = (3, 2)ᵀ
                </span>
              </div>
              <span style={{ fontSize: 15, fontWeight: 600, color: COLORS.textMuted, fontFamily: TYPOGRAPHY.fontBody }}>
                Independent Proof
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {/* Method A: Formula */}
              <div
                style={{
                  padding: "18px 22px",
                  backgroundColor: COLORS.cobaltUltraLight,
                  borderRadius: 14,
                  border: `1.5px solid rgba(43, 76, 126, 0.25)`,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 800, color: COLORS.cobaltPrimary, letterSpacing: "1px", marginBottom: 8 }}>
                  METHOD A: DIRECT FORMULA
                </div>
                <div style={{ fontFamily: TYPOGRAPHY.fontMath, fontSize: 19, color: COLORS.textPrimary }}>
                  T(3, 2) = (3 + 2, 3 - 2)
                </div>
                {methodAResolved && (
                  <div style={{ fontFamily: TYPOGRAPHY.fontMath, fontSize: 26, fontWeight: 800, color: COLORS.cobaltPrimary, marginTop: 8 }}>
                    = (5, 1)ᵀ
                  </div>
                )}
              </div>

              {/* Method B: Matrix Mult */}
              <div
                style={{
                  padding: "18px 22px",
                  backgroundColor: COLORS.coralUltraLight,
                  borderRadius: 14,
                  border: `1.5px solid rgba(232, 93, 74, 0.25)`,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 800, color: COLORS.coralAccent, letterSpacing: "1px", marginBottom: 8 }}>
                  METHOD B: M · v MULTIPLICATION
                </div>
                <div style={{ fontFamily: TYPOGRAPHY.fontMath, fontSize: 19, color: COLORS.textPrimary }}>
                  [1·3 + 1·2, 1·3 + (-1)·2]ᵀ
                </div>
                {methodBResolved && (
                  <div style={{ fontFamily: TYPOGRAPHY.fontMath, fontSize: 26, fontWeight: 800, color: COLORS.coralAccent, marginTop: 8 }}>
                    = (5, 1)ᵀ
                  </div>
                )}
              </div>
            </div>

            {/* Final Convergence Celebration */}
            {frame >= 2260 && (
              <div
                style={{
                  marginTop: 18,
                  padding: "14px 22px",
                  backgroundColor: COLORS.yellowUltraLight,
                  borderRadius: 14,
                  border: `2px solid ${COLORS.yellowHighlight}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 18,
                  transform: `scale(${Math.max(0, convergenceSpring)})`,
                }}
              >
                <span style={{ fontSize: 24, fontWeight: 900, color: COLORS.textPrimary, fontFamily: TYPOGRAPHY.fontTitle }}>
                  (5, 1)ᵀ = (5, 1)ᵀ  ✓
                </span>
                <span style={{ fontSize: 16, fontWeight: 800, color: COLORS.cobaltPrimary, fontFamily: TYPOGRAPHY.fontBody }}>
                  PERFECT CONVERGENCE! MATRIX MULTIPLICATION VERIFIED.
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. PROF. DOT */}
      <ProfDot
        position={{ x: dotX, y: dotY }}
        scale={1.48}
        expression={characterExpression}
        gesture={characterGesture}
        speaking={isSpeaking}
      />
    </div>
  );
};
