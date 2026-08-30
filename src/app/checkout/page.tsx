export default function CheckoutPage() {
  return (
    <div className="container" style={{ padding: 'var(--spacing-3xl) var(--spacing-md)' }}>
      <h1 style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>Secure Checkout</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'var(--spacing-3xl)' }}>
        {/* Checkout Form */}
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-md)' }}>Shipping Information</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
              <input type="text" placeholder="First Name" className="form-input" style={{ flex: 1 }} />
              <input type="text" placeholder="Last Name" className="form-input" style={{ flex: 1 }} />
            </div>
            <input type="text" placeholder="Phone Number" className="form-input" />
            <input type="text" placeholder="Email Address" className="form-input" />
            
            <h3 style={{ fontSize: '1.2rem', marginTop: 'var(--spacing-md)' }}>Address</h3>
            <input type="text" placeholder="Street Address" className="form-input" />
            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
              <input type="text" placeholder="City" className="form-input" style={{ flex: 1 }} />
              <input type="text" placeholder="State" className="form-input" style={{ flex: 1 }} />
              <input type="text" placeholder="Pincode" className="form-input" style={{ flex: 1 }} />
            </div>
            
            <button type="button" className="btn btn-primary" style={{ marginTop: 'var(--spacing-lg)' }}>
              Proceed to Payment
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div style={{ backgroundColor: 'var(--color-bg)', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-lg)' }}>Order Summary</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                <img src="https://via.placeholder.com/50?text=Diya" alt="Item" style={{ borderRadius: 'var(--radius-sm)' }} />
                <span>Traditional Brass Diya (x1)</span>
              </div>
              <span>₹850.00</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
            <span>₹850.00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>Shipping</span>
            <span>₹50.00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--spacing-md)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)', fontWeight: 700, fontSize: '1.25rem' }}>
            <span>Total</span>
            <span>₹900.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
