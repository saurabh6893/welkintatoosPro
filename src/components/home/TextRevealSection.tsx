"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function TextRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=100%", // Significantly increased scroll distance (3x viewport)
            scrub: 2,     // Heavier scrub for cinematic weight
            pin: true,
            anticipatePin: 1,
        }
    });

    // Scale up the background image inside the text or container
    tl.to(".reveal-bg", {
        scale: 2.5, // Much deeper zoom effect
        duration: 1,
        ease: "power1.inOut" // Smoother easing
    }, 0);
    
    // Fade in text overlay
    tl.fromTo(".overlay-text", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0.5);

  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
       {/* Background Image that will 'fill' the text or be revealed */}
       <div className="absolute inset-0 reveal-bg scale-100">
           <Image 
                src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=2000"
                alt="Background Art"
                fill
                className="object-cover opacity-40 bg-fixed"
           />
       </div>

       <div className="relative z-10 text-center mix-blend-screen px-4">
           <h2 className="text-[15vw] leading-none font-black text-white tracking-tighter">
               IMMORTAL
           </h2>
            <h2 className="text-[15vw] leading-none font-black text-transparent tracking-tighter bg-clip-text bg-gradient-to-b from-white to-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}>
               CREATION
           </h2>
       </div>

       <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center overlay-text">
           <p className="text-white text-lg md:text-2xl font-light tracking-wide max-w-lg">
               Where your story becomes part of history.
           </p>
       </div>
    </section>
  );
}
