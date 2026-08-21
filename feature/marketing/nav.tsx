"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#waitlist", label: "Join waitlist" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="font-handwritten text-xl tracking-tight text-paper"
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
        </nav>
      )}
    </header>
  );
}
