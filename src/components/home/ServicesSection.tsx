"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const SERVICES = [
  {
    title: "Custom Tattoos",
    desc: "Bespoke designs tailored to your narrative.",
    className: "md:col-span-2 md:row-span-2",
    img: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Micro Realism",
    desc: "Hyper-detailed miniatures.",

    className: "md:col-span-1 md:row-span-1",
    img: "https://res.cloudinary.com/ddze1e75l/image/upload/w_900,q_auto,f_auto/v1769436376/knight_t6g0sl.jpg",
  },
  {
    title: "Fine Line",
    desc: "Precision in every stroke.",
    className: "md:col-span-1 md:row-span-1",
    img: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Traditional Art",
    desc: "Timeless motifs and bold lines.",
    className: "md:col-span-1 md:row-span-1",
    img: "https://res.cloudinary.com/ddze1e75l/image/upload/w_900,q_auto,f_auto/v1769433150/Shouldertatoo_zdr7by.jpg",
  },

  {
    title: "Watercolor",
    desc: "Fluidity and vibrant blends.",
    className: "md:col-span-1 md:row-span-1",
    img: "https://res.cloudinary.com/ddze1e75l/image/upload/w_900,q_auto,f_auto/v1769372506/maturin.jpg",
  },
  {
    title: "Cover-Ups",
    desc: "Transforming the past into art.",
    className: "md:col-span-2 md:row-span-1",
    img: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=800",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // Desktop Animation
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=150%",
            scrub: true,
            pin: true,
          },
        });

        tl.from(cardsRef.current, {
          y: 100,
          opacity: 0,
          scale: 0.8,
          stagger: 0.1,
          duration: 1,
          ease: "power2.out",
        });
      });

      // Mobile Animation (Simple Scroll Fade)
      mm.add("(max-width: 767px)", () => {
        cardsRef.current.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="py-32 bg-white text-black">
      <div className="container mx-auto px-6">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end">
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-black/40 mb-4">
              Our Expertise
            </h2>
            <h3 className="text-4xl md:text-5xl font-sans font-bold leading-tight">
              Beyond <br /> Inspiration.
            </h3>
          </div>
          <p className="max-w-md text-right text-black/60 font-light mt-8 md:mt-0">
            We offer a wide spectrum of artistic disciplines, masterfully
            executed to ensure your vision is realized with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[800px]">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              ref={(el) => addToRefs(el, i)}
              className={`group relative overflow-hidden rounded-3xl bg-gray-100 h-96 md:h-auto ${service.className}`}>
              {/* Background Image */}
              <Image
                src={service.img}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end text-white bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="text-2xl font-bold mb-2">{service.title}</h4>
                    <p className="text-sm text-white/80 font-light opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                      {service.desc}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
