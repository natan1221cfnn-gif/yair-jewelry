import { PRODUCTS } from "@/data/products";
import CategoryPageClient from "./CategoryPageClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "rings" },
    { slug: "necklaces" },
    { slug: "earrings" },
    { slug: "bracelets" }
  ];
}

const CATEGORY_META: Record<string, { title: string; subtitle: string; image: string }> = {
  rings: {
    title: "טבעות יוקרה",
    subtitle: "טבעות סוליטר, טבעות אירוסין בעיצובים מפותלים בזהב 14K ו-18K משובצות יהלומים.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1400&auto=format&fit=crop",
  },
  necklaces: {
    title: "שרשראות ותליונים",
    subtitle: "שרשראות זהב לבן וצהוב, פניני מים מתוקים ועיטורי יהלומים זעירים בעיצוב אצילי.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1400&auto=format&fit=crop",
  },
  earrings: {
    title: "עגילי יוקרה",
    subtitle: "עגילי חישוק רחבים, עגילי טיפות משובצות אבני טופז כחולות המקרינות אור ויוקרה.",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1400&auto=format&fit=crop",
  },
  bracelets: {
    title: "צמידי אצילות",
    subtitle: "צמידי טניס יוקרתיים ועיצובים מלוטשים בזהב לבן וצהוב המעניקים שובל של זוהר.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1400&auto=format&fit=crop",
  },
};

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const meta = CATEGORY_META[slug];

  if (!meta) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-[#111111] font-sans">
        <h1 className="font-serif text-2xl mb-4">הקטגוריה לא נמצאה</h1>
        <a
          href="/"
          className="px-6 py-2.5 bg-[#111111] text-white hover:bg-[#D4AF37] hover:text-[#111111] transition-all text-xs tracking-widest uppercase"
        >
          חזרה לחנות
        </a>
      </div>
    );
  }

  // Filter products by category
  const filteredProducts = PRODUCTS.filter((p) => p.category === slug);

  return (
    <>
      <Header />
      <main className="flex-grow">
        <CategoryPageClient
          slug={slug}
          title={meta.title}
          subtitle={meta.subtitle}
          image={meta.image}
          initialProducts={filteredProducts}
        />
      </main>
      <Footer />
    </>
  );
}
