import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutImage from "@/assets/about-hotel.jpg";

gsap.registerPlugin(ScrollTrigger);

const AboutParallax = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax - rotate and slide from right with depth
      gsap.fromTo(
        imageRef.current,
        {
          yPercent: 30,
          xPercent: 25,
          rotationY: -15,
          rotationX: 10,
          opacity: 0,
          scale: 0.85,
          z: -200,
        },
        {
          yPercent: -10,
          xPercent: 0,
          rotationY: 0,
          rotationX: 0,
          opacity: 1,
          scale: 1,
          z: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 2,
          },
        }
      );

      // Text content - slide from left with rotation
      gsap.fromTo(
        textRef.current,
        {
          yPercent: 20,
          xPercent: -30,
          opacity: 0,
          rotationX: 8,
          rotationZ: -5,
          z: -100,
        },
        {
          yPercent: 0,
          xPercent: 0,
          opacity: 1,
          rotationX: 0,
          rotationZ: 0,
          z: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1.6,
          },
        }
      );

      // Stats - emerge from below with pop
      gsap.fromTo(
        statsRef.current,
        {
          yPercent: 35,
          xPercent: -40,
          opacity: 0,
          scale: 0.75,
          rotationZ: -8,
        },
        {
          yPercent: 0,
          xPercent: 0,
          opacity: 1,
          scale: 1,
          rotationZ: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1.2,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-background py-32"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <div 
            ref={textRef} 
            className="space-y-6 will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Welcome to La Foret
              </span>
            </motion.div>

            <h2 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Where Luxury Meets Nature
            </h2>

            <p className="text-lg leading-relaxed text-muted-foreground">
              Nestled in the heart of pristine wilderness, La Foret offers an
              unparalleled escape from the ordinary. Our boutique hotel
              seamlessly blends modern luxury with natural beauty, creating an
              experience that rejuvenates both body and soul.
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground">
              With breathtaking mountain views, world-class amenities, and
              personalized service, every moment at La Foret is designed to
              exceed your expectations.
            </p>

            <div ref={statsRef} className="pt-4 will-change-transform">
              <div className="flex items-center gap-8">
                <div>
                  <div className="text-4xl font-bold text-primary">20+</div>
                  <div className="text-sm text-muted-foreground">
                    Years Experience
                  </div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-4xl font-bold text-primary">45</div>
                  <div className="text-sm text-muted-foreground">
                    Luxury Rooms
                  </div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-4xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">
                    Guest Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div 
            className="relative will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              ref={imageRef}
              className="overflow-hidden rounded-3xl shadow-[var(--shadow-soft)] will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.img
                src={aboutImage}
                alt="La Foret Architecture"
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
              />
            </div>

            {/* Decorative Element */}
            <motion.div
              className="absolute -bottom-6 -right-6 -z-10 h-64 w-64 rounded-3xl bg-secondary/30 blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutParallax;
