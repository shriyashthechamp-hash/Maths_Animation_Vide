import React from "react";
import { Composition } from "remotion";
import { MatrixEffect } from "./compositions/MatrixEffect";
import { ReviewOverview } from "./compositions/ReviewOverview";
import { Scene01Hook } from "./scenes/Scene01Hook";
import { Scene02Concept } from "./scenes/Scene02Concept";
import { Scene03Shear } from "./scenes/Scene03Shear";
import { Scene04Linearity } from "./scenes/Scene04Linearity";
import { Scene05MatrixConstruction } from "./scenes/Scene05MatrixConstruction";
import { Scene06Conclusion } from "./scenes/Scene06Conclusion";
import { TOTAL_FRAMES, FPS, SCENES } from "./timeline/sceneTimeline";

export const Root: React.FC = () => {
  return (
    <>
      {/* Complete 5-Minute Master Film */}
      <Composition
        id="TheMatrixEffect"
        component={MatrixEffect}
        durationInFrames={TOTAL_FRAMES} // 9000 frames = 300s = 5m
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Phase 1 Preview & Quality Control Demo (Scene 03 Shear) */}
      <Composition
        id="Phase1Demo"
        component={Scene03Shear}
        durationInFrames={150} // 5s showcase
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Condensed 6-Scene Fast Review Cut */}
      <Composition
        id="ReviewOverview"
        component={ReviewOverview}
        durationInFrames={600} // 20s showcase across all 6 scenes
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Individual Scene Preview Compositions for Studio Editing */}
      <Composition
        id="Scene01-Hook"
        component={Scene01Hook}
        durationInFrames={SCENES.scene01.durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene02-Concept"
        component={Scene02Concept}
        durationInFrames={SCENES.scene02.durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene03-Shear"
        component={Scene03Shear}
        durationInFrames={SCENES.scene03.durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene04-Linearity"
        component={Scene04Linearity}
        durationInFrames={SCENES.scene04.durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene05-Construction"
        component={Scene05MatrixConstruction}
        durationInFrames={SCENES.scene05.durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene06-Conclusion"
        component={Scene06Conclusion}
        durationInFrames={SCENES.scene06.durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
