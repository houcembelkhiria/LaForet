import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone } from "lucide-react";
import { CONTACT_INFO } from "@/config/constants";

const Location = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const { t } = useLanguage();
    const content = t("about").content.location;

    return (
        <section ref={ref} className="relative w-full overflow-hidden bg-background py-20">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    className="mb-12 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        {content.subtitle}
                    </span>
                    <h2 className="mt-4 text-4xl font-bold md:text-5xl lg:text-6xl">
                        {content.title}
                    </h2>
                </motion.div>

                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Map */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="overflow-hidden rounded-3xl shadow-[var(--shadow-soft)]">
                            <iframe
                                src={content.mapEmbedUrl}
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Hotel Location Map"
                                className="w-full"
                            />
                        </div>
                    </motion.div>

                    {/* Address & Nearby Attractions */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {/* Address Card */}
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <div className="mb-4 flex items-start gap-3">
                                <MapPin className="mt-1 h-5 w-5 text-primary" />
                                <div>
                                    <h3 className="mb-2 text-xl font-semibold">
                                        {CONTACT_INFO.address.full}
                                    </h3>
                                    <div className="space-y-1 text-sm text-muted-foreground">
                                        <p>{CONTACT_INFO.address.city}, {CONTACT_INFO.address.region}</p>
                                        <p>{CONTACT_INFO.address.postalCode}, {CONTACT_INFO.address.country}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                                <Phone className="h-5 w-5 text-primary" />
                                <a
                                    href={CONTACT_INFO.phoneHref}
                                    className="text-lg font-medium hover:text-primary transition-colors"
                                >
                                    {CONTACT_INFO.phone}
                                </a>
                            </div>
                        </div>

                        {/* Nearby Attractions */}
                        {content.nearby && (
                            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                                <h3 className="mb-4 text-xl font-semibold">
                                    {content.nearby.title}
                                </h3>
                                <div className="space-y-3">
                                    {content.nearby.attractions.map((attraction: any, index: number) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-start justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                        >
                                            <div>
                                                <p className="font-medium">{attraction.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {attraction.duration}
                                                </p>
                                            </div>
                                            <span className="text-sm font-medium text-primary">
                                                {attraction.distance}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Location;
