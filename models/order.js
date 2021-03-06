const mongoose = require('mongoose');
const Item = require('./item');
const OrderItem = require('./orderItem');


const orderSchema = mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now
  },
  newOrder: Boolean,
  items: [OrderItem.schema],
  tax: Number,
  subTotal: Number
});

// create a model based on the schema, this lets us use mongoose methods
// this creates a mongoose "Model" object, which means it has all the query methods
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

