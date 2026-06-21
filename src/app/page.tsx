import MinimalistHeroDemo from "@/components/ui/minimalist-hero.demo";
import FeatureSection from "@/components/FeatureSection";
import HighlightProjectsSection from "@/components/HighlightProjectsSection";
import PinnedStorySection from "@/components/PinnedStorySection";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <main className="relative">
      <MinimalistHeroDemo />
      <FeatureSection />
      <HighlightProjectsSection />
      <PinnedStorySection />
      <CTASection />
    </main>
  );
}
