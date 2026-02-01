const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./Models/Product");
const Category = require("./Models/Category"); // We'll need to create/ensure categories exist

dotenv.config();

const productData = [
    // --- HOODIES ---
    {
        id: "hoodie-noir-001",
        name: "Noir Oversized Hoodie",
        category: "hoodies",
        price: 55,
        rating: 4.8,
        reviewCount: 12,
        stock: 20,
        description: "Heavyweight 400gsm cotton fleece hoodie in pitch black. Drop shoulder fit for that perfect streetwear silhouette.",
        images: [
            "https://images.unsplash.com/photo-1622332436170-9ca4389d3781?fm=jpg&q=80&w=1000",
            "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?fm=jpg&q=80&w=1000"
        ],
    },
    {
        id: "hoodie-distressed-002",
        name: "Distressed Grunge Hoodie",
        category: "hoodies",
        price: 65,
        rating: 4.5,
        reviewCount: 8,
        stock: 15,
        description: "Vintage washed grey hoodie with manual distressing details. Soft interior, rugged exterior.",
        images: [
            "https://images.unsplash.com/photo-1641735563696-020765b93506?fm=jpg&q=80&w=1000",
            "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?fm=jpg&q=80&w=1000"
        ],
    },

    // --- TEES ---
    {
        id: "tee-essential-001",
        name: "Essential Arc Tee",
        category: "tees",
        price: 35,
        rating: 4.9,
        reviewCount: 45,
        stock: 50,
        description: "The perfect boxy fit t-shirt using premium supima cotton. Anti-shrink, anti-fade.",
        images: [
            "https://images.unsplash.com/photo-1627225793904-a2f900a6e4cf?fm=jpg&q=80&w=1000",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?fm=jpg&q=80&w=1000"
        ],
    },
    {
        id: "tee-graphic-002",
        name: "Urban Graphic Tee",
        category: "tees",
        price: 40,
        rating: 4.6,
        reviewCount: 18,
        stock: 30,
        description: "Oversized graphic tee featuring abstract noir artwork. Puff print technique.",
        images: [
            "https://images.unsplash.com/photo-1706550632237-24b904d8097a?fm=jpg&q=80&w=1000",
            "https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?fm=jpg&q=80&w=1000"
        ],
    },

    // --- BOTTOMS ---
    {
        id: "bottom-cargo-001",
        name: "Tech Utility Cargos",
        category: "bottoms",
        price: 75,
        rating: 4.7,
        reviewCount: 22,
        stock: 18,
        description: "Functional cargo pants with 6 pockets and adjustable ankle toggles. Water-resistant matte finish.",
        images: [
            "https://images.unsplash.com/photo-1666899462970-40dfe2ef3a70?fm=jpg&q=80&w=1000",
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?fm=jpg&q=80&w=1000"
        ],
    },
    {
        id: "bottom-denim-002",
        name: "90s Baggy Denim",
        category: "bottoms",
        price: 68,
        rating: 4.4,
        reviewCount: 15,
        stock: 25,
        description: "Authentic heavy rigid denim with a wide leg silhouette. Light stone wash finish.",
        images: [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?fm=jpg&q=80&w=1000",
            "https://images.unsplash.com/photo-1582552938357-32b906df40cb?fm=jpg&q=80&w=1000"
        ],
    },

    // --- ACCESSORIES ---
    {
        id: "acc-chain-001",
        name: "Cuban Link Chain",
        category: "accessories",
        price: 45,
        rating: 4.8,
        reviewCount: 30,
        stock: 40,
        description: "8mm Stainless Steel Cuban Chain. Polished silver finish, will not tarnish or fade.",
        images: [
            "https://images.unsplash.com/photo-1679973299383-7a60160b03a2?fm=jpg&q=80&w=1000",
            "https://images.unsplash.com/photo-1611085583191-a3b181a88401?fm=jpg&q=80&w=1000"
        ],
    },
    {
        id: "acc-ring-002",
        name: "Minimal Signet Ring",
        category: "accessories",
        price: 25,
        rating: 4.5,
        reviewCount: 10,
        stock: 35,
        description: "Classic signet ring with a brutalist texture. Solid feel and premium weight.",
        images: [
            "https://images.unsplash.com/photo-1680068099053-81f58fff58a1?fm=jpg&q=80&w=1000",
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?fm=jpg&q=80&w=1000"
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
