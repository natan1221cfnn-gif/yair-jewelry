"use client";

import { useEffect } from "react";
import { X, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const sizesTable = [
    { size: "48", diameter: "15.3 מ״מ", circumference: "48 מ״מ" },
    { size: "50", diameter: "15.9 מ״מ", circumference: "50 מ״מ" },
    { size: "52", diameter: "16.5 מ״מ", circumference: "52 מ״מ" },
    { size: "54", diameter: "17.2 מ״מ", circumference: "54 מ״מ" },
    { size: "56", diameter: "17.8 מ״מ", circumference: "56 מ״מ" },
    { size: "58", diameter: "18.5 מ״מ", circumference: "58 מ״מ" },
    { size: "60", diameter: "19.2 מ״מ", circumference: "60 מ״מ" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 cursor-pointer"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white max-w-lg w-full p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-y-auto border border-[#F1F1F1] text-[#111111] shadow-2xl rounded-none relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 left-4 p-1.5 hover:bg-[#F1F1F1] transition-colors rounded-full"
                aria-label="סגור מדריך מידות"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="text-center pb-6 border-b border-[#F1F1F1] mt-2">
                <h3 className="font-serif text-2xl font-bold tracking-wide">
                  מדריך מידות טבעות
                </h3>
                <p className="text-xs text-neutral-400 font-light mt-1">
                  כיצד למצוא את המידה המושלמת עבורך
                </p>
              </div>

              {/* Guide Contents */}
              <div className="py-6 space-y-6 flex-1 text-sm font-light">
                
                {/* Method 1 */}
                <div className="space-y-2">
                  <h4 className="font-serif font-semibold text-[#111111] flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-[#D4AF37]" />
                    <span>שיטה 1: מדידת קוטר של טבעת קיימת</span>
                  </h4>
                  <p className="text-neutral-500 leading-relaxed text-xs">
                    קחי טבעת שמתאימה לאצבע שלך בדיוק, והניחי אותה על סרגל. מדדי את <strong>הקוטר הפנימי</strong> של הטבעת במילימטרים (מצד אחד של הדופן הפנימית לצד השני, ללא עובי המתכת).
                  </p>
                </div>

                {/* Method 2 */}
                <div className="space-y-2">
                  <h4 className="font-serif font-semibold text-[#111111] flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-[#D4AF37]" />
                    <span>שיטה 2: מדידת היקף האצבע</span>
                  </h4>
                  <p className="text-neutral-500 leading-relaxed text-xs">
                    לפפי חוט דק או רצועת נייר סביב האצבע הרלוונטית. סמני בטוש את נקודת המפגש של החוט, ומדדי את אורך החוט במילימטרים באמצעות סרגל. אורך זה הוא היקף האצבע שלך.
                  </p>
                </div>

                {/* Sizes Table */}
                <div className="space-y-3">
                  <h4 className="font-serif font-semibold text-[#111111] text-center">
                    טבלת המרות מידות ישראליות ואירופאיות
                  </h4>
                  
                  <div className="border border-[#F1F1F1] overflow-hidden">
                    <table className="w-full text-center text-xs">
                      <thead>
                        <tr className="bg-[#F9F9F9] font-medium border-b border-[#F1F1F1]">
                          <th className="py-2.5 px-2 border-r border-[#F1F1F1]">מידה מוצעת</th>
                          <th className="py-2.5 px-2 border-r border-[#F1F1F1]">קוטר פנימי (מ״מ)</th>
                          <th className="py-2.5 px-2">היקף האצבע (מ״מ)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F1F1F1] font-sans">
                        {sizesTable.map((row) => (
                          <tr key={row.size} className="hover:bg-[#F1F1F1]/30 transition-colors">
                            <td className="py-2 px-2 border-r border-[#F1F1F1] font-bold text-[#D4AF37]">{row.size}</td>
                            <td className="py-2 px-2 border-r border-[#F1F1F1]">{row.diameter}</td>
                            <td className="py-2 px-2 text-neutral-500">{row.circumference}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-3 bg-[#E6D6C3]/20 border border-[#E6D6C3]/40 text-xs text-[#111111] text-center leading-relaxed">
                  <strong>טיפ של מעצב:</strong> אם את נמצאת בין שתי מידות, מומלץ תמיד לבחור במידה הגדולה יותר. אצבעות נוטות להתרחב מעט בשעות הערב או בימים חמים.
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onClose}
                className="w-full bg-[#111111] text-white hover:bg-[#D4AF37] hover:text-[#111111] py-3 text-xs uppercase tracking-widest font-medium transition-all duration-300"
              >
                הבנתי, סגור
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
