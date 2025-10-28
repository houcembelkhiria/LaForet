import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomSuite from "@/assets/room-suite.jpg";

gsap.registerPlugin(ScrollTrigger);

const rooms = [
  {
    id: 1,
    slug: "deluxe-forest",
    name: "Deluxe Forest View",
    description: "Spacious room with panoramic forest views and modern amenities",
    image: roomDeluxe,
    price: "From $350/night",
    features: ["King Bed", "Forest View", "45 m²", "Modern Bath"],
  },
  {
    id: 2,
    slug: "mountain-suite",
    name: "Mountain Suite",
    description: "Luxurious suite with living area and breathtaking mountain vistas",
    image: roomSuite,
    price: "From $550/night",
    features: ["Living Area", "Mountain View", "75 m²", "Premium Bath"],
  },
];

const RoomsParallax = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header parallax - dramatic entrance from above with spiral
      gsap.fromTo(
        headerRef.current,
        {
          yPercent: 40,
          xPercent: -15,
          opacity: 0,
          rotationX: -20,
          rotationZ: -8,
          scale: 0.9,
          z: -150,
        },
        {
          yPercent: 0,
          xPercent: 0,
          opacity: 1,
          rotationX: 0,
          rotationZ: 0,
          scale: 1,
          z: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top center",
            scrub: 1.8,
          },
        }
      );

      // Each card - alternating directional reveals with depth
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const direction = index % 2 === 0 ? -1 : 1;
          
          gsap.fromTo(
            card,
            {
              yPercent: 30 + index * 8,
              xPercent: direction * 35,
              opacity: 0,
              scale: 0.8,
              rotationY: direction * 25,
              rotationX: 12,
              z: -180,
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
                start: "top bottom-=120",
                end: "center center",
                scrub: 2,
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
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div 
          ref={headerRef} 
          className="mb-16 text-center will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Rooms & Suites
          </span>
          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            Your Perfect Sanctuary
          </h2>
        </div>

        {/* Room Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div className="group relative overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)] transition-shadow duration-500 hover:shadow-[var(--shadow-luxury)]">
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <motion.img
                    src={room.image}
                    alt={room.name}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

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
                      View Details
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsParallax;
