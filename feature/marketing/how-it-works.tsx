"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Group your trip",
    description:
      "Bundle photos, Instagram reels, and Facebook posts into a single trip along your trail.",
  },
  {
    number: "02",
    title: "Drop it on the map",
    description:
      "Every trip finds its place — geotagged automatically from your photos.",
  },
  {
    number: "03",
    title: "Walk the trail",
    description:
      "Explore trip by trip, switch to the map, or scroll the gallery end to end.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-paper py-24 text-ink md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">
          From camera roll to trail.
        </h2>
        <div className="relative mt-16 grid gap-12 md:grid-cols-3">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-6 hidden h-px bg-ink/15 md:block"
          />
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative"
            >
              <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 bg-paper font-mono text-sm text-trail">
                {step.number}
              </span>
              <h3 className="mt-5 font-display text-xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
