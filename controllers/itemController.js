const express = require('express');
const router  = express.Router();

// ------------------------------------------------------
// require the model
const Item  = require('../models/item');
const Order = require('../models/order');
const User = require('../models/user');


// router level middleware to keep out everybody but admin
router.use((request, response, next) => {
  if (request.session.username !== 'admin'){
    response.redirect('/')
  }
  else next();
})




//-------------------------------------------------------
// admin *New* items menu
router.get('/new', (req, res) => {
  Item.find({}, (err, theItems) => {
    res.render('items/new.ejs', {
      items: theItems,
      username: req.session.username,
      loggedIn: req.session.loggedIn
    });
  });
});

router.get('/', (req, res) => {

});


//-------------------------------------------------------
router.get('/:id', (req, res) => {
  res.render('home.ejs', { 
      username: req.session.username,
      loggedIn: req.session.loggedIn
  });
});
//-------------------------------------------------------




// --------------------------------------------------------------------------------
/// seed route pre-populate your database with food items
// '/seed'
router.get('/seed', (req, res) => {
  Item.create([
      {
    name: "Chocaolate Chip Cookies" ,
    image: "https://hips.hearstapps.com/del.h-cdn.co/assets/16/48/1480711863-delish-peanut-butter-chip-cookies-1.jpg",
    body: "Freshly baked everyday",
    price: 9.50
  },

  {
    name: "hot dog" ,
    image: "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiUhfKXi7HcAhUI5IMKHQ2eDHoQjRx6BAgBEAU&url=http%3A%2F%2Fwww.russianweek.ca%2Fnews%2Fcanada%2F%25D1%2585%25D0%25BE%25D1%2582-%25D0%25B4%25D0%25BE%25D0%25B3%25D0%25B8-%25D0%25B2-%25D1%2581%25D0%25BE%25D0%25B1%25D0%25B0%25D1%2587%25D1%258C%25D0%25B5%25D0%25BC-%25D0%25BF%25D0%25B0%25D1%2580%25D0%25BA%25D0%25B5%2F&psig=AOvVaw2pZIr6cIVT8NvXblpF1eQh&ust=1532293209329873",
    body: "Freshly baked everyday",
    price: 8.50
  },

  {
    name: "Burger" ,
    image: "https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F1519844002%2Ffast-food-mobile-apps-chick-fil-a-FT-BLOG0218.jpg%3Fitok%3D7d_gu0JA&w=700&q=85",
    body: "Freshly baked everyday",
    price: 5.50
  },

  {
    name: "Salad",
    image: "https://cdn-image.foodandwine.com/sites/default/files/1509031600/arugua-and-squash-salad-XL-RECIPE1217.jpg",
    body: "Freshly baked everyday",
    price: 3.50
  },
    ], (err, addItem) => {
      res.send('items added')
  });
});


// --------------------------------------------------------------------------------
// create route -- add to data
router.post('/', async (req, res, next) => {
    try {
        const createdItem = await Item.create(req.body);
        res.redirect('items/new')
    } catch (err) {
      next(err, "hey")
    }
});


// --------------------------------------------------------------------------------
// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const foundItem   = await Item.findByIdAndRemove(req.params.id);
    res.redirect('./new')
  } catch (err) {
    next(err)
    res.send(err)
  }
});


// --------------------------------------------------------------------------------
// UPDATE PUT
router.put('/:id', async (req, res, next)=>{
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true});
    // Find the user with that photo
    const foundUser = await User.findOne({'items._id': req.params.id});
      // If the user is the same as it was before
      // first find the photo and removing, req.params.id = photos id
      foundUser.Items.id(req.params.id).remove();
      foundUser.Items.push(updatedItem);
      const data = await foundUser.save();
      res.redirect('/items');

  } catch (err) {
    next(err)
    res.send(err)
    }
});


// --------------------------------------------------------------------------------
module.exports = router;
// --------------------------------------------------------------------------------



















