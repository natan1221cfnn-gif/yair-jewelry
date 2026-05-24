import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, ProductVariation } from "../data/products";

export interface CartItem {
  id: string; // Unique configuration ID (productId-size-variationId-karat-carat-clarity)
  product: Product;
  selectedSize: string;
  selectedVariation: ProductVariation;
  quantity: number;
  customPrice?: number;
  customizations?: {
    goldKarat: string;
    diamondCarat?: string;
    diamondClarity?: string;
  };
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
  addToCart: (
    product: Product,
    size: string,
    variation: ProductVariation,
    quantity?: number,
    customPrice?: number,
    customizations?: {
      goldKarat: string;
      diamondCarat?: string;
      diamondClarity?: string;
    }
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

      addToCart: (product, size, variation, quantity = 1, customPrice, customizations) => {
        const karatKey = customizations?.goldKarat || "";
        const caratKey = customizations?.diamondCarat || "";
        const clarityKey = customizations?.diamondClarity || "";
        const cartItemId = `${product.id}-${size}-${variation.id}-${karatKey}-${caratKey}-${clarityKey}`;
        
        const existingItems = get().items;
        const existingItemIndex = existingItems.findIndex((item) => item.id === cartItemId);

        if (existingItemIndex > -1) {
          // Increment quantity
          const updatedItems = [...existingItems];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems, isCartOpen: true });
        } else {
          // Add new item with optional customizations
          const newItem: CartItem = {
            id: cartItemId,
            product,
            selectedSize: size,
            selectedVariation: variation,
            quantity,
            customPrice,
            customizations,
          };
          set({ items: [...existingItems, newItem], isCartOpen: true });
        }
      },

      removeFromCart: (cartItemId) => {
        set({
          items: get().items.filter((item) => item.id !== cartItemId),
        });
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === cartItemId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.customPrice ?? (item.product.salePrice ?? item.product.price);
          return total + price * item.quantity;
        }, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "yair-jewelry-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
