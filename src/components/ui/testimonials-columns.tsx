"use client";

import { motion } from "motion/react";

type Testimonial = {
  text: string;
  author_name: string; // Matched to REAL_REVIEWS data shape
  profile_photo_url?: string; // Matched to REAL_REVIEWS data shape
  rating?: number;
};

export const TestimonialsColumn = ({
  testimonials,
  duration = 18,
  className,
}: {
  testimonials: Testimonial[];
  duration?: number;
  className?: string;
}) => {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...Array(2)].map((_, loopIndex) =>
          testimonials.map((t, i) => (
            <div
              key={`${loopIndex}-${i}`}
              className="rounded-3xl border border-neutral-200 p-6 bg-white shadow-lg max-w-sm"
            >
              <p className="text-sm leading-relaxed text-neutral-800 font-medium">"{t.text}"</p>

                <div className="mt-4">
                  {t.author_name && <div className="font-bold text-neutral-900 text-sm">{t.author_name}</div>}
                  {t.rating && (
                    <div className="text-xs text-neutral-500 font-medium flex items-center gap-1">
                      {t.rating} <span className="text-yellow-500">★</span> Google Review
                    </div>
                  )}
                </div>
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
};
