import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100svh] bg-[#050505] overflow-hidden flex items-center justify-center selection:bg-white selection:text-black"
    >
      {/* Background Noise overlay for cinematic texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>

      {/* Massive Background Typography */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden"
      >
        <h1 className="text-[15vw] leading-none font-black text-[#111] tracking-tighter whitespace-nowrap opacity-50 uppercase">
          CYBER <span className="text-transparent" style={{ WebkitTextStroke: "2px #222" }}>STREET</span>
        </h1>
      </motion.div>

      <div className="max-w-[1400px] w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 h-full pt-20">
        
        {/* LEFT COLUMN: Editorial Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-5 flex flex-col justify-center h-full order-2 lg:order-1"
        >
          <div className="overflow-hidden mb-4">
            <motion.p 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold"
            >
              System // 001 — Drop
            </motion.p>
          </div>

          <h2 className="font-extrabold text-[4rem] md:text-[5rem] lg:text-[6.5rem] leading-[0.85] tracking-tighter text-white mb-8 uppercase mix-blend-difference">
            <div className="overflow-hidden"><motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }} className="block">Future</motion.span></div>
            <div className="overflow-hidden"><motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }} className="block text-zinc-500">Kinetics</motion.span></div>
          </h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-zinc-400 max-w-sm text-sm font-medium leading-relaxed mb-10 border-l border-white/10 pl-4"
          >
            Engineering the next generation of human movement. Premium streetwear fused with brutalist utility and uncompromising aesthetics.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex items-center gap-6"
          >
            <button
              onClick={() => navigate("/shop")}
              className="group relative px-8 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest overflow-hidden"
            >
              <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-500 delay-100">Initialize</span>
            </button>
            <button 
              onClick={() => navigate("/about")}
              className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-500"
            >
              Explore Lore
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Cinematic Image Showcase */}
        <div className="lg:col-span-7 relative h-[50vh] lg:h-[80vh] w-full flex justify-center lg:justify-end items-center order-1 lg:order-2">
          <motion.div 
            style={{ y: y2, scale }}
            className="relative w-full max-w-[500px] h-full lg:h-[90%] overflow-hidden group"
          >
            {/* Dark sophisticated container */}
            <div className="absolute inset-0 bg-zinc-900" />
            <motion.img
              initial={{ scale: 1.2, filter: "blur(10px)" }}
              animate={{ scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              src="/Hero.jpg"
              alt="Cyber Streetwear"
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-[1.5s] ease-out mix-blend-luminosity hover:mix-blend-normal"
            />
            {/* Cinematic Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

            {/* Brutalist UI Overlay on Image */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute top-6 left-6 flex flex-col gap-1 mix-blend-difference text-white"
            >
              <span className="text-[10px] uppercase font-mono tracking-widest opacity-70">Model // X-01</span>
              <span className="text-[10px] uppercase font-mono tracking-widest opacity-70">Status // Active</span>
            </motion.div>

            {/* Interactive Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
              className="absolute bottom-8 right-8 bg-white/5 backdrop-blur-md border border-white/10 p-4 w-40 hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => navigate("/shop")}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-white/50 uppercase">01 / Featured</span>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wide">Stealth Hoodie</h3>
              <p className="text-white/70 text-xs mt-1 font-mono">$120.00</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
