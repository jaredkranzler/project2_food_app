const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  admin: {
    type: Boolean,
    default: false,
  },
  creditCard: {
    name: String,
    ccNum: Number,
    expDate: Date,
    secNum: Number
  }
});

module.exports = mongoose.model('User', userSchema);