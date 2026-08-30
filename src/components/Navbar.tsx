"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);

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
              🛒 <span className="cart-badge">1</span>
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
              <div className="cart-item">
                <img src="https://via.placeholder.com/80?text=Diya" alt="Brass Diya" />
                <div className="cart-item-info">
                  <h4>Traditional Brass Diya</h4>
                  <p className="cart-item-price">₹850.00</p>
                  <div className="cart-item-qty">Qty: 1</div>
                </div>
              </div>
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>₹850.00</span>
              </div>
              <Link href="/checkout" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--spacing-md)' }} onClick={() => setIsCartOpen(false)}>
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
