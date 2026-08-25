"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  Compass,

  MapPin,
  Navigation,
  PlayCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { AnimatedButton } from "@/components/ui/animated-button";
import { FloatingDestinations } from "@/feature/marketing/floating-destination";
import { Motorbike } from "lucide-react";
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

    /*
     * Find the exact SVG path that the traveler should follow.
     *
     * querySelector is used only to READ the existing React DOM node.
     * We never insert/remove/change the DOM structure.
     */
    const path = document.querySelector<SVGPathElement>(
      "#hero-trail-path"
    );

    if (!path) return;

    const length = path.getTotalLength();
    const progress = progressRef.current;

    const ctx = gsap.context(() => {
      const updatePosition = () => {
        const point = path.getPointAtLength(
          progress.value * length
        );

        gsap.set(traveler, {
          x: point.x,
          y: point.y,
          xPercent: -50,
          yPercent: -50,
        });
      };

      // Start exactly at the beginning of the path.
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
      <div className="absolute -inset-3 rounded-full bg-gold/20 blur-md" />

      {/* Temporary traveler */}
      {/* <div
        className="
          relative
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border
          border-gold/50
          bg-ink/95
          shadow-xl
          shadow-black/40
          backdrop-blur-md
        "
      >
        <div
          className="
            h-2.5
            w-2.5
            rounded-full
            bg-gold
            shadow-[0_0_14px_rgba(255,255,255,0.45)]
          "
        />
      </div> */}
      <div className="relative h-9 w-9">
        <Image 
          src={motorbike}
          alt="Motorbike"
          fill
          className="object-contain drop-shadow-2xl"
        
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
      {/* ------------------------------------------------------------------ */}
      {/* Soft trail glow                                                    */}
      {/* ------------------------------------------------------------------ */}

      <path
        d={pathData}
        fill="none"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        className="text-paper/[0.025]"
      />

      {/* ------------------------------------------------------------------ */}
      {/* Actual trail                                                       */}
      {/* ------------------------------------------------------------------ */}

      <path
        id="hero-trail-path"
        d={pathData}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 9"
        className="text-paper/25"
      />

      {/* ------------------------------------------------------------------ */}
      {/* Route points                                                       */}
      {/* ------------------------------------------------------------------ */}

      <circle
        cx="90"
        cy="70"
        r="4"
        className="fill-gold"
      />

      <circle
        cx="250"
        cy="245"
        r="4"
        className="fill-paper/30"
      />

      <circle
        cx="405"
        cy="410"
        r="4"
        className="fill-gold"
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