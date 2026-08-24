"use client";

import { motion } from "motion/react";

/**
 * The hero's signature element: a hand-drawn trail line with trip-stop
 * markers lighting up along it. This isn't decorative — it's a literal
 * illustration of the product's own structure (a trail, with trips pinned
 * along it), so it earns its place as the one bold visual on the page.
 *
 * Isolated into its own client component so the rest of the hero (and the
 * page) stays a server component — only this small animated piece ships
 * client JS.
 */
export function TrailBlazeArt() {
  const stops = [
    { cx: 40, cy: 280 },
    { cx: 220, cy: 170 },
    { cx: 420, cy: 90 },
    { cx: 560, cy: 20 },
  ];

  return (
    <svg
      viewBox="0 0 600 320"
      fill="none"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Illustration of a winding trail connecting four trip stops"
    >
      <motion.path
        d="M40 280 C 140 280, 120 180, 220 170 S 340 60, 420 90 S 540 40, 560 20"
        stroke="url(#trailGradient)"
        strokeWidth={3}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
      {stops.map((point, i) => (
        <motion.circle
          key={`${point.cx}-${point.cy}`}
          cx={point.cx}
          cy={point.cy}
          r={6}
          fill="#C99A3E"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.4 + i * 0.35,
            duration: 0.4,
            ease: "backOut",
          }}
        />
      ))}
      <defs>
        <linearGradient id="trailGradient" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#C2571F" />
          <stop offset="100%" stopColor="#C99A3E" />
        </linearGradient>
      </defs>
    </svg>
  );
}
