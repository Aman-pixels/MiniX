import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:border-white/10 transition-all duration-500"
    >
      {/* IMAGE CONTAINER */}
      <div 
        onClick={() => navigate(`/product/${productId}`)}
        className="relative overflow-hidden cursor-pointer aspect-[4/5] w-full bg-[#121212]"
      >
        <img
          src={imageSrc}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1s] ease-out"
        />
        
        {/* Top Right Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-4 right-4 bg-black/30 backdrop-blur-md p-2.5 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-white hover:text-black transition-all duration-300 ${inWishlist ? 'opacity-100 translate-y-0 text-pink-500' : 'text-white'}`}
        >
          <Heart size={18} className={`transition-colors ${inWishlist ? 'fill-pink-500' : ''}`} />
        </button>

        {/* Quick Add Button sliding up */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[0.16,1,0.3,1]">
           <button
             onClick={(e) => {
               e.stopPropagation();
               addToCart({ ...product, quantity: 1, selectedSize: product.variants?.sizes?.[0] || 'M' });
             }}
             className="w-full py-3.5 bg-white/95 backdrop-blur-md text-black font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-white active:scale-95 transition-all"
           >
             <ShoppingBag size={18} /> Quick Add
           </button>
        </div>
      </div>

      {/* INFO */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-3 mb-1">
          <Link 
            to={`/product/${productId}`}
            className="text-base font-semibold text-white/90 hover:text-white transition-colors line-clamp-1"
          >
            {product.name}
          </Link>
          <span className="text-base font-medium text-white/90 whitespace-nowrap">
            ${product.price}
          </span>
        </div>
        <p className="text-zinc-500 text-sm">
          {product.category?.name || product.category || "Premium Wear"}
        </p>
      </div>
    </motion.div>
  );
}
