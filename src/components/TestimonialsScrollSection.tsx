"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import { REAL_REVIEWS } from "@/data/testimonials";

export default function TestimonialsScrollSection() {
  // Distribute 12 reviews across 3 columns (4 per column)
  const col1 = REAL_REVIEWS.slice(0, 4);
  const col2 = REAL_REVIEWS.slice(4, 8);
  const col3 = REAL_REVIEWS.slice(8, 12);

  return (
    <ContainerScroll
      titleComponent={
        <>
          <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
            Client Stories
          </h2>
          <p className="mt-4 opacity-70 text-neutral-400">
            Real Google reviews from tattoo clients
          </p>
        </>
      }
    >
      <div className="flex justify-center gap-6 py-10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] h-[40rem] overflow-hidden">
        <TestimonialsColumn testimonials={REAL_REVIEWS} className="block md:hidden" />
        <TestimonialsColumn testimonials={col1} className="hidden md:block" />
        <TestimonialsColumn testimonials={col2} className="hidden md:block" duration={22} />
        <TestimonialsColumn testimonials={col3} className="hidden lg:block" duration={26} />
      </div>
    </ContainerScroll>
  );
}
