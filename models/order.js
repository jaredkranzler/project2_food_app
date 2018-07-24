const mongoose = require('mongoose');
const Item = require('./item');


const orderSchema = mongoose.Schema({
  orderDate: Date,
  newOrder: Boolean, 
  items: [Item.schema]
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

