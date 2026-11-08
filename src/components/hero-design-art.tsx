export function HeroDesignArt() {
  return (
    <svg
      viewBox="0 0 680 560"
      role="img"
      aria-hidden="true"
      focusable="false"
      className="hero-design-art"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hero-design-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3A3A3A" />
          <stop offset="1" stopColor="#141414" />
        </linearGradient>
        <radialGradient id="hero-design-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FBBF01" stopOpacity=".55" />
          <stop offset="1" stopColor="#FBBF01" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Frame */}
      <rect x="0" y="0" width="680" height="560" rx="28" fill="url(#hero-design-sky)" />

      {/* Sun glow and disc */}
      <circle cx="470" cy="190" r="170" fill="url(#hero-design-glow)" />
      <circle cx="470" cy="190" r="74" fill="#FBBF01" />
      <circle cx="470" cy="190" r="100" fill="none" stroke="#FBBF01" strokeOpacity=".35" strokeWidth="2" strokeDasharray="4 10" />

      {/* Dunes */}
      <path d="M0 360 Q140 290 280 340 T560 330 T680 300 L680 560 L0 560 Z" fill="#3A3A3A" />
      <path d="M0 430 Q180 370 330 420 T680 400 L680 560 L0 560 Z" fill="#1F1F1F" />

      {/* Compass rose */}
      <g transform="translate(120 150)" fill="none" stroke="#F5F1E8" strokeOpacity=".55" strokeWidth="2">
        <circle r="54" />
        <circle r="38" strokeOpacity=".3" />
        <path d="M0 -62 L9 0 L0 62 L-9 0 Z" fill="#FBBF01" stroke="none" />
        <path d="M-62 0 L0 -9 L62 0 L0 9 Z" fill="#F5F1E8" fillOpacity=".5" stroke="none" />
        <text y="-70" textAnchor="middle" fill="#F5F1E8" stroke="none" fontFamily="Poppins, Arial, sans-serif" fontSize="12" fontWeight="700">N</text>
      </g>

      {/* Route with waypoints */}
      <path
        d="M90 470 C 190 380, 260 430, 360 330 S 520 260, 600 150"
        fill="none"
        stroke="#FBBF01"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 10"
      />
      <g fill="#141414" stroke="#FBBF01" strokeWidth="3">
        <circle cx="90" cy="470" r="9" />
        <circle cx="360" cy="330" r="9" />
      </g>
      <g fill="#F5F1E8">
        <circle cx="90" cy="470" r="3.5" />
        <circle cx="360" cy="330" r="3.5" />
      </g>

      {/* Destination pin */}
      <g transform="translate(600 150)">
        <path d="M0 -36 C 16 -36, 26 -24, 26 -10 C 26 10, 0 34, 0 34 C 0 34, -26 10, -26 -10 C -26 -24, -16 -36, 0 -36 Z" fill="#FBBF01" />
        <circle cx="0" cy="-10" r="9" fill="#141414" />
      </g>

      {/* Caption card */}
      <g>
        <rect x="40" y="40" width="200" height="62" rx="12" fill="#141414" fillOpacity=".7" stroke="#FBBF01" strokeOpacity=".5" />
        <text x="58" y="66" fill="#FBBF01" fontFamily="Poppins, Arial, sans-serif" fontSize="11" fontWeight="700" letterSpacing="2">DISCOVER</text>
        <text x="58" y="88" fill="#F5F1E8" fontFamily="Poppins, Arial, sans-serif" fontSize="16" fontWeight="700">Algeria, your way</text>
      </g>
    </svg>
  );
}
