import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — biuro nieruchomości Głogów`,
    template: `%s · ${site.name}`,
  },
  description:
    "Lokalne biuro nieruchomości w Głogowie. Sprzedaż, zakup i wynajem mieszkań, domów i działek. Ludzie, których znasz — ponad 254 opinie 5★.",
  keywords: [
    "biuro nieruchomości Głogów",
    "mieszkania Głogów",
    "domy Polkowice",
    "działki Radwanice",
    "nieruchomości Głogów",
    "FREE HOME",
  ],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: site.fullName,
    title: `${site.fullName} — biuro nieruchomości Głogów`,
    description:
      "Lokalne biuro nieruchomości w Głogowie. Ludzie, których znasz — ponad 254 opinie 5★.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-forest-950 text-cream">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
