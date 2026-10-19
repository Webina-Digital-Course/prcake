import type { Metadata } from "next";
import { DM_Sans, Lilita_One } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rollin-bakery.example"),
  title: {
    default: "ROLLIN — Boulangerie artisanale",
    template: "%s — ROLLIN",
  },
  description:
    "Boulangerie artisanale ROLLIN : pains au levain, viennoiseries pur beurre, gâteaux et biscuits faits main, préparés chaque matin à partir de zéro.",
  openGraph: {
    title: "ROLLIN — Boulangerie artisanale",
    description:
      "Fait main, de zéro, avec amour. Pains, viennoiseries, gâteaux et biscuits artisanaux.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${lilita.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <a
            href="#contenu"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-bakery-yellow focus:px-5 focus:py-3 focus:font-bold focus:text-chocolate"
          >
            Aller au contenu
          </a>
          <AnnouncementBar />
          <Header />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
