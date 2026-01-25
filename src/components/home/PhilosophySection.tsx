"use client";

import { motion } from "framer-motion";

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="py-40 bg-black text-white px-6">
      <div className="container mx-auto max-w-4xl">
         <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center"
         >
             <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-12">Our Philosophy</h2>
             <p className="text-3xl md:text-5xl font-light leading-normal md:leading-relaxed font-sans">
                 "A tattoo is not just ink; it is a memory made permanent. We believe in the power of <span className="text-white font-serif italic">minimalism</span> to amplify meaning, stripping away the unnecessary to reveal the <span className="text-white font-serif italic">essential</span>."
             </p>
             <div className="w-px h-20 bg-white/20 mx-auto mt-20" />
         </motion.div>
      </div>
    </section>
  );
}
