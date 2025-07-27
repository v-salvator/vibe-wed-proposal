import React, { useEffect, useRef } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./Hero.css";

export const Hero: React.FC = () => {
  const { elementRef: titleRef } = useScrollAnimation({
    animationType: "fade-in",
    threshold: 0.3,
  });

  const { elementRef: subtitleRef } = useScrollAnimation({
    animationType: "fade-in",
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  });

  const { elementRef: buttonRef } = useScrollAnimation({
    animationType: "scale-in",
    threshold: 0.3,
    rootMargin: "0px 0px -150px 0px",
  });

  const { elementRef: scrollIndicatorRef } = useScrollAnimation({
    animationType: "fade-in",
    threshold: 0.3,
    rootMargin: "0px 0px -200px 0px",
  });

  const scrollIndicatorRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add bounce animation to scroll indicator after a delay
    const timer = setTimeout(() => {
      if (scrollIndicatorRef2.current) {
        scrollIndicatorRef2.current.classList.add("animate-bounce");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("story-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero section section-full">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-particles"></div>
      </div>

      <div className="container">
        <div className="hero-content text-center">
          <h1 ref={titleRef} className="hero-title scroll-animate">
            Will You Marry Me?
          </h1>

          <p ref={subtitleRef} className="hero-subtitle scroll-animate">
            Every moment with you has been a dream come true. Now I want to make
            it official and spend forever with you.
          </p>

          <div ref={buttonRef} className="hero-actions scroll-animate-scale">
            <button
              className="btn btn-primary hover-lift"
              onClick={scrollToNextSection}
            >
              Our Story
            </button>
          </div>
        </div>
      </div>

      <div ref={scrollIndicatorRef} className="scroll-indicator scroll-animate">
        <div
          ref={scrollIndicatorRef2}
          className="scroll-arrow"
          onClick={scrollToNextSection}
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
        </div>
      </div>
    </section>
  );
};
