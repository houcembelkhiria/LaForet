import { useEffect } from 'react';

const ImagePreloader = () => {
    useEffect(() => {
        const preloadImages = async () => {
            const images = import.meta.glob('@/assets/**/*.{jpg,jpeg,png,JPG,JPEG,svg,webp}', { eager: true });
            const imageModules = Object.values(images);

            // Load only the first 12 images immediately (enough for one screen)
            const loadSingleImage = (src: string) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = resolve;
                    img.onerror = resolve;
                    img.src = src;
                });
            };

            // Initial batch
            const initialBatch = imageModules.slice(0, 12);
            for (const module of initialBatch) {
                const src = (module as any).default;
                if (src) await loadSingleImage(src);
            }

            // Remaining images - load with lower priority using requestIdleCallback if available
            const remaining = imageModules.slice(12);

            const processRemaining = async () => {
                for (const module of remaining) {
                    const src = (module as any).default;
                    if (src) {
                        await loadSingleImage(src);
                        // Add a small delay between images to yield to main thread and network
                        await new Promise(r => setTimeout(r, 50));
                    }
                }
            };

            if ('requestIdleCallback' in window) {
                (window as any).requestIdleCallback(() => {
                    processRemaining();
                });
            } else {
                setTimeout(processRemaining, 2000);
            }
        };

        preloadImages();
    }, []);

    return null;
};

export default ImagePreloader;
