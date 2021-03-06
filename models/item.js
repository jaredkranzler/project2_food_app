const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: String,
  image: String,
  body: String,
  price: Number,
  amount: Number
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;

