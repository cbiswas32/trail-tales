"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export interface WheelItem {
  src: string;
  alt?: string;
  title?: string;
}

interface RotatingImageWheelProps {
  items: WheelItem[];
  /** Seconds for one full lap around the circle. Lower = faster. Defaults to 40. */
  duration?: number;
  /** Each card's width as a % of the wheel's own diameter. Defaults to 8. */
  cardSizePercent?: number;
  /** How far out from center the ring sits, as a fraction of the wheel's
   * own radius (0-1). Lower = tighter ring = cards closer together.
   * Defaults to 0.62. */
  spacingFactor?: number;
  /** Height of the blurry fade zone at the bottom edge. Defaults to "h-28". */
  fadeHeightClass?: string;
  /** Tailwind gradient end color for the fade, e.g. "to-ink" or "to-paper".
   * Should match whatever background this sits on. Defaults to "to-ink". */
  fadeColorClass?: string;
  className?: string;
}

export function RotatingImageWheel({
  items,
  duration = 40,
  cardSizePercent = 8,
  spacingFactor = 0.62,
  fadeHeightClass = "h-28",
  fadeColorClass = "to-ink",
  className = "",
}: RotatingImageWheelProps) {
  const clipRef = useRef<HTMLDivElement>(null); // the half-height, overflow-hidden window
  const wheelRef = useRef<HTMLDivElement>(null); // the full circle's bounding box — never rotates
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const angleState = useRef({ offset: 0 });

  useLayoutEffect(() => {
    const clip = clipRef.current;
    const wheel = wheelRef.current;
    if (!clip || !wheel) return;

    const ctx = gsap.context(() => {
      function positionCards() {
        if (!wheel) return;
        const radius = (wheel.offsetWidth / 2) * spacingFactor;
        const center = wheel.offsetWidth / 2;
        const total = cardRefs.current.length;
        if (!total) return;
        const slice = (2 * Math.PI) / total;

        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const angle = i * slice + angleState.current.offset;
          const x = center + radius * Math.sin(angle);
          const y = center - radius * Math.cos(angle);
          // Only x/y are ever set — rotation is never touched, so cards
          // stay upright no matter where they sit on the ring.
          gsap.set(card, { xPercent: -50, yPercent: -50, x, y });
        });
      }

      function syncClipHeight() {
        if (!wheel || !clip) return;
        // Wheel is a square (width === height), so half its rendered
        // height is exactly the radius — locking the clip window to that
        // height means its bottom edge always lines up with the ring's
        // equator, giving a true "half the wheel visible" reveal at any
        // screen size.
        clip.style.height = `${wheel.offsetWidth / 2}px`;
      }

      function layout() {
        syncClipHeight();
        positionCards();
      }

      layout();
      window.addEventListener("resize", layout);

      // Drives the orbit by animating an angle offset and repositioning
      // cards every frame — the wheel container itself is never rotated,
      // which is what keeps every photo upright throughout the loop.
      gsap.to(angleState.current, {
        offset: Math.PI * 2,
        duration,
        ease: "none",
        repeat: -1,
        onUpdate: positionCards,
      });

      return () => window.removeEventListener("resize", layout);
    }, wheel);

    return () => ctx.revert();
  }, [items, duration, spacingFactor]);

  return (
    <div
      ref={clipRef}
      className={`relative w-full overflow-hidden ${className}`}
    >
      <div
        ref={wheelRef}
        className="absolute left-1/2 top-0 aspect-square w-[220%] max-w-[1600px] -translate-x-1/2"
      >
        {items.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 aspect-[9/16] overflow-hidden rounded-md border border-paper/15"
            style={{ width: `${cardSizePercent}%`, maxWidth: 160 }}
          >
            <img
              src={item.src}
              alt={item.alt ?? item.title ?? ""}
              className="pointer-events-none h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

     
    </div>
  );
}