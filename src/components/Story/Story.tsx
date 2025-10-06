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
    date: "July 2018",
    title: "First Meeting",
    description:
      "We met at the Taptot office. I still remember you said something about sundried noodles.",
    side: "left",
  },
  {
    id: 2,
    date: "September 2018",
    title: "Relationship Started",
    description: "We started dating. And I am so shy afraid to hold your hand.",
    side: "right",
  },
  {
    id: 3,
    date: "November 2022",
    title: "Travel in Paris",
    description:
      "We traveled to Paris together for the first time. The Versailles, the Louvre, the Museums were amazing, the appetizers and desserts were delicious and we had a great time Seine River Cruise.",
    side: "left",
  },
  {
    id: 4,
    date: "January 2023",
    title: "Travel in Okinawa",
    description:
      "We traveled to Okinawa with your family for the first time. . The barbeque was amazing, the beaches, the stalactites caves, the aquarium were beautiful.",
    side: "right",
  },
  {
    id: 4,
    date: "June 2023",
    title: "Bought our first house",
    description:
      "Our first time to survey the house and we bought our first house. ",
    side: "left",
  },
  {
    id: 5,
    date: "February 2024",
    title: "Travel in Busan",
    description:
      "We traveled to Busan together for the first time. The View was amazing, the desserts so delicious and we had a lot of fun playing cart racing.",
    side: "right",
  },
  {
    id: 5,
    date: "February 2024",
    title: "We Sold our first house and bought our second house",
    description:
      "We sold our first house and bought our second house. So lucky to upgrade our house so soon.",
    side: "left",
  },
  {
    id: 6,
    date: "February 2024",
    title: "Travel in Tokyo",
    description:
      "We traveled to Tokyo togetherfor the first time. We played snowboarding and ate a lot of delicious food and had a lot of fun.",
    side: "right",
  },
  {
    id: 7,
    date: "January 2025",
    title: "Travel in Philippines",
    description:
      "We traveled to Philippines. Had the best lemonade in the Hotel and had a lot of fun sailing to see the dolphins and swimming in the ocean.",
    side: "left",
  },
  {
    id: 8,
    date: "March 2025",
    title: "Travel in Budapest and Vienna",
    description:
      "We traveled to Budapest for the first time. Though we stuck on the bridge for a long time but it was a beautiful city and we had a lot of fun.",
    side: "right",
  },
  {
    id: 9,
    date: "Now",
    title: "The Proposal",
    description:
      "And now, here we are. Ready to take the biggest step of all and start our forever together.",
    side: "left",
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
