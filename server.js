const express = require('express');
const app = express();
const session = require('express-session'); // for login
const PORT = 3000;

// db connection code
require('./db/db');

// middleware
app.use(session({
  secret: 'this is a secret',
  resave: false, // only save when a session object has been modified
  saveUninitialized: false // useful for login session, we only want to save when we modify the session
}));

// controllers
const userController = require('./controllers/auth');
app.use('/auth', userController);

// default route
app.get('/', (req, res) => {
  res.send('restauirant site')
});


app.listen(PORT, () => {
  const timestamp = (new Date(Date.now())).toLocaleString();
  console.log(timestamp + ': Server is listening on ' + PORT);
});