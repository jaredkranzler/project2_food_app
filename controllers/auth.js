const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
  res.render('auth/login.ejs', {
    message: req.session.message
  });
});

router.get('/register', (req, res) => {
  res.render('auth/register.ejs', {
    message: req.session.message
  });
});

// Find user
router.post('/login', (req, res) => {
  
  User.findOne({username: req.body.username}, (err, user) => {
    if(user){
      // if user was found
      if(bcrypt.compareSync(req.body.password, user.password)){
        req.session.username = user.username;
        req.session.loggedIn = true;
        res.redirect('/') // <----- what directory??????
      } else {
        req.session.message = 'Username or password is incorrect';
        res.redirect('/auth');
      }
    } else {
      res.session.message = 'Username or password is incorrect';
      res.redirect('/auth')
    }
  });
});


// Register route and HASH Password
router.post('/register', (req, res) => {
  // const password = req.body.password;
  // const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  // // Create an object to enter into the user model
  // const userDbEntry = {};
  // userDbEntry.username = req.body.username;
  // userDbEntry.password = passwordHash;

  // // Create entry into database
  // User.create(userDbEntry, (err, user) => {
  //   req.session.username = user.username;
  //   req.session.loggedIn = true;
  //   res.redirect('/') // <----- what directory??????
  // });
  console.log(req.body)
  res.send(req.body)
});


// Logging out
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.send('error destroying session');
    } else {
      res.redirect('/auth');
    }
  });
});


module.exports = router;