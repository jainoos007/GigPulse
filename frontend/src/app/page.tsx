import { LandingNav } from "@/components/landing/LandingNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ShowcaseSection } from "@/components/landing/ShowcaseSection";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { ArchitectureSection } from "@/components/landing/ArchitectureSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white scroll-smooth">
      <LandingNav />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <ShowcaseSection />
        <WorkflowSection />
        <ArchitectureSection />
        <FinalCTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
