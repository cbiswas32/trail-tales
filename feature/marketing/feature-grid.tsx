"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Smart trip grouping",
    description:
      "Photos cluster into trips automatically by date and location — reorder or merge them by hand any time.",
  },
  {
    title: "Reels & posts, not just photos",
    description:
      "Drop in an Instagram reel or Facebook post link and it sits right alongside your photos in the trip.",
  },
  {
    title: "Automatic map placement",
    description:
      "Geotags on your photos place every trip on the map — no manual pinning required.",
  },
  {
    title: "Private by default",
    description:
      "Your trail is yours. Share a single trip or the whole trail, only when you choose to.",
  },
];

function FeatureCard({
  feature,
  index,
  hovered,
  setHovered,
}: {
  feature: (typeof features)[number];
  index: number;
  hovered: number | null;
  setHovered: (index: number | null) => void;
}) {
  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative rounded-2xl border border-ink/10 bg-white p-8 shadow-sm transition-all duration-300 ease-out",
        // Every card except the hovered one shrinks slightly, blurs, and
        // dims — the same "everyone else fades back" behavior FocusCards
        // gives its images, just applied to a text card instead.
        hovered !== null &&
          hovered !== index &&
          "scale-[0.97] opacity-50 blur-[2px]",
        // The hovered card itself lifts forward — bigger shadow, no blur.
        hovered === index && "scale-[1.02] shadow-xl",
      )}
    >
      <h3 className="font-display text-lg">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/70">
        {feature.description}
      </p>
    </div>
  );
}

export function FeatureGrid() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-paper py-24 text-ink md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="max-w-lg font-handwritten text-3xl tracking-tight md:text-4xl">
          Built for how trips actually happen.
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
        </div>
      </div>
    </section>
  );
}