import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, UtensilsCrossed, Mountain } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Load experience images
const diningImages = import.meta.glob('@/assets/indoor/dining/*.{jpg,jpeg,png,JPG,JPEG}', { eager: true });
const utilitiesImages = import.meta.glob('@/assets/utilities/*.{jpg,jpeg,png,JPG,JPEG}', { eager: true });
const outdoorImages = import.meta.glob('@/assets/outdoor/*.{jpg,jpeg,png,JPG,JPEG}', { eager: true });

const diningImageArray = Object.values(diningImages).map((module: any) => module.default);
const utilitiesImageArray = Object.values(utilitiesImages).map((module: any) => module.default);
const outdoorImageArray = Object.values(outdoorImages).map((module: any) => module.default);

gsap.registerPlugin(ScrollTrigger);

const ExperiencesParallax = () => {
  const { t } = useLanguage();
  const content = t("index");

  const getImageForExperience = (index: number) => {
    if (index === 0) return utilitiesImageArray[0] || ""; // Spa/Wellness (Utilities)
    if (index === 1) return diningImageArray[0] || ""; // Dining
    return outdoorImageArray[0] || ""; // Nature
  };

  const experiences = content?.experiences?.items?.map((item: any, index: number) => ({
    ...item,
    icon: index === 0 ? Sparkles : index === 1 ? UtensilsCrossed : Mountain,
    image: getImageForExperience(index),
  })) || [];
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background - slide from left with depth
      gsap.fromTo(
        bgRef.current,
        {
          xPercent: -30,
          opacity: 0.3,
          scale: 1.2,
          rotationY: -15,
        },
        {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 2,
          },
        }
      );

      // Header - rotate into view from above
      gsap.fromTo(
        headerRef.current,
        {
          yPercent: 40,
          xPercent: -10,
          opacity: 0,
          rotationX: -20,
          rotationZ: -5,
          scale: 0.9,
        },
        {
          yPercent: 0,
          xPercent: 0,
          opacity: 1,
          rotationX: 0,
          rotationZ: 0,
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top center",
            scrub: 1.5,
          },
        }
      );

      // Each card - staggered multi-directional reveal
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const direction = index % 3 === 0 ? 1 : index % 3 === 1 ? -1 : 0;
          const verticalOffset = index % 3 === 2;

          gsap.fromTo(
            card,
            {
              yPercent: verticalOffset ? 50 : 20,
              xPercent: direction * 40,
              opacity: 0,
              scale: 0.8,
              rotationY: direction * 20,
              rotationX: verticalOffset ? 15 : 5,
              z: -150,
            },
            {
              yPercent: 0,
              xPercent: 0,
              opacity: 1,
              scale: 1,
              rotationY: 0,
              rotationX: 0,
              z: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top bottom-=50",
                end: "center center",
                scrub: 1.8,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden py-32"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Animated Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background: "var(--gradient-nature)",
          transformStyle: "preserve-3d",
        }}
      />

      <div className="container relative z-10 mx-auto px-6">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="mb-16 text-center will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {content.experiences.subtitle}
          </span>
          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            {content.experiences.title}
          </h2>
        </div>

        {/* Experience Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {experiences.map((experience, index) => {
            const Icon = experience.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div className="group relative overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)] transition-all duration-500 hover:shadow-[var(--shadow-luxury)]">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={experience.image}
                      alt={experience.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="auto"
                      width={600}
                      height={400}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    {/* Icon */}
                    <motion.div
                      className="absolute left-6 top-6 rounded-full bg-primary/90 p-4 backdrop-blur-sm"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="mb-3 text-2xl font-bold">{experience.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {experience.description}
                    </p>

                    {/* Hover Effect Line */}
                    <motion.div
                      className="mt-6 h-1 bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Atmospheric Blur Elements */}
      <motion.div
        className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
        animate={{ x: [0, -60, 0], y: [0, -40, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
};

export default ExperiencesParallax;
