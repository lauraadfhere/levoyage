import type { Metadata } from "next";
import { Barlow, Nunito_Sans } from "next/font/google";
import "./globals.css";
import "./dashboard-enhancements.css";
import { CookieBanner } from "@/components/cookie-banner";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: [
    "Le Voyage",
    "LeVoyage.dz",
    "Algeria travel",
    "Algeria tours",
    "Algeria hotels",
    "Sahara travel",
    "Algeria destinations",
    "Algeria wilayas",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  icons: { icon: "/levoyage.png", apple: "/levoyage.png" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [{ url: "/levoyage.png", width: 2172, height: 724, alt: `${SITE_NAME} — Algeria travel platform` }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/levoyage.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${barlow.variable} ${nunitoSans.variable}`} suppressHydrationWarning>
      <body>{children}<CookieBanner /></body>
    </html>
  );
}
