"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="navbar">
        <div className="container navbar-inner">
          <Link href="/" className="navbar-logo">
            Devi Metals
          </Link>
          <nav className="navbar-links">
            <Link href="/shop?category=puja-items">Puja Items</Link>
            <Link href="/shop?category=utensils">Utensils</Link>
            <Link href="/shop?category=decor">Home Decor</Link>
            <Link href="/shop">All Products</Link>
          </nav>
          <div className="navbar-actions">
            <button className="btn-icon">🔍</button>
            <button className="btn-icon" onClick={() => setIsCartOpen(true)}>
              🛒 {isMounted && totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} style={{ fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>&times;</button>
            </div>
            
            <div className="cart-items">
              {isMounted && items.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)', color: 'var(--color-text-muted)' }}>Your cart is empty</p>
              ) : (
                isMounted && items.map(item => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p className="cart-item-price">₹{item.price.toFixed(2)}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-xs)' }}>
                        <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '0 8px' }}>-</button>
                          <span style={{ padding: '0 8px' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '0 8px' }}>+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} style={{ color: 'red', fontSize: '0.875rem' }}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>₹{isMounted ? getCartTotal().toFixed(2) : '0.00'}</span>
              </div>
              <Link href="/checkout" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--spacing-md)', opacity: items.length === 0 ? 0.5 : 1, pointerEvents: items.length === 0 ? 'none' : 'auto' }} onClick={() => setIsCartOpen(false)}>
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
