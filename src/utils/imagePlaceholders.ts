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

export const memoriesImages: ImageData[] = [
  // * Paris
  {
    id: 1,
    src: "/images/memories/paris/IMG_0555.jpg",
    alt: "Paris under our feet",
    caption: "First trip abroad...",
    category: "Paris",
    aspectRatio: "landscape",
  },
  {
    id: 2,
    src: "/images/memories/paris/IMG_0932.jpg",
    alt: "Our first meeting - the beginning of our story",
    caption: "First trip abroad...",
    category: "Paris",
    aspectRatio: "landscape",
  },
  {
    id: 3,
    src: "/images/memories/paris/IMG_1192.jpg",
    alt: "Fisish shooting in Paris",
    caption: "First trip abroad...",
    category: "Paris",
    aspectRatio: "landscape",
  },
  {
    id: 4,
    src: "/images/memories/paris/IMG_4094.jpg",
    alt: "Versailles Palace",
    caption: "First trip abroad...",
    category: "Paris",
    aspectRatio: "landscape",
  },
  {
    id: 5,
    src: "/images/memories/paris/IMG_4129.jpg",
    alt: "Coffee break in Paris",
    caption: "First trip abroad...",
    category: "Paris",
    aspectRatio: "landscape",
  },
  {
    id: 6,
    src: "/images/memories/paris/IMG_1340.jpg",
    alt: "Siene River Cruise",
    caption: "First trip abroad...",
    category: "Paris",
    aspectRatio: "landscape",
  },
  {
    id: 7,
    src: "/images/memories/paris/IMG_4267.jpg",
    alt: "Louvre Museum",
    caption: "First trip abroad...",
    category: "Paris",
    aspectRatio: "landscape",
  },
  {
    id: 8,
    src: "/images/memories/paris/IMG_4969.jpg",
    alt: "Champs-Elysées",
    caption: "First trip abroad...",
    category: "Paris",
    aspectRatio: "landscape",
  },
  {
    id: 9,
    src: "/images/memories/paris/IMG_5455.jpg",
    alt: "Tokyo palace",
    caption: "First trip abroad...",
    category: "Paris",
    aspectRatio: "landscape",
  },
  {
    id: 10,
    src: "/images/memories/paris/IMG_2008.jpg",
    alt: "Sleepy 🐷",
    caption: "First trip abroad...",
    category: "Paris",
    aspectRatio: "landscape",
  },
  // Okinawa
  {
    id: 11,
    src: "/images/memories/okinawa/IMG_3178.jpg",
    alt: "Amazing view in Okinawa",
    caption: "First trip with your family",
    category: "Okinawa",
    aspectRatio: "landscape",
  },
  {
    id: 12,
    src: "/images/memories/okinawa/IMG_3179.jpg",
    alt: "🐷🐷🐷",
    caption: "First trip with your family",
    category: "Okinawa",
    aspectRatio: "landscape",
  },
  // Busan
  {
    id: 13,
    src: "/images/memories/busan/IMG_4047.jpg",
    alt: "Car race in Busan",
    category: "Busan",
    aspectRatio: "landscape",
  },
  {
    id: 14,
    src: "/images/memories/busan/IMG_4086.jpg",
    alt: "🐢🐢🐢",
    caption: "First trip to Korea",
    category: "Busan",
    aspectRatio: "landscape",
  },
  {
    id: 15,
    src: "/images/memories/busan/IMG_4193.jpg",
    alt: "Dog cake in Busan",
    caption: "First trip to Korea",
    category: "Busan",
    aspectRatio: "landscape",
  },
  // Tokyo
  {
    id: 16,
    src: "/images/memories/japan/IMG_5015.jpg",
    alt: "Preparing to cruise",
    caption: "First trip to Japan together",
    category: "Tokyo",
    aspectRatio: "landscape",
  },
  {
    id: 17,
    src: "/images/memories/japan/IMG_7430.jpg",
    alt: "Tokyo Garden",
    caption: "First trip to Japan together",
    category: "Tokyo",
    aspectRatio: "landscape",
  },
  // * boho
  {
    id: 18,
    src: "/images/memories/boho/GOPR4859.JPG",
    alt: "Snorkeling in Boho",
    caption: "First time snorkeling",
    category: "Boho",
    aspectRatio: "landscape",
  },
  {
    id: 19,
    src: "/images/memories/boho/GOPR4889.JPG",
    alt: "Under the sea",
    caption: "First time snorkeling",
    category: "Boho",
    aspectRatio: "landscape",
  },
  {
    id: 20,
    src: "/images/memories/boho/GOPR4906.JPG",
    alt: "Boat Riding",
    caption: "First time snorkeling",
    category: "Boho",
    aspectRatio: "landscape",
  },
  {
    id: 21,
    src: "/images/memories/boho/IMG_6470.jpg",
    alt: "Firefly and Canoeing",
    caption: "First time canoeing",
    category: "Boho",
    aspectRatio: "landscape",
  },
  // * budapest
  {
    id: 22,
    src: "/images/memories/budapest/IMG_6706.jpg",
    alt: "Budapest Nezuko",
    caption: "First time in Budapest",
    category: "Budapest",
    aspectRatio: "landscape",
  },
  {
    id: 23,
    src: "/images/memories/budapest/IMG_4816.jpg",
    alt: "Fisherman's Bastion",
    caption: "First time in Budapest",
    category: "Budapest",
    aspectRatio: "landscape",
  },
  {
    id: 24,
    src: "/images/memories/budapest/IMG_6813.jpg",
    alt: "Bonaparte franchissant le Grand-Saint-Bernard",
    caption: "First time in Vienna",
    category: "Budapest",
    aspectRatio: "landscape",
  },
  {
    id: 25,
    src: "/images/memories/budapest/IMG_6846.jpg",
    alt: "Schloss Belvedere",
    caption: "First time in Vienna",
    category: "Budapest",
    aspectRatio: "landscape",
  },
  {
    id: 26,
    src: "/images/memories/budapest/IMG_7603.jpg",
    alt: "Chimney Cake",
    caption: "First time in Budapest",
    category: "Budapest",
    aspectRatio: "landscape",
  },
];

export const weddingImages: ImageData[] = [
  // First meeting (2-3 images)
  {
    id: 1,
    src: "/images/wedding/_M4A7640-min.jpg",
    alt: "Our first meeting - the beginning of our story",
    caption: "Where it all began...",
    category: "first-meeting",
    aspectRatio: "landscape",
  },
  {
    id: 2,
    src: "/images/wedding/_M4A7576-min.jpg",
    alt: "Our first coffee date",
    caption: "That first coffee that changed everything",
    category: "first-meeting",
    aspectRatio: "landscape",
  },

  // Dating milestones (3-4 images)
  {
    id: 3,
    src: "/images/wedding/_M4A7468-min.jpg",
    alt: "Our first official date",
    caption: "The night I knew you were special",
    category: "dating-milestones",
    aspectRatio: "landscape",
  },
  {
    id: 4,
    src: "/images/wedding/_M4A7367-min.jpg",
    alt: "Our first movie together",
    caption: "Sharing popcorn and dreams",
    category: "dating-milestones",
    aspectRatio: "landscape",
  },
  {
    id: 5,
    src: "/images/wedding/_M4A7333-min.jpg",
    alt: "Fancy dinner date",
    caption: "Dressed up and falling in love",
    category: "dating-milestones",
    aspectRatio: "landscape",
  },

  // Travel adventures (3-4 images)
  {
    id: 6,
    src: "/images/wedding/_M4A7312-min.jpg",
    alt: "Our first beach vacation together",
    caption: "Sun, sand, and us",
    category: "travel-adventures",
    aspectRatio: "landscape",
  },
  {
    id: 7,
    src: "/images/wedding/_M4A7308-min.jpg",
    alt: "Hiking in the mountains",
    caption: "Reaching new heights together",
    category: "travel-adventures",
    aspectRatio: "landscape",
  },
  {
    id: 8,
    src: "/images/wedding/_M4A7291-min.jpg",
    alt: "Exploring a new city",
    caption: "Getting lost in new places with you",
    category: "travel-adventures",
    aspectRatio: "landscape",
  },

  // Special moments (3-4 images)
  {
    id: 9,
    src: "/images/wedding/_M4A7268-min.jpg",
    alt: "Birthday celebration",
    caption: "Making every birthday special",
    category: "special-moments",
    aspectRatio: "landscape",
  },
  {
    id: 10,
    src: "/images/wedding/_M4A7166-min.jpg",
    alt: "Holiday celebration",
    caption: "Creating traditions together",
    category: "special-moments",
    aspectRatio: "landscape",
  },
  {
    id: 11,
    src: "/images/wedding/_M4A7146-min.jpg",
    alt: "Anniversary celebration",
    caption: "Another year of love and laughter",
    category: "special-moments",
    aspectRatio: "landscape",
  },

  // Recent memories (2-3 images)
  {
    id: 12,
    src: "/images/wedding/_M4A7062-min.jpg",
    alt: "Recent adventure together",
    caption: "Still discovering new things about each other",
    category: "recent-memories",
    aspectRatio: "landscape",
  },
  {
    id: 13,
    src: "/images/wedding/_M4A7028-min.jpg",
    alt: "Quiet moment together",
    caption: "The simple moments are the best",
    category: "recent-memories",
    aspectRatio: "landscape",
  },

  // Proposal preparation (1-2 images)
  {
    id: 14,
    src: "/images/wedding/_M4A6982-min.jpg",
    alt: "Planning the perfect proposal",
    caption: "Every detail matters",
    category: "proposal-preparation",
    aspectRatio: "landscape",
  },
  {
    id: 15,
    src: "/images/wedding/_M4A6886-min.jpg",
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
