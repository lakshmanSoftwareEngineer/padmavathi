import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionDivider from './components/SectionDivider';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FloatingActions from './components/FloatingActions';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize GSAP smooth scroll defaults
  useEffect(() => {
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
    });

    // Refresh ScrollTrigger on images load
    const images = document.querySelectorAll('img');
    let loaded = 0;
    const total = images.length;

    const checkRefresh = () => {
      loaded++;
      if (loaded >= total) {
        ScrollTrigger.refresh();
      }
    };

    images.forEach(img => {
      if (img.complete) {
        checkRefresh();
      } else {
        img.addEventListener('load', checkRefresh);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setActiveCategory('all');
      const el = document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="app">
          <Navbar onSearchChange={handleSearchChange} searchQuery={searchQuery} />
          <Hero />
          <SectionDivider variant="diamond" />
          <Categories activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          <SectionDivider variant="dots" />
          <ProductGrid
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            onCategoryChange={setActiveCategory}
          />
          <SectionDivider variant="diamond" />
          <About />
          <SectionDivider variant="dots" />
          <Contact />
          <Footer />
          <CartDrawer />
          <FloatingActions />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
