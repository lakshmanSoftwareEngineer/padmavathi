import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Hero.css';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Animate text elements in sequence
      tl.fromTo(
        '.hero__pre-title',
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      )
        .fromTo(
          '.hero__title-line',
          { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
          { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1 },
          '-=0.4'
        )
        .fromTo(
          '.hero__title-accent',
          { opacity: 0, x: -40, clipPath: 'inset(0 100% 0 0)' },
          { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.9 },
          '-=0.5'
        )
        .fromTo(
          '.hero__subtitle',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          '.hero__cta',
          { opacity: 0, y: 25, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15 },
          '-=0.3'
        );

      // Stats counter animation
      if (statsRef.current) {
        tl.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          '-=0.3'
        );
      }

      // Visual / Image
      gsap.fromTo(
        visualRef.current,
        { opacity: 0, scale: 0.85, rotateY: 15 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1.4,
          ease: 'power3.out',
          delay: 0.6,
        }
      );

      // Floating emojis with continuous GSAP animation
      gsap.utils.toArray<HTMLElement>('.hero__float').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.6, delay: 1 + i * 0.2, ease: 'back.out(1.7)' }
        );
        gsap.to(el, {
          y: -15,
          rotation: 10,
          duration: 2 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.5 + i * 0.3,
        });
      });

      // Particles continuous sparkle
      if (particlesRef.current) {
        gsap.utils.toArray<HTMLElement>('.hero__particle').forEach((p) => {
          gsap.to(p, {
            opacity: 0.7,
            scale: 1.2,
            duration: 1.5 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 3,
          });
        });
      }

      // Gradient orb parallax on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPercent = (clientX / window.innerWidth - 0.5) * 2;
        const yPercent = (clientY / window.innerHeight - 0.5) * 2;

        gsap.to('.hero__orb--1', { x: xPercent * 30, y: yPercent * 20, duration: 1.2, ease: 'power2.out' });
        gsap.to('.hero__orb--2', { x: xPercent * -20, y: yPercent * -15, duration: 1.4, ease: 'power2.out' });
        gsap.to('.hero__orb--3', { x: xPercent * 15, y: yPercent * 10, duration: 1.6, ease: 'power2.out' });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Scroll indicator fade out
      gsap.to('.hero__scroll', {
        opacity: 0,
        y: 20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200',
          scrub: true,
        },
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      {/* Decorative particles */}
      <div className="hero__particles" ref={particlesRef}>
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="hero__particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${0.4 + Math.random() * 0.6}rem`,
            }}
          >
            {['✦', '✧', '❋', '✵', '⟡', '◇'][Math.floor(Math.random() * 6)]}
          </span>
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />

      <div className="hero__content container">
        <div className="hero__text" ref={textRef}>
          <span className="hero__pre-title">
            <span className="hero__pre-icon">🪷</span>
            Welcome to
          </span>
          <h1 className="hero__title">
            <span className="hero__title-line">Padmavathi</span>
            <span className="hero__title-accent">Gift Shop</span>
          </h1>
          <p className="hero__subtitle">
            Where every gift tells a story. Discover handpicked treasures,
            premium bouquets, artisan chocolates, and personalized keepsakes
            for every occasion that matters.
          </p>
          <div className="hero__cta-group">
            <button className="hero__cta hero__cta--primary" onClick={scrollToProducts} id="hero-shop-btn">
              <span>Explore Gifts</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <a
              className="hero__cta hero__cta--secondary"
              href="https://share.google/PWVmUlkXNSJ2Gy2XK"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-location-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Visit Our Store</span>
            </a>
          </div>
          <div className="hero__stats" ref={statsRef}>
            <div className="hero__stat">
              <span className="hero__stat-number">500+</span>
              <span className="hero__stat-label">Unique Gifts</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">10K+</span>
              <span className="hero__stat-label">Happy Customers</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">4.9★</span>
              <span className="hero__stat-label">Average Rating</span>
            </div>
          </div>
        </div>

        <div className="hero__visual" ref={visualRef}>
          <div className="hero__image-wrapper">
            <div className="hero__image-glow" />
            <img
              src="/images/hero-banner.jpg"
              alt="Padmavathi Gift Shop — Premium gifts and elegant décor"
              className="hero__image"
              loading="eager"
            />
            <div className="hero__image-frame" />
          </div>
          {/* Floating elements */}
          <div className="hero__float hero__float--1">🎁</div>
          <div className="hero__float hero__float--2">🌹</div>
          <div className="hero__float hero__float--3">🍫</div>
          <div className="hero__float hero__float--4">🧸</div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button className="hero__scroll" onClick={scrollToProducts} aria-label="Scroll down">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </button>
    </section>
  );
}
