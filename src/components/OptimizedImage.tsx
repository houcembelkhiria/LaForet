import { useState, useEffect, useRef, memo } from "react";
import { motion, MotionProps } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface OptimizedImageProps extends Omit<MotionProps, "src"> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean; // For above-the-fold images
  aspectRatio?: string; // e.g., "16/9", "4/3", "1/1"
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  width?: number;
  height?: number;
  placeholder?: string; // Base64 blur placeholder
  onLoad?: () => void;
}

const OptimizedImage = memo(
  ({
    src,
    alt,
    className = "",
    priority = false,
    aspectRatio,
    objectFit = "cover",
    width,
    height,
    placeholder,
    onLoad,
    ...motionProps
  }: OptimizedImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const [containerRef, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
      rootMargin: priority ? "0px" : "50px", // Start loading 50px before entering viewport
    });

    useEffect(() => {
      if (imgRef.current?.complete && imgRef.current.naturalHeight !== 0) {
        setIsLoaded(true);
        onLoad?.();
      }
    }, [onLoad]);

    const handleLoad = () => {
      setIsLoaded(true);
      onLoad?.();
    };

    const handleError = () => {
      setHasError(true);
      setIsLoaded(false);
    };

    // Preload critical images
    useEffect(() => {
      if (priority && typeof document !== "undefined") {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = src;
        link.setAttribute("fetchpriority", "high");
        document.head.appendChild(link);

        return () => {
          document.head.removeChild(link);
        };
      }
    }, [src, priority]);

    const containerStyle = {
      aspectRatio: aspectRatio,
      width: width ? `${width}px` : "100%",
      height: height ? `${height}px` : "100%",
    };

    const shouldLoad = priority || inView;

    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden ${className}`}
        style={containerStyle}
      >
        {/* Placeholder/Blur */}
        {!isLoaded && !hasError && (
          <div
            className="absolute inset-0 bg-gradient-to-br from-muted via-muted/50 to-muted animate-pulse"
            style={{
              backgroundImage: placeholder ? `url(${placeholder})` : undefined,
              backgroundSize: "cover",
              filter: placeholder ? "blur(20px)" : undefined,
            }}
          />
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm">Failed to load image</p>
            </div>
          </div>
        )}

        {/* Actual Image */}
        {shouldLoad && (
          <motion.img
            ref={imgRef}
            src={src}
            alt={alt}
            className={`w-full h-full transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              objectFit,
              width: width ? `${width}px` : "100%",
              height: height ? `${height}px` : "100%",
            }}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            width={width}
            height={height}
            onLoad={handleLoad}
            onError={handleError}
            {...motionProps}
          />
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;

