const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("../routes/auth.routes");
const foodRoutes = require("../routes/food.routes");
const orderRoutes = require("../routes/order.routes");

const app = express();

// ✅ CORS CONFIG
const allowedOrigins = [
  "https://food-frontend-vercel.vercel.app",
  "https://food-frontend-vercel-670gxwd7o-khushis-projects-0100d339.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/order", orderRoutes);

module.exports = app;
