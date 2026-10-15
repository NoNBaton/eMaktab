import React from "react";

// Иллюстрации для карточек дня в расписании: у каждого дня недели своя.
// Пн — игра в мяч, Вт — парень с телефоном, Ср — парень на велосипеде,
// Чт — девочка на самокате, Пт — парень на скейте, Сб — девушка на велосипеде.

const SKIN1 = "#f1c9a5";
const SKIN2 = "#c98f64";

const CSS = `
@keyframes artRide { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-16px); } }
@keyframes artBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-1.6px); } }
@keyframes artSpin { to { transform: rotate(360deg); } }
@keyframes artBall { 0% { transform: translate(0,0); } 50% { transform: translate(-9px,-8px); } 100% { transform: translate(-19px,15px); } }
@keyframes artJump { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
@keyframes artSkate { 0%,100% { transform: translateX(0) rotate(0deg); } 50% { transform: translateX(-14px) rotate(-3deg); } }
@media (prefers-reduced-motion: reduce) { .art-svg * { animation: none !important; } }
`;

const Frame = ({ children }) => (
  <>
    <style>{CSS}</style>
    <svg
      className="art-svg"
      width="122"
      height="61"
      viewBox="0 0 132 66"
      fill="none"
      style={{ display: "block" }}
    >
      <ellipse cx="80" cy="56" rx="66" ry="17" fill="#4e9a1f" />
      {children}
    </svg>
  </>
);

const line = (d, stroke, w) => (
  <path d={d} stroke={stroke} strokeWidth={w} strokeLinecap="round" />
);

/* ---------- Пн: двое играют в мяч ---------- */
const Ball = () => (
  <>
    <g style={{ animation: "artJump 1.1s ease-in-out infinite" }}>
      {line("M58 46 L52 58", SKIN2, 3.4)}
      {line("M62 46 L69 56", SKIN2, 3.4)}
      <rect x="53.5" y="40" width="12" height="8" rx="3" fill="#b5533c" />
      <rect x="52.5" y="26" width="14" height="16" rx="5" fill="#4b3f5e" />
      {line("M65 31 L76 26", SKIN2, 3)}
      {line("M54 31 L47 38", SKIN2, 3)}
      <circle cx="59.5" cy="21" r="5.2" fill={SKIN2} />
      <path
        d="M54.3 20.5 A5.4 5.4 0 0 1 65 19.5 Q60 17.5 54.3 20.5 Z"
        fill="#2c211c"
      />
    </g>
    <g style={{ animation: "artJump 1.1s .35s ease-in-out infinite" }}>
      {line("M103 32 L100 50", "#2b2f4a", 4.4)}
      {line("M109 32 L113 48", "#2b2f4a", 4.4)}
      <ellipse cx="99" cy="52" rx="3.6" ry="1.8" fill="#1d1f33" />
      <ellipse cx="114" cy="50" rx="3.6" ry="1.8" fill="#1d1f33" />
      <rect x="99.5" y="17" width="13" height="16" rx="4.5" fill="#8aa3c4" />
      {line("M101 20 L95 7", SKIN1, 3)}
      {line("M111 20 L117 6", SKIN1, 3)}
      <circle cx="106" cy="12" r="5" fill={SKIN1} />
      <path
        d="M100.7 11.5 A5.3 5.3 0 0 1 111.2 10.5 Q106 8.5 100.7 11.5 Z"
        fill="#3a2a22"
      />
    </g>
    <circle
      cx="90"
      cy="10"
      r="3.4"
      fill="#8b3a2e"
      style={{ animation: "artBall 1.5s ease-in-out infinite alternate" }}
    />
  </>
);

/* ---------- Вт: парень сидит с телефоном ---------- */
const Reader = () => (
  <g style={{ animation: "artBob 2.4s ease-in-out infinite" }}>
    {line("M98 41 L88 47 L90 57", "#3c58b5", 4.6)}
    {line("M102 41 L112 49 L106 58", "#3c58b5", 4.6)}
    <ellipse cx="91" cy="58.5" rx="4" ry="2" fill="#2a2a33" />
    <ellipse cx="107" cy="59.5" rx="4" ry="2" fill="#2a2a33" />
    <rect x="104" y="25" width="7" height="14" rx="3" fill="#3b3f4a" />
    <rect x="93.5" y="24" width="13" height="18" rx="5" fill="#f4f1ea" />
    {line("M97.5 26 L97 40", "#3b3f4a", 1.6)}
    {line("M97 29 L90 34", SKIN1, 3.2)}
    <rect
      x="85.5"
      y="31"
      width="4"
      height="7.5"
      rx="1"
      fill="#222"
      transform="rotate(-20 87.5 34.5)"
    />
    <circle cx="99" cy="17" r="5.3" fill={SKIN1} />
    <path
      d="M93.5 16.5 A5.6 5.6 0 0 1 104.5 15.5 Q99 12.5 93.5 16.5 Z"
      fill="#5a3b2a"
    />
  </g>
);

/* ---------- Ср / Сб: на велосипеде ---------- */
const Bike = ({ shirt, pants, hair, skin, bag, girl }) => (
  <g style={{ animation: "artRide 5s ease-in-out infinite" }}>
    {[86, 116].map((cx) => (
      <g key={cx}>
        <circle cx={cx} cy="54" r="9.5" stroke="#3b2a2a" strokeWidth="1.8" />
        <g
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            animation: "artSpin .9s linear infinite",
          }}
        >
          <path
            d={`M${cx - 8} 54 H${cx + 8} M${cx} 46 V62`}
            stroke="#3b2a2a"
            strokeWidth="1"
          />
        </g>
      </g>
    ))}
    <path
      d="M86 54 L94 40 M86 54 L98 54 M98 54 L94 38 M94 40 L110 40 M98 54 L110 40 M110 40 L116 54 M110 40 L109 32 L114 32 M92 37 H98"
      stroke="#3b2a2a"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g style={{ animation: "artBob .8s ease-in-out infinite" }}>
      {line("M95 37 L104 45 L100 54", pants, 4.4)}
      <ellipse cx="100" cy="55" rx="3.4" ry="1.7" fill="#2a2a33" />
      {girl && <path d="M101 14 q-9 0 -9 10 q6 -3 9 -7 z" fill={hair} />}
      <ellipse
        cx="95"
        cy="29"
        rx="4.2"
        ry="6.5"
        fill={bag}
        transform="rotate(-20 95 29)"
      />
      {line("M95 36 L103 23", shirt, 9)}
      {line("M103 24 L111 32", skin, 3)}
      <circle cx="105" cy="16" r="5.2" fill={skin} />
      <path
        d="M99.6 15.5 A5.6 5.6 0 0 1 110.6 14 Q105 11.5 99.6 15.5 Z"
        fill={hair}
      />
    </g>
  </g>
);

/* ---------- Чт: девочка на самокате ---------- */
const Scooter = () => (
  <g style={{ animation: "artRide 4.2s ease-in-out infinite" }}>
    <g style={{ animation: "artBob .7s ease-in-out infinite" }}>
      <rect x="42" y="49" width="42" height="3.2" rx="1.6" fill="#3a3d45" />
      {line("M82 50 L79 22 M74 22 L86 22", "#555b66", 2.4)}
      {[47, 85].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="54" r="4.6" fill="#23252b" />
          <circle
            cx={cx}
            cy="54"
            r="3.2"
            stroke="#9aa0b4"
            strokeWidth="1"
            strokeDasharray="2 2.2"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              animation: "artSpin .6s linear infinite",
            }}
          />
        </g>
      ))}
      {line("M62 38 L54 49", SKIN1, 4.2)}
      {line("M65 38 L74 49", SKIN1, 4.2)}
      <rect x="58" y="31" width="13" height="9" rx="3" fill="#3fb8a8" />
      <rect x="58" y="15" width="14" height="18" rx="5" fill="#c9d49a" />
      {line("M68 21 L80 23", SKIN1, 3.4)}
      <circle cx="66" cy="10" r="6" fill={SKIN1} />
      <path
        d="M59 10 a7 7 0 0 1 14 -1 q-4 -3 -8 -1 q-3 1 -6 2 z"
        fill="#f2b84b"
      />
      <path d="M60 9 q-9 2 -10 11 q6 -3 10 -7 z" fill="#f2b84b" />
    </g>
  </g>
);

/* ---------- Пт: парень на скейте ---------- */
const Skater = () => (
  <g style={{ animation: "artSkate 4.6s ease-in-out infinite" }}>
    <g style={{ animation: "artBob .9s ease-in-out infinite" }}>
      <rect x="86" y="55" width="30" height="3.4" rx="1.7" fill="#f2a93b" />
      <circle cx="93" cy="60.5" r="2.2" fill="#2a2a33" />
      <circle cx="109" cy="60.5" r="2.2" fill="#2a2a33" />
      {line("M97 38 L93 54", "#4a3328", 4.6)}
      {line("M105 38 L109 54", "#4a3328", 4.6)}
      <ellipse cx="92" cy="55" rx="3.6" ry="1.8" fill="#222" />
      <ellipse cx="110" cy="55" rx="3.6" ry="1.8" fill="#222" />
      <rect x="93.5" y="20" width="15" height="19" rx="5" fill="#7fc4cf" />
      <rect x="107" y="22" width="5" height="11" rx="2.5" fill="#3b4a55" />
      {line("M95 24 L86 31", SKIN1, 3)}
      {line("M107 24 L116 28", SKIN1, 3)}
      <circle cx="101" cy="13" r="5.4" fill={SKIN1} />
      <path
        d="M95.3 12.5 A5.7 5.7 0 0 1 106.7 11.5 Q101 9 95.3 12.5 Z"
        fill="#6b4a3a"
      />
    </g>
  </g>
);

export default function DayArt({ day }) {
  switch (day) {
    case 1:
      return (
        <Frame>
          <Ball />
        </Frame>
      );
    case 2:
      return (
        <Frame>
          <Reader />
        </Frame>
      );
    case 3:
      return (
        <Frame>
          <Bike
            shirt="#3c58b5"
            pants="#6b4a3a"
            hair="#3a2a22"
            skin={SKIN1}
            bag="#8bc48a"
          />
        </Frame>
      );
    case 5:
      return (
        <Frame>
          <Skater />
        </Frame>
      );
    case 6:
      return (
        <Frame>
          <Bike
            girl
            shirt="#f08c5a"
            pants="#3fb8a8"
            hair="#f2b84b"
            skin={SKIN1}
            bag="#e8b04a"
          />
        </Frame>
      );
    default:
      return (
        <Frame>
          <Scooter />
        </Frame>
      );
  }
}
