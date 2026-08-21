import type { Metadata } from "next";
import { Nav } from "@/feature/marketing/nav";
import { Footer } from "@/feature/marketing/footer";

export const metadata: Metadata = {
  title: "Trail Tales - Every trip, strung into one trail",
  description:
    "Trail Tales turns your travel photos into a single walkable trail. Group trips, place them on a map, and explore your travels your way.",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
