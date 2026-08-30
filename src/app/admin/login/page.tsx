"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      
      if (res.ok) {
        window.location.href = '/admin/orders';
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid PIN');
      }
    } catch(e) {
      setError('Connection error');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
      <form onSubmit={handleLogin} style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-3xl)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', textAlign: 'center', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ marginBottom: 'var(--spacing-lg)' }}>Admin Access</h1>
        {error && <p style={{ color: 'red', marginBottom: 'var(--spacing-md)' }}>{error}</p>}
        <input 
          type="password" 
          placeholder="Enter PIN (1234)" 
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="form-input" 
          style={{ marginBottom: 'var(--spacing-md)', textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.25em' }} 
        />
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 'var(--spacing-md)' }}>Login</button>
      </form>
    </div>
  );
}
