"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const views = [
  {
    value: "trail",
    label: "Trail view",
    caption: "Trips laid out on either side of your trail, in order.",
  },
  {
    value: "map",
    label: "Map view",
    caption: "Every trip pinned where it happened.",
  },
  {
    value: "gallery",
    label: "Gallery view",
    caption: "Just the photos, one after another.",
  },
] as const;

export function ViewModesShowcase() {
  return (
    <section className="bg-ink py-24 text-paper md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-handwritten text-3xl tracking-tight md:text-4xl">
          One trail, many ways to walk it.
        </h2>
        <Tabs defaultValue="trail" className="mt-12">
          <TabsList className="bg-paper/10">
            {views.map((view) => (
              <TabsTrigger
                key={view.value}
                value={view.value}
                className="text-xs uppercase tracking-wide data-[state=active]:bg-trail data-[state=active]:text-paper"
              >
                {view.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {views.map((view) => (
            <TabsContent key={view.value} value={view.value} className="mt-8">
              <div className="grid gap-6 md:grid-cols-[1fr_280px] md:items-center">
                <ViewMockup variant={view.value} />
                <p className="font-mono text-sm text-paper/60">
                  {view.caption}
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

function ViewMockup({ variant }: { variant: (typeof views)[number]["value"] }) {
  if (variant === "map") {
    return (
      <div className="relative aspect-video overflow-hidden rounded-lg border border-paper/15 bg-dusk/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(201,154,62,0.25),transparent_45%),radial-gradient(circle_at_70%_65%,rgba(194,87,31,0.25),transparent_45%)]" />
        {[
          { top: "38%", left: "28%" },
          { top: "62%", left: "68%" },
          { top: "22%", left: "72%" },
        ].map((pos, i) => (
          <span
            key={i}
            style={pos}
            className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold ring-4 ring-gold/20"
          />
        ))}
      </div>
    );
  }

  if (variant === "gallery") {
    return (
      <div className="grid aspect-video grid-cols-4 gap-2 overflow-hidden rounded-lg border border-paper/15 bg-paper/5 p-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-sm bg-gradient-to-br from-paper/20 to-paper/5"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg border border-paper/15 bg-paper/5 p-6">
      <div className="absolute left-1/2 top-0 h-full w-px bg-paper/20" />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`relative mb-6 w-[42%] rounded-md border border-paper/15 bg-paper/10 p-3 ${
            i % 2 === 0 ? "ml-0" : "ml-auto"
          }`}
        >
          <div className="h-12 rounded bg-paper/15" />
        </div>
      ))}
    </div>
  );
}
