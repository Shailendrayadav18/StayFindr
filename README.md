# 🏡 StayFindr

StayFindr is a full-stack property listing and booking platform that allows users to explore, create, and manage property listings with interactive maps and image uploads.

---

## 🚀 Live Demo

🌐 Frontend: https://stay-findr.vercel.app  
🔗 Backend API: https://stayfindr-backend.onrender.com  

---

## 📌 Project Purpose

StayFindr was built to simulate a real-world property rental platform (like Airbnb) where users can:

- Browse property listings
- View location on maps
- Upload images
- Create and manage listings
- Authenticate securely

The goal of this project is to demonstrate **full-stack development skills**, including frontend, backend, database integration, and deployment.

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router
- Bootstrap / CSS
- Google Maps API
- React Hook Form

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Passport.js (Authentication)
- Express Session

### Cloud & Services
- MongoDB Atlas (Database)
- Cloudinary (Image Upload)
- Render (Backend Hosting)
- Vercel (Frontend Hosting)
- Google Maps API

---

## ✨ Features

### 👤 Authentication
- User signup & login
- Session-based authentication
- Protected routes

### 🏘️ Listings
- Create new property listings
- View all listings
- View single listing details
- Delete listings (owner only)

### 📸 Image Upload
- Upload images using Cloudinary
- Preview before upload

### 🗺️ Map Integration
- View property location using Google Maps
- Dynamic coordinates rendering

### ⭐ Reviews
- Add reviews to listings
- View user feedback

---

## 📂 Project Structure

StayFindr/
├── controller/                                                                                         
│ ├── listing.js                                                                              
│ ├── review.js                                                                            
│ └── user.js                                                                                                           

├── models/                                                                       
│ ├── listing.js                                                                                                        
│ ├── review.js                                                                                                                       
│ └── user.js                                                                                                              

├── route/                                                                                         
│ ├── listing.js                                                                                                                
│ ├── review.js                                                                                                                         
│ └── user.js                                                                                                              

├── utils/                                                                                               
│ ├── wrapAsync.js                                                                                                  
│ └── ExpressError.js                                                                                           

├── frontend/
│ └── src/
│ ├── component/
│ ├── layouts/
│ │ ├── AccountLayout.css
│ │ ├── AccountLayout.jsx
│ │ ├── AuthLayout.jsx
│ │ ├── MainLayout.jsx
│ │ └── ProtectedRoute.jsx
│ │
│ ├── navbar/
│ │ ├── logo.jsx
│ │ ├── LogoName.jsx
│ │ ├── nav.css
│ │ ├── nav.jsx
│ │ └── NavElement.jsx
│ │
│ ├── pages/
│ │ ├── create/
│ │ ├── edit/
│ │ ├── show/
│ │ └── user/
│ │
│ └── context/
│ └── Authcontext.jsx

├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/StayFindr.git
cd StayFindr
```
### 2️⃣ Backend Setup

```bash
npm install
```

Run backend:

```bash
npm start
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

🔮 Future Improvements

🔍 Advanced filters & search
❤️ Wishlist feature
💬 Chat system
📱 Better mobile UI
⚡ Performance optimization

👨‍💻 Author

Shailendra Yadav
GitHub: https://github.com/Shailendrayadav18
