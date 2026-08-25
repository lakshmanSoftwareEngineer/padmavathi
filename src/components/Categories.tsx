import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categories } from '../data';
import './Categories.css';

gsap.registerPlugin(ScrollTrigger);

interface CategoriesProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export default function Categories({ activeCategory, onCategoryChange }: CategoriesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title + subtitle reveal
      gsap.fromTo(
        ['.categories .section-title', '.categories .section-subtitle'],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Staggered card reveals with scale and rotation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.categories__card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, scale: 0.88, rotateX: 8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleClick = (id: string) => {
    onCategoryChange(id);
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="categories" id="categories" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Shop by Category</h2>
        <p className="section-subtitle">Find the perfect gift from our curated collections</p>

        <div className="categories__grid" ref={gridRef}>
          {categories.filter(c => c.id !== 'all').map((cat) => (
            <button
              key={cat.id}
              className={`categories__card ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleClick(cat.id)}
              id={`cat-${cat.id}`}
            >
              <div className="categories__card-image">
                <img src={cat.image} alt={cat.name} loading="lazy" />
                <div className="categories__card-overlay" />
              </div>
              <div className="categories__card-content">
                <span className="categories__card-icon">{cat.icon}</span>
                <h3 className="categories__card-name">{cat.name}</h3>
                <p className="categories__card-desc">{cat.description}</p>
                <span className="categories__card-count">{cat.productCount} items</span>
              </div>
              <div className="categories__card-border" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
