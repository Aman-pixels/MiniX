import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[95vh] flex items-center justify-center bg-[#050505] overflow-hidden pt-20">
      {/* Dynamic Background Gradient Blob */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[600px] md:h-[600px] bg-white/5 rounded-full blur-[140px] pointer-events-none" 
      />

      <div className="max-w-[1250px] w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        {/* LEFT */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-white flex flex-col items-start"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold uppercase tracking-widest text-white/80 mb-8"
          >
            New Collection
          </motion.div>

          <h1 className="font-extrabold leading-[1.05] text-6xl sm:text-7xl lg:text-[5rem] mb-6 tracking-tighter text-white">
            Redefine <br /> Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">Style.</span>
          </h1>

          <p className="text-zinc-400 max-w-md mb-10 text-lg font-light leading-relaxed">
            Minimalist streetwear crafted with premium materials. 
            Designed for those who appreciate the details and a modern aesthetic.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/shop")}
              className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-transform active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]"
            >
              <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">Shop Collection</span>
            </button>

            <button
              onClick={() => {
                const el = document.querySelector("#featured");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 rounded-full text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              Explore <span className="opacity-50">↓</span>
            </button>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-[2rem] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
            <img
              src="/Hero.jpg"
              alt="Premium Streetwear"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
            />
            {/* Soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
            
            {/* Floating badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-2xl transition-transform hover:scale-105 cursor-pointer"
              onClick={() => navigate("/shop")}
            >
              <p className="text-white font-semibold text-sm">Essential Hoodie</p>
              <p className="text-white/60 text-xs mt-1">$89.00</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
