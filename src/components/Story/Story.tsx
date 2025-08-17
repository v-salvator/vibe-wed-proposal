import React from "react";
import { motion } from "framer-motion";
import "./Story.css";

interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  side: "left" | "right";
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    date: "January 2023",
    title: "First Meeting",
    description:
      "We met at that coffee shop downtown. I still remember the way you smiled when I accidentally spilled my coffee.",
    side: "left",
  },
  {
    id: 2,
    date: "February 2023",
    title: "First Date",
    description:
      "Our first official date at that Italian restaurant. You wore that beautiful red dress that made my heart skip a beat.",
    side: "right",
  },
  {
    id: 3,
    date: "March 2023",
    title: "Movie Night",
    description:
      "We watched that romantic comedy and shared popcorn. I knew then that you were someone special.",
    side: "left",
  },
  {
    id: 4,
    date: "June 2023",
    title: "Beach Vacation",
    description:
      "Our first trip together to the beach. Building sandcastles and watching the sunset together.",
    side: "right",
  },
  {
    id: 5,
    date: "September 2023",
    title: "Birthday Surprise",
    description:
      "Planning your surprise birthday party was one of the most exciting things I've ever done.",
    side: "left",
  },
  {
    id: 6,
    date: "December 2023",
    title: "Holiday Together",
    description:
      "Spending the holidays with your family made me realize how much I want to be part of your life forever.",
    side: "right",
  },
  {
    id: 7,
    date: "March 2024",
    title: "Moving In",
    description:
      "Taking the big step of moving in together. Every day feels like a new adventure with you.",
    side: "left",
  },
  {
    id: 8,
    date: "Now",
    title: "The Proposal",
    description:
      "And now, here we are. Ready to take the biggest step of all and start our forever together.",
    side: "right",
  },
];

export const Story: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const fromLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const fromRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="story-section" className="story section">
      <div className="container">
        <div className="story-header text-center">
          <motion.h2
            className="story-title"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            Our Love Story
          </motion.h2>

          <motion.p
            className="story-subtitle"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
          >
            Every moment with you has been a chapter in the most beautiful story
            ever written.
          </motion.p>
        </div>

        <motion.div
          className="timeline-container"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
        >
          <div className="timeline-line"></div>

          {timelineData.map((item) => (
            <motion.div
              key={item.id}
              className={`timeline-item timeline-item-${item.side}`}
              variants={item.side === "left" ? fromLeft : fromRight}
            >
              <div className="timeline-marker">
                <div className="timeline-dot"></div>
              </div>

              <div className="timeline-content">
                <div className="timeline-date">{item.date}</div>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
