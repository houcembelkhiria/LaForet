import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import aboutImage from "@/assets/about-hotel.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { t } = useLanguage();
  const content = t("about");

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

            <h2 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
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
                  <div className="text-4xl font-bold text-primary">{content.content.stats.experience.value}</div>
                  <div className="text-sm text-muted-foreground">{content.content.stats.experience.label}</div>
                </div>
                <div className="h-12 w-px bg-border" />
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

          {/* Image - Slides from Left */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -100 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="overflow-hidden rounded-3xl shadow-[var(--shadow-soft)]">
              <motion.img
                src={aboutImage}
                alt="La Foret Architecture"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                fetchPriority="auto"
                width={800}
                height={600}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
              />
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
