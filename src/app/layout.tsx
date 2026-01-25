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
  title: "Welkin Tattoos | Premium Tattoo Art Studio",
  description: "Experience the art of tattooing with Welkin Tattoos. A premium studio for custom, artistic, and minimal tattoo designs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-black selection:text-white`}
      >
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
