const Order = require('../models/order.model');

async function createOrder(req, res) {
  const { foodId, partnerId, quantity, address } = req.body;
  // attach authenticated user if present
  const userId = req.user?._id;

  if (!foodId || !partnerId) {
    return res.status(400).json({ message: 'foodId and partnerId are required' });
  }

  if (quantity && (!Number.isInteger(quantity) || quantity <= 0)) {
    return res.status(400).json({ message: 'quantity must be a positive integer' });
  }

  try {
    const orderDoc = await Order.create({
      foodId,
      userId: userId || null,
      partnerId,
      quantity: quantity || 1,
      address: address || null
    });
    res.status(201).json({ message: 'Order created', order: orderDoc });
  } catch (err) {
    console.error('Order create error', err);
    res.status(500).json({ message: 'Could not create order' });
  }
}

module.exports = { createOrder };
