const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('../routes/auth.routes');
const foodRoutes = require('../routes/food.routes');
const orderRoutes = require('../routes/order.routes');

const app = express();

// 🔥🔥🔥 CORS — FINAL FIX
app.use(cors({
  origin: [
    "https://food-frontend-vercel-670gxwd7o-khushis-projects-0100d339.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 🔥 VERY IMPORTANT — preflight support
app.options("*", cors());

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/order', orderRoutes);

module.exports = app;
