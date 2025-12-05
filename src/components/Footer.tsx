import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTACT_INFO } from "@/config/constants";

const Footer = memo(() => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { t } = useLanguage();
  const content = t("common");

  const socialLinks = useMemo(
    () => [
      { id: "facebook", icon: Facebook, href: CONTACT_INFO.social.facebook, label: content.footer.social.facebook },
      { id: "instagram", icon: Instagram, href: CONTACT_INFO.social.instagram, label: content.footer.social.instagram },
      { id: "twitter", icon: Twitter, href: CONTACT_INFO.social.twitter, label: content.footer.social.twitter },
    ],
    [content.footer.social]
  );

  const contactInfo = useMemo(
    () => [
      { id: "address", icon: MapPin, text: CONTACT_INFO.address.full },
      { id: "phone", icon: Phone, text: CONTACT_INFO.phone },
      { id: "email", icon: Mail, text: CONTACT_INFO.email },
    ],
    []
  );

  const quickLinks = useMemo(
    () => content.footer.quickLinks.links,
    [content.footer.quickLinks.links]
  );

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
            <h3 className="mb-4 text-3xl font-bold">{content.footer.brand}</h3>
            <p className="mb-6 text-background/80 leading-relaxed">
              {content.footer.description}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.id}
                    href={social.href}
                    aria-label={social.label}
                    className="rounded-full bg-background/10 p-3 backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:scale-110"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + socialLinks.indexOf(social) * 0.1 }}
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
            <h4 className="mb-6 text-xl font-semibold">{content.footer.quickLinks.title}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link: { name: string; path: string }, index: number) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="text-background/80 transition-colors duration-300 hover:text-primary"
                  >
                    {link.name}
                  </Link>
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
            <h4 className="mb-6 text-xl font-semibold">{content.footer.contact.title}</h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.li
                    key={info.id}
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
            {content.footer.copyright.replace("{year}", new Date().getFullYear().toString())}
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
});

Footer.displayName = "Footer";

export default Footer;
