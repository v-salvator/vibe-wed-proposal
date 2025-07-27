import React from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useStaggerAnimation } from "../../hooks/useScrollAnimation";
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
  const { elementRef: titleRef } = useScrollAnimation<HTMLHeadingElement>({
    animationType: "fade-in",
    threshold: 0.3,
  });

  const { elementRef: subtitleRef } = useScrollAnimation<HTMLParagraphElement>({
    animationType: "fade-in",
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  });

  const { elementRef: timelineRef } = useScrollAnimation<HTMLDivElement>({
    animationType: "fade-in",
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  useStaggerAnimation(timelineRef, ".timeline-item", 200);

  return (
    <section id="story-section" className="story section">
      <div className="container">
        <div className="story-header text-center">
          <h2 ref={titleRef} className="story-title scroll-animate">
            Our Love Story
          </h2>

          <p ref={subtitleRef} className="story-subtitle scroll-animate">
            Every moment with you has been a chapter in the most beautiful story
            ever written.
          </p>
        </div>

        <div ref={timelineRef} className="timeline-container scroll-animate">
          <div className="timeline-line"></div>

          {timelineData.map((item, index) => (
            <div
              key={item.id}
              className={`timeline-item timeline-item-${
                item.side
              } scroll-animate-${item.side === "left" ? "left" : "right"}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="timeline-marker">
                <div className="timeline-dot"></div>
              </div>

              <div className="timeline-content">
                <div className="timeline-date">{item.date}</div>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
