"use client";

import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ id, name, price, image, category }: ProductCardProps) {
  const addToCart = useCartStore(state => state.addToCart);

  return (
    <div className="product-card">
      <Link href={`/product/${id}`} className="product-image-wrap">
        <div className="product-image-placeholder" style={{ backgroundImage: `url(${image})` }}></div>
      </Link>
      <div className="product-info">
        <span className="product-category">{category}</span>
        <h3 className="product-name"><Link href={`/product/${id}`}>{name}</Link></h3>
        <p className="product-price">₹{price.toFixed(2)}</p>
        <button 
          className="btn btn-outline product-add-btn"
          onClick={() => addToCart({ id, name, price, image, category })}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
