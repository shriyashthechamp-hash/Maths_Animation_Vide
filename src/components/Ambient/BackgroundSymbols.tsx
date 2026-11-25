import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, TYPOGRAPHY } from "../../styles/tokens";

interface SymbolItem {
  symbol: string;
  x: number;
  y: number;
  size: number;
  color?: string;
  period?: number;
  phase?: number;
  driftRange?: number;
}

interface BackgroundSymbolsProps {
  symbols: SymbolItem[];
  opacity?: number;
}

export const BackgroundSymbols: React.FC<BackgroundSymbolsProps> = ({
  symbols,
  opacity = 0.07,
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1920,
        height: 1080,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {symbols.map((item, idx) => {
        const period = item.period || 450; // ~15s
        const phase = item.phase || idx * 60;
        const drift = item.driftRange ?? 14;

        // Subtle vertical floating motion
        const offsetY = Math.sin(((frame + phase) * 2 * Math.PI) / period) * drift;
        const offsetX = Math.cos(((frame + phase * 0.8) * 2 * Math.PI) / (period * 1.4)) * (drift * 0.6);

        return (
          <div
            key={`math-sym-${idx}`}
            style={{
              position: "absolute",
              left: item.x + offsetX,
              top: item.y + offsetY,
              fontFamily: TYPOGRAPHY.fontMath,
              fontSize: item.size,
              fontWeight: 700,
              color: item.color || COLORS.textPrimary,
              opacity,
              userSelect: "none",
              letterSpacing: "0.02em",
            }}
          >
            {item.symbol}
          </div>
        );
      })}
    </div>
  );
};
