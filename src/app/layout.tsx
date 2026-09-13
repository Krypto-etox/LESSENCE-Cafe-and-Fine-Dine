import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { NoiseOverlay } from "@/components/common/NoiseOverlay";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "L’ÉSSENCE | Haute Gastronomie & Café Atelier",
  description:
    "An immersive sensory sanctuary where artisanal micro-roastery alchemy meets avant-garde Michelin-caliber fine dining under dramatic ambient shadows.",
  keywords: [
    "fine dining",
    "Michelin star restaurant",
    "haute cuisine",
    "specialty coffee atelier",
    "gastronomy",
    "L'Essence",
    "luxury dining",
  ],
  authors: [{ name: "L’ÉSSENCE Atelier" }],
  openGraph: {
    title: "L’ÉSSENCE | Haute Gastronomie & Café Atelier",
    description:
      "Sensory alchemy by dawn. Avant-garde gastronomy by dusk. Discover an Awwwards-winning culinary journey.",
    url: "https://lessence-atelier.com",
    siteName: "L’ÉSSENCE",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0C0C0E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakartaSans.variable} bg-onyx-900 text-silk-100 selection:bg-champagne-500 selection:text-onyx-950`}
    >
      <body className="min-h-screen bg-onyx-900 font-sans text-silk-100 antialiased overflow-x-hidden selection:bg-champagne-500 selection:text-onyx-900">
        <SmoothScrollProvider>
          <NoiseOverlay />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
