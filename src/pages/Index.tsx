import Navigation from "@/components/Navigation";
import HeroParallax from "@/components/HeroParallax";
import AboutParallax from "@/components/AboutParallax";
import RoomsParallax from "@/components/RoomsParallax";
import ExperiencesParallax from "@/components/ExperiencesParallax";
import TestimonialsParallax from "@/components/TestimonialsParallax";
import BookingCTAParallax from "@/components/BookingCTAParallax";
import Footer from "@/components/Footer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const Index = () => {
  useSmoothScroll();

  return (
    <div className="relative w-full overflow-x-hidden">
      <Navigation />
      <HeroParallax />
      <AboutParallax />
      <RoomsParallax />
      <ExperiencesParallax />
      <TestimonialsParallax />
      <BookingCTAParallax />
      <Footer />
    </div>
  );
};

export default Index;
