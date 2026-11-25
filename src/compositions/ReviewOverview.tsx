import React from "react";
import { Series } from "remotion";
import { Scene01Hook } from "../scenes/Scene01Hook";
import { Scene02Concept } from "../scenes/Scene02Concept";
import { Scene03Shear } from "../scenes/Scene03Shear";
import { Scene04Linearity } from "../scenes/Scene04Linearity";
import { Scene05MatrixConstruction } from "../scenes/Scene05MatrixConstruction";
import { Scene06Conclusion } from "../scenes/Scene06Conclusion";
import { FontLoader } from "../styles/FontLoader";

/**
 * ReviewOverview
 * A rapid 600-frame (20-second) condensed review cut
 * cycling through key moments of all 6 scenes.
 */
export const ReviewOverview: React.FC = () => {
  return (
    <>
      <FontLoader />
      <Series>
        {/* Scene 01 Hook Key Moment: frame 650-750 */}
        <Series.Sequence durationInFrames={100} offset={650}>
          <Scene01Hook />
        </Series.Sequence>

        {/* Scene 02 Concept Key Moment: frame 350-450 */}
        <Series.Sequence durationInFrames={100} offset={350}>
          <Scene02Concept />
        </Series.Sequence>

        {/* Scene 03 Shear Key Moment: frame 600-700 */}
        <Series.Sequence durationInFrames={100} offset={600}>
          <Scene03Shear />
        </Series.Sequence>

        {/* Scene 04 Linearity Key Moment: frame 550-650 */}
        <Series.Sequence durationInFrames={100} offset={550}>
          <Scene04Linearity />
        </Series.Sequence>

        {/* Scene 05 Construction Key Moment: frame 1400-1500 */}
        <Series.Sequence durationInFrames={100} offset={1400}>
          <Scene05MatrixConstruction />
        </Series.Sequence>

        {/* Scene 06 Conclusion Key Moment: frame 500-600 */}
        <Series.Sequence durationInFrames={100} offset={500}>
          <Scene06Conclusion />
        </Series.Sequence>
      </Series>
    </>
  );
};
