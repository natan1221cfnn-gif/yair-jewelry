"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/useCartStore";
import { CreditCard, ShoppingBag, ArrowRight, Trash2, CheckCircle2, Award, Gift } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  
  // Checkout stages: 'form' | 'success'
  const [stage, setStage] = useState<"form" | "success">("form");
  const [activePaymentMethod, setActivePaymentMethod] = useState<"card" | "bit" | "apple" | "google">("card");
  
  // Form states
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  
  // Credit card details
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Gift Wrapping States
  const [isGiftWrapping, setIsGiftWrapping] = useState(false);
  const [giftPackaging, setGiftPackaging] = useState("מארז קטיפה מלכותי");
  const [giftGreeting, setGiftGreeting] = useState("");

  // Promo Code mock
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Receipt details
  const [orderId, setOrderId] = useState("");

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "GOLD10") {
      setDiscountPercent(10);
      setPromoApplied(true);
    } else {
      alert("קוד קופון לא תקין. נסי את הקוד GOLD10");
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activePaymentMethod === "card" && (!cardNumber || !cardExpiry || !cardCvv)) {
      alert("נא למלא את פרטי כרטיס האשראי");
      return;
    }

    const randomOrderId = `YJ-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(randomOrderId);
    setStage("success");
    setTimeout(() => {
      clearCart();
    }, 100);
  };

  const currentTotalPrice = getTotalPrice();
  const discountAmount = (currentTotalPrice * discountPercent) / 100;
  const finalPrice = currentTotalPrice - discountAmount;

  if (stage === "success") {
    return (
      <>
        <Header />
        <main className="flex-grow pt-32 pb-24 bg-white flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full border border-[#F1F1F1] bg-[#F9F9F9] p-8 sm:p-10 space-y-6 text-right"
          >
            <CheckCircle2 className="w-16 h-16 text-[#D4AF37] mx-auto stroke-[1.2] block" />
            
            <div className="space-y-2 text-center">
              <h1 className="font-serif text-3xl font-bold text-[#111111]">תודה על הזמנתך</h1>
              <p className="text-sm font-light text-neutral-500">התשלום בוצע בהצלחה. הזמנתך הועברה לסטודיו להכנה.</p>
            </div>

            <div className="border-t border-b border-[#F1F1F1] py-4 space-y-2 text-xs font-light">
              <div className="flex justify-between">
                <span className="text-neutral-400">מספר הזמנה:</span>
                <span className="font-semibold text-black font-sans">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">לקוח:</span>
                <span className="text-black font-semibold">{firstName} {lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">משלוח:</span>
                <span className="text-black">שליח VIP מבוטח לכתובת {address}, {city}</span>
              </div>
              
              {isGiftWrapping && (
                <div className="border-t border-[#F1F1F1] pt-2 mt-2 space-y-1.5 bg-[#E6D6C3]/10 p-2.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold">
                    <Gift className="w-4 h-4" />
                    <span>שירות מתנה יוקרתי פעיל:</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-neutral-600">
                    <span>סוג מארז:</span>
                    <span>{giftPackaging}</span>
                  </div>
                  {giftGreeting && (
                    <div className="text-[11px] text-neutral-600 leading-relaxed">
                      <span className="font-semibold block mb-0.5">ברכה אישית מודפסת:</span>
                      <p className="italic font-serif border-r border-[#D4AF37] pr-2 mt-1">"{giftGreeting}"</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between border-t border-[#F1F1F1] pt-2 mt-2">
                <span className="text-neutral-400 font-semibold">סה״כ שולם:</span>
                <span className="font-bold text-[#D4AF37] text-sm">{formattedPrice(finalPrice)}</span>
              </div>
            </div>

            <div className="p-4 bg-[#E6D6C3]/20 text-xs text-neutral-600 leading-relaxed font-sans text-center">
              📩 שלחנו אישור הזמנה מפורט לכתובת האימייל <strong>{email}</strong>. שליח VIP יתאם מולך את מועד ההגעה בטלפון <strong>{phone}</strong>.
            </div>

            <Link href="/">
              <button className="w-full bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#111111] py-3.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-none">
                חזרה לעמוד הבית
              </button>
            </Link>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow pt-32 pb-24 bg-white text-[#111111] select-none font-sans">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex items-center gap-3 border-b border-[#F1F1F1] pb-6 mb-10">
            <ShoppingBag className="w-6 h-6 text-[#D4AF37] stroke-[1.5]" />
            <h1 className="font-serif text-3xl font-bold">קופה ותשלום</h1>
            <span className="text-xs text-neutral-400 font-light font-sans">(One-Page Checkout)</span>
          </div>

          {items.length === 0 ? (
            <div className="py-20 text-center space-y-6">
              <p className="text-lg text-neutral-500 font-light">סל הקניות שלך ריק, אנא הוסיפי תכשיטים לקטלוג לפני המעבר לקופה.</p>
              <Link href="/">
                <button className="px-8 py-3 bg-[#111111] text-white hover:bg-[#D4AF37] hover:text-[#111111] transition-all text-xs font-semibold tracking-wider uppercase rounded-none">
                  חזרה לקטלוג
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* RIGHT COLUMN: Customer shipping & Payment Details (LG 7) */}
              <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
                
                {/* 1. Customer email details */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold border-b border-[#F1F1F1] pb-2">1. פרטי קשר</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-500">כתובת אימייל לקבלת קבלה ואישור:</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full bg-white border border-[#F1F1F1] focus:outline-none focus:border-[#D4AF37] px-3.5 py-3 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Shipping Details */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-serif text-lg font-bold border-b border-[#F1F1F1] pb-2">2. פרטי משלוח (שליח VIP חינם)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-500">שם פרטי:</label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-white border border-[#F1F1F1] focus:outline-none focus:border-[#D4AF37] px-3.5 py-3 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-500">שם משפחה:</label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-white border border-[#F1F1F1] focus:outline-none focus:border-[#D4AF37] px-3.5 py-3 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-500">טלפון לתיאום משלוח:</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="054-0000000"
                        className="w-full bg-white border border-[#F1F1F1] focus:outline-none focus:border-[#D4AF37] px-3.5 py-3 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-500">עיר:</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-white border border-[#F1F1F1] focus:outline-none focus:border-[#D4AF37] px-3.5 py-3 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-neutral-500">כתובת מגורים מלאה (רחוב, מספר בית, דירה):</label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-white border border-[#F1F1F1] focus:outline-none focus:border-[#D4AF37] px-3.5 py-3 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Gift Wrapping Options */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-serif text-lg font-bold border-b border-[#F1F1F1] pb-2 flex items-center gap-1.5">
                    <Gift className="w-5 h-5 text-[#D4AF37]" />
                    <span>3. שירות מארזי מתנה וברכה אישית</span>
                  </h3>
                  
                  <div className="p-4 bg-[#E6D6C3]/10 border border-[#E6D6C3]/20 space-y-4">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isGiftWrapping}
                        onChange={(e) => setIsGiftWrapping(e.target.checked)}
                        className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
                      />
                      <span className="text-xs font-bold text-neutral-800">הוסיפי אריזת מתנה יוקרתית וברכה מודפסת (ללא עלות)</span>
                    </label>

                    <AnimatePresence>
                      {isGiftWrapping && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden space-y-4 pt-3 border-t border-[#E6D6C3]/30"
                        >
                          <div className="space-y-2">
                            <span className="text-xs font-semibold text-neutral-600 block">בחרי את סוג המארז המועדף:</span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {[
                                { name: "מארז קטיפה מלכותי", desc: "סגירה שחורה מהודרת" },
                                { name: "נרתיק עור נפה מלוטש", desc: "עור דק בגימור ניוד" },
                                { name: "קופסת עץ מלוטשת", desc: "עץ קוקוס טבעי בגימור מט" }
                              ].map((box) => (
                                <button
                                  type="button"
                                  key={box.name}
                                  onClick={() => setGiftPackaging(box.name)}
                                  className={`p-3 border text-center transition-all ${
                                    giftPackaging === box.name
                                      ? "border-[#D4AF37] bg-white font-bold"
                                      : "border-transparent bg-white/60 hover:border-neutral-200"
                                  }`}
                                >
                                  <span className="text-xs block text-black">{box.name}</span>
                                  <span className="text-[9px] text-neutral-400 font-light block mt-0.5">{box.desc}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-neutral-600 block">כתבי כרטיס ברכה אישי (מודפס בסטודיו על נייר כותנה):</label>
                            <textarea
                              rows={3}
                              value={giftGreeting}
                              onChange={(e) => setGiftGreeting(e.target.value)}
                              placeholder="כתבי כאן את הברכה האישית שלך..."
                              className="w-full bg-white border border-[#F1F1F1] focus:outline-none focus:border-[#D4AF37] px-3.5 py-3 text-xs"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* 4. Secure Payments */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-serif text-lg font-bold border-b border-[#F1F1F1] pb-2">4. תשלום מאובטח</h3>
                  
                  {/* Digital Wallet Options (Bit, Apple, Google Pay) */}
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setActivePaymentMethod("bit")}
                      className={`py-3 border flex flex-col items-center justify-center gap-1 transition-all ${
                        activePaymentMethod === "bit"
                          ? "border-[#D4AF37] bg-[#D4AF37]/5"
                          : "border-[#F1F1F1] hover:border-neutral-300 bg-white"
                      }`}
                    >
                      <span className="text-sm font-sans font-extrabold text-[#D4AF37]">BIT</span>
                      <span className="text-[10px] text-neutral-400 font-light">תשלום מהיר</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setActivePaymentMethod("apple")}
                      className={`py-3 border flex flex-col items-center justify-center gap-1 transition-all ${
                        activePaymentMethod === "apple"
                          ? "border-black bg-neutral-50"
                          : "border-[#F1F1F1] hover:border-neutral-300 bg-white"
                      }`}
                    >
                      <span className="text-sm font-sans font-extrabold text-black"> Pay</span>
                      <span className="text-[10px] text-neutral-400 font-light">Apple Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActivePaymentMethod("google")}
                      className={`py-3 border flex flex-col items-center justify-center gap-1 transition-all ${
                        activePaymentMethod === "google"
                          ? "border-[#4285F4] bg-[#4285F4]/5"
                          : "border-[#F1F1F1] hover:border-neutral-300 bg-white"
                      }`}
                    >
                      <span className="text-sm font-sans font-extrabold text-[#4285F4]">G Pay</span>
                      <span className="text-[10px] text-neutral-400 font-light">Google Pay</span>
                    </button>
                  </div>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-[#F1F1F1]"></div>
                    <span className="flex-shrink mx-4 text-xs font-light text-neutral-400">או תשלום בכרטיס אשראי</span>
                    <div className="flex-grow border-t border-[#F1F1F1]"></div>
                  </div>

                  {/* Standard Credit card option */}
                  <button
                    type="button"
                    onClick={() => setActivePaymentMethod("card")}
                    className={`w-full py-3 border font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-all ${
                      activePaymentMethod === "card"
                        ? "border-[#111111] bg-[#111111] text-white"
                        : "border-[#F1F1F1] text-[#111111] hover:border-neutral-300 bg-white"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>הזנת כרטיס אשראי ישראלי / בינלאומי</span>
                  </button>

                  <AnimatePresence>
                    {activePaymentMethod === "card" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden space-y-4 pt-3"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-3 space-y-1.5">
                            <label className="text-xs font-semibold text-neutral-500">מספר כרטיס אשראי:</label>
                            <input
                              type="text"
                              maxLength={16}
                              placeholder="0000 0000 0000 0000"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                              className="w-full bg-white border border-[#F1F1F1] focus:outline-none focus:border-[#D4AF37] px-3.5 py-3 text-xs font-sans tracking-widest text-left"
                            />
                          </div>
                          
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-neutral-500">תוקף (MM/YY):</label>
                            <input
                              type="text"
                              maxLength={5}
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full bg-white border border-[#F1F1F1] focus:outline-none focus:border-[#D4AF37] px-3.5 py-3 text-xs font-sans text-center"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-neutral-500">CVV (3 ספרות מאחור):</label>
                            <input
                              type="password"
                              maxLength={3}
                              placeholder="***"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                              className="w-full bg-white border border-[#F1F1F1] focus:outline-none focus:border-[#D4AF37] px-3.5 py-3 text-xs font-sans text-center"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Final Booking Button */}
                <div className="pt-4 border-t border-[#F1F1F1]">
                  <button
                    type="submit"
                    className="w-full bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#111111] py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-2 rounded-none shadow-lg shadow-black/5"
                  >
                    <span>אישור הזמנה ותשלום מאובטח</span>
                    <span>-</span>
                    <span>{formattedPrice(finalPrice)}</span>
                  </button>
                  
                  <div className="flex justify-center items-center gap-2 text-[10px] text-neutral-400 font-light py-3">
                    <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>כל הרכישות מבוטחות ומאובטחות בתקן המחמיר ביותר PCI-DSS 1</span>
                  </div>
                </div>
              </form>

              {/* LEFT COLUMN: Order Summary (LG 5) */}
              <div className="lg:col-span-5 border border-[#F1F1F1] bg-[#F9F9F9] p-6 sm:p-8 space-y-6 lg:sticky lg:top-24">
                <h3 className="font-serif text-lg font-bold border-b border-[#F1F1F1] pb-2">סיכום ההזמנה</h3>
                
                {/* List of items in checkout */}
                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-1 no-scrollbar border-b border-[#F1F1F1] pb-4">
                  {items.map((item) => {
                    const price = item.customPrice ?? (item.product.salePrice ?? item.product.price);
                    return (
                      <div key={item.id} className="flex gap-3 text-xs">
                        <div className="w-14 h-18 bg-[#F1F1F1] overflow-hidden flex-shrink-0">
                          <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-serif font-medium text-black line-clamp-1">{item.product.name}</h4>
                            <p className="text-[10px] text-neutral-400 mt-0.5">{item.selectedVariation.name} | מידה: {item.selectedSize}</p>
                            {item.customizations && (
                              <p className="text-[9px] text-[#D4AF37] font-semibold mt-0.5 font-sans">
                                זהב {item.customizations.goldKarat}
                                {item.customizations.diamondCarat && ` | ${item.customizations.diamondCarat}`}
                                {item.customizations.diamondClarity && ` | ${item.customizations.diamondClarity}`}
                              </p>
                            )}
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-neutral-500 font-light">כמות: {item.quantity}</span>
                            <span className="font-semibold text-black">{formattedPrice(price * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="קוד קופון (הקלידי GOLD10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-white border border-[#F1F1F1] focus:outline-none px-3 py-2 text-xs"
                  />
                  <button className="bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#111111] px-4 py-2 text-xs font-semibold transition-colors duration-300">
                    החל
                  </button>
                </form>

                {promoApplied && (
                  <div className="text-xs text-green-600 bg-green-50 p-2 text-center">
                    קוד קופון <strong>GOLD10</strong> הוחל בהצלחה! (10% הנחה)
                  </div>
                )}

                {/* Totals table */}
                <div className="space-y-2 text-xs font-light">
                  <div className="flex justify-between text-neutral-500">
                    <span>פריטים</span>
                    <span>{formattedPrice(currentTotalPrice)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-red-500">
                      <span>הנחת קוד קופון</span>
                      <span>-{formattedPrice(discountAmount)}</span>
                    </div>
                  )}
                  
                  {isGiftWrapping && (
                    <div className="flex justify-between text-neutral-500">
                      <span>אריזת מתנה ({giftPackaging})</span>
                      <span className="text-green-600 font-semibold">חינם</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-500">
                    <span>משלוח VIP עד הבית</span>
                    <span className="text-[#D4AF37] font-semibold">חינם</span>
                  </div>
                  <div className="flex justify-between text-sm font-serif font-bold text-black border-t border-[#F1F1F1] pt-3">
                    <span>סה״כ לתשלום</span>
                    <span className="text-base font-semibold">{formattedPrice(finalPrice)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/">
                    <button className="w-full py-2.5 text-center text-xs font-semibold text-neutral-400 hover:text-black transition-colors">
                      ביטול וחזרה לחנות
                    </button>
                  </Link>
                </div>

              </div>

            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
