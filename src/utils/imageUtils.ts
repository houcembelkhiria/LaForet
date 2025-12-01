/**
 * Image utility functions for optimization
 */

/**
 * Generate a blur placeholder data URL
 * This creates a very small, blurred version of the image for instant display
 */
export const generateBlurPlaceholder = (width: number = 20, height: number = 20): string => {
  // Simple gradient placeholder - in production, you'd generate from actual image
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  
  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#e5e7eb");
    gradient.addColorStop(1, "#d1d5db");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL();
};

/**
 * Check if image is in viewport using IntersectionObserver
 */
export const createImageLoader = (
  callback: (isVisible: boolean) => void,
  rootMargin: string = "50px"
): IntersectionObserver | null => {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }

  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        callback(entry.isIntersecting);
      });
    },
    { rootMargin }
  );
};

/**
 * Preload an image
 */
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Calculate optimal image dimensions based on container and device
 */
export const getOptimalImageSize = (
  containerWidth: number,
  containerHeight: number,
  devicePixelRatio: number = 1
): { width: number; height: number } => {
  const optimalWidth = Math.ceil(containerWidth * devicePixelRatio);
  const optimalHeight = Math.ceil(containerHeight * devicePixelRatio);
  
  return {
    width: Math.min(optimalWidth, 1920), // Cap at reasonable max
    height: Math.min(optimalHeight, 1080),
  };
};

/**
 * Check if user is on slow connection
 */
export const isSlowConnection = (): boolean => {
  if (typeof navigator === "undefined" || !("connection" in navigator)) {
    return false;
  }

  const connection = (navigator as any).connection;
  if (!connection) return false;

  const effectiveType = connection.effectiveType || "4g";
  const slowTypes = ["2g", "slow-2g"];

  return slowTypes.includes(effectiveType) || connection.saveData === true;
};

/**
 * Get appropriate loading strategy based on connection speed
 */
export const getLoadingStrategy = (): "eager" | "lazy" => {
  if (isSlowConnection()) {
    return "lazy";
  }
  return "lazy"; // Default to lazy for most cases
};

