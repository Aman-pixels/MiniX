MiniX – Modern Fashion E-Commerce Store (Full-Stack MERN App)

MiniX is a high-end, modern e-commerce fashion store built using React, Vite, Tailwind CSS, Node.js, Express, MongoDB, and JWT authentication.
Designed with glassmorphism, smooth Framer Motion animations, and a clean UI that feels premium.

🔥 Features
🛒 Frontend (React + Vite + Tailwind + Framer Motion)

Fully responsive modern UI

Glassmorphism Navbar, product cards, buttons

Smooth page transitions using Framer Motion

Fully working:

Home page

Collections

Shop page

Product details page

Cart & Wishlist system

Toast + animation

User authentication UI (Login / Register)

🔐 Authentication System

Cookie-based JWT authentication

Auto-login on refresh

Protected routes

Login / logout animations

❤️ User Features

Add to cart (works with localStorage persistence)

Add to wishlist

View saved items

Profile dropdown menu

Planned pages:

Profile page

Orders

Addresses

Payment methods

🖥️ Backend (Node + Express + MongoDB + JWT)

User registration

Login with JWT

Protected route /api/auth/me

Secure HTTP-only cookies

Bcrypt password hashing

CORS configured for Vite frontend

🗂️ Project Structure
MiniX/
│
├── MiniX/                   # Frontend (React)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/                 # Backend (Node + Express)
│   ├── Controllers/
│   ├── Middleware/
│   ├── Models/
│   ├── Routes/
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json

⚙️ Installation & Setup
1️⃣ Clone the Repo
git clone https://github.com/Aman-pixels/MiniX.git
cd MiniX

2️⃣ Install Frontend
cd MiniX
npm install
npm run dev

3️⃣ Install Backend
cd ../backend
npm install
node server.js

🔑 Environment Variables

Create a .env file in /backend:

MONGO_URI=your_mongo_atlas_url
JWT_SECRET=your_secret_key

🛠️ Tech Stack
Frontend

React

Vite

Tailwind CSS

Framer Motion

Lucide Icons

Backend

Node.js

Express

MongoDB + Mongoose

JWT

Bcrypt

Cookie-Parser

📸 Screenshots
![MiniX Screenshot](https://github.com/user-attachments/assets/45adef96-6d3e-43af-b0b1-1f14aee65744)




📅 Roadmap

 Profile Page

 Orders Page

 Saved Addresses Page

 Payment Methods Page

 Admin dashboard

 Full checkout + Stripe/UPI payment

🤝 Contributing

Pull requests are welcome!

⭐ Support

If you like this project, consider giving the repo a star ⭐ on GitHub!
