import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Dumbbell, Waves, Flower2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Load experience images - just get one image per category
const spaImages = import.meta.glob('@/assets/utilities/spa/*.{jpg,jpeg,png,JPG,JPEG}', { eager: true });
const massageImages = import.meta.glob('@/assets/utilities/massage/*.{jpg,jpeg,png,JPG,JPEG}', { eager: true });
const gymImages = import.meta.glob('@/assets/utilities/gym/*.{jpg,jpeg,png,JPG,JPEG}', { eager: true });
const poolImages = import.meta.glob('@/assets/utilities/pool/*.{jpg,jpeg,png,JPG,JPEG}', { eager: true });

// Get just the first image from each category
const getFirstImage = (images: Record<string, any>) => {
  const entries = Object.values(images);
  return entries.length > 0 ? (entries[0] as any).default : '';
};

const spaImage = getFirstImage(spaImages);
const massageImage = getFirstImage(massageImages);
const gymImage = getFirstImage(gymImages);
const poolImage = getFirstImage(poolImages);

gsap.registerPlugin(ScrollTrigger);

// Simple static image instead of carousel
const ExperienceImage = ({ image, title }: { image: string, title: string }) => {
  return (
    <div className="relative h-64 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </div>
  );
};


const ExperiencesParallax = () => {
  const { t } = useLanguage();
  const content = t("index");

  const getImageForExperience = (id: string): string => {
    switch (id) {
      case "spa": return spaImage;
      case "massage": return massageImage;
      case "gym": return gymImage;
      case "pool": return poolImage;
      default: return '';
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
    image: getImageForExperience(item.id),
  })) || [];
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background - simple fade and scale
      gsap.fromTo(
        bgRef.current,
        {
          opacity: 0.5,
          scale: 1.1,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Header - simple slide up and fade
      gsap.fromTo(
        headerRef.current,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom+=100",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Each card - simple staggered fade up
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              y: 80,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              force3D: true,
              scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play reverse play reverse",
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
    >
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{ background: "var(--gradient-nature)" }}
      />

      <div className="container relative z-10 mx-auto px-6">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="mb-16 text-center"
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
                className="opacity-0 will-change-transform"
              >
                <div className="group relative overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)] transition-shadow duration-500 hover:shadow-[var(--shadow-luxury)]"
                  style={{ transform: "translateZ(0)" }}
                >
                  {/* Static Image & Icon */}
                  <div className="relative">
                    <ExperienceImage image={experience.image} title={experience.title} />

                    {/* Icon */}
                    <div
                      className="absolute left-6 top-6 rounded-full bg-primary/95 p-4 z-20 shadow-lg transition-transform duration-300 hover:scale-110"
                    >
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="mb-3 text-2xl font-bold">{experience.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {experience.description}
                    </p>

                    {/* Hover Effect Line - CSS only */}
                    <div
                      className="mt-6 h-1 bg-gradient-to-r from-primary to-secondary w-0 group-hover:w-full transition-all duration-500"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>


    </section>
  );
};

export default ExperiencesParallax;
