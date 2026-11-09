export function HeroDesignArt() {
  return (
    <svg
      viewBox="0 0 640 480"
      role="img"
      aria-hidden="true"
      focusable="false"
      className="hero-design-art"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="hero-art-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FBBF01" stopOpacity=".55" />
          <stop offset="1" stopColor="#FBBF01" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sun glow */}
      <circle cx="470" cy="150" r="170" fill="url(#hero-art-sun)" />
      <circle cx="470" cy="150" r="58" fill="#FBBF01" fillOpacity=".9" />

      {/* Mosque silhouette with dome and minaret */}
      <g fill="#F5F1E8" fillOpacity=".95">
        <path d="M200 330 V270 Q200 200 260 200 Q320 200 320 270 V330 Z" />
        <rect x="186" y="318" width="148" height="12" rx="2" />
        <rect x="335" y="200" width="16" height="130" />
        <path d="M327 178 L343 200 L311 200 Z" />
        <rect x="150" y="296" width="20" height="34" />
        <path d="M140 296 Q160 262 180 296 Z" />
        <rect x="172" y="286" width="6" height="8" fill="#141414" fillOpacity=".4" />
      </g>
      <g fill="#141414" fillOpacity=".35">
        <path d="M232 330 V296 Q232 268 260 268 Q288 268 288 296 V330 Z" />
      </g>

      {/* Arches of a medina colonnade */}
      <g stroke="#FBBF01" strokeWidth="3" fill="none" strokeOpacity=".9">
        <path d="M70 330 V300 Q90 272 110 300 V330" />
        <path d="M112 330 V300 Q132 272 152 300 V330" />
      </g>

      {/* Dunes and sea */}
      <path d="M0 360 Q120 320 240 352 T480 340 T640 330 V480 H0 Z" fill="#3A3A3A" fillOpacity=".7" />
      <path d="M0 400 Q140 372 280 398 T640 392 V480 H0 Z" fill="#141414" fillOpacity=".85" />
      <path d="M40 430 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="#F5F1E8" strokeOpacity=".45" strokeWidth="2" />
      <path d="M380 445 q20 -8 40 0 t40 0 t40 0 t40 0" fill="none" stroke="#F5F1E8" strokeOpacity=".3" strokeWidth="2" />

      {/* Travel route with plane */}
      <path
        d="M60 110 C 150 40, 260 150, 360 90 S 520 40, 590 110"
        fill="none"
        stroke="#FBBF01"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 11"
      />
      <g transform="translate(340 86) rotate(-14)">
        <path d="M0 0 L-26 -8 L-10 0 L-26 8 Z" fill="#FBBF01" />
        <path d="M-2 -2 L16 -14 L20 -10 L6 0 L20 10 L16 14 L-2 2 Z" fill="#F5F1E8" />
      </g>

      {/* Map pins */}
      <g transform="translate(60 110)">
        <path d="M0 -22 C 9 -22, 14 -15, 14 -8 C 14 3, 0 16, 0 16 C 0 16, -14 3, -14 -8 C -14 -15, -9 -22, 0 -22 Z" fill="#FBBF01" />
        <circle cx="0" cy="-8" r="5" fill="#141414" />
      </g>
      <g transform="translate(590 110)">
        <path d="M0 -22 C 9 -22, 14 -15, 14 -8 C 14 3, 0 16, 0 16 C 0 16, -14 3, -14 -8 C -14 -15, -9 -22, 0 -22 Z" fill="#F5F1E8" />
        <circle cx="0" cy="-8" r="5" fill="#141414" />
      </g>

      {/* Compass rose */}
      <g transform="translate(80 205)" stroke="#F5F1E8" strokeOpacity=".7" strokeWidth="1.5" fill="none">
        <circle r="34" />
        <path d="M0 -44 L6 0 L0 44 L-6 0 Z" fill="#FBBF01" fillOpacity=".85" stroke="none" />
        <path d="M-44 0 L0 -6 L44 0 L0 6 Z" fill="#F5F1E8" fillOpacity=".25" stroke="none" />
        <text y="-50" textAnchor="middle" fill="#FBBF01" fontFamily="Inter, Arial, sans-serif" fontSize="12" fontWeight="700" stroke="none">N</text>
      </g>
    </svg>
  );
}
