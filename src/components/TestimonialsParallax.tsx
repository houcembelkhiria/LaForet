import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const TestimonialsParallax = () => {
  const { t } = useLanguage();
  const content = t("index");
  const testimonials = content?.testimonials?.items || [];
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background - simplified fade in
      gsap.fromTo(
        bgRef.current,
        {
          xPercent: 20,
          opacity: 0.5,
          scale: 1.1,
        },
        {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          ease: "power2.inOut",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        }
      );

      // Header - simplified reveal
      gsap.fromTo(
        headerRef.current,
        {
          yPercent: 30,
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

      // Cards - simplified cascading entry
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const offsetX = index === 0 ? -20 : index === 1 ? 0 : 20;

          gsap.fromTo(
            card,
            {
              yPercent: 20,
              xPercent: offsetX,
              opacity: 0,
              scale: 0.9,
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
                start: "top bottom-=80",
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
            {content.testimonials.subtitle}
          </span>
          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            {content.testimonials.title}
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

      {/* Static accent lines instead of animated ones for performance */}
      <div
        className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-white/20 to-transparent"
      />
      <div
        className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-white/20 to-transparent"
      />
    </section>
  );
};

export default TestimonialsParallax;
