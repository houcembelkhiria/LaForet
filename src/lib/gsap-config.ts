import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Configure GSAP for optimal performance
gsap.config({
    // Force 3D transforms for GPU acceleration
    force3D: true,
    // Reduce precision for better performance
    nullTargetWarn: false,
});

// Configure ScrollTrigger defaults for performance
ScrollTrigger.config({
    // Limit marker updates for better performance
    limitCallbacks: true,
    // Ignore mobile resize events that can cause jank
    ignoreMobileResize: true,
});

// Set default ScrollTrigger properties
ScrollTrigger.defaults({
    // Use more efficient toggle actions
    toggleActions: "play none none reverse",
    // Reduce recalculations with lazy refresh
    fastScrollEnd: true,
    // Prevent anticipation issues
    anticipatePin: 1,
});

// Debounced refresh for resize events
let resizeTimer: ReturnType<typeof setTimeout>;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

export { gsap, ScrollTrigger };
