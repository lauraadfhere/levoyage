export type DestinationPictureKind = "sea" | "ksar" | "desert";

const scenes: Record<DestinationPictureKind, { sky: string; far: string; near: string; accent: string }> = {
  sea: { sky: "#cfe9f7", far: "#7fb8d6", near: "#2f7aa6", accent: "#fbbf01" },
  ksar: { sky: "#f6e6c4", far: "#d9a86a", near: "#8a5a2b", accent: "#fbbf01" },
  desert: { sky: "#f9dfb0", far: "#e7b56b", near: "#c98a3e", accent: "#fbbf01" },
};

export function DestinationPicture({ kind, label }: { kind: DestinationPictureKind; label: string }) {
  const s = scenes[kind];
  return (
    <div className={`destination-picture destination-picture-${kind}`} role="img" aria-label={label}>
      <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <rect width="320" height="180" fill={s.sky} />
        <circle cx="250" cy="48" r="20" fill={s.accent} />
        {kind === "sea" ? (
          <>
            <rect y="92" width="320" height="88" fill={s.far} />
            <path d="M0 120 Q40 108 80 120 T160 120 T240 120 T320 120" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2" />
            <path d="M0 140 Q40 128 80 140 T160 140 T240 140 T320 140" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2" />
            <path d="M0 110 L60 70 L120 110 Z" fill={s.near} />
            <path d="M150 110 L210 62 L270 110 Z" fill={s.near} />
          </>
        ) : null}
        {kind === "ksar" ? (
          <>
            <path d="M0 180 V112 H40 V92 H70 V112 H120 V130 H160 V102 H200 V84 H230 V118 H280 V96 H320 V180 Z" fill={s.far} />
            <path d="M92 60 Q102 36 112 60 Z" fill={s.near} />
            <path d="M232 60 Q242 36 252 60 Z" fill={s.near} />
            <path d="M0 150 H320 V180 H0 Z" fill={s.near} />
            <path d="M140 180 V150 Q150 136 160 150 V180" fill="none" stroke={s.sky} strokeWidth="3" />
          </>
        ) : null}
        {kind === "desert" ? (
          <>
            <path d="M0 120 Q80 80 160 118 T320 110 V180 H0 Z" fill={s.far} />
            <path d="M0 150 Q100 120 200 150 T320 146 V180 H0 Z" fill={s.near} />
            <path d="M40 130 L44 118 L48 130 M48 118 V102" fill="none" stroke={s.near} strokeWidth="2" />
            <path d="M200 124 L203 114 L207 124 M207 114 V100" fill="none" stroke={s.near} strokeWidth="2" />
          </>
        ) : null}
      </svg>
    </div>
  );
}
