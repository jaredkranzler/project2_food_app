const express = require('express');
const app = express();
const session = require('express-session'); // for login
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const PORT = 3000;

// db connection code
require('./db/db');

// middleware
app.use(session({
  secret: 'this is a secret',
  resave: false, // only save when a session object has been modified
  saveUninitialized: false // useful for login session, we only want to save when we modify the session
}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));


// controllers
const itemController = require('./controllers/itemController.js')
app.use('/items', itemController);
const userController = require('./controllers/auth');
app.use('/auth', userController);
const orderController = require('./controllers/orderController.js');
app.use('/orders', orderController);




app.get('/', (req, res) => {
  res.render('home.ejs', { theNumber: undefined })
});


app.listen(PORT, () => {
  const timestamp = (new Date(Date.now())).toLocaleString();
  console.log(timestamp + ': Server is listening on ' + PORT);
});