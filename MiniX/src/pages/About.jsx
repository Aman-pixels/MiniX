import React, { useRef } from "react";
import useSEO from "../hooks/useSEO";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
  useSEO({
    title: "Our Story // MiniX",
    description: "Built for slow mornings and loud headphones. MiniX is an emotional extension of your identity.",
    url: "/about",
  });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacityFade = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  return (
    <div ref={containerRef} className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#4c4e51] selection:text-white relative overflow-hidden">
      
      {/* Subtle Grain Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.02] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <Navbar />

      <main className="relative z-10 pt-[20vh] pb-32">
        
        {/* SECTION 1: CINEMATIC INTRO */}
        <section className="min-h-[70vh] flex flex-col justify-center px-6 lg:px-12 max-w-[1400px] mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-8">
              The Identity
            </p>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.1] max-w-4xl mb-12">
              Some outfits are made for attention. <br className="hidden md:block" />
              <span className="text-zinc-500">Others are made for disappearing into your own world.</span>
            </h1>
          </motion.div>
        </section>

        {/* SECTION 2: EDITORIAL PHILOSOPHY */}
        <section className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-[3/4] bg-[#111] overflow-hidden relative"
            >
              <img 
                src="/Hero.jpg" 
                alt="Editorial Mood"
                className="w-full h-full object-cover mix-blend-luminosity opacity-80"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="flex flex-col gap-12 max-w-lg"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">Quiet Confidence</h3>
                <p className="text-zinc-400 leading-relaxed font-light">
                  MiniX was never about being the loudest person in the room. It was born from late-night thoughts, city walks, and the desire for comfort in an overwhelming world.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">An Extension of Mood</h3>
                <p className="text-zinc-400 leading-relaxed font-light">
                  We don't design for seasons. We design for feelings. For those slow mornings. For the nights that changed you. Comfort isn't just a physical feeling—it became our entire design language.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: STATEMENT BANNER */}
        <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-tight text-white/90"
          >
            Minimal outside. <br />
            Loud inside.
          </motion.h2>
        </section>

        {/* SECTION 4: IMMERSIVE LIFESTYLE */}
        <section className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-5 md:mt-32"
            >
              <h3 className="text-3xl font-bold tracking-tight mb-6 leading-snug">
                Not made for trends. <br/>
                Made for people figuring themselves out.
              </h3>
              <p className="text-zinc-400 font-light leading-relaxed mb-8">
                Clothing should feel like a safe space. An oversized hoodie isn't just fabric; it's a barrier between you and the noise. A muted palette isn't boring; it's clarity.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="md:col-span-7 aspect-square md:aspect-[4/5] bg-[#111] overflow-hidden"
            >
              <img 
                src="/products/vintage_washed_tee.png" 
                alt="City Lifestyle"
                className="w-full h-full object-cover mix-blend-luminosity opacity-70 hover:opacity-100 transition-opacity duration-[2s]"
              />
            </motion.div>

          </div>
        </section>

        {/* SECTION 5: FOOTER TRANSITION */}
        <motion.section 
          style={{ opacity: opacityFade }}
          className="h-[40vh] flex flex-col items-center justify-end relative overflow-hidden pb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f22] to-transparent opacity-50 z-0" />
          
          <p className="relative z-10 text-sm font-mono text-zinc-500 uppercase tracking-widest text-center px-4 mb-4">
            Built for the modern mind.
          </p>
          <div className="relative z-10 w-[1px] h-20 bg-zinc-700 mt-4" />
        </motion.section>

      </main>

      <Footer />
    </div>
  );
}
