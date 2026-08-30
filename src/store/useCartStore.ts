import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (item, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find(i => i.id === item.id);
        
        if (existingItem) {
          set({
            items: items.map(i => 
              i.id === item.id 
                ? { ...i, quantity: i.quantity + quantity } 
                : i
            )
          });
        } else {
          set({ items: [...items, { ...item, quantity }] });
        }
      },
      removeFromCart: (id) => {
        set({ items: get().items.filter(i => i.id !== id) });
      },
      updateQuantity: (id, quantity) => {
        set({
          items: get().items.map(i => 
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          )
        });
      },
      clearCart: () => set({ items: [] }),
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'devimetals-cart',
    }
  )
);
