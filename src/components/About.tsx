import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/contexts/LanguageContext";

// Load indoor images lazily
const indoorImages = import.meta.glob('@/assets/indoor/*.{jpg,jpeg,png,JPG,JPEG}');
const indoorImageLoaders = Object.values(indoorImages);

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { t } = useLanguage();
  const content = t("about");

  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>(new Array(indoorImageLoaders.length).fill(""));

  // Smart sequential preloading
  useEffect(() => {
    if (!inView) return;

    const loadImage = async (index: number) => {
      if (loadedImages[index]) return; // Already loaded

      try {
        const module: any = await indoorImageLoaders[index]();
        setLoadedImages(prev => {
          const newState = [...prev];
          newState[index] = module.default;
          return newState;
        });
      } catch (error) {
        console.error("Failed to load image", index, error);
      }
    };

    // Load current, next, and previous images immediately
    loadImage(currentImageIndex);
    loadImage((currentImageIndex + 1) % indoorImageLoaders.length);
    loadImage((currentImageIndex - 1 + indoorImageLoaders.length) % indoorImageLoaders.length);

    // Then progressively load the rest in background
    const timeout = setTimeout(() => {
      indoorImageLoaders.forEach((_, idx) => {
        if (idx !== currentImageIndex) loadImage(idx);
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [inView, currentImageIndex]);

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    if (indoorImageLoaders.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % indoorImageLoaders.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden bg-background py-20">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content - Slides from Right */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 100 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={inView ? { opacity: 1, letterSpacing: "0.2em" } : { opacity: 0, letterSpacing: "0.5em" }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {content.content.welcome}
              </span>
            </motion.div>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
              {content.content.title}
            </h2>

            <p className="text-lg leading-relaxed text-muted-foreground">
              {content.content.description1}
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground">
              {content.content.description2}
            </p>

            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center gap-8">
                <div>
                  <div className="text-4xl font-bold text-primary">{content.content.stats.rooms.value}</div>
                  <div className="text-sm text-muted-foreground">{content.content.stats.rooms.label}</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-4xl font-bold text-primary">{content.content.stats.satisfaction.value}</div>
                  <div className="text-sm text-muted-foreground">{content.content.stats.satisfaction.label}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Carousel - Slides from Left */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -100 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-[var(--shadow-soft)] aspect-[4/3] bg-muted">
              {/* Horizontal sliding carousel */}
              <motion.div
                className="flex h-full"
                animate={{ x: `${-currentImageIndex * 100}%` }}
                transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {indoorImageLoaders.map((_, index) => {
                  const src = loadedImages[index];
                  const isLoaded = !!src;

                  return (
                    <motion.div
                      key={index}
                      className="relative min-w-full h-full"
                      style={{
                        opacity: isLoaded ? 1 : 0,
                      }}
                    >
                      {isLoaded && (
                        <motion.img
                          src={src}
                          alt={`La Foret Interior ${index + 1}`}
                          className="h-full w-full object-cover"
                          loading={index === 0 ? "eager" : "lazy"}
                          fetchPriority={index === 0 ? "high" : "auto"}
                          decoding="async"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none z-10" />
            </div>

            {/* Decorative Element */}
            <motion.div
              className="absolute -bottom-6 -right-6 -z-10 h-64 w-64 rounded-3xl bg-secondary/30 blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
