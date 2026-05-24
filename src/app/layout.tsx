import type { Metadata } from "next";
import { Assistant, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";
import VIPConcierge from "@/components/VIPConcierge";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  variable: "--font-frank-ruhl",
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "תכשיטי אלה | Ella Jewelry - Minimalist Tech Luxury",
  description: "חנות תכשיטי יוקרה בעיצוב מינימליסטי - זהב, יהלומים וקולקציות בלעדיות",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${assistant.variable} ${frankRuhl.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#111111] font-sans selection:bg-[#D4AF37]/20 selection:text-[#111111]">
        {children}
        <VIPConcierge />
      </body>
    </html>
  );
}
