import { useState, useEffect, useRef } from "react";
import { preloadImage } from "@/utils/imageUtils";

interface UseImageLoaderOptions {
  src: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Custom hook for optimized image loading with preloading support
 */
export const useImageLoader = ({
  src,
  priority = false,
  onLoad,
  onError,
}: UseImageLoaderOptions) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Preload image if priority
  useEffect(() => {
    if (priority && src) {
      preloadImage(src)
        .then(() => {
          setIsLoaded(true);
          onLoad?.();
        })
        .catch(() => {
          setHasError(true);
          onError?.();
        });
    }
  }, [priority, src, onLoad, onError]);

  // Setup IntersectionObserver for lazy loading
  useEffect(() => {
    if (priority || shouldLoad) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before entering viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [priority, shouldLoad]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
    onError?.();
  };

  return {
    imgRef,
    isLoaded,
    hasError,
    shouldLoad,
    handleLoad,
    handleError,
  };
};

