const express = require('express');
const router = express.Router();

// ------------------------------------------------------
// require the model
const Item = require('../models/item')

//-------------------------------------------------------
router.get('/:id', (req, res) => {
  res.render('home.ejs', { theNumber: req.params.id })
})

//-------------------------------------------------------

// MENU (INDEX)
router.get('/', async (req, res) => {
  
  try {
    // mongoose query to get items 
    res.render('items/menu.ejs', {
      // items: Items
    });
  } catch (err) {

    res.send(err)
  }
});



// cart
router.get('/:id', async (req, res)=>{
    try {
      res.render('orders/cart.ejs', {
        // items: Items[req.params.index]
      });
    } catch
     (err) {

      res.send(err)
    }
});




/// seed route pre-populate your database with food items
// '/seed'

const items = [
  {
    name: "Chocaolate Chip Cookies" ,
    photo: "https://hips.hearstapps.com/del.h-cdn.co/assets/16/48/1480711863-delish-peanut-butter-chip-cookies-1.jpg",
    body: "Freshly baked everyday",
    price: 9.50
  },

  {
    name: "Chocaolate Chip Cookies" ,
    photo: "https://hips.hearstapps.com/del.h-cdn.co/assets/16/48/1480711863-delish-peanut-butter-chip-cookies-1.jpg",
    body: "Freshly baked everyday",
    price: 9.50
  },

  {
    name: "Chocaolate Chip Cookies" ,
    photo: "https://hips.hearstapps.com/del.h-cdn.co/assets/16/48/1480711863-delish-peanut-butter-chip-cookies-1.jpg",
    body: "Freshly baked everyday",
    price: 9.50
  },

  {
    name: "Chocaolate Chip Cookies",
    photo: "https://hips.hearstapps.com/del.h-cdn.co/assets/16/48/1480711863-delish-peanut-butter-chip-cookies-1.jpg",
    body: "Freshly baked everyday",
    price: 9.50
  },
]
// Item.insert(big array of food items)
// res.send ("items added")


module.exports = router;


