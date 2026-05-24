"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronRight, ChevronLeft } from "lucide-react";

interface Slide {
  id: number;
  image: string;
  label: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1800&auto=format&fit=crop",
    label: "THE FINE JEWELRY COLLECTION",
    title: "יופי נצחי שנכתב בזהב ויהלומים",
    subtitle: "תכשיטים ייחודיים המשלבים טכנולוגיה מתקדמת ועבודת יד מוקפדת. עיצוב מינימליסטי המעניק ליופי הטבעי שלך לדבר.",
    ctaText: "גלי גילוי קולקציות",
    ctaLink: "#featured-collections",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1800&auto=format&fit=crop",
    label: "HANDCRAFTED ENGAGEMENT RINGS",
    title: "טבעות אירוסין וסוליטר בעבודת יד",
    subtitle: "הרגעים המרגשים בחייך ראויים לתכשיט המושלם ביותר. יהלומים מובחרים בשיבוץ מדויק להבטחת נצנוץ אופטימלי.",
    ctaText: "לקטלוג הטבעות",
    ctaLink: "/category/rings",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1800&auto=format&fit=crop",
    label: "LUXURY NECKLACES & PENDANTS",
    title: "שרשראות ופנינים המקרינים אצילות",
    subtitle: "פרשנות חדשנית לקלאסיקה נצחית. פניני מים מתוקות משובצות זהב צהוב ולבן לשדרוג כל הופעה.",
    ctaText: "לקולקציית השרשראות",
    ctaLink: "/category/necklaces",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-black select-none">
      
      {/* Slideshow background and Ken Burns Zoom */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.7, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={SLIDES[currentSlide].image}
            alt={SLIDES[currentSlide].title}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Luxury Subtle Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/60" />

      {/* Clean Hebrew Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white flex flex-col items-center">
        
        {/* Animated label */}
        <div className="overflow-hidden mb-4">
          <motion.span
            key={`label-${currentSlide}`}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block text-xs tracking-[0.3em] text-[#D4AF37] uppercase font-semibold text-center"
          >
            {SLIDES[currentSlide].label}
          </motion.span>
        </div>

        {/* Heading */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight max-w-3xl"
          >
            {SLIDES[currentSlide].title}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <div className="overflow-hidden mb-8">
          <motion.p
            key={`subtitle-${currentSlide}`}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base md:text-lg font-light text-neutral-200 max-w-xl font-sans"
          >
            {SLIDES[currentSlide].subtitle}
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
          key={`cta-${currentSlide}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-[400px] sm:max-w-none justify-center"
        >
          {/* Gold Button */}
          <a
            href={SLIDES[currentSlide].ctaLink}
            className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#b8972e] text-[#111111] font-semibold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center rounded-none shadow-lg shadow-black/10"
          >
            {SLIDES[currentSlide].ctaText}
          </a>
          
          {/* Transparent Outline Button */}
          <a
            href="/#featured-products"
            className="px-8 py-3.5 border border-white hover:bg-white hover:text-[#111111] text-white font-medium text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center rounded-none"
          >
            כל התכשיטים
          </a>
        </motion.div>
      </div>

      {/* Manual Slide Controls */}
      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 hidden sm:flex justify-between items-center z-25 pointer-events-none">
        <button
          onClick={handlePrev}
          className="p-2 border border-white/20 hover:border-white text-white/50 hover:text-white transition-colors duration-300 pointer-events-auto"
          aria-label="הקודם"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 border border-white/20 hover:border-white text-white/50 hover:text-white transition-colors duration-300 pointer-events-auto"
          aria-label="הבא"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-16 flex gap-2.5 z-25">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
              currentSlide === index ? "bg-[#D4AF37] w-6" : "bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`שקופית ${index + 1}`}
          />
        ))}
      </div>

      {/* Sticky Scroll Down Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer text-white/40 hover:text-white transition-colors duration-300"
        onClick={() => {
          document.getElementById("featured-collections")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[9px] tracking-[0.2em] font-light uppercase">גללי מטה</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-[#D4AF37]" />
        </motion.div>
      </motion.div>
      
    </section>
  );
}
