"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { PRODUCTS } from "@/data/products";
import { Sparkles, ArrowLeft, Calendar, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  
  // Select 3 bestselling products for the homepage highlight
  const bestSellers = PRODUCTS.filter(p => 
    p.tags.includes("Best Seller") || p.tags.includes("VIP")
  ).slice(0, 3);

  const collections = [
    {
      id: "rings",
      name: "קולקציית טבעות",
      englishName: "THE RING ARCHIVE",
      desc: "טבעות סוליטר מעוצבות, זהב צהוב ולבן 18K",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
      link: "/category/rings",
      span: "md:col-span-2 lg:col-span-8"
    },
    {
      id: "necklaces",
      name: "שרשראות ותליונים",
      englishName: "NECKLACES & PENDANTS",
      desc: "פנינים מובחרות ויהלומים תלויים על זהב עדין",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
      link: "/category/necklaces",
      span: "md:col-span-1 lg:col-span-4"
    },
    {
      id: "earrings",
      name: "עגילי מעצבים",
      englishName: "DESIGNER EARRINGS",
      desc: "עגילי חישוק פיסוליים וטיפות טופז כחולות",
      image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=600&auto=format&fit=crop",
      link: "/category/earrings",
      span: "md:col-span-1 lg:col-span-4"
    },
    {
      id: "bracelets",
      name: "צמידי אצילות",
      englishName: "LUXURY BRACELETS",
      desc: "צמידי טניס משובצים יהלומים ושרשראות מלוטשות",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
      link: "/category/bracelets",
      span: "md:col-span-2 lg:col-span-8"
    }
  ];

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <>
      <Header />
      
      <main className="flex-grow bg-white">
        
        {/* Cinematic Auto-rotating Hero Slideshow */}
        <Hero />

        {/* Brand statement banner with scroll reveals */}
        <section className="py-24 bg-white text-center border-b border-[#F1F1F1]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto px-6 space-y-4"
          >
            <Sparkles className="w-5 h-5 text-[#D4AF37] mx-auto stroke-[1.5]" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-[#111111]">
              האסתטיקה של הדיוק והניקיון
            </h2>
            <p className="text-sm font-light text-neutral-500 leading-relaxed font-sans max-w-xl mx-auto">
              כל תכשיט בבית המלאכה שלנו מתוכנן במחשב בטכנולוגיית תלת-ממד מתקדמת ומלוטש ידנית לרמת שלמות. אנו משתמשים בזהב ממוחזר 100% וביהלומים טבעיים ללא קונפליקט בלבד.
            </p>
          </motion.div>
        </section>

        {/* Featured Collections Masonry Grid Section */}
        <section id="featured-collections" className="py-24 max-w-7xl mx-auto px-6 lg:px-8 border-b border-[#F1F1F1]">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] font-semibold uppercase">
              THE ARCHIVES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111] mt-1">קולקציות מובחרות</h2>
            <p className="text-xs text-neutral-400 font-light mt-1">בחרי את הארכיון העיצובי המתאים עבורך</p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8"
          >
            {collections.map((col) => (
              <motion.div
                key={col.id}
                variants={itemFadeUp}
                className={`${col.span} relative aspect-[16/10] md:aspect-auto md:h-[350px] lg:h-[400px] overflow-hidden border border-[#F1F1F1] group cursor-pointer`}
              >
                <Link href={col.link} className="absolute inset-0 w-full h-full">
                  
                  {/* Background Zoom Image */}
                  <img
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover object-center transition-transform duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent transition-opacity duration-500" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-x-6 bottom-6 text-white flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="text-[9px] tracking-widest text-[#D4AF37] font-semibold uppercase block font-sans">
                        {col.englishName}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold">
                        {col.name}
                      </h3>
                      <p className="text-[11px] text-neutral-200 font-light font-sans line-clamp-1">
                        {col.desc}
                      </p>
                    </div>

                    <div className="w-10 h-10 bg-white hover:bg-[#D4AF37] hover:text-white text-[#111111] rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:translate-y-[-5px]">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Curated Bestsellers Showcase */}
        <section id="featured-products" className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] font-semibold uppercase">
                THE ICONIC PIECES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111] mt-1">הכי מבוקשים השבוע</h2>
              <p className="text-xs text-neutral-400 font-light mt-1">יצירות המופת שכבשו את ליבן של לקוחותינו</p>
            </div>
            
            <Link 
              href="/category/rings"
              className="text-xs tracking-widest uppercase font-semibold text-[#111111] border-b border-[#111111] pb-1 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all flex items-center gap-1 group"
            >
              <span>צפי בכל הקולקציות</span>
              <ArrowLeft className="w-3.5 h-3.5 transform group-hover:translate-x-[-3px] transition-transform" />
            </Link>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            {bestSellers.map((product) => (
              <motion.div key={product.id} variants={itemFadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Showroom / Booking VIP Section */}
        <section className="py-24 bg-[#F9F9F9] border-t border-[#F1F1F1]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual element */}
            <div className="lg:col-span-6 relative aspect-[16/10] bg-[#F1F1F1] overflow-hidden border border-[#F1F1F1]">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop"
                alt="Showroom display"
                className="w-full h-full object-cover zoom-hover-target"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Hebrew Details Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] font-semibold uppercase">
                THE SHOWROOM EXPERIENCE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111]">
                חוויית קנייה פרטית בלב תל אביב
              </h2>
              <p className="text-sm font-light text-neutral-500 leading-relaxed font-sans">
                אנו מזמינים אותך לפגישה אישית בגלריה השקטה שלנו בשדרות רוטשילד. בפגישה תוכלי לענוד את התכשיטים השונים, להתייעץ עם המעצבים שלנו ולקבל התאמה אישית של מידות וסוגי זהב.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => alert("תודה! מערכת הזימון תעלה בקרוב ליצירת קשר VIP.")}
                  className="px-8 py-3.5 bg-[#111111] hover:bg-[#D4AF37] hover:text-[#111111] text-white font-semibold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-none"
                >
                  <Calendar className="w-4 h-4" />
                  <span>תיאום פגישת VIP</span>
                </button>
                <a
                  href="mailto:info@yairjewelry.co.il"
                  className="px-8 py-3.5 border border-[#111111] hover:bg-[#111111] hover:text-white text-[#111111] font-semibold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-none"
                >
                  <span>צרי קשר במייל</span>
                  <ArrowLeft className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
