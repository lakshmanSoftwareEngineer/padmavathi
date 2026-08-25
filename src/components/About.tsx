import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gift, Truck, Heart, Star, RefreshCw, MessageCircle } from 'lucide-react';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(
        '.about .section-title, .about .section-subtitle',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      // Feature cards stagger
      gsap.fromTo(
        '.about__feature',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: '.about__features', start: 'top 82%' },
        }
      );

      // Testimonial cards
      gsap.fromTo(
        '.about__testimonial',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about__testimonials', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: <Gift size={40} strokeWidth={1.5} />, title: 'Handpicked Gifts', desc: 'Every item in our collection is carefully curated for quality and uniqueness.' },
    { icon: <Truck size={40} strokeWidth={1.5} />, title: 'Gift Wrapping', desc: 'Complimentary premium gift wrapping on every order, ready to give.' },
    { icon: <Heart size={40} strokeWidth={1.5} />, title: 'Personal Touch', desc: 'Add custom messages and personalization to make gifts truly special.' },
    { icon: <Star size={40} strokeWidth={1.5} />, title: 'Premium Quality', desc: 'We source only the finest materials and work with trusted artisans.' },
    { icon: <RefreshCw size={40} strokeWidth={1.5} />, title: 'Easy Exchanges', desc: 'Hassle-free returns and exchanges within 7 days of delivery.' },
    { icon: <MessageCircle size={40} strokeWidth={1.5} />, title: 'WhatsApp Support', desc: 'Chat with us anytime for gift advice, custom orders, or queries.' },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      text: 'The flower bouquet I ordered was absolutely stunning. My mother was thrilled! Padmavathi never disappoints.',
      rating: 5,
    },
    {
      name: 'Ravi Kumar',
      text: 'Ordered a personalized photo lamp for my anniversary. The quality was exceptional and delivery was prompt.',
      rating: 5,
    },
    {
      name: 'Sneha Reddy',
      text: 'Best gift shop in town! The chocolate hamper I got for Diwali was beautifully packaged. Will order again!',
      rating: 5,
    },
  ];

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Why Choose Padmavathi?</h2>
        <p className="section-subtitle">We make gifting effortless, elegant, and unforgettable</p>

        <div className="about__features">
          {features.map((f, i) => (
            <div className="about__feature" key={i}>
              <span className="about__feature-icon">{f.icon}</span>
              <h3 className="about__feature-title">{f.title}</h3>
              <p className="about__feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="about__testimonials-section">
          <h3 className="about__sub-title">What Our Customers Say</h3>
          <div className="about__testimonials">
            {testimonials.map((t, i) => (
              <div className="about__testimonial" key={i}>
                <div className="about__testimonial-stars">
                  {'★'.repeat(t.rating)}
                </div>
                <p className="about__testimonial-text">"{t.text}"</p>
                <span className="about__testimonial-name">— {t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
