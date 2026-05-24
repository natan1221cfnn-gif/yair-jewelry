"use client";

import { useState, useRef } from "react";
import { Star, ChevronDown, ChevronUp, ShoppingBag, Ruler, Check, Send, Camera, Upload, RotateCw, Maximize2, X, Sparkles } from "lucide-react";
import { Product, ProductVariation, Review } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import SizeGuideModal from "@/components/SizeGuideModal";
import { motion, AnimatePresence } from "framer-motion";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation>(product.variations[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  // Customization configurator states
  const [goldKarat, setGoldKarat] = useState<"14K" | "18K">("14K");
  const [diamondCarat, setDiamondCarat] = useState<"0.5ct" | "1.0ct" | "1.5ct">("0.5ct");
  const [diamondClarity, setDiamondClarity] = useState<"VS1" | "VVS2" | "IF">("VS1");
  
  // Try-on simulator controls
  const [tryOnScale, setTryOnScale] = useState(0.8);
  const [tryOnRotate, setTryOnRotate] = useState(0);
  const [tryOnBackground, setTryOnBackground] = useState<string | null>(null);
  
  // Accordion tabs state
  const [openAccordion, setOpenAccordion] = useState<string | null>("details");

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(product.reviews);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewContent, setNewReviewContent] = useState("");
  const [newReviewImage, setNewReviewImage] = useState<string | null>(null);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);

  // Check if product features diamonds/gemstones to display diamond configurator
  const hasDiamonds = 
    product.name.includes("יהלום") || 
    product.description.includes("יהלום") || 
    product.name.includes("סוליטר") || 
    product.name.includes("טניס") ||
    product.category === "rings" ||
    product.category === "bracelets";

  // Dynamic price calculation based on customized items
  const calculateCustomPrice = () => {
    let price = product.salePrice ?? product.price;

    // Karat Surcharge
    if (goldKarat === "18K") {
      price += 1500;
    }

    if (hasDiamonds) {
      // Carat size Surcharge
      if (diamondCarat === "1.0ct") {
        price += 4500;
      } else if (diamondCarat === "1.5ct") {
        price += 9500;
      }

      // Clarity Surcharge
      if (diamondClarity === "VVS2") {
        price += 1200;
      } else if (diamondClarity === "IF") {
        price += 3000;
      }
    }

    return price;
  };

  const customPrice = calculateCustomPrice();
  const baseActivePrice = product.salePrice ?? product.price;
  const isSale = !!product.salePrice;

  // Sizing backdrops mapping
  const tryOnBackdrops: Record<string, string> = {
    rings: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop",
    necklaces: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
    earrings: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
    bracelets: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=600&auto=format&fit=crop",
  };

  const currentBackdrop = tryOnBackground || tryOnBackdrops[product.category] || "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTryOnBackground(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewContent.trim()) return;

    const newReview: Review = {
      id: `r-new-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: new Date().toISOString().split("T")[0],
      content: newReviewContent,
      image: newReviewImage || undefined,
    };

    setReviews([newReview, ...reviews]);
    setNewReviewAuthor("");
    setNewReviewRating(5);
    setNewReviewContent("");
    setNewReviewImage(null);
    setIsReviewFormOpen(false);
  };

  const handleMockImageUpload = () => {
    const reviewMocks = [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=150&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=150&auto=format&fit=crop"
    ];
    const randomImg = reviewMocks[Math.floor(Math.random() * reviewMocks.length)];
    setNewReviewImage(randomImg);
  };

  const toggleAccordion = (tab: string) => {
    setOpenAccordion(openAccordion === tab ? null : tab);
  };

  const handleAddToCartClick = () => {
    // Pack customizations metadata
    const customizations = {
      goldKarat: goldKarat,
      diamondCarat: hasDiamonds ? diamondCarat : undefined,
      diamondClarity: hasDiamonds ? diamondClarity : undefined,
    };
    
    addToCart(product, selectedSize, selectedVariation, quantity, customPrice, customizations);
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20 text-[#111111] select-none font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="py-4 text-xs font-light text-neutral-400 space-x-reverse space-x-2 border-b border-[#F1F1F1]">
          <a href="/" className="hover:text-[#D4AF37] transition-colors">בית</a>
          <span>/</span>
          <a href={`/#${product.category}`} className="hover:text-[#D4AF37] transition-colors">
            {product.categoryHebrew}
          </a>
          <span>/</span>
          <span className="text-[#111111] font-normal">{product.name}</span>
        </div>

        {/* Product Page Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-8">
          
          {/* LEFT: Scrollable Images Gallery (Desktop) / Carousel (Mobile) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Desktop Large Image Stack & Picker */}
            <div className="hidden sm:flex gap-4">
              
              {/* Vertical Pickers */}
              <div className="flex flex-col gap-3 w-16">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`aspect-[4/5] w-full border overflow-hidden transition-all duration-300 ${
                      activeImageIndex === index
                        ? "border-[#D4AF37] scale-102"
                        : "border-[#F1F1F1] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Full-Size Display */}
              <div className="flex-1 bg-[#F9F9F9] border border-[#F1F1F1] aspect-[4/5] overflow-hidden relative group">
                <img
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            {/* Mobile swipeable carousel */}
            <div className="sm:hidden relative w-full aspect-[4/5] bg-[#F9F9F9] overflow-hidden border border-[#F1F1F1]">
              <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
                   onScroll={(e) => {
                     const scrollLeft = e.currentTarget.scrollLeft;
                     const width = e.currentTarget.offsetWidth;
                     const index = Math.round(Math.abs(scrollLeft) / width);
                     setActiveImageIndex(index);
                   }}
              >
                {product.images.map((img, index) => (
                  <div key={index} className="w-full h-full flex-shrink-0 snap-start">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              
              {/* Pagination Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
                {product.images.map((_, index) => (
                  <span
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      activeImageIndex === index ? "bg-[#D4AF37] w-3" : "bg-neutral-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Sticky Details Panel */}
          <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-24 self-start space-y-6">
            
            {/* Title & Metadata */}
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-wide">
                  {product.name}
                </h1>
              </div>
              <p className="text-xs tracking-wider text-neutral-400 uppercase font-light">
                {product.englishName}
              </p>
              
              {/* Ratings */}
              <div className="flex items-center gap-1.5 pt-1">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= Math.round(product.rating)
                          ? "fill-[#D4AF37] stroke-none"
                          : "text-neutral-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold">{product.rating}</span>
                <span className="text-xs text-neutral-400 font-light">({reviews.length} חוות דעת של לקוחות)</span>
              </div>
            </div>

            {/* Pricing Section (Dynamic Custom Price Updates) */}
            <div className="py-4 border-y border-[#F1F1F1] flex items-baseline gap-4">
              <motion.span 
                key={customPrice}
                initial={{ opacity: 0.7, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold tracking-wide text-[#111111]"
              >
                {formattedPrice(customPrice)}
              </motion.span>
              
              {/* If customized parameters selected, show details */}
              {(goldKarat !== "14K" || (hasDiamonds && (diamondCarat !== "0.5ct" || diamondClarity !== "VS1"))) && (
                <span className="text-[10px] uppercase font-bold text-[#D4AF37] border border-[#D4AF37]/35 px-2 py-0.5 animate-fade-in flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>קונפיגורציה אישית</span>
                </span>
              )}

              {isSale && customPrice === baseActivePrice && (
                <>
                  <span className="text-sm text-neutral-400 line-through">
                    {formattedPrice(product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm font-light text-neutral-600 leading-relaxed font-sans">
              {product.description}
            </p>

            {/* Variations Selector */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#111111] flex justify-between">
                <span>גוון זהב:</span>
                <span className="font-light text-neutral-500">{selectedVariation.name}</span>
              </label>
              <div className="flex gap-3">
                {product.variations.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariation(v)}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 relative ${
                      selectedVariation.id === v.id
                        ? "border-[#D4AF37] scale-110"
                        : "border-neutral-200 hover:border-neutral-400"
                    }`}
                    style={{ backgroundColor: v.hex }}
                    title={v.name}
                    aria-label={v.name}
                  >
                    {selectedVariation.id === v.id && (
                      <Check className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 🌟 LAUNCH UPGRADE: DYNAMIC JEWELRY CONFIGURATOR PANEL */}
            <div className="border border-[#F1F1F1] p-4 bg-[#F9F9F9] space-y-4">
              <div className="text-[10px] tracking-wider font-semibold text-neutral-400 uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>התאמה אישית של חומרי הגלם</span>
              </div>

              {/* 1. Karat Gold selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-700 block">טוהר זהב מועדף:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "14K", label: "זהב 14K", surcharge: "בסיס" },
                    { id: "18K", label: "זהב 18K", surcharge: "+ 1,500 ₪" }
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setGoldKarat(opt.id as any)}
                      className={`py-2 px-3 border text-center transition-all ${
                        goldKarat === opt.id
                          ? "border-[#D4AF37] bg-white font-bold text-black"
                          : "border-transparent bg-white/60 hover:border-neutral-200 text-neutral-500"
                      }`}
                    >
                      <span className="text-xs block">{opt.label}</span>
                      <span className="text-[9px] text-[#D4AF37] block mt-0.5">{opt.surcharge}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Diamonds selectors (only visible if has diamonds) */}
              {hasDiamonds && (
                <>
                  {/* Diamond Carat weight */}
                  <div className="space-y-2 pt-1 border-t border-neutral-200/50">
                    <label className="text-xs font-bold text-neutral-700 block">משקל יהלום (קראט):</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "0.5ct", label: "0.5ct", surcharge: "בסיס" },
                        { id: "1.0ct", label: "1.0ct", surcharge: "+ 4,500 ₪" },
                        { id: "1.5ct", label: "1.5ct", surcharge: "+ 9,500 ₪" }
                      ].map((opt) => (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => setDiamondCarat(opt.id as any)}
                          className={`py-2 px-1 border text-center transition-all ${
                            diamondCarat === opt.id
                              ? "border-[#D4AF37] bg-white font-bold text-black"
                              : "border-transparent bg-white/60 hover:border-neutral-200 text-neutral-500"
                          }`}
                        >
                          <span className="text-xs block">{opt.label}</span>
                          <span className="text-[9px] text-[#D4AF37] block mt-0.5">{opt.surcharge}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Diamond Clarity */}
                  <div className="space-y-2 pt-1 border-t border-neutral-200/50">
                    <label className="text-xs font-bold text-neutral-700 block">רמת ניקיון יהלום (Clarity):</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "VS1", label: "VS1", surcharge: "גבוהה" },
                        { id: "VVS2", label: "VVS2", surcharge: "+ 1,200 ₪" },
                        { id: "IF", label: "IF", surcharge: "+ 3,000 ₪" }
                      ].map((opt) => (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => setDiamondClarity(opt.id as any)}
                          className={`py-2 px-1 border text-center transition-all ${
                            diamondClarity === opt.id
                              ? "border-[#D4AF37] bg-white font-bold text-black"
                              : "border-transparent bg-white/60 hover:border-neutral-200 text-neutral-500"
                          }`}
                        >
                          <span className="text-xs block">{opt.label}</span>
                          <span className="text-[9px] text-[#D4AF37] block mt-0.5">{opt.surcharge}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Size Selector */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[#111111]">
                <span>בחירת מידה:</span>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsTryOnOpen(true)}
                    className="flex items-center gap-1 text-[#D4AF37] hover:text-[#b8972e] transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span className="font-light">הדמיית ענידה (Try-On)</span>
                  </button>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-[#D4AF37] hover:text-[#b8972e] transition-colors"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span className="font-light">מדריך מידות</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-xs border font-medium transition-all duration-300 ${
                      selectedSize === size
                        ? "border-[#111111] bg-[#111111] text-white"
                        : "border-[#F1F1F1] text-neutral-600 hover:border-neutral-400 bg-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Add to Cart & Quantity */}
            <div className="flex gap-4 pt-4">
              <div className="flex items-center border border-[#111111]/10 rounded-none bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-3.5 text-neutral-500 hover:text-black transition-colors"
                  aria-label="הפחת כמות"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-medium font-sans">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-3.5 text-neutral-500 hover:text-black transition-colors"
                  aria-label="הוסף כמות"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCartClick}
                className="flex-1 bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#111111] py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-2.5 rounded-none shadow-lg shadow-black/5"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2]" />
                <span>הוספה לסל הקניות</span>
              </button>
            </div>

            {/* Accordion Tabs */}
            <div className="pt-6 border-t border-[#F1F1F1] space-y-2">
              
              {/* Tab 1 */}
              <div className="border-b border-[#F1F1F1]">
                <button
                  onClick={() => toggleAccordion("details")}
                  className="w-full py-3 flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[#111111]"
                >
                  <span>תיאור ופרטי התכשיט</span>
                  {openAccordion === "details" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                <AnimatePresence initial={false}>
                  {openAccordion === "details" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-xs font-light text-neutral-500 leading-relaxed font-sans">
                        {product.detailedDescription}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tab 2 */}
              <div className="border-b border-[#F1F1F1]">
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full py-3 flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[#111111]"
                >
                  <span>משלוח, אריזה והחזרות</span>
                  {openAccordion === "shipping" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                <AnimatePresence initial={false}>
                  {openAccordion === "shipping" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4 text-xs font-light text-neutral-500 space-y-2 leading-relaxed font-sans">
                        <p>🚚 <strong>משלוח מבוטח חינם:</strong> כל ההזמנות נשלחות עם שליח VIP מבוטח עד הבית (3-5 ימי עסקים).</p>
                        <p>🎁 <strong>אריזת מתנה:</strong> כל פריט מגיע באריזת קטיפה קשיחה יוקרתית, שקית מותג ותעודת מקוריות חתומה.</p>
                        <p>🔄 <strong>החזרות והחלפות:</strong> החלפה או החזרה תוך 14 יום באריזה המקורית שלא נעשה בה שימוש (בכפוף לתקנון).</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

        {/* MOBILE STICKY CTA FOOTER BAR */}
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#F1F1F1] p-4 flex gap-3 items-center md:hidden luxury-glass">
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-[10px] text-neutral-400 font-light">{product.name}</span>
            <span className="text-sm font-bold">{formattedPrice(customPrice)}</span>
          </div>
          <button
            onClick={handleAddToCartClick}
            className="flex-[2] bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#111111] py-3.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-none"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>הוספה לסל</span>
          </button>
        </div>

        {/* REVIEWS SECTION */}
        <div className="mt-24 pt-12 border-t border-[#F1F1F1]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="font-serif text-2xl font-bold">חוות דעת של לקוחות קודמים</h2>
              <p className="text-xs text-neutral-400 font-light mt-0.5">
                מה קונות מספרות על {product.name}
              </p>
            </div>
            
            <button
              onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
              className="px-6 py-2 border border-[#111111] hover:bg-[#111111] hover:text-white transition-all text-xs font-semibold tracking-wider uppercase rounded-none"
            >
              {isReviewFormOpen ? "ביטול כתיבה" : "כתבי חוות דעת"}
            </button>
          </div>

          {/* Form write */}
          <AnimatePresence>
            {isReviewFormOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-10 max-w-xl border border-[#F1F1F1] bg-[#F9F9F9] p-6 text-sm"
              >
                <form onSubmit={handleAddReview} className="space-y-4">
                  <h4 className="font-serif font-semibold text-[#111111]">פרסמי חוות דעת חדשה</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-500">שם מלא:</label>
                      <input
                        type="text"
                        required
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        placeholder="ישראל ישראלי"
                        className="w-full bg-white border border-[#F1F1F1] focus:outline-none focus:border-[#D4AF37] px-3 py-2 text-xs"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-500">דירוג (1-5 כוכבים):</label>
                      <div className="flex gap-2 items-center h-8">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewReviewRating(star)}
                            className="p-0.5 hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                star <= newReviewRating
                                  ? "fill-[#D4AF37] stroke-none"
                                  : "text-neutral-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-500">חוות דעתך:</label>
                    <textarea
                      required
                      rows={3}
                      value={newReviewContent}
                      onChange={(e) => setNewReviewContent(e.target.value)}
                      placeholder="שתפי אותנו בחווית הקנייה וענידת התכשיט..."
                      className="w-full bg-white border border-[#F1F1F1] focus:outline-none focus:border-[#D4AF37] px-3.5 py-2 text-xs"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleMockImageUpload}
                        className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black transition-colors"
                      >
                        <Camera className="w-4 h-4 text-[#D4AF37]" />
                        <span>צרפי תמונה לחוות הדעת</span>
                      </button>
                      
                      {newReviewImage && (
                        <div className="relative w-8 h-10 border border-[#F1F1F1] overflow-hidden">
                          <img src={newReviewImage} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="bg-[#111111] text-white hover:bg-[#D4AF37] hover:text-[#111111] px-5 py-2.5 text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 rounded-none"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>שליחה לפרסום</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* List reviews */}
          <div className="space-y-6 max-w-3xl">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="pb-6 border-b border-[#F1F1F1] last:border-0 flex gap-4 text-sm"
              >
                <div className="w-12 h-15 bg-[#F9F9F9] flex-shrink-0 overflow-hidden relative border border-[#F1F1F1]">
                  {rev.image ? (
                    <img src={rev.image} alt={rev.author} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-serif font-bold text-neutral-400 bg-neutral-50">
                      {rev.author.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <h5 className="font-serif font-semibold">{rev.author}</h5>
                    <span className="text-[10px] text-neutral-400 font-sans">{rev.date}</span>
                  </div>
                  
                  <div className="flex gap-0.5 pb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${
                          s <= rev.rating ? "fill-[#D4AF37] stroke-none" : "text-neutral-200"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-xs text-neutral-600 font-light leading-relaxed font-sans">
                    {rev.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Size Guide Modal Overlay */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

      {/* VIRTUAL TRY-ON MODAL */}
      <AnimatePresence>
        {isTryOnOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTryOnOpen(false)}
              className="fixed inset-0 z-50 bg-black/75 cursor-pointer"
            />
            
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-white max-w-2xl w-full p-6 sm:p-8 flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto border border-[#F1F1F1] text-[#111111] shadow-2xl rounded-none relative"
              >
                <button
                  onClick={() => setIsTryOnOpen(false)}
                  className="absolute top-4 left-4 p-1.5 hover:bg-[#F1F1F1] transition-colors rounded-full z-10"
                  aria-label="סגור סימולטור ענידה"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left panel: Interactive canvas */}
                <div className="flex-1 flex flex-col items-center space-y-3">
                  <div className="relative w-full aspect-square max-w-[320px] bg-neutral-900 border border-[#F1F1F1] overflow-hidden flex items-center justify-center">
                    
                    <img
                      src={currentBackdrop}
                      alt="Backdrop canvas"
                      className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />

                    <motion.div
                      drag
                      dragMomentum={false}
                      dragElastic={0.1}
                      style={{
                        scale: tryOnScale,
                        rotate: `${tryOnRotate}deg`,
                      }}
                      className="w-32 h-32 relative cursor-grab active:cursor-grabbing z-10"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
                      />
                    </motion.div>

                    <div className="absolute top-3 right-3 text-[9px] bg-black/60 text-white py-1 px-2.5 font-light uppercase tracking-wider">
                      הדמיית ענידה אינטראקטיבית
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-neutral-400 font-light text-center">
                    🖐️ תוכלי לגרור את התכשיט עם העכבר/האצבע ולמקם אותו על גבי התמונה
                  </p>
                </div>

                {/* Right panel: Customizer controls */}
                <div className="w-full md:w-60 flex flex-col justify-between space-y-6 pt-2">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[9px] tracking-[0.25em] text-[#D4AF37] font-semibold uppercase">
                        VIRTUAL TRY-ON STUDIO
                      </span>
                      <h3 className="font-serif text-xl font-bold tracking-wide mt-0.5">הדמיית ענידה אישית</h3>
                      <p className="text-[11px] text-neutral-400 font-light mt-0.5">שליטה במיקום, גודל וזווית</p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-neutral-500">
                        <span>גודל התכשיט:</span>
                        <span className="font-sans text-[10px]">{Math.round(tryOnScale * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.3"
                        max="1.7"
                        step="0.05"
                        value={tryOnScale}
                        onChange={(e) => setTryOnScale(parseFloat(e.target.value))}
                        className="w-full accent-[#D4AF37] h-1 bg-[#F1F1F1] rounded-none outline-none appearance-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-neutral-500">
                        <span>זווית סיבוב:</span>
                        <span className="font-sans text-[10px]">{tryOnRotate}°</span>
                      </div>
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        value={tryOnRotate}
                        onChange={(e) => setTryOnRotate(parseInt(e.target.value))}
                        className="w-full accent-[#D4AF37] h-1 bg-[#F1F1F1] rounded-none outline-none appearance-none"
                      />
                    </div>

                    <div className="space-y-2 border-t border-[#F1F1F1] pt-4">
                      <label className="text-xs font-semibold text-neutral-500 block">מדדי על התמונה שלך:</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          id="tryon-upload"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="tryon-upload"
                          className="w-full border border-dashed border-neutral-300 hover:border-[#D4AF37] py-2 px-3 text-xs font-medium text-neutral-500 hover:text-black flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Upload className="w-4 h-4 text-[#D4AF37]" />
                          <span>העלי תמונת כף יד/צוואר</span>
                        </label>
                      </div>

                      {tryOnBackground && (
                        <button
                          onClick={() => setTryOnBackground(null)}
                          className="w-full text-center text-[10px] text-red-500 hover:underline font-light block py-1"
                        >
                          איפוס רקע ברירת מחדל
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setIsTryOnOpen(false)}
                    className="w-full bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#111111] py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-none mt-4"
                  >
                    חזרה לעמוד המוצר
                  </button>
                </div>

              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
