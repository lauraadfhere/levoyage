import type { Metadata } from "next";
import { Barlow, Nunito_Sans } from "next/font/google";
import "./globals.css";
import "./dashboard-enhancements.css";
import { CookieBanner } from "@/components/cookie-banner";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-barlow",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://piolian.com"),
  title: { default: "Piolian | Discover Algeria, your way", template: "%s | Piolian" },
  description: "Discover Algeria with local tours, stays, destinations, travel circuits and trusted agency offers.",
  keywords: ["Algeria travel", "Algeria tours", "Algeria hotels", "Sahara travel", "Algeria destinations", "Piolian"],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { type: "website", url: "/", siteName: "Piolian", title: "Piolian | Discover Algeria, your way", description: "Plan stays, tours and unforgettable journeys across Algeria." },
  twitter: { card: "summary_large_image", title: "Piolian | Discover Algeria, your way", description: "Plan stays, tours and unforgettable journeys across Algeria." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${barlow.variable} ${nunitoSans.variable}`} suppressHydrationWarning>
      <body>{children}<CookieBanner /></body>
    </html>
  );
}
