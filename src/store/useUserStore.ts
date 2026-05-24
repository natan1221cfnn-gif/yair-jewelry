import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OrderItem {
  productId: string;
  name: string;
  englishName: string;
  image: string;
  size: string;
  variationName: string;
  quantity: number;
  price: number;
  customizations?: {
    goldKarat: string;
    diamondCarat?: string;
    diamondClarity?: string;
  };
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: "בסטודיו" | "בקרת איכות" | "אריזה" | "שליח VIP בדרך" | "נמסר";
  shippingDetails: {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    address: string;
  };
  giftWrapping?: {
    packaging: string;
    greeting?: string;
  };
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
}

interface UserState {
  user: UserProfile | null;
  orders: Order[];
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addOrder: (order: Order) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      orders: [
        // A couple of mock historical orders for logged-in user to show dashboard in action instantly
        {
          id: "YJ-772910",
          date: "2026-05-10",
          status: "נמסר",
          total: 8200,
          items: [
            {
              productId: "p1",
              name: "טבעת סוליטר קלאסית",
              englishName: "Classic Solitaire Ring",
              image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
              size: "54",
              variationName: "זהב צהוב",
              quantity: 1,
              price: 8200,
              customizations: {
                goldKarat: "18K",
                diamondCarat: "0.5ct",
                diamondClarity: "VS1"
              }
            }
          ],
          shippingDetails: {
            firstName: "ישראל",
            lastName: "ישראלי",
            phone: "054-1234567",
            city: "תל אביב",
            address: "רוטשילד 46"
          }
        }
      ],

      login: (email, name = "אורח VIP") => {
        set((state) => ({
          user: {
            email,
            name: state.user?.name && state.user.name !== "אורח VIP" ? state.user.name : name,
            phone: state.user?.phone || "",
            address: state.user?.address || "",
            city: state.user?.city || "",
          },
        }));
      },

      logout: () => {
        set({ user: null });
      },

      updateProfile: (profile) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...profile } : null,
        }));
      },

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },
    }),
    {
      name: "yair-jewelry-user",
      partialize: (state) => ({ user: state.user, orders: state.orders }),
    }
  )
);
