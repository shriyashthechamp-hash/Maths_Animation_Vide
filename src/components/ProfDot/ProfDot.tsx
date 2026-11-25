import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS } from "../../styles/tokens";

export type Expression = "neutral" | "explaining" | "thinking" | "realization" | "happy" | "focused";
export type Gesture = "introducing" | "explaining" | "pointing" | "comparing" | "summarizing" | "noting" | "concluding";
export type Viseme = "M_REST" | "M_A_AH" | "M_E_EE" | "M_O_OH" | "M_U_OO";

interface ProfDotProps {
  expression?: Expression;
  gesture?: Gesture;
  viseme?: Viseme;
  scale?: number;
  position?: { x: number; y: number };
  speaking?: boolean;
  desk?: boolean; // When true, renders the lecture desk from the design bible
  deskColor?: string;
}

export const ProfDot: React.FC<ProfDotProps> = ({
  expression = "explaining",
  gesture = "explaining",
  viseme = "M_REST",
  scale = 1.2,
  position = { x: 0, y: 0 },
  speaking = false,
  desk = false,
  deskColor = "#E6A15C",
}) => {
  const frame = useCurrentFrame();

  // Natural breathing idle oscillation
  const breathY = Math.sin((frame / 30) * Math.PI) * 2.5;
  const breathScale = 1 + Math.sin((frame / 30) * Math.PI) * 0.006;

  // Natural blinking (blink every 110 frames, lasting 4 frames)
  const blinkCycle = frame % 115;
  const isBlinking = blinkCycle > 111;

  // Speaking mouth cycle if speaking = true
  const activeViseme: Viseme = speaking
    ? (["M_A_AH", "M_E_EE", "M_O_OH", "M_REST"][(Math.floor(frame / 4)) % 4] as Viseme)
    : viseme;

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y + breathY,
        transform: `scale(${scale * breathScale})`,
        transformOrigin: "bottom center",
        width: 360,
        height: 520,
        pointerEvents: "none",
        zIndex: 50, // High z-index so character is never behind random cards
      }}
    >
      <svg
        viewBox="0 0 360 520"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="soft-shadow-dot" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#111111" floodOpacity="0.10" />
          </filter>
        </defs>

        {/* --- OPTIONAL DESK PODIUM (From Design Bible) --- */}
        {desk && (
          <g id="desk-podium" transform="translate(0, 360)">
            {/* Wooden Desk Top */}
            <path
              d="M 20 40 L 340 40 L 320 150 L 0 150 Z"
              fill={deskColor}
              stroke="#D48B43"
              strokeWidth="3"
            />
            {/* Front Panel Shadow */}
            <path
              d="M 0 60 L 320 60 L 320 150 L 0 150 Z"
              fill="rgba(0, 0, 0, 0.08)"
            />
          </g>
        )}

        {/* --- LEGS & LOWER BODY (If not behind desk) --- */}
        {!desk && (
          <g id="lower-body">
            {/* Left Leg */}
            <rect x="148" y="370" width="26" height="100" rx="8" fill={COLORS.character.pantsCharcoal} />
            {/* Right Leg */}
            <rect x="190" y="370" width="26" height="100" rx="8" fill={COLORS.character.pantsCharcoal} />
            {/* Left Shoe */}
            <path d="M 136 462 Q 136 450 155 450 L 178 450 Q 182 468 178 474 L 136 474 Z" fill={COLORS.character.shoesCream} stroke="#D4CEC2" strokeWidth="2.5" />
            {/* Right Shoe */}
            <path d="M 186 450 L 210 450 Q 228 450 228 462 L 228 474 L 186 474 Z" fill={COLORS.character.shoesCream} stroke="#D4CEC2" strokeWidth="2.5" />
          </g>
        )}

        {/* --- TORSO & CLOTHING --- */}
        <g id="torso">
          {/* White inner undershirt */}
          <path d="M 160 220 L 202 220 L 200 380 L 162 380 Z" fill={COLORS.character.shirtWhite} />
          
          {/* Cream Hoodie Lining & V-Neck */}
          <path d="M 150 210 L 212 210 L 206 380 L 156 380 Z" fill={COLORS.character.hoodieCream} />
          <path d="M 164 215 L 181 250 L 198 215 Z" fill={COLORS.character.skin} />
          {/* Hoodie drawstrings */}
          <path d="M 168 232 Q 165 272 168 290" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M 194 232 Q 197 272 194 290" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {/* Cobalt Blue Open Jacket */}
          <path
            d="M 130 215 Q 165 205 181 208 L 170 380 L 124 380 Q 118 285 130 215 Z"
            fill={COLORS.character.jacketCobalt}
            filter="url(#soft-shadow-dot)"
          />
          <path
            d="M 232 215 Q 197 205 181 208 L 192 380 L 238 380 Q 244 285 232 215 Z"
            fill={COLORS.character.jacketCobalt}
            filter="url(#soft-shadow-dot)"
          />
          {/* Jacket collar folds */}
          <path d="M 130 215 L 165 255 L 161 305 L 136 250 Z" fill={COLORS.character.jacketShadow} />
          <path d="M 232 215 L 197 255 L 201 305 L 226 250 Z" fill={COLORS.character.jacketShadow} />
        </g>

        {/* --- GESTURE ARMS --- */}
        {(gesture === "explaining" || gesture === "pointing") && (
          <g id="gesture-explaining">
            {/* Left Arm relaxed */}
            <path d="M 125 225 Q 108 285 120 330" stroke={COLORS.character.jacketCobalt} strokeWidth="26" strokeLinecap="round" fill="none" />
            <circle cx="120" cy="335" r="11" fill={COLORS.character.skin} />
            {/* Right Arm pointing towards mathematics */}
            <path d="M 232 225 Q 275 250 305 225" stroke={COLORS.character.jacketCobalt} strokeWidth="26" strokeLinecap="round" fill="none" />
            <circle cx="305" cy="225" r="12" fill={COLORS.character.skin} />
            {/* Pointing index finger */}
            <path d="M 305 225 L 334 212" stroke={COLORS.character.skin} strokeWidth="8" strokeLinecap="round" />
            {/* Stylus in hand */}
            <line x1="300" y1="230" x2="340" y2="205" stroke="#111111" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        )}

        {gesture === "introducing" && (
          <g id="gesture-introducing">
            {/* Both arms open welcoming */}
            <path d="M 125 225 Q 90 250 70 285" stroke={COLORS.character.jacketCobalt} strokeWidth="26" strokeLinecap="round" fill="none" />
            <circle cx="70" cy="285" r="12" fill={COLORS.character.skin} />
            <path d="M 235 225 Q 270 250 290 285" stroke={COLORS.character.jacketCobalt} strokeWidth="26" strokeLinecap="round" fill="none" />
            <circle cx="290" cy="285" r="12" fill={COLORS.character.skin} />
          </g>
        )}

        {gesture === "comparing" && (
          <g id="gesture-comparing">
            {/* Hands cupped balancing left vs right */}
            <path d="M 125 225 Q 100 275 130 305" stroke={COLORS.character.jacketCobalt} strokeWidth="26" strokeLinecap="round" fill="none" />
            <circle cx="130" cy="305" r="12" fill={COLORS.character.skin} />
            <path d="M 235 225 Q 260 275 230 305" stroke={COLORS.character.jacketCobalt} strokeWidth="26" strokeLinecap="round" fill="none" />
            <circle cx="230" cy="305" r="12" fill={COLORS.character.skin} />
          </g>
        )}

        {gesture === "summarizing" && (
          <g id="gesture-summarizing">
            {/* Arms folded confidently */}
            <path d="M 125 225 Q 150 295 195 295" stroke={COLORS.character.jacketCobalt} strokeWidth="26" strokeLinecap="round" fill="none" />
            <path d="M 235 225 Q 210 295 165 295" stroke={COLORS.character.jacketShadow} strokeWidth="24" strokeLinecap="round" fill="none" />
          </g>
        )}

        {gesture === "noting" && (
          <g id="gesture-noting">
            {/* Holding tablet & writing with stylus */}
            <rect x="155" y="260" width="56" height="70" rx="5" fill="#DCDAD2" stroke="#111111" strokeWidth="2.5" />
            <path d="M 125 225 Q 138 285 165 295" stroke={COLORS.character.jacketCobalt} strokeWidth="24" strokeLinecap="round" fill="none" />
            <path d="M 235 225 Q 220 275 195 285" stroke={COLORS.character.jacketCobalt} strokeWidth="24" strokeLinecap="round" fill="none" />
            <line x1="195" y1="285" x2="180" y2="272" stroke="#111111" strokeWidth="4.5" strokeLinecap="round" />
          </g>
        )}

        {gesture === "concluding" && (
          <g id="gesture-concluding">
            {/* Right hand raised with one finger in air */}
            <path d="M 125 225 Q 108 285 120 330" stroke={COLORS.character.jacketCobalt} strokeWidth="26" strokeLinecap="round" fill="none" />
            <circle cx="120" cy="335" r="11" fill={COLORS.character.skin} />
            <path d="M 232 225 Q 250 190 262 155" stroke={COLORS.character.jacketCobalt} strokeWidth="26" strokeLinecap="round" fill="none" />
            <circle cx="262" cy="155" r="12" fill={COLORS.character.skin} />
            <path d="M 262 155 L 264 128" stroke={COLORS.character.skin} strokeWidth="8" strokeLinecap="round" />
          </g>
        )}

        {/* --- HEAD & FACE --- */}
        <g id="head" transform="translate(0, 0)">
          {/* Neck */}
          <rect x="165" y="188" width="32" height="34" rx="5" fill={COLORS.character.skin} />
          <path d="M 165 210 Q 181 220 197 210 Z" fill={COLORS.character.skinShadow} />

          {/* Ears */}
          <circle cx="120" cy="155" r="12" fill={COLORS.character.skin} />
          <circle cx="242" cy="155" r="12" fill={COLORS.character.skin} />

          {/* Face Base */}
          <path
            d="M 126 145 Q 124 202 181 208 Q 238 202 236 145 Q 232 95 181 95 Q 130 95 126 145 Z"
            fill={COLORS.character.skin}
          />

          {/* Cheeks Blush */}
          <ellipse cx="142" cy="168" rx="10" ry="5" fill={COLORS.character.blush} opacity="0.65" />
          <ellipse cx="220" cy="168" rx="10" ry="5" fill={COLORS.character.blush} opacity="0.65" />

          {/* --- EYES & EYEBROWS --- */}
          {/* Eyebrows */}
          {expression === "thinking" ? (
            <g id="eyebrows-thinking">
              <path d="M 141 125 Q 156 130 167 132" stroke={COLORS.character.hair} strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M 195 123 Q 206 116 221 119" stroke={COLORS.character.hair} strokeWidth="4.5" strokeLinecap="round" fill="none" />
            </g>
          ) : expression === "realization" ? (
            <g id="eyebrows-realization">
              <path d="M 140 117 Q 154 111 167 117" stroke={COLORS.character.hair} strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M 195 117 Q 208 111 222 117" stroke={COLORS.character.hair} strokeWidth="4.5" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            <g id="eyebrows-normal">
              <path d="M 141 123 Q 156 118 167 125" stroke={COLORS.character.hair} strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M 195 125 Q 206 118 221 123" stroke={COLORS.character.hair} strokeWidth="4.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* Eyes (Blinking or Open) */}
          {isBlinking ? (
            <g id="eyes-blinking">
              <path d="M 144 152 Q 156 158 165 152" stroke="#111111" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M 197 152 Q 206 158 218 152" stroke="#111111" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </g>
          ) : expression === "happy" ? (
            <g id="eyes-happy">
              <path d="M 144 153 Q 156 144 165 153" stroke="#111111" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M 197 153 Q 206 144 218 153" stroke="#111111" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            <g id="eyes-open">
              {/* Left Eye */}
              <circle cx="155" cy="151" r="8" fill="#111111" />
              <circle cx="157" cy="149" r="3" fill="#FFFFFF" />
              {/* Right Eye */}
              <circle cx="207" cy="151" r="8" fill="#111111" />
              <circle cx="209" cy="149" r="3" fill="#FFFFFF" />
            </g>
          )}

          {/* Round Glasses */}
          <g id="glasses">
            <circle cx="155" cy="151" r="20" fill="none" stroke={COLORS.character.glassesBlack} strokeWidth="4" />
            <circle cx="207" cy="151" r="20" fill="none" stroke={COLORS.character.glassesBlack} strokeWidth="4" />
            {/* Bridge */}
            <path d="M 175 149 Q 181 144 187 149" stroke={COLORS.character.glassesBlack} strokeWidth="4" fill="none" />
            {/* Side Frames */}
            <line x1="135" y1="150" x2="122" y2="154" stroke={COLORS.character.glassesBlack} strokeWidth="3.5" />
            <line x1="227" y1="150" x2="240" y2="154" stroke={COLORS.character.glassesBlack} strokeWidth="3.5" />
          </g>

          {/* Nose */}
          <path d="M 179 157 Q 182 164 185 163" stroke="#E0BBA2" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {/* Mouth / Viseme Rig */}
          {activeViseme === "M_REST" && (
            <path d="M 172 179 Q 181 184 190 179" stroke="#111111" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          )}
          {activeViseme === "M_A_AH" && (
            <path d="M 170 176 Q 181 193 192 176 Z" fill="#881B1B" stroke="#111111" strokeWidth="3" />
          )}
          {activeViseme === "M_E_EE" && (
            <path d="M 168 179 Q 181 185 194 179 L 192 184 Q 181 188 170 184 Z" fill="#FFFFFF" stroke="#111111" strokeWidth="3" />
          )}
          {activeViseme === "M_O_OH" && (
            <ellipse cx="181" cy="180" rx="7" ry="8" fill="#881B1B" stroke="#111111" strokeWidth="3" />
          )}
          {activeViseme === "M_U_OO" && (
            <ellipse cx="181" cy="180" rx="5" ry="5" fill="#881B1B" stroke="#111111" strokeWidth="3" />
          )}

          {/* --- WAVY BROWN HAIR --- */}
          <g id="hair">
            <path
              d="M 120 145 Q 107 95 158 78 Q 181 69 210 78 Q 255 89 245 145 Q 255 117 238 100 Q 210 83 181 84 Q 147 86 126 117 Q 117 131 120 145 Z"
              fill={COLORS.character.hair}
            />
            {/* Front Fringe Tufts */}
            <path d="M 136 106 Q 158 95 170 117 Q 153 114 136 106 Z" fill={COLORS.character.hair} />
            <path d="M 164 100 Q 187 89 198 114 Q 181 110 164 100 Z" fill={COLORS.character.hair} />
            <path d="M 192 102 Q 221 95 227 123 Q 210 114 192 102 Z" fill={COLORS.character.hair} />
            {/* Playful Cowlick Tuft */}
            <path d="M 153 80 Q 147 55 164 61 Q 167 72 161 80 Z" fill={COLORS.character.hair} />
          </g>
        </g>
      </svg>
    </div>
  );
};
