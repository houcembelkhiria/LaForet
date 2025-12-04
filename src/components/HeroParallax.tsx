import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";

// Load outdoor images for hero
const outdoorImages = import.meta.glob('@/assets/outdoor/*.{jpg,jpeg,png,JPG,JPEG}', { eager: true });
const outdoorImageArray = Object.values(outdoorImages).map((module: any) => module.default);
const heroImage = outdoorImageArray[0] || ""; // Use first available outdoor image

gsap.registerPlugin(ScrollTrigger);

const HeroParallax = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const midLayerRef = useRef<HTMLDivElement>(null);
  const fgLayerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { t } = useLanguage();
  const content = t("index");

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const title = content?.hero?.title || "La Foret: A Stay Beyond Ordinary";
  const words = title.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background layer - cinematic depth pull away
      gsap.to(bgLayerRef.current, {
        yPercent: 40,
        scale: 1.3,
        rotationX: -8,
        rotationY: -3,
        z: -300,
        filter: "blur(2px)",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      // Mid layer - diagonal sweep with atmospheric fade
      gsap.to(midLayerRef.current, {
        yPercent: 55,
        xPercent: -15,
        opacity: 0.1,
        rotationY: 5,
        rotationZ: -2,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Foreground content - dramatic camera pull with rotation
      gsap.to(contentRef.current, {
        yPercent: 80,
        xPercent: 10,
        opacity: 0,
        scale: 0.85,
        rotationX: 12,
        rotationY: -5,
        z: 100,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // Scroll indicator - rapid exit with lateral sweep
      gsap.to(fgLayerRef.current, {
        yPercent: 150,
        xPercent: -30,
        opacity: 0,
        scale: 0.7,
        rotationZ: -10,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.4,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
      {/* Background Layer - Slowest (Deep) */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: "translateZ(-200px)",
          transformStyle: "preserve-3d",
        }}
      >
        <img
          src={heroImage}
          alt="La Foret Hotel"
          className="h-full w-full object-cover"
          style={{
            filter: "brightness(0.7) blur(0.5px)",
          }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1080}
        />
      </div>

      {/* Mid Layer - Gradient Overlay */}
      <div
        ref={midLayerRef}
        className="absolute inset-0 z-10 will-change-transform"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)",
          transform: "translateZ(-100px)",
          transformStyle: "preserve-3d",
        }}
      />

      {/* Foreground Content - Fastest */}
      <div
        ref={contentRef}
        className="relative z-20 flex h-full flex-col items-center justify-center px-4 sm:px-6 text-center will-change-transform"
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.h1
          className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl lg:text-8xl"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          style={{
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block">
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={`${wordIndex}-${letterIndex}`}
                  variants={letterVariants}
                  transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              {wordIndex < words.length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="mb-12 max-w-2xl text-lg text-white/95 md:text-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          style={{
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          {content.hero.subtitle}
        </motion.p>

        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground shadow-[0_8px_30px_rgba(184,76,59,0.4)] transition-all duration-500 hover:scale-105 hover:shadow-[0_12px_40px_rgba(184,76,59,0.6)]"
          >
            {content.hero.bookNow}
          </Button>
          <Link to="/rooms">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-secondary bg-secondary/20 text-white backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-secondary hover:text-secondary-foreground"
            >
              {content.hero.exploreRooms}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator - Fastest Layer */}
      <motion.div
        ref={fgLayerRef}
        className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 will-change-transform"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2,
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="h-12 w-8 rounded-full border-2 border-white/50 backdrop-blur-sm">
          <motion.div
            className="mx-auto mt-2 h-2 w-2 rounded-full bg-white"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroParallax;
