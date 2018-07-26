const mongoose = require('mongoose');
const Order = require('./order');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  admin: {
    type: Boolean,
    default: false,
  },
  firstName: String,
  lastName: String,
  address: String,
  city: String,
  state: String,
  zip: Number,
  phone: Number,
  email: String,
  creditCard: {
    name: String,
    ccNum: Number,
    expDate: Date,
    secNum: Number
  },
  orders: [Order.schema]
});


module.exports = mongoose.model('User', userSchema);