import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  const contactInfo = [
    { icon: MapPin, text: "123 Mountain View Drive, Wilderness Valley" },
    { icon: Phone, text: "+1 (234) 567-890" },
    { icon: Mail, text: "hello@laforet.com" },
  ];

  return (
    <footer ref={ref} className="relative w-full overflow-hidden bg-foreground py-16 text-background">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          >
            <h3 className="mb-4 text-3xl font-bold">La Foret</h3>
            <p className="mb-6 text-background/80 leading-relaxed">
              Your sanctuary in the heart of nature. Experience luxury surrounded by pristine wilderness.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="rounded-full bg-background/10 p-3 backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:scale-110"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
          >
            <h4 className="mb-6 text-xl font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {["Rooms", "Experiences", "Dining", "Spa", "Gallery", "About Us"].map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                >
                  <a
                    href="#"
                    className="text-background/80 transition-colors duration-300 hover:text-primary"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.77, 0, 0.175, 1] }}
          >
            <h4 className="mb-6 text-xl font-semibold">Contact Us</h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <Icon className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-background/80">{info.text}</span>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 border-t border-background/20 pt-8 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-sm text-background/70">
            © {new Date().getFullYear()} La Foret. All rights reserved. Crafted with passion for luxury hospitality.
          </p>
        </motion.div>
      </div>

      {/* Decorative Element */}
      <motion.div
        className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </footer>
  );
};

export default Footer;
