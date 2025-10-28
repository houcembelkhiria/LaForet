import { useEffect } from "react";
import { gsap } from "gsap";

export const useCursorParallax = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5) * 2;
      const yPercent = (clientY / window.innerHeight - 0.5) * 2;

      // Animate parallax layers based on cursor position
      gsap.to("[data-cursor-parallax='slow']", {
        x: xPercent * 15,
        y: yPercent * 15,
        duration: 1.2,
        ease: "power2.out",
      });

      gsap.to("[data-cursor-parallax='medium']", {
        x: xPercent * 30,
        y: yPercent * 30,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.to("[data-cursor-parallax='fast']", {
        x: xPercent * 45,
        y: yPercent * 45,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
};
