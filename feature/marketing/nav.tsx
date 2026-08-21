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
    <header className="sticky top-0 z-50 w-full px-4 pt-4 md:px-6">
      <div
        className="
          mx-auto flex max-w-6xl items-center justify-between
          rounded-2xl
          border border-white/10
          bg-black/5
          px-5 py-3
          shadow-[0_8px_40px_rgba(0,0,0,0.35)]
          backdrop-blur-xl
          backdrop-saturate-150
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="
            font-handwritten text-2xl tracking-tight text-paper
            transition-opacity hover:opacity-80
          "
        >
          Trail Tales
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="
                font-mono text-xs uppercase tracking-wide
                text-paper/60
                transition-all duration-200
                hover:text-paper
              "
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
              className="
                group relative overflow-hidden
                border border-white/10
                bg-trail/90
                text-paper
                shadow-lg shadow-trail/20
                backdrop-blur-sm
                transition-all
                hover:bg-trail-light
                hover:shadow-trail/30
              "
            >
              <Link href="#create" className="flex items-center gap-2">
                Create your own trail

                <motion.span
                  variants={{
                    rest: { x: 0 },
                    hover: { x: 4 },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="inline-flex"
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Link>
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          size="icon"
          variant="ghost"
          className="
            text-paper
            hover:bg-white/10
            hover:text-paper
            md:hidden
          "
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="
            mx-auto mt-2 flex max-w-6xl flex-col gap-1
            rounded-2xl
            border border-white/10
            bg-black/70
            p-3
            shadow-[0_12px_40px_rgba(0,0,0,0.4)]
            backdrop-blur-xl
            md:hidden
          "
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="
                rounded-xl px-3 py-3
                font-mono text-sm uppercase tracking-wide
                text-paper/70
                transition-colors
                hover:bg-white/10
                hover:text-paper
              "
            >
              {link.label}
            </Link>
          ))}

          <Button
            size="lg"
            className="
              group mt-2 w-full
              border border-white/10
              bg-trail
              font-semibold text-paper
              shadow-lg shadow-trail/30
              hover:bg-trail-light
              hover:shadow-trail/50
            "
          >
            <Link
              href="#create"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2"
            >
              Create your own trail

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.nav>
      )}
    </header>
  );
}