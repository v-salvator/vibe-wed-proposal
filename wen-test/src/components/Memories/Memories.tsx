import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useParallaxEffect } from "../../hooks/useScrollAnimation";
import { getFeaturedImages } from "../../utils/imagePlaceholders";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Memories.css";

interface MemoryQuote {
  id: number;
  text: string;
  author: string;
}

const memoryQuotes: MemoryQuote[] = [
  {
    id: 1,
    text: "Love is not about finding the perfect person, but about seeing an imperfect person perfectly.",
    author: "Sam Keen",
  },
  {
    id: 2,
    text: "The best thing to hold onto in life is each other.",
    author: "Audrey Hepburn",
  },
  {
    id: 3,
    text: "In all the world, there is no heart for me like yours.",
    author: "Maya Angelou",
  },
  {
    id: 4,
    text: "Every love story is beautiful, but ours is my favorite.",
    author: "Anonymous",
  },
  {
    id: 5,
    text: "You don't love someone for their looks, or their clothes, or for their fancy car, but because they sing a song only you can hear.",
    author: "Oscar Wilde",
  },
];

export const Memories: React.FC = () => {
  const featuredImages = getFeaturedImages();

  const { elementRef: titleRef } = useScrollAnimation<HTMLHeadingElement>({
    animationType: "fade-in",
    threshold: 0.3,
  });

  const { elementRef: subtitleRef } = useScrollAnimation<HTMLParagraphElement>({
    animationType: "fade-in",
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  });

  const { elementRef: masonryRef } = useScrollAnimation<HTMLDivElement>({
    animationType: "fade-in",
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const { elementRef: parallaxRef } = useParallaxEffect(0.3);

  return (
    <section id="memories-section" className="memories section">
      <div className="container">
        <div className="memories-header text-center">
          <h2 ref={titleRef} className="memories-title scroll-animate">
            Precious Moments
          </h2>

          <p ref={subtitleRef} className="memories-subtitle scroll-animate">
            These memories are the foundation of our love story, each one a
            treasure we'll cherish forever.
          </p>
        </div>

        <div ref={masonryRef} className="memories-masonry scroll-animate">
          {featuredImages.map((image, index) => {
            const quote = memoryQuotes[index % memoryQuotes.length];
            const isLarge = index % 3 === 0;
            const isMedium = index % 3 === 1;

            return (
              <div
                key={image.id}
                className={`memory-item memory-item-${
                  isLarge ? "large" : isMedium ? "medium" : "small"
                } hover-scale`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="memory-image-container">
                  <LazyLoadImage
                    src={image.src}
                    alt={image.alt}
                    effect="blur"
                    className="memory-image"
                    placeholderSrc={image.src}
                  />
                  <div className="memory-overlay">
                    <div className="memory-quote">
                      <blockquote className="memory-quote-text">
                        "{quote.text}"
                      </blockquote>
                      <cite className="memory-quote-author">
                        — {quote.author}
                      </cite>
                    </div>
                    <div className="memory-caption">
                      <h3 className="memory-caption-title">{image.caption}</h3>
                      <p className="memory-caption-category">
                        {image.category.replace("-", " ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div ref={parallaxRef} className="memories-parallax">
          <div className="memories-quote-large">
            <blockquote className="memories-quote-large-text">
              "Love is composed of a single soul inhabiting two bodies."
            </blockquote>
            <cite className="memories-quote-large-author">— Aristotle</cite>
          </div>
        </div>
      </div>
    </section>
  );
};
