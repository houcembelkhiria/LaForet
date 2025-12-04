import { useState, useMemo, memo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamic imports using import.meta.glob (Lazy by default)
const indoorGlob = import.meta.glob('@/assets/indoor/*.{jpg,jpeg,png,JPG,JPEG}');
const conferencesGlob = import.meta.glob('@/assets/indoor/conferencs/*.{jpg,jpeg,png,JPG,JPEG}');
const diningGlob = import.meta.glob('@/assets/indoor/dining/*.{jpg,jpeg,png,JPG,JPEG}');
const roomsGlob = import.meta.glob('@/assets/indoor/rooms/*.{jpg,jpeg,png,JPG,JPEG}');
const outdoorGlob = import.meta.glob('@/assets/outdoor/*.{jpg,jpeg,png,JPG,JPEG}');
const utilitiesGlob = import.meta.glob('@/assets/utilities/*.{jpg,jpeg,png,JPG,JPEG}');

// Type for our lazy image asset
interface LazyImageAsset {
  id: string;
  loader: () => Promise<any>;
  title: string;
  category: string;
}

const processLazyImages = (glob: Record<string, () => Promise<any>>, category: string): LazyImageAsset[] => {
  return Object.entries(glob).map(([path, loader], index) => {
    // Extract title from filename without loading the module
    const filename = path.split('/').pop()?.split('.')[0] || category;
    // Clean up filename (remove "Avec accentuation-NR" etc if present for cleaner titles)
    const cleanTitle = filename.replace(/-Avec accentuation-NR/i, '').replace(/-/g, ' ');

    return {
      id: `${category}-${index}`,
      loader,
      title: cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1),
      category: category
    };
  });
};

// Process images metadata only (lightweight)
const ALL_IMAGES: LazyImageAsset[] = [
  ...processLazyImages(indoorGlob, "indoor"),
  ...processLazyImages(conferencesGlob, "conferences"),
  ...processLazyImages(diningGlob, "dining"),
  ...processLazyImages(roomsGlob, "rooms"),
  ...processLazyImages(outdoorGlob, "outdoor"),
  ...processLazyImages(utilitiesGlob, "utilities")
];

const ALL_CATEGORIES = ["all", ...Array.from(new Set(ALL_IMAGES.map((img) => img.category)))];

const GalleryImage = memo(({ image, getLabel }: { image: LazyImageAsset, getLabel: (key: string) => string }) => {
  const [src, setSrc] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "200px 0px", // Start loading 200px before it comes into view
  });

  // Load the image module only when in view
  useEffect(() => {
    if (inView && !src) {
      image.loader().then((module) => {
        setSrc(module.default);
      });
    }
  }, [inView, image, src]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-3xl shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <div className="relative h-80 overflow-hidden bg-muted">
        {(!src || !isLoaded) && (
          <Skeleton className="absolute inset-0 h-full w-full animate-pulse bg-muted/50" />
        )}
        {src && (
          <img
            src={src}
            alt={image.title}
            className={`h-full w-full object-cover transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-lg'} group-hover:scale-105`}
            loading="lazy"
            decoding="async"
            width={800}
            height={600}
            onLoad={() => setIsLoaded(true)}
          />
        )}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
      </div>
    </motion.div>
  );
});

GalleryImage.displayName = "GalleryImage";

const Gallery = () => {
  const { t, language } = useLanguage();
  const content = t("gallery");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const galleryImages = ALL_IMAGES;
  const categories = ALL_CATEGORIES;

  const filteredImages = useMemo(() => {
    if (selectedCategory === "all") return galleryImages;
    return galleryImages.filter((img) => img.category === selectedCategory);
  }, [selectedCategory, galleryImages]);

  const [visibleCount, setVisibleCount] = useState(6);

  // Reset visible count when category changes
  useMemo(() => {
    setVisibleCount(6);
  }, [selectedCategory]);

  const visibleImages = useMemo(() => {
    return filteredImages.slice(0, visibleCount);
  }, [filteredImages, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const getLabel = (key: string) => {
    const labels: Record<string, Record<string, string>> = {
      all: { fr: 'Tout', it: 'Tutto', es: 'Todo', en: 'All' },
      indoor: { fr: 'Intérieur', it: 'Interno', es: 'Interior', en: 'Indoor' },
      conferences: { fr: 'Conférences', it: 'Conferenze', es: 'Conferencias', en: 'Conferences' },
      dining: { fr: 'Restauration', it: 'Ristorazione', es: 'Comedor', en: 'Dining' },
      rooms: { fr: 'Chambres', it: 'Camere', es: 'Habitaciones', en: 'Rooms' },
      outdoor: { fr: 'Extérieur', it: 'Esterno', es: 'Exterior', en: 'Outdoor' },
      utilities: { fr: 'Installations', it: 'Servizi', es: 'Utilidades', en: 'Utilities' }
    };

    return labels[key]?.[language] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Page Header */}
      <div className="relative flex h-[50vh] items-center justify-center bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-6 text-center">
          <h1 className="mb-4 text-5xl font-bold md:text-6xl lg:text-7xl">
            {content?.header?.title || "Gallery"}
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            {content?.header?.subtitle || "Explore our spaces"}
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <section ref={ref} className="py-20">
        <div className="container mx-auto px-6">
          {/* Filter Buttons */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="min-w-[100px] capitalize transition-transform active:scale-95"
              >
                {getLabel(category)}
              </Button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleImages.map((image) => (
              <GalleryImage key={image.id} image={image} getLabel={getLabel} />
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredImages.length && (
            <div className="mt-12 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={handleLoadMore}
                className="min-w-[200px]"
              >
                {language === 'fr' ? 'Voir plus' :
                  language === 'it' ? 'Vedi altro' :
                    language === 'es' ? 'Ver más' : 'Load More'}
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
