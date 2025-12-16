import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTACT_INFO } from "@/config/constants";
import { ChevronDown, Check } from "lucide-react";

// Load room hero images
const roomHeroImages = import.meta.glob('@/assets/indoor/rooms/room-*.jpg', { eager: true });

const getRoomImage = (slug: string): string => {
  const imageMap: Record<string, string> = {
    'chambre-standard': 'room-standard-hero',
    'suite-junior': 'room-junior-hero',
    'suite-senior': 'room-senior-hero',
  };
  const imageName = imageMap[slug] || 'room-standard-hero';
  const entry = Object.entries(roomHeroImages).find(([path]) => path.includes(imageName));
  return entry ? (entry[1] as any).default : '';
};

gsap.registerPlugin(ScrollTrigger);

const BookingCTAParallax = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [isRoomDropdownOpen, setIsRoomDropdownOpen] = useState(false);

  const { t } = useLanguage();
  const content = t("index");

  // Get rooms from content
  const rooms = content?.rooms?.items || [];

  const formFields = [
    { id: "name", label: content?.booking?.form?.name?.label || "Full Name", type: "text", placeholder: content?.booking?.form?.name?.placeholder || "John Doe" },
    { id: "email", label: content?.booking?.form?.email?.label || "Email", type: "email", placeholder: content?.booking?.form?.email?.placeholder || "john@example.com" },
    { id: "checkin", label: content?.booking?.form?.checkin?.label || "Check-in Date", type: "date", placeholder: "" },
    { id: "checkout", label: content?.booking?.form?.checkout?.label || "Check-out Date", type: "date", placeholder: "" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background - simplified zoom reveal
      gsap.fromTo(
        bgRef.current,
        {
          scale: 1.15,
          opacity: 0.6,
        },
        {
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        }
      );

      // Header - simplified slide from above
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

      // Form - simplified emerge from depth
      gsap.fromTo(
        formRef.current,
        {
          yPercent: 25,
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
            trigger: formRef.current,
            start: "top bottom-=100",
            end: "center center",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="booking"
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

              {/* Room Type Selector */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{
                  duration: 0.6,
                  delay: 0.35,
                  ease: [0.77, 0, 0.175, 1],
                }}
                className="relative"
                style={{ zIndex: isRoomDropdownOpen ? 100 : 1 }}
              >
                <Label htmlFor="roomType" className="text-base">
                  {content?.booking?.form?.roomType?.label || "Room Type"}
                </Label>
                <div className="relative mt-2">
                  <button
                    type="button"
                    onClick={() => setIsRoomDropdownOpen(!isRoomDropdownOpen)}
                    className="flex h-auto min-h-[4rem] w-full items-center justify-between rounded-2xl border-2 border-input bg-background px-4 py-3 text-left transition-all duration-300 hover:border-primary/50 focus:border-primary focus:outline-none"
                  >
                    {selectedRoom ? (
                      <div className="flex items-center gap-4">
                        <img
                          src={getRoomImage(selectedRoom)}
                          alt=""
                          className="h-12 w-20 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">
                            {rooms.find((r: any) => r.slug === selectedRoom)?.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {rooms.find((r: any) => r.slug === selectedRoom)?.price}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">
                        {content?.booking?.form?.roomType?.placeholder || "Select a room type"}
                      </span>
                    )}
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isRoomDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isRoomDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 right-0 top-full mt-2 max-h-[400px] overflow-y-auto rounded-2xl border-2 border-input bg-card shadow-2xl"
                        style={{ zIndex: 9999 }}
                      >
                        {rooms.map((room: any) => (
                          <button
                            key={room.slug}
                            type="button"
                            onClick={() => {
                              setSelectedRoom(room.slug);
                              setIsRoomDropdownOpen(false);
                            }}
                            className={`flex w-full items-center gap-4 p-4 text-left transition-all duration-200 hover:bg-accent ${selectedRoom === room.slug ? 'bg-accent/50' : ''
                              }`}
                          >
                            <img
                              src={getRoomImage(room.slug)}
                              alt={room.name}
                              className="h-16 w-24 rounded-xl object-cover shadow-md"
                            />
                            <div className="flex-1">
                              <p className="font-semibold">{room.name}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {room.description}
                              </p>
                              <p className="mt-1 text-sm font-medium text-primary">
                                {room.price}
                              </p>
                            </div>
                            {selectedRoom === room.slug && (
                              <Check className="h-5 w-5 text-primary" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

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
              <a href={CONTACT_INFO.phoneHref} className="font-semibold text-primary hover:underline">
                {CONTACT_INFO.phone}
              </a>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Static blur elements for performance */}
      <div
        className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-primary/10 blur-2xl blur-element"
      />
      <div
        className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-secondary/10 blur-2xl blur-element"
      />
    </section>
  );
};

export default BookingCTAParallax;
