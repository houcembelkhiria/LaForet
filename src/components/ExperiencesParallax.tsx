import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Dumbbell, Waves, Flower2, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";

// Load experience images
const spaImages = import.meta.glob('@/assets/utilities/spa/*.{jpg,jpeg,png,JPG,JPEG}', { eager: true });
const massageImages = import.meta.glob('@/assets/utilities/massage/*.{jpg,jpeg,png,JPG,JPEG}', { eager: true });
const gymImages = import.meta.glob('@/assets/utilities/gym/*.{jpg,jpeg,png,JPG,JPEG}', { eager: true });
const poolImages = import.meta.glob('@/assets/utilities/pool/*.{jpg,jpeg,png,JPG,JPEG}', { eager: true });

const spaImageArray = Object.values(spaImages).map((module: any) => module.default);
const massageImageArray = Object.values(massageImages).map((module: any) => module.default);
const gymImageArray = Object.values(gymImages).map((module: any) => module.default);
const poolImageArray = Object.values(poolImages).map((module: any) => module.default);

gsap.registerPlugin(ScrollTrigger);

const ExperienceCarousel = ({ images, title }: { images: string[], title: string }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <div className="relative h-64 overflow-hidden group/carousel">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((img, idx) => (
            <div key={idx} className="flex-[0_0_100%] min-w-0 relative h-full">
              <img
                src={img}
                alt={`${title} - ${idx + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={(e) => { e.stopPropagation(); scrollPrev(); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); scrollNext(); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all ${idx === selectedIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

const ExperiencesParallax = () => {
  const { t } = useLanguage();
  const content = t("index");

  const getImagesForExperience = (id: string) => {
    switch (id) {
      case "spa": return spaImageArray;
      case "massage": return massageImageArray;
      case "gym": return gymImageArray;
      case "pool": return poolImageArray;
      default: return [];
    }
  };

  const getIconForExperience = (id: string) => {
    switch (id) {
      case "spa": return Sparkles;
      case "massage": return Flower2;
      case "gym": return Dumbbell;
      case "pool": return Waves;
      default: return Sparkles;
    }
  };

  const experiences = content?.experiences?.items?.map((item: any) => ({
    ...item,
    icon: getIconForExperience(item.id),
    images: getImagesForExperience(item.id),
  })) || [];
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background - simplified slide
      gsap.fromTo(
        bgRef.current,
        {
          xPercent: -15,
          opacity: 0.5,
          scale: 1.1,
        },
        {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        }
      );

      // Header - simplified rotate into view
      gsap.fromTo(
        headerRef.current,
        {
          yPercent: 25,
          opacity: 0,
          scale: 0.95,
        },
        {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        }
      );

      // Each card - simplified staggered reveal
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const direction = index % 3 === 0 ? 1 : index % 3 === 1 ? -1 : 0;

          gsap.fromTo(
            card,
            {
              yPercent: 20,
              xPercent: direction * 20,
              opacity: 0,
              scale: 0.95,
            },
            {
              yPercent: 0,
              xPercent: 0,
              opacity: 1,
              scale: 1,
              ease: "power3.out",
              force3D: true,
              scrollTrigger: {
                trigger: card,
                start: "top bottom-=50",
                end: "center center",
                scrub: true,
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
                  {/* Image Carousel & Icon */}
                  <div className="relative group/image">
                    <ExperienceCarousel images={experience.images} title={experience.title} />

                    {/* Icon */}
                    <motion.div
                      className="absolute left-6 top-6 rounded-full bg-primary/90 p-4 backdrop-blur-sm z-20 shadow-lg"
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

      {/* Static blur elements instead of animated for performance */}
      <div
        className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-secondary/15 blur-2xl blur-element"
      />
      <div
        className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-primary/10 blur-2xl blur-element"
      />
    </section>
  );
};

export default ExperiencesParallax;
