import React from "react";

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-r from-[#050505] to-[#f6f5f3] py-20">
      <div className="max-w-[1250px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="text-white">
          <p className="uppercase tracking-widest text-sm text-white/60 mb-3">
            The Best Hoodies Are Only Here
          </p>

          <h1 className="font-extrabold leading-tight text-4xl sm:text-5xl lg:text-6xl mb-4">
            Minimalist <br /> Streetwear <br /> Built For Everyone
          </h1>

          <p className="text-white/70 max-w-md mb-6">
            Discover refined essentials inspired by underground culture.
            Crafted with premium materials & a focus on simplicity.
          </p>

          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => {
                const el = document.querySelector("#featured");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-[1.04] transition"
            >
              Explore Collections
            </button>

            <a
              href="/shop"
              className="border border-white/20 text-white px-5 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
            >
              Shop Now
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Hoodies", "Oversized", "Minimal", "Accessories"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm border border-white/10 text-white/70 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="bg-white/90 backdrop-blur-xl border border-black/10 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.35)] overflow-hidden w-full max-w-[440px] transition duration-300 hover:scale-[1.02]">
            <img src="/Hero.jpg" alt="hero" className="w-full h-[480px] object-cover" />
          </div>

          <div className="hidden lg:block absolute bottom-6 right-6 bg-white/95 p-4 rounded-xl shadow-md text-right">
            <h4 className="font-bold text-gray-800 text-sm">New Drop</h4>
            <p className="text-gray-600 text-xs mb-2">Premium streetwear — limited run</p>
            <a href="/shop" className="font-semibold text-gray-900 text-sm hover:underline">
              Discover Now →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
