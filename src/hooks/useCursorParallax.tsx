import { useEffect } from "react";
import { gsap } from "gsap";

export const useCursorParallax = () => {
  useEffect(() => {
    let rafId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle using requestAnimationFrame
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const xPercent = (clientX / window.innerWidth - 0.5) * 2;
        const yPercent = (clientY / window.innerHeight - 0.5) * 2;

        // Only update if position changed significantly (reduce unnecessary animations)
        const deltaX = Math.abs(xPercent - lastX);
        const deltaY = Math.abs(yPercent - lastY);
        
        if (deltaX > 0.01 || deltaY > 0.01) {
          lastX = xPercent;
          lastY = yPercent;

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
        }

        rafId = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);
};
