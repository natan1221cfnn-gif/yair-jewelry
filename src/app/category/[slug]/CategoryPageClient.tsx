"use client";

import { useState, useMemo } from "react";
import { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryPageClientProps {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  initialProducts: Product[];
}

type SortOption = "default" | "price-asc" | "price-desc" | "rating";
type TagFilter = "all" | "New" | "Sale" | "VIP";

export default function CategoryPageClient({
  title,
  subtitle,
  image,
  initialProducts,
}: CategoryPageClientProps) {
  const [activeSort, setActiveSort] = useState<SortOption>("default");
  const [activeTag, setActiveTag] = useState<TagFilter>("all");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Sorting translation details
  const sortLabels = {
    default: "מיון ברירת מחדל",
    "price-asc": "מחיר: מהנמוך לגבוה",
    "price-desc": "מחיר: מהגבוה לנמוך",
    rating: "דירוג: הגבוה ביותר",
  };

  // Filter and Sort logic
  const processedProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by tag
    if (activeTag !== "all") {
      result = result.filter((p) => p.tags.includes(activeTag as any));
    }

    // Sort items
    if (activeSort === "price-asc") {
      result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    } else if (activeSort === "price-desc") {
      result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    } else if (activeSort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [initialProducts, activeTag, activeSort]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="bg-white min-h-screen pb-24 text-[#111111] select-none">
      
      {/* Editorial Category Header Banner */}
      <section className="relative h-[45vh] flex items-center justify-center bg-black overflow-hidden">
        <motion.div
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <img src={image} alt={title} className="w-full h-full object-cover object-center" />
        </motion.div>
        
        {/* Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

        {/* Text Details */}
        <div className="relative z-10 text-center text-white px-6 max-w-3xl space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif text-3xl sm:text-5xl font-bold tracking-wide"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xs sm:text-sm font-light text-neutral-200 leading-relaxed font-sans max-w-xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>
      </section>

      {/* Toolbar - Filters & Sorters */}
      <section className="border-b border-[#F1F1F1] py-3.5 sticky top-[72px] bg-white z-30 shadow-sm/5 luxury-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 text-xs font-semibold">
          
          {/* Right side: Tag Filter Pills (Scrollable on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth flex-1 py-1">
            <span className="text-neutral-400 font-light flex items-center gap-1.5 ml-2 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">סנן לפי:</span>
            </span>
            <div className="flex gap-1.5">
              {[
                { id: "all", name: "הכל" },
                { id: "New", name: "חדשים" },
                { id: "Sale", name: "במבצע" },
                { id: "VIP", name: "VIP" },
              ].map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setActiveTag(tag.id as TagFilter)}
                  className={`px-3 py-1.5 border rounded-none text-[11px] transition-all duration-300 shrink-0 ${
                    activeTag === tag.id
                      ? "bg-[#111111] border-[#111111] text-white"
                      : "bg-white border-[#F1F1F1] text-neutral-500 hover:border-neutral-400"
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* Left side: Custom Dropdown Sort selector */}
          <div className="relative shrink-0">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#F1F1F1] hover:border-neutral-400 bg-white text-[11px]"
            >
              <span>{sortLabels[activeSort]}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 mt-1.5 w-40 bg-white border border-[#F1F1F1] shadow-xl z-50 rounded-none overflow-hidden"
                  >
                    {Object.entries(sortLabels).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setActiveSort(key as SortOption);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-right px-3 py-2 hover:bg-[#F9F9F9] transition-colors text-[11px] font-medium block ${
                          activeSort === key ? "text-[#D4AF37] font-semibold bg-neutral-50/50" : "text-neutral-600"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Main product showcase grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-12">
        <div className="pb-4 text-xs font-light text-neutral-400 mb-6">
          מציג {processedProducts.length} תכשיטים מתוך קולקציית {title}
        </div>

        {processedProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <p className="text-lg text-neutral-500 font-light">לא נמצאו תכשיטים התואמים את הסינון שנבחר.</p>
            <button
              onClick={() => {
                setActiveTag("all");
                setActiveSort("default");
              }}
              className="px-6 py-2.5 bg-[#111111] text-white hover:bg-[#D4AF37] hover:text-[#111111] transition-colors text-xs font-semibold tracking-wider uppercase rounded-none"
            >
              איפוס סינונים
            </button>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            {processedProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

    </div>
  );
}
