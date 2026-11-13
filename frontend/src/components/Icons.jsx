import React from "react";

const Svg = ({ size = 18, children, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    {children}
  </svg>
);

export const LogoMark = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
    <defs>
      <linearGradient id="ptv-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f3cf74" />
        <stop offset="1" stopColor="#c58a2b" />
      </linearGradient>
    </defs>
    <path d="M16 2 28 9v14l-12 7L4 23V9z" fill="none" stroke="url(#ptv-g)" strokeWidth="2.2" />
    <path d="M11 21V11h5.5a3.5 3.5 0 0 1 0 7H11" fill="none" stroke="#5fd4f0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="21.5" cy="21.5" r="1.8" fill="#f3cf74" />
  </svg>
);

/* Lane icons: simple map-quadrant glyphs. */
export const RoleIcon = ({ role, size = 20 }) => {
  const common = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true };
  switch (role) {
    case "TOP":
      return (
        <svg {...common}>
          <path d="M3 3h15l-4 4H7v7l-4 4z" fill="currentColor" />
          <rect x="10" y="10" width="4" height="4" fill="currentColor" opacity=".45" />
          <path d="M21 6v15H6l3-3h9V9z" fill="currentColor" opacity=".25" />
        </svg>
      );
    case "JUNGLE":
      return (
        <svg {...common}>
          <path d="M12 2c1 4 4 6 4 11a4 4 0 0 1-8 0c0-5 3-7 4-11z" fill="currentColor" />
          <path d="M5 6c3 3 3 6 3 10M19 6c-3 3-3 6-3 10" stroke="currentColor" strokeWidth="1.8" fill="none" opacity=".55" />
          <path d="M12 17v5" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "MIDDLE":
      return (
        <svg {...common}>
          <path d="M3 18 18 3h3v3L6 21H3z" fill="currentColor" />
          <path d="M3 3h8l-3 3H6v2L3 11zM21 21h-8l3-3h2v-2l3-3z" fill="currentColor" opacity=".3" />
        </svg>
      );
    case "BOTTOM":
      return (
        <svg {...common}>
          <path d="M21 21H6l4-4h7v-7l4-4z" fill="currentColor" />
          <rect x="10" y="10" width="4" height="4" fill="currentColor" opacity=".45" />
          <path d="M3 18V3h15l-3 3H6v9z" fill="currentColor" opacity=".25" />
        </svg>
      );
    case "UTILITY":
      return (
        <svg {...common}>
          <path d="M12 3 9.5 7h5zM4 7h5l1.5 3L8 13 3 10zM20 7h-5l-1.5 3L16 13l5-3z" fill="currentColor" opacity=".55" />
          <path d="m12 9 2.5 4-1 8h-3l-1-8z" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
};

export const SparkIcon = (p) => (
  <Svg {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
  </Svg>
);
export const SwordsIcon = (p) => (
  <Svg {...p}>
    <path d="M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2M9.5 6.5 14 2h3v3l-4.5 4.5M5 14l-2 2 3 3 2-2M3 21l2-2" />
  </Svg>
);
export const InfoIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </Svg>
);
export const ShieldIcon = (p) => (
  <Svg {...p}>
    <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" />
  </Svg>
);
export const BanIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m5.7 5.7 12.6 12.6" />
  </Svg>
);
export const ChartIcon = (p) => (
  <Svg {...p}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </Svg>
);
export const DatabaseIcon = (p) => (
  <Svg {...p}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
  </Svg>
);
export const CpuIcon = (p) => (
  <Svg {...p}>
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <path d="M10 10h4v4h-4zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
  </Svg>
);
export const GithubIcon = (p) => (
  <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.3 4.3 18.3 4.6 18.3 4.6c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z" />
  </svg>
);
