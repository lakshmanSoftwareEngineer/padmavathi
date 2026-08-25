import { useMemo, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products, categories } from '../data';
import ProductCard from './ProductCard';
import './ProductGrid.css';

gsap.registerPlugin(ScrollTrigger);

interface ProductGridProps {
  activeCategory: string;
  searchQuery: string;
  onCategoryChange: (id: string) => void;
}

export default function ProductGrid({ activeCategory, searchQuery, onCategoryChange }: ProductGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  // Animate header on mount
  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate product cards whenever filtered list changes
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.product-card');
    if (cards.length === 0) return;

    // Kill existing ScrollTriggers for this grid
    ScrollTrigger.getAll().forEach(t => {
      if (t.trigger === gridRef.current) t.kill();
    });

    gsap.fromTo(
      cards,
      { opacity: 0, y: 60, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [filteredProducts]);

  return (
    <section className="product-grid-section" id="products" ref={sectionRef}>
      <div className="container">
        <div ref={headerRef}>
          <h2 className="section-title">Our Gift Collection</h2>
          <p className="section-subtitle">
            {searchQuery
              ? `Showing results for "${searchQuery}"`
              : 'Handpicked gifts crafted with love and elegance'}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="product-grid__filters">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`product-grid__filter ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat.id)}
              id={`filter-${cat.id}`}
            >
              <span className="product-grid__filter-icon">{cat.icon}</span>
              <span>{cat.id === 'all' ? 'All' : cat.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="product-grid" ref={gridRef}>
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="product-grid__empty">
            <span className="product-grid__empty-icon">🔍</span>
            <h3>No gifts found</h3>
            <p>Try a different search or browse our categories</p>
            <button
              className="product-grid__empty-btn"
              onClick={() => onCategoryChange('all')}
            >
              View All Gifts
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
