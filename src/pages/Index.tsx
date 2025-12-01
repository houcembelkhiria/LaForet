import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroParallax from "@/components/HeroParallax";
import AboutParallax from "@/components/AboutParallax";
import RoomsParallax from "@/components/RoomsParallax";
import ExperiencesParallax from "@/components/ExperiencesParallax";
import TestimonialsParallax from "@/components/TestimonialsParallax";
import BookingCTAParallax from "@/components/BookingCTAParallax";
import Footer from "@/components/Footer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

// Preload critical images
import heroImage from "@/assets/hero-hotel.jpg";

const Index = () => {
  useSmoothScroll();

  // Preload hero image for faster LCP
  useEffect(() => {
    if (typeof document !== "undefined") {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = heroImage;
      link.setAttribute("fetchpriority", "high");
      document.head.appendChild(link);

      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, []);

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
