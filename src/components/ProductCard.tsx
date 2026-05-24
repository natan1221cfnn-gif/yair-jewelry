"use client";

import { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/data/products";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);

  const activePrice = product.salePrice ?? product.price;
  const isSale = !!product.salePrice;

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col h-full bg-white select-none relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge Tags Container */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 items-end">
        {product.tags.map((tag) => (
          <span
            key={tag}
            className={`px-2.5 py-0.5 text-[9px] uppercase tracking-wider font-semibold rounded-none ${
              tag === "Sale"
                ? "bg-red-500 text-white"
                : tag === "New"
                ? "bg-[#D4AF37] text-white"
                : tag === "VIP"
                ? "bg-black text-[#D4AF37] border border-[#D4AF37]"
                : "bg-neutral-800 text-white"
            }`}
          >
            {tag === "Sale" ? "מבצע" : tag === "New" ? "חדש" : tag === "VIP" ? "VIP" : "נמכר ביותר"}
          </span>
        ))}
      </div>

      {/* Image Gallery Trigger */}
      <Link
        href={`/product/${product.id}`}
        className="relative w-full aspect-[4/5] bg-[#F9F9F9] overflow-hidden block border border-[#F1F1F1] group-hover:border-[#D4AF37]/20 transition-colors duration-500"
      >
        <div className="w-full h-full relative">
          {/* Primary image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover object-center transition-all duration-1000 ease-out transform ${
              isHovered && product.images[1] ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
            loading="lazy"
          />

          {/* Hover image (model view) */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} worn`}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-out transform ${
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              loading="lazy"
            />
          )}
        </div>
      </Link>

      {/* Product Details info */}
      <div className="pt-4 pb-2 flex flex-col flex-1 space-y-1">
        {/* Category & Rating */}
        <div className="flex justify-between items-center text-[11px] text-neutral-400 font-light">
          <span>{product.categoryHebrew}</span>
          
          <div className="flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-[#D4AF37] stroke-none" />
            <span className="font-sans font-medium text-[#111111]">{product.rating}</span>
            <span className="text-[10px] text-neutral-400 font-sans">({product.reviews.length})</span>
          </div>
        </div>

        {/* Hebrew Title */}
        <h3 className="font-serif text-[15px] font-semibold text-[#111111] hover:text-[#D4AF37] transition-colors duration-300 line-clamp-1">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        {/* English Title (Sub-tag for premium tech luxury feel) */}
        <p className="text-[11px] text-neutral-400 font-light tracking-wide -mt-0.5">
          {product.englishName}
        </p>

        {/* Metal Variations Dots */}
        {product.variations.length > 1 && (
          <div className="flex gap-1.5 py-1">
            {product.variations.map((v, index) => (
              <button
                key={v.id}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedVariationIndex(index);
                }}
                className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                  selectedVariationIndex === index
                    ? "border-[#D4AF37] scale-125"
                    : "border-neutral-200 hover:border-neutral-400"
                }`}
                style={{ backgroundColor: v.hex }}
                title={v.name}
                aria-label={v.name}
              />
            ))}
          </div>
        )}

        {/* Pricing */}
        <div className="pt-1.5 flex items-baseline gap-2">
          <span className="text-sm font-semibold tracking-wide text-[#111111]">
            {formattedPrice(activePrice)}
          </span>
          {isSale && (
            <span className="text-[11px] text-neutral-400 line-through">
              {formattedPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
