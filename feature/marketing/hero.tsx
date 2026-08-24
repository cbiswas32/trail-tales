import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrailBlazeArt } from "@/feature/marketing/trail-blaze-art";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Compass, PlayCircle } from "lucide-react";

function HeroButtons() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <AnimatedButton>
        <Button
          size="lg"
          className="group relative overflow-hidden bg-trail  text-paper shadow-lg shadow-trail/30 ring-1 ring-trail-light/40 hover:bg-trail-light hover:shadow-trail/50"
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
          <Link href="#how-it-works" className="flex items-center gap-2">
            <PlayCircle className="h-4 w-4 text-paper/60 transition-colors group-hover:text-paper" />
            See how it works
          </Link>
        </Button>
      </AnimatedButton>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-10 md:grid-cols-2 md:items-center md:py-10">
        <div className="relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] text-gold">
            Photo trails, not photo dumps
          </span>
          <h1 className="font-handwritten mt-6 text-4xl leading-[1.05] tracking-tight md:text-6xl">
            Every trip you&apos;ve taken,
            <br />
            strung into    <SquigglyText
          stepDuration={100}
          scale={[6, 8]}
          className="text-primary"
        >
          one trail.
          </SquigglyText>
          </h1>
          <p className="mt-6 max-w-md text-base text-paper/70 md:text-lg">
            Trail Tales turns scattered travel photos into a single walkable
            trail. Group them into trips, drop them on a map, or scroll the
            story from start to finish.
          </p>
          <HeroButtons />
        </div>
        <div className="relative h-72 md:h-96">
          <TrailBlazeArt />
        </div>
      </div>
    </section>
  );
}