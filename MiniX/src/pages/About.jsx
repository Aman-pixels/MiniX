import React, { useRef, useState } from "react";
import useSEO from "../hooks/useSEO";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Terminal, Lock, Unlock, Database } from "lucide-react";

const ARCHIVE_DATA = [
  {
    id: "01",
    title: "Transmission 02 // Fabric Memory Corrupted",
    status: "DECRYPTED",
    content: "The original garments were never intended for civilian use. They were designed as environmental shields against the encroaching signal. The threads contain microscopic woven data. We wear the archive."
  },
  {
    id: "02",
    title: "Archive Locked Until Sequence Completion",
    status: "ENCRYPTED",
    content: "WARNING: Unauthorized access to MINIX core systems. The 2026 collection is still rendering in the subterranean servers. Only those with the physical garments can access the offline drops."
  },
  {
    id: "03",
    title: "Signal Detected Beneath Sector-9",
    status: "DECRYPTED",
    content: "We found the source of the minimalist mutation. It wasn't a design choice; it was a physical necessity. The excessive logos were stripped to avoid automated facial recognition. Blank is safe. Black is invisible."
  },
  {
    id: "04",
    title: "MINIX Was Never Meant For Mass Production",
    status: "CORRUPTED",
    content: "ERR_READ_FAULT: [DATA EXPUNGED]... They thought it was fashion. It is survival gear for the post-modern digital wasteland. Proceed with caution."
  }
];

export default function About() {
  useSEO({
    title: "Archive // MiniX",
    description: "Access the classified digital archive of MINIX. Explore the lore behind the cyber-fashion movement.",
    url: "/about",
  });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityFade = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  const [activeArchive, setActiveArchive] = useState(null);

  return (
    <div ref={containerRef} className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#4c4e51] selection:text-white relative overflow-hidden">
      
      {/* Global Noise Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <Navbar />

      <main className="relative z-10 pt-[15vh]">
        
        {/* CINEMATIC INTRO */}
        <section className="min-h-[85vh] flex flex-col justify-center px-6 lg:px-12 max-w-[1400px] mx-auto relative border-b border-[#47484c]/30 pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-2 h-2 bg-red-500 animate-pulse rounded-full" />
              <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#4c4e51]">
                System Log: Active
              </p>
            </div>
            
            <h1 className="text-6xl md:text-[8rem] lg:text-[12rem] font-black uppercase tracking-tighter leading-[0.8] mb-12 mix-blend-difference z-10 relative">
              Classified <br/> Archive
            </h1>
            
            <div className="flex flex-col md:flex-row gap-12 md:gap-24 ml-auto w-full md:w-2/3 lg:w-1/2">
              <p className="text-sm font-mono text-[#4c4e51] leading-relaxed uppercase tracking-widest">
                MiniX is not a brand. It is an encrypted aesthetic transmission. <br/><br/>
                We engineer garments for the post-modern digital wasteland, focusing on brutalist minimalism and functional survival.
              </p>
              <div className="flex flex-col gap-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-l border-[#47484c]/50 pl-6">
                <span>Status: Classified</span>
                <span>Location: Sector-9 Sub-level</span>
                <span>Clearance: Level 4 Required</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* INTERACTIVE LORE SYSTEM */}
        <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto relative">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Recovered <br/> Transmissions
            </h2>
            <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-zinc-500 mt-8 md:mt-0">
              <Database size={14} />
              <span>4 Files Retrieved</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {ARCHIVE_DATA.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveArchive(item.id)}
                onMouseLeave={() => setActiveArchive(null)}
                className="group relative border border-[#47484c]/50 bg-[#0a0a0c] p-8 md:p-12 cursor-pointer overflow-hidden h-[300px] flex flex-col justify-between"
              >
                {/* Background Glitch Hover Effect */}
                <div className="absolute inset-0 bg-[#1e2023] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1] z-0" />

                {/* Header */}
                <div className="relative z-10 flex justify-between items-start mb-8">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                    File // {item.id}
                  </span>
                  <div className={`text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 ${item.status === 'DECRYPTED' ? 'text-green-500' : item.status === 'ENCRYPTED' ? 'text-red-500' : 'text-yellow-500'}`}>
                    {item.status === 'DECRYPTED' ? <Unlock size={12} /> : item.status === 'ENCRYPTED' ? <Lock size={12} /> : <Terminal size={12} />}
                    {item.status}
                  </div>
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none mb-6 group-hover:text-white">
                  {item.title}
                </h3>

                {/* Hidden Content */}
                <div className="relative z-10 overflow-hidden h-0 group-hover:h-auto transition-all duration-500">
                  <p className="text-xs font-mono text-zinc-400 leading-relaxed uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    {item.status === 'ENCRYPTED' ? "⬛⬛⬛⬛ ⬛⬛⬛⬛⬛ ⬛⬛⬛ ⬛⬛⬛⬛ ⬛⬛⬛⬛⬛ ⬛⬛ ⬛⬛⬛⬛ ⬛⬛⬛⬛⬛ ⬛⬛⬛⬛⬛⬛ ⬛⬛ ⬛⬛⬛⬛⬛⬛" : item.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ATMOSPHERIC BRIDGE / FOOTER TRANSITION */}
        <motion.section 
          style={{ opacity: opacityFade }}
          className="h-[50vh] flex flex-col items-center justify-center relative overflow-hidden border-t border-[#47484c]/30"
        >
          <motion.div style={{ y: yBackground }} className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4c4e51] via-[#050505] to-[#050505] z-0" />
          
          <h2 className="relative z-10 text-xl md:text-4xl font-mono text-zinc-600 uppercase tracking-[0.5em] text-center px-4">
            End of Transmission
          </h2>
          <div className="relative z-10 w-[1px] h-32 bg-gradient-to-b from-zinc-600 to-transparent mt-12" />
        </motion.section>

      </main>

      <Footer />
    </div>
  );
}
