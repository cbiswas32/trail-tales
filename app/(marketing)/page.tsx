import { Hero } from "@/feature/marketing/hero";
import { HowItWorks } from "@/feature/marketing/how-it-works";
import { ViewModesShowcase } from "@/feature/marketing/view-modes-showcase";
import { FeatureGrid } from "@/feature/marketing/feature-grid";
import { CtaSection } from "@/feature/marketing/cta-section";
import { MultipleImageReveal } from "@/components/multiple-image-reveal/multiple-image-reveal";
import type { PolaroidImage } from "@/components/multiple-image-reveal/multiple-image-reveal";
import { ScrollTriggerRefresh } from "@/components/scroll-trigger-refresh/scroll-trigger-refresh";
import { RotatingImageWheel } from "@/components/rotating-image-wheel/rotating-image-wheel";
const images: PolaroidImage[] = [
  {
    src: "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=1024x1024&w=is&k=20&c=NQtm4v1Uzp2luv-6f3qORcq9pDtz2H56p8g9Xix8cY0=",
    alt: "Colorful eye makeup close-up",
  },
  {
    src: "https://media.istockphoto.com/id/668339850/photo/creative-art-of-make-up-fashion-model-closeup-portrait.jpg?s=1024x1024&w=is&k=20&c=MOlzvvt8pkhoNG7mX02s0rPWpV8-lFLc6131on-wJlI=",
    alt: "Fashion makeup portrait close-up",
  },
  {
    src: "https://gratisography.com/wp-content/uploads/2025/05/gratisography-moon-robot-1035x780.jpg",
    alt: "Robot looking at the moon",
  },
  {
    src: "https://media.istockphoto.com/id/2175490466/photo/fog-over-city-top-view-of-urban-skyline-jinan-china.jpg?s=1024x1024&w=is&k=20&c=1wnKIvW_t6D3_Gl3VhNH3MENPnBEDsM2yYTdYKonOy0=",
    alt: "Fog over a city skyline",
  },
  {
    src: "https://www.shutterstock.com/image-photo/robot-looks-moon-night-sky-600w-1118454314.jpg",
    alt: "Robot looking at the night sky",
  },

  // 6
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    alt: "Mountain landscape at sunrise",
  },

  // 7
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    alt: "Tropical beach and ocean",
  },

  // 8
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    alt: "Snow covered mountain range",
  },

  // 9
  {
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
    alt: "Traveler exploring a mountain landscape",
  },

  // 10
  {
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
    alt: "Scenic lake surrounded by mountains",
  },
];

const trailPhotos = [

  {
    src: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
    title: "Lisbon",
    alt: "Colorful hillside streets of Lisbon",
  },
  {
    src: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=800&q=80",
    title: "Reykjavik",
    alt: "Icelandic landscape with mountains",
  },
  {
    src: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?auto=format&fit=crop&w=800&q=80",
    title: "Marrakesh",
    alt: "Marrakesh medina rooftops",
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    title: "Banff",
    alt: "Mountain landscape at sunrise",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    title: "Tulum",
    alt: "Tropical beach and ocean",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    title: "Chamonix",
    alt: "Snow covered mountain range",
  },
  {
    src: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
    title: "Lisbon",
    alt: "Colorful hillside streets of Lisbon",
  },
  {
    src: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=800&q=80",
    title: "Reykjavik",
    alt: "Icelandic landscape with mountains",
  },
  {
    src: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?auto=format&fit=crop&w=800&q=80",
    title: "Marrakesh",
    alt: "Marrakesh medina rooftops",
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    title: "Banff",
    alt: "Mountain landscape at sunrise",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    title: "Tulum",
    alt: "Tropical beach and ocean",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    title: "Chamonix",
    alt: "Snow covered mountain range",
  },
];

export default function LandingPage() {
  return (
    <>
      
      <Hero />
      <MultipleImageReveal images={images} />
      <ViewModesShowcase />
      <HowItWorks />
      
      <FeatureGrid />
      <CtaSection />
      <ScrollTriggerRefresh />
      <RotatingImageWheel items={trailPhotos} duration={35} />
    </>
  );
}
