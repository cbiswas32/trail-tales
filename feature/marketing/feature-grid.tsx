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

export function FeatureGrid() {
  return (
    <section className="bg-paper py-24 text-ink md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="max-w-lg font-display text-3xl tracking-tight md:text-4xl">
          Built for how trips actually happen.
        </h2>
        <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="border-t border-ink/15 pt-5">
              <h3 className="font-display text-lg">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
