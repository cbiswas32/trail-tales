import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section id="waitlist" className="bg-ink py-24 text-paper md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl tracking-tight md:text-5xl">
          Ready to lay down your first trail?
        </h2>
        <p className="mx-auto mt-5 max-w-md text-paper/70">
          Trail Tales is in the works. Join the waitlist and be first to
          string your trips together.
        </p>
        <div className="mt-10 flex justify-center">
          <Button
            size="lg"
            className="bg-trail text-paper hover:bg-trail-light"
          >
            Join the waitlist
          </Button>
        </div>
      </div>
    </section>
  );
}
