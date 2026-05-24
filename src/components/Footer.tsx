import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#F1F1F1] text-[#111111] select-none font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-wider">תכשיטי אלה</span>
              <span className="text-[8px] tracking-[0.25em] text-neutral-400 uppercase font-light -mt-0.5">
                ELLA JEWELRY
              </span>
            </div>
            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              מותג תכשיטי יוקרה בעיצוב מינימליסטי מודרני. אנו מתמקדים באיכות אבסולוטית, חומרי גלם מובחרים ושירות VIP אישי ללא פשרות.
            </p>
            <div className="flex space-x-reverse space-x-3 text-neutral-400">
              <a href="#" className="hover:text-[#D4AF37] transition-colors" aria-label="אינסטגרם">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors" aria-label="פייסבוק">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#111111]">ניווט מהיר</h4>
            <ul className="space-y-2 text-xs text-neutral-500 font-light">
              <li>
                <Link href="/category/rings" className="hover:text-[#D4AF37] transition-colors">
                  טבעות
                </Link>
              </li>
              <li>
                <Link href="/category/necklaces" className="hover:text-[#D4AF37] transition-colors">
                  שרשראות
                </Link>
              </li>
              <li>
                <Link href="/category/earrings" className="hover:text-[#D4AF37] transition-colors">
                  עגילים
                </Link>
              </li>
              <li>
                <Link href="/category/bracelets" className="hover:text-[#D4AF37] transition-colors">
                  צמידים
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Showroom details */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#111111]">שירות לקוחות וסטודיו</h4>
            <ul className="space-y-3.5 text-xs text-neutral-500 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>שדרות רוטשילד 46, תל אביב-יפו (בתיאום מראש)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span dir="ltr">03-9485721</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>info@yairjewelry.co.il</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#111111]">ניוזלטר יוקרה</h4>
            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              הירשמי לקבלת עדכונים על קולקציות חדשות, מכירות מוקדמות ותכנים בלעדיים.
            </p>
            <div className="flex border border-[#111111]/10 rounded-none overflow-hidden">
              <input
                type="email"
                placeholder="כתובת האימייל שלך"
                className="w-full bg-white px-3 py-2 text-xs focus:outline-none placeholder-neutral-300"
              />
              <button className="bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#111111] text-xs font-semibold px-4 transition-all duration-300">
                הרשמה
              </button>
            </div>
          </div>
        </div>

        {/* Divider and payment logos */}
        <div className="mt-12 pt-8 border-t border-[#F1F1F1] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-neutral-400 font-light font-sans">
            &copy; {currentYear} תכשיטי אלה בע״מ. כל הזכויות שמורות. Minimalist Tech Luxury.
          </p>
          
          {/* MOCKED PAYMENT BRAND ICONS */}
          <div className="flex items-center gap-3 text-neutral-400 select-none">
            <span className="text-[9px] uppercase tracking-wider font-semibold mr-1">תשלום מאובטח ב-</span>
            <div className="flex gap-2 text-[10px] font-sans font-extrabold tracking-tight">
              <span className="border border-[#F1F1F1] px-1.5 py-0.5 text-neutral-500 bg-white">BIT</span>
              <span className="border border-[#F1F1F1] px-1.5 py-0.5 text-neutral-500 bg-white">Apple Pay</span>
              <span className="border border-[#F1F1F1] px-1.5 py-0.5 text-neutral-500 bg-white">Google Pay</span>
              <span className="border border-[#F1F1F1] px-1.5 py-0.5 text-[#111111] bg-white font-serif italic">VISA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
