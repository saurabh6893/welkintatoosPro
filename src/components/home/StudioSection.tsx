"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const STUDIO_IMAGES = [
  "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=1200", // Placeholder
  "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1562962230-16bc46364924?auto=format&fit=crop&q=80&w=1200",
];

export default function StudioSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Slow pan effect on scroll
    // In a real implementation, this would likely be a horizontal scroll or crossfade
    // For now, let's do a classic vertical parallax reveal
  }, []);

  return (
    <section id="studio" className="py-32 bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-6 mb-20 text-center">
         <span className="text-xs uppercase tracking-[0.3em] font-bold text-white/40 block mb-4">The Sanctuary</span>
         <h2 className="text-4xl md:text-6xl font-sans font-light">
             A Space for <span className="font-serif italic">Creation.</span>
         </h2>
      </div>

      <div className="relative w-full h-[80vh] overflow-hidden">
          <div className="absolute inset-0 flex">
           
             <Image 
                src="https://res.cloudinary.com/ddze1e75l/image/upload/w_900,q_auto,f_auto/v1769429424/studio.png" // Interior shot
                alt="Studio Interior"
                fill
                className="object-cover opacity-80"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
          </div>
          
          <div className="absolute bottom-20 left-10 md:left-20 max-w-lg">
              <p className="text-2xl font-light leading-relaxed text-white/90">
                  Minimalist design. Sterile precision. A calm atmosphere where art comes alive.
              </p>
          </div>
      </div>
    </section>
  );
}
