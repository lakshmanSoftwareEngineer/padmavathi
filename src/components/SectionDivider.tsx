import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SectionDivider.css';

gsap.registerPlugin(ScrollTrigger);

interface SectionDividerProps {
  variant?: 'wave' | 'diamond' | 'dots';
}

export default function SectionDivider({ variant = 'diamond' }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the line from center outward
      gsap.fromTo(
        '.divider__line-left',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%' },
        }
      );
      gsap.fromTo(
        '.divider__line-right',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%' },
        }
      );
      gsap.fromTo(
        '.divider__center',
        { scale: 0, rotation: 180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: 0.3,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: ref.current, start: 'top 85%' },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div className={`divider divider--${variant}`} ref={ref}>
      <span className="divider__line-left" />
      <span className="divider__center">
        {variant === 'diamond' && '◇'}
        {variant === 'wave' && '〰️'}
        {variant === 'dots' && '• • •'}
      </span>
      <span className="divider__line-right" />
    </div>
  );
}
