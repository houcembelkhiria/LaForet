import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AboutComponent from "@/components/About";
import { motion } from "framer-motion";

const About = () => {
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
            About La Foret
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your sanctuary in the heart of nature
          </motion.p>
        </div>
      </motion.section>

      <AboutComponent />
      <Footer />
    </div>
  );
};

export default About;
