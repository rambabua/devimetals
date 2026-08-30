"use client";

import { useState } from 'react';
import { useCartStore, CartItem } from '@/store/useCartStore';

interface AddToCartButtonProps {
  product: Omit<CartItem, 'quantity'>;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore(state => state.addToCart);

  const handleAdd = () => {
    addToCart(product, quantity);
  };

  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
      <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', width: '120px' }}>
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          style={{ padding: 'var(--spacing-sm) var(--spacing-md)', backgroundColor: 'var(--color-bg)', border: 'none', cursor: 'pointer' }}
        >
          -
        </button>
        <input 
          type="text" 
          value={quantity} 
          readOnly 
          style={{ width: '100%', textAlign: 'center', border: 'none', outline: 'none' }} 
        />
        <button 
          onClick={() => setQuantity(quantity + 1)}
          style={{ padding: 'var(--spacing-sm) var(--spacing-md)', backgroundColor: 'var(--color-bg)', border: 'none', cursor: 'pointer' }}
        >
          +
        </button>
      </div>
      <button className="btn btn-primary" style={{ flex: 1, fontSize: '1.1rem' }} onClick={handleAdd}>
        Add to Cart
      </button>
    </div>
  );
}
