"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 200); // 4x faster exit delay
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 40); // 2.5x faster interval

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }} // Faster exit fade
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white"
        >
            <div className="flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-9xl font-bold tracking-tighter"
                >
                    {Math.min(count, 100)}%
                </motion.div>
                 <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "200px" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }} // Faster line animation
                    className="h-[1px] bg-white mt-8"
                />
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
