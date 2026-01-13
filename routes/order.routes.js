const express = require('express');
const router = express.Router();
const orderController = require('../src/controllers/order.controller');
const authMiddleware = require('../src/middlewares/auth.middleware');

// Orders require an authenticated user
router.post('/', authMiddleware.authUserMiddleware, orderController.createOrder);

module.exports = router;
