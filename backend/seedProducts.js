const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./Models/Product");
const Category = require("./Models/Category"); // We'll need to create/ensure categories exist

dotenv.config();

const productData = [
    {
        id: "tee-001",
        name: "Classic Oversized Tee",
        category: "tees",
        price: 29,
        rating: 4.5,
        reviewCount: 2,
        stock: 6,
        description:
            "Premium oversized tee made from 240 GSM cotton. Slightly dropped shoulders for relaxed streetwear fit.",
        images: [
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1200&q=80",
        ],
    },
    {
        id: "hoodie-001",
        name: "Minimal Hoodie",
        category: "hoodies",
        price: 49,
        rating: 4.3,
        reviewCount: 0,
        stock: 10,
        description:
            "Soft fleece hoodie with minimal chest print. Designed for everyday comfort.",
        images: [
            "https://images.unsplash.com/photo-1602810318299-eeb67d604844?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1539884051663-95fc71c48f93?auto=format&fit=crop&w=1200&q=80",
        ],
    },
    {
        id: "bottom-001",
        name: "Streetwear Denim",
        category: "bottoms",
        price: 59,
        rating: 4.6,
        reviewCount: 0,
        stock: 4,
        description:
            "Relaxed tapered denim with Japanese streetwear influence.",
        images: [
            "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1200&q=80",
        ],
    },
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        // Clear existing products? Maybe better to upsert or just clear for clean slate
        // await Product.deleteMany({});
        // console.log("Cleared existing products");

        for (const p of productData) {
            // 1. Ensure Category Exists
            let category = await Category.findOne({ slug: p.category });
            if (!category) {
                category = await Category.create({
                    name: p.category.charAt(0).toUpperCase() + p.category.slice(1),
                    slug: p.category,
                    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=300&q=80", // Placeholder
                    description: `All ${p.category} products`,
                });
                console.log(`Created category: ${category.name}`);
            }

            // 2. Create/Update Product
            // We use the 'id' from frontend as the 'slug' in backend to match logic
            const existingProduct = await Product.findOne({ slug: p.id });
            if (existingProduct) {
                console.log(`Product already exists: ${p.name}`);
                // Optionally update it
                existingProduct.stock = p.stock;
                existingProduct.price = p.price;
                existingProduct.category = category._id;
                await existingProduct.save();
            } else {
                await Product.create({
                    name: p.name,
                    slug: p.id, // VITAL: Mapping frontend ID to backend slug
                    description: p.description,
                    price: p.price,
                    stock: p.stock,
                    images: p.images,
                    category: category._id,
                    isFeatured: true,
                });
                console.log(`Created product: ${p.name}`);
            }
        }

        console.log("Seeding completed");
        process.exit();
    } catch (error) {
        console.error("Error seeding products:", JSON.stringify(error, null, 2));
        process.exit(1);
    }
};

seedProducts();
