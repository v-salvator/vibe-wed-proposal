import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useStaggerAnimation } from "../../hooks/useScrollAnimation";
import { weddingImages, type ImageData } from "../../utils/imagePlaceholders";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./ImageGallery.css";

export const ImageGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const { elementRef: titleRef } = useScrollAnimation<HTMLHeadingElement>({
    animationType: "fade-in",
    threshold: 0.3,
  });

  const { elementRef: subtitleRef } = useScrollAnimation<HTMLParagraphElement>({
    animationType: "fade-in",
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  });

  const { elementRef: galleryRef } = useScrollAnimation<HTMLDivElement>({
    animationType: "fade-in",
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  useStaggerAnimation(galleryRef, ".gallery-item", 100);

  const openLightbox = (image: ImageData) => {
    setSelectedImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeLightbox();
    }
  };

  return (
    <section id="gallery-section" className="gallery section">
      <div className="container">
        <div className="gallery-header text-center">
          <h2 ref={titleRef} className="gallery-title scroll-animate">
            Our Memories
          </h2>

          <p ref={subtitleRef} className="gallery-subtitle scroll-animate">
            Every picture tells a story of love, laughter, and unforgettable
            moments together.
          </p>
        </div>

        <div ref={galleryRef} className="gallery-grid scroll-animate">
          {weddingImages.map((image, index) => (
            <div
              key={image.id}
              className={`gallery-item gallery-item-${image.aspectRatio} hover-scale`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => openLightbox(image)}
            >
              <div className="gallery-image-container">
                <LazyLoadImage
                  src={image.src}
                  alt={image.alt}
                  effect="blur"
                  className="gallery-image"
                  placeholderSrc={image.src}
                />
                <div className="gallery-overlay">
                  <div className="gallery-caption">
                    <h3 className="gallery-caption-title">{image.caption}</h3>
                    <p className="gallery-caption-category">
                      {image.category.replace("-", " ")}
                    </p>
                  </div>
                  <div className="gallery-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && selectedImage && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="lightbox-image-container">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="lightbox-image"
              />
            </div>

            <div className="lightbox-info">
              <h3 className="lightbox-title">{selectedImage.caption}</h3>
              <p className="lightbox-description">{selectedImage.alt}</p>
              <p className="lightbox-category">
                {selectedImage.category.replace("-", " ")}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
