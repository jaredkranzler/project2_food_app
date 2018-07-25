const express = require('express');
const router  = express.Router();

//-------------------------------------------------------------------------
// Require the model
const Order  = require('../models/order');
const Item = require('../models/item');
const User = require('../models/user')
//-------------------------------------------------------------------------



// User menu page (index) show a list of items, add to cart and begin new order
// URL should be get /:id
// load current order
// show list of items for user to add

// show what is currently in their cart
// ORDER SHOW ROUTE
// should render orders/show.ejs
// change orders/index.ejs to be a list of past orders

// this route is like the cart
// optionally, you could conditionally show a create order button here if there isn't one
// note: this is also kind of an edit route 
// because user can change cart
router.get('/', async (req, res, next)=>{
    try {
      const foundOrder = await Order.find({});
      const foundAllItem = await Item.find({});
        // this should be orders/show.ejs,
        res.render('orders/index.ejs', {
          orders: foundOrder, 
          items: foundAllItem,
          username: req.session.username,
          loggedIn: req.session.loggedIn
      });
    } catch (err) {
      next(err)
    }
});


// another place create order button could go 
// is in order index.  create order index route here
// order INDEX should:
  // always show previous orders
  // AND if there isn't an open order show a button to create one
  // ORDER index route -- 
// URL SHOULD BE get /




// // new: (new order) 
// goal: list the items in the current order
// IGNORE this for now
router.get('/new', async (req, res, next) => {
  console.log("")
  console.log("")
  console.log("")
  console.log("hitting /orders/new")
  console.log("")
  console.log("")
  console.log("")
  try{
    const foundOrders = await Order.find({});
    res.render('orders/new.ejs', {
      orders: foundOrders,
      items: foundOrders,
      username: req.session.username,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err, '<------ ERROR');
    next(err);
  }
});




// ORDER CREATE route -- the button mentioned above should hit this route
// this route should:
//   create an order
//   store info in session to indicate that
//   there's an open order
router.post('/', async (req, res, next) => {
    try {

        const createdOrder = await Order.create(req.body);

        res.redirect('/orders', {     
          username: req.session.username,
          loggedIn: req.session.loggedIn
        })

    }  catch (err){

      next(err, "hey")
      
    }
});

// add to order
// change url to additem
// post /additem --> POST /orders/additem

  // get current order object from database
  // get item from database
  // push into items array of current order object you just got from db
  // redirect to order show page (so user can see item got added)

router.post('/new', async (req, res, next) => {
    try {
        // get item with this id from items collection
        // push into items array in the currently open order
        // which should be an Order (model) that was previously creatd

        // get all the items in this variable
        const foundItem  = await Item.find(req.body);

        // redirect
        res.redirect('/new')

    }  catch (err){

      next(err, "hey")
      
    }
});




//--------------------------------------------------------------------------------------
// PUT (UPDATE)


/// should be 1 or more routes hit by buttons 
/// (like delete, +, -) on the show page
// the route(s) should adjust order in db as necessary
// and then redirect to show page

// URLS/routes you might need
  // put /remove/:orderid/:itemid/
  // put /increase/:orderid/:itemid/
  // put /decrease/:orderid/:itemid/


router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findbyIdAndUpdate(req.params.id, req.body);
    const foundUser = await User.findOne({'order._id': req.params.id})
    foundUser.orders.items.id(req.params.id).remove();
    foundUser.orders.push(updatedOrder);
    const data = await foundUser.save();
    res.redirect('/orders');
  } catch (err) {

    res.send(err)
  }
});



//--------------------------------------------------------------------------------------
// DELETE

// cancel the order
// this route should be hit by a "Cancel order button"
// this may mean you need a cancel order button on your show page
router.delete('/new', async (req, res, next) => {
  try {
    const foundItem   = await Item.findOne(req.body).remove();
    res.redirect('./new')
  } catch (err) {
    next(err, '<------------delete')
    res.send(err)
  }
});


//--------------------------------------------------------------------------------------
module.exports = router;
//--------------------------------------------------------------------------------------















