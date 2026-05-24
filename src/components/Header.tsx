"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Search, User, ChevronLeft } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import CartDrawer from "./CartDrawer";
import { PRODUCTS, Product } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const setCartOpen = useCartStore((state) => state.setCartOpen);
  const user = useUserStore((state) => state.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Handle live search
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();
      const filtered = PRODUCTS.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.englishName.toLowerCase().includes(query) ||
          product.categoryHebrew.toLowerCase().includes(query)
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const navLinks = [
    { name: "טבעות", href: "/category/rings" },
    { name: "שרשראות", href: "/category/necklaces" },
    { name: "עגילים", href: "/category/earrings" },
    { name: "צמידים", href: "/category/bracelets" },
    { name: "ניהול מערכת", href: "/admin", isSpecial: true },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${
          isScrolled || isMobileMenuOpen || isSearchOpen
            ? "bg-white border-[#F1F1F1] py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          
          {/* Right: Brand Logo */}
          <div className="flex items-center">
            <Link href="/" className="group flex flex-col items-start select-none">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#111111] group-hover:text-[#D4AF37] transition-colors duration-300">
                תכשיטי אלה
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#111111]/60 uppercase font-light -mt-0.5">
                ELLA JEWELRY
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-reverse space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-widest hover:text-[#D4AF37] transition-all duration-300 relative py-2 font-medium ${
                  link.isSpecial
                    ? "border border-[#D4AF37] px-3.5 py-1 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#111111]"
                    : "text-[#111111]/80 hover:opacity-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Left: Utilities */}
          <div className="flex items-center space-x-reverse space-x-4 sm:space-x-6">
            
            {/* Live Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 hover:text-[#D4AF37] transition-colors duration-300"
              aria-label="חיפוש באתר"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* User Profile Button */}
            <Link
              href="/profile"
              className="p-1.5 hover:text-[#D4AF37] transition-colors duration-300 relative flex items-center"
              aria-label="אזור אישי"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
              {user && (
                <span className="absolute top-1.5 left-1.5 bg-[#D4AF37] w-1.5 h-1.5 rounded-full animate-pulse" />
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="p-1.5 hover:text-[#D4AF37] transition-colors duration-300 relative flex items-center"
              aria-label="עגלת קניות"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -left-1 bg-[#D4AF37] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-sans">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger menu (Morphing SVG) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none z-50 relative group"
              aria-label="תפריט ניווט"
            >
              <div className="flex flex-col gap-1.5 w-5">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-[1.5px] bg-[#111111] group-hover:bg-[#D4AF37] origin-center"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-[1.5px] bg-[#111111] group-hover:bg-[#D4AF37]"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-[1.5px] bg-[#111111] group-hover:bg-[#D4AF37] origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer sliding in */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setCartOpen(false)} />

      {/* Full screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-white pt-28 px-8 pb-10 flex flex-col justify-between md:hidden"
          >
            <motion.div 
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
              className="flex flex-col space-y-6 mt-6"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  variants={{
                    closed: { opacity: 0, y: 15 },
                    open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-serif text-xl border-b border-[#F1F1F1] pb-4 flex justify-between items-center ${
                      link.isSpecial ? "text-[#D4AF37] font-semibold" : "text-[#111111]"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronLeft className="w-4 h-4 text-neutral-400" />
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Account link */}
              <motion.div
                variants={{
                  closed: { opacity: 0, y: 15 },
                  open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-xl border-b border-[#F1F1F1] pb-4 flex justify-between items-center text-[#111111]/80"
                >
                  <span>{user ? `החשבון שלי (${user.name})` : "התחברות לאזור האישי"}</span>
                  <User className="w-4 h-4 text-neutral-400" />
                </Link>
              </motion.div>
            </motion.div>

            <div className="text-center text-[10px] text-neutral-400 uppercase tracking-widest font-light">
              תכשיטי אלה - Minimalist Tech Luxury
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md pt-24 px-6 md:px-12 text-[#111111]"
          >
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between items-center border-b border-[#111111]/10 pb-4">
                <div className="flex items-center gap-3 flex-1">
                  <Search className="w-6 h-6 text-neutral-400 stroke-[1.5]" />
                  <input
                    type="text"
                    placeholder="חפשי טבעות, שרשראות, קולקציות..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-xl font-serif font-light placeholder-neutral-300"
                  />
                </div>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="p-2 hover:bg-[#F1F1F1] transition-colors rounded-full"
                  aria-label="סגור חיפוש"
                >
                  <X className="w-6 h-6 stroke-[1.5]" />
                </button>
              </div>

              {/* Live search results */}
              <div className="mt-8 overflow-y-auto max-h-[60vh] no-scrollbar">
                {searchQuery.trim().length <= 1 ? (
                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                      חיפושים נפוצים
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["טבעת סוליטר", "פנינים", "עגילי חישוק", "צמיד טניס"].map((term) => (
                        <button
                          key={term}
                          onClick={() => setSearchQuery(term)}
                          className="px-4 py-1.5 bg-[#F1F1F1] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all text-xs font-light text-[#111111]"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="text-center py-12 text-neutral-400 font-light">
                    לא נמצאו תכשיטים עבור "{searchQuery}"
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium">
                      תוצאות חיפוש ({searchResults.length})
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex gap-4 p-3 hover:bg-[#F1F1F1]/50 border border-[#F1F1F1] transition-colors group"
                        >
                          <div className="relative w-16 h-20 bg-[#F1F1F1] overflow-hidden flex-shrink-0">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h4 className="font-serif text-sm font-medium group-hover:text-[#D4AF37] transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-[11px] text-neutral-400 font-light mt-0.5">
                              {product.englishName}
                            </p>
                            <p className="text-xs font-semibold mt-1">
                              {new Intl.NumberFormat("he-IL", {
                                style: "currency",
                                currency: "ILS",
                                maximumFractionDigits: 0,
                              }).format(product.salePrice ?? product.price)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
