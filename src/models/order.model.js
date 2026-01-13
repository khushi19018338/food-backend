const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'foodPartner', required: true },
  quantity: { type: Number, default: 1 },
  address: { type: String },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
