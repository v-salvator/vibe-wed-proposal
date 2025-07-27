import React, { useState, useEffect } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { motion, AnimatePresence } from "framer-motion";
import "./Proposal.css";

export const Proposal: React.FC = () => {
  const [showRing, setShowRing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const { elementRef: titleRef } = useScrollAnimation<HTMLHeadingElement>({
    animationType: "fade-in",
    threshold: 0.3,
  });

  const { elementRef: subtitleRef } = useScrollAnimation<HTMLParagraphElement>({
    animationType: "fade-in",
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  });

  const { elementRef: ringRef } = useScrollAnimation<HTMLDivElement>({
    animationType: "scale-in",
    threshold: 0.5,
    rootMargin: "0px 0px -150px 0px",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRing(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showRing) {
      const confettiTimer = setTimeout(() => {
        setShowConfetti(true);
      }, 500);

      return () => clearTimeout(confettiTimer);
    }
  }, [showRing]);

  const handleYesClick = () => {
    setShowConfetti(true);
    // Add any additional celebration logic here
  };

  const handleNoClick = () => {
    // Add playful "no" logic here
    alert("Are you sure? Let me try again! 💕");
  };

  return (
    <section id="proposal-section" className="proposal section section-full">
      <div className="proposal-background">
        <div className="proposal-stars"></div>
        <div className="proposal-sparkles"></div>
      </div>

      <div className="container">
        <div className="proposal-content text-center">
          <h1 ref={titleRef} className="proposal-title scroll-animate">
            Will You Marry Me?
          </h1>

          <p ref={subtitleRef} className="proposal-subtitle scroll-animate">
            Every day with you has been a gift, and I want to spend the rest of
            my life unwrapping that gift with you.
          </p>

          <div
            ref={ringRef}
            className="proposal-ring-container scroll-animate-scale"
          >
            <AnimatePresence>
              {showRing && (
                <motion.div
                  className="proposal-ring"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    duration: 1.5,
                  }}
                >
                  <div className="ring-band"></div>
                  <div className="ring-stone"></div>
                  <div className="ring-sparkle ring-sparkle-1"></div>
                  <div className="ring-sparkle ring-sparkle-2"></div>
                  <div className="ring-sparkle ring-sparkle-3"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="proposal-actions">
            <motion.button
              className="btn btn-yes hover-lift"
              onClick={handleYesClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Yes, I Will! 💍
            </motion.button>

            <motion.button
              className="btn btn-no"
              onClick={handleNoClick}
              whileHover={{ scale: 1.05, x: 20 }}
              whileTap={{ scale: 0.95 }}
            >
              No 💔
            </motion.button>
          </div>

          <div className="proposal-message">
            <p className="proposal-message-text">
              "I promise to love you more each day, to be your biggest
              supporter, your best friend, and your partner in all of life's
              adventures."
            </p>
          </div>
        </div>
      </div>

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className={`confetti confetti-${i % 5}`}
                initial={{
                  y: -100,
                  x: Math.random() * window.innerWidth,
                  rotate: 0,
                }}
                animate={{
                  y: window.innerHeight + 100,
                  x: Math.random() * window.innerWidth,
                  rotate: 360,
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
