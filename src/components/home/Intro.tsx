"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";

export default function Intro() {
  const container = useRef(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Split text animation effect (simplified without SplitType for now)
    const ctx = gsap.context(() => {
        gsap.fromTo(
            ".reveal-text",
            { y: 100, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: ".intro-container",
                    start: "top 70%",
                    end: "bottom 80%",
                    scrub: 1,
                },
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 1
            }
        );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} id="artist" className="intro-container relative py-32 px-6 md:px-20 bg-white text-black overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-16 md:gap-32 items-start">
            
            {/* Left Column: Heading */}
            <div className="w-full md:w-1/3">
                <h3 className="text-xs uppercase tracking-[0.2em] mb-4 text-black/50 font-bold">The Artist</h3>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight font-sans">
                    Crafting <br /> Permeance <br /> & Emotion.
                </h2>
            </div>

            {/* Right Column: Description */}
            <div className="w-full md:w-2/3 max-w-2xl">
                <p className="reveal-text text-xl md:text-2xl font-light text-black/80 leading-relaxed mb-10">
                    Welkin is more than a studio; it is a sanctuary for artistic expression. 
                    Founded on the belief that tattoos are profound narratives etched into the skin.
                </p>
                <p className="reveal-text text-base text-black/60 leading-relaxed mb-12">
                     Specializing in fine-line, micro-realism, and abstract flow, our work connects the physical body with the ethereal mind. 
                     Every line is deliberate. Every shadow is intentional.
                </p>
                
                <div className="reveal-text">
                    <Button variant="primary">Read Philosophy</Button>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}
