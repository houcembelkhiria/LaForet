import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Bed,
  Users,
  Maximize,
  Wifi,
  Coffee,
  Wind,
  Tv,
  Bath,
  Mountain,
  Shield,
  Sparkles,
  Home,
} from "lucide-react";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomSuite from "@/assets/room-suite.jpg";

const roomsData: Record<string, any> = {
  "deluxe-forest": {
    id: "deluxe-forest",
    name: "Deluxe Forest View",
    tagline: "Immerse yourself in nature's embrace",
    description:
      "Experience the perfect blend of comfort and natural beauty in our Deluxe Forest View room. Wake up to panoramic views of lush forests and enjoy modern amenities in an elegantly designed space.",
    price: 350,
    image: roomDeluxe,
    gallery: [roomDeluxe, roomSuite, roomDeluxe],
    specs: [
      { icon: Bed, label: "King Bed", value: "1 King" },
      { icon: Users, label: "Occupancy", value: "2 Adults" },
      { icon: Maximize, label: "Room Size", value: "45 m²" },
      { icon: Mountain, label: "View", value: "Forest" },
    ],
    amenities: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: Coffee, label: "Coffee Maker" },
      { icon: Wind, label: "Climate Control" },
      { icon: Tv, label: "55\" Smart TV" },
      { icon: Bath, label: "Luxury Bathroom" },
      { icon: Shield, label: "Safe Deposit Box" },
      { icon: Sparkles, label: "Daily Housekeeping" },
      { icon: Home, label: "Private Balcony" },
    ],
    features: [
      "Premium Egyptian cotton linens",
      "Rainfall shower with designer toiletries",
      "Mini bar and tea/coffee facilities",
      "Work desk with ergonomic chair",
      "Blackout curtains for restful sleep",
      "In-room dining available 24/7",
    ],
  },
  "mountain-suite": {
    id: "mountain-suite",
    name: "Mountain Suite",
    tagline: "Luxury elevated to new heights",
    description:
      "Indulge in our spacious Mountain Suite featuring a separate living area, breathtaking mountain vistas, and premium amenities. Perfect for those seeking the ultimate luxury experience.",
    price: 550,
    image: roomSuite,
    gallery: [roomSuite, roomDeluxe, roomSuite],
    specs: [
      { icon: Bed, label: "King Bed", value: "1 King" },
      { icon: Users, label: "Occupancy", value: "2-4 Adults" },
      { icon: Maximize, label: "Suite Size", value: "75 m²" },
      { icon: Mountain, label: "View", value: "Mountain" },
    ],
    amenities: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: Coffee, label: "Espresso Machine" },
      { icon: Wind, label: "Climate Control" },
      { icon: Tv, label: "65\" Smart TV" },
      { icon: Bath, label: "Premium Spa Bath" },
      { icon: Shield, label: "Safe Deposit Box" },
      { icon: Sparkles, label: "Twice Daily Housekeeping" },
      { icon: Home, label: "Private Terrace" },
    ],
    features: [
      "Separate living and sleeping areas",
      "Premium Italian marble bathroom",
      "Complimentary champagne on arrival",
      "Luxury bath products and plush robes",
      "Dedicated workspace with city views",
      "Priority room service and concierge",
    ],
  },
};

const RoomDetails = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const room = roomId ? roomsData[roomId] : roomsData["deluxe-forest"];
  
  const [heroRef, heroInView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [detailsRef, detailsInView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [bookingRef, bookingInView] = useInView({ triggerOnce: false, threshold: 0.2 });

  if (!room) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold">Room Not Found</h1>
            <Link to="/rooms">
              <Button>Back to Rooms</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={heroInView ? { scale: 1 } : { scale: 1.2 }}
          transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
        >
          <img
            src={room.image}
            alt={room.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </motion.div>

        <div className="relative z-10 flex h-full items-end pb-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="mb-2 text-sm uppercase tracking-[0.2em] text-white/80">
                {room.tagline}
              </p>
              <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
                {room.name}
              </h1>
              <p className="mb-6 max-w-2xl text-xl text-white/90">
                From ${room.price}/night
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Room Details */}
      <section ref={detailsRef} className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left Column - Description & Specs */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={detailsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-6 text-4xl font-bold">About This Room</h2>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                {room.description}
              </p>

              {/* Specs Grid */}
              <div className="mb-12 grid grid-cols-2 gap-6">
                {room.specs.map((spec: any, index: number) => {
                  const Icon = spec.icon;
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 rounded-2xl bg-muted p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={detailsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Icon className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">{spec.label}</p>
                        <p className="font-semibold">{spec.value}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Features List */}
              <div>
                <h3 className="mb-6 text-2xl font-bold">Room Features</h3>
                <ul className="space-y-3">
                  {room.features.map((feature: string, index: number) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 text-muted-foreground"
                      initial={{ opacity: 0, x: -20 }}
                      animate={detailsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right Column - Amenities */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={detailsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-6 text-4xl font-bold">Amenities</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {room.amenities.map((amenity: any, index: number) => {
                  const Icon = amenity.icon;
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary hover:shadow-[var(--shadow-soft)]"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={
                        detailsInView
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.9 }
                      }
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Icon className="h-6 w-6 text-primary" />
                      <span className="font-medium">{amenity.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            className="mb-12 text-center text-4xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            Room Gallery
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-3">
            {room.gallery.map((img: string, index: number) => (
              <motion.div
                key={index}
                className="group relative h-80 overflow-hidden rounded-3xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.img
                  src={img}
                  alt={`${room.name} view ${index + 1}`}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section ref={bookingRef} className="py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl">
            <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={bookingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-4 text-4xl font-bold">Reserve This Room</h2>
              <p className="text-lg text-muted-foreground">
                Book your stay and experience luxury at La Foret
              </p>
            </motion.div>

            <motion.div
              className="rounded-3xl bg-card p-8 shadow-[var(--shadow-soft)] md:p-12"
              initial={{ opacity: 0, y: 50 }}
              animate={bookingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="mb-6 flex items-center justify-between rounded-2xl bg-primary/10 p-6">
                <div>
                  <p className="text-sm text-muted-foreground">Price per night</p>
                  <p className="text-3xl font-bold text-primary">${room.price}</p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="checkin">Check-in Date</Label>
                    <Input
                      id="checkin"
                      type="date"
                      className="mt-2 h-12 rounded-2xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="checkout">Check-out Date</Label>
                    <Input
                      id="checkout"
                      type="date"
                      className="mt-2 h-12 rounded-2xl"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="4"
                    defaultValue="2"
                    className="mt-2 h-12 rounded-2xl"
                  />
                </div>

                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="mt-2 h-12 rounded-2xl"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="mt-2 h-12 rounded-2xl"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-lg text-primary-foreground transition-all duration-500 hover:scale-105"
                >
                  Book Now - ${room.price}/night
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RoomDetails;
