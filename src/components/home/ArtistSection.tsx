"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ArtistSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Background Text Animation
    if (containerRef.current) {
        gsap.to(".artist-bg-text", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
            xPercent: -5, // Responsive translation (5% of element width)
            scale: 1.1, // Subtle scale
            opacity: 0.15, // Increase contrast slightly during scroll
            ease: "none"
        });
    }

    // Cinematic Image Reveal (Blur -> Sharp)
    if (imageRef.current) {
        gsap.fromTo(imageRef.current.querySelector('img'), 
            { 
                filter: "blur(20px)", 
                opacity: 0,
                scale: 1.1 
            },
            {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%", // Start revealing when section is near center
                    end: "center center",
                    scrub: 1.5,
                },
                filter: "blur(0px)",
                opacity: 1,
                scale: 1,
                ease: "power2.out"
            }
        );
    }
  }, []);

  return (
    <section 
        id="artist" 
        ref={containerRef} 
        className="relative min-h-[120vh] bg-[#F5F5F7] text-black overflow-hidden flex items-center py-20 scroll-mt-24"
    >
      {/* Background large text */}
      <h2 className="artist-bg-text absolute top-[10%] left-0 w-full text-[15vw] leading-none font-bold text-black/5 uppercase tracking-tighter whitespace-nowrap z-0 select-none will-change-transform text-center">
        Akash Sanap
      </h2>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div style={{ y: textY }} ref={textRef} className="order-2 md:order-1">
            <div className="mb-8">
                <span id="master-artist" className="block text-xs uppercase tracking-[0.3em] font-bold text-black/40 mb-2 scroll-mt-32">Master Artist</span>
                <h3 className="text-6xl md:text-8xl font-sans font-bold leading-none mb-6">
                    Akash <br /> <span className="font-serif italic font-light ml-4">Sanap</span>
                </h3>
                <div className="w-20 h-px bg-black/20 my-8" />
            </div>
            
            <p className="text-xl md:text-2xl font-light leading-relaxed text-black/80 mb-8 max-w-lg">
                "Ink is the medium. The body is the canvas. The soul is the masterpiece."
            </p>
            <p className="text-sm md:text-base leading-relaxed text-black/60 max-w-md mb-10">
                With over a decade of mastery in micro-realism and abstract geometry, Akash transforms personal narratives into permanent visual legacies. 
                His work is not just seen; it is felt.
            </p>
            
            <button className="group relative px-8 py-3 bg-black text-white text-xs uppercase tracking-widest overflow-hidden">
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">View Portfolio</span>
                <span className="absolute inset-0 bg-white transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:skew-x-12" />
            </button>
        </motion.div>

        {/* Artist Image (Cutout) */}
        <motion.div 
            style={{ y }}
            ref={imageRef} 
            className="order-1 md:order-2 relative h-[80vh] w-full"
        >
             {/* Placeholder for Cutout Image - Replace with Akash's photo */}
            <div className="relative w-full h-full">
                 <Image
                    src="/akash-portrait.jpg" 
                    alt="Akash Sanap"
                    fill
                    className="object-cover object-top md:object-contain drop-shadow-2xl rounded-3xl"
                 />
                 {/* Premium subtle glow behind */}
                 <div className="absolute -inset-10 bg-gradient-to-tr from-black/20 to-transparent blur-3xl -z-10 rounded-full opacity-0 md:opacity-100" />
            </div>
        </motion.div>

      </div>
    </section>
  );
}
