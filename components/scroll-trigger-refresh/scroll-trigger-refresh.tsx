"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Drop this once, anywhere in a page that has multiple independently-pinned
 * ScrollTrigger sections (e.g. MultipleImageReveal + HowItWorks). Each
 * section measures the page's layout at its own mount time — if one
 * section's pin/spacer is inserted after another's trigger already
 * calculated its start/end, that earlier trigger ends up wrong. This
 * forces one final, page-wide recalculation after everything has settled.
 */
export function ScrollTriggerRefresh() {
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return null;
}