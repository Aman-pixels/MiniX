const productData = [
  {
    id: 1,
    name: "Classic Oversized Tee",
    price: 29,
    category: "Tees",
    colors: [
      { name: "Olive", hex: "#7c7f6b" },
      { name: "Black", hex: "#111111" },
      { name: "White", hex: "#eaeaea" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=900&q=80"
    ],
    desc:
      "Premium oversized tee made from 240 GSM cotton. Slightly dropped shoulders for relaxed streetwear fit.",
    reviews: [
      { user: "John", rating: 5, comment: "Amazing quality & fit!", date: "01/11/2025" },
      { user: "Aman", rating: 4, comment: "Good but fits large.", date: "10/11/2025" }
    ],
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 2,
    name: "Minimal Hoodie",
    price: 49,
    category: "Hoodies",
    colors: [
      { name: "Gray", hex: "#b5b5b5" },
      { name: "Black", hex: "#111111" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1602810318299-eeb67d604844?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1539884051663-95fc71c48f93?auto=format&fit=crop&w=900&q=80"
    ],
    desc: "Soft fleece hoodie with minimal chest print. Designed for everyday comfort.",
    reviews: [],
    image:
      "https://images.unsplash.com/photo-1602810318299-eeb67d604844?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 3,
    name: "Streetwear Denim",
    price: 59,
    category: "Bottoms",
    colors: [
      { name: "Washed Blue", hex: "#3e4a5c" },
      { name: "Black", hex: "#111111" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=900&q=80"
    ],
    desc: "Relaxed tapered denim with Japanese streetwear influence.",
    reviews: [],
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=900&q=80"
  }
];

export default productData;
