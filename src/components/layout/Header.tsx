"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { name: "The Artist", href: "#master-artist" },
  { name: "Styles", href: "#styles" },
  { name: "Gallery", href: "#gallery" },
  { name: "Philosophy", href: "#philosophy" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
          isScrolled
            ? "bg-white/80 backdrop-blur-md py-4 border-black/5"
            : "bg-transparent py-6"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="z-50 group flex flex-col items-start leading-none">
             <span className="text-2xl font-bold tracking-[0.2em] uppercase font-sans group-hover:opacity-70 transition-opacity duration-300">
               Welkin
             </span>
             <span className="text-[0.5rem] uppercase tracking-[0.3em] font-serif italic ml-1 opacity-60">
                Tattoo Studio
             </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.href.replace("#", ""));
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="text-sm font-medium tracking-wide text-black/80 hover:text-black transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById("booking");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="ml-4 px-6 py-2 bg-black text-white text-xs uppercase tracking-widest font-medium hover:bg-black/80 transition-all duration-300 rounded-sm"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
             {isMobileMenuOpen ? (
               <X className="w-6 h-6" />
             ) : (
               <Menu className="w-6 h-6" />
             )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-2xl font-light tracking-widest uppercase"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      const target = document.getElementById(item.href.replace("#", ""));
                      if (target) {
                         target.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
               <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                   <Link
                    href="#booking"
                    className="mt-8 px-8 py-3 bg-black text-white text-sm uppercase tracking-widest"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      const target = document.getElementById("booking");
                      if (target) {
                         target.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Book Appointment
                  </Link>
                </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
