import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "New York, USA",
    text: "An absolutely magical experience. The blend of luxury and nature created the perfect escape. Every detail was thoughtfully curated, and the staff went above and beyond.",
    rating: 5,
  },
  {
    name: "James Chen",
    location: "Singapore",
    text: "Serenity Lodge exceeded all expectations. The views were breathtaking, the rooms were pristine, and the dining experience was world-class. A true hidden gem.",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    location: "Barcelona, Spain",
    text: "The perfect place to disconnect and recharge. The spa treatments were divine, and waking up to mountain views every morning was pure bliss. Cannot recommend enough.",
    rating: 5,
  },
];

const TestimonialsParallax = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background - diagonal sweep with atmospheric fade
      gsap.fromTo(
        bgRef.current,
        {
          xPercent: 40,
          yPercent: -20,
          opacity: 0.5,
          scale: 1.3,
          rotationY: 10,
          rotationZ: -3,
        },
        {
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          rotationZ: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 2.5,
          },
        }
      );

      // Header - spiral reveal from depth
      gsap.fromTo(
        headerRef.current,
        {
          yPercent: 50,
          xPercent: 20,
          opacity: 0,
          rotationX: 25,
          rotationY: -15,
          rotationZ: 8,
          scale: 0.85,
          z: -200,
        },
        {
          yPercent: 0,
          xPercent: 0,
          opacity: 1,
          rotationX: 0,
          rotationY: 0,
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

      // Cards - cascading diagonal entry
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const offsetX = index === 0 ? -50 : index === 1 ? 0 : 50;
          const offsetY = index === 1 ? 40 : 20;
          
          gsap.fromTo(
            card,
            {
              yPercent: offsetY + 30,
              xPercent: offsetX,
              opacity: 0,
              scale: 0.75,
              rotationY: index === 1 ? 0 : (index === 0 ? -25 : 25),
              rotationX: 20,
              z: -200 - index * 50,
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
                start: "top bottom-=80",
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
      className="relative min-h-screen w-full overflow-hidden py-32"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Animated Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background: "var(--gradient-luxury)",
          transformStyle: "preserve-3d",
        }}
      />

      <div className="container relative z-10 mx-auto px-6">
        {/* Section Header */}
        <div 
          ref={headerRef} 
          className="mb-16 text-center text-white will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-white/80">
            Guest Stories
          </span>
          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            What Our Guests Say
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="group relative h-full overflow-hidden rounded-3xl bg-white/10 p-8 backdrop-blur-md transition-all duration-500 hover:bg-white/20"
                whileHover={{ y: -10 }}
              >
                {/* Stars */}
                <div className="mb-6 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false, amount: 0.5 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
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
            </div>
          ))}
        </div>
      </div>

      {/* Animated Light Rays */}
      <motion.div
        className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-transparent via-white/30 to-transparent"
        animate={{ y: [-200, 200] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-0 h-full w-2 bg-gradient-to-b from-transparent via-white/30 to-transparent"
        animate={{ y: [200, -200] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    </section>
  );
};

export default TestimonialsParallax;
