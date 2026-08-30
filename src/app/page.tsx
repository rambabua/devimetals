import ProductCard from "@/components/ProductCard";

export default function Home() {
  const featuredProducts = [
    {
      id: "1",
      name: "Traditional Brass Diya (Medium)",
      price: 850.00,
      image: "https://via.placeholder.com/300?text=Brass+Diya",
      category: "Puja Items"
    },
    {
      id: "2",
      name: "Handcrafted Bronze Temple Bell",
      price: 1250.00,
      image: "https://via.placeholder.com/300?text=Bronze+Bell",
      category: "Decor"
    },
    {
      id: "3",
      name: "Pure Brass Water Jug (1.5L)",
      price: 1800.00,
      image: "https://via.placeholder.com/300?text=Brass+Jug",
      category: "Utensils"
    },
    {
      id: "4",
      name: "Antique Finish Brass Plate",
      price: 650.00,
      image: "https://via.placeholder.com/300?text=Brass+Plate",
      category: "Utensils"
    }
  ];

  const categories = [
    { title: "Puja Items", desc: "Authentic idols, diyas, and bells", color: "var(--color-primary-light)" },
    { title: "Utensils", desc: "Healthy eating with pure brass", color: "#f0dfcf" },
    { title: "Home Decor", desc: "Heritage showpieces", color: "#e8ede6" },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" style={{ 
        backgroundColor: 'var(--color-text)', 
        color: 'var(--color-surface)',
        padding: 'var(--spacing-3xl) 0',
        textAlign: 'center'
      }}>
        <div className="container animate-fade-in">
          <h1 style={{ fontSize: '3.5rem', marginBottom: 'var(--spacing-md)', color: 'var(--color-primary)' }}>
            The Heritage of Ajjaram, Delivered.
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#CBD5E1', maxWidth: '600px', margin: '0 auto var(--spacing-xl) auto' }}>
            Shop premium quality authentic brass and bronze puja items, utensils, and handcrafted home decor.
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center' }}>
            <button className="btn btn-primary">Shop Bestsellers</button>
            <button className="btn btn-outline" style={{ borderColor: 'var(--color-surface)', color: 'var(--color-surface)' }}>Contact Wholesale</button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container" style={{ padding: 'var(--spacing-3xl) var(--spacing-md)' }}>
        <h2 className="text-center" style={{ fontSize: '2rem', marginBottom: 'var(--spacing-2xl)' }}>Shop by Category</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
          {categories.map((cat, i) => (
            <div key={i} style={{ 
              backgroundColor: cat.color, 
              padding: 'var(--spacing-2xl)', 
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }} className="category-card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-xs)' }}>{cat.title}</h3>
              <p style={{ color: 'var(--color-text-muted)' }}>{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container" style={{ padding: 'var(--spacing-xl) var(--spacing-md) var(--spacing-3xl) var(--spacing-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>Bestsellers</h2>
          <a href="/shop" style={{ fontWeight: 600, color: 'var(--color-primary-dark)' }}>View All &rarr;</a>
        </div>
        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* Features Banner */}
      <section style={{ backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: 'var(--spacing-2xl) 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 'var(--spacing-xl)' }}>
          <div className="text-center" style={{ flex: '1', minWidth: '200px' }}>
            <h4 style={{ color: 'var(--color-primary-dark)' }}>100% Authentic</h4>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Direct from Ajjaram craftsmen</p>
          </div>
          <div className="text-center" style={{ flex: '1', minWidth: '200px' }}>
            <h4 style={{ color: 'var(--color-primary-dark)' }}>Secure Shipping</h4>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Pan-India safe delivery</p>
          </div>
          <div className="text-center" style={{ flex: '1', minWidth: '200px' }}>
            <h4 style={{ color: 'var(--color-primary-dark)' }}>Wholesale Prices</h4>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Bulk orders available</p>
          </div>
        </div>
      </section>
    </div>
  );
}
