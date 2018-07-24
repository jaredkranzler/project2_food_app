const express = require('express');
const router  = express.Router();

//-------------------------------------------------------------------------
// Require the model
const Order  = require('../models/order');
const Item = require('../models/item');
const User = require('../models/user')
//-------------------------------------------------------------------------

// Orders/CART.ejs (index)
router.get('/', async (request, response) => {
// CART: (order show page) 

  try {

const foundOrder = await Order.findById(req.params.id)
    res.render('orders/cart.ejs', {
      orders: foundOrder, 
      username: request.session.username,
      loggedIn: request.session.loggedIn,
      username: req.session.username[0]
    });
  } catch (err) {

    res.send(err)
  }
});



router.get('/', (request, response) => {
  Order.findById(request.params.id, (err, foundOrder) => {
    response.render('orders/show.ejs', {
      username: request.session.username,
      loggedIn: request.session.loggedIn
    })
  })
})


//--------------------------------------------------------------------------------------
// PUT (UPDATE)

router.put('/:id', async (request, response) => {
  try {
    const updatedOrder = await Order.findbyIdAndUpdate(req.params.id, req.body);
    res.redirect('/orders')

  } catch (err){

    res.send(err)
  }
});


//--------------------------------------------------------------------------------------
// POST (CREATE)
router.post('/', async (req, res) => {
  try {
    const createdOrder = await Order.create(req.body);
    res.redirect('/orders')

  } catch (err){
    res.send(err, 'post error in order')
  }
})

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















