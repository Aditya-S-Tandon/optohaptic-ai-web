/**
 * DESIGN: Synaptic Dark — Bioluminescent Noir
 * Home page: Single long-scroll narrative journey through all 10 sections.
 * Navigation floats on top. Sections flow seamlessly.
 */
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import PipelineSection from '@/components/PipelineSection';
import ResultsSection from '@/components/ResultsSection';
import DeviceSection from '@/components/DeviceSection';
import ForeheadSection from '@/components/ForeheadSection';
import ComparisonSection from '@/components/ComparisonSection';
import TeamSection from '@/components/TeamSection';
import RoadmapSection from '@/components/RoadmapSection';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#03045E' }}>
      <Navigation />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <PipelineSection />
        <ResultsSection />
        <DeviceSection />
        <ForeheadSection />
        <ComparisonSection />
        <TeamSection />
        <RoadmapSection />
      </main>
    </div>
  );
}
