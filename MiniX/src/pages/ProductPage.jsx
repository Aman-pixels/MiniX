import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  ShoppingBag,
  Heart,
  HeartOff,
  Plus,
  Minus,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
// import { toast } from "react-hot-toast"; // or whatever toast you use

// ✅ Fallback demo product (you can delete when using real data)
const fallbackProduct = {
  id: 1,
  name: "Classic Oversized Tee",
  category: "Tees",
  price: 29,
  rating: 4.5,
  reviewCount: 2,
  stock: 6,
  badge: "Limited stock",
  description:
    "Premium oversized tee made from 240 GSM cotton. Slightly dropped shoulders for relaxed streetwear fit.",
  materials: "100% Cotton, 240 GSM",
  fit: "Oversized, dropped shoulders",
  sizes: ["S", "M", "L", "XL"],
  colors: [
    { name: "Olive", value: "#4b5d47" },
    { name: "Shadow", value: "#2c2c2c" },
    { name: "Sand", value: "#c2b49a" },
  ],
  images: [
    "/images/tee-1.jpg",
    "/images/tee-2.jpg",
    "/images/tee-3.jpg",
  ],
};

// ✅ Dummy recommended products (replace with real data later)
const recommended = [
  {
    id: 2,
    name: "Heavyweight Street Hoodie",
    price: 59,
    thumb: "/images/hoodie-1.jpg",
    tag: "New",
  },
  {
    id: 3,
    name: "Essential Cargo Pants",
    price: 49,
    thumb: "/images/cargo-1.jpg",
    tag: "Bestseller",
  },
  {
    id: 4,
    name: "Minimalist Logo Cap",
    price: 19,
    thumb: "/images/cap-1.jpg",
    tag: "Popular",
  },
  {
    id: 5,
    name: "Everyday Crewneck",
    price: 39,
    thumb: "/images/crew-1.jpg",
    tag: "Restocked",
  },
];

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

export default function ProductPage() {
  const { id } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // 🔗 Try getting product from location.state or fallback
  const product = useMemo(() => {
    return location.state?.product || { ...fallbackProduct, id };
  }, [location.state, id]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[1] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: "50%", y: "50%" });
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAddAnim, setShowAddAnim] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Arjun",
      rating: 5,
      comment: "Quality is insane, fits perfectly with cargos.",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Kriti",
      rating: 4,
      comment: "Fabric is thick and premium. Slightly long but looks dope.",
      date: "1 week ago",
    },
  ]);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  const isWishlisted = wishlist?.some((item) => item.id === product.id);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x: `${x}%`, y: `${y}%` });
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      // toast.error("Please select a size");
      return;
    }

    setIsAddingToCart(true);
    setShowAddAnim(true);

    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    });

    // toast.success("Added to cart");

    setTimeout(() => {
      setIsAddingToCart(false);
    }, 500);

    setTimeout(() => {
      setShowAddAnim(false);
    }, 800);
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      // toast("Removed from wishlist");
    } else {
      addToWishlist(product);
      // toast.success("Added to wishlist");
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    setReviews((prev) => [
      {
        id: Date.now(),
        ...newReview,
        date: "Just now",
      },
      ...prev,
    ]);

    setNewReview({ name: "", rating: 5, comment: "" });
    setIsReviewModalOpen(false);
    // toast.success("Review submitted");
  };

  const handleQtyChange = (type) => {
    setQuantity((prev) => {
      if (type === "inc") return prev + 1;
      if (type === "dec") return prev > 1 ? prev - 1 : 1;
      return prev;
    });
  };

  const currentImage = product.images?.[selectedImageIndex];

  return (
    <>
      <Navbar />

      <motion.main
        className="min-h-screen bg-[#050509] text-white pt-24 pb-16"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-0">
          {/* Back link */}
          <div className="mb-6 flex items-center gap-2 text-sm text-zinc-400">
            <ArrowLeft size={18} />
            <Link
              to="/shop"
              className="hover:text-white transition-colors inline-flex items-center gap-1"
            >
              Back to Shop
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* LEFT: Image + gallery */}
            <div className="space-y-4">
              <motion.div
                className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-900/60 border border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.6)]"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
              >
                <motion.img
                  key={currentImage}
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0.2, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                />

                {/* subtle zoom overlay */}
                <AnimatePresence>
                  {isZooming && (
                    <motion.div
                      className="pointer-events-none absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div
                        className="absolute w-[220%] h-[220%] -left-1/2 -top-1/2 opacity-0 lg:opacity-100"
                        style={{
                          backgroundImage: `url(${currentImage})`,
                          backgroundPosition: `${zoomPos.x} ${zoomPos.y}`,
                          backgroundSize: "200%",
                          backgroundRepeat: "no-repeat",
                          transition: "background-position 80ms linear",
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Limited stock pill */}
                {product.stock && product.stock < 10 && (
                  <motion.div
                    className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30 backdrop-blur"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-flex items-center gap-1 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(250,204,21,0.9)]" />
                      Limited stock ({product.stock} left)
                    </span>
                  </motion.div>
                )}
              </motion.div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {product.images?.map((img, index) => (
                  <button
                    key={img + index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-20 w-20 rounded-2xl overflow-hidden border transition-all ${
                      selectedImageIndex === index
                        ? "border-white/80 scale-100 shadow-lg"
                        : "border-white/10 hover:border-white/40 hover:scale-[1.02]"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name}-${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 text-xs text-zinc-400 mt-4">
                <div className="rounded-2xl border border-white/5 bg-zinc-900/60 px-3 py-3">
                  ✓ Free shipping over $50
                </div>
                <div className="rounded-2xl border border-white/5 bg-zinc-900/60 px-3 py-3">
                  ✓ 14-day hassle-free returns
                </div>
                <div className="rounded-2xl border border-white/5 bg-zinc-900/60 px-3 py-3">
                  ✓ Premium 240 GSM fabrics
                </div>
              </div>
            </div>

            {/* RIGHT: Info / controls */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="uppercase tracking-[0.18em] text-[11px] text-zinc-500">
                  {product.category || "Apparel"}
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold">
                      ${product.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-zinc-400">
                    <Star size={16} className="text-amber-400 fill-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-zinc-500">
                      ({product.reviewCount || reviews.length} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {product.description}
              </p>

              {/* Size */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="tracking-[0.16em] uppercase text-zinc-400">
                    Select size
                  </span>
                  <button className="text-zinc-500 hover:text-zinc-200 underline-offset-2 hover:underline">
                    Size guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full text-sm border transition-all ${
                        selectedSize === size
                          ? "border-white bg-white text-black"
                          : "border-white/10 text-zinc-200 hover:border-white/60"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="space-y-2">
                <p className="text-xs tracking-[0.16em] uppercase text-zinc-400">
                  Color
                </p>
                <div className="flex items-center gap-3">
                  {product.colors?.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-7 h-7 rounded-full border-2 transition-all ${
                        selectedColor?.name === color.name
                          ? "border-white scale-110"
                          : "border-transparent hover:border-white/50"
                      }`}
                      style={{ backgroundColor: color.value }}
                    >
                      {selectedColor?.name === color.name && (
                        <span className="absolute inset-0 rounded-full border border-white/70" />
                      )}
                    </button>
                  ))}
                  {selectedColor && (
                    <span className="text-xs text-zinc-400">
                      {selectedColor.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <p className="text-xs tracking-[0.16em] uppercase text-zinc-400">
                  Quantity
                </p>
                <div className="inline-flex items-center gap-4 rounded-full border border-white/10 bg-zinc-900/70 px-4 py-2">
                  <button
                    onClick={() => handleQtyChange("dec")}
                    className="p-1 rounded-full hover:bg-white/10"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center text-sm">{quantity}</span>
                  <button
                    onClick={() => handleQtyChange("inc")}
                    className="p-1 rounded-full hover:bg-white/10"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Primary actions */}
              <div className="flex flex-wrap gap-3 items-center">
                <motion.button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || product.stock === 0}
                  className="relative flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-5 py-3 text-sm font-medium shadow-[0_0_40px_rgba(255,255,255,0.25)] disabled:opacity-70"
                  whileTap={{ scale: 0.97 }}
                  animate={
                    isAddingToCart
                      ? { scale: [1, 0.97, 1.02, 1], boxShadow: "0 0 60px rgba(255,255,255,0.35)" }
                      : {}
                  }
                  transition={{ duration: 0.4 }}
                >
                  <ShoppingBag size={18} />
                  {product.stock === 0 ? "Out of stock" : "Add to Cart"}
                </motion.button>

                <button className="flex-1 inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm text-white/90 hover:border-white hover:bg-white/5 transition-colors">
                  Buy Now
                </button>

                <button
                  onClick={handleWishlistToggle}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-3 py-2 hover:border-white/50 hover:bg-white/5 transition-colors"
                >
                  {isWishlisted ? (
                    <HeartOff size={18} className="text-pink-400" />
                  ) : (
                    <Heart size={18} className="text-pink-400" />
                  )}
                </button>
              </div>

              {/* Floating add-to-cart animation */}
              <AnimatePresence>
                {showAddAnim && (
                  <motion.div
                    className="pointer-events-none fixed bottom-24 right-6 z-40"
                    initial={{ opacity: 0, y: 30, scale: 0.6 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.7 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 shadow-xl text-xs">
                      <ShoppingBag size={16} />
                      <span>Added to cart</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Details mini-grid */}
              <div className="grid sm:grid-cols-3 gap-3 text-xs text-zinc-400 pt-3 border-t border-white/5 mt-4">
                <div>
                  <p className="text-zinc-500">Material</p>
                  <p className="mt-1">{product.materials}</p>
                </div>
                <div>
                  <p className="text-zinc-500">Fit</p>
                  <p className="mt-1">{product.fit}</p>
                </div>
                <div>
                  <p className="text-zinc-500">Care</p>
                  <p className="mt-1">Cold wash, inside out, no tumble dry.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description & shipping accordions */}
          <div className="mt-10 space-y-3">
            <details className="group rounded-2xl border border-white/5 bg-zinc-900/60">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm">
                <span>Product Description</span>
                <span className="text-xs text-zinc-400 group-open:rotate-90 transition-transform">
                  ▸
                </span>
              </summary>
              <div className="px-4 pb-4 text-sm text-zinc-300 space-y-2">
                <p>
                  Heavyweight 240 GSM cotton with a soft, brushed feel.
                  Dropped shoulders and relaxed body for an oversized look
                  that still sits clean.
                </p>
                <ul className="list-disc list-inside text-zinc-400 space-y-1">
                  <li>Pre-shrunk fabric for consistent fit</li>
                  <li>Reinforced neckline to prevent sagging</li>
                  <li>No harsh branding on front, minimal MiniX label</li>
                </ul>
              </div>
            </details>

            <details className="group rounded-2xl border border-white/5 bg-zinc-900/60">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm">
                <span>Shipping & Returns</span>
                <span className="text-xs text-zinc-400 group-open:rotate-90 transition-transform">
                  ▸
                </span>
              </summary>
              <div className="px-4 pb-4 text-sm text-zinc-300 space-y-2">
                <p>Orders dispatch in 24–48 hours from our Bangalore hub.</p>
                <ul className="list-disc list-inside text-zinc-400 space-y-1">
                  <li>Standard delivery: 3–6 business days</li>
                  <li>Free shipping on orders above $50</li>
                  <li>14-day easy returns on unworn items</li>
                </ul>
              </div>
            </details>
          </div>

          {/* Reviews */}
          <section className="mt-12 grid lg:grid-cols-[2fr,1.2fr] gap-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Reviews</h2>
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/20 hover:border-white hover:bg-white/5 transition"
                >
                  Write a review
                </button>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-2xl border border-white/5 bg-zinc-900/70 px-4 py-3"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-medium">{review.name}</p>
                      <span className="text-[11px] text-zinc-500">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-1 text-xs">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < review.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-zinc-600"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-sm text-zinc-300">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating summary */}
            <div className="rounded-2xl border border-white/5 bg-zinc-900/70 px-5 py-4 text-sm">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 mb-2">
                Rating summary
              </p>
              <div className="flex items-end gap-3 mb-3">
                <span className="text-3xl font-semibold">
                  {product.rating}
                </span>
                <div className="flex flex-col text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Star
                      size={16}
                      className="text-amber-400 fill-amber-400"
                    />
                    {reviews.length} verified reviews
                  </span>
                  <span>Most people say it fits true to size.</span>
                </div>
              </div>
              <p className="text-xs text-zinc-500">
                Built for everyday wear — not just Instagram fits.
              </p>
            </div>
          </section>

          {/* Review modal */}
          <AnimatePresence>
            {isReviewModalOpen && (
              <motion.div
                className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-full max-w-md rounded-3xl bg-zinc-900/95 border border-white/10 p-5"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-semibold">
                      Write a review
                    </h3>
                    <button
                      onClick={() => setIsReviewModalOpen(false)}
                      className="text-xs text-zinc-400 hover:text-zinc-100"
                    >
                      Close
                    </button>
                  </div>

                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs text-zinc-400">
                        Name
                      </label>
                      <input
                        type="text"
                        value={newReview.name}
                        onChange={(e) =>
                          setNewReview((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
                        placeholder="How should we address you?"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-zinc-400">
                        Rating
                      </label>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const value = i + 1;
                          return (
                            <button
                              type="button"
                              key={value}
                              onClick={() =>
                                setNewReview((prev) => ({
                                  ...prev,
                                  rating: value,
                                }))
                              }
                            >
                              <Star
                                size={20}
                                className={
                                  value <= newReview.rating
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-zinc-600"
                                }
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-zinc-400">
                        Comment
                      </label>
                      <textarea
                        rows={3}
                        value={newReview.comment}
                        onChange={(e) =>
                          setNewReview((prev) => ({
                            ...prev,
                            comment: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40 resize-none"
                        placeholder="Share your thoughts about fit, fabric, quality..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-1 w-full rounded-full bg-white text-black py-2.5 text-sm font-medium hover:bg-zinc-100 transition"
                    >
                      Submit review
                    </button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recommended / You may also like */}
          <section className="mt-14">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">You may also like</h2>
              <Link
                to="/shop"
                className="text-xs text-zinc-400 hover:text-zinc-100"
              >
                View all
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommended.map((item) => (
                <motion.div
                  key={item.id}
                  className="group rounded-3xl border border-white/5 bg-zinc-900/60 overflow-hidden hover:border-white/40 transition-all cursor-pointer"
                  whileHover={{ y: -4 }}
                >
                  <Link
                    to={`/product/${item.id}`}
                    state={{ product: item }}
                    className="block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={item.thumb}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 text-[10px] px-2 py-1 rounded-full bg-white/90 text-black font-medium">
                        {item.tag}
                      </span>
                    </div>
                    <div className="px-3 py-3 space-y-1 text-sm">
                      <p className="font-medium line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-zinc-300">${item.price}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Sticky mobile add-to-cart bar */}
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-black/90 backdrop-blur md:hidden">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex flex-col text-xs text-zinc-300">
              <span className="font-medium">${product.price}</span>
              <span className="text-zinc-500">Total · {quantity} item</span>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-white text-black py-2 text-xs font-medium"
            >
              <ShoppingBag size={16} />
              Add to Cart
            </button>
          </div>
        </div>
      </motion.main>

      <Footer />
    </>
  );
}
