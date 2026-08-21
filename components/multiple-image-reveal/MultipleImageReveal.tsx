"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

interface Position {
  top: string; // percentage string, e.g. "20%"
  left: string;
  rotate: number;
}

interface EntryOffset {
  x: number;
  y: number;
  rotate: number;
}

export interface PolaroidImage {
  src: string;
  alt: string;
  /** Optional fixed landing spot. Randomly generated (frame-safe) if omitted. */
  position?: Position;
  /** Optional fixed off-screen starting point. Randomly generated if omitted. */
  entry?: EntryOffset;
}

interface MultipleImageRevealProps {
  images: PolaroidImage[];
  /** Height of the pinned scroll section. Defaults to "1000px". */
  height?: string;
  /** Extra scroll distance the pin holds for. Defaults to "+=150%". */
  scrollDistance?: string;
  className?: string;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * Deterministic placeholder layout - identical every render, server or
 * client, so the very first paint (before this component's useEffect ever
 * runs) hydrates cleanly. No Math.random here on purpose.
 */
function generateFallbackLayout(count: number): Position[] {
  const cols = Math.ceil(Math.sqrt(count));
  return Array.from({ length: count }, (_, i) => ({
    left: `${clamp(((i % cols) + 0.5) * (100 / cols), 12, 88)}%`,
    top: "50%",
    rotate: 0,
  }));
}

function generateFallbackEntries(count: number): EntryOffset[] {
  return Array.from({ length: count }, () => ({ x: 0, y: 900, rotate: 0 }));
}

/**
 * Scatters `count` items across the container in a jittered grid - evenly
 * spread overall, but with enough randomness per item that it doesn't read
 * as a rigid grid. Clamped to 12-88% on both axes so that, combined with
 * the polaroid's own -translate-x/y-1/2 anchor, every image stays fully
 * inside the container frame regardless of count.
 */
function generateScatterLayout(count: number): Position[] {
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);
  const cellWidth = 100 / cols;
  const cellHeight = 100 / rows;

  return Array.from({ length: count }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const jitterX = (Math.random() - 0.5) * cellWidth * 0.6;
    const jitterY = (Math.random() - 0.5) * cellHeight * 0.6;

    return {
      left: `${clamp(col * cellWidth + cellWidth / 2 + jitterX, 12, 88)}%`,
      top: `${clamp(row * cellHeight + cellHeight / 2 + jitterY, 12, 88)}%`,
      rotate: (Math.random() - 0.5) * 24, // -12deg to 12deg
    };
  });
}

/** A random point well outside the container, in a random direction, with a wild starting tilt. */
function generateEntryOffset(): EntryOffset {
  const angle = Math.random() * Math.PI * 2;
  const distance = 700 + Math.random() * 500; // 700-1200px out
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    rotate: (Math.random() - 0.5) * 70, // -35deg to 35deg
  };
}

function Polaroid({
  src,
  alt,
  innerRef,
  style,
}: {
  src: string;
  alt: string;
  innerRef: (el: HTMLDivElement | null) => void;
  style: React.CSSProperties;
}) {
  return (
    <div
      ref={innerRef}
      style={style}
      className="absolute w-40 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-paper p-3 pb-8 shadow-2xl md:w-48"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-ink/10">
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

export function MultipleImageReveal({
  images,
  height = "1000px",
  scrollDistance = "+=150%",
  className = "",
}: MultipleImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Start with a deterministic layout - identical on server and on the
  // client's first render - so hydration never sees mismatched values.
  const [resolvedLayout, setResolvedLayout] = useState<Position[]>(() =>
    images.map((img, i) => img.position ?? generateFallbackLayout(images.length)[i]),
  );
  const [resolvedEntries, setResolvedEntries] = useState<EntryOffset[]>(() =>
    images.map((img, i) => img.entry ?? generateFallbackEntries(images.length)[i]),
  );
  const [layoutReady, setLayoutReady] = useState(false);

  // Runs client-only, after hydration is already done - safe to use
  // Math.random() here since there's no server render to mismatch against.
  useEffect(() => {
    const generatedLayout = generateScatterLayout(images.length);
    const generatedEntries = images.map(() => generateEntryOffset());
    setResolvedLayout(images.map((img, i) => img.position ?? generatedLayout[i]));
    setResolvedEntries(images.map((img, i) => img.entry ?? generatedEntries[i]));
    setLayoutReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  useGSAP(
    () => {
      if (!layoutReady) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: scrollDistance,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          markers: process.env.NODE_ENV === "development",
        },
      });

      imagesRef.current.forEach((el, i) => {
        if (!el) return;
        const offset = resolvedEntries[i];
        const final = resolvedLayout[i];

        tl.fromTo(
          el,
          { x: offset.x, y: offset.y, rotate: offset.rotate, opacity: 0 },
          {
            x: 0,
            y: 0,
            rotate: final.rotate,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          i * 0.5,
        );
      });

      const imgs = containerRef.current?.querySelectorAll("img") ?? [];
      let loaded = 0;
      imgs.forEach((img) => {
        if (img.complete) {
          loaded++;
        } else {
          img.addEventListener("load", () => {
            loaded++;
            if (loaded === imgs.length) ScrollTrigger.refresh();
          });
        }
      });
      if (loaded === imgs.length) ScrollTrigger.refresh();
    },
    { scope: containerRef, dependencies: [layoutReady, resolvedLayout, resolvedEntries] },
  );

  return (
    <section
      ref={containerRef}
      style={{ height }}
      className={`relative isolate w-full overflow-hidden bg-ink ${className}`}
    >
      {images.map((image, index) => (
        <Polaroid
          key={image.src}
          src={image.src}
          alt={image.alt}
          innerRef={(el) => {
            imagesRef.current[index] = el;
          }}
          style={{
            top: resolvedLayout[index].top,
            left: resolvedLayout[index].left,
          }}
        />
      ))}
    </section>
  );
}