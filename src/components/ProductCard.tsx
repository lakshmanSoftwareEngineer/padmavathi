import type { Product } from '../data';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart, lastAddedId } = useCart();
  const isJustAdded = lastAddedId === product.id;

  return (
    <article
      className="product-card"
      style={{ animationDelay: `${index * 0.08}s` }}
      id={`product-${product.id}`}
    >
      {/* Badge */}
      {product.badge && (
        <span className={`product-card__badge product-card__badge--${product.badge.toLowerCase().replace(' ', '-')}`}>
          {product.badge}
        </span>
      )}

      {/* Image */}
      <div className="product-card__image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="product-card__image-overlay">
          <button
            className={`product-card__quick-add ${isJustAdded ? 'added' : ''}`}
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.name} to cart`}
            id={`add-to-cart-${product.id}`}
          >
            {isJustAdded ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="product-card__info">
        <div className="product-card__category">{product.category}</div>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>

        <div className="product-card__rating">
          <span className="product-card__stars">
            {'★'.repeat(Math.floor(product.rating))}
            {product.rating % 1 >= 0.5 ? '½' : ''}
          </span>
          <span className="product-card__rating-num">{product.rating}</span>
        </div>

        <div className="product-card__bottom">
          <div className="product-card__price-group">
            <span className="product-card__price">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="product-card__original-price">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            className={`product-card__add-btn ${isJustAdded ? 'added' : ''}`}
            onClick={() => addToCart(product)}
            id={`add-btn-${product.id}`}
          >
            {isJustAdded ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  );
}
