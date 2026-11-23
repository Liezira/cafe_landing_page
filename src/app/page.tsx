import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SpaceExplorer } from "@/components/SpaceExplorer";
import { MenuShowcase } from "@/components/MenuShowcase";
import { WayfindingSection } from "@/components/WayfindingSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Footer } from "@/components/Footer";
import { BaristaChatDrawer } from "@/components/BaristaChatDrawer";

export default function HomePage() {
  return (
    <main className="min-h-dvh w-full bg-[#14110F] text-[#FAF7F2]">
      <Navbar />
      <HeroSection />
      <SpaceExplorer />
      <MenuShowcase />
      <WayfindingSection />
      <ReviewsSection />
      <Footer />
      <BaristaChatDrawer />
    </main>
  );
}
