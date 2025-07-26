import Navbar from "../../components/Layout/Navbar";
import { FooterSection } from "./FooterSection";
import { CTASection } from "./CTASection";
import { TestimonialsSection } from "./TestimonialSection";
import { FeatureSection } from "./FeatureSection";
import { HeroSection } from "./HeroSection";

const Home = () => {
  const handleNavigate = (route: string) => {
    window.location.href = `/${route}`;
  };
  return (
    <div>
      <Navbar />
      <HeroSection onNavigate={handleNavigate} />
      <FeatureSection />
      <TestimonialsSection />
      <CTASection onNavigate={handleNavigate} />
      <FooterSection />
    </div>
  );
};

export default Home;
