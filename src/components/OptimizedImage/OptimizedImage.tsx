import React, { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  draggable?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  loading = "lazy",
  decoding = "async",
  draggable = false,
  style,
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Convert JPG to WebP path (assuming you'll convert images)
  const webpSrc = src.replace(/\.(jpg|jpeg|JPG|JPEG)$/, ".webp");

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div
      className={`optimized-image-wrapper ${isLoaded ? "loaded" : ""}`}
      style={{ position: "relative", overflow: "hidden", ...style }}
      onClick={onClick}
    >
      {!isLoaded && (
        <div
          className="image-skeleton"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      )}
      <picture>
        {/* Try WebP first if available */}
        {!hasError && <source srcSet={webpSrc} type="image/webp" />}
        {/* Fallback to original format */}
        <img
          src={src}
          alt={alt}
          className={className}
          loading={loading}
          decoding={decoding}
          draggable={draggable}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
            display: "block",
            width: "100%",
            height: "100%",
          }}
        />
      </picture>
    </div>
  );
};
