"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#gallery", label: "Explore gallery" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 sticky top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="font-handwritten text-2xl tracking-tight text-paper"
        >
          Trail Tales
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-wide text-paper/70 transition-colors hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
          <motion.div
            whileHover="hover"
            whileTap={{ scale: 0.96 }}
            initial="rest"
            animate="rest"
          >
            <Button
              
              size="lg"
              className="group relative overflow-hidden bg-trail text-paper hover:bg-trail-light"
            >
              <Link href="#create" className="flex items-center gap-2">
                Create your own trail
                <motion.span
                  variants={{
                    rest: { x: 0 },
                    hover: { x: 4 },
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="inline-flex"
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Link>
            </Button>
          </motion.div>
        </nav>

        <Button
          size="icon"
          variant="ghost"
          className="text-paper hover:bg-paper/10 hover:text-paper md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 bg-ink px-6 pb-6 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 font-mono text-sm uppercase tracking-wide text-paper/80 hover:bg-paper/10"
            >
              {link.label}
            </Link>
          ))}
         <Button
  
  size="lg"
  className="group relative overflow-hidden bg-trail font-semibold text-paper shadow-lg shadow-trail/30 ring-1 ring-trail-light/40 hover:bg-trail-light hover:shadow-trail/50"
>
            <Link
              href="#create"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2"
            >
              Create your own trail
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}