export interface SceneConfig {
  id: string;
  name: string;
  startSecond: number;
  durationInSeconds: number;
  startFrame: number;
  durationInFrames: number;
}

export const FPS = 30;

/**
 * Synchronized Scene Timeline calibrated to the actual recorded student voiceover
 * (New Recording 3.m4a - duration: 312.58s audio + 5.42s musical/credits resolution = 318.0s)
 */
export const SCENES: Record<string, SceneConfig> = {
  scene01: {
    id: "scene-01-hook",
    name: "The Hook",
    startSecond: 0,
    durationInSeconds: 25.0,
    startFrame: 0,
    durationInFrames: 750, // 25s * 30
  },
  scene02: {
    id: "scene-02-concept",
    name: "The Basis of Space",
    startSecond: 25.0,
    durationInSeconds: 51.0,
    startFrame: 750,
    durationInFrames: 1530, // 51s * 30
  },
  scene03: {
    id: "scene-03-shear",
    name: "Visual Intuition: The Shear",
    startSecond: 76.0,
    durationInSeconds: 61.0,
    startFrame: 2280,
    durationInFrames: 1830, // 61s * 30
  },
  scene04: {
    id: "scene-04-linearity",
    name: "What Makes a Transformation Linear?",
    startSecond: 137.0,
    durationInSeconds: 53.0,
    startFrame: 4110,
    durationInFrames: 1590, // 53s * 30
  },
  scene05: {
    id: "scene-05-construction",
    name: "Matrix Construction & Verification",
    startSecond: 190.0,
    durationInSeconds: 81.0,
    startFrame: 5700,
    durationInFrames: 2430, // 81s * 30
  },
  scene06: {
    id: "scene-06-conclusion",
    name: "Conclusion & Perspective",
    startSecond: 271.0,
    durationInSeconds: 47.0,
    startFrame: 8130,
    durationInFrames: 1410, // 47s * 30
  },
};

export const TOTAL_FRAMES = Object.values(SCENES).reduce(
  (acc, scene) => acc + scene.durationInFrames,
  0
); // 9,540 frames = 318.0s = 5m 18s
