import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, TYPOGRAPHY } from "../styles/tokens";
import { SwissSceneHeader } from "../components/Typography/SwissTypography";
import { CoordinateGrid } from "../components/CoordinatePlane/CoordinateGrid";
import { VectorArrow } from "../components/Vectors/VectorArrow";
import { MatrixDisplay } from "../components/Matrices/MatrixDisplay";
import { HandwrittenAnnotation } from "../components/Annotations/HandwrittenAnnotation";
import { ProfDot } from "../components/ProfDot/ProfDot";
import { FontLoader } from "../styles/FontLoader";
import { AmbientBackground } from "../components/Ambient/AmbientBackground";
import { isSpeakingInScene } from "../timeline/speechActivity";

export const Scene02Concept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: 0 - 120 (0s - 4s) Intro swarm
  const swarmOpacity = interpolate(frame, [20, 60, 110, 130], [0, 0.7, 0.7, 0], {
    extrapolateRight: "clamp",
  });

  // Phase 2: 114 - 420 (3.8s - 14s) Standard Basis Reveal e1 and e2
  const e1Progress = interpolate(frame, [114, 190], [0, 1], { extrapolateRight: "clamp" });
  const e2Progress = interpolate(frame, [270, 350], [0, 1], { extrapolateRight: "clamp" });
  const basisPointers = interpolate(frame, [350, 400], [0, 1], { extrapolateRight: "clamp" });

  // Phase 3: 420 - 1530 (14s - 51s) General vector linear combination
  const vProgress = interpolate(frame, [430, 520], [0, 1], { extrapolateRight: "clamp" });
  const matrixSpring = spring({ frame: frame - 870, fps, config: { damping: 14 } });
  const bannerSpring = spring({ frame: frame - 1140, fps, config: { damping: 12 } });

  // Presenter scale & position: respectful presence on right
  const dotX = 1460;
  const dotY = 460;

  const characterGesture =
    frame < 120
      ? "comparing"
      : frame < 420
      ? "pointing"
      : frame < 870
      ? "explaining"
      : "concluding";

  const characterExpression =
    frame < 120
      ? "thinking"
      : frame < 420
      ? "realization"
      : frame < 1140
      ? "explaining"
      : "happy";

  const isSpeaking = isSpeakingInScene("scene02", frame);

  // Scatter points
  const scatterPoints = [
    [-2.2, 1.4], [1.8, 2.2], [-1.5, -1.8], [2.8, -1.2], [-2.8, -0.8],
    [0.7, -2.1], [-0.9, 1.9], [3.1, 1.5], [-1.2, 2.7], [2.1, -2.4],
    [-2.6, 2.1], [1.2, 1.8], [-0.5, -1.4], [2.4, 0.9], [-1.8, 0.6]
  ];

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
      <AmbientBackground scene="scene02" />

      {/* 1. BOLD COLOR FIELD: Pale Blue Sidebar behind explanations */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 580,
          height: 1080,
          backgroundColor: COLORS.canvasPaleBlue,
          borderRight: `2px solid rgba(43, 76, 126, 0.2)`,
          zIndex: 2,
        }}
      >
        {/* Decorative corner accent block */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 180,
            height: 180,
            backgroundColor: COLORS.yellowHighlight,
            opacity: 0.15,
            borderTopRightRadius: 40,
          }}
        />
      </div>

      {/* 2. UNIFIED SCENE HEADER */}
      <SwissSceneHeader
        tag="SCENE 02 / THE STANDARD BASIS"
        title={frame < 420 ? "THE BASIS" : "TWO COLUMNS"}
        titleAccent={frame < 420 ? "OF SPACE." : "TELL ALL."}
        subtitle={
          frame < 420
            ? "Instead of tracking infinite points, we track where just two unit vectors land."
            : "Because every vector is a linear combination of e₁ and e₂, the matrix columns hold the destiny of space."
        }
        maxWidth={1200}
      />

      {/* 3. PROMINENT COORDINATE PLANE (Center / Right) */}
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", left: 0, top: 0, zIndex: 4 }}
      >
        <CoordinateGrid
          originX={980}
          originY={640}
          unitSize={140}
          rangeX={[-3, 3]}
          rangeY={[-2, 2.2]}
        />

        {/* Phase 1: Infinite Points Swarm */}
        {swarmOpacity > 0 && (
          <g opacity={swarmOpacity}>
            {scatterPoints.map(([x, y], idx) => (
              <g key={`pt-${idx}`}>
                <circle
                  cx={980 + x * 140}
                  cy={640 - y * 140}
                  r={5}
                  fill={COLORS.coralAccent}
                  opacity={0.7}
                />
                <circle
                  cx={980 + x * 140}
                  cy={640 - y * 140}
                  r={10}
                  fill="none"
                  stroke={COLORS.coralAccent}
                  strokeWidth="1"
                  opacity={0.3}
                />
              </g>
            ))}
          </g>
        )}

        {/* Phase 2: Standard Basis Vectors e1 and e2 */}
        {e1Progress > 0 && (
          <VectorArrow
            originX={980}
            originY={640}
            unitSize={140}
            x={1}
            y={0}
            color={COLORS.cobaltPrimary}
            label="e₁ = (1, 0)"
            progress={e1Progress}
            strokeWidth={4.5}
          />
        )}

        {e2Progress > 0 && (
          <VectorArrow
            originX={980}
            originY={640}
            unitSize={140}
            x={0}
            y={1}
            color={COLORS.coralAccent}
            label="e₂ = (0, 1)"
            labelPosition="left"
            progress={e2Progress}
            strokeWidth={4.5}
          />
        )}

        {/* Phase 3: General Vector v = 2*e1 + 1.8*e2 */}
        {vProgress > 0 && (
          <>
            <line
              x1={980}
              y1={640}
              x2={980 + 2 * 140 * vProgress}
              y2={640}
              stroke={COLORS.cobaltPrimary}
              strokeWidth="2.5"
              strokeDasharray="6 6"
              opacity={0.75}
            />
            <line
              x1={980 + 2 * 140 * vProgress}
              y1={640}
              x2={980 + 2 * 140 * vProgress}
              y2={640 - 1.8 * 140 * vProgress}
              stroke={COLORS.coralAccent}
              strokeWidth="2.5"
              strokeDasharray="6 6"
              opacity={0.75}
            />
            <VectorArrow
              originX={980}
              originY={640}
              unitSize={140}
              x={2}
              y={1.8}
              color={COLORS.textPrimary}
              label="v = 2·e₁ + 1.8·e₂"
              progress={vProgress}
              strokeWidth={4.5}
            />
          </>
        )}
      </svg>

      {/* 4. EXPLANATORY CARDS (Left Pale Blue Sidebar) */}
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 340,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          zIndex: 10,
          width: 440,
        }}
      >
        {/* Basis Vectors Definition Card */}
        {basisPointers > 0 && (
          <div
            style={{
              padding: "22px 28px",
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              border: `2px solid ${COLORS.cobaltPrimary}`,
              boxShadow: "0 12px 32px rgba(43, 76, 126, 0.1)",
              opacity: basisPointers,
              transform: `translateY(${(1 - basisPointers) * 20}px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
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
                STANDARD BASIS
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  backgroundColor: COLORS.cobaltUltraLight,
                  borderRadius: 12,
                  borderLeft: `5px solid ${COLORS.cobaltPrimary}`,
                }}
              >
                <span style={{ fontFamily: TYPOGRAPHY.fontMath, fontSize: 24, color: COLORS.cobaltPrimary, fontWeight: 700 }}>
                  e₁ = (1, 0)ᵀ
                </span>
                <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.cobaltPrimary, fontFamily: TYPOGRAPHY.fontTitle }}>
                  X-AXIS RULER
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  backgroundColor: COLORS.coralUltraLight,
                  borderRadius: 12,
                  borderLeft: `5px solid ${COLORS.coralAccent}`,
                }}
              >
                <span style={{ fontFamily: TYPOGRAPHY.fontMath, fontSize: 24, color: COLORS.coralAccent, fontWeight: 700 }}>
                  e₂ = (0, 1)ᵀ
                </span>
                <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.coralAccent, fontFamily: TYPOGRAPHY.fontTitle }}>
                  Y-AXIS RULER
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Linear Combination Expansion Card (Phase 3) */}
        {frame >= 650 && (
          <div
            style={{
              padding: "22px 28px",
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              border: `2px solid ${COLORS.borderLight}`,
              borderLeft: `5px solid ${COLORS.yellowHighlight}`,
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.06)",
              transform: `scale(${Math.max(0, matrixSpring)})`,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.cobaltPrimary, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 10 }}>
              LINEAR COMBINATION
            </div>
            <div style={{ fontFamily: TYPOGRAPHY.fontMath, fontSize: 26, color: COLORS.textPrimary, lineHeight: 1.3 }}>
              v = x · <span style={{ color: COLORS.cobaltPrimary, fontWeight: 700 }}>e₁</span> + y · <span style={{ color: COLORS.coralAccent, fontWeight: 700 }}>e₂</span>
            </div>
            <div style={{ marginTop: 10, fontSize: 18, fontWeight: 500, color: COLORS.textMuted, fontFamily: TYPOGRAPHY.fontBody, lineHeight: 1.4 }}>
              Knowing T(e₁) and T(e₂) determines T(v) completely!
            </div>
          </div>
        )}

        {/* Matrix Assembly Card */}
        {frame >= 780 && (
          <div
            style={{
              padding: "22px 28px",
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              border: `2px solid ${COLORS.cobaltPrimary}`,
              boxShadow: "0 16px 40px rgba(43, 76, 126, 0.14)",
              transform: `scale(${Math.max(0, matrixSpring)})`,
            }}
          >
            <MatrixDisplay
              label="A ="
              matrix={[
                ["T(e₁)₁", "T(e₂)₁"],
                ["T(e₁)₂", "T(e₂)₂"],
              ]}
              highlightColumn={frame < 950 ? 0 : 1}
              columnLabels={["Col 1: T(e₁)", "Col 2: T(e₂)"]}
              size="medium"
            />
          </div>
        )}
      </div>

      {/* 5. HANDWRITTEN ANNOTATION */}
      {frame >= 350 && frame < 700 && (
        <div style={{ position: "absolute", left: 620, top: 380, zIndex: 12 }}>
          <HandwrittenAnnotation
            text="Every vector in the plane is built from just these two!"
            x={0}
            y={0}
            rotation={-2}
            color={COLORS.cobaltPrimary}
            highlightBox={true}
          />
        </div>
      )}

      {/* 6. BOTTOM TAKEAWAY BANNER */}
      {frame >= 900 && (
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
            transform: `scale(${Math.max(0, bannerSpring)})`,
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
            RULE 02
          </span>
          <div style={{ width: 2, height: 36, backgroundColor: COLORS.borderLight }} />
          <span style={{ fontSize: 28, fontWeight: 800, color: COLORS.cobaltPrimary, fontFamily: TYPOGRAPHY.fontTitle, letterSpacing: "-0.02em" }}>
            THE TWO COLUMNS TELL THE WHOLE STORY
          </span>
          <div style={{ width: 2, height: 36, backgroundColor: COLORS.borderLight }} />
          <span style={{ fontSize: 20, fontWeight: 500, color: COLORS.textMuted, fontFamily: TYPOGRAPHY.fontBody }}>
            Col 1 = Where (1, 0) goes · Col 2 = Where (0, 1) goes
          </span>
        </div>
      )}

      {/* 7. PROF. DOT */}
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
