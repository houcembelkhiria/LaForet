import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star } from "lucide-react";

const Testimonials = memo(() => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const testimonials = useMemo(
    () => [
      {
        id: 1,
        name: "Sarah Mitchell",
        location: "New York, USA",
        text: "An absolutely magical experience. The blend of luxury and nature created the perfect escape. Every detail was thoughtfully curated, and the staff went above and beyond.",
        rating: 5,
      },
      {
        id: 2,
        name: "James Chen",
        location: "Singapore",
        text: "Serenity Lodge exceeded all expectations. The views were breathtaking, the rooms were pristine, and the dining experience was world-class. A true hidden gem.",
        rating: 5,
      },
      {
        id: 3,
        name: "Emma Rodriguez",
        location: "Barcelona, Spain",
        text: "The perfect place to disconnect and recharge. The spa treatments were divine, and waking up to mountain views every morning was pure bliss. Cannot recommend enough.",
        rating: 5,
      },
    ],
    []
  );

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden py-20"
      style={{
        background: "var(--gradient-luxury)",
      }}
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-white/80">
            Guest Stories
          </span>
          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            What Our Guests Say
          </h2>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="group relative overflow-hidden rounded-3xl bg-white/10 p-8 backdrop-blur-md transition-all duration-500 hover:bg-white/20"
              initial={{ opacity: 0, y: 100 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.77, 0, 0.175, 1],
              }}
              whileHover={{ y: -10 }}
            >
              {/* Stars */}
              <div className="mb-6 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 }}
                  >
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <p className="mb-8 text-lg leading-relaxed text-white/90">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="border-t border-white/20 pt-6">
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-sm text-white/70">{testimonial.location}</div>
              </div>

              {/* Decorative Quote Mark */}
              <div className="absolute -bottom-4 -right-4 text-9xl font-serif text-white/5">
                "
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Background Elements */}
      <motion.div
        className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-white/30 to-transparent"
        animate={{ y: [-100, 100] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-white/30 to-transparent"
        animate={{ y: [100, -100] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />
    </section>
  );
});

Testimonials.displayName = "Testimonials";

export default Testimonials;
