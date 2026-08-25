import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/**
 * Hook that applies a GSAP scroll-triggered animation to an element.
 */
export function useGsapScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    trigger?: ScrollTrigger.Vars;
    delay?: number;
  } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 50,
        ...options.from,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: options.delay || 0,
        ...options.to,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
          ...options.trigger,
        },
      }
    );

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}

/**
 * Hook that applies staggered GSAP scroll-triggered animations to children.
 */
export function useGsapStagger<T extends HTMLElement = HTMLDivElement>(
  childSelector: string,
  options: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    stagger?: number;
    trigger?: ScrollTrigger.Vars;
  } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll(childSelector);
    if (children.length === 0) return;

    const tween = gsap.fromTo(
      children,
      {
        opacity: 0,
        y: 60,
        scale: 0.95,
        ...options.from,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: options.stagger || 0.1,
        ...options.to,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
          ...options.trigger,
        },
      }
    );

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [childSelector]);

  return ref;
}

/**
 * Hook for parallax effect on scroll.
 */
export function useGsapParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.3
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.to(el, {
      y: () => speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [speed]);

  return ref;
}
