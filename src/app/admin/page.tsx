"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart3,
  ShoppingBag,
  Package,
  Users,
  Settings,
  ArrowRight,
  TrendingUp,
  ArrowUpRight,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Truck,
  Clock,
  Sparkles,
  Link2,
  Bell
} from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Mock Orders
interface Order {
  id: string;
  customerName: string;
  date: string;
  items: string;
  total: number;
  status: "pending" | "shipped" | "delivered";
}

const INITIAL_ORDERS: Order[] = [
  { id: "ORD-9481", customerName: "שרה לוי", date: "2026-05-24", items: "טבעת אוריאנה (1)", total: 10900, status: "pending" },
  { id: "ORD-9480", customerName: "עדי כהן", date: "2026-05-23", items: "שרשרת ונציה (1), עגילי חישוק (1)", total: 7700, status: "shipped" },
  { id: "ORD-9479", customerName: "רחל מזרחי", date: "2026-05-22", items: "צמיד טניס אינפיניטי (1)", total: 24500, status: "delivered" },
  { id: "ORD-9478", customerName: "טלי אברהם", date: "2026-05-21", items: "עגילי טיפות טופז (1)", total: 3200, status: "delivered" },
  { id: "ORD-9477", customerName: "דנה שחר", date: "2026-05-20", items: "טבעת קוסמוס (2)", total: 5600, status: "shipped" }
];

// Mock Chart Data
const REVENUE_DATA = [
  { month: "ינואר", revenue: 84000 },
  { month: "פברואר", revenue: 95000 },
  { month: "מרץ", revenue: 128000 },
  { month: "אפריל", revenue: 142000 },
  { month: "מאי", revenue: 184200 }
];

// Mock CRM Data
interface Customer {
  id: string;
  name: string;
  email: string;
  ordersCount: number;
  ltv: number;
  segment: "VIP" | "recurring" | "abandoned";
}

const CUSTOMERS_DATA: Customer[] = [
  { id: "c1", name: "רונית ביטון", email: "ronit@gmail.com", ordersCount: 5, ltv: 48900, segment: "VIP" },
  { id: "c2", name: "מיכל אשכנזי", email: "michal.a@yahoo.com", ordersCount: 3, ltv: 18600, segment: "recurring" },
  { id: "c3", name: "נועה ברק", email: "noa.b@outlook.com", ordersCount: 1, ltv: 4500, segment: "recurring" },
  { id: "c4", name: "קרן שמיר", email: "keren.s@gmail.com", ordersCount: 0, ltv: 0, segment: "abandoned" },
  { id: "c5", name: "יעל גולדנברג", email: "yael.gold@vip.co.il", ordersCount: 7, ltv: 72000, segment: "VIP" }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"analytics" | "orders" | "inventory" | "crm" | "integrations">("analytics");
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [customers, setCustomers] = useState<Customer[]>(CUSTOMERS_DATA);

  // Webhooks configs mock
  const [makeWebhookUrl, setMakeWebhookUrl] = useState("https://hook.us1.make.com/xxxxxxxxx");
  const [isMakeConnected, setIsMakeConnected] = useState(true);
  const [isHfdConnected, setIsHfdConnected] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Quick stats calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 154200; // Add previous months
  const activeOrdersCount = orders.filter((o) => o.status !== "delivered").length;
  const totalVIPs = customers.filter((c) => c.segment === "VIP").length;

  const handleUpdateStock = (productId: string, newStock: number) => {
    setProductsList(
      productsList.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p))
    );
  };

  const handleUpdateOrderStatus = (orderId: string, status: "pending" | "shipped" | "delivered") => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col lg:flex-row text-[#111111] font-sans selection:bg-[#D4AF37]/20 selection:text-[#111111] select-none">
      
      {/* SIDEBAR (Right side in RTL) */}
      <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-l border-[#F1F1F1] bg-white flex flex-col justify-between p-6 h-auto lg:h-screen lg:sticky lg:top-0">
        <div className="space-y-8">
          
          {/* Dashboard Logo */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-wider">תכשיטי אלה</span>
              <span className="text-[8px] tracking-[0.25em] text-[#D4AF37] font-semibold uppercase -mt-0.5">
                פאנל ניהול ומלאי
              </span>
            </div>
            <Link href="/" className="p-1.5 hover:bg-[#F1F1F1] transition-colors rounded-full" title="חזרה לחנות">
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {[
              { id: "analytics", name: "אנליטיקה ורווחים", icon: BarChart3 },
              { id: "orders", name: "הזמנות ומכירות", icon: ShoppingBag, badge: activeOrdersCount },
              { id: "inventory", name: "ניהול מלאי וקטלוג", icon: Package },
              { id: "crm", name: "ניהול לקוחות CRM", icon: Users },
              { id: "integrations", name: "חיבורים ו-Webhooks", icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-3 text-xs font-semibold tracking-wider transition-all duration-300 rounded-none border-r-2 ${
                    activeTab === item.id
                      ? "border-[#D4AF37] bg-[#D4AF37]/5 text-[#D4AF37]"
                      : "border-transparent text-neutral-500 hover:text-black hover:bg-neutral-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-1.5 py-0.5 bg-[#D4AF37] text-white text-[9px] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-[#F1F1F1] text-[10px] text-neutral-400 font-light hidden lg:block">
          מערכת ניהול תכשיטי אלה v2.1<br />
          RTL Native Custom UI
        </div>
      </aside>

      {/* MAIN MAIN PANEL (Left side in RTL) */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto h-screen bg-[#FFFFFF]">
        
        {/* Dynamic Headers */}
        <div className="pb-6 border-b border-[#F1F1F1] mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide">
              {activeTab === "analytics" && "אנליטיקה ודו״חות כספיים"}
              {activeTab === "orders" && "ניהול הזמנות ומעקב שליחויות"}
              {activeTab === "inventory" && "ניהול מלאי וקטלוג מוצרים"}
              {activeTab === "crm" && "ניהול לקוחות (CRM)"}
              {activeTab === "integrations" && "הגדרות אינטגרציה וחיבורים"}
            </h1>
            <p className="text-xs text-neutral-400 font-light mt-1">
              {activeTab === "analytics" && "נתוני מכירות וביצועים בזמן אמת"}
              {activeTab === "orders" && "עדכון סטטוסים והפקת תעודות משלוח"}
              {activeTab === "inventory" && "עדכון וריאציות, כמויות ומחירי מבצע"}
              {activeTab === "crm" && "פילוח קהלים, עגלות נטושות ומודל נאמנות VIP"}
              {activeTab === "integrations" && "חיבור ל-Make, וואטסאפ אוטומטי וחברות משלוחים ישראליות"}
            </p>
          </div>
          
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-green-50 text-green-600 border border-green-100 text-[10px] uppercase font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              חיבור פעיל למאגר
            </span>
          </div>
        </div>

        {/* 1. ANALYTICS VIEW */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            
            {/* Cards KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1 */}
              <div className="border border-[#F1F1F1] p-5 space-y-2">
                <div className="flex justify-between items-center text-neutral-400">
                  <span className="text-xs font-semibold tracking-wider">מחזור מכירות חודשי</span>
                  <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <h3 className="font-serif text-2xl font-bold">{formattedPrice(totalRevenue)}</h3>
                <p className="text-[10px] text-green-500 font-semibold flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" />
                  <span>+12.4% בהשוואה לחודש שעבר</span>
                </p>
              </div>

              {/* Card 2 */}
              <div className="border border-[#F1F1F1] p-5 space-y-2">
                <div className="flex justify-between items-center text-neutral-400">
                  <span className="text-xs font-semibold tracking-wider">ערך הזמנה ממוצע (AOV)</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <h3 className="font-serif text-2xl font-bold">{formattedPrice(9300)}</h3>
                <p className="text-[10px] text-neutral-500 font-light">מבוסס על 28 עסקאות אחרונות</p>
              </div>

              {/* Card 3 */}
              <div className="border border-[#F1F1F1] p-5 space-y-2">
                <div className="flex justify-between items-center text-neutral-400">
                  <span className="text-xs font-semibold tracking-wider">המרות באתר (Conversion)</span>
                  <BarChart3 className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <h3 className="font-serif text-2xl font-bold">3.12%</h3>
                <p className="text-[10px] text-green-500 font-semibold flex items-center gap-0.5">
                  <span>+0.42% מהשבוע שעבר</span>
                </p>
              </div>

              {/* Card 4 */}
              <div className="border border-[#F1F1F1] p-5 space-y-2">
                <div className="flex justify-between items-center text-neutral-400">
                  <span className="text-xs font-semibold tracking-wider">לקוחות VIP רשומים</span>
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <h3 className="font-serif text-2xl font-bold">{totalVIPs}</h3>
                <p className="text-[10px] text-neutral-500 font-light">LTV גבוה מ-30,000 ₪</p>
              </div>

            </div>

            {/* Recharts Area Chart */}
            <div className="border border-[#F1F1F1] p-6 space-y-4">
              <h3 className="font-serif text-lg font-bold">גרף הכנסות חצי-שנתי (באלפי שקלים)</h3>
              
              <div className="h-80 w-full font-sans">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={REVENUE_DATA}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F1F1" />
                      <XAxis dataKey="month" stroke="#A3A3A3" fontSize={11} tickLine={false} />
                      <YAxis stroke="#A3A3A3" fontSize={11} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #F1F1F1",
                          fontSize: "12px",
                          fontFamily: "var(--font-assistant)",
                          textAlign: "right"
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#D4AF37"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-xs text-neutral-400 font-light">
                    טוען דיאגרמה...
                  </div>
                )}
              </div>
            </div>

            {/* View Stats detail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Product Views stats */}
              <div className="border border-[#F1F1F1] p-6 space-y-4">
                <h3 className="font-serif text-lg font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>הכי מבוקשים השבוע (צפיות בקטגוריה)</span>
                </h3>
                <div className="divide-y divide-[#F1F1F1] text-xs">
                  {productsList.slice(0, 3).map((p) => (
                    <div key={p.id} className="py-3 flex justify-between items-center">
                      <span className="font-serif font-medium">{p.name}</span>
                      <span className="text-neutral-500 font-light">1,490 ביקורים</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion Stats */}
              <div className="border border-[#F1F1F1] p-6 space-y-4">
                <h3 className="font-serif text-lg font-bold">יחסי המרות וסל קניות</h3>
                <div className="space-y-4 text-xs font-light text-neutral-500">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[#111111] font-semibold">
                      <span>צפו בעמודי מוצר (PDP)</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-[#F1F1F1] h-1.5">
                      <div className="bg-[#D4AF37] h-1.5" style={{ width: "85%" }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[#111111] font-semibold">
                      <span>הוסיפו לסל הקניות</span>
                      <span>15%</span>
                    </div>
                    <div className="w-full bg-[#F1F1F1] h-1.5">
                      <div className="bg-[#D4AF37] h-1.5" style={{ width: "15%" }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[#111111] font-semibold">
                      <span>התקדמו לתשלום (Checkout)</span>
                      <span>3.12%</span>
                    </div>
                    <div className="w-full bg-[#F1F1F1] h-1.5">
                      <div className="bg-[#111111] h-1.5" style={{ width: "3.12%" }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 2. ORDERS LIST VIEW */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="border border-[#F1F1F1] overflow-hidden">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-[#F9F9F9] font-medium border-b border-[#F1F1F1] text-neutral-400">
                    <th className="py-3 px-4">מזהה הזמנה</th>
                    <th className="py-3 px-4">שם לקוח</th>
                    <th className="py-3 px-4">תאריך</th>
                    <th className="py-3 px-4">פריטים</th>
                    <th className="py-3 px-4">סה״כ לתשלום</th>
                    <th className="py-3 px-4">סטטוס משלוח</th>
                    <th className="py-3 px-4 text-left">שינוי סטטוס</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F1F1] font-sans">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="py-4 px-4 font-bold">{order.id}</td>
                      <td className="py-4 px-4">{order.customerName}</td>
                      <td className="py-4 px-4 text-neutral-500">{order.date}</td>
                      <td className="py-4 px-4 text-neutral-500 line-clamp-1">{order.items}</td>
                      <td className="py-4 px-4 font-bold">{formattedPrice(order.total)}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-semibold border ${
                            order.status === "pending"
                              ? "bg-amber-50 text-amber-600 border-amber-200"
                              : order.status === "shipped"
                              ? "bg-blue-50 text-blue-600 border-blue-200"
                              : "bg-green-50 text-green-600 border-green-200"
                          }`}
                        >
                          {order.status === "pending" && "ממתין לטיפול"}
                          {order.status === "shipped" && "נשלח בשליחות"}
                          {order.status === "delivered" && "נמסר ללקוח"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-left">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, "shipped")}
                            className="p-1 hover:bg-[#F1F1F1] text-blue-500 rounded-full"
                            title="סמן כנשלח"
                          >
                            <Truck className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, "delivered")}
                            className="p-1 hover:bg-[#F1F1F1] text-green-500 rounded-full"
                            title="סמן כנמסר"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, "pending")}
                            className="p-1 hover:bg-[#F1F1F1] text-amber-500 rounded-full"
                            title="סמן כממתין"
                          >
                            <Clock className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. INVENTORY & CATALOG VIEW */}
        {activeTab === "inventory" && (
          <div className="space-y-6">
            <div className="border border-[#F1F1F1] overflow-hidden">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-[#F9F9F9] font-medium border-b border-[#F1F1F1] text-neutral-400">
                    <th className="py-3 px-4">שם התכשיט</th>
                    <th className="py-3 px-4">קטגוריה</th>
                    <th className="py-3 px-4">מחיר רגיל</th>
                    <th className="py-3 px-4">מחיר מבצע</th>
                    <th className="py-3 px-4">וריאציות</th>
                    <th className="py-3 px-4">מלאי במערכת</th>
                    <th className="py-3 px-4 text-left">עדכון כמויות</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F1F1] font-sans">
                  {productsList.map((product) => (
                    <tr key={product.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img src={product.images[0]} alt="" className="w-8 h-10 object-cover" />
                          <div className="flex flex-col">
                            <span className="font-serif font-bold text-sm">{product.name}</span>
                            <span className="text-[10px] text-neutral-400 font-light">{product.englishName}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-neutral-500">{product.categoryHebrew}</td>
                      <td className="py-4 px-4 font-semibold">{formattedPrice(product.price)}</td>
                      <td className="py-4 px-4 text-red-500 font-semibold">
                        {product.salePrice ? formattedPrice(product.salePrice) : "-"}
                      </td>
                      <td className="py-4 px-4 text-neutral-500">{product.variations.length} מתכות</td>
                      <td className="py-4 px-4">
                        <span
                          className={`font-semibold ${
                            product.stock <= 2 ? "text-red-500 font-bold" : "text-neutral-700"
                          }`}
                        >
                          {product.stock} יחידות
                        </span>
                      </td>
                      <td className="py-4 px-4 text-left">
                        <div className="flex justify-end items-center gap-1 font-sans">
                          <button
                            onClick={() => handleUpdateStock(product.id, product.stock - 1)}
                            className="w-6 h-6 border border-[#F1F1F1] hover:bg-neutral-50 flex items-center justify-center font-bold"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-semibold">{product.stock}</span>
                          <button
                            onClick={() => handleUpdateStock(product.id, product.stock + 1)}
                            className="w-6 h-6 border border-[#F1F1F1] hover:bg-neutral-50 flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. CRM CLIENTS VIEW */}
        {activeTab === "crm" && (
          <div className="space-y-6">
            <div className="border border-[#F1F1F1] overflow-hidden">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-[#F9F9F9] font-medium border-b border-[#F1F1F1] text-neutral-400">
                    <th className="py-3 px-4">שם לקוח</th>
                    <th className="py-3 px-4">אימייל</th>
                    <th className="py-3 px-4">מספר הזמנות</th>
                    <th className="py-3 px-4">מחזור רכישות (LTV)</th>
                    <th className="py-3 px-4">סגמנטציה</th>
                    <th className="py-3 px-4 text-left">פעולות שיווקיות</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F1F1] font-sans">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="py-4 px-4 font-bold">{c.name}</td>
                      <td className="py-4 px-4 text-neutral-500 font-sans">{c.email}</td>
                      <td className="py-4 px-4 text-neutral-500">{c.ordersCount} הזמנות</td>
                      <td className="py-4 px-4 font-semibold text-black">{formattedPrice(c.ltv)}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-0.5 text-[9px] font-bold uppercase ${
                            c.segment === "VIP"
                              ? "bg-black text-[#D4AF37] border border-[#D4AF37]"
                              : c.segment === "recurring"
                              ? "bg-neutral-100 text-neutral-800"
                              : "bg-red-50 text-red-500 border border-red-100"
                          }`}
                        >
                          {c.segment === "VIP" && "VIP לקוחה מועדפת"}
                          {c.segment === "recurring" && "קונה חוזרת"}
                          {c.segment === "abandoned" && "נטשה עגלה"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-left">
                        <button
                          onClick={() => alert(`נשלח וואטסאפ אוטומטי שיווקי ל-${c.name}`)}
                          className="px-3 py-1 bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#111111] text-[10px] font-semibold transition-all duration-300 rounded-none"
                        >
                          {c.segment === "abandoned" ? "שלחי תזכורת עגלה" : "שלחי הטבת VIP"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. INTEGRATIONS VIEW */}
        {activeTab === "integrations" && (
          <div className="space-y-8 max-w-2xl">
            
            {/* Make.com Integrations */}
            <div className="border border-[#F1F1F1] p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-[#F1F1F1] pb-3">
                <div className="flex items-center gap-2">
                  <Link2 className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="font-serif text-lg font-bold">אינטגרציה ל-Make (מערכת אוטומציה)</h3>
                </div>
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-bold ${
                    isMakeConnected ? "bg-green-50 text-green-600" : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {isMakeConnected ? "מחובר בהצלחה" : "מנותק"}
                </span>
              </div>
              
              <p className="text-xs text-neutral-500 font-light leading-relaxed">
                מערכת אוטומציה זו מופעלת על ידי Webhooks ומבצעת שליחת וואטסאפ אוטומטי במקרה של נטישת עגלה של לקוחות VIP, פתיחת קבוצות תמיכה ועדכון שירות הלקוחות בסטודיו.
              </p>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-500">Make Webhook URL Endpoint:</label>
                <input
                  type="text"
                  value={makeWebhookUrl}
                  onChange={(e) => setMakeWebhookUrl(e.target.value)}
                  className="w-full bg-[#F9F9F9] border border-[#F1F1F1] focus:outline-none focus:border-[#D4AF37] px-3.5 py-2.5 text-xs font-sans"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsMakeConnected(!isMakeConnected)}
                  className={`px-4 py-2 text-xs font-semibold rounded-none transition-all duration-300 border ${
                    isMakeConnected
                      ? "border-red-200 text-red-500 hover:bg-red-50 bg-white"
                      : "border-[#111111] bg-[#111111] text-white hover:bg-[#D4AF37] hover:text-[#111111]"
                  }`}
                >
                  {isMakeConnected ? "נתק חיבור Webhook" : "חבר Webhook"}
                </button>
                
                <button
                  type="button"
                  onClick={() => alert("בדיקת חיבור Webhook נשלחה בהצלחה ל-Make!")}
                  disabled={!isMakeConnected}
                  className="px-4 py-2 border border-[#F1F1F1] hover:border-neutral-300 text-xs font-semibold bg-white disabled:opacity-50 disabled:pointer-events-none transition-colors"
                >
                  בדיקת סימולציה (Test Hook)
                </button>
              </div>
            </div>

            {/* Israeli Courier Integrations (HFD, Lion, etc.) */}
            <div className="border border-[#F1F1F1] p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-[#F1F1F1] pb-3">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="font-serif text-lg font-bold">חברת שליחויות ישראלית (HFD API)</h3>
                </div>
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-bold ${
                    isHfdConnected ? "bg-green-50 text-green-600" : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {isHfdConnected ? "מחובר בהצלחה" : "לא מוגדר"}
                </span>
              </div>
              
              <p className="text-xs text-neutral-500 font-light leading-relaxed">
                חיבור ל-HFD מאפשר הפקת מדבקות משלוח ורישום תעודות משלוח במערכת השליחים באופן אוטומטי לחלוטין בעת סימון הזמנה כ״נשלחה״.
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsHfdConnected(!isHfdConnected)}
                  className="px-4 py-2 border border-[#111111] bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#111111] text-xs font-semibold rounded-none transition-all duration-300"
                >
                  {isHfdConnected ? "נתק חיבור HFD Courier" : "הגדר API Key וחיבור למערכת"}
                </button>
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
