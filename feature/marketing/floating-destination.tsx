import { useLayoutEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import gsap from "gsap";
import { MapPin } from "lucide-react";

import hero1 from "@/feature/marketing/asset/hero-1.png";
import hero2 from "@/feature/marketing/asset/hero-2.png";
import hero3 from "@/feature/marketing/asset/hero-3.png";
import hero4 from "@/feature/marketing/asset/hero-4.png";

type CardSize = "sm" | "md" | "lg";

const sizeMap: Record<CardSize, { width: number; imageHeight: number }> = {
  sm: { width: 96, imageHeight: 52 },
  md: { width: 118, imageHeight: 62 },
  lg: { width: 148, imageHeight: 80 },
};

interface FloatingDestinationProps {
  number: string;
  label: string;
  type: string;
  position: string;
  rotation: "left" | "right";
  delay: number;
  image: StaticImageData;
  size?: CardSize;
  color?: string;
}

function FloatingDestination({
  number,
  label,
  type,
  position,
  delay,
  image,
  size = "md",
  color = "bg-ink/75",
}: FloatingDestinationProps) {
  const wrapperRef = useRef<HTMLDivElement>(null); // static — never animated
  const imageRef = useRef<HTMLDivElement>(null); // this is what bobs
  const shadowRef = useRef<HTMLDivElement>(null); // pulses opposite to the bob

  const { width, imageHeight } = sizeMap[size];

  useLayoutEffect(() => {
    const image = imageRef.current;
    const shadow = shadowRef.current;
    if (!image || !shadow) return;

    const ctx = gsap.context(() => {
      // Only the artwork moves — the text base below never does, which is
      // what makes it read as "standing on" a fixed surface rather than
      // the whole card drifting as one unit.
      const tl = gsap.timeline({
        delay,
        repeat: -1,
        yoyo: true,
        defaults: { duration: 2.8, ease: "sine.inOut" },
      });

      tl.to(image, { y: -8 }, 0);
      // Ground shadow shrinks + fades as the artwork lifts away from the
      // base, and grows + darkens as it comes back down — a classic
      // "object floating above its own shadow" depth cue.
      tl.to(shadow, { scaleX: 0.7, opacity: 0.25 }, 0);
    }, wrapperRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={wrapperRef}
      className={`absolute ${position} z-30`}
      style={{ width }}
    >
      <div className="relative w-full overflow-visible">
        {/* Image area — height reserved here, but the artwork inside
            animates independently via imageRef */}
        <div className="relative w-full overflow-visible" style={{ height: imageHeight }}>
          <div ref={imageRef} className="absolute inset-0 z-10 pointer-events-none">
            <Image
              src={image}
              alt={label}
              fill
              priority
              sizes={`${width}px`}
              className="object-contain drop-shadow-2xl"
            />
          </div>

          {/* Location badge — fixed to the image area's own position,
              not the bobbing artwork itself, so it doesn't jitter */}
          <div className="absolute -right-3 -top-3 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-paper/20 bg-ink/90 shadow-lg shadow-black/30 backdrop-blur-md">
            <MapPin className="h-4 w-4 text-paper/80" strokeWidth={1.8} />
          </div>

          {/* Ground shadow — sits right where the artwork "rests" on the
              base, directly above the text card */}
          <div
            ref={shadowRef}
            className="absolute bottom-0 left-1/2 z-0 h-2 w-3/5 -translate-x-1/2 rounded-full bg-black/40 blur-md"
          />
        </div>

        {/* Text base — completely static, never animated */}
        <div className={`relative z-20 rounded-b-xl border-x border-b border-paper/10 ${color} px-2 pb-2 pt-1.5 backdrop-blur-xl`}>
          <div className="flex items-center justify-between">
            <span className="text-[6px] uppercase tracking-[0.18em] text-paper/30">
              {type}
            </span>
            <span className="text-[7px] text-paper/25">{number}</span>
          </div>
          <p className="mt-1 truncate font-handwritten text-[10px] text-paper/70">
            {label}
          </p>
        </div>

        <div className="pointer-events-none absolute left-0 right-0 top-0 z-40 h-px bg-gradient-to-r from-transparent via-paper/20 to-transparent" />
      </div>
    </div>
  );
}

export function FloatingDestinations() {
  return (
    <>
      <FloatingDestination
        number="01"
        label="Ghats of Varanasi"
        type="DESTINATION"
        position="left-[5%] top-[7%]"
        rotation="left"
        delay={0}
        image={hero1}
        size="lg"
        color="bg-red-500/25"
      />

      <FloatingDestination
        number="02"
        label="Diwali night, Jaipur"
        type="EVENT"
        position="right-[2%] top-[23%]"
        rotation="right"
        delay={0.6}
        image={hero2}
        size="sm"
        color="bg-blue-500/25"
      />

      <FloatingDestination
        number="03"
        label="Pangong Lake, Ladakh"
        type="DESTINATION"
        position="left-[15%] top-[47%]"
        rotation="right"
        delay={1.1}
        image={hero3}
        size="md"
        color="bg-green-500/25"
      />

      <FloatingDestination
        number="04"
        label="Backwaters of Kerala"
        type="PHOTO"
        position="right-[1%] bottom-[12%]"
        rotation="left"
        delay={0.4}
        image={hero4}
        size="sm"
        color="bg-orange-500/25"
      />
    </>
  );
}