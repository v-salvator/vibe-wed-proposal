export interface ImageData {
  id: number;
  src: string;
  alt: string;
  caption?: string;
  category: string;
  aspectRatio: "landscape" | "portrait" | "square";
}

export const generatePlaceholderImage = (
  width: number = 800,
  height: number = 600,
  text: string = "Memory",
  index: number = 1
): string => {
  return `https://via.placeholder.com/${width}x${height}/FF6B9D/FFFFFF?text=${encodeURIComponent(
    text + " " + index
  )}`;
};

export const generatePicsumImage = (
  width: number = 800,
  height: number = 600,
  seed: number = 1
): string => {
  return `https://picsum.photos/${width}/${height}?random=${seed}`;
};

export const weddingImages: ImageData[] = [
  // First meeting (2-3 images)
  {
    id: 1,
    src: "/images/_M4A7640.jpg",
    alt: "Our first meeting - the beginning of our story",
    caption: "Where it all began...",
    category: "first-meeting",
    aspectRatio: "landscape",
  },
  {
    id: 2,
    src: "/images/_M4A7576.jpg",
    alt: "Our first coffee date",
    caption: "That first coffee that changed everything",
    category: "first-meeting",
    aspectRatio: "landscape",
  },

  // Dating milestones (3-4 images)
  {
    id: 3,
    src: "/images/_M4A7468.jpg",
    alt: "Our first official date",
    caption: "The night I knew you were special",
    category: "dating-milestones",
    aspectRatio: "landscape",
  },
  {
    id: 4,
    src: "/images/_M4A7367.jpg",
    alt: "Our first movie together",
    caption: "Sharing popcorn and dreams",
    category: "dating-milestones",
    aspectRatio: "landscape",
  },
  {
    id: 5,
    src: "/images/_M4A7333.jpg",
    alt: "Fancy dinner date",
    caption: "Dressed up and falling in love",
    category: "dating-milestones",
    aspectRatio: "landscape",
  },

  // Travel adventures (3-4 images)
  {
    id: 6,
    src: "/images/_M4A7312.jpg",
    alt: "Our first beach vacation together",
    caption: "Sun, sand, and us",
    category: "travel-adventures",
    aspectRatio: "landscape",
  },
  {
    id: 7,
    src: "/images/_M4A7308.jpg",
    alt: "Hiking in the mountains",
    caption: "Reaching new heights together",
    category: "travel-adventures",
    aspectRatio: "landscape",
  },
  {
    id: 8,
    src: "/images/_M4A7291.jpg",
    alt: "Exploring a new city",
    caption: "Getting lost in new places with you",
    category: "travel-adventures",
    aspectRatio: "landscape",
  },

  // Special moments (3-4 images)
  {
    id: 9,
    src: "/images/_M4A7268.jpg",
    alt: "Birthday celebration",
    caption: "Making every birthday special",
    category: "special-moments",
    aspectRatio: "landscape",
  },
  {
    id: 10,
    src: "/images/_M4A7166.jpg",
    alt: "Holiday celebration",
    caption: "Creating traditions together",
    category: "special-moments",
    aspectRatio: "landscape",
  },
  {
    id: 11,
    src: "/images/_M4A7146.jpg",
    alt: "Anniversary celebration",
    caption: "Another year of love and laughter",
    category: "special-moments",
    aspectRatio: "landscape",
  },

  // Recent memories (2-3 images)
  {
    id: 12,
    src: "/images/_M4A7062.jpg",
    alt: "Recent adventure together",
    caption: "Still discovering new things about each other",
    category: "recent-memories",
    aspectRatio: "landscape",
  },
  {
    id: 13,
    src: "/images/_M4A7028.jpg",
    alt: "Quiet moment together",
    caption: "The simple moments are the best",
    category: "recent-memories",
    aspectRatio: "landscape",
  },

  // Proposal preparation (1-2 images)
  {
    id: 14,
    src: "/images/_M4A6982.jpg",
    alt: "Planning the perfect proposal",
    caption: "Every detail matters",
    category: "proposal-preparation",
    aspectRatio: "landscape",
  },
  {
    id: 15,
    src: "/images/_M4A6886.jpg",
    alt: "Choosing the perfect ring",
    caption: "Finding the symbol of our forever",
    category: "proposal-preparation",
    aspectRatio: "landscape",
  },
];

export const getImagesByCategory = (category: string): ImageData[] => {
  return weddingImages.filter((image) => image.category === category);
};

export const getRandomImages = (count: number = 10): ImageData[] => {
  const shuffled = [...weddingImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getFeaturedImages = (): ImageData[] => {
  // Return a curated selection of the most important images
  return weddingImages.filter(
    (image) =>
      image.id === 1 || // First meeting
      image.id === 3 || // First date
      image.id === 6 || // Beach trip
      image.id === 9 || // Birthday
      image.id === 14 // Planning
  );
};
