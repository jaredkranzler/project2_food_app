const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/restauranteur';

mongoose.connect(mongoUri)

mongoose.connection.on('connected', () => {
  console.log("mongoose is connected")
})

mongoose.connection.on('error', (err) => {
  console.log("there was an error", err)
})

mongoose.connection.on('disconnected', () => {
  console.log("mongoose is disconnected")
})