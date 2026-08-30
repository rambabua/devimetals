"use client";

import { useEffect, useState } from 'react';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      } else {
        setError(data.error || 'Failed to load orders');
      }
    } catch (e) {
      setError('Connection error while loading orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
      } else {
        alert('Failed to update status on server');
      }
    } catch (e) {
      alert('Network error updating status');
    }
  };

  if (loading) return <div style={{ padding: 'var(--spacing-xl)' }}>Loading orders...</div>;
  if (error) return <div style={{ padding: 'var(--spacing-xl)', color: 'red' }}>{error}</div>;

  return (
    <div>
      <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>Manage Orders</h1>
      
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)', textAlign: 'left', backgroundColor: 'var(--color-bg)' }}>
              <th style={{ padding: 'var(--spacing-md)' }}>Order ID</th>
              <th style={{ padding: 'var(--spacing-md)' }}>Date</th>
              <th style={{ padding: 'var(--spacing-md)' }}>Customer</th>
              <th style={{ padding: 'var(--spacing-md)' }}>Total (₹)</th>
              <th style={{ padding: 'var(--spacing-md)' }}>UPI Ref</th>
              <th style={{ padding: 'var(--spacing-md)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: 'var(--spacing-md)', fontSize: '0.875rem' }}>{order.id}</td>
                <td style={{ padding: 'var(--spacing-md)' }}>{new Date(order.created_at).toLocaleDateString()}</td>
                <td style={{ padding: 'var(--spacing-md)' }}>
                  {order.customer_name}<br/>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{order.customer_phone}</span>
                </td>
                <td style={{ padding: 'var(--spacing-md)' }}>{order.total_amount.toFixed(2)}</td>
                <td style={{ padding: 'var(--spacing-md)', fontFamily: 'monospace' }}>{order.transaction_ref}</td>
                <td style={{ padding: 'var(--spacing-md)' }}>
                  <select 
                    value={order.status} 
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    style={{ 
                      padding: 'var(--spacing-xs)', 
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: order.status === 'PENDING' ? '#FEF3C7' : order.status === 'PAYMENT_VERIFIED' ? '#D1FAE5' : '#E0E7FF'
                    }}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="PAYMENT_VERIFIED">Payment Verified</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
