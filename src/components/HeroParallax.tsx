import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, Star, Sparkles } from "lucide-react";

// Import hero image
import heroImage from "@/assets/hero-hotel.jpg";

gsap.registerPlugin(ScrollTrigger);

const HeroParallax = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { t } = useLanguage();
  const content = t("index");

  const title = content?.hero?.title || "La Foret: A Stay Beyond Ordinary";
  const words = title.split(" ");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  // Floating particles configuration - Reduced count for performance
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background - cinematic zoom with rotation
      gsap.to(bgLayerRef.current, {
        yPercent: 30,
        scale: 1.2,
        rotationX: -5,
        z: -200,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Overlay - dramatic fade
      gsap.to(overlayRef.current, {
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Content - elegant exit with scale
      gsap.to(contentRef.current, {
        yPercent: 60,
        opacity: 0,
        scale: 0.9,
        rotationX: 10,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // Decorative elements - float away
      gsap.to(decorRef.current, {
        yPercent: 100,
        opacity: 0,
        rotationZ: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Scroll indicator - quick fade
      gsap.to(scrollRef.current, {
        yPercent: 200,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "center top",
          scrub: 0.3,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-[100dvh] w-full overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Background Image Layer */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src={heroImage}
          alt="La Foret Hotel"
          className="h-[120%] w-full object-cover"
          style={{ filter: "brightness(0.85) contrast(1.05) saturate(1.1)" }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1080}
        />
      </div>

      {/* Sophisticated Gradient Overlays */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10"
        style={{
          background: `
            linear-gradient(135deg, rgba(0,0,0,0.6) 0%, transparent 60%),
            linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)
          `,
        }}
      />

      {/* Animated Floating Particles */}
      <div className="absolute inset-0 z-15 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.left}%`,
              bottom: "-5%",
              willChange: "transform",
            }}
            animate={{
              y: [0, -window.innerHeight * 1.2],
              opacity: [0, 0.6, 0],
              x: [0, Math.sin(particle.id) * 50],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Decorative Floating Elements */}
      <div
        ref={decorRef}
        className="absolute inset-0 z-15 overflow-hidden pointer-events-none"
      >
        {/* Top-left decorative corner */}
        <motion.div
          className="absolute top-20 left-6 md:left-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="flex items-center gap-3 text-white/60">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/40" />
            <Sparkles size={16} />
            <span className="text-xs uppercase tracking-[0.3em] font-light">{content.hero.luxuryRetreat}</span>
          </div>
        </motion.div>

        {/* Top-right decorative corner */}
        <motion.div
          className="absolute top-20 right-6 md:right-12"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <div className="flex items-center gap-3 text-white/60">
            <span className="text-xs uppercase tracking-[0.3em] font-light">{content.hero.established}</span>
            <Star size={16} className="text-primary/70" fill="currentColor" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/40" />
          </div>
        </motion.div>

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-1/4 right-[10%] w-32 h-32 border border-white/10 rounded-full"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 1.5 }}
        />
        <motion.div
          className="absolute bottom-1/3 left-[8%] w-24 h-24 border border-white/5 rotate-45"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.8, duration: 1.5 }}
        />
        <motion.div
          className="absolute top-1/3 left-[15%] w-2 h-2 bg-primary/50 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-[20%] w-3 h-3 bg-white/30 rounded-full"
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Pre-title Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className="text-primary"
                  fill="currentColor"
                />
              ))}
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-white/80 font-medium">
              {content.hero.badge}
            </span>
          </div>
        </motion.div>

        {/* Main Title with Word-by-Word Animation */}
        <motion.h1
          className="mb-8 max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ perspective: "1000px" }}
        >
          {words.map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              variants={wordVariants}
              className="inline-block mr-[0.25em] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white"
              style={{
                textShadow: "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)",
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.8, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8 h-px w-32 origin-center"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), transparent)",
          }}
        />

        {/* Subtitle */}
        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.5 }}
          className="mb-12 max-w-xl text-lg md:text-xl lg:text-2xl text-white/90 font-light"
          style={{
            textShadow: "0 2px 16px rgba(0,0,0,0.4)",
            letterSpacing: "0.02em",
            lineHeight: 1.6,
          }}
        >
          {content.hero.subtitle}
        </motion.p>

        {/* CTA Buttons with Glassmorphism */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.8 }}
          className="flex flex-col gap-4 sm:flex-row sm:gap-6"
        >
          <Button
            size="lg"
            className="group relative overflow-hidden px-10 py-6 text-base font-semibold bg-primary text-primary-foreground shadow-[0_8px_32px_rgba(184,76,59,0.4)] transition-all duration-500 hover:scale-105 hover:shadow-[0_16px_48px_rgba(184,76,59,0.5)] rounded-full"
          >
            <span className="relative z-10">{content.hero.bookNow}</span>
            <motion.div
              className="absolute inset-0 bg-primary/80"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </Button>
          <Link to="/rooms">
            <Button
              size="lg"
              variant="outline"
              className="px-10 py-6 text-base font-medium border-2 border-white/30 bg-white/10 text-white backdrop-blur-md rounded-full transition-all duration-500 hover:scale-105 hover:bg-white/20 hover:border-white/50"
            >
              {content.hero.exploreRooms}
            </Button>
          </Link>
        </motion.div>

        {/* Features Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8"
        >
          {[content.hero.features?.spa, content.hero.features?.dining, content.hero.features?.nature].filter(Boolean).map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-white/60">
              <div className="w-1 h-1 rounded-full bg-primary/80" />
              <span className="text-sm uppercase tracking-[0.15em] font-light">{feature}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 will-change-transform"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-light">
            {content.hero.scrollToExplore}
          </span>
          <div className="relative p-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
            <ChevronDown size={20} className="text-white/70" />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-25 pointer-events-none"
        style={{
          background: "linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)",
        }}
      />
    </section>
  );
};

export default HeroParallax;
