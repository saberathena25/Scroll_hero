// An original, hand-drawn top-down retro coupe. Front of the car points down the page.
// Drawn in plain SVG (no image files), so it stays sharp at any size and loads instantly.

const BODY =
  "M60 6 C86 6 97 22 97 52 L99 118 C99 152 95 200 91 234 C87 260 75 276 60 276 " +
  "C45 276 33 260 29 234 C25 200 21 152 21 118 L23 52 C23 22 34 6 60 6 Z";

export default function Car() {
  return (
    <svg
      viewBox="0 0 120 290"
      className="car-svg block h-full w-auto overflow-visible"
      role="img"
      aria-label="A small orange retro coupe seen from above"
    >
      <defs>
        <linearGradient id="car-body" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#c43d1c" />
          <stop offset="0.5" stopColor="#f2643d" />
          <stop offset="1" stopColor="#c43d1c" />
        </linearGradient>
        <linearGradient id="car-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#32434e" />
          <stop offset="1" stopColor="#0e161b" />
        </linearGradient>
        <linearGradient id="car-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe9a8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffe9a8" stopOpacity="0" />
        </linearGradient>
        <clipPath id="car-clip">
          <path d={BODY} />
        </clipPath>
      </defs>

      {/* Headlight beams, switched on at the end of the intro. */}
      <g className="cone opacity-0" data-in>
        <polygon points="32,252 52,252 70,520 -24,520" fill="url(#car-cone)" />
        <polygon points="68,252 88,252 144,520 50,520" fill="url(#car-cone)" />
      </g>

      {/* Soft ground shadow */}
      <ellipse cx="64" cy="152" rx="52" ry="142" fill="#000" opacity="0.2" />

      {/* Wheels poke out from under the body */}
      <g fill="#0c0b0a">
        <rect x="8" y="52" width="16" height="42" rx="6" />
        <rect x="96" y="52" width="16" height="42" rx="6" />
        <rect x="8" y="196" width="16" height="42" rx="6" />
        <rect x="96" y="196" width="16" height="42" rx="6" />
      </g>

      {/* Body */}
      <path d={BODY} fill="url(#car-body)" />

      {/* Twin cream racing stripes: deck, roof and bonnet only */}
      <g clipPath="url(#car-clip)" fill="#f4efe6" opacity="0.92">
        <rect x="50" y="0" width="7" height="72" />
        <rect x="63" y="0" width="7" height="72" />
        <rect x="50" y="176" width="7" height="110" />
        <rect x="63" y="176" width="7" height="110" />
      </g>

      {/* Glass */}
      <path d="M36 76 L84 76 L80 102 L40 102 Z" fill="url(#car-glass)" />
      <path d="M38 142 L82 142 L88 174 L32 174 Z" fill="url(#car-glass)" />
      <path d="M42 150 L58 150 L55 166 L39 166 Z" fill="#fff" opacity="0.08" />

      {/* Roof */}
      <rect x="38" y="100" width="44" height="44" rx="10" fill="#d94a27" />
      <g fill="#f4efe6" opacity="0.92">
        <rect x="50" y="104" width="7" height="36" />
        <rect x="63" y="104" width="7" height="36" />
      </g>

      {/* Mirrors */}
      <ellipse cx="16" cy="154" rx="6" ry="4" fill="#c43d1c" />
      <ellipse cx="104" cy="154" rx="6" ry="4" fill="#c43d1c" />

      {/* Lights and details */}
      <g>
        <rect x="30" y="14" width="14" height="7" rx="3" fill="#7a1409" />
        <rect x="76" y="14" width="14" height="7" rx="3" fill="#7a1409" />
        <circle cx="41" cy="247" r="7.5" fill="#fff4cf" />
        <circle cx="79" cy="247" r="7.5" fill="#fff4cf" />
        <circle cx="41" cy="247" r="3.5" fill="#e6cf8a" />
        <circle cx="79" cy="247" r="3.5" fill="#e6cf8a" />
        <path d="M48 270 Q60 275 72 270" stroke="#14110f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M44 192 Q60 185 76 192" stroke="#fff" strokeWidth="3" fill="none" opacity="0.14" strokeLinecap="round" />
      </g>
    </svg>
  );
}
