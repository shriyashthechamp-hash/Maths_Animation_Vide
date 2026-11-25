import captionsData from "./captionsData.json";
import { SCENES } from "./sceneTimeline";

export interface CaptionEntry {
  startSec: number;
  endSec: number;
  startFrame: number;
  endFrame: number;
  text: string;
}

const captions: CaptionEntry[] = captionsData;

/**
 * Returns true if the speaker is actively talking at the given global frame,
 * false if there is a silence or pause.
 */
export function isSpeakingAtGlobalFrame(globalFrame: number): boolean {
  for (const cap of captions) {
    if (globalFrame >= cap.startFrame && globalFrame <= cap.endFrame) {
      return true;
    }
  }
  return false;
}

/**
 * Returns true if the speaker is talking at the given scene-local frame.
 */
export function isSpeakingInScene(
  sceneKey: "scene01" | "scene02" | "scene03" | "scene04" | "scene05" | "scene06",
  sceneLocalFrame: number
): boolean {
  const scene = SCENES[sceneKey];
  if (!scene) return false;
  const globalFrame = scene.startFrame + sceneLocalFrame;
  return isSpeakingAtGlobalFrame(globalFrame);
}

/**
 * Returns the current caption text if present, or null during silences.
 */
export function getCaptionAtGlobalFrame(globalFrame: number): string | null {
  for (const cap of captions) {
    if (globalFrame >= cap.startFrame && globalFrame <= cap.endFrame) {
      return cap.text;
    }
  }
  return null;
}
