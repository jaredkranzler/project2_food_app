const express = require('express');
const router  = express.Router();
const User    = require('../models/user');
const Order   = require('../models/order');
const Item    = require('../models/item');
const bcrypt  = require('bcrypt');


// this route displays the login form 
router.get('/login', (request, response) => {
  // render login page 
  // with message if there was one
  // make sure message doesn't display again

  // if request.session.message has a value
  if(request.session.message) {

    // capture the message in a variable before we remove it from the session
    const message = request.session.message

    // remove it so that the message will NOT be displayed a second time
    request.session.message = null

    // rendering login template with the message that WAS in request.session.message
    response.render('auth/login.ejs', {
      message: message, 
      loggedIn: request.session.loggedIn
    })
  // request.session.message doesnt have a value (or is already null)
  } else {
    response.render('auth/login.ejs', {
      message: null,
      loggedIn: request.session.loggedIn
    }); 
  }
});


router.get('/register', (request, response) => {
  if(request.session.message) {
    const message = request.session.message;
    request.session.message = null
    response.render('auth/register.ejs', {
      message: message,
      loggedIn: request.session.loggedIn      
    });
  } else {
    response.render('auth/register.ejs', {
      message: null,
      loggedIn: request.session.loggedIn    
    });
  }
});


// Find user
router.post('/login', (request, response) => {
  
  User.findOne({username: request.body.username}, (err, user) => {
    if(user){ // if user was found
      console.log(user, "this is the user that we found")
      if(bcrypt.compareSync(request.body.password, user.password)) {
        request.session.username = user.username;
        request.session.loggedIn = true;
        response.redirect('/') 
      } else {
        // set a message property on the request.session object
        request.session.message = 'Username or password is incorrect';
        response.redirect('/auth/login');
      }
    } else {
      // set a message property on the request.session object
      request.session.message = 'Username or password is incorrect';
      response.redirect('/auth/login')
    }
    // if(user.username === 'admin'){
    //   response.redirect('/edit');
    // }
  });
});


// Register route and HASH Password
router.post('/register', (request, response) => {
  const password = request.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  

  // PREVENT DUPE USERNAMES
  // if a user exists in the db with the desired username
  User.find({username: request.body.username}, (err, foundUsers) => {
    // now we know that .find() returns an array
    console.log(foundUsers)
    if(foundUsers.length > 0){
      // show the registration page with a message that says "username already taken"
      request.session.message = 'Username already exists';
      response.redirect('/auth/register');
    } 
    // (a user does not already exist in the db with that username)
    else {
      // Create new user
      const userDbEntry = {};
      userDbEntry.username = request.body.username;
      userDbEntry.password = passwordHash;
      userDbEntry.firstName = request.body.firstName;
      userDbEntry.lastName = request.body.lastName;
      userDbEntry.address = request.body.address;
      userDbEntry.city = request.body.city;
      userDbEntry.state = request.body.state;
      userDbEntry.zip = request.body.zip;
      userDbEntry.phone = request.body.phone;
      userDbEntry.email = request.body.email;

      // Create entry into database
      User.create(userDbEntry, (err, user) => {
        request.session.username = user.username;
        request.session.loggedIn = true;
        console.log("registration successful");
        response.redirect('/'); // REDIRECT SHOULD TAKE A URL
      });
    }
  })
});



router.get('/profile', (req, res) => {
  if(!req.session.username){ 
    req.session.message = 'please login first';
    res.redirect('/auth/login');
  }else {
    User.findOne({username: req.session.username}, (err, foundUser) => {
      console.log(foundUser, " this is foundUser in GET /auth/profile")
      res.render('auth/profile.ejs', {
        userData: foundUser,
        username: req.session.username,
        loggedIn: req.session.loggedIn
      });
    });
  }
});


router.use((request, response, next) => {
  if(!request.session.username){ 
    request.session.message = 'please login first';
    response.redirect('/auth/login');
  }else {
    router.post('/profile', (request, response) => {
      const password = request.body.password;
      const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    
      // Create an object to enter into the user model
      const userDbEntry = {};
      userDbEntry.username = request.body.username;
      userDbEntry.password = passwordHash;
    
      // PREVENT DUPE USERNAMES
      // if a user exists in the db with the desired username
      User.find({username: request.body.username}, (err, foundUsers) => {
          User.create(userDbEntry, (err, user) => {
            request.session.username = user.username;
            request.session.loggedIn = true;
            console.log("update");
            response.redirect('auth/profile'); // REDIRECT SHOULD TAKE A URL
          });
      });
    });
  }
});


// Logging out
router.get('/logout', (request, response) => {
  request.session.destroy((err) => {
    if(err) {
      response.send('error destroying session');
    } else {
      response.redirect('/auth/login');
    }
  });
});

router.get('../header', (request, response) => {
  User.find(request.params.id, (err, foundUser) => {
    response.render('/partials/header.ejs', {
      users: foundUser
    })
  })
})


module.exports = router;
