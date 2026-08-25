import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';

      // GSAP entrance
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(
        drawerRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.5, ease: 'power3.out' }
      );

      // Stagger cart items
      if (contentRef.current) {
        const itemEls = contentRef.current.querySelectorAll('.cart-item');
        gsap.fromTo(
          itemEls,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out', delay: 0.2 }
        );
      }
    } else {
      document.body.style.overflow = '';
    }
  }, [isCartOpen, items.length]);

  const handleClose = () => {
    gsap.to(drawerRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      onComplete: () => setIsCartOpen(false),
    });
  };

  const handleWhatsAppCheckout = () => {
    const phone = '918978165716';
    let message = '🛒 *Order from Padmavathi Gift Shop*\n\n';
    items.forEach((item, i) => {
      message += `${i + 1}. *${item.product.name}*\n`;
      message += `   Qty: ${item.quantity} × ₹${item.product.price.toLocaleString()} = ₹${(item.product.price * item.quantity).toLocaleString()}\n\n`;
    });
    message += `──────────────\n`;
    message += `*Total Items:* ${totalItems}\n`;
    message += `*Total Amount:* ₹${totalPrice.toLocaleString()}\n\n`;
    message += `Please confirm my order. Thank you! 🙏`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleRemove = (id: number, el: HTMLElement) => {
    gsap.to(el, {
      opacity: 0,
      x: 60,
      height: 0,
      marginBottom: 0,
      padding: 0,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => removeFromCart(id),
    });
  };

  if (!isCartOpen) return null;

  return (
    <div className="cart-drawer-wrapper">
      <div className="cart-drawer__overlay" ref={overlayRef} onClick={handleClose} />
      <div className="cart-drawer" ref={drawerRef}>
        {/* Header */}
        <div className="cart-drawer__header">
          <div className="cart-drawer__title-group">
            <h2 className="cart-drawer__title">Your Cart</h2>
            <span className="cart-drawer__count">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
          </div>
          <button className="cart-drawer__close" onClick={handleClose} aria-label="Close cart" id="cart-close-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="cart-drawer__content" ref={contentRef}>
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <span className="cart-drawer__empty-icon">🛒</span>
              <h3>Your cart is empty</h3>
              <p>Explore our gifts and add something special!</p>
              <button className="cart-drawer__browse-btn" onClick={handleClose}>
                Browse Gifts
              </button>
            </div>
          ) : (
            items.map(item => (
              <div className="cart-item" key={item.product.id} id={`cart-item-${item.product.id}`}>
                <div className="cart-item__image">
                  <img src={item.product.image} alt={item.product.name} />
                </div>
                <div className="cart-item__info">
                  <h4 className="cart-item__name">{item.product.name}</h4>
                  <span className="cart-item__category">{item.product.category}</span>
                  <span className="cart-item__price">₹{item.product.price.toLocaleString()}</span>
                </div>
                <div className="cart-item__actions">
                  <div className="cart-item__qty">
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="cart-item__qty-num">{item.quantity}</span>
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={(e) => {
                      const el = (e.currentTarget as HTMLElement).closest('.cart-item') as HTMLElement;
                      handleRemove(item.product.id, el);
                    }}
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__summary">
              <div className="cart-drawer__summary-row">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="cart-drawer__summary-row cart-drawer__summary-total">
                <span>Total</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>
            <button
              className="cart-drawer__checkout-btn"
              onClick={handleWhatsAppCheckout}
              id="cart-checkout-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Order via WhatsApp</span>
            </button>
            <button className="cart-drawer__clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
