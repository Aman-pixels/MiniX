import React, { useEffect, useMemo, useState } from "react";
import useSEO from "../hooks/useSEO";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingBag, Heart } from "lucide-react";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ProductSkeleton from "../Components/skeletons/ProductSkeleton";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import axios from "axios";
import API_BASE_URL from "../config";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [dbProduct, setDbProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/product/${id}`);
        setDbProduct(data.product);
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const product = useMemo(() => {
    if (!dbProduct) return null;
    return {
      ...dbProduct,
      category: dbProduct.category?.name || "Product",
      variants: {
        sizes: ["S", "M", "L", "XL"],
        colors: [
          { name: "Obsidian", hex: "#111111" },
          { name: "Bone", hex: "#eaeaea" },
        ],
      },
      details: {
        material: "100% Heavyweight Cotton",
        fit: "Oversized Brutalist Fit",
      }
    };
  }, [dbProduct]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!product) return;
    setSelectedSize(product.variants.sizes[0]);
    setSelectedColor(product.variants.colors[0]);
    setSelectedImage(0);
  }, [product]);

  useSEO(
    product
      ? {
          title: `${product.name} // MiniX`,
          description: product.description || `Shop ${product.name}.`,
          image: product.images?.[0] || undefined,
          url: `/product/${id}`,
        }
      : { title: "Loading...", url: `/product/${id}` }
  );

  if (loading) {
    return (
      <div className="bg-[#050505]">
        <Navbar />
        <ProductSkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#050505] min-h-[100svh] flex items-center justify-center">
        <Navbar />
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white/20">Item Not Found</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, selectedSize, selectedColor, quantity: 1 });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  const isInWishlist = isWishlisted(product._id || id);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-white selection:text-black">
      <Navbar />

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-[120px] pb-32">
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Back to Archive
        </Link>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* IMAGE GALLERY */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-[#111] overflow-hidden group relative"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-auto max-h-[80vh] object-cover cursor-crosshair hover:scale-125 transition-transform duration-[2s] ease-out"
              />
            </motion.div>

            <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-24 h-32 shrink-0 bg-[#111] border transition-all duration-300 ${selectedImage === i ? "border-white" : "border-transparent opacity-50 hover:opacity-100"}`}
                >
                  <img src={img} loading="lazy" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCT INFO */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="mb-12 border-b border-white/10 pb-8">
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-4">
                ID: {product._id?.slice(-6) || id.slice(-6)} // {product.category}
              </p>
              <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                {product.name}
              </h1>
              <p className="text-2xl font-mono text-zinc-300">
                ${product.price}.00
              </p>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed mb-10 max-w-md border-l border-white/10 pl-6">
              {product.description || "Experimental design constructed with premium heavyweight materials. Engineered for motion and durability."}
            </p>

            {/* SELECTION GRID */}
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-4">Select Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center text-xs font-mono border transition-all duration-300 ${selectedSize === size ? "bg-white text-black border-white" : "border-white/20 text-white/50 hover:text-white hover:border-white/60"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-4">Select Color</p>
                <div className="flex gap-3">
                  {product.variants.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${selectedColor?.name === color.name ? "border-white scale-125" : "border-transparent opacity-50 hover:opacity-100"}`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-4">
              <button
                onClick={handleAddToCart}
                className="w-full relative group bg-white text-black font-bold uppercase tracking-widest text-sm py-5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                <span className="relative z-10 group-hover:text-white flex items-center justify-center gap-3 transition-colors duration-500">
                  <ShoppingBag size={16} /> Add to Cart
                </span>
              </button>

              <div className="flex gap-4">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 border border-white/20 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-colors"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`flex items-center justify-center w-16 border border-white/20 hover:bg-white/5 transition-colors ${isInWishlist ? 'text-pink-500' : 'text-white'}`}
                >
                  <Heart size={18} className={isInWishlist ? 'fill-pink-500' : ''} />
                </button>
              </div>
            </div>

            {/* DETAILS */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-1">Material</p>
                <p className="text-sm font-bold">{product.details.material}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-1">Fit</p>
                <p className="text-sm font-bold">{product.details.fit}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* TOAST */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed bottom-12 right-12 bg-white text-black font-mono text-xs uppercase tracking-widest px-6 py-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-50 flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Item secured
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
