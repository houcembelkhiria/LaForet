import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import aboutImage from "@/assets/about-hotel.jpg";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

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
                Welcome to La Foret
              </span>
            </motion.div>

            <h2 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Where Luxury Meets Nature
            </h2>

            <p className="text-lg leading-relaxed text-muted-foreground">
              Nestled in the heart of pristine wilderness, La Foret offers an unparalleled escape 
              from the ordinary. Our boutique hotel seamlessly blends modern luxury with natural beauty, 
              creating an experience that rejuvenates both body and soul.
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground">
              With breathtaking mountain views, world-class amenities, and personalized service, 
              every moment at La Foret is designed to exceed your expectations.
            </p>

            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center gap-8">
                <div>
                  <div className="text-4xl font-bold text-primary">20+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-4xl font-bold text-primary">45</div>
                  <div className="text-sm text-muted-foreground">Luxury Rooms</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-4xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Guest Satisfaction</div>
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
