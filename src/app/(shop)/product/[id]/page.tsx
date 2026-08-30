import { notFound } from 'next/navigation';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';

// Mock DB
const allProducts = [
  { id: "1", name: "Traditional Brass Diya", price: 850.00, image: "https://via.placeholder.com/600?text=Brass+Diya", category: "Puja Items", description: "Authentic Ajjaram crafted brass diya, perfect for daily puja and festive occasions. Solid build quality with a traditional design that holds enough oil for long hours.", weight: "450g", dimensions: "12cm x 10cm" },
  { id: "2", name: "Bronze Temple Bell", price: 1250.00, image: "https://via.placeholder.com/600?text=Bronze+Bell", category: "Decor", description: "A beautifully resonant bronze bell handcrafted using traditional casting methods.", weight: "800g", dimensions: "15cm x 8cm" },
  { id: "3", name: "Brass Water Jug", price: 1800.00, image: "https://via.placeholder.com/600?text=Brass+Jug", category: "Utensils", description: "Store your drinking water in this pure brass jug for added health benefits and a royal dining experience.", weight: "1.2kg", dimensions: "25cm x 12cm" },
  { id: "4", name: "Antique Brass Plate", price: 650.00, image: "https://via.placeholder.com/600?text=Brass+Plate", category: "Utensils", description: "A heavy brass dining plate with an antique finish.", weight: "600g", dimensions: "28cm diameter" },
  { id: "5", name: "Brass Kuber Kunji", price: 450.00, image: "https://via.placeholder.com/600?text=Kuber+Kunji", category: "Puja Items", description: "Symbol of wealth and prosperity.", weight: "150g", dimensions: "8cm" },
  { id: "6", name: "Bronze Nataraja Idol", price: 4500.00, image: "https://via.placeholder.com/600?text=Nataraja", category: "Decor", description: "Exquisite bronze idol of Lord Nataraja.", weight: "2.5kg", dimensions: "30cm x 22cm" },
  { id: "7", name: "Brass Spice Box (Masala Dabba)", price: 1200.00, image: "https://via.placeholder.com/600?text=Spice+Box", category: "Utensils", description: "Traditional 7-compartment brass spice box.", weight: "1.1kg", dimensions: "20cm diameter" },
  { id: "8", name: "Brass Hanging Diya", price: 950.00, image: "https://via.placeholder.com/600?text=Hanging+Diya", category: "Puja Items", description: "Elegant hanging diya with chain.", weight: "500g", dimensions: "45cm length" },
];

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = allProducts.find(p => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container" style={{ padding: 'var(--spacing-3xl) var(--spacing-md)' }}>
      <div style={{ marginBottom: 'var(--spacing-lg)' }}>
        <Link href="/shop" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>&larr; Back to Shop</Link>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-3xl)', alignItems: 'start' }}>
        {/* Product Image */}
        <div style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
        </div>

        {/* Product Info */}
        <div>
          <span style={{ color: 'var(--color-primary-dark)', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.05em', fontWeight: 600 }}>
            {product.category}
          </span>
          <h1 style={{ fontSize: '2.5rem', marginTop: 'var(--spacing-xs)', marginBottom: 'var(--spacing-md)' }}>
            {product.name}
          </h1>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--spacing-lg)' }}>
            ₹{product.price.toFixed(2)}
          </p>
          
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 'var(--spacing-xl)' }}>
            {product.description}
          </p>

          <div style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: 'var(--spacing-md) 0', marginBottom: 'var(--spacing-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Weight</span>
              <span style={{ fontWeight: 500 }}>{product.weight}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Dimensions</span>
              <span style={{ fontWeight: 500 }}>{product.dimensions}</span>
            </div>
          </div>

          <AddToCartButton product={{ id: product.id, name: product.name, price: product.price, image: product.image }} />

          <div style={{ marginTop: 'var(--spacing-xl)', display: 'flex', gap: 'var(--spacing-lg)', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
               🚚 Fast Shipping
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
               🔒 Secure Payment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
