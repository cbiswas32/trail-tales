import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";
import { FooterScene } from "@/components/ui/footer-scene";
import { FootstepTrail } from "@/components/ui/footstep-trail";

export function Footer() {
  return (
    <footer className="relative bg-ink text-paper border-t border-paper/10">
      {/* Subtle top transition */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper/20 to-transparent"
      />

      <FootstepTrail className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Link
              href="/"
              className="font-handwritten text-2xl text-paper"
            >
              Trail Tales
            </Link>

            <p className="mt-4 max-w-sm text-sm text-paper/60">
              Turn scattered travel photos into one walkable trail.
            </p>

            <p className="mt-1 max-w-sm text-sm text-paper/40">
              An independent product, built one trip at a time.
            </p>

            <p className="mt-6 flex items-center gap-2 font-handwritten text-lg text-paper/70">
              Made with love, one memory at a time
              <Heart
                size={15}
                strokeWidth={1.7}
                className="fill-current"
              />
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/40">
              Contact us
            </p>

            <p className="mt-4 max-w-xs text-sm leading-6 text-paper/60">
              Got a story to share, a question to ask, or just want to say
              hello?
            </p>

            <a
              href="mailto:hello@trailtales.app"
              className="mt-4 text-sm text-paper underline decoration-paper/20 underline-offset-4 transition-colors hover:decoration-paper"
            >
              hello@trailtales.app
            </a>

            {/* <p className="mt-6 flex items-center gap-2 font-handwritten text-base text-paper/50">
              We read every message.
              <Sparkles size={14} strokeWidth={1.5} />
            </p> */}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center gap-2 border-t border-paper/10 pt-6 font-mono text-xs uppercase tracking-wide text-paper/40 md:flex-row md:justify-center md:gap-3">
          <span>&copy; {new Date().getFullYear()} Trail Tales</span>

          <span className="hidden md:inline">·</span>

          <span>Crafted with love &amp; a little wanderlust</span>
        </div>
      </FootstepTrail>

      <FooterScene />
    </footer>
  );
}