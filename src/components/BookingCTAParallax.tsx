import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const BookingCTAParallax = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const { t } = useLanguage();
  const content = t("index");

  const formFields = [
    { id: "name", label: content?.booking?.form?.name?.label || "Full Name", type: "text", placeholder: content?.booking?.form?.name?.placeholder || "John Doe" },
    { id: "email", label: content?.booking?.form?.email?.label || "Email", type: "email", placeholder: content?.booking?.form?.email?.placeholder || "john@example.com" },
    { id: "checkin", label: content?.booking?.form?.checkin?.label || "Check-in Date", type: "date", placeholder: "" },
    { id: "checkout", label: content?.booking?.form?.checkout?.label || "Check-out Date", type: "date", placeholder: "" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background - zoom and rotate reveal
      gsap.fromTo(
        bgRef.current,
        {
          scale: 1.4,
          opacity: 0.4,
          rotationZ: -5,
          rotationY: -10,
        },
        {
          scale: 1,
          opacity: 1,
          rotationZ: 0,
          rotationY: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 2,
          },
        }
      );

      // Header - slide from above with rotation
      gsap.fromTo(
        headerRef.current,
        {
          yPercent: 60,
          opacity: 0,
          rotationX: -30,
          rotationZ: -10,
          scale: 0.8,
          z: -150,
        },
        {
          yPercent: 0,
          opacity: 1,
          rotationX: 0,
          rotationZ: 0,
          scale: 1,
          z: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top center",
            scrub: 1.5,
          },
        }
      );

      // Form - emerge from depth with scale
      gsap.fromTo(
        formRef.current,
        {
          yPercent: 40,
          opacity: 0,
          scale: 0.85,
          rotationX: 15,
          rotationY: 10,
          z: -250,
        },
        {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          z: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top bottom-=100",
            end: "center center",
            scrub: 1.8,
          },
        }
      );
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
          background: "var(--gradient-subtle)",
          transformStyle: "preserve-3d",
        }}
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div
            ref={headerRef}
            className="mb-12 text-center will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {content.booking.subtitle}
            </span>
            <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              {content.booking.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {content.booking.description}
            </p>
          </div>

          {/* Booking Form */}
          <div
            ref={formRef}
            className="rounded-3xl bg-card p-8 shadow-[var(--shadow-luxury)] will-change-transform md:p-12"
            style={{ transformStyle: "preserve-3d" }}
          >
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {formFields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.77, 0, 0.175, 1],
                    }}
                  >
                    <Label htmlFor={field.id} className="text-base">
                      {field.label}
                    </Label>
                    <Input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="mt-2 h-12 rounded-2xl border-2 transition-all duration-300 focus:border-primary"
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                  ease: [0.77, 0, 0.175, 1],
                }}
              >
                <Label htmlFor="guests" className="text-base">
                  {content.booking.form.guests.label}
                </Label>
                <Input
                  id="guests"
                  type="number"
                  placeholder={content.booking.form.guests.placeholder}
                  min="1"
                  className="mt-2 h-12 rounded-2xl border-2 transition-all duration-300 focus:border-primary"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  ease: [0.77, 0, 0.175, 1],
                }}
              >
                <Label htmlFor="message" className="text-base">
                  {content.booking.form.message.label}
                </Label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder={content.booking.form.message.placeholder}
                  className="mt-2 w-full rounded-2xl border-2 border-input bg-background px-4 py-3 text-sm transition-all duration-300 focus:border-primary focus:outline-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{
                  duration: 0.6,
                  delay: 0.6,
                  ease: [0.77, 0, 0.175, 1],
                }}
              >
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-lg text-primary-foreground transition-all duration-500 hover:scale-105 hover:shadow-[var(--shadow-luxury)]"
                >
                  {content.booking.form.submit}
                </Button>
              </motion.div>
            </form>
          </div>

          {/* Contact Info */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="text-muted-foreground">
              {content.booking.contact.text}{" "}
              <a href="tel:+1234567890" className="font-semibold text-primary hover:underline">
                {content.booking.contact.phone}
              </a>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Atmospheric Depth Elements */}
      <motion.div
        className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.3, 0.9, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-secondary/15 blur-[120px]"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 1.2, 1.1, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
};

export default BookingCTAParallax;
