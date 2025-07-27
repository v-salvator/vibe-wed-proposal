import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useParallaxEffect } from "../../hooks/useScrollAnimation";
import { weddingImages } from "../../utils/imagePlaceholders";
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
  {
    id: 6,
    text: "The greatest happiness of life is the conviction that we are loved; loved for ourselves, or rather, loved in spite of ourselves.",
    author: "Victor Hugo",
  },
  {
    id: 7,
    text: "Love is the poetry of the senses.",
    author: "Honoré de Balzac",
  },
  {
    id: 8,
    text: "To love and be loved is to feel the sun from both sides.",
    author: "David Viscott",
  },
  {
    id: 9,
    text: "Love is composed of a single soul inhabiting two bodies.",
    author: "Aristotle",
  },
  {
    id: 10,
    text: "The best and most beautiful things in the world cannot be seen or even touched. They must be felt with the heart.",
    author: "Helen Keller",
  },
  {
    id: 11,
    text: "Love is like the wind, you can't see it but you can feel it.",
    author: "Nicholas Sparks",
  },
  {
    id: 12,
    text: "A successful marriage requires falling in love many times, always with the same person.",
    author: "Mignon McLaughlin",
  },
  {
    id: 13,
    text: "Love is the master key that opens the gates of happiness.",
    author: "Oliver Wendell Holmes",
  },
  {
    id: 14,
    text: "The art of love is largely the art of persistence.",
    author: "Albert Ellis",
  },
  {
    id: 15,
    text: "Love is the greatest refreshment in life.",
    author: "Pablo Picasso",
  },
];

export const Memories: React.FC = () => {
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

  const { elementRef: parallaxRef } = useParallaxEffect<HTMLDivElement>(0.3);

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
          {weddingImages.map((image, index) => {
            const quote = memoryQuotes[index % memoryQuotes.length];
            const isLarge = index % 4 === 0;
            const isMedium = index % 4 === 1;

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
