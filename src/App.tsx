import { useEffect, useMemo, useState } from "react";
import {
  Hero,
  Story,
  ImageGallery,
  Memories,
  Proposal,
  BucketList,
} from "./components";
import "./styles/globals.css";
import "./styles/animations.css";
import "./App.css";
import { weddingImages } from "./utils";

function App() {
  const imageUrls = useMemo(() => weddingImages.map((img) => img.src), []);
  const totalImages = imageUrls.length;
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const preloadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        const done = () => {
          if (!isCancelled) setLoadedCount((c) => c + 1);
          resolve();
        };
        img.onload = done;
        img.onerror = done;
        img.src = src;
      });

    Promise.all(imageUrls.map(preloadImage)).then(() => {
      if (!isCancelled) setIsLoading(false);
    });

    return () => {
      isCancelled = true;
    };
  }, [imageUrls]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  // Reset scroll position to top after loading is complete
  useEffect(() => {
    if (!isLoading) {
      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        window.scrollTo(0, 0);
        // Also reset document element scroll position for better browser compatibility
        document.documentElement.scrollTop = 0;
      }, 0);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div
          className="global-loader"
          role="status"
          aria-live="polite"
          aria-label="Loading images"
        >
          <div className="global-loader__floating-hearts"></div>
          <div className="global-loader__container">
            <div className="global-loader__heart">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient
                    id="heartGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="var(--color-accent-pink)" />
                    <stop offset="100%" stopColor="var(--color-accent-gold)" />
                  </linearGradient>
                </defs>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="global-loader__spinner"></div>
            <div className="global-loader__text">
              Preparing our beautiful memories...
            </div>
            <div className="global-loader__percentage">
              {Math.min(
                Math.round((loadedCount / Math.max(totalImages, 1)) * 100),
                100
              )}
              %
            </div>
            <div className="global-loader__progress">
              <div
                className="global-loader__progress-bar"
                style={{
                  width: `${Math.min(
                    (loadedCount / Math.max(totalImages, 1)) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
            <div className="global-loader__subtext">
              Loading {loadedCount} of {totalImages} precious moments
            </div>
          </div>
        </div>
      )}
      <div className="app" aria-busy={isLoading}>
        <Hero />
        <Story />
        <ImageGallery />
        <Memories />
        <Proposal />
        <BucketList />
      </div>
    </>
  );
}

export default App;
