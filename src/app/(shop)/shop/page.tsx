import ProductCard from "@/components/ProductCard";

// In a real app, this would come from a database
const allProducts = [
  { id: "1", name: "Traditional Brass Diya", price: 850.00, image: "https://via.placeholder.com/300?text=Brass+Diya", category: "Puja Items" },
  { id: "2", name: "Bronze Temple Bell", price: 1250.00, image: "https://via.placeholder.com/300?text=Bronze+Bell", category: "Decor" },
  { id: "3", name: "Brass Water Jug", price: 1800.00, image: "https://via.placeholder.com/300?text=Brass+Jug", category: "Utensils" },
  { id: "4", name: "Antique Brass Plate", price: 650.00, image: "https://via.placeholder.com/300?text=Brass+Plate", category: "Utensils" },
  { id: "5", name: "Brass Kuber Kunji", price: 450.00, image: "https://via.placeholder.com/300?text=Kuber+Kunji", category: "Puja Items" },
  { id: "6", name: "Bronze Nataraja Idol", price: 4500.00, image: "https://via.placeholder.com/300?text=Nataraja", category: "Decor" },
  { id: "7", name: "Brass Spice Box (Masala Dabba)", price: 1200.00, image: "https://via.placeholder.com/300?text=Spice+Box", category: "Utensils" },
  { id: "8", name: "Brass Hanging Diya", price: 950.00, image: "https://via.placeholder.com/300?text=Hanging+Diya", category: "Puja Items" },
];

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams.category;
  
  const filteredProducts = currentCategory 
    ? allProducts.filter(p => p.category.toLowerCase().replace(' ', '-') === currentCategory)
    : allProducts;

  return (
    <div className="container" style={{ padding: 'var(--spacing-2xl) var(--spacing-md)', display: 'flex', gap: 'var(--spacing-xl)' }}>
      {/* Sidebar Filters */}
      <aside style={{ width: '250px', flexShrink: 0 }} className="shop-sidebar">
        <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>Categories</h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          <li><a href="/shop" style={{ fontWeight: !currentCategory ? 'bold' : 'normal', color: !currentCategory ? 'var(--color-primary-dark)' : 'inherit' }}>All Products</a></li>
          <li><a href="/shop?category=puja-items" style={{ fontWeight: currentCategory === 'puja-items' ? 'bold' : 'normal', color: currentCategory === 'puja-items' ? 'var(--color-primary-dark)' : 'inherit' }}>Puja Items</a></li>
          <li><a href="/shop?category=utensils" style={{ fontWeight: currentCategory === 'utensils' ? 'bold' : 'normal', color: currentCategory === 'utensils' ? 'var(--color-primary-dark)' : 'inherit' }}>Utensils</a></li>
          <li><a href="/shop?category=decor" style={{ fontWeight: currentCategory === 'decor' ? 'bold' : 'normal', color: currentCategory === 'decor' ? 'var(--color-primary-dark)' : 'inherit' }}>Home Decor</a></li>
        </ul>

        <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-sm)', margin: 'var(--spacing-xl) 0 var(--spacing-md) 0' }}>Price Range</h3>
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
          <input type="number" placeholder="Min" style={{ width: '100%', padding: 'var(--spacing-xs)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
          <input type="number" placeholder="Max" style={{ width: '100%', padding: 'var(--spacing-xs)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <h1 style={{ marginBottom: 'var(--spacing-lg)' }}>
          {currentCategory ? currentCategory.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'All Products'}
        </h1>
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <p style={{ color: 'var(--color-text-muted)', marginTop: 'var(--spacing-xl)' }}>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}
