export const COLORS = {
  // Approved Brand Canvas & Backgrounds
  background: "#FBFAF5",       // Warm off-white
  canvasDark: "#1F1F1F",         // Deep black
  canvasCobalt: "#2B4C7E",       // Deep Cobalt
  canvasElectric: "#315CBA",     // Electric Blue
  canvasCoral: "#E85D4A",        // Coral
  canvasSoftCoral: "#E47763",    // Soft Coral
  canvasPaleBlue: "#DCE7F7",     // Pale Blue field
  canvasPaleCoral: "#F7DDD6",    // Pale Coral field
  canvasPaleYellow: "#FFF6D1",   // Pale Yellow field
  canvasMuted: "#F2EFE8",
  
  // Typography
  textPrimary: "#1F1F1F",        // Deep black
  textMuted: "#4A4A45",
  textLight: "#7A7A75",
  textInverted: "#FBFAF5",       // Crisp off-white on dark/cobalt
  textYellow: "#FFE45E",

  // Mathematical Geometry (Cobalt & Coral)
  cobaltPrimary: "#2B4C7E",      // Deep Cobalt
  electricBlue: "#315CBA",       // Electric Blue
  cobaltLight: "#4D78DE",
  cobaltMuted: "#264894",
  cobaltPale: "#DCE7F7",
  cobaltUltraLight: "#EDF2FB",
  
  coralAccent: "#E85D4A",        // Vibrant Coral
  softCoral: "#E47763",          // Soft Coral
  coralLight: "#F08F7D",
  coralPale: "#F7DDD6",
  coralUltraLight: "#FDF2F0",

  // Annotations & Highlights
  yellowHighlight: "#FFE45E",    // Signal Yellow
  yellowPale: "#FFF2B8",
  yellowUltraLight: "#FFFBEA",
  
  // Grids & Structural Lines
  gridLine: "#E0DDD5",
  gridAxis: "#1F1F1F",
  gridSubtle: "#ECE9E0",
  borderLight: "#D6D2C8",
  borderDark: "#1F1F1F",

  // Character Palette (Prof. Dot)
  character: {
    skin: "#FDEFE5",
    skinShadow: "#E8D0C0",
    hair: "#2E241F",
    jacketCobalt: "#2B4C7E",
    jacketShadow: "#1D3559",
    hoodieCream: "#F4F1EA",
    shirtWhite: "#FFFFFF",
    pantsCharcoal: "#2B2B2B",
    shoesCream: "#ECE7DE",
    glassesBlack: "#1F1F1F",
    blush: "#F7A899",
  }
} as const;

export const TYPOGRAPHY = {
  fontTitle: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
  fontBody: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  fontHandwriting: "'Caveat', cursive, sans-serif",
  fontMath: "'KaTeX_Main', 'Computer Modern', 'STIX Two Math', serif",

  // Approved 1920x1080 Hierarchy Scale
  scale: {
    heroTitle: 88,          // 76 - 104px
    sectionHeading: 54,     // 48 - 64px
    supportingText: 32,     // 30 - 36px
    label: 26,              // 24 - 28px
    annotation: 24,         // 20 - 24px
  }
} as const;

export const LAYOUT = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInSeconds: 300, // 5 minutes
  totalFrames: 9000,
  margins: {
    top: 72,
    bottom: 72,
    left: 96,
    right: 96,
  },
} as const;
