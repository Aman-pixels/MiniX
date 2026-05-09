import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import productData from "../data/productData";
import { Plus } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function FeaturedProduct() {
  const featured = productData.slice(0, 3);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#1e1f22] text-white py-32 px-6 lg:px-12 overflow-hidden selection:bg-[#47484c] selection:text-white"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* Editorial Header */}
        <div className="flex flex-col mb-24 relative z-10">
          <div className="flex justify-between items-start border-b border-[#47484c] pb-8 mb-8">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#4c4e51] mb-4">
                03 // Campaign
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                Featured <br /> Kinetics
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden md:block text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-500"
            >
              Enter Showcase →
            </Link>
          </div>
          <motion.p 
            style={{ y: yText }}
            className="text-sm font-medium text-[#4c4e51] max-w-sm pl-4 border-l border-[#47484c] uppercase tracking-widest leading-relaxed hidden lg:block absolute right-0 top-32"
          >
            A curated selection of our most advanced silhouettes. Designed for extreme utility and minimalist aesthetics.
          </motion.p>
        </div>

        {/* Brutalist Layout Stack */}
        <div className="flex flex-col gap-12 lg:gap-32">
          {featured.map((product, index) => {
            const isEven = index % 2 === 0;
            const productId = product.slug || product.id || product._id;
            
            return (
              <div 
                key={productId}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16 group`}
              >
                {/* Image Block */}
                <div 
                  className="w-full lg:w-[60%] h-[60vh] lg:h-[80vh] relative overflow-hidden bg-[#1e2023] cursor-pointer"
                  onClick={() => navigate(`/product/${productId}`)}
                >
                  <motion.img 
                    initial={{ scale: 1.1, filter: "grayscale(100%)" }}
                    whileInView={{ scale: 1, filter: "grayscale(0%)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    src={product.images?.[0] || product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-80 transition-all duration-[1.5s] ease-[0.16,1,0.3,1] mix-blend-luminosity hover:mix-blend-normal"
                  />
                  <div className="absolute inset-0 bg-[#1e1f22]/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                  
                  {/* Floating Tags */}
                  <div className="absolute top-6 left-6 flex flex-col gap-1 text-[10px] font-mono uppercase tracking-[0.2em] mix-blend-difference text-white">
                    <span>Item // {productId.toString().slice(-4)}</span>
                    <span>Class // {product.category || "Apparel"}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({ ...product, quantity: 1, selectedSize: product.variants?.sizes?.[0] || 'M' });
                    }}
                    className="absolute bottom-6 right-6 bg-white text-black w-12 h-12 flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[0.16,1,0.3,1] hover:scale-110"
                  >
                    <Plus size={20} strokeWidth={2} />
                  </button>
                </div>

                {/* Text Block */}
                <div className="w-full lg:w-[40%] flex flex-col justify-center">
                  <div className="overflow-hidden mb-4">
                    <motion.div 
                      initial={{ y: "100%" }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#4c4e51] mb-2"
                    >
                      Issue {index + 1}
                    </motion.div>
                  </div>
                  
                  <motion.h3 
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6 hover:text-[#47484c] cursor-pointer transition-colors"
                    onClick={() => navigate(`/product/${productId}`)}
                  >
                    {product.name}
                  </motion.h3>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="flex flex-col gap-6"
                  >
                    <p className="text-lg font-mono text-zinc-300 border-b border-[#47484c] pb-6 inline-block w-max">
                      ${product.price}.00
                    </p>
                    
                    <button
                      onClick={() => navigate(`/product/${productId}`)}
                      className="group/btn relative w-max px-8 py-4 bg-white text-[#1e1f22] text-xs font-bold uppercase tracking-[0.2em] overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-[#4c4e51] translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                      <span className="relative z-10 group-hover/btn:text-white transition-colors duration-500">Inspect</span>
                    </button>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-20 md:hidden border-t border-[#47484c] pt-8">
          <Link
            to="/shop"
            className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
          >
            Enter Showcase →
          </Link>
        </div>
      </div>
    </section>
  );
}
