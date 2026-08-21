import { Hero } from "@/feature/marketing/hero";
import { HowItWorks } from "@/feature/marketing/how-it-works";
import { ViewModesShowcase } from "@/feature/marketing/view-modes-showcase";
import { FeatureGrid } from "@/feature/marketing/feature-grid";
import { CtaSection } from "@/feature/marketing/cta-section";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <ViewModesShowcase />
      <FeatureGrid />
      <CtaSection />
    </>
  );
}
