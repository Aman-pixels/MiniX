import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import categories from "../data/Categories";

export default function Collections() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section 
      ref={containerRef}
      className="relative bg-[#1e2023] py-32 px-6 lg:px-12 overflow-hidden selection:bg-[#4c4e51] selection:text-white"
    >
      {/* Background Typography */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.02] flex items-center justify-center z-0">
        <h2 className="text-[30vw] font-black uppercase leading-none whitespace-nowrap text-white">
          INDEX
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-[#47484c] pb-8">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#4c4e51] mb-6">
              02 // Catalog
            </p>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
              Divisions
            </h2>
          </div>
          <button
            onClick={() => navigate("/shop")}
            className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors mt-8 md:mt-0 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-500"
          >
            Access Full Archive →
          </button>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
          {categories.slice(0, 4).map((cat, index) => {
            const isLarge = index === 0 || index === 3;
            const spanClass = isLarge ? "md:col-span-8" : "md:col-span-4";
            const heightClass = isLarge ? "h-[60vh] md:h-[80vh]" : "h-[50vh] md:h-[60vh]";
            const yTransform = index % 2 === 0 ? y1 : y2;

            return (
              <motion.div
                key={cat.id}
                style={{ y: yTransform }}
                className={`${spanClass} relative group cursor-pointer overflow-hidden bg-[#1e1f22]`}
                onClick={() => navigate(`/shop?category=${cat.id}`)}
              >
                {/* Image */}
                <div className={`w-full ${heightClass} overflow-hidden`}>
                  <motion.img
                    src={cat.image}
                    alt={cat.label}
                    loading="lazy"
                    className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-110 origin-center"
                  />
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f22] via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
                <div className="absolute inset-0 border border-white/5 group-hover:border-white/20 transition-colors duration-700" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors duration-500">
                      SYS.{index + 1}
                    </span>
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center rounded-full opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out bg-[#1e2023]/50 backdrop-blur-md text-white">
                      <span className="text-sm">↗</span>
                    </div>
                  </div>
                  
                  <div className="overflow-hidden">
                    <motion.h3 
                      className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mix-blend-difference translate-y-[20%] group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                    >
                      {cat.label}
                    </motion.h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
