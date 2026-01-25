"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const GALLERY_IMAGES = [
  {
    src: "https://res.cloudinary.com/ddze1e75l/image/upload/w_900,q_auto,f_auto/v1769354149/necktatoooo.jpg",
    title: "Ethereal Lines",
  },
  {
    src: "https://res.cloudinary.com/ddze1e75l/image/upload/w_900,q_auto,f_auto/v1769354149/handtatooo.jpg",
    title: "Metric Flow",
  },
  {
    src: "https://res.cloudinary.com/ddze1e75l/image/upload/w_900,q_auto,f_auto/v1769372506/maturin.jpg",
    title: "Noir Portrait",
  },
  {
    src: "https://res.cloudinary.com/ddze1e75l/image/upload/w_900,q_auto,f_auto/v1769354149/archangel.jpg",
    title: "Abstract Form",
  },
  {
    src: "https://res.cloudinary.com/ddze1e75l/image/upload/w_900,q_auto,f_auto/v1769354149/medusa.jpg",
    title: "Nature's Echo",
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current && triggerRef.current) {
      const scrollWidth = sectionRef.current.scrollWidth;
      const windowWidth = window.innerWidth;

      // Horizontal Scroll Tween
      const scrollTween = gsap.fromTo(
        sectionRef.current,
        { x: 0 },
        {
          x: -(scrollWidth - windowWidth),
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        },
      );

      // Mobile-Only: Active State Detection
      ScrollTrigger.matchMedia({
        "(max-width: 768px)": function () {
          itemsRef.current.forEach((item, index) => {
            if (item) {
              // Create a scrub-linked timeline that animates:
              // Grayscale 100% -> 0% (Center) -> 100%
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: item,
                  containerAnimation: scrollTween,
                  start: "left 100%", // Start as soon as it enters viewport from right
                  end: "right 0%", // End when it leaves viewport to left
                  scrub: true,
                  id: `mobile-focus-${index}`,
                },
              });

              tl.fromTo(
                item,
                { filter: "grayscale(100%)", scale: 1 },
                {
                  filter: "grayscale(0%)",
                  scale: 1.05,
                  ease: "none",
                  duration: 0.5,
                },
              ).to(item, {
                filter: "grayscale(100%)",
                scale: 1,
                ease: "none",
                duration: 1,
              });
            }
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="gallery"
      ref={triggerRef}
      className="relative h-screen overflow-hidden bg-black text-white">
      {/* Section Header */}
      <div className="absolute top-10 left-10 z-10 mix-blend-difference">
        <h2 className="text-sm uppercase tracking-widest font-bold">
          Selected Works
        </h2>
      </div>

      <div
        ref={sectionRef}
        className="flex h-full w-fit items-center gap-20 px-20 will-change-transform">
        <div className="w-[50vw] flex flex-col justify-center">
          <h3 className="text-6xl md:text-8xl font-bold font-sans leading-none tracking-tight">
            Ink as <br />{" "}
            <span className="text-white/50 italic font-serif">Narrative.</span>
          </h3>
          <p className="mt-8 max-w-md text-white/60 font-light">
            Each piece is a collaboration, a unique story translated into
            permanent art.
          </p>
        </div>

        {GALLERY_IMAGES.map((img, index) => (
          <div
            key={index}
            ref={(el) => {
              if (itemsRef.current) itemsRef.current[index] = el;
            }}
            className="relative h-[60vh] w-[70vw] md:w-[30vw] flex-shrink-0 overflow-hidden group grayscale hover:grayscale-0 transition-all duration-700">
            <Image
              src={img.src}
              alt={img.title}
              fill
              sizes="(max-width: 768px) 90vw, 30vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

            <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 mobile-active-label">
              <span className="text-xs uppercase tracking-widest font-bold">
                {img.title}
              </span>
            </div>
          </div>
        ))}

        <div className="w-[30vw] flex items-center justify-center">
          <p className="text-xl uppercase tracking-widest border-b border-white pb-2 cursor-pointer hover:opacity-50 transition-opacity">
            View Archieves
          </p>
        </div>
      </div>
    </section>
  );
}
