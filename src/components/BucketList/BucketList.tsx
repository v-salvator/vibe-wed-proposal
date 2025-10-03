import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./BucketList.css";

interface Adventure {
  id: string;
  title: string;
  emoji: string;
  category: string;
  description: string;
}

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  delay: number;
}

const ADVENTURES: Adventure[] = [
  // Adventures
  {
    id: "hokkaido-japan",
    title: "Snowboarding in Hokkaido",
    emoji: "🏂",
    category: "Adventures",
    description: "Explore snowboarding in Hokkaido",
  },
  {
    id: "ancient-egypt",
    title: "Watch sunrise over Ancient Egypt",
    emoji: "▵",
    category: "Adventures",
    description: "Ancient wonder and breathtaking views in Egypt",
  },
  {
    id: "japan-maple",
    title: "Visit Japan during maple season",
    emoji: "🍁",
    category: "Adventures",
    description: "Romantic walks under golden petals",
  },
  {
    id: "hawaii-island",
    title: "Visit Hawaii together",
    emoji: "🏝️",
    category: "Adventures",
    description: "Fire torches, blue seas, and endless sunsets",
  },
  {
    id: "roaming-italy",
    title: "Roaming Italy",
    emoji: "🇮🇹",
    category: "Adventures",
    description: "Witness museums and artifacts in Italy",
  },
  {
    id: "dance-lessons",
    title: "Learn to dance together",
    emoji: "🎭",
    category: "Adventures",
    description: "Party Jam, let's dance together",
  },
  {
    id: "cooking-classes",
    title: "Take cooking classes",
    emoji: "🍳",
    category: "Adventures",
    description: "Master cooking together",
  },
  {
    id: "paint-together",
    title: "Paint a picture together",
    emoji: "🎨",
    category: "Adventures",
    description: "Create art that tells our story",
  },
  {
    id: "dream-home",
    title: "Build our dream home",
    emoji: "🏠",
    category: "Adventures",
    description: "Every corner filled with love and memories",
  },
  {
    id: "new-business",
    title: "scale up our business",
    emoji: "💰",
    category: "Adventures",
    description: "Scale up our business together",
  },
];

export const BucketList: React.FC = () => {
  const [selectedAdventures, setSelectedAdventures] = useState<Set<string>>(
    new Set()
  );
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  // Memoize categorized adventures for performance
  const categorizedAdventures = useMemo(() => {
    const categories = ADVENTURES.reduce((acc, adventure) => {
      if (!acc[adventure.category]) {
        acc[adventure.category] = [];
      }
      acc[adventure.category].push(adventure);
      return acc;
    }, {} as Record<string, Adventure[]>);
    return categories;
  }, []);

  // Performance-optimized heart creation
  const createFloatingHearts = useCallback(() => {
    const newHearts: FloatingHeart[] = [];
    for (let i = 0; i < 8; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      });
    }
    setFloatingHearts(newHearts);

    // Clean up hearts after animation
    setTimeout(() => {
      setFloatingHearts([]);
    }, 4000);
  }, []);

  const toggleAdventure = useCallback(
    (adventureId: string) => {
      setSelectedAdventures((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(adventureId)) {
          newSet.delete(adventureId);
        } else {
          newSet.add(adventureId);
          createFloatingHearts(); // Show hearts when adding
        }
        return newSet;
      });
    },
    [createFloatingHearts]
  );

  const selectedAdventureObjects = useMemo(() => {
    return Array.from(selectedAdventures)
      .map((id) => {
        const adventure = ADVENTURES.find((a) => a.id === id);
        return adventure;
      })
      .filter(Boolean);
  }, [selectedAdventures]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="bucket-list-section" className="bucket-list section">
      {/* Floating Hearts Container - Scoped to this section only */}
      <div className="floating-hearts-container">
        <AnimatePresence>
          {floatingHearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="floating-heart"
              initial={{
                opacity: 0,
                scale: 0,
                x: heart.x + "%",
                y: heart.y + "%",
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [heart.y + "%", heart.y - 20 + "%"],
                rotate: [0, 360],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 3,
                delay: heart.delay,
                ease: "easeOut",
              }}
            >
              💕
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="container">
        <div className="bucket-list-header text-center">
          <motion.h2
            className="bucket-list-title"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            The Adventure Begins
          </motion.h2>

          <motion.p
            className="bucket-list-subtitle"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
          >
            Choose the adventures that make your heart skip a beat. Let's build
            our dream future together.
          </motion.p>
        </div>

        <div className="bucket-list-content">
          {/* Adventure Categories */}
          <motion.div
            className="adventure-categories"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {Object.entries(categorizedAdventures).map(
              ([category, adventures]) => (
                <motion.div
                  key={category}
                  className="adventure-category"
                  variants={itemAnimation}
                >
                  <h3 className="category-title">{category}</h3>
                  <div className="adventure-grid">
                    {adventures.map((adventure) => (
                      <motion.div
                        key={adventure.id}
                        className={`adventure-card ${
                          selectedAdventures.has(adventure.id) ? "selected" : ""
                        }`}
                        onClick={() => toggleAdventure(adventure.id)}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        variants={itemAnimation}
                      >
                        <div className="adventure-emoji">{adventure.emoji}</div>
                        <h4 className="adventure-title">{adventure.title}</h4>
                        <p className="adventure-description">
                          {adventure.description}
                        </p>
                        {selectedAdventures.has(adventure.id) && (
                          <motion.div
                            className="selected-indicator"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            ✓
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            )}
          </motion.div>

          {/* Selected Adventures Display */}
          {selectedAdventureObjects.length > 0 && (
            <motion.div
              className="selected-adventures"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="selected-title">Our Future Adventure List 💕</h3>
              <div className="selected-grid">
                <AnimatePresence>
                  {selectedAdventureObjects.map((adventure) => (
                    <motion.div
                      key={adventure?.id}
                      className="selected-adventure-item"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      layout
                    >
                      <span className="selected-emoji">{adventure?.emoji}</span>
                      <span className="selected-name">{adventure?.title}</span>
                      <motion.button
                        onClick={() => toggleAdventure(adventure?.id ?? "")}
                        className="remove-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        ×
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
