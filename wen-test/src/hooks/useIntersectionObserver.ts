import { useEffect, useRef, useState } from "react";
import type { AnimationConfig } from "../utils/animationHelpers";

export interface UseIntersectionObserverOptions extends AnimationConfig {
  onIntersect?: (entry: IntersectionObserverEntry) => void;
  onUnintersect?: (entry: IntersectionObserverEntry) => void;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const elementRef = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
    onIntersect,
    onUnintersect,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            setHasIntersected(true);
            onIntersect?.(entry);
          } else {
            setIsIntersecting(false);
            if (!triggerOnce) {
              onUnintersect?.(entry);
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
        root: null,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, onIntersect, onUnintersect]);

  return { elementRef, isIntersecting, hasIntersected };
};

export const useInViewport = (options: UseIntersectionObserverOptions = {}) => {
  const { elementRef, isIntersecting } = useIntersectionObserver(options);
  return { elementRef, isInViewport: isIntersecting };
};

export const useOnceInViewport = (
  options: UseIntersectionObserverOptions = {}
) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    ...options,
    triggerOnce: true,
  });
  return { elementRef, hasBeenInViewport: hasIntersected };
};
