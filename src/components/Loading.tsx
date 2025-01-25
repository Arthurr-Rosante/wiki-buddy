"use client";
import { sentences } from "@/lib/sentences";
import { useEffect, useState } from "react";

export const Loading = () => {
  const [loadingSlug, setLoadingSlug] = useState("");
  useEffect(() => {
    const n = Math.floor(Math.random() * sentences.length);
    setLoadingSlug(sentences[n]);
  }, []);

  return (
    <div className="relative bg-white shadow-neumorphic py-4 px-6 border-none rounded-full animate-pulse-scale">
      <span className="font-extrabold tracking-wide bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient">
        {`${loadingSlug}...`}
      </span>
    </div>
  );
};

/*
"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="flex items-center justify-center space-x-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-4 h-4 bg-slate-900 rounded-full"
          animate={{
            scale: [0.5, 0.6, 0.5],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  )
}
*/
