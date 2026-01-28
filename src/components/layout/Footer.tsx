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
        // Advanced Premium Reveal
        gsap.fromTo(contentRef.current, 
            { 
                y: 40, 
                opacity: 0, 
                filter: "blur(12px)" 
            },
            {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                ease: "none", // Linear ease for scrubbing
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 95%", // Start when top of footer hits bottom of viewport
                    end: "center 60%", // Fully clear when center of footer is near bottom-middle
                    scrub: 1.2, // Smooth scrub delay
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
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-28 border-b border-black/5 pb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
             <Link href="/" className="inline-block group">
               <span className="text-3xl font-bold tracking-[-0.02em] uppercase font-sans leading-none block text-black group-hover:opacity-70 transition-opacity">
                 WELKIN
               </span>
             </Link>
             <p className="max-w-sm text-sm text-black/60 leading-7 font-light tracking-wide">
               Crafting permanent art that resonates with the soul. A premium studio dedicated to minimalist perfection, hygiene, and artistic expression.
             </p>
          </div>

          {/* Spacer */}
          <div className="md:col-span-1" />

          {/* Links Columns */}
          <div className="md:col-span-2 space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/30">Studio</h4>
            <ul className="space-y-4">
              {[
                { label: 'The Artist', href: '#artist' },
                { label: 'Styles', href: '#styles' },
                { label: 'Philosophy', href: '#philosophy' }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm font-medium text-black/70 hover:text-black transition-colors block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/30">Connect</h4>
            <ul className="space-y-4">
              <li><a href="https://www.instagram.com/welkintattoos/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-black/70 hover:text-black transition-colors block">Instagram</a></li>
              <li><a href="https://www.facebook.com/WelkinTattoos/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-black/70 hover:text-black transition-colors block">Facebook</a></li>
              <li><a href="https://share.google/LUHgvZyVC497T15sh" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-black/70 hover:text-black transition-colors block">Google</a></li>
            </ul>
          </div>

           <div className="md:col-span-2 space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/30">Direct</h4>
             <ul className="space-y-4">
               <li><a href="tel:07038145860" className="text-sm font-medium text-black/70 hover:text-black transition-colors block">070381 45860</a></li>
               <li><a href="mailto:Welkintattoos@gmail.com" className="text-sm font-medium text-black/70 hover:text-black transition-colors block">Email Us</a></li>
             </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Credits */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-2">
           
           {/* Copyright */}
           <div className="space-y-1">
               <p className="text-[10px] text-black/40 uppercase tracking-[0.1em] font-medium">
                 &copy; {currentYear} Welkin Tattoos. All rights reserved.
               </p>
               <p className="text-[10px] text-black/20 font-medium">
                 Mumbai, Maharashtra
               </p>
           </div>

           {/* Tagline & Developer - Aligned Right */}
           <div className="flex flex-col items-start md:items-end space-y-3">
              <p className="text-[10px] text-black/30 uppercase tracking-[0.3em] font-bold">
                Art . Ink . Soul
              </p>
              
              <div className="group flex items-center gap-2 text-[10px] tracking-wide font-medium text-black/30 transition-colors hover:text-black/60">
                <span>Site by</span>
                <a 
                    href="https://codedsaurabh.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-black/50 hover:text-black border-b border-black/10 hover:border-black/50 pb-[1px] transition-all"
                >
                    Saurabh Kedar
                </a>
              </div>
           </div>

        </div>
      </div>
    </footer>
  );
}
