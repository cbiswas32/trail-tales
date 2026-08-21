import { Hero } from "@/feature/marketing/hero";
import { HowItWorks } from "@/feature/marketing/how-it-works";
import { ViewModesShowcase } from "@/feature/marketing/view-modes-showcase";
import { FeatureGrid } from "@/feature/marketing/feature-grid";
import { CtaSection } from "@/feature/marketing/cta-section";
import { MultipleImageReveal } from "@/components/multiple-image-reveal/MultipleImageReveal";
import type { PolaroidImage } from "@/components/multiple-image-reveal/MultipleImageReveal";

const images: PolaroidImage[] = [
  
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

export default function LandingPage() {
  return (
    <>
      
      <Hero />
      <MultipleImageReveal images={images} />
      <HowItWorks />
      <ViewModesShowcase />
      <FeatureGrid />
      <CtaSection />
    </>
  );
}
