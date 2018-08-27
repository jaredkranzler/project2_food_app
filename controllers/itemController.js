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

// router.get('/', (req, res) => {

// });
// --------------------------------------------------------------------------------
/// seed route pre-populate your database with food items
// '/seed' -- leave this here
router.get('/seed', (req, res) => {
  console.log("hitting the seed route")
  Item.create(
    [
      {
        name: "Chocolate Chip Cookies" ,
        image: "https://hips.hearstapps.com/del.h-cdn.co/assets/16/48/1480711863-delish-peanut-butter-chip-cookies-1.jpg",
        body: "Freshly baked everyday",
        price: 9.50
      },

      {
        name: "Pocket Dog" ,
        image: "https://s33.postimg.cc/ombb7yq9b/pocketdog.jpg",
        body: "I always have a hot dog in my pocket",
        price: 8.50
      },

      {
        name: "Burger" ,
        image: "https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F1519844002%2Ffast-food-mobile-apps-chick-fil-a-FT-BLOG0218.jpg%3Fitok%3D7d_gu0JA&w=700&q=85",
        body: "Yes, we know this is a Chik-fil-a chicken sandwich",
        price: 5.50
      },

      {
        name: "Salad",
        image: "https://cdn-image.foodandwine.com/sites/default/files/1509031600/arugua-and-squash-salad-XL-RECIPE1217.jpg",
        body: "Freshly baked everyday",
        price: 3.50
      },

      {
        name: "Smoked Chicken Fish",
        image: "https://i.kym-cdn.com/entries/icons/original/000/021/155/Fish_wearing_a_chicken_smoking_a_cigarette_cover.jpg",
        body: "What has science done?",
        price: 22.00
      },

      {
        name: "Geoduck",
        image: "http://cdn.shopify.com/s/files/1/1349/1385/products/geoduck_grande.jpg?v=1467307274",
        body: "I promise it's a delicacy and not a penis",
        price: 15.00
      },

      {
        name: "MRE",
        image: "https://images-na.ssl-images-amazon.com/images/I/71mEOs3zHPL._SY550_.jpg",
        body: "That's a good, little soldier",
        price: 7.00
      },

      {
        name: "Cinder Block",
        image: "https://images.homedepot-static.com/productImages/57e41fa9-bcba-4aff-970f-4123914549b1/svn/oldcastle-cinder-blocks-30161345-64_1000.jpg",
        body: "Excellent source of minerals and manliness",
        price: 1.50 
      },

      {
        name: "Grandma",
        image: "http://www.smartsandstamina.com/wp-content/uploads/2013/07/Grandma.jpg",
        body: "It's her time",
        price: 32.00
      },

      {
        name: "New York Style Cheesecake",
        image: "https://www.onceuponachef.com/images/2017/12/NY-Cheesecake-575x434.jpg",
        body: "Your choice of sauce - chocolate, raspberry, or grandma",
        price: 5.00
      }
    ], (err, addItem) => {
      res.send('items added')
  });
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
    // Find the user with that 
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



















