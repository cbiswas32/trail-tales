import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section id="gallery" className="bg-ink py-24 text-paper md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl tracking-tight md:text-5xl">
          Want to see how others created their trails?
        </h2>
        <p className="mx-auto mt-5 max-w-md text-paper/70">
          Browse real trails from real trips — see how photos, reels, and
          posts come together into one story worth walking through.
        </p>
        <div className="mt-10 flex justify-center">
        <Button
  
  variant="outline"
  size="lg"
  className="border-2 border-trail bg-transparent text-trail hover:bg-trail hover:text-paper"
>
  <Link href="#gallery">Explore trails</Link>
</Button>
        </div>
      </div>
    </section>
  );
}