"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Button from "@/components/ui/Button";

export default function BookingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current && leftColRef.current && rightColRef.current) {
        
        // Timeline for synchronized, scrubbed entrance
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 40%", // Start animating when section enters view
                end: "center center", // Finish when center is reached
                scrub: 1.5, // Smooth reversible scrubbing
            }
        });

        // Left Col: Move from bottom (Y axis), Fade in, Blur reveal
        tl.fromTo(leftColRef.current, 
            { x: -600, opacity: 0, filter: "blur(20px)" },
            { x: 0, opacity: 1, filter: "blur(0px)", duration: 3, ease: "power2.out" },
            0 // Start at beginning
        );

        // Right Col: Move from right (X axis), Fade in
        tl.fromTo(rightColRef.current,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 2, ease: "power2.out" },
            0.2 // Slight delay for stagger feel, but still scrubbed
        );
    }

    return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="booking" ref={sectionRef} className="py-40 bg-white text-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -z-10 opacity-60" />

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Left Col: Info */}
            <div ref={leftColRef} className="space-y-8 will-change-transform">
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-black/40">Inquiries</span>
                <h2 className="text-6xl font-sans font-bold leading-tight">
                    Begin Your <br /> Transformation.
                </h2>
                <div className="space-y-6 pt-4">
                    <div className="p-6 bg-gray-50 rounded-2xl border border-black/5 hover:border-black/10 transition-colors">
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-2">Studio Location</h4>
                        <p className="text-black/60 font-light text-sm leading-relaxed">
                            Shop no 4, Chintamani CHS,<br />
                            Near Gajanan Maharaj Temple,<br />
                            Opp. Mayur Vihar Complex, Bhoirwadi,<br />
                            Kalyan, Maharashtra 421301
                        </p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-2xl border border-black/5 hover:border-black/10 transition-colors">
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-2">Direct Contact</h4>
                        <p className="text-black/60 font-light">
                            <a href="tel:07038145860" className="hover:text-black transition-colors">070381 45860</a> <br />
                            <a href="mailto:welkintattooz@gmail.com" className="hover:text-black transition-colors">welkintattooz@gmail.com</a>
                        </p>
                        <p className="text-black/40 text-xs mt-2">
                            Open Daily: 12:00 PM – 10:00 PM
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Col: Form Card */}
            <div ref={rightColRef} className="bg-white p-10 rounded-3xl shadow-2xl border border-black/5 relative overflow-hidden group will-change-transform">
                <div className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-black/60">Full Name</label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black/30 focus:bg-white transition-all duration-300"
                            placeholder="Type your name"
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-black/60">Email Address</label>
                        <input 
                            type="email" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black/30 focus:bg-white transition-all duration-300"
                            placeholder="Type your email"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-black/60">Concept</label>
                        <textarea 
                            rows={4} 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black/30 focus:bg-white transition-all duration-300 resize-none"
                            placeholder="Describe your vision..."
                        />
                    </div>
                    <Button variant="primary" size="lg" className="w-full mt-4 rounded-xl py-4">
                        Send Inquiry
                    </Button>
                </div>
                
                {/* Subtle sheen effect on form */}
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-45 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 w-[200%]" />
            </div>

        </div>
      </div>
    </section>
  );
}
