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
    rotation: -2,
  },
  {
    number: "02",
    title: "We handle the rest",
    description:
      "Trail Tales brings your memories together, understands where they belong, and starts building your journey automatically.",
    icon: Sparkles,
    label: "Trail Tales does the work",
    rotation: 2,
  },
  {
    number: "03",
    title: "Your trip, beautifully brought together",
    description:
      "Explore your memories through one beautiful trail, interactive map, timeline, and gallery.",
    icon: MapPinned,
    label: "You relive",
    rotation: -1,
  },
];

const depthOffsets = [
  { y: 0, scale: 1, brightness: 1 },
  { y: 26, scale: 0.955, brightness: 0.94 },
  { y: 50, scale: 0.91, brightness: 0.88 },
];

function stackRotation(baseRotation: number, depth: number) {
  const sign = baseRotation === 0 ? 1 : Math.sign(baseRotation);
  return baseRotation + sign * depth * 2;
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    let ctx: gsap.Context | null = null;

    // Sibling sections (e.g. MultipleImageReveal) may finish setting up
    // their own pinned ScrollTrigger asynchronously — after a follow-up
    // effect resolves random values, then commits, then re-runs useGSAP.
    // That happens across a couple of render/paint cycles, not
    // synchronously on first mount. If this section measures the page
    // (via ScrollTrigger's `start`/`end`) before that settles, it locks
    // in the wrong position once the sibling's pin spacer is inserted
    // afterward. Deferring two animation frames gives that async chain
    // room to finish first, so this section measures the page in its
    // final, settled state instead of racing it.
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        ctx = gsap.context(() => {
          const cardElements = gsap.utils.toArray<HTMLElement>(".how-card");
          const depth = (d: number) => depthOffsets[d];

          gsap.set(cardElements[0], {
            y: depth(0).y,
            scale: depth(0).scale,
            filter: `brightness(${depth(0).brightness})`,
            rotation: stackRotation(steps[0].rotation, 0),
            opacity: 1,
          });
          gsap.set([cardElements[1], cardElements[2]], {
            y: 140,
            opacity: 0,
            scale: 0.9,
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              id: "how-it-works-stack",
              trigger: section,
              start: "top top",
              end: "+200%", // 1.5x viewport heights of scroll for the
                             // whole sequence — was tied to the section's
                             // own min-h-screen height before, which
                             // compressed both transitions into a single
                             // viewport of scroll and felt rushed.
              pin: true,
              pinSpacing: true,
              scrub: 1,
              invalidateOnRefresh: true,
              markers: process.env.NODE_ENV === "development",
            },
          });

          tl.to(cardElements[1], {
            y: depth(0).y,
            scale: depth(0).scale,
            filter: `brightness(${depth(0).brightness})`,
            rotation: stackRotation(steps[1].rotation, 0),
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          });

          tl.to(
            cardElements[0],
            {
              y: depth(1).y,
              scale: depth(1).scale,
              filter: `brightness(${depth(1).brightness})`,
              rotation: stackRotation(steps[0].rotation, 1),
              duration: 1,
              ease: "none",
            },
            "<",
          );

          tl.to({}, { duration: 0.2 });

          tl.to(cardElements[2], {
            y: depth(0).y,
            scale: depth(0).scale,
            filter: `brightness(${depth(0).brightness})`,
            rotation: stackRotation(steps[2].rotation, 0),
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          });

          tl.to(
            cardElements[1],
            {
              y: depth(1).y,
              scale: depth(1).scale,
              filter: `brightness(${depth(1).brightness})`,
              rotation: stackRotation(steps[1].rotation, 1),
              duration: 1,
              ease: "none",
            },
            "<",
          );

          tl.to(
            cardElements[0],
            {
              y: depth(2).y,
              scale: depth(2).scale,
              filter: `brightness(${depth(2).brightness})`,
              rotation: stackRotation(steps[0].rotation, 2),
              duration: 1,
              ease: "none",
            },
            "<",
          );

          // Final safety net: recalculate against whatever the page's
          // layout actually is at this point, now that this section's
          // own pin/spacer has just been added too.
          ScrollTrigger.refresh();
        }, section);
      });

      return () => cancelAnimationFrame(raf2);
    });

    return () => {
      cancelAnimationFrame(raf1);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative min-h-screen overflow-hidden bg-paper text-ink"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-trail/5 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-trail/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="how-eyebrow  text-xs uppercase tracking-[0.25em] text-trail">
            How it works
          </p>

          <h2 className="how-title mt-4 mb-4 font-handwritten text-4xl tracking-tight md:text-6xl">
            You make the memories.
            <br />
            <span className="text-trail">We make the trail.</span>
          </h2>

          <p className="how-description mx-auto mt-6 max-w-xl text-sm leading-7 text-ink/60 md:text-base">
            Drop in your photos, posts, reels and stories. Trail Tales takes
            care of the organizing, mapping and storytelling.
          </p>
        </div>

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
                  mt-12
                "
                style={{ zIndex: index + 1 }}
              >
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-trail/10 blur-3xl" />

                <div className="relative">
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
                      <Icon className="h-5 w-5 text-trail" strokeWidth={1.7} />
                    </div>
                  </div>

                  <div className="mt-5">
                    <span className="font-display text-[6rem] leading-none text-ink/[0.035] md:text-[9rem]">
                      {step.number}
                    </span>
                  </div>

                  <div className="-mt-7 md:-mt-12">
                    <h3 className="max-w-2xl font-display text-3xl tracking-tight md:text-5xl">
                      {step.title}
                    </h3>

                    <p className="mt-5 max-w-xl text-sm leading-7 text-ink/65 md:text-base">
                      {step.description}
                    </p>
                  </div>

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

        <div className="how-scroll-hint pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/30 md:flex">
          <ArrowDown className="h-3 w-3" />
          Scroll to explore
        </div>
      </div>
    </section>
  );
}