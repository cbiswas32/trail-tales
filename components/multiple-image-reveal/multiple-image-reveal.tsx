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
  /** Height of the pinned scroll section. Defaults to "500px". */
  height?: string;
  /** Extra scroll distance the pin holds for. Defaults to "+=100%". */
  scrollDistance?: string;
  /** Text shown, zoomed in, once every card has landed. */
  revealText?: string;
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
 * Arranges `count` items like a fan of playing cards held in one hand -
 * evenly rotated around a shared pivot point below the cluster, with the
 * center card sitting highest and outer cards curving down and outward.
 * Small per-card jitter keeps it from looking mechanically perfect.
 */
function generateScatterLayout(count: number): Position[] {
  const maxAngle = 32; // degrees the outermost card rotates, each direction
  const radius = 34; // % - controls how wide/tall the fan's arc is
  const pivotY = 62; // % - where the "hand" holding the cards sits vertically

  const angleStep = count > 1 ? (2 * maxAngle) / (count - 1) : 0;

  return Array.from({ length: count }, (_, i) => {
    const angle = count > 1 ? -maxAngle + i * angleStep : 0;

    const jitteredAngle = angle + (Math.random() - 0.5) * 3;
    const rad = (jitteredAngle * Math.PI) / 180;

    const left = 50 + radius * Math.sin(rad);
    const top = pivotY - radius * Math.cos(rad) * 0.55;

    return {
      left: `${clamp(left, 12, 88)}%`,
      top: `${clamp(top, 12, 88)}%`,
      rotate: jitteredAngle,
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
      className="absolute w-40 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white p-3 pb-8 shadow-2xl md:w-48"
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
  height = "500px",
  scrollDistance = "+=100%",
  revealText = "Organise your memories",
  className = "",
}: MultipleImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  const [resolvedLayout, setResolvedLayout] = useState<Position[]>(() =>
    images.map((img, i) => img.position ?? generateFallbackLayout(images.length)[i]),
  );
  const [resolvedEntries, setResolvedEntries] = useState<EntryOffset[]>(() =>
    images.map((img, i) => img.entry ?? generateFallbackEntries(images.length)[i]),
  );
  const [layoutReady, setLayoutReady] = useState(false);

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
          start: "top top+=72px",
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
          i * 0.15,
        );
      });

      // Text zooms in last, right as the final cards are settling into
      // place - ">-0.3" starts it 0.3s before the previous (last image)
      // tween finishes, so it overlaps slightly instead of waiting for a
      // dead pause after the cards land.
      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, scale: 0.55 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "back.out(1.6)",
          },
          ">-0.3",
        );
      }

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
      className={`relative isolate w-full overflow-hidden bg-ink pt-10 ${className}`}
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

      <div
        ref={textRef}
        className="pointer-events-none absolute inset-x-0 bottom-[8%] flex justify-center opacity-0"
      >
        <span className="font-display text-2xl tracking-tight text-paper md:text-4xl">
          {revealText}
        </span>
      </div>
    </section>
  );
}