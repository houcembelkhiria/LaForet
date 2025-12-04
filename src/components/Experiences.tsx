import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Sparkles, UtensilsCrossed, Mountain } from "lucide-react";

// Dynamically load images for experiences
const diningImages = import.meta.glob('@/assets/indoor/dining/*.{jpg,jpeg,png,JPG,JPEG}', { eager: true });
const utilitiesImages = import.meta.glob('@/assets/utilities/*.{jpg,jpeg,png,JPG,JPEG}', { eager: true });
const outdoorImages = import.meta.glob('@/assets/outdoor/*.{jpg,jpeg,png,JPG,JPEG}', { eager: true });

const diningImageArray = Object.values(diningImages).map((module: any) => module.default);
const utilitiesImageArray = Object.values(utilitiesImages).map((module: any) => module.default);
const outdoorImageArray = Object.values(outdoorImages).map((module: any) => module.default);

const Experiences = memo(() => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const experiences = useMemo(
    () => [
      {
        id: 1,
        icon: Sparkles,
        title: "Wellness & Spa",
        description: "Rejuvenate your senses with our world-class spa treatments and wellness programs",
        image: utilitiesImageArray[0] || "",
      },
      {
        id: 2,
        icon: UtensilsCrossed,
        title: "Fine Dining",
        description: "Savor exquisite cuisine crafted by our award-winning chefs using local ingredients",
        image: diningImageArray[0] || "",
      },
      {
        id: 3,
        icon: Mountain,
        title: "Nature Activities",
        description: "Explore pristine trails, meditation spots, and breathtaking viewpoints",
        image: outdoorImageArray[0] || "",
      },
    ],
    []
  );

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden py-20"
      style={{
        background: "var(--gradient-nature)",
      }}
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Curated Experiences
          </span>
          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            Discover Your Journey
          </h2>
        </motion.div>

        {/* Experience Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {experiences.map((experience, index) => {
            const Icon = experience.icon;
            return (
              <motion.div
                key={experience.id}
                className="group relative overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)] transition-all duration-500 hover:shadow-[var(--shadow-luxury)]"
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={
                  inView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 100, scale: 0.9 }
                }
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.77, 0, 0.175, 1],
                }}
                whileHover={{ y: -10 }}
              >
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
            );
          })}
        </div>
      </div>

      {/* Decorative Blur Elements */}
      <motion.div
        className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-[100px]"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[100px]"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
});

Experiences.displayName = "Experiences";

export default Experiences;
