import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CONTACT_INFO } from "@/config/constants";

const BookingCTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const formFields = [
    { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
    { id: "email", label: "Email", type: "email", placeholder: "john@example.com" },
    { id: "checkin", label: "Check-in Date", type: "date", placeholder: "" },
    { id: "checkout", label: "Check-out Date", type: "date", placeholder: "" },
  ];

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden bg-secondary/5 py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          >
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Reserve Your Experience
            </span>
            <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Book Your Stay at La Foret
            </h2>
            <p className="text-lg text-muted-foreground">
              Begin your journey to tranquility. Our team will contact you to finalize your reservation.
            </p>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            className="rounded-3xl bg-card p-8 shadow-[var(--shadow-soft)] md:p-12"
            initial={{ opacity: 0, y: 100 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
          >
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {formFields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    className={field.id === "name" || field.id === "email" ? "" : ""}
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + index * 0.1,
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
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{
                  duration: 0.6,
                  delay: 0.8,
                  ease: [0.77, 0, 0.175, 1],
                }}
              >
                <Label htmlFor="guests" className="text-base">
                  Number of Guests
                </Label>
                <Input
                  id="guests"
                  type="number"
                  placeholder="2"
                  min="1"
                  className="mt-2 h-12 rounded-2xl border-2 transition-all duration-300 focus:border-primary"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{
                  duration: 0.6,
                  delay: 0.9,
                  ease: [0.77, 0, 0.175, 1],
                }}
              >
                <Label htmlFor="message" className="text-base">
                  Special Requests (Optional)
                </Label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Let us know if you have any special requirements..."
                  className="mt-2 w-full rounded-2xl border-2 border-input bg-background px-4 py-3 text-sm transition-all duration-300 focus:border-primary focus:outline-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.6,
                  delay: 1,
                  ease: [0.77, 0, 0.175, 1],
                }}
              >
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-lg text-primary-foreground transition-all duration-500 hover:scale-105 hover:shadow-[var(--shadow-luxury)]"
                >
                  Reserve Your Stay
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className="text-muted-foreground">
              Prefer to speak with us directly?{" "}
              <a href={CONTACT_INFO.phoneHref} className="font-semibold text-primary hover:underline">
                Call {CONTACT_INFO.phone}
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;
