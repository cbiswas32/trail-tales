"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  Compass,

  PlayCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { AnimatedButton } from "@/components/ui/animated-button";
import { FloatingDestinations } from "@/feature/marketing/floating-destination";
import motorbike from "@/feature/marketing/asset/motorbike.png";

/* -------------------------------------------------------------------------- */
/* Hero Buttons                                                               */
/* -------------------------------------------------------------------------- */

function HeroButtons() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <AnimatedButton>
        <Button
          size="lg"
          className="group relative overflow-hidden bg-trail text-paper shadow-lg shadow-trail/30 ring-1 ring-trail-light/40 transition-all duration-300 hover:bg-trail-light hover:shadow-trail/50"
        >
          <Link href="#waitlist" className="flex items-center gap-2">
            <Compass className="h-4 w-4 transition-transform duration-500 group-hover:rotate-[135deg]" />
            Start your trail
          </Link>
        </Button>
      </AnimatedButton>

      <AnimatedButton>
        <Button
          size="lg"
          variant="ghost"
          className="group text-paper hover:bg-paper/10 hover:text-paper"
        >
          <Link
            href="#how-it-works"
            className="flex items-center gap-2"
          >
            <PlayCircle className="h-4 w-4 text-paper/60 transition-colors group-hover:text-paper" />
            See how it works
          </Link>
        </Button>
      </AnimatedButton>
    </div>
  );
}



/* -------------------------------------------------------------------------- */
/* Moving Traveler                                                            */
/* -------------------------------------------------------------------------- */

function MovingTraveler() {
  const travelerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });

  useLayoutEffect(() => {
    const traveler = travelerRef.current;

    if (!traveler) return;

    const path = document.querySelector<SVGPathElement>(
      "#hero-trail-path"
    );

    if (!path) return;

    const svg = path.ownerSVGElement;

    if (!svg) return;

    const preview = traveler.parentElement;

    if (!preview) return;

    const length = path.getTotalLength();
    const progress = progressRef.current;

    const ctx = gsap.context(() => {
      const updatePosition = () => {
        const currentLength = progress.value * length;

        /*
         * Current point
         */
        const currentPoint = path.getPointAtLength(
          currentLength
        );

        /*
         * A point slightly ahead of the bike.
         *
         * This is what we use to calculate the
         * direction the road is going.
         */
        const lookAhead = 2;

        const nextPoint = path.getPointAtLength(
          Math.min(currentLength + lookAhead, length)
        );

        /*
         * Convert SVG coordinates into actual
         * screen coordinates.
         *
         * This is important because the SVG uses:
         *
         * viewBox="0 0 500 460"
         *
         * while the actual rendered SVG can have
         * a completely different width/height.
         */
        const currentScreen = new DOMPoint(
          currentPoint.x,
          currentPoint.y
        ).matrixTransform(svg.getScreenCTM()!);

        const nextScreen = new DOMPoint(
          nextPoint.x,
          nextPoint.y
        ).matrixTransform(svg.getScreenCTM()!);

        /*
         * Convert screen coordinates into coordinates
         * relative to TrailPreview.
         */
        const previewRect = preview.getBoundingClientRect();

        const x = currentScreen.x - previewRect.left;
        const y = currentScreen.y - previewRect.top;

        /*
         * Calculate direction of the path.
         */
        const dx = nextScreen.x - currentScreen.x;
        const dy = nextScreen.y - currentScreen.y;

        let angle = Math.atan2(dy, dx) * (180 / Math.PI);

        /*
         * Your motorcycle PNG is assumed to have
         * its FRONT / HEAD pointing UP.
         *
         * CSS rotation:
         *
         *   0deg   = up
         *   90deg  = right
         *   180deg = down
         *   270deg = left
         *
         * But atan2 gives:
         *
         *   0deg   = right
         *   90deg  = down
         *
         * Therefore add 90 degrees.
         */
        angle += 90;

        gsap.set(traveler, {
          x,
          y,
          xPercent: -50,
          yPercent: -50,
          rotation: angle,
          transformOrigin: "50% 50%",
        });
      };

      updatePosition();

      gsap.to(progress, {
        value: 1,
        duration: 8,
        ease: "none",
        repeat: -1,
        onUpdate: updatePosition,
      });
    }, traveler);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={travelerRef}
      className="
        pointer-events-none
        absolute
        left-0
        top-0
        z-50
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          -inset-3
          rounded-full
          bg-gold/20
          blur-md
        "
      />

      {/* Motorcycle */}
      <div className="relative h-12 w-12">
        <Image
          src={motorbike}
          alt="Motorbike"
          fill
          priority
          className="
            object-contain
            drop-shadow-2xl
          "
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Trail SVG                                                                  */
/* -------------------------------------------------------------------------- */

function HeroTrail() {
  const pathData = `
    M 90 70
    C 145 105, 190 95, 225 135
    C 265 180, 205 205, 250 245
    C 300 290, 365 245, 390 290
    C 420 340, 350 375, 405 410
  `;

  return (
    <svg
      viewBox="0 0 500 460"
      preserveAspectRatio="xMidYMid meet"
      className="
        absolute
        inset-0
        h-full
        w-full
        overflow-visible
      "
      aria-hidden="true"
    >
      <defs>
        {/* Road shadow */}
        <filter
          id="road-shadow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feGaussianBlur stdDeviation="4" />
        </filter>

        {/* Asphalt gradient */}
        <linearGradient
          id="road"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0" stopColor="#24221f" />
          <stop offset="50%" stopColor="#302d28" />
          <stop offset="100%" stopColor="#201e1b" />
        </linearGradient>
      </defs>

      {/* =====================================================
          ROAD SHADOW
      ===================================================== */}
      <path
        d={pathData}
        fill="none"
        stroke="#000"
        strokeWidth="34"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.35"
        filter="url(#road-shadow)"
      />

      {/* =====================================================
          ROAD OUTER BORDER
      ===================================================== */}
      <path
        d={pathData}
        fill="none"
        stroke="#bdb6a6"
        strokeWidth="31"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />

      {/* =====================================================
          ASPHALT
      ===================================================== */}
      <path
        d={pathData}
        fill="none"
        stroke="url(#road)"
        strokeWidth="27"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* =====================================================
          LEFT EDGE LINE
      ===================================================== */}
      <path
        d={pathData}
        fill="none"
        stroke="#e5ddc9"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
        transform="translate(-2 0)"
      />

      {/* =====================================================
          RIGHT EDGE LINE
      ===================================================== */}
      <path
        d={pathData}
        fill="none"
        stroke="#e5ddc9"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
        transform="translate(2 0)"
      />

      {/* =====================================================
          CENTER YELLOW ROAD MARKING

          KEEP THIS PATH ID.
          MovingTraveler follows this path.
      ===================================================== */}
      <path
        id="hero-trail-path"
        d={pathData}
        fill="none"
        stroke="#d7aa48"
        strokeWidth="2.5"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeDasharray="9 11"
        opacity="0.9"
      />

      {/* =====================================================
          SMALL ROAD TEXTURE
      ===================================================== */}
      <path
        d={pathData}
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeDasharray="1 16"
        opacity="0.07"
      />

      {/* =====================================================
          START ROAD MARKER
      ===================================================== */}
      <circle
        cx="90"
        cy="70"
        r="7"
        fill="#211f1c"
        stroke="#e5ddc9"
        strokeWidth="1.5"
      />

      <circle
        cx="90"
        cy="70"
        r="2.5"
        fill="#d7aa48"
      />

      {/* =====================================================
          MIDDLE MARKER
      ===================================================== */}
      <circle
        cx="250"
        cy="245"
        r="5"
        fill="#211f1c"
        stroke="#e5ddc9"
        strokeWidth="1"
      />

      <circle
        cx="250"
        cy="245"
        r="2"
        fill="#d7aa48"
      />

      {/* =====================================================
          END ROAD MARKER
      ===================================================== */}
      <circle
        cx="405"
        cy="410"
        r="7"
        fill="#211f1c"
        stroke="#e5ddc9"
        strokeWidth="1.5"
      />

      <circle
        cx="405"
        cy="410"
        r="2.5"
        fill="#d7aa48"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Trail Preview                                                              */
/* -------------------------------------------------------------------------- */

function TrailPreview() {
  return (
    <div className="relative h-full w-full">
      {/* ------------------------------------------------------------------ */}
      {/* Ambient glow                                                       */}
      {/* ------------------------------------------------------------------ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-72
          w-72
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-trail/[0.08]
          blur-[90px]
        "
      />

      {/* ------------------------------------------------------------------ */}
      {/* Decorative map ring                                                */}
      {/* ------------------------------------------------------------------ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[270px]
          w-[270px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-paper/[0.04]
        "
      />

      {/* ------------------------------------------------------------------ */}
      {/* Floating cards                                                     */}
      {/* ------------------------------------------------------------------ */}
        <FloatingDestinations />
      {/* ------------------------------------------------------------------ */}
      {/* Trail                                                               */}
      {/* ------------------------------------------------------------------ */}

      <HeroTrail />

      {/* ------------------------------------------------------------------ */}
      {/* Moving traveler                                                    */}
      {/* ------------------------------------------------------------------ */}

      <MovingTraveler />

      {/* ------------------------------------------------------------------ */}
      {/* Center compass                                                     */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          z-30
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        <div
          className="
            relative
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-paper/15
            bg-ink/80
            shadow-xl
            shadow-black/30
            backdrop-blur-md
          "
        >
          <Compass
            className="h-5 w-5 text-gold"
            strokeWidth={1.5}
          />

          <span
            className="
              absolute
              inset-0
              animate-ping
              rounded-full
              border
              border-gold/20
            "
          />
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Bottom label                                                       */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          absolute
          bottom-2
          left-1/2
          z-20
          -translate-x-1/2
          whitespace-nowrap
          font-mono
          text-[8px]
          uppercase
          tracking-[0.3em]
          text-paper/20
        "
      >
        YOUR JOURNEY
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {/* Top atmosphere */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-48
          bg-gradient-to-b
          from-paper/[0.025]
          to-transparent
        "
      />

      {/* Right glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-10%]
          top-1/2
          h-[500px]
          w-[500px]
          -translate-y-1/2
          rounded-full
          bg-trail/[0.05]
          blur-[130px]
        "
      />

      {/* Main content */}
      <div
        className="
          relative
          mx-auto
          grid
          max-w-6xl
          gap-10
          px-6
          py-16
          md:grid-cols-[1fr_0.9fr]
          md:items-center
          md:gap-8
          md:py-20
        "
      >
        {/* ---------------------------------------------------------------- */}
        {/* Left                                                             */}
        {/* ---------------------------------------------------------------- */}

        <div className="relative z-10">
          <span
            className="
              inline-flex
              rounded-full
              border
              border-gold/20
              bg-gold/[0.04]
              px-3
              py-1.5
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-gold
            "
          >
            Photo trails, not photo dumps
          </span>

          <h1
            className="
              mt-6
              font-handwritten
              text-4xl
              leading-[1.05]
              tracking-tight
              md:text-6xl
            "
          >
            Every trip you&apos;ve taken,
            <br />
            strung into{" "}
            <SquigglyText
              stepDuration={100}
              scale={[6, 8]}
              className="text-primary"
            >
              one trail.
            </SquigglyText>
          </h1>

          <p
            className="
              mt-6
              max-w-md
              text-base
              leading-7
              text-paper/70
              md:text-lg
            "
          >
            Trail Tales turns scattered travel photos into a single walkable
            trail. Group them into trips, drop them on a map, or scroll the
            story from start to finish.
          </p>

          <HeroButtons />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Right                                                            */}
        {/* ---------------------------------------------------------------- */}

        <div className="relative h-[360px] md:h-[460px]">
          <TrailPreview />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-24
          bg-gradient-to-t
          from-ink
          to-transparent
        "
      />
    </section>
  );
}