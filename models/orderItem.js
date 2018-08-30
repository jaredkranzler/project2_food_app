const mongoose = require('mongoose');
const Item = require('./item');

const orderItemSchema = mongoose.Schema({
  name: String,
  image: String,
  body: String,
  price: Number,
  amount: { type: Number, default: 1 },
  itemCode: String
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;

