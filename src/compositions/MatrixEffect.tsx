import React from "react";
import { Series } from "remotion";
import { SCENES } from "../timeline/sceneTimeline";
import { Scene01Hook } from "../scenes/Scene01Hook";
import { Scene02Concept } from "../scenes/Scene02Concept";
import { Scene03Shear } from "../scenes/Scene03Shear";
import { Scene04Linearity } from "../scenes/Scene04Linearity";
import { Scene05MatrixConstruction } from "../scenes/Scene05MatrixConstruction";
import { Scene06Conclusion } from "../scenes/Scene06Conclusion";
import { AudioTrack } from "../components/AudioController/AudioTrack";
import { Captions } from "../components/Captions/Captions";
import { FontLoader } from "../styles/FontLoader";

export const MatrixEffect: React.FC = () => {
  return (
    <>
      <FontLoader />
      {/* Background Audio Infrastructure */}
      <AudioTrack />

      {/* Frame-Accurate 6-Scene Series */}
      <Series>
        <Series.Sequence durationInFrames={SCENES.scene01.durationInFrames}>
          <Scene01Hook />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENES.scene02.durationInFrames}>
          <Scene02Concept />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENES.scene03.durationInFrames}>
          <Scene03Shear />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENES.scene04.durationInFrames}>
          <Scene04Linearity />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENES.scene05.durationInFrames}>
          <Scene05MatrixConstruction />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENES.scene06.durationInFrames}>
          <Scene06Conclusion />
        </Series.Sequence>
      </Series>

      {/* Synchronized Captions Layer */}
      <Captions />
    </>
  );
};
