import ApiController from "@/components/ApiController";
import AtomBackground from "@/components/AtomBackground";
import AtomExplorer from "@/components/AtomExplorer";
import ChapterIndex from "@/components/ChapterIndex";
import DravyaTable from "@/components/DravyaTable";
import Hero from "@/components/Hero";
import InherenceAccordion from "@/components/InherenceAccordion";
import PhilosophySection from "@/components/PhilosophySection";
import TechnologyMatrix from "@/components/TechnologyMatrix";
import VaisheshikaFounder from "@/components/VaisheshikaFounder";
import VaisheshikaOverview from "@/components/VaisheshikaOverview";

export default function Home() {
  return (
    <>
      <AtomBackground />
      <Hero />
      <VaisheshikaOverview />
      <VaisheshikaFounder />
      <PhilosophySection />
      <section className="px-4 max-w-7xl mx-auto space-y-16">
        <AtomExplorer />
        <DravyaTable />
        <InherenceAccordion />
        <TechnologyMatrix />
        <ApiController />
        <ChapterIndex />
      </section>
    </>
  );
}
