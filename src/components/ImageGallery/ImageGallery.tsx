import React, { useCallback, useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { memoriesImages, type ImageData } from "../../utils/imagePlaceholders";
import "./ImageGallery.css";

type GalleryItemProps = {
  image: ImageData;
  index: number;
  onOpen: (image: ImageData) => void;
  variants: Variants;
};

const GalleryItem: React.FC<GalleryItemProps> = React.memo(
  ({ image, onOpen, variants }) => {
    const handleClick = useCallback(() => {
      onOpen(image);
    }, [image, onOpen]);

    return (
      <motion.div
        className={`gallery-item gallery-item-${image.aspectRatio}`}
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
        onClick={handleClick}
      >
        <div className="gallery-image-container">
          <img
            src={image.src}
            alt={image.alt}
            className="gallery-image"
            // loading="lazy"
            // decoding="async"
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
      </motion.div>
    );
  }
);

GalleryItem.displayName = "GalleryItem";

export const ImageGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const fadeInUp: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    }),
    []
  );

  const item: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    }),
    []
  );

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
          <motion.h2
            className="gallery-title"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            Our Memories
          </motion.h2>

          <motion.p
            className="gallery-subtitle"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
          >
            Every picture tells a story of love, laughter, and unforgettable
            moments together.
          </motion.p>
        </div>

        <div className="gallery-grid">
          {memoriesImages.map((image, index) => (
            <GalleryItem
              key={image.id}
              image={image}
              index={index}
              onOpen={openLightbox}
              variants={item}
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
