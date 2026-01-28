"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const STYLES = [
  {
    name: "Fine Line",
    description: "Delicate, precise, timeless.",
    img: "https://images.unsplash.com/photo-1621112904887-419379ce6824?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Micro Realism",
    description: "Photographic detail in miniature.",
    img: "https://res.cloudinary.com/ddze1e75l/image/upload/v1769436376/knight_t6g0sl.jpg",
  },
  {
    name: "Abstract Flow",
    description: "Movement adapted to anatomy.",
    img: "https://images.unsplash.com/photo-1590246296840-e6f72c427673?auto=format&fit=crop&q=80&w=800",
  },
];

export default function StylesSection() {
  return (
    <section id="styles" className="py-32 bg-white text-black scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-black/40 mb-4">
            Our Expertise
          </h2>
          <h3 className="text-4xl md:text-5xl font-sans font-bold">
            Signature Styles
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STYLES.map((style, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group cursor-pointer">
              <div className="relative h-[500px] w-full overflow-hidden mb-6">
                <Image
                  src={style.img}
                  alt={style.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <h4 className="text-2xl font-bold mb-2">{style.name}</h4>
              <p className="text-black/60 font-light">{style.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
