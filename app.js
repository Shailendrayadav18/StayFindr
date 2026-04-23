if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

console.log("App starting...");
console.log("SESSION_SECRET:", process.env.SESSION_SECRET);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

const express = require("express");
const app = express();

// ✅ HEALTH ROUTES (TOP - VERY IMPORTANT)
app.get("/", (req, res) => {
  console.log("Health check hit");
  res.status(200).send("OK");
});

app.get("/health", (req, res) => {
  res.status(200).send("healthy");
});

// ✅ LOG REQUESTS
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

// ---------------- IMPORTS ----------------
const mongoose = require("mongoose");
const cors = require("cors");

// ---------------- CORS ----------------
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ---------------- MIDDLEWARE ----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- ROUTES ----------------
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.use("/listing", listingRouter);
app.use("/listing/:id/reviews", reviewRouter);
app.use("/user", userRouter);
app.use("/reviews", reviewRouter);

// ---------------- ERROR HANDLER ----------------
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(500).json({ error: true, message: err.message });
});

// ---------------- SERVER START ----------------
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ---------------- DB CONNECT (AFTER SERVER) ----------------
console.log("MONGO_URL:", process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch(err => console.log("DB error:", err));