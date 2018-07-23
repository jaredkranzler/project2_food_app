const express = require('express');
const router  = express.Router();

//-------------------------------------------------------------------------
// Require the model
const Order  = require('../models/order');
const Item = require('../models/item');
const User = require('../models/user')
//-------------------------------------------------------------------------

// CART: (order show page) 
router.get('/', (req, res) => {
  Order.findById(req.params.id, (err, foundOrder) => {
    res.render('orders/cart.ejs', {
      order: foundOrder
    });
  });
});

// order index page -- order history
// and/or open orders

router.get('/', (req, res) => {
  Order.findById(req.params.id, (err, foundOrder) => {
    res.render('orders/show.ejs')
  })
})




// Edit

router.get('/:id', async (req, res) => {

  try {

    const foundOrder = await  Order.findById(req.params.id);
    res.render('orders/cart.ejs', {
      order: foundOrder
    });
  } catch (err) {

    res.send(err)
  }
});

//--------------------------------------------------------------------------------------
// PUT (UPDATE)

router.put('/:id', async (req, res) => {
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















