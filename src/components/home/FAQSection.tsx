"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    question: "Do you accept walk-ins?",
    answer: "Welkin operates efficiently on an appointment-only basis to ensure every client receives our undivided attention and artistic dedication. Please use our booking form to secure your session."
  },
  {
    question: "How do I book a consultation?",
    answer: "Booking begins with our inquiry form below. Once we review your concept, we will schedule a video or in-person consultation to discuss placement, size, and design details before locking in a date."
  },
  {
    question: "What styles do you specialize in?",
    answer: "Our studio focuses on high-end micro-realism, fine-line, abstract flow, and bespoke custom narratives. We do not typically take on generic flash work or traditional tribal designs unless reinvented with our signature aesthetic."
  },
  {
    question: "Is a deposit required?",
    answer: "Yes, a non-refundable deposit is required to secure your appointment slot. This amount is deducted from the final price of your tattoo session."
  },
   {
    question: "How should I prepare for my session?",
    answer: "Ensure you are well-rested, hydrated, and have eaten a good meal beforehand. Avoid alcohol for 24 hours prior. wear comfortable clothing that allows easy access to the area being tattooed."
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-[#F5F5F7] text-black">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-20 text-center">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-black/40 mb-4">Common Questions</h2>
            <h3 className="text-4xl md:text-5xl font-sans font-bold">Everything You Need to Know</h3>
        </div>

        <div className="space-y-4">
            {FAQS.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden border border-transparent hover:border-black/5 transition-colors">
                    <button 
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-8 text-left group"
                    >
                        <span className="text-lg md:text-xl font-medium tracking-wide">{faq.question}</span>
                        <div className={`p-2 rounded-full border border-black/10 transition-colors group-hover:bg-black group-hover:text-white ${openIndex === index ? "bg-black text-white" : "bg-transparent text-black"}`}>
                            {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                    </button>
                    
                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="p-8 pt-0 text-black/60 font-light leading-loose text-sm md:text-base border-t border-black/5 mt-2">
                                    {faq.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
