import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Home, ThumbsUp } from "lucide-react";
import aboutImage from "@/assets/about-hotel.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const AboutParallax = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const { t } = useLanguage();
  const content = t("index");

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
          duration: 1.2,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            toggleActions: "play reverse play reverse",
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
          duration: 1,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            toggleActions: "play reverse play reverse",
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
          duration: 0.8,
          ease: "back.out(1.7)",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            toggleActions: "play reverse play reverse",
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
                {content.about.welcome}
              </span>
            </motion.div>

            <h2 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              {content.about.title}
            </h2>

            <p className="text-lg leading-relaxed text-muted-foreground">
              {content.about.description1}
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground">
              {content.about.description2}
            </p>

            <div ref={statsRef} className="pt-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="stat-card">
                  <MapPin className="mx-auto h-8 w-8 text-primary mb-2" />
                  <div className="stat-value">20+</div>
                  <div className="stat-label">Acres</div>
                </div>
                <div className="stat-card">
                  <Home className="mx-auto h-8 w-8 text-primary mb-2" />
                  <div className="stat-value">{content.about.stats.rooms.value}</div>
                  <div className="stat-label">{content.about.stats.rooms.label}</div>
                </div>
                <div className="stat-card">
                  <ThumbsUp className="mx-auto h-8 w-8 text-primary mb-2" />
                  <div className="stat-value">{content.about.stats.satisfaction.value}</div>
                  <div className="stat-label">{content.about.stats.satisfaction.label}</div>
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
              className="overflow-hidden rounded-3xl shadow-[var(--shadow-soft)] img-zoom-container"
            >
              <img
                src={aboutImage}
                alt="La Foret Architecture"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
              />
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutParallax;
