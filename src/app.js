const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authRoutes = require('../routes/auth.routes');
const foodRoutes = require('../routes/food.routes');
const orderRoutes = require('../routes/order.routes');

const app = express();

// 🔥 CORS FIRST
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://food-frontend.vercel.app"
  ],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/order', orderRoutes);

module.exports = app;
