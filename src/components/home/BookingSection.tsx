"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Check } from "lucide-react";

import Button from "@/components/ui/Button";

export default function BookingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    concept: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS environment variables are missing.");
      alert("Configuration Error: EmailJS keys are missing. Please check the console.");
      setStatus("error");
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.concept,
        },
        publicKey
      );
      setStatus("success");
      setFormData({ name: "", email: "", concept: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <section id="booking" ref={sectionRef} className="py-20 md:py-40 bg-white text-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -z-10 opacity-60" />

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Left Col: Info */}
            <div ref={leftColRef} className="space-y-8 will-change-transform">
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-black/40">Inquiries</span>
                <h2 className="text-4xl md:text-6xl font-sans font-bold leading-tight">
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
                            <a href="mailto:Welkintattoos@gmail.com" className="hover:text-black transition-colors">Welkintattoos@gmail.com</a>
                        </p>
                        <p className="text-black/40 text-xs mt-2">
                            Open Daily: 12:00 PM – 10:00 PM
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Col: Form Card */}
            <div ref={rightColRef} className="bg-white rounded-3xl shadow-2xl border border-black/5 relative overflow-hidden group will-change-transform min-h-[500px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {status === "success" ? (
                         <motion.div 
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Apple-like ease
                            className="p-10 flex flex-col items-center justify-center text-center space-y-6 h-full"
                         >
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-2">
                                <Check size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Inquiry Sent Successfully</h3>
                                <p className="text-black/50 text-sm max-w-xs mx-auto">
                                    The artist will review your concept and contact you shortly.
                                </p>
                            </div>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setStatus("idle")}
                                className="mt-4"
                            >
                                Send Another
                            </Button>
                         </motion.div>
                    ) : (
                        <motion.div 
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-10 relative z-10 w-full"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs uppercase tracking-widest font-bold text-black/60">Full Name</label>
                                    <input 
                                        id="name"
                                        name="name"
                                        type="text" 
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={status === "loading"}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black/30 focus:bg-white transition-all duration-300 disabled:opacity-50"
                                        placeholder="Type your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs uppercase tracking-widest font-bold text-black/60">Email Address</label>
                                    <input 
                                        id="email"
                                        name="email"
                                        type="email" 
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={status === "loading"}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black/30 focus:bg-white transition-all duration-300 disabled:opacity-50"
                                        placeholder="Type your email"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="concept" className="text-xs uppercase tracking-widest font-bold text-black/60">Concept</label>
                                    <textarea 
                                        id="concept"
                                        name="concept"
                                        rows={4} 
                                        required
                                        value={formData.concept}
                                        onChange={handleChange}
                                        disabled={status === "loading"}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black/30 focus:bg-white transition-all duration-300 resize-none disabled:opacity-50"
                                        placeholder="Describe your vision..."
                                    />
                                </div>
                                <Button 
                                    type="submit" 
                                    variant="primary" 
                                    size="lg" 
                                    className="w-full mt-4 rounded-xl py-4"
                                    disabled={status === "loading"}
                                >
                                    {status === "loading" ? "Sending..." : "Send Inquiry"}
                                </Button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {/* Subtle sheen effect on available only when form is present effectively, can keep it but might clash with success. Let's keep it behind content */}
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-45 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 w-[200%] z-0" />
            </div>

        </div>
      </div>
    </section>
  );
}
