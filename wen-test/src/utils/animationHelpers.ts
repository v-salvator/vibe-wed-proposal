export interface AnimationConfig {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const defaultAnimationConfig: AnimationConfig = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
  triggerOnce: true,
};

export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  config: AnimationConfig = defaultAnimationConfig
): IntersectionObserver => {
  return new IntersectionObserver(callback, {
    threshold: config.threshold,
    rootMargin: config.rootMargin,
    root: null,
  });
};

export const handleIntersection = (
  entries: IntersectionObserverEntry[],
  className: string = "animate"
): void => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add(className);
    } else if (!defaultAnimationConfig.triggerOnce) {
      entry.target.classList.remove(className);
    }
  });
};

export const addScrollAnimation = (
  element: HTMLElement,
  animationType:
    | "fade-in"
    | "fade-in-left"
    | "fade-in-right"
    | "scale-in" = "fade-in"
): void => {
  const className = `scroll-animate${
    animationType !== "fade-in" ? `-${animationType.split("-")[1]}` : ""
  }`;
  element.classList.add(className);

  const observer = createIntersectionObserver((entries) => {
    handleIntersection(entries, "animate");
  });

  observer.observe(element);
};

export const addStaggerAnimation = (
  container: HTMLElement,
  selector: string = "> *",
  delay: number = 100
): void => {
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
      }
    });
  });

  observer.observe(container);
};

export const addParallaxEffect = (
  element: HTMLElement,
  speed: number = 0.5
): (() => void) => {
  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * speed;
    element.style.transform = `translateY(${rate}px)`;
  };

  window.addEventListener("scroll", handleScroll);

  // Cleanup function
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
};

export const addTypewriterEffect = (
  element: HTMLElement,
  text: string,
  speed: number = 100
): void => {
  let index = 0;
  element.textContent = "";

  const type = () => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  };

  type();
};

export const addBounceAnimation = (
  element: HTMLElement,
  delay: number = 0
): void => {
  setTimeout(() => {
    element.classList.add("animate-bounce");
  }, delay);
};

export const addPulseAnimation = (
  element: HTMLElement,
  delay: number = 0
): void => {
  setTimeout(() => {
    element.classList.add("animate-pulse");
  }, delay);
};

export const removeAnimation = (
  element: HTMLElement,
  className: string
): void => {
  element.classList.remove(className);
};

export const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const getScrollPercentage = (): number => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return (scrollTop / docHeight) * 100;
};

export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
