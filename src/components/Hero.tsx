import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-hotel.jpg";

const Hero = () => {
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const title = "La Foret: A Stay Beyond Ordinary";
  const words = title.split(" ");

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1 }}
        whileInView={{ scale: 1.1 }}
        transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
      >
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block">
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={`${wordIndex}-${letterIndex}`}
                  variants={letterVariants}
                  transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] as any }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              {wordIndex < words.length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="mb-12 max-w-2xl text-lg text-white/90 md:text-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        >
          Discover timeless comfort surrounded by nature
        </motion.p>

        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground shadow-[var(--shadow-luxury)] transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          >
            Book Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-secondary bg-secondary/20 text-white backdrop-blur-sm transition-all duration-500 hover:bg-secondary hover:text-secondary-foreground hover:scale-105"
          >
            Explore Rooms
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="h-12 w-8 rounded-full border-2 border-white/50">
          <motion.div
            className="mx-auto mt-2 h-2 w-2 rounded-full bg-white"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
