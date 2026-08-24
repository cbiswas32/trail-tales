"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import {
  Compass,
  MapPin,
  PlayCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { AnimatedButton } from "@/components/ui/animated-button";

gsap.registerPlugin(MotionPathPlugin);

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
/* Destination Card                                                           */
/* -------------------------------------------------------------------------- */

function DestinationCard({
  number,
  position,
}: {
  number: string;
  position: "left" | "right";
}) {
  return (
    <div
      className={[
        "absolute z-30 w-44",
        "rounded-2xl border border-paper/10",
        "bg-paper/[0.045]",
        "p-4",
        "shadow-2xl shadow-black/20",
        "backdrop-blur-xl",
        "transition-all duration-500",
        "hover:-translate-y-1 hover:border-paper/20",
        position === "left"
          ? "left-0 top-5 rotate-[-3deg]"
          : "right-0 bottom-8 rotate-[3deg]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/10 bg-paper/[0.06]">
          <MapPin
            className="h-3.5 w-3.5 text-gold"
            strokeWidth={1.7}
          />
        </div>

        <span className="font-mono text-[9px] tracking-[0.2em] text-paper/25">
          {number}
        </span>
      </div>

      <div className="mt-8">
        <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-paper/30">
          Interim destination
        </p>

        <p className="mt-1 font-handwritten text-lg text-paper/75">
          Interim destination
        </p>
      </div>

      <div className="mt-4 h-px w-full bg-gradient-to-r from-paper/15 to-transparent" />

      <div className="mt-3 flex justify-between font-mono text-[7px] uppercase tracking-wider text-paper/20">
        <span>TRAIL</span>
        <span>00{number}</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Moving Traveler                                                            */
/* -------------------------------------------------------------------------- */

function MovingTraveler() {
  const travelerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const traveler = travelerRef.current;

    if (!traveler) return;

    const ctx = gsap.context(() => {
      gsap.to(traveler, {
        duration: 8,
        ease: "none",
        repeat: -1,

        motionPath: {
          path: "#hero-trail-path",
          align: "#hero-trail-path",
          autoRotate: false,
          alignOrigin: [0.5, 0.5],
        },
      });
    }, traveler);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={travelerRef}
      className="absolute left-0 top-0 z-40"
    >
      {/* Glow */}
      <div className="absolute -inset-3 rounded-full bg-gold/10 blur-md" />

      {/* Temporary traveler */}
      <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-ink/90 shadow-xl shadow-black/30 backdrop-blur-md">
        <div className="h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_14px_rgba(255,255,255,0.35)]" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Trail SVG                                                                  */
/* -------------------------------------------------------------------------- */

function HeroTrail() {
  return (
    <svg
      viewBox="0 0 500 460"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full overflow-visible"
      aria-hidden="true"
    >
      {/* soft outer route */}
      <path
        d="
          M 90 70
          C 145 105, 190 95, 225 135
          C 265 180, 205 205, 250 245
          C 300 290, 365 245, 390 290
          C 420 340, 350 375, 405 410
        "
        fill="none"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        className="text-paper/[0.025]"
      />

      {/* main trail */}
      <path
        id="hero-trail-path"
        d="
          M 90 70
          C 145 105, 190 95, 225 135
          C 265 180, 205 205, 250 245
          C 300 290, 365 245, 390 290
          C 420 340, 350 375, 405 410
        "
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 9"
        className="text-paper/25"
      />

      {/* little route points */}
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
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          h-72 w-72
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-trail/[0.08]
          blur-[90px]
        "
      />

      {/* Map ring */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          h-[270px] w-[270px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          border border-paper/[0.04]
        "
      />

      {/* Destination cards */}
      <DestinationCard
        number="01"
        position="left"
      />

      <DestinationCard
        number="02"
        position="right"
      />

      {/* Actual trail */}
      <HeroTrail />

      {/* Moving traveler */}
      <MovingTraveler />

      {/* Center compass */}
      <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
        <div
          className="
            relative flex h-12 w-12
            items-center justify-center
            rounded-full
            border border-paper/15
            bg-ink/80
            shadow-xl shadow-black/30
            backdrop-blur-md
          "
        >
          <Compass
            className="h-5 w-5 text-gold"
            strokeWidth={1.5}
          />

          <span
            className="
              absolute inset-0
              animate-ping
              rounded-full
              border border-gold/20
            "
          />
        </div>
      </div>

      {/* Label */}
      <div
        className="
          absolute bottom-2 left-1/2 z-20
          -translate-x-1/2
          whitespace-nowrap
          font-mono text-[8px]
          uppercase tracking-[0.3em]
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
          absolute inset-x-0 top-0
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
          absolute right-[-10%] top-1/2
          h-[500px] w-[500px]
          -translate-y-1/2
          rounded-full
          bg-trail/[0.05]
          blur-[130px]
        "
      />

      <div
        className="
          relative mx-auto
          grid max-w-6xl
          gap-10
          px-6
          py-16
          md:grid-cols-[1fr_0.9fr]
          md:items-center
          md:gap-8
          md:py-20
        "
      >
        {/* LEFT */}
        <div className="relative z-10">
          <span
            className="
              inline-flex
              rounded-full
              border border-gold/20
              bg-gold/[0.04]
              px-3 py-1.5
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
              font-handwritten
              mt-6
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
              mt-6 max-w-md
              text-base leading-7
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

        {/* RIGHT */}
        <div className="relative h-[360px] md:h-[460px]">
          <TrailPreview />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-x-0 bottom-0
          h-24
          bg-gradient-to-t
          from-ink
          to-transparent
        "
      />
    </section>
  );
}