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
        {/* Gives every stroke a slightly wobbly, hand-inked edge */}
        <filter id="hero-art-ink" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      <g filter="url(#hero-art-ink)" fill="none" stroke="#F5F1E8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Soft sun glow behind the sun */}
        <circle cx="470" cy="130" r="78" stroke="#FBBF01" strokeOpacity=".25" strokeWidth="1.4" strokeDasharray="2 8" />

        {/* Hand-drawn sun with rays */}
        <circle cx="470" cy="130" r="48" stroke="#FBBF01" strokeWidth="2.8" />
        <path d="M470 60 L470 72 M470 188 L470 200 M400 130 L412 130 M528 130 L540 130 M483 73 L491 65 M449 187 L441 195 M449 73 L441 65 M483 187 L491 195" stroke="#FBBF01" strokeWidth="2.4" />

        {/* Mosque with dome and minaret, outlined */}
        <path d="M170 330 V270 Q170 212 228 212 Q286 212 286 270 V330" />
        <path d="M158 330 H298" />
        <path d="M300 330 V200 M312 330 V200" />
        <path d="M300 200 Q306 176 312 200" />
        <path d="M306 176 V166" />
        <path d="M228 212 V196" stroke="#FBBF01" />

        {/* Arches of a medina colonnade */}
        <path d="M60 330 V300 Q80 272 100 300 V330 M104 330 V300 Q124 272 144 300 V330" stroke="#FBBF01" strokeWidth="2.4" />

        {/* Sea and dunes as loose wavy lines */}
        <path d="M40 350 Q120 330 200 350 T360 350 T520 350 T620 346" stroke="#FBBF01" strokeOpacity=".8" />
        <path d="M40 372 Q140 356 240 372 T440 372 T620 368" strokeOpacity=".6" />
        <path d="M60 396 Q160 384 260 396 T460 396 T620 392" strokeOpacity=".4" />

        {/* Hand-drawn travel route with a dashed trail */}
        <path
          d="M70 150 C 160 90, 250 190, 350 130 S 500 80, 600 160"
          stroke="#FBBF01"
          strokeWidth="2.6"
          strokeDasharray="3 9"
        />
        <g transform="translate(352 124) rotate(-14)" stroke="#FBBF01" strokeWidth="2">
          <path d="M-18 0 L14 -6 M14 -6 L20 0 L14 6 Z M-6 0 L-14 -12 M-6 0 L-14 12" />
        </g>

        {/* Map pins drawn as outlines */}
        <path d="M70 150 C 62 150, 58 144, 58 138 C 58 130, 70 116, 70 116 C 70 116, 82 130, 82 138 C 82 144, 78 150, 70 150 Z" stroke="#FBBF01" />
        <circle cx="70" cy="136" r="3.5" stroke="#FBBF01" />
        <path d="M600 160 C 592 160, 588 154, 588 148 C 588 140, 600 126, 600 126 C 600 126, 612 140, 612 148 C 612 154, 608 160, 600 160 Z" />
        <circle cx="600" cy="146" r="3.5" />

        {/* Hand-drawn compass */}
        <g transform="translate(96 386)" stroke="#F5F1E8" strokeOpacity=".7">
          <circle r="30" />
          <path d="M0 -40 L6 0 L0 40 L-6 0 Z" stroke="#FBBF01" />
          <path d="M-40 0 L40 0" strokeOpacity=".4" />
        </g>

        {/* Minaret and small palm on the far right */}
        <path d="M540 330 V236 M548 330 V236 M540 236 Q544 216 548 236 M544 216 V204" stroke="#F5F1E8" strokeOpacity=".8" />
        <path d="M560 330 V298 M560 298 Q540 290 528 300 M560 298 Q580 288 594 298 M560 298 Q552 280 566 270" stroke="#FBBF01" strokeWidth="2" />

        {/* Tent and camel on the dunes */}
        <path d="M236 380 L262 344 L288 380 Z M262 344 V380" stroke="#FBBF01" strokeWidth="2" />
        <path d="M330 378 Q336 364 348 368 L356 360 L362 370 Q372 372 368 382 H330 Z M338 382 V394 M356 382 V394" stroke="#F5F1E8" strokeOpacity=".75" strokeWidth="2" />

        {/* Dune ridge lines */}
        <path d="M300 420 Q360 404 430 420 T600 418" strokeOpacity=".35" />

        {/* Hand-drawn luggage tag on the right */}
        <g transform="translate(470 300) rotate(8)" stroke="#F5F1E8" strokeOpacity=".85">
          <path d="M0 0 H96 L118 22 L96 44 H0 Z" />
          <circle cx="16" cy="22" r="5" />
          <path d="M40 16 H84 M40 28 H72" strokeOpacity=".5" />
        </g>
      </g>
    </svg>
  );
}
