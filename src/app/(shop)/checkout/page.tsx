"use client";

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    transactionRef: ''
  });

  useEffect(() => {
    setIsMounted(true);
    if (items.length === 0) {
      router.push('/shop');
    }
  }, [items, router]);

  const total = isMounted ? getCartTotal() : 0;
  const shipping = 50;
  const grandTotal = total + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, total: grandTotal, items })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Order Placed! Reference: ${data.orderId}. We will verify your payment and process the order.`);
        clearCart();
        router.push('/');
      } else {
        alert("Failed to place order: " + data.error);
      }
    } catch (err: any) {
      alert("Error connecting to server. Please try again.");
    }
  };

  if (!isMounted || items.length === 0) return null;

  return (
    <div className="container" style={{ padding: 'var(--spacing-3xl) var(--spacing-md)' }}>
      <h1 style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>Secure Checkout</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'var(--spacing-3xl)' }}>
        {/* Checkout Form & Payment */}
        <div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-sm)' }}>Shipping Information</h2>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
              <input required type="text" name="firstName" placeholder="First Name" className="form-input" style={{ flex: 1 }} onChange={handleChange} />
              <input required type="text" name="lastName" placeholder="Last Name" className="form-input" style={{ flex: 1 }} onChange={handleChange} />
            </div>
            <input required type="tel" name="phone" placeholder="Phone Number" className="form-input" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email Address (Optional)" className="form-input" onChange={handleChange} />
            
            <h3 style={{ fontSize: '1.2rem', marginTop: 'var(--spacing-md)' }}>Address</h3>
            <input required type="text" name="address" placeholder="Street Address" className="form-input" onChange={handleChange} />
            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
              <input required type="text" name="city" placeholder="City" className="form-input" style={{ flex: 1 }} onChange={handleChange} />
              <input required type="text" name="state" placeholder="State" className="form-input" style={{ flex: 1 }} onChange={handleChange} />
              <input required type="text" name="pincode" placeholder="Pincode" className="form-input" style={{ flex: 1 }} onChange={handleChange} />
            </div>
            
            <h2 style={{ fontSize: '1.5rem', marginTop: 'var(--spacing-xl)', marginBottom: 'var(--spacing-sm)' }}>Payment (UPI)</h2>
            <div style={{ backgroundColor: 'var(--color-bg)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--color-border)' }}>
              <p style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-text-muted)' }}>Scan the QR code below using any UPI app (GPay, PhonePe, Paytm) to pay <strong>₹{grandTotal.toFixed(2)}</strong></p>
              
              {/* Static placeholder for QR code */}
              <div style={{ width: '200px', height: '200px', backgroundColor: 'white', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--color-primary)' }}>
                <span style={{ color: 'var(--color-primary-dark)', fontWeight: 'bold' }}>UPI QR CODE</span>
              </div>
              
              <p style={{ marginTop: 'var(--spacing-md)', fontWeight: 'bold' }}>UPI ID: devimetals@ybl</p>

              <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'left' }}>
                <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 'bold' }}>Transaction Reference ID / UTR</label>
                <input required type="text" name="transactionRef" placeholder="Enter 12-digit UTR number" className="form-input" onChange={handleChange} />
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>After successful payment, enter the reference number here to verify your order.</p>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: 'var(--spacing-lg)', width: '100%', fontSize: '1.1rem', padding: 'var(--spacing-md)' }}>
              Place Order (₹{grandTotal.toFixed(2)})
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div style={{ backgroundColor: 'var(--color-bg)', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', height: 'fit-content', position: 'sticky', top: '100px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-lg)' }}>Order Summary</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                  <img src={item.image} alt={item.name} style={{ borderRadius: 'var(--radius-sm)', width: '50px', height: '50px', objectFit: 'cover' }} />
                  <div>
                    <p style={{ fontWeight: 500 }}>{item.name}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Qty: {item.quantity}</p>
                  </div>
                </div>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>Shipping</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--spacing-md)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)', fontWeight: 700, fontSize: '1.25rem' }}>
            <span>Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
