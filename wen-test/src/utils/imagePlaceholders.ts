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
    src: generatePlaceholderImage(800, 600, "First Meeting", 1),
    alt: "Our first meeting - the beginning of our story",
    caption: "Where it all began...",
    category: "first-meeting",
    aspectRatio: "landscape",
  },
  {
    id: 2,
    src: generatePlaceholderImage(600, 800, "First Coffee", 2),
    alt: "Our first coffee date",
    caption: "That first coffee that changed everything",
    category: "first-meeting",
    aspectRatio: "portrait",
  },

  // Dating milestones (3-4 images)
  {
    id: 3,
    src: generatePlaceholderImage(800, 600, "First Date", 3),
    alt: "Our first official date",
    caption: "The night I knew you were special",
    category: "dating-milestones",
    aspectRatio: "landscape",
  },
  {
    id: 4,
    src: generatePlaceholderImage(600, 800, "Movie Night", 4),
    alt: "Our first movie together",
    caption: "Sharing popcorn and dreams",
    category: "dating-milestones",
    aspectRatio: "portrait",
  },
  {
    id: 5,
    src: generatePlaceholderImage(800, 600, "Dinner Date", 5),
    alt: "Fancy dinner date",
    caption: "Dressed up and falling in love",
    category: "dating-milestones",
    aspectRatio: "landscape",
  },

  // Travel adventures (3-4 images)
  {
    id: 6,
    src: generatePlaceholderImage(800, 600, "Beach Trip", 6),
    alt: "Our first beach vacation together",
    caption: "Sun, sand, and us",
    category: "travel-adventures",
    aspectRatio: "landscape",
  },
  {
    id: 7,
    src: generatePlaceholderImage(600, 800, "Mountain Hike", 7),
    alt: "Hiking in the mountains",
    caption: "Reaching new heights together",
    category: "travel-adventures",
    aspectRatio: "portrait",
  },
  {
    id: 8,
    src: generatePlaceholderImage(800, 600, "City Break", 8),
    alt: "Exploring a new city",
    caption: "Getting lost in new places with you",
    category: "travel-adventures",
    aspectRatio: "landscape",
  },

  // Special moments (3-4 images)
  {
    id: 9,
    src: generatePlaceholderImage(600, 800, "Birthday Surprise", 9),
    alt: "Birthday celebration",
    caption: "Making every birthday special",
    category: "special-moments",
    aspectRatio: "portrait",
  },
  {
    id: 10,
    src: generatePlaceholderImage(800, 600, "Holiday Together", 10),
    alt: "Holiday celebration",
    caption: "Creating traditions together",
    category: "special-moments",
    aspectRatio: "landscape",
  },
  {
    id: 11,
    src: generatePlaceholderImage(600, 800, "Anniversary", 11),
    alt: "Anniversary celebration",
    caption: "Another year of love and laughter",
    category: "special-moments",
    aspectRatio: "portrait",
  },

  // Recent memories (2-3 images)
  {
    id: 12,
    src: generatePlaceholderImage(800, 600, "Recent Adventure", 12),
    alt: "Recent adventure together",
    caption: "Still discovering new things about each other",
    category: "recent-memories",
    aspectRatio: "landscape",
  },
  {
    id: 13,
    src: generatePlaceholderImage(600, 800, "Quiet Moment", 13),
    alt: "Quiet moment together",
    caption: "The simple moments are the best",
    category: "recent-memories",
    aspectRatio: "portrait",
  },

  // Proposal preparation (1-2 images)
  {
    id: 14,
    src: generatePlaceholderImage(800, 600, "Planning", 14),
    alt: "Planning the perfect proposal",
    caption: "Every detail matters",
    category: "proposal-preparation",
    aspectRatio: "landscape",
  },
  {
    id: 15,
    src: generatePlaceholderImage(600, 800, "Ring Selection", 15),
    alt: "Choosing the perfect ring",
    caption: "Finding the symbol of our forever",
    category: "proposal-preparation",
    aspectRatio: "portrait",
  },

  // Additional memories (5 more to reach 20)
  {
    id: 16,
    src: generatePlaceholderImage(800, 600, "Concert Night", 16),
    alt: "Concert night together",
    caption: "Dancing to our favorite songs",
    category: "special-moments",
    aspectRatio: "landscape",
  },
  {
    id: 17,
    src: generatePlaceholderImage(600, 800, "Cooking Together", 17),
    alt: "Cooking dinner together",
    caption: "Learning to cook, learning to love",
    category: "recent-memories",
    aspectRatio: "portrait",
  },
  {
    id: 18,
    src: generatePlaceholderImage(800, 600, "Weekend Getaway", 18),
    alt: "Weekend getaway",
    caption: "Escaping reality with you",
    category: "travel-adventures",
    aspectRatio: "landscape",
  },
  {
    id: 19,
    src: generatePlaceholderImage(600, 800, "Game Night", 19),
    alt: "Game night with friends",
    caption: "Building memories with our loved ones",
    category: "special-moments",
    aspectRatio: "portrait",
  },
  {
    id: 20,
    src: generatePlaceholderImage(800, 600, "Future Dreams", 20),
    alt: "Dreaming of our future",
    caption: "Ready to write the next chapter",
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
