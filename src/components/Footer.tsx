import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <h2 className="footer-logo">Devi Metals</h2>
          <p>Authentic Ajjaram Brass & Bronze. Crafted with heritage, delivered with trust.</p>
        </div>
        <div className="footer-links">
          <h3>Shop</h3>
          <Link href="/puja-items">Puja Items</Link>
          <Link href="/utensils">Utensils</Link>
          <Link href="/decor">Home Decor</Link>
        </div>
        <div className="footer-links">
          <h3>Support</h3>
          <Link href="/contact">Contact Us</Link>
          <Link href="/shipping">Shipping Policy</Link>
          <Link href="/returns">Returns</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Devi Metals, Ajjaram. All rights reserved.</p>
      </div>
    </footer>
  );
}
