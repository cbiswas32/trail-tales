"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  /** How much the button grows on hover. Defaults to 1.03 (3% bigger). */
  hoverScale?: number;
  /** How much the button shrinks on click/tap. Defaults to 0.96. */
  tapScale?: number;
}

/**
 * Wraps any button (shadcn Button, a plain <button>, whatever) with a
 * consistent hover-grow / tap-shrink animation. Use this everywhere
 * instead of hand-writing motion.div wrappers per button, so every button
 * across the app feels the same.
 *
 * Usage:
 *   <AnimatedButton>
 *     <Button asChild size="lg">
 *       <Link href="#gallery">Explore trails</Link>
 *     </Button>
 *   </AnimatedButton>
 */
export function AnimatedButton({
  children,
  className = "",
  hoverScale = 1.03,
  tapScale = 0.96,
}: AnimatedButtonProps) {
  return (
    <motion.div
      // inline-block so this wrapper never stretches to full width the
      // way a plain div would — it should hug the button's own size.
      className={`inline-block ${className}`}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}