import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

// Load room hero images
const roomHeroImages = import.meta.glob('@/assets/indoor/rooms/room-*.jpg', { eager: true });

// Map room slugs to their hero images
const getHeroImageBySlug = (slug: string): string => {
  const imageMap: Record<string, string> = {
    'chambre-standard': 'room-standard-hero',
    'suite-junior': 'room-junior-hero',
    'suite-senior': 'room-senior-hero',
  };

  const imageName = imageMap[slug] || 'room-standard-hero';
  const imageEntry = Object.entries(roomHeroImages).find(([path]) =>
    path.includes(imageName)
  );

  return imageEntry ? (imageEntry[1] as any).default : '';
};

gsap.registerPlugin(ScrollTrigger);

const RoomsParallax = () => {
  const { t } = useLanguage();
  const content = t("index");

  const rooms = content?.rooms?.items?.map((room: any) => ({
    ...room,
    image: getHeroImageBySlug(room.slug),
  })) || [];
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
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
              y: 100,
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
                start: "top bottom-=50",
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
      className="relative min-h-screen w-full overflow-hidden bg-muted py-32"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {content.rooms.subtitle}
          </span>
          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            {content.rooms.title}
          </h2>
        </div>

        {/* Room Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="opacity-0 will-change-transform"
              style={{ contain: "content" }}
            >
              <div className="group relative overflow-hidden rounded-3xl bg-card shadow-lg transition-shadow duration-300 hover:shadow-xl"
                style={{ transform: "translateZ(0)" }}
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <motion.img
                    src={room.image}
                    alt={room.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="auto"
                    width={800}
                    height={600}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Hover Overlay Text */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-lg">{room.description}</p>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="mb-2 text-2xl font-bold">{room.name}</h3>
                      <p className="text-lg text-primary">{room.price}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {room.features.map((feature, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-muted px-4 py-1 text-sm text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Link to={`/rooms/${room.slug}`} className="w-full">
                    <Button
                      className="w-full bg-primary text-primary-foreground transition-all duration-500 hover:scale-105"
                      size="lg"
                    >
                      {content.rooms.viewDetails}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsParallax;
