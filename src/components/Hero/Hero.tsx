import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";

export const Hero: React.FC = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("story-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="hero section section-full">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-particles"></div>
      </div>

      <div className="container">
        <div className="hero-content text-center">
          <motion.h1
            className="hero-title"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            Will You Marry Me?
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
          >
            Every moment with you has been a dream come true. Now I want to make
            it official and spend forever with you.
          </motion.p>

          <motion.div
            className="hero-actions"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -150px 0px" }}
          >
            <button
              className="btn btn-primary hover-lift"
              onClick={scrollToNextSection}
            >
              Our Story
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="scroll-indicator"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3, margin: "0px 0px -200px 0px" }}
      >
        <motion.div
          className="scroll-arrow"
          onClick={scrollToNextSection}
          initial={{ y: 0 }}
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 2,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 13l5 5 5-5" />
            <path d="M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};
