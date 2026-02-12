import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CraftSection from "@/components/CraftSection";
import GallerySection from "@/components/GallerySection";
import JoinSection from "@/components/JoinSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="film-grain min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CraftSection />
        <GallerySection />
        <JoinSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
