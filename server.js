const express = require('express');
const app = express();
const session = require('express-session'); // for login
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;

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


app.get('/partials/', (req, res) => {

  User.findById(req.params.id, (err, foundUser)=> {
    res.render('partials/header.ejs', {
      user: foundUser
    });
  });
});


app.get('/', (request, res) => {
  res.render('home.ejs', { 
    username: request.session.username,
    loggedIn: request.session.loggedIn,
    orderId: !!request.session.orderId
  });
});


app.listen(PORT, () => {
  const timestamp = (new Date(Date.now())).toLocaleString();
  console.log(timestamp + ': Server is listening on ' + PORT);
});