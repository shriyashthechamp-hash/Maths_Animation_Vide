import React from "react";
import { Audio, staticFile } from "remotion";

interface AudioTrackProps {
  voiceoverSrc?: string;
  bgmSrc?: string;
  volumeVoice?: number;
  volumeBgm?: number;
}

/**
 * Continuous Master Audio Track for THE MATRIX EFFECT
 * Plays the student voice recording across all six scenes without interruption,
 * layered over soft ambient background music.
 */
export const AudioTrack: React.FC<AudioTrackProps> = ({
  voiceoverSrc = staticFile("voiceover.m4a"),
  bgmSrc = staticFile("bgm.mp3"),
  volumeVoice = 1.0,
  volumeBgm = 0.08,
}) => {
  return (
    <>
      {/* Primary Voiceover (Continuous master timeline) */}
      {voiceoverSrc && <Audio src={voiceoverSrc} volume={volumeVoice} />}

      {/* Ambient BGM (gently ducked beneath voice) */}
      {bgmSrc && <Audio src={bgmSrc} volume={volumeBgm} loop />}
    </>
  );
};
