import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, TYPOGRAPHY } from "../styles/tokens";
import { SwissSceneHeader } from "../components/Typography/SwissTypography";
import { CoordinateGrid } from "../components/CoordinatePlane/CoordinateGrid";
import { VectorArrow } from "../components/Vectors/VectorArrow";
import { UnitSquareMorph } from "../components/Geometry/UnitSquareMorph";
import { MatrixDisplay } from "../components/Matrices/MatrixDisplay";
import { HandwrittenAnnotation } from "../components/Annotations/HandwrittenAnnotation";
import { ProfDot } from "../components/ProfDot/ProfDot";
import { FontLoader } from "../styles/FontLoader";
import { AmbientBackground } from "../components/Ambient/AmbientBackground";
import { isSpeakingInScene } from "../timeline/speechActivity";

export const Scene03Shear: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: 0 - 260 (0s - 8.7s) Matrix Entrance & Basis Vectors intro
  const matrixOpacity = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" });
  const matrixY = interpolate(frame, [0, 45], [-20, 0], { extrapolateRight: "clamp" });
  const e1Progress = interpolate(frame, [40, 100], [0, 1], { extrapolateRight: "clamp" });
  const e2Progress = interpolate(frame, [80, 140], [0, 1], { extrapolateRight: "clamp" });

  // Phase 2: 260 - 580 (8.7s - 19.3s) Basis vector e1 moves up to (1, 1), e2 stays locked
  const e1ShearProgress = interpolate(frame, [260, 460], [0, 1], { extrapolateRight: "clamp" });
  const lockIconOpacity = interpolate(frame, [580, 640], [0, 1], { extrapolateRight: "clamp" });

  // Phase 3: 830 - 1190 (27.6s - 39.6s) General mapping formula reveals
  const formulaSpring = spring({ frame: frame - 1190, fps, config: { damping: 14 } });

  // Phase 4: 1190 - 1830 (39.6s - 61s) Complete Full-Grid Shear & Parallelogram Morph
  const fullGridShear = interpolate(frame, [1190, 1440], [0, 1], { extrapolateRight: "clamp" });

  // Combined shear progress
  const currentShear = Math.max(e1ShearProgress, fullGridShear);
  const currentE1Y = 0 + 1 * currentShear;

  // Active column highlight
  const activeCol = frame < 580 ? 0 : frame < 830 ? 1 : null;

  // Presenter scale & position
  const dotX = 1460;
  const dotY = 460;

  const characterGesture =
    frame < 260
      ? "explaining"
      : frame < 830
      ? "pointing"
      : frame < 1190
      ? "noting"
      : "concluding";

  const characterExpression =
    frame < 260
      ? "explaining"
      : frame < 830
      ? "realization"
      : frame < 1190
      ? "thinking"
      : "happy";

  const isSpeaking = isSpeakingInScene("scene03", frame);

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
      <AmbientBackground scene="scene03" />

      {/* 1. BOLD COLOR FIELD: Diagonal Geometric Wedge on Right */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 540,
          height: 1080,
          backgroundColor: COLORS.canvasPaleBlue,
          borderLeft: `2px solid rgba(43, 76, 126, 0.15)`,
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 320,
            height: 320,
            borderRadius: "50%",
            backgroundColor: COLORS.cobaltPrimary,
            opacity: 0.08,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 40,
            width: 160,
            height: 160,
            borderRadius: "50%",
            backgroundColor: COLORS.yellowHighlight,
            opacity: 0.2,
          }}
        />
      </div>

      {/* 2. UNIFIED SCENE HEADER */}
      <SwissSceneHeader
        tag="SCENE 03 / GEOMETRIC INTUITION"
        title={frame < 420 ? "THE MATRIX S" : frame < 1260 ? "COLUMN ONE" : "THE GRID"}
        titleAccent={frame < 420 ? "IN ACTION." : frame < 1260 ? "SLIDES UP." : "SHEARS."}
        subtitle={
          frame < 420
            ? "A concrete numerical matrix: watch how the columns directly transform the unit square."
            : frame < 1260
            ? "Column 1 climbs to (1, 1) while Column 2 stays strictly locked at (0, 1)."
            : "The square morphs into a parallelogram of area 1 — preserving gridline parallelism and area."
        }
        maxWidth={1220}
      />

      {/* 3. MATRIX DISPLAY CARD (Left Margin) */}
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 320,
          opacity: matrixOpacity,
          transform: `translateY(${matrixY}px)`,
          zIndex: 10,
          width: 400,
        }}
      >
        <div
          style={{
            padding: "24px 30px",
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            border: `2px solid ${activeCol === 0 ? COLORS.electricBlue : activeCol === 1 ? COLORS.coralAccent : COLORS.borderLight}`,
            borderLeft: `8px solid ${activeCol === 0 ? COLORS.electricBlue : activeCol === 1 ? COLORS.coralAccent : COLORS.cobaltPrimary}`,
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.07)",
          }}
        >
          <MatrixDisplay
            label="S ="
            matrix={[
              ["1", "0"],
              ["1", "1"],
            ]}
            size="medium"
            highlightColumn={activeCol}
            columnLabels={["Col 1: (1, 1)", "Col 2: (0, 1)"]}
          />
        </div>
      </div>

      {/* 4. GENERAL MAPPING FORMULA CARD (Phase 3) */}
      {frame >= 840 && (
        <div
          style={{
            position: "absolute",
            left: 96,
            top: 560,
            padding: "22px 30px",
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            border: `2px solid ${COLORS.borderLight}`,
            borderLeft: `6px solid ${COLORS.electricBlue}`,
            boxShadow: "0 14px 36px rgba(0, 0, 0, 0.06)",
            transform: `scale(${Math.max(0, formulaSpring)})`,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            width: 420,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
              GENERAL MAPPING
            </span>
          </div>
          <div style={{ fontFamily: TYPOGRAPHY.fontMath, fontSize: 24, color: COLORS.textPrimary, lineHeight: 1.3 }}>
            S(x, y) = x · <span style={{ color: COLORS.cobaltPrimary, fontWeight: 700 }}>(1, 1)ᵀ</span> + y · <span style={{ color: COLORS.coralAccent, fontWeight: 700 }}>(0, 1)ᵀ</span>
          </div>
          <div style={{ fontFamily: TYPOGRAPHY.fontMath, fontSize: 24, color: COLORS.cobaltPrimary, fontWeight: 700 }}>
            = (x, x + y)ᵀ
          </div>
        </div>
      )}

      {/* 5. MAIN COORDINATE GRID (Center) */}
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", left: 0, top: 0, zIndex: 5 }}
      >
        <CoordinateGrid
          originX={760}
          originY={660}
          unitSize={140}
          rangeX={[-2, 3]}
          rangeY={[-1, 2.0]}
          shearProgress={fullGridShear}
        />

        {/* Dynamic Unit Square Morphing into Parallelogram */}
        <UnitSquareMorph
          originX={760}
          originY={660}
          unitSize={140}
          progress={currentShear}
          fillOpacity={0.18}
        />

        {/* e1 Vector (Sliding upward to (1, 1)) */}
        {e1Progress > 0 && (
          <VectorArrow
            originX={760}
            originY={660}
            unitSize={140}
            x={1}
            y={currentE1Y}
            color={COLORS.cobaltPrimary}
            label={currentShear > 0.8 ? "S(e₁) = (1, 1)" : "e₁ = (1, 0)"}
            progress={e1Progress}
            strokeWidth={4.5}
          />
        )}

        {/* e2 Vector (Stays strictly anchored at (0, 1)) */}
        {e2Progress > 0 && (
          <VectorArrow
            originX={760}
            originY={660}
            unitSize={140}
            x={0}
            y={1}
            color={COLORS.coralAccent}
            label="S(e₂) = (0, 1)"
            labelPosition="left"
            progress={e2Progress}
            strokeWidth={4.5}
          />
        )}

        {/* Lock indicator badge at e2 */}
        {lockIconOpacity > 0 && (
          <g transform={`translate(${760 - 88}, ${660 - 140 - 44})`} opacity={lockIconOpacity}>
            <rect x="0" y="0" width="76" height="28" rx="6" fill={COLORS.yellowHighlight} stroke={COLORS.textPrimary} strokeWidth="1.5" />
            <text x="38" y="19" textAnchor="middle" fontSize="13" fontWeight="800" fill={COLORS.textPrimary} fontFamily={TYPOGRAPHY.fontTitle} letterSpacing="0.08em">
              LOCKED
            </text>
          </g>
        )}

        {/* Dynamic Parallelogram Area Callout */}
        {currentShear > 0.5 && (
          <g transform={`translate(${760 + 90}, ${660 - 70})`}>
            <rect x="-10" y="-18" width="170" height="34" rx="8" fill="rgba(255, 255, 255, 0.96)" stroke={COLORS.cobaltPrimary} strokeWidth="1.5" />
            <text x="75" y="5" textAnchor="middle" fontSize="15" fontWeight="800" fill={COLORS.cobaltPrimary} fontFamily={TYPOGRAPHY.fontTitle}>
              Area = 1 · det(S) = 1
            </text>
          </g>
        )}
      </svg>

      {/* 6. HANDWRITTEN ANNOTATION */}
      {frame >= 480 && frame < 840 && (
        <div style={{ position: "absolute", left: 680, top: 440, zIndex: 12 }}>
          <HandwrittenAnnotation
            text="Column 1 lands at (1, 1)! Column 2 stays locked at (0, 1)."
            x={0}
            y={0}
            rotation={-2}
            color={COLORS.cobaltPrimary}
            highlightBox={true}
          />
        </div>
      )}

      {/* 7. BOTTOM TAKEAWAY BANNER */}
      {frame >= 1380 && (
        <div
          style={{
            position: "absolute",
            left: 96,
            bottom: 72,
            padding: "22px 36px",
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            border: `2px solid ${COLORS.cobaltPrimary}`,
            boxShadow: "0 16px 40px rgba(43, 76, 126, 0.18)",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontTitle,
              fontSize: 16,
              fontWeight: 800,
              backgroundColor: COLORS.cobaltPrimary,
              color: "#FFFFFF",
              padding: "6px 14px",
              borderRadius: 8,
              letterSpacing: "0.1em",
            }}
          >
            RULE 03
          </span>
          <div style={{ width: 2, height: 36, backgroundColor: COLORS.borderLight }} />
          <span style={{ fontSize: 28, fontWeight: 800, color: COLORS.cobaltPrimary, fontFamily: TYPOGRAPHY.fontTitle, letterSpacing: "-0.02em" }}>
            THE UNIT SQUARE BECOMES A PARALLELOGRAM
          </span>
          <div style={{ width: 2, height: 36, backgroundColor: COLORS.borderLight }} />
          <span style={{ fontSize: 20, fontWeight: 500, color: COLORS.textMuted, fontFamily: TYPOGRAPHY.fontBody }}>
            Area is preserved · Determinant = (1)(1) - (0)(1) = 1
          </span>
        </div>
      )}

      {/* 8. PROF. DOT */}
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
