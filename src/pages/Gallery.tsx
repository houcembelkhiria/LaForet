import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import heroImage from "@/assets/hero-hotel.jpg";
import aboutImage from "@/assets/about-hotel.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomSuite from "@/assets/room-suite.jpg";
import expSpa from "@/assets/experience-spa.jpg";
import expDining from "@/assets/experience-dining.jpg";
import expNature from "@/assets/experience-nature.jpg";

const galleryImages = [
  { id: 1, src: heroImage, title: "La Foret Exterior", category: "Hotel" },
  { id: 2, src: aboutImage, title: "Architecture", category: "Hotel" },
  { id: 3, src: roomDeluxe, title: "Deluxe Forest View", category: "Rooms" },
  { id: 4, src: roomSuite, title: "Mountain Suite", category: "Rooms" },
  { id: 5, src: expSpa, title: "Spa Experience", category: "Experiences" },
  { id: 6, src: expDining, title: "Fine Dining", category: "Experiences" },
  { id: 7, src: expNature, title: "Nature Trails", category: "Experiences" },
];

const Gallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Page Header */}
      <motion.section
        className="relative flex h-[50vh] items-center justify-center bg-gradient-to-b from-secondary/30 to-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            className="mb-4 text-5xl font-bold md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Gallery
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore the beauty of La Foret
          </motion.p>
        </div>
      </motion.section>

      {/* Gallery Grid */}
      <section ref={ref} className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="group relative overflow-hidden rounded-3xl shadow-[var(--shadow-soft)] transition-shadow duration-500 hover:shadow-[var(--shadow-luxury)]"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.77, 0, 0.175, 1],
                }}
              >
                <div className="relative h-80 overflow-hidden">
                  <motion.img
                    src={image.src}
                    alt={image.title}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Overlay Text */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mb-1 text-sm uppercase tracking-wider opacity-80">
                      {image.category}
                    </p>
                    <h3 className="text-xl font-bold">{image.title}</h3>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
