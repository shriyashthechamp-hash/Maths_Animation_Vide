import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, TYPOGRAPHY } from "../styles/tokens";
import { SwissSceneHeader } from "../components/Typography/SwissTypography";
import { MatrixDisplay } from "../components/Matrices/MatrixDisplay";
import { ProfDot } from "../components/ProfDot/ProfDot";
import { HandwrittenAnnotation } from "../components/Annotations/HandwrittenAnnotation";
import { VectorArrow } from "../components/Vectors/VectorArrow";
import { CoordinateGrid } from "../components/CoordinatePlane/CoordinateGrid";
import { FontLoader } from "../styles/FontLoader";
import { AmbientBackground } from "../components/Ambient/AmbientBackground";
import { isSpeakingInScene } from "../timeline/speechActivity";

export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: 0 - 180 (0s - 6s) Static table conception
  const canvasFade = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const staticMatrixScale = spring({ frame: frame - 10, fps, config: { damping: 14 } });

  // Phase 2: 180 - 520 (6s - 17.3s) Prof. Dot entrance & Stylus Tap
  const dotX = interpolate(frame, [180, 240], [1880, 1420], { extrapolateRight: "clamp" });
  const dotY = 460;

  // Stylus tap at frame 400
  const isTapped = frame >= 400;
  const tapShockwave = interpolate(frame, [400, 460], [0, 180], { extrapolateRight: "clamp" });
  const shockwaveOpacity = interpolate(frame, [400, 460], [0.9, 0], { extrapolateRight: "clamp" });

  // Phase 3: 520 - 750 (17.3s - 25s) Dynamic Space Awakening
  const gridExpansion = interpolate(frame, [520, 600], [0, 1], { extrapolateRight: "clamp" });
  const vectorProg = interpolate(frame, [560, 640], [0, 1], { extrapolateRight: "clamp" });
  const vectorAngle = interpolate(frame, [600, 720], [0, 0.45], { extrapolateRight: "clamp" });

  // Title Climax (frames 650 - 750)
  const titleCardSpring = spring({ frame: frame - 650, fps, config: { damping: 13 } });

  // Character gesture switching
  const characterGesture =
    frame < 360
      ? "explaining"
      : frame < 520
      ? "explaining"
      : frame < 650
      ? "pointing"
      : "introducing";

  const characterExpression =
    frame < 360
      ? "thinking"
      : frame < 460
      ? "explaining"
      : frame < 580
      ? "realization"
      : "happy";

  const isSpeaking = isSpeakingInScene("scene01", frame);

  // Dynamic cobalt wedge expansion
  const cobaltWedgeWidth = interpolate(frame, [0, 180, 400], [420, 560, 620], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: COLORS.background,
        opacity: canvasFade,
        overflow: "hidden",
      }}
    >
      <FontLoader />
      <AmbientBackground scene="scene01" />

      {/* 1. BOLD COLOR FIELD: Right Cobalt Block */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: cobaltWedgeWidth,
          height: 1080,
          backgroundColor: isTapped ? COLORS.canvasCobalt : COLORS.cobaltPrimary,
          zIndex: 2,
          transition: "background-color 0.4s ease",
        }}
      >
        {/* Large Overlapping Bauhaus Circle in Yellow & Coral */}
        <div
          style={{
            position: "absolute",
            right: -100,
            bottom: -80,
            width: 480,
            height: 480,
            borderRadius: "50%",
            backgroundColor: COLORS.yellowHighlight,
            opacity: 0.18,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -80,
            top: 140,
            width: 220,
            height: 220,
            borderRadius: "50%",
            backgroundColor: COLORS.coralAccent,
            opacity: 0.25,
          }}
        />

        {/* Vertical Editorial Rule & Label */}
        <div
          style={{
            position: "absolute",
            left: 32,
            top: 72,
            display: "flex",
            alignItems: "center",
            gap: 16,
            transform: "rotate(90deg)",
            transformOrigin: "left top",
          }}
        >
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontTitle,
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: COLORS.yellowHighlight,
            }}
          >
            TRANSFORMATION ENGINE
          </span>
          <div style={{ width: 48, height: 2, backgroundColor: COLORS.yellowHighlight }} />
        </div>
      </div>

      {/* 2. TOP EDITORIAL SCENE HEADER */}
      <SwissSceneHeader
        tag="SCENE 01 / LINEAR ALGEBRA IN MOTION"
        title={frame < 360 ? "A MATRIX IS NOT" : "A MATRIX IS"}
        titleAccent={frame < 360 ? "A TABLE." : "AN ACTION."}
        subtitle={
          frame < 360
            ? "Four numbers on a page seem lifeless. But in linear algebra, they form an active machine."
            : "Every matrix acts as a geometric transformation that reshapes space continuously."
        }
        maxWidth={1180}
      />

      {/* 3. DYNAMIC COORDINATE PLANE (Awakening in Phase 3) */}
      {gridExpansion > 0 && (
        <svg
          width="1920"
          height="1080"
          style={{ position: "absolute", left: 0, top: 0, zIndex: 4, opacity: gridExpansion }}
        >
          <CoordinateGrid
            originX={680}
            originY={660}
            unitSize={130}
            rangeX={[-3, 3]}
            rangeY={[-2, 2.2]}
            opacity={gridExpansion}
          />

          <VectorArrow
            originX={680}
            originY={660}
            unitSize={130}
            x={1.8 * Math.cos(vectorAngle)}
            y={1.4 + vectorAngle * 1.2}
            color={COLORS.coralAccent}
            label="T(v) = A · v"
            progress={vectorProg}
            strokeWidth={4.5}
          />
        </svg>
      )}

      {/* 4. THE MATRIX DISPLAY CARD */}
      <div
        style={{
          position: "absolute",
          left: gridExpansion > 0 ? 96 : 96,
          top: 360,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          zIndex: 15,
        }}
      >
        <div style={{ position: "relative", transform: `scale(${Math.max(0, staticMatrixScale)})` }}>
          {shockwaveOpacity > 0 && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: tapShockwave * 2,
                height: tapShockwave * 2,
                borderRadius: "50%",
                border: `3px solid ${COLORS.electricBlue}`,
                opacity: shockwaveOpacity,
                pointerEvents: "none",
              }}
            />
          )}

          <div
            style={{
              padding: "26px 36px",
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              border: `2px solid ${isTapped ? COLORS.electricBlue : COLORS.borderLight}`,
              borderLeft: `8px solid ${isTapped ? COLORS.electricBlue : COLORS.coralAccent}`,
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.08)",
            }}
          >
            <MatrixDisplay
              label={isTapped ? "A =" : ""}
              matrix={
                isTapped
                  ? [
                      ["a", "b"],
                      ["c", "d"],
                    ]
                  : [
                      ["1", "-2"],
                      ["3", "4"],
                    ]
              }
              size={gridExpansion > 0 ? "medium" : "large"}
              highlightColumn={isTapped ? 0 : null}
              columnLabels={isTapped ? ["Col 1: Action on e1", "Col 2: Action on e2"] : undefined}
            />
          </div>
        </div>

        {/* Dynamic Annotation */}
        <div style={{ height: 48, position: "relative" }}>
          {frame < 360 ? (
            <HandwrittenAnnotation
              text="Just four numbers in brackets?"
              x={10}
              y={0}
              rotation={-2}
              color={COLORS.coralAccent}
              highlightBox={true}
            />
          ) : (
            <HandwrittenAnnotation
              text="It transforms the entire two-dimensional space!"
              x={10}
              y={0}
              rotation={-1.5}
              color={COLORS.cobaltPrimary}
              highlightBox={true}
            />
          )}
        </div>
      </div>

      {/* 5. CLIMAX BANNER (Frame 650+) */}
      {frame >= 650 && (
        <div
          style={{
            position: "absolute",
            left: 96,
            bottom: 72,
            padding: "22px 36px",
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            border: `2px solid ${COLORS.cobaltPrimary}`,
            boxShadow: "0 16px 40px rgba(43, 76, 126, 0.16)",
            transform: `scale(${Math.max(0, titleCardSpring)})`,
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
            PREMISE 01
          </span>
          <div style={{ width: 2, height: 36, backgroundColor: COLORS.borderLight }} />
          <span
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: COLORS.cobaltPrimary,
              fontFamily: TYPOGRAPHY.fontTitle,
              letterSpacing: "-0.02em",
            }}
          >
            THE MATRIX EFFECT
          </span>
          <div style={{ width: 2, height: 36, backgroundColor: COLORS.borderLight }} />
          <span
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: COLORS.textMuted,
              fontFamily: TYPOGRAPHY.fontBody,
            }}
          >
            How Matrices Reshape 2D Space
          </span>
        </div>
      )}

      {/* 6. PROF. DOT ON COBALT FIELD */}
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
