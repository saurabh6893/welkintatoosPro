import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welkin Tattoos | Premium Tattoo Studio in Kalyan",
  description: "Experience the art of tattooing at Welkin Tattoos. A premium tattoo studio in Kalyan, Maharashtra offering custom, minimalist, and portrait tattoo designs.",
  keywords: [
    "tattoo studio in kalyan",
    "best tattoo artist kalyan",
    "custom tattoos kalyan",
    "tattoo parlor kalyan",
    "minimalist tattoo kalyan",
    "premium tattoo studio",
    "welkin tattoos",
  ],
  openGraph: {
    title: "Welkin Tattoos | Premium Tattoo Studio in Kalyan",
    description: "Premium tattoo studio in Kalyan offering custom and minimalist tattoos.",
    url: "https://welkintattoos.in",
    siteName: "Welkin Tattoos",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Welkin Tattoos | Premium Tattoo Studio in Kalyan",
    description: "Premium tattoo studio in Kalyan offering custom and minimalist tattoos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Welkin Tattoos",
    image: "https://welkintattoos.in/og-image.jpg", // Fallback/Placeholder
    "@id": "https://welkintattoos.in",
    url: "https://welkintattoos.in",
    telephone: "", // Placeholder as requested
    address: {
      "@type": "PostalAddress",
      streetAddress: "", // Placeholder
      addressLocality: "Kalyan",
      addressRegion: "Maharashtra",
      postalCode: "421301", // Generic Kalyan code
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.2437, // Generic Kalyan coordinates
      longitude: 73.1355,
    },
    description: "Premium tattoo studio in Kalyan offering custom and minimalist tattoos",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "11:00",
        closes: "22:00",
      },
    ],
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-black selection:text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Preloader />
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
