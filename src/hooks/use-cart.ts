"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItemData {
  id: string; // cart_item id (or temp id for optimistic)
  product_id: string;
  variant_id: string | null;
  quantity: number;
  product_name: string;
  variant_name: string;
  price: number; // unit price in cents (base_price + price_offset)
  image_url: string | null;
  slug: string;
  stock_quantity: number;
}

interface CartState {
  items: CartItemData[];
  isOpen: boolean;
  isLoading: boolean;

  // Actions
  setItems: (items: CartItemData[]) => void;
  addItem: (item: CartItemData) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setLoading: (loading: boolean) => void;

  // Computed
  totalItems: () => number;
  subtotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isLoading: false,

      setItems: (items) => set({ items }),

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.product_id === item.product_id &&
              i.variant_id === item.variant_id
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product_id === item.product_id &&
                i.variant_id === item.variant_id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { items: [...state.items, item] };
        }),

      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        })),

      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== itemId)
              : state.items.map((i) =>
                  i.id === itemId ? { ...i, quantity } : i
                ),
        })),

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setLoading: (loading) => set({ isLoading: loading }),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      subtotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "velora-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
