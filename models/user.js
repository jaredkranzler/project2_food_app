const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String
  creditCard: {
    name: String,
    ccNum: Number,
    expDate: Date,
    secNum: Number
  }
});

module.exports = mongoose.model('User', userSchema);