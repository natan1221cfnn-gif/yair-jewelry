"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUserStore, Order } from "@/store/useUserStore";
import { User, ShoppingBag, ShieldCheck, Award, MapPin, LogOut, ChevronDown, ChevronUp, Package, Sparkles, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
  const { user, orders, login, logout, updateProfile } = useUserStore();
  
  // Login Form States
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  
  // Dashboard Tabs: 'orders' | 'profile' | 'loyalty'
  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "loyalty">("orders");
  
  // Collapsible orders states
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Edit profile states
  const [editName, setEditName] = useState(user?.name || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");
  const [editCity, setEditCity] = useState(user?.city || "");
  const [editAddress, setEditAddress] = useState(user?.address || "");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    
    login(emailInput, nameInput.trim() || "אורח VIP");
    // Pre-fill edit fields on success
    setEditName(nameInput.trim() || "אורח VIP");
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
      city: editCity,
      address: editAddress,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const toggleExpandOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Calculate Loyalty Status based on order totals
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const loyaltyPoints = Math.floor(totalSpent / 10);
  const loyaltyTier = totalSpent >= 25000 ? "Platinum VIP" : "Gold Member";
  const pointsToNextTier = totalSpent >= 25000 ? 0 : Math.max(0, 2500 - loyaltyPoints);
  const progressPercent = Math.min(100, (loyaltyPoints / 2500) * 100);

  const orderStatuses = {
    בסטודיו: { label: "בעיצוב ושיבוץ בסטודיו", color: "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30" },
    "בקרת איכות": { label: "בבקרת איכות קפדנית", color: "bg-amber-50 text-amber-600 border-amber-200" },
    אריזה: { label: "נארז במארז מתנה", color: "bg-neutral-100 text-neutral-800 border-neutral-300" },
    "שליח VIP בדרך": { label: "הופץ עם שליח VIP", color: "bg-blue-50 text-blue-600 border-blue-200" },
    נמסר: { label: "נמסר בהצלחה", color: "bg-green-50 text-green-600 border-green-200" },
  };

  return (
    <>
      <Header />
      <main className="flex-grow pt-32 pb-24 bg-white text-[#111111] select-none font-sans">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <AnimatePresence mode="wait">
            {!user ? (
              // LOGGED OUT STATE
              <motion.div
                key="logged-out"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-md mx-auto my-12 border border-[#F1F1F1] p-8 sm:p-10 shadow-sm bg-[#F9F9F9]"
              >
                <div className="text-center space-y-3 mb-8">
                  <div className="w-12 h-12 rounded-full bg-[#111111] text-white flex items-center justify-center mx-auto border border-[#D4AF37]/35">
                    <User className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold">האזור האישי</h1>
                  <p className="text-xs font-light text-neutral-400">
                    כניסה מאובטחת באמצעות דואר אלקטרוני בלבד
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-500">כתובת אימייל:</label>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-white border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37] px-4 py-3 text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-500">שם מלא (לבחירה):</label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="שם הלקוחה"
                      className="w-full bg-white border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37] px-4 py-3 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#111111] py-3.5 text-xs font-semibold tracking-widest uppercase transition-all duration-500 rounded-none mt-2 flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>כניסה מהירה לחשבון</span>
                  </button>
                  
                  <div className="text-[10px] text-center text-neutral-400 font-light pt-2">
                    🔒 המערכת פועלת בשיטת Passwordless - ללא צורך בסיסמה
                  </div>
                </form>
              </motion.div>
            ) : (
              // LOGGED IN STATE
              <motion.div
                key="logged-in"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Header Welcome Dashboard Banner */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#F1F1F1] pb-6 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h1 className="font-serif text-3xl font-bold tracking-wide">שלום, {user.name}</h1>
                      <span className="text-[10px] uppercase font-bold text-[#D4AF37] border border-[#D4AF37]/35 px-2 py-0.5 flex items-center gap-1 font-sans">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{loyaltyTier}</span>
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-light font-sans">{user.email}</p>
                  </div>
                  
                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 text-xs font-light text-neutral-400 hover:text-red-500 transition-colors py-2 px-3 border border-[#F1F1F1] hover:border-red-200"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>התנתקות</span>
                  </button>
                </div>

                {/* Dashboard Sub-layouts splits */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column Navigation Tabs */}
                  <div className="lg:col-span-3 flex flex-row lg:flex-col border-b lg:border-b-0 lg:border-l border-[#F1F1F1] pb-4 lg:pb-0 lg:pl-6 gap-2 lg:gap-3 overflow-x-auto no-scrollbar whitespace-nowrap">
                    {[
                      { id: "orders", name: "ההזמנות שלי", icon: ShoppingBag },
                      { id: "profile", name: "פרטי מועדון", icon: MapPin },
                      { id: "loyalty", name: "מועדון VIP", icon: Award },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`flex items-center gap-2.5 px-4 py-3 text-xs font-medium transition-all duration-300 rounded-none w-full justify-start ${
                            activeTab === tab.id
                              ? "bg-[#111111] text-white font-bold"
                              : "text-neutral-500 hover:bg-[#F9F9F9] hover:text-[#111111]"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{tab.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Column Content Panel */}
                  <div className="lg:col-span-9">
                    <AnimatePresence mode="wait">
                      
                      {/* TAB 1: ORDER HISTORY */}
                      {activeTab === "orders" && (
                        <motion.div
                          key="tab-orders"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="space-y-6"
                        >
                          <h3 className="font-serif text-lg font-bold border-b border-[#F1F1F1] pb-2">הזמנות אחרונות</h3>
                          
                          {orders.length === 0 ? (
                            <div className="py-16 text-center border border-[#F1F1F1] bg-[#F9F9F9] space-y-4">
                              <Package className="w-10 h-10 text-neutral-300 mx-auto stroke-[1.2]" />
                              <p className="text-sm text-neutral-500 font-light">לא נמצאו הזמנות קודמות בחשבונך.</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {orders.map((order) => {
                                const isExpanded = expandedOrder === order.id;
                                const status = orderStatuses[order.status] || { label: order.status, color: "bg-neutral-100 text-neutral-600" };
                                return (
                                  <div
                                    key={order.id}
                                    className="border border-[#F1F1F1] overflow-hidden transition-all hover:shadow-sm"
                                  >
                                    {/* Order summary bar */}
                                    <div
                                      onClick={() => toggleExpandOrder(order.id)}
                                      className="p-5 flex flex-wrap justify-between items-center gap-4 bg-[#F9F9F9]/60 cursor-pointer select-none"
                                    >
                                      <div className="flex items-center gap-4">
                                        <div className="space-y-1">
                                          <span className="text-[10px] text-neutral-400 font-light uppercase block font-sans">מספר הזמנה:</span>
                                          <span className="text-xs font-semibold text-black font-sans">{order.id}</span>
                                        </div>
                                        <div className="space-y-1">
                                          <span className="text-[10px] text-neutral-400 font-light uppercase block font-sans">תאריך:</span>
                                          <span className="text-xs text-neutral-600 font-sans">{order.date}</span>
                                        </div>
                                        <div className="space-y-1">
                                          <span className="text-[10px] text-neutral-400 font-light uppercase block font-sans">סה״כ:</span>
                                          <span className="text-xs font-bold text-black">{formattedPrice(order.total)}</span>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-3">
                                        <span className={`text-[10px] font-semibold border px-2.5 py-1 ${status.color}`}>
                                          {status.label}
                                        </span>
                                        {isExpanded ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                                      </div>
                                    </div>

                                    {/* Expanded details */}
                                    <AnimatePresence>
                                      {isExpanded && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="overflow-hidden border-t border-[#F1F1F1]"
                                        >
                                          <div className="p-5 space-y-6">
                                            {/* Order tracking pipeline stepper */}
                                            <div className="py-4 border-b border-[#F1F1F1]">
                                              <span className="text-[10px] text-neutral-400 font-light uppercase block mb-3">מעקב הזמנה דינמי:</span>
                                              <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-medium">
                                                {[
                                                  { key: "בסטודיו", label: "עיצוב בסטודיו" },
                                                  { key: "בקרת איכות", label: "בקרת איכות" },
                                                  { key: "אריזה", label: "אריזה מהודרת" },
                                                  { key: "שליח VIP בדרך", label: "שליח VIP" },
                                                  { key: "נמסר", label: "נמסר" },
                                                ].map((step, idx, arr) => {
                                                  const statusesKeys = arr.map((s) => s.key);
                                                  const currentIdx = statusesKeys.indexOf(order.status);
                                                  const isCompleted = idx <= currentIdx;
                                                  return (
                                                    <div key={step.key} className="space-y-1.5">
                                                      <div className={`h-1.5 w-full ${isCompleted ? "bg-[#D4AF37]" : "bg-neutral-100"}`} />
                                                      <span className={isCompleted ? "text-black font-semibold" : "text-neutral-300 font-light"}>
                                                        {step.label}
                                                      </span>
                                                    </div>
                                                  );
                                                })}
                                              </div>
                                            </div>

                                            {/* Items details list */}
                                            <div className="space-y-4">
                                              <span className="text-[10px] text-neutral-400 font-light uppercase block">פריטים בהזמנה:</span>
                                              {order.items.map((item, index) => (
                                                <div key={index} className="flex gap-4 text-xs pb-4 border-b border-[#F9F9F9] last:border-0 last:pb-0">
                                                  <div className="w-16 h-20 bg-[#F1F1F1] overflow-hidden flex-shrink-0">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                  </div>
                                                  <div className="flex-1 flex flex-col justify-between">
                                                    <div className="space-y-0.5">
                                                      <h4 className="font-serif font-bold text-black">{item.name}</h4>
                                                      <p className="text-[10px] text-neutral-400">{item.englishName} | מידה: {item.size} | {item.variationName}</p>
                                                      
                                                      {item.customizations && (
                                                        <p className="text-[9px] text-[#D4AF37] font-semibold mt-1 font-sans">
                                                          קונפיגורציה: זהב {item.customizations.goldKarat}
                                                          {item.customizations.diamondCarat && ` | ${item.customizations.diamondCarat}`}
                                                          {item.customizations.diamondClarity && ` | ${item.customizations.diamondClarity}`}
                                                        </p>
                                                      )}
                                                    </div>
                                                    <div className="flex justify-between items-center text-neutral-500">
                                                      <span>כמות: {item.quantity}</span>
                                                      <span className="font-semibold text-black">{formattedPrice(item.price * item.quantity)}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>

                                            {/* Shipping and Gift wrappers info */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#F9F9F9] p-4 text-xs font-light text-neutral-600">
                                              <div className="space-y-1">
                                                <span className="font-bold text-black block mb-1">כתובת למשלוח VIP:</span>
                                                <p>{order.shippingDetails.firstName} {order.shippingDetails.lastName}</p>
                                                <p>{order.shippingDetails.address}, {order.shippingDetails.city}</p>
                                                <p>טלפון: {order.shippingDetails.phone}</p>
                                              </div>
                                              
                                              {order.giftWrapping && (
                                                <div className="space-y-1 border-r border-[#E5E5E5] pr-4">
                                                  <span className="font-bold text-[#D4AF37] block mb-1 flex items-center gap-1.5">
                                                    <Sparkles className="w-3.5 h-3.5" />
                                                    <span>שירות מתנה VIP פעיל:</span>
                                                  </span>
                                                  <p>סוג אריזה: {order.giftWrapping.packaging}</p>
                                                  {order.giftWrapping.greeting && (
                                                    <p className="italic font-serif text-neutral-500 mt-1">
                                                      "ברכה: {order.giftWrapping.greeting}"
                                                    </p>
                                                  )}
                                                </div>
                                              )}
                                            </div>

                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </motion.div>
                      )}

                      {/* TAB 2: VIP PROFILE DETAILS */}
                      {activeTab === "profile" && (
                        <motion.div
                          key="tab-profile"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="space-y-6"
                        >
                          <h3 className="font-serif text-lg font-bold border-b border-[#F1F1F1] pb-2">פרטי המועדון שלי</h3>
                          
                          <form onSubmit={handleSaveProfile} className="space-y-5 max-w-xl">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-neutral-500">שם מלא:</label>
                                <input
                                  type="text"
                                  required
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  className="w-full bg-white border border-[#F1F1F1] focus:outline-none focus:border-[#D4AF37] px-3.5 py-3 text-xs"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-neutral-500">כתובת אימייל (לא לשינוי):</label>
                                <input
                                  type="email"
                                  disabled
                                  value={user.email}
                                  className="w-full bg-neutral-50 border border-[#F1F1F1] text-neutral-400 px-3.5 py-3 text-xs cursor-not-allowed"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-neutral-500">טלפון:</label>
                                <input
                                  type="tel"
                                  value={editPhone}
                                  onChange={(e) => setEditPhone(e.target.value)}
                                  className="w-full bg-white border border-[#F1F1F1] focus:outline-none focus:border-[#D4AF37] px-3.5 py-3 text-xs"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-neutral-500">עיר:</label>
                                <input
                                  type="text"
                                  value={editCity}
                                  onChange={(e) => setEditCity(e.target.value)}
                                  className="w-full bg-white border border-[#F1F1F1] focus:outline-none focus:border-[#D4AF37] px-3.5 py-3 text-xs"
                                />
                              </div>
                              <div className="space-y-1.5 sm:col-span-2">
                                <label className="text-xs font-semibold text-neutral-500">כתובת מלאה למשלוח VIP:</label>
                                <input
                                  type="text"
                                  value={editAddress}
                                  onChange={(e) => setEditAddress(e.target.value)}
                                  className="w-full bg-white border border-[#F1F1F1] focus:outline-none focus:border-[#D4AF37] px-3.5 py-3 text-xs"
                                />
                              </div>
                            </div>

                            <div className="pt-2 flex items-center gap-4">
                              <button
                                type="submit"
                                className="bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#111111] px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-none"
                              >
                                שמירת פרטים
                              </button>
                              
                              <AnimatePresence>
                                {saveSuccess && (
                                  <motion.span
                                    initial={{ opacity: 0, x: 5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-xs text-green-600 font-semibold"
                                  >
                                    ✓ הפרטים נשמרו בהצלחה בסטודיו
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </div>
                          </form>
                        </motion.div>
                      )}

                      {/* TAB 3: VIP LOYALTY CLUB */}
                      {activeTab === "loyalty" && (
                        <motion.div
                          key="tab-loyalty"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="space-y-6"
                        >
                          <h3 className="font-serif text-lg font-bold border-b border-[#F1F1F1] pb-2">מועדון הלקוחות היוקרתי</h3>
                          
                          {/* Points Summary Card */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            
                            <div className="border border-[#F1F1F1] p-5 space-y-2 bg-[#F9F9F9]">
                              <Trophy className="w-5 h-5 text-[#D4AF37] stroke-[1.5]" />
                              <span className="text-[10px] text-neutral-400 font-light block uppercase">מעמד נוכחי:</span>
                              <span className="text-lg font-bold text-black block">{loyaltyTier}</span>
                            </div>

                            <div className="border border-[#F1F1F1] p-5 space-y-2 bg-[#F9F9F9]">
                              <Award className="w-5 h-5 text-[#D4AF37] stroke-[1.5]" />
                              <span className="text-[10px] text-neutral-400 font-light block uppercase">נקודות צבורות:</span>
                              <span className="text-lg font-bold text-[#D4AF37] block font-sans">{loyaltyPoints} PTS</span>
                            </div>

                            <div className="border border-[#F1F1F1] p-5 space-y-2 bg-[#F9F9F9]">
                              <Sparkles className="w-5 h-5 text-[#D4AF37] stroke-[1.5]" />
                              <span className="text-[10px] text-neutral-400 font-light block uppercase">סה״כ רכישות בסטודיו:</span>
                              <span className="text-lg font-bold text-black block">{formattedPrice(totalSpent)}</span>
                            </div>
                          </div>

                          {/* Progress Tier Bar */}
                          {loyaltyTier !== "Platinum VIP" && (
                            <div className="border border-[#F1F1F1] p-6 space-y-4">
                              <div className="flex justify-between text-xs">
                                <span className="font-semibold text-neutral-500">התקדמות לדרגת Platinum VIP:</span>
                                <span className="font-bold font-sans text-black">{loyaltyPoints} / 2500 PTS</span>
                              </div>
                              
                              <div className="w-full bg-neutral-100 h-2 rounded-none overflow-hidden relative">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${progressPercent}%` }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  className="bg-[#D4AF37] h-full"
                                />
                              </div>
                              
                              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                                צברת {loyaltyPoints} נקודות. נדרשות עוד {pointsToNextTier} נקודות נוספות (רכישות בשווי {formattedPrice(pointsToNextTier * 10)}) כדי לפתוח את הטבות דרגת Platinum VIP הכוללות תכשיט מתנה שנתי ביום ההולדת וגישה מוקדמת לקולקציות מוגבלות.
                              </p>
                            </div>
                          )}

                          {/* Membership Perks */}
                          <div className="space-y-4">
                            <h4 className="font-serif text-sm font-semibold">הטבות חברות המועדון שלך:</h4>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light text-neutral-600 leading-relaxed">
                              <div className="p-4 border border-[#F9F9F9] space-y-1.5">
                                <span className="font-bold text-black block">⚜️ צבירת נקודות (10% Cash Back)</span>
                                <p>על כל קנייה באתר או בסטודיו נצברות נקודות בשווי 10% משווי הרכישה למימוש ברכישות הבאות.</p>
                              </div>
                              <div className="p-4 border border-[#F9F9F9] space-y-1.5">
                                <span className="font-bold text-black block">🚚 שליח VIP מבוטח חינם</span>
                                <p>משלוח מהיר חינם ומבוטח עם שליח אישי ישירות לביתך לכל רכישה, ללא הגבלת סכום מינימום.</p>
                              </div>
                              <div className="p-4 border border-[#F9F9F9] space-y-1.5">
                                <span className="font-bold text-black block">💎 ניקוי ותחזוקת זהב שנתיים</span>
                                <p>טיפול פוליש מקצועי, חידוש רודיום וחיזוק שיבוצים שנתי חינם לכל תכשיטי יאיר שברשותך.</p>
                              </div>
                              <div className="p-4 border border-[#F9F9F9] space-y-1.5">
                                <span className="font-bold text-black block">📅 הזמנות לתערוכות סטודיו</span>
                                <p>הזמנות זוגיות אישיות לתצוגות אופנה פרטיות ואירועי השקה מיוחדים בגלריה שלנו בתל אביב.</p>
                              </div>
                            </div>
                          </div>

                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
      <Footer />
    </>
  );
}
