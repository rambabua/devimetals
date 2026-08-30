import Link from 'next/link';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Admin Sidebar */}
      <aside style={{ width: '250px', backgroundColor: 'var(--color-surface)', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-border)' }}>
          <h2 style={{ color: 'var(--color-primary-dark)', fontSize: '1.5rem', margin: 0 }}>Devi Admin</h2>
        </div>
        <nav style={{ padding: 'var(--spacing-md)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', flex: 1 }}>
          <Link href="/admin/orders" style={{ padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg)', fontWeight: 'bold' }}>Orders</Link>
          <Link href="/admin/products" style={{ padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-sm)' }}>Products</Link>
        </nav>
        <div style={{ padding: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)' }}>
          <Link href="/" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>&larr; Back to Shop</Link>
        </div>
      </aside>
      
      {/* Admin Main Content */}
      <main style={{ flex: 1, padding: 'var(--spacing-xl)', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
