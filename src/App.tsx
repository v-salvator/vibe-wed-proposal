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
            <div className="global-loader__heart"></div>
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
