// create server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('../routes/auth.routes');
const foodRoutes = require('../routes/food.routes');
const orderRoutes = require('../routes/order.routes');
const cors = require('cors');
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true

}
));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/order', orderRoutes);



module.exports = app;
