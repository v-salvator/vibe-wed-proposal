import { useEffect, useRef, useState } from "react";
import { createIntersectionObserver } from "../utils/animationHelpers";
import type { AnimationConfig } from "../utils/animationHelpers";

export interface UseScrollAnimationOptions extends AnimationConfig {
  className?: string;
  animationType?: "fade-in" | "fade-in-left" | "fade-in-right" | "scale-in";
}

export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(
  options: UseScrollAnimationOptions = {}
) => {
  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
    className = "animate",
    animationType = "fade-in",
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Add the appropriate animation class
    const animationClass = `scroll-animate${
      animationType !== "fade-in" ? `-${animationType.split("-")[1]}` : ""
    }`;
    element.classList.add(animationClass);

    const observer = createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(className);
            setIsVisible(true);
          } else if (!triggerOnce) {
            entry.target.classList.remove(className);
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin, triggerOnce }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, className, animationType]);

  return { elementRef, isVisible };
};

export const useStaggerAnimation = <T extends HTMLElement = HTMLElement>(
  containerRef: React.RefObject<T>,
  selector: string = "> *",
  delay: number = 100
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);

    elements.forEach((element, index) => {
      const el = element as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = `opacity 0.6s ease-out ${
        index * delay
      }ms, transform 0.6s ease-out ${index * delay}ms`;
    });

    const observer = createIntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll(selector);
          elements.forEach((element) => {
            const el = element as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          });
          setIsVisible(true);
        }
      });
    });

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, [containerRef, selector, delay]);

  return { isVisible };
};

export const useParallaxEffect = <T extends HTMLElement = HTMLElement>(
  speed: number = 0.5
) => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      element.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed]);

  return { elementRef };
};

export const useScrollPercentage = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percentage = (scrollTop / docHeight) * 100;
      setScrollPercentage(percentage);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPercentage;
};
