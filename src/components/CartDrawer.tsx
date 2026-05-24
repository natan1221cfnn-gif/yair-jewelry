"use client";

import { useCartStore } from "@/store/useCartStore";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCartStore();

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black cursor-pointer"
          />

          {/* Drawer (Slides in from Left in RTL layout) */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 left-0 z-50 w-full sm:w-[460px] bg-white shadow-2xl flex flex-col h-full border-r border-[#F1F1F1] text-[#111111]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#F1F1F1] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                <span className="font-serif text-lg font-medium tracking-wide">
                  סל הקניות שלך ({getTotalItems()})
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-[#F1F1F1] transition-colors rounded-full"
                aria-label="סגור סל קניות"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#F1F1F1] flex items-center justify-center text-neutral-400">
                    <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-medium">סל הקניות ריק</h3>
                    <p className="text-sm text-neutral-500 font-light">
                      התכשיטים הייחודיים שלנו מחכים לך בקטלוג.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-4 px-6 py-2.5 border border-[#111111] text-xs uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all duration-300"
                  >
                    להמשך קניות
                  </button>
                </div>
              ) : (
                items.map((item) => {
                  const itemPrice = item.customPrice ?? (item.product.salePrice ?? item.product.price);
                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 pb-6 border-b border-[#F1F1F1] last:border-0 last:pb-0"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-24 bg-[#F1F1F1] overflow-hidden flex-shrink-0 border border-[#F1F1F1]">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif text-sm font-medium hover:text-[#D4AF37] transition-colors line-clamp-1">
                              <Link href={`/product/${item.product.id}`} onClick={onClose}>
                                {item.product.name}
                              </Link>
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                              aria-label="הסר פריט"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-[11px] text-neutral-400 font-light">
                            {item.product.englishName}
                          </p>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-500 font-light">
                            <span>מידה: {item.selectedSize}</span>
                            <span>|</span>
                            <span>{item.selectedVariation.name}</span>
                          </div>
                          {item.customizations && (
                            <div className="text-[10px] text-[#D4AF37] font-semibold mt-1.5 flex flex-wrap gap-1 font-sans">
                              <span>זהב {item.customizations.goldKarat}</span>
                              {item.customizations.diamondCarat && (
                                <>
                                  <span>|</span>
                                  <span>{item.customizations.diamondCarat}</span>
                                </>
                              )}
                              {item.customizations.diamondClarity && (
                                <>
                                  <span>|</span>
                                  <span>{item.customizations.diamondClarity}</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-[#111111]/10 rounded-none bg-white">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-neutral-500 hover:text-black transition-colors"
                              aria-label="הפחת כמות"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-neutral-500 hover:text-black transition-colors"
                              aria-label="הוסף כמות"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            {item.product.salePrice && !item.customPrice && (
                              <span className="text-[10px] text-neutral-400 line-through mr-1 block">
                                {formattedPrice(item.product.price * item.quantity)}
                              </span>
                            )}
                            <span className="text-xs font-semibold tracking-wide">
                              {formattedPrice(itemPrice * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#F1F1F1] bg-[#FFFFFF] space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-neutral-500 font-light">
                    <span>משלוח</span>
                    <span className="text-black font-normal">חינם (שליח VIP עד הבית)</span>
                  </div>
                  <div className="flex justify-between text-sm font-serif font-medium">
                    <span>סה״כ לתשלום</span>
                    <span className="text-base font-semibold text-[#111111]">
                      {formattedPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/checkout" onClick={onClose}>
                    <button className="w-full bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#111111] py-3 text-xs uppercase tracking-widest font-medium transition-all duration-500 flex items-center justify-center gap-2 group">
                      <span>מעבר לתשלום מאובטח</span>
                      <span className="text-xs tracking-normal">|</span>
                      <span className="font-serif">One-Page Checkout</span>
                    </button>
                  </Link>
                  <button
                    onClick={onClose}
                    className="w-full text-center text-[11px] text-neutral-400 hover:text-[#111111] transition-colors py-2.5 mt-1 font-light"
                  >
                    המשך קניות באתר
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
