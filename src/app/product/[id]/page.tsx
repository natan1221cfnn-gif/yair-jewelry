import { PRODUCTS } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = PRODUCTS.find((p) => p.id === resolvedParams.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-[#111111] font-sans">
        <h1 className="font-serif text-2xl mb-4">התכשיט לא נמצא</h1>
        <a
          href="/"
          className="px-6 py-2.5 bg-[#111111] text-white hover:bg-[#D4AF37] hover:text-[#111111] transition-all text-xs tracking-widest uppercase"
        >
          חזרה לחנות
        </a>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow">
        <ProductDetailClient product={product} />
      </main>
      <Footer />
    </>
  );
}
