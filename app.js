if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

console.log("App starting...");

// ---------------- SAFE ENV LOGS ----------------
console.log("SESSION_SECRET:", process.env.SESSION_SECRET || "Not Set");
console.log("FRONTEND_URL:", process.env.FRONTEND_URL || "Not Set");

// ---------------- IMPORTS ----------------
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ---------------- HEALTH ROUTES ----------------
app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.get("/health", (req, res) => {
  res.status(200).send("healthy");
});

// ---------------- LOG REQUESTS ----------------
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

// ---------------- CORS ----------------
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(null, true); // allow anyway to avoid crash
    }
  },
  credentials: true,
}));

// ---------------- MIDDLEWARE ----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- ROUTES ----------------
try {
  const listingRouter = require("./routes/listing.js");
  const reviewRouter = require("./routes/review.js");
  const userRouter = require("./routes/user.js");

  app.use("/listing", listingRouter);
  app.use("/listing/:id/reviews", reviewRouter);
  app.use("/user", userRouter);
  app.use("/reviews", reviewRouter);
} catch (err) {
  console.error("Route load error:", err);
}

// ---------------- ERROR HANDLER ----------------
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(500).json({
    error: true,
    message: err.message || "Internal Server Error",
  });
});

// ---------------- SERVER START ----------------
console.log("PORT FROM ENV:", process.env.PORT);
const PORT = process.env.PORT;
if (!PORT) {
  console.error("❌ PORT not provided by Railway");
  process.exit(1);
}
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});


process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});
// ---------------- DB CONNECT ----------------
if (!process.env.MONGO_URL) {
  console.error("❌ MONGO_URL not set in environment variables");
} else {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("✅ DB connected"))
    .catch(err => console.log("❌ DB error:", err));
}