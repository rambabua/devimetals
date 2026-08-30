import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="navbar-logo">
          Devi Metals
        </Link>
        <nav className="navbar-links">
          <Link href="/puja-items">Puja Items</Link>
          <Link href="/utensils">Utensils</Link>
          <Link href="/decor">Home Decor</Link>
          <Link href="/wholesale">Wholesale</Link>
        </nav>
        <div className="navbar-actions">
          <button className="btn-icon">🔍</button>
          <button className="btn-icon">🛒 <span className="cart-badge">0</span></button>
        </div>
      </div>
    </header>
  );
}
