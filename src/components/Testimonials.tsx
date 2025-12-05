import { memo } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { reviews } from "@/data/reviews";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/contexts/LanguageContext";

const Testimonials = memo(() => {
  const { t } = useLanguage();
  const content = t("index");

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {content?.testimonials?.subtitle || "Guest Reviews"}
          </span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            {content?.testimonials?.title || "What Our Guests Say"}
          </h2>
        </motion.div>
      </div>

      {/* Infinite Scroll Marquee */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />

        <div className="flex w-max animate-marquee gap-6 py-4 hover:[animation-play-state:paused]">
          {[...reviews, ...reviews].map((review, index) => (
            <motion.div
              key={`${review.name}-${index}`}
              className="relative w-[350px] flex-shrink-0 rounded-2xl bg-card p-8 shadow-sm transition-shadow hover:shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Quote className="mb-4 h-8 w-8 text-primary/20" />

              <div className="mb-6 min-h-[100px]">
                <p className="text-muted-foreground line-clamp-4 italic">
                  "{review.review}"
                </p>
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <h4 className="font-bold">{review.name}</h4>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < Math.round(Number(review.score) / 2) ? "currentColor" : "none"}
                        className={i < Math.round(Number(review.score) / 2) ? "" : "text-muted"}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {review.score}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Testimonials.displayName = "Testimonials";

export default Testimonials;
