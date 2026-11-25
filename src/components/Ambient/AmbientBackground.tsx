import React from "react";
import { COLORS } from "../../styles/tokens";
import { FloatingShapes, FloatingShapeConfig } from "./FloatingShapes";
import { AmbientGrid } from "./AmbientGrid";
import { BackgroundSymbols } from "./BackgroundSymbols";

export type ScenePreset =
  | "scene01"
  | "scene02"
  | "scene03"
  | "scene04"
  | "scene05"
  | "scene06";

interface AmbientBackgroundProps {
  scene: ScenePreset;
  customShapes?: FloatingShapeConfig[];
  gridOpacity?: number;
  symbolsOpacity?: number;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({
  scene,
  customShapes,
  gridOpacity,
  symbolsOpacity,
}) => {
  // Preset Configurations tailored to each scene's narrative & geometric mood
  switch (scene) {
    case "scene01": {
      // SCENE 01 — THE HOOK
      // Strong geometric composition, large cropped cobalt & coral forms, slow expanding circular element
      const shapes: FloatingShapeConfig[] = [
        {
          type: "circle",
          baseX: 1720,
          baseY: 820,
          size: 780,
          color: COLORS.cobaltUltraLight,
          opacity: 0.12,
          driftX: 25,
          driftY: 20,
          period: 420,
        },
        {
          type: "semicircle",
          baseX: 180,
          baseY: 960,
          size: 440,
          color: COLORS.coralUltraLight,
          opacity: 0.1,
          driftX: 20,
          driftY: 15,
          rotationSpeed: 4,
          period: 380,
        },
        {
          type: "arc",
          baseX: 1580,
          baseY: 220,
          size: 320,
          color: COLORS.cobaltPrimary,
          opacity: 0.08,
          rotationSpeed: 6,
          period: 480,
        },
        {
          type: "pill",
          baseX: 1120,
          baseY: 140,
          size: 240,
          color: COLORS.canvasMuted,
          opacity: 0.14,
          driftX: 30,
          driftY: 10,
          period: 540,
        },
      ];

      const symbols = [
        { symbol: "ℝ²", x: 260, y: 160, size: 36, color: COLORS.cobaltPrimary },
        { symbol: "T : ℝ² → ℝ²", x: 1200, y: 180, size: 28, color: COLORS.textMuted },
        { symbol: "A · v", x: 1680, y: 380, size: 30, color: COLORS.cobaltPrimary },
        { symbol: "det(A)", x: 420, y: 920, size: 26, color: COLORS.coralAccent },
      ];

      return (
        <>
          <AmbientGrid opacity={gridOpacity ?? 0.1} speed={0.2} spacing={180} />
          <FloatingShapes shapes={customShapes || shapes} />
          <BackgroundSymbols symbols={symbols} opacity={symbolsOpacity ?? 0.08} />
        </>
      );
    }

    case "scene02": {
      // SCENE 02 — BASIS VECTORS
      // Faint coordinate grid, large translucent geometric forms, subtle vector-inspired lines supporting basis
      const shapes: FloatingShapeConfig[] = [
        {
          type: "circle",
          baseX: 1680,
          baseY: 760,
          size: 720,
          color: COLORS.cobaltUltraLight,
          opacity: 0.11,
          driftX: 20,
          driftY: 25,
          period: 400,
        },
        {
          type: "semicircle",
          baseX: 1460,
          baseY: 260,
          size: 360,
          color: COLORS.coralUltraLight,
          opacity: 0.09,
          rotationSpeed: -5,
          period: 440,
        },
        {
          type: "rect",
          baseX: 340,
          baseY: 880,
          size: 300,
          color: COLORS.canvasMuted,
          opacity: 0.12,
          rotationSpeed: 3,
          period: 500,
        },
      ];

      const symbols = [
        { symbol: "e₁ = (1, 0)ᵀ", x: 480, y: 170, size: 28, color: COLORS.cobaltPrimary },
        { symbol: "e₂ = (0, 1)ᵀ", x: 1140, y: 170, size: 28, color: COLORS.coralAccent },
        { symbol: "Span{e₁, e₂}", x: 1540, y: 340, size: 26, color: COLORS.textMuted },
        { symbol: "v = c₁e₁ + c₂e₂", x: 280, y: 920, size: 28, color: COLORS.cobaltPrimary },
      ];

      return (
        <>
          <AmbientGrid opacity={gridOpacity ?? 0.09} speed={0.22} spacing={160} />
          <FloatingShapes shapes={customShapes || shapes} />
          <BackgroundSymbols symbols={symbols} opacity={symbolsOpacity ?? 0.07} />
        </>
      );
    }

    case "scene03": {
      // SCENE 03 — SHEAR
      // Abstract parallelogram-inspired shapes, subtle coordinate lines, complements shear transformation
      const shapes: FloatingShapeConfig[] = [
        {
          type: "circle",
          baseX: 1720,
          baseY: 820,
          size: 800,
          color: COLORS.cobaltUltraLight,
          opacity: 0.1,
          driftX: 22,
          driftY: 18,
          period: 450,
        },
        {
          type: "rect",
          baseX: 1520,
          baseY: 280,
          size: 340,
          color: COLORS.canvasMuted,
          opacity: 0.12,
          rotationSpeed: 4,
          period: 420,
        },
        {
          type: "arc",
          baseX: 380,
          baseY: 900,
          size: 400,
          color: COLORS.cobaltPrimary,
          opacity: 0.06,
          rotationSpeed: -4,
          period: 520,
        },
      ];

      const symbols = [
        { symbol: "S = [[1, 0], [1, 1]]", x: 1180, y: 160, size: 26, color: COLORS.cobaltPrimary },
        { symbol: "Area = 1", x: 1580, y: 380, size: 28, color: COLORS.coralAccent },
        { symbol: "y' = x + y", x: 420, y: 170, size: 26, color: COLORS.textMuted },
        { symbol: "det(S) = 1", x: 1420, y: 920, size: 28, color: COLORS.cobaltPrimary },
      ];

      return (
        <>
          <AmbientGrid opacity={gridOpacity ?? 0.08} speed={0.18} spacing={190} />
          <FloatingShapes shapes={customShapes || shapes} />
          <BackgroundSymbols symbols={symbols} opacity={symbolsOpacity ?? 0.07} />
        </>
      );
    }

    case "scene04": {
      // SCENE 04 — LINEARITY
      // Two distinct background accent regions for additivity (left/cobalt) and homogeneity (right/coral)
      const shapes: FloatingShapeConfig[] = [
        {
          type: "circle",
          baseX: 280,
          baseY: 860,
          size: 520,
          color: COLORS.cobaltUltraLight,
          opacity: 0.12,
          driftX: 18,
          driftY: 20,
          period: 420,
        },
        {
          type: "circle",
          baseX: 1660,
          baseY: 860,
          size: 520,
          color: COLORS.coralUltraLight,
          opacity: 0.12,
          driftX: -18,
          driftY: 20,
          period: 420,
        },
        {
          type: "pill",
          baseX: 960,
          baseY: 140,
          size: 320,
          color: COLORS.canvasMuted,
          opacity: 0.1,
          driftX: 25,
          driftY: 8,
          period: 480,
        },
      ];

      const symbols = [
        { symbol: "T(u + v) = T(u) + T(v)", x: 220, y: 170, size: 25, color: COLORS.cobaltPrimary },
        { symbol: "T(c · v) = c · T(v)", x: 1240, y: 170, size: 25, color: COLORS.coralAccent },
        { symbol: "T(0) = 0", x: 780, y: 170, size: 26, color: COLORS.textMuted },
        { symbol: "Linearity Axioms", x: 1480, y: 920, size: 24, color: COLORS.textMuted },
      ];

      return (
        <>
          <AmbientGrid opacity={gridOpacity ?? 0.08} speed={0.16} spacing={180} />
          <FloatingShapes shapes={customShapes || shapes} />
          <BackgroundSymbols symbols={symbols} opacity={symbolsOpacity ?? 0.07} />
        </>
      );
    }

    case "scene05": {
      // SCENE 05 — MATRIX CONSTRUCTION
      // Matrix-inspired rectangular forms, faint column structures, subtle vertical movement
      const shapes: FloatingShapeConfig[] = [
        {
          type: "circle",
          baseX: 1700,
          baseY: 780,
          size: 750,
          color: COLORS.cobaltUltraLight,
          opacity: 0.11,
          driftX: 20,
          driftY: 22,
          period: 460,
        },
        {
          type: "rect",
          baseX: 1460,
          baseY: 280,
          size: 360,
          color: COLORS.canvasMuted,
          opacity: 0.12,
          rotationSpeed: 3,
          period: 400,
        },
        {
          type: "pill",
          baseX: 340,
          baseY: 900,
          size: 260,
          color: COLORS.coralUltraLight,
          opacity: 0.09,
          driftX: 24,
          driftY: 12,
          period: 500,
        },
      ];

      const symbols = [
        { symbol: "[ T(e₁) | T(e₂) ]", x: 1200, y: 160, size: 28, color: COLORS.cobaltPrimary },
        { symbol: "M · v = T(v)", x: 420, y: 160, size: 26, color: COLORS.textMuted },
        { symbol: "v = (3, 2)ᵀ", x: 1540, y: 360, size: 26, color: COLORS.coralAccent },
        { symbol: "(5, 1)ᵀ", x: 1380, y: 920, size: 30, color: COLORS.cobaltPrimary },
      ];

      return (
        <>
          <AmbientGrid opacity={gridOpacity ?? 0.09} speed={0.2} spacing={170} />
          <FloatingShapes shapes={customShapes || shapes} />
          <BackgroundSymbols symbols={symbols} opacity={symbolsOpacity ?? 0.07} />
        </>
      );
    }

    case "scene06": {
      // SCENE 06 — CONCLUSION & SYNTHESIS
      // Brings back visual motifs from Scene 01, elegant slow movement, visual closure
      const shapes: FloatingShapeConfig[] = [
        {
          type: "circle",
          baseX: 1720,
          baseY: 820,
          size: 820,
          color: COLORS.cobaltUltraLight,
          opacity: 0.12,
          driftX: 22,
          driftY: 18,
          period: 480,
        },
        {
          type: "semicircle",
          baseX: 220,
          baseY: 920,
          size: 420,
          color: COLORS.coralUltraLight,
          opacity: 0.1,
          rotationSpeed: 3,
          period: 420,
        },
        {
          type: "arc",
          baseX: 1540,
          baseY: 260,
          size: 340,
          color: COLORS.cobaltPrimary,
          opacity: 0.07,
          rotationSpeed: -4,
          period: 520,
        },
      ];

      const symbols = [
        { symbol: "Space in Motion", x: 1200, y: 160, size: 26, color: COLORS.cobaltPrimary },
        { symbol: "T(x) = Ax", x: 420, y: 160, size: 28, color: COLORS.textMuted },
        { symbol: "Linear Algebra", x: 1520, y: 380, size: 24, color: COLORS.coralAccent },
        { symbol: "Q.E.D.", x: 1440, y: 920, size: 32, color: COLORS.cobaltPrimary },
      ];

      return (
        <>
          <AmbientGrid opacity={gridOpacity ?? 0.08} speed={0.16} spacing={190} />
          <FloatingShapes shapes={customShapes || shapes} />
          <BackgroundSymbols symbols={symbols} opacity={symbolsOpacity ?? 0.07} />
        </>
      );
    }
  }
};
