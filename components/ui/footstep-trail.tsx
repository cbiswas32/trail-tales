"use client";

import { useCallback, useRef, useState } from "react";
import { Footprints } from "lucide-react";

interface Print {
  id: number;
  x: number;
  y: number;
  rotation: number;
  flip: boolean;
}

/**
 * Wrap this around any section — moving the mouse across it leaves a
 * trail of small fading footprints behind the cursor, alternating left
 * and right like an actual footstep pattern. A literal, physical take on
 * the product's own name, rather than a generic hover effect.
 */
export function FootstepTrail({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [prints, setPrints] = useState<Print[]>([]);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const idRef = useRef(0);
  const stepIndex = useRef(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (lastPos.current) {
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const dist = Math.hypot(dx, dy);
      // Only drop a new footprint once the cursor has moved far enough —
      // otherwise tiny movements spam dozens of overlapping prints.
      if (dist < 30) return;

      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      stepIndex.current += 1;
      const id = idRef.current++;

      setPrints((prev) => [
        ...prev.slice(-16), // cap how many exist at once
        { id, x, y, rotation: angle, flip: stepIndex.current % 2 === 0 },
      ]);
    }
    lastPos.current = { x, y };
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        lastPos.current = null;
      }}
      className={`relative ${className}`}
    >
      {children}

      {prints.map((print) => (
        <Footprints
          key={print.id}
          aria-hidden="true"
          className="footstep-print pointer-events-none absolute h-4 w-4 text-gold/80"
          style={{
            left: print.x,
            top: print.y,
            transform: `translate(-50%, -50%) rotate(${print.rotation}deg) scaleX(${
              print.flip ? -1 : 1
            })`,
          }}
        />
      ))}

      <style>{`
        .footstep-print {
          animation: footstep-fade 1.1s ease-out forwards;
        }
        @keyframes footstep-fade {
          0% { opacity: 0.9; transform: translate(-50%, -50%) scale(1) rotate(var(--r, 0deg)); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5) rotate(var(--r, 0deg)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .footstep-print { display: none; }
        }
      `}</style>
    </div>
  );
}