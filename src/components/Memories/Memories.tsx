import React from "react";
import { weddingImages } from "../../utils/imagePlaceholders";
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

type MemoryItemProps = {
  image: (typeof weddingImages)[number];
  index: number;
};

const MemoryItem: React.FC<MemoryItemProps> = React.memo(({ image, index }) => {
  const quote = memoryQuotes[index % memoryQuotes.length];
  // const isLarge = index % 4 === 0;
  const isLarge = index % 8 === 0;
  const isMedium = index % 8 === 5 || index % 8 === 6 || index % 8 === 7;

  return (
    <div
      className={`memory-item memory-item-${
        isLarge ? "large" : isMedium ? "medium" : "small"
      }`}
    >
      <div className="memory-image-container">
        <img
          src={image.src}
          alt={image.alt}
          className="memory-image"
          // loading="lazy"
          // decoding="async"
          draggable={false}
        />
        <div className="memory-overlay">
          <div className="memory-quote">
            <blockquote className="memory-quote-text">
              "{quote.text}"
            </blockquote>
            <cite className="memory-quote-author">— {quote.author}</cite>
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
});

MemoryItem.displayName = "MemoryItem";

export const Memories: React.FC = () => {
  return (
    <section id="memories-section" className="memories section">
      <div className="container">
        <div className="memories-header text-center">
          <h2 className="memories-title">Precious Moments</h2>

          <p className="memories-subtitle">
            These memories are the foundation of our love story, each one a
            treasure we'll cherish forever.
          </p>
        </div>

        <div className="memories-masonry">
          {weddingImages.map((image, index) => (
            <MemoryItem key={image.id} image={image} index={index} />
          ))}
        </div>

        {/* Keep parallax section as-is to retain UX */}
      </div>
    </section>
  );
};
