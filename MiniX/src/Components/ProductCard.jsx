import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const navigate = useNavigate();

  const productId = product.slug || product._id || product.id;
  const imageSrc = product.images?.[0] || product.image;
  const inWishlist = isWishlisted(productId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col relative w-full"
    >
      {/* Cinematic Image Container */}
      <div 
        onClick={() => navigate(`/product/${productId}`)}
        className="relative overflow-hidden cursor-pointer aspect-[3/4] w-full bg-[#111] mb-5"
      >
        <motion.img
          src={imageSrc}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover origin-center transition-transform duration-[1.2s] ease-[0.16,1,0.3,1] group-hover:scale-110 group-hover:opacity-80"
        />
        
        {/* Wishlist Button - Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-white transition-all duration-500 ease-[0.16,1,0.3,1] ${inWishlist ? 'opacity-100 translate-y-0 text-white' : 'text-white hover:text-black'}`}
        >
          <Heart size={16} strokeWidth={2} className={`transition-colors ${inWishlist ? 'fill-white' : ''}`} />
        </button>

        {/* Stock Badge - Top Left */}
        {product.stock !== undefined && product.stock <= 5 && (
          <div className={`absolute top-4 left-4 z-10 px-3 py-1 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md ${product.stock === 0 ? 'bg-zinc-800/90 text-white' : 'bg-red-600/90 text-white'}`}>
            {product.stock === 0 ? "Out of Stock" : `Only ${product.stock} left!`}
          </div>
        )}

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart({ ...product, quantity: 1, selectedSize: product.variants?.sizes?.[0] || 'M' });
            }}
            className="pointer-events-auto translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[0.16,1,0.3,1] delay-100 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white border border-white/30 px-6 py-3 rounded-full hover:bg-white hover:text-black"
          >
            <Plus size={14} /> Quick Add
          </button>
        </div>
      </div>

      {/* Brutalist Typographic Info */}
      <div className="flex flex-col">
        <div className="flex justify-between items-baseline border-b border-white/10 pb-3 mb-2">
          <Link 
            to={`/product/${productId}`}
            className="text-lg font-bold text-white uppercase tracking-tight hover:text-zinc-400 transition-colors line-clamp-1 pr-4"
          >
            {product.name}
          </Link>
          <span className="text-sm font-mono text-white whitespace-nowrap">
            ${product.price}
          </span>
        </div>
        <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
          {product.category?.name || product.category || "Apparel"} // {product.variants?.sizes?.length || 4} SIZES
        </p>
      </div>
    </motion.div>
  );
}
