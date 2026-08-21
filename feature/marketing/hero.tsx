import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrailBlazeArt } from "@/feature/marketing/trail-blaze-art";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-28 md:grid-cols-2 md:items-center md:py-36">
        <div className="relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] text-gold">
            Photo trails, not photo dumps
          </span>
          <h1 className="font-handwritten mt-6 text-4xl leading-[1.05] tracking-tight md:text-6xl">
            Every trip you&apos;ve taken,
            <br />
            strung into one trail.
          </h1>
          <p className="mt-6 max-w-md text-base text-paper/70 md:text-lg">
            Trail Tales turns scattered travel photos into a single walkable
            trail. Group them into trips, drop them on a map, or scroll the
            story from start to finish.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
             
              size="lg"
              className="bg-trail text-paper hover:bg-trail-light"
            >
              <Link href="#waitlist">Start your trail</Link>
            </Button>
            <Button
              
              size="lg"
              variant="ghost"
              className="text-paper hover:bg-paper/10 hover:text-paper"
            >
              <Link href="#how-it-works">See how it works</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-72 md:h-96">
          <TrailBlazeArt />
        </div>
      </div>
    </section>
  );
}