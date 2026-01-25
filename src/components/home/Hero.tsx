"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Simple GSAP intro animation complement
    if(textRef.current){
        gsap.fromTo(textRef.current.children, 
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power4.out", delay: 0.5 }
        );
    }
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          {/* Placeholder video URL - Replace with actual asset */}
          <source src="https://cdn.coverr.co/videos/coverr-tattoo-artist-working-on-a-sketch-5415/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div ref={textRef} className="flex flex-col items-center">
            <h2 className="text-sm md:text-lg font-light tracking-[0.5em] uppercase mb-6 text-white/80">
                Premium Tattoo Studio
            </h2>
            <h1 className="text-6xl md:text-9xl font-bold tracking-tight mb-8 leading-none mix-blend-overlay">
                WELKIN
            </h1>
            <p className="max-w-xl text-white/70 font-light leading-relaxed mb-10 text-sm md:text-base">
                Where art becomes part of you. Experience the fusion of modern minimalism and timeless ink.
            </p>
            <div className="flex gap-6">
                <Button variant="primary" size="lg" className="bg-white text-black hover:bg-white/90">
                    Book Session
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-black">
                    View Gallery
                </Button>
            </div>
        </div>
      </div>

       {/* Scroll Indicator */}
       <motion.div 
         style={{ y: y2, opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
         className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
       >
         <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
         <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
            <motion.div 
                animate={{ y: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="w-full h-1/2 bg-white"
            />
         </div>
       </motion.div>
    </section>
  );
}
