const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/restauranteur';

<<<<<<< HEAD
mongoose.connect(mongoUri)
=======
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/restauranteur';

mongoose.connect('mongoUri')
>>>>>>> 0477903fb0122c03139a624b4549a534af8aa9cd

mongoose.connection.on('connected', () => {
  console.log("mongoose is connected")
})

mongoose.connection.on('error', (err) => {
  console.log("there was an error", err)
})

mongoose.connection.on('disconnected', () => {
  console.log("mongoose is disconnected")
})