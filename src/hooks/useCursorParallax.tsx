import { useEffect } from "react";
import { gsap } from "gsap";

export const useCursorParallax = () => {
  useEffect(() => {
    // Select elements once and cache them
    const slowLayer = document.querySelector("[data-cursor-parallax='slow']");
    const mediumLayer = document.querySelector("[data-cursor-parallax='medium']");
    const fastLayer = document.querySelector("[data-cursor-parallax='fast']");

    if (!slowLayer && !mediumLayer && !fastLayer) return;

    // Create quickTo setters for performant updates
    const xSlow = slowLayer ? gsap.quickTo(slowLayer, "x", { duration: 1.2, ease: "power2.out" }) : null;
    const ySlow = slowLayer ? gsap.quickTo(slowLayer, "y", { duration: 1.2, ease: "power2.out" }) : null;

    const xMedium = mediumLayer ? gsap.quickTo(mediumLayer, "x", { duration: 0.8, ease: "power2.out" }) : null;
    const yMedium = mediumLayer ? gsap.quickTo(mediumLayer, "y", { duration: 0.8, ease: "power2.out" }) : null;

    const xFast = fastLayer ? gsap.quickTo(fastLayer, "x", { duration: 0.5, ease: "power2.out" }) : null;
    const yFast = fastLayer ? gsap.quickTo(fastLayer, "y", { duration: 0.5, ease: "power2.out" }) : null;

    let rafId: number | null = null;
    let isActive = true;

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle using requestAnimationFrame
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        if (!isActive) return;

        const { clientX, clientY } = e;
        const xPercent = (clientX / window.innerWidth - 0.5) * 2;
        const yPercent = (clientY / window.innerHeight - 0.5) * 2;

        if (xSlow && ySlow) {
          xSlow(xPercent * 15);
          ySlow(yPercent * 15);
        }

        if (xMedium && yMedium) {
          xMedium(xPercent * 30);
          yMedium(yPercent * 30);
        }

        if (xFast && yFast) {
          xFast(xPercent * 45);
          yFast(yPercent * 45);
        }

        rafId = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      isActive = false;
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);
};
