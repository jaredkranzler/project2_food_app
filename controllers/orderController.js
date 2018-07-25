const express = require('express');
const router  = express.Router();

//-------------------------------------------------------------------------
// Require the model
const Order  = require('../models/order');
const Item = require('../models/item');
const User = require('../models/user')
//-------------------------------------------------------------------------


// create route -- add to data
router.post('/', async (req, res, next) => {
    try {

        const createdItem = await Order.create(req.body);
        res.redirect('/orders')

    }  catch (err){

      next(err, "hey")
      
    }
});


// Orders/CART.ejs (index)
// // CART: (order show page) 
router.get('/', async (req, res) => {
  try{
    const foundOrder = await Order.find({});
    res.render('orders/new.ejs', {
      orders: foundOrder, 
      username: req.session.username,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err, '<------ ERROR');
    next(err);
  }
});


//--------------------------------------------------------------------------------------
// PUT (UPDATE)

router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findbyIdAndUpdate(req.params.id, req.body);
    const foundUser = await User.findOne({'order._id': req.params.id})
    foundUser.orders.items.id(req.params.id).remove();
    foundUser.orders.push(updatedOrder);
    const data = await foundUser.save();
    res.redirect('/orders');
  } catch (err){

    res.send(err)
  }
});



//--------------------------------------------------------------------------------------
// DELETE

router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndRemove(req.params.id)
    const itemIds = [];
    for (let i = 0; i < deletedOrder.items.length; i++) {
      itemIds.push(deletedOrder.items[i].id);
    }
      const data = await Item.remove({_id: { $in: itemIds}});
      res.redirect('/orders');
  } catch (err) {
    res.send(err, 'delete route messed up')
  }
})

//--------------------------------------------------------------------------------------
module.exports = router;
//--------------------------------------------------------------------------------------















