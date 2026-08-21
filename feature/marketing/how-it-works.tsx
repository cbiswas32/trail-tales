"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Camera,
  Sparkles,
  MapPinned,
  ArrowDown,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Just drop in your memories",
    description:
      "Photos, Facebook posts, Instagram reels, stories — throw everything in. No sorting or organizing needed.",
    icon: Camera,
    label: "You provide",
  },
  {
    number: "02",
    title: "We handle the rest",
    description:
      "Trail Tales brings your memories together, understands where they belong, and starts building your journey automatically.",
    icon: Sparkles,
    label: "Trail Tales does the work",
  },
  {
    number: "03",
    title: "Your trip, beautifully brought together",
    description:
      "Explore your memories through one beautiful trail, interactive map, timeline, and gallery.",
    icon: MapPinned,
    label: "You relive",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      const cardElements =
        gsap.utils.toArray<HTMLElement>(".how-card");

      gsap.set(cardElements, {
        y: 120,
        opacity: 0,
        scale: 0.94,
      });

      // First card
      gsap.set(cardElements[0], {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: -2,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom-=72px",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          markers: process.env.NODE_ENV === "development",
        },
      });

      // Card 1 → Card 2
      tl.to(cardElements[0], {
        y: -40,
        scale: 0.94,
        rotation: -4,
        duration: 1,
        ease: "none",
      });

      tl.to(
        cardElements[1],
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 2,
          duration: 1,
          ease: "power2.out",
        },
        "<0.15"
      );

      // Card 2 → Card 3
      tl.to({}, { duration: 0.2 });

      tl.to(cardElements[1], {
        y: -40,
        scale: 0.94,
        rotation: 4,
        duration: 1,
        ease: "none",
      });

      tl.to(
        cardElements[2],
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: -1,
          duration: 1,
          ease: "power2.out",
        },
        "<0.15"
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative min-h-screen overflow-hidden bg-paper text-ink"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-trail/5 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-trail/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-20 md:py-24">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="how-eyebrow font-mono text-xs uppercase tracking-[0.25em] text-trail">
            How it works
          </p>

          <h2 className="how-title mt-4 font-display text-4xl tracking-tight md:text-6xl">
            You make the memories.
            <br />
            <span className="text-trail">We make the trail.</span>
          </h2>

          <p className="how-description mx-auto mt-6 max-w-xl text-sm leading-7 text-ink/60 md:text-base">
            Drop in your photos, posts, reels and stories. Trail Tales takes
            care of the organizing, mapping and storytelling.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="relative mx-auto mt-10 flex w-full max-w-4xl flex-1 items-center md:mt-6"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="
                  how-card
                  absolute
                  inset-x-0
                  mx-auto
                  max-w-3xl
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-ink/10
                  bg-white/80
                  p-7
                  shadow-[0_30px_100px_rgba(30,30,20,0.14)]
                  backdrop-blur-xl
                  md:p-12
                "
                style={{
                  zIndex: index + 1,
                }}
              >
                {/* Decorative glow */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-trail/10 blur-3xl" />

                <div className="relative">
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/40">
                        Step {step.number}
                      </span>

                      <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-trail">
                        {step.label}
                      </p>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/10 bg-paper shadow-sm">
                      <Icon
                        className="h-5 w-5 text-trail"
                        strokeWidth={1.7}
                      />
                    </div>
                  </div>

                  {/* Big number */}
                  <div className="mt-5">
                    <span className="font-display text-[6rem] leading-none text-ink/[0.035] md:text-[9rem]">
                      {step.number}
                    </span>
                  </div>

                  {/* Main content */}
                  <div className="-mt-7 md:-mt-12">
                    <h3 className="max-w-2xl font-display text-3xl tracking-tight md:text-5xl">
                      {step.title}
                    </h3>

                    <p className="mt-5 max-w-xl text-sm leading-7 text-ink/65 md:text-base">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="mt-10 flex items-center gap-4 md:mt-14">
                    <div className="h-px flex-1 bg-ink/10" />

                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink/35">
                      Trail Tales
                    </span>

                    <div className="h-px w-8 bg-ink/10" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Scroll hint */}
        <div className="how-scroll-hint pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/30 md:flex">
          <ArrowDown className="h-3 w-3" />
          Scroll to explore
        </div>
      </div>
    </section>
  );
}