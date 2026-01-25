"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (footerRef.current && contentRef.current) {
        gsap.fromTo(contentRef.current, 
            { y: 60, opacity: 0, filter: "blur(10px)" },
            {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                ease: "none",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 95%",
                    end: "top 10%",
                    scrub: 1,
                }
            }
        );
    }

    return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-white text-black py-32 border-t border-black/5 overflow-hidden">
      <div ref={contentRef} className="container mx-auto px-6 will-change-transform">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2 space-y-8">
             <Link href="/" className="block">
               <span className="text-4xl font-black tracking-[-0.04em] uppercase font-sans leading-none">
                 WELKIN
               </span>
             </Link>
             <p className="max-w-md text-sm text-black/60 leading-loose tracking-wide font-light">
               We create more than just tattoos; we craft permanent art that resonates with your soul.
               A premium studio dedicated to minimalist perfection and artistic expression.
             </p>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold text-black/40">Studio</h4>
            <ul className="space-y-5">
              <li>
                <Link href="#artist" className="text-sm font-light text-black/70 hover:text-black transition-colors tracking-wide">
                  The Artist
                </Link>
              </li>
              <li>
                <Link href="#styles" className="text-sm font-light text-black/70 hover:text-black transition-colors tracking-wide">
                  Styles
                </Link>
              </li>
               <li>
                <Link href="#philosophy" className="text-sm font-light text-black/70 hover:text-black transition-colors tracking-wide">
                  Philosophy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold text-black/40">Connect</h4>
            <ul className="space-y-5">
              <li>
                <a href="https://www.instagram.com/welkintattoos/" target="_blank" rel="noopener noreferrer" className="text-sm font-light text-black/70 hover:text-black transition-colors tracking-wide">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/WelkinTattoos/" target="_blank" rel="noopener noreferrer" className="text-sm font-light text-black/70 hover:text-black transition-colors tracking-wide">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://share.google/LUHgvZyVC497T15sh" target="_blank" rel="noopener noreferrer" className="text-sm font-light text-black/70 hover:text-black transition-colors tracking-wide">
                  Google
                </a>
              </li>
              <li>
                <a href="tel:07038145860" className="text-sm font-light text-black/70 hover:text-black transition-colors tracking-wide">
                  070381 45860
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-black/5">
           <p className="text-[10px] text-black/30 uppercase tracking-[0.2em] font-bold">
             &copy; {currentYear} Welkin Tattoos. All rights reserved.
           </p>
           <p className="text-[10px] text-black/30 uppercase tracking-[0.2em] font-bold mt-4 md:mt-0">
             Art . Ink . Soul
           </p>
        </div>
      </div>
    </footer>
  );
}
