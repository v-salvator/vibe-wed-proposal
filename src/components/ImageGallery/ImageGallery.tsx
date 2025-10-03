import React, { useCallback, useState } from "react";
import { memoriesImages, type ImageData } from "../../utils/imagePlaceholders";
import "./ImageGallery.css";

type GalleryItemProps = {
  image: ImageData;
  index: number;
  onOpen: (image: ImageData) => void;
};

const GalleryItem: React.FC<GalleryItemProps> = React.memo(
  ({ image, onOpen }) => {
    const handleClick = useCallback(() => {
      onOpen(image);
    }, [image, onOpen]);

    return (
      <div
        className={`gallery-item gallery-item-${image.aspectRatio}`}
        onClick={handleClick}
      >
        <div className="gallery-image-container">
          <img
            src={image.src}
            alt={image.alt}
            className="gallery-image"
            // loading="eager"
            // decoding="async"
            // fetchPriority={index < 6 ? "high" : "auto"}
            draggable={false}
            style={{ display: "block", width: "100%", height: "100%" }}
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
    );
  }
);

GalleryItem.displayName = "GalleryItem";

export const ImageGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = useCallback((image: ImageData) => {
    setSelectedImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
    },
    [closeLightbox]
  );

  return (
    <section id="gallery-section" className="gallery section">
      <div className="container">
        <div className="gallery-header text-center">
          <h2 className="gallery-title">Our Memories</h2>

          <p className="gallery-subtitle">
            Every picture tells a story of love, laughter, and unforgettable
            moments together.
          </p>
        </div>

        <div className="gallery-grid">
          {memoriesImages.map((image, index) => (
            <GalleryItem
              key={image.id}
              image={image}
              index={index}
              onOpen={openLightbox}
            />
          ))}
        </div>
      </div>

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
                // loading="eager"
                // decoding="async"
                // fetchPriority="high"
                draggable={false}
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
