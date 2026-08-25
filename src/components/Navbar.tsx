import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

interface NavbarProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export default function Navbar({ onSearchChange, searchQuery }: NavbarProps) {
  const { totalItems, setIsCartOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="nav-main">
      <div className="navbar__inner container">
        {/* Logo */}
        <button className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} id="nav-logo">
          <span className="navbar__logo-icon">🪷</span>
          <div className="navbar__logo-text">
            <span className="navbar__brand">Padmavathi</span>
            <span className="navbar__tagline">Gift Shop</span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <ul className="navbar__links">
          <li><button onClick={() => scrollTo('hero')} id="nav-home">Home</button></li>
          <li><button onClick={() => scrollTo('categories')} id="nav-categories">Categories</button></li>
          <li><button onClick={() => scrollTo('products')} id="nav-products">Products</button></li>
          <li><button onClick={() => scrollTo('about')} id="nav-about">About</button></li>
          <li><button onClick={() => scrollTo('contact')} id="nav-contact">Contact</button></li>
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          {/* Theme Toggle */}
          <button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            id="nav-theme-toggle"
          >
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Search Toggle */}
          <button
            className={`navbar__search-toggle ${searchOpen ? 'active' : ''}`}
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Toggle search"
            id="nav-search-toggle"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Cart Button */}
          <button
            className="navbar__cart-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
            id="nav-cart-btn"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="navbar__cart-badge" key={totalItems}>{totalItems}</span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className={`navbar__hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            id="nav-hamburger"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Search Bar (expandable) */}
      <div className={`navbar__search-bar ${searchOpen ? 'open' : ''}`}>
        <div className="container">
          <div className="navbar__search-inner">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search for gifts, flowers, chocolates..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              id="nav-search-input"
              autoFocus={searchOpen}
            />
            {searchQuery && (
              <button
                className="navbar__search-clear"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                id="nav-search-clear"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><button onClick={() => scrollTo('hero')}>Home</button></li>
          <li><button onClick={() => scrollTo('categories')}>Categories</button></li>
          <li><button onClick={() => scrollTo('products')}>Products</button></li>
          <li><button onClick={() => scrollTo('about')}>About</button></li>
          <li><button onClick={() => scrollTo('contact')}>Contact</button></li>
        </ul>
      </div>
    </nav>
  );
}
