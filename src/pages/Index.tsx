import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import StatsSection from "@/components/StatsSection";
import AllianceSection from "@/components/AllianceSection";
import FooterSection from "@/components/FooterSection";
import EuropeMap from "@/components/EuropeMap";

const Index = () => {
  return (
    <>
      {/* Fixed Europe map — stays in place as content scrolls over it */}
      <EuropeMap />

      {/* Scrollable content sits above the map */}
      <main className="relative min-h-screen" style={{ zIndex: 1 }}>
        <Navbar />
        <HeroSection />
        {/* Sections below have solid backgrounds that naturally cover the map */}
        <MissionSection />
        <AllianceSection />
        <StatsSection />
        <FooterSection />
      </main>
    </>
  );
};

export default Index;
