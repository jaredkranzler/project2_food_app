const express = require('express');
const router  = express.Router();

//-------------------------------------------------------------------------
// Require the model
const Order  = require('../models/order');
const Item = require('../models/item');
const User = require('../models/user')
//-------------------------------------------------------------------------



// ORDER SHOW ROUTE
// URL should be /cart (GET /orders/cart), since you could store Order ID in session
// load current order -- get it from database, using  sessions 

// show what is currently in their cart
// and buttons to +/-/remove
// should render orders/show.ejs
// (change orders/index.ejs to be a list of past orders)
// cancel order button

// this route is like the cart

// optionally, you could conditionally show a create order button here if there isn't one
// note: this is  kind of an edit route 
// because user can change cart

router.get('/cart', async (req, res) => {
  // 1. get order obj fromdb
  // render and pass order.items to template
  // get current order object from database
  try { const foundOrder = await Order.findById(req.session.orderId);
  // console.log(foundOrder, "foundOrder in POST /orders/additem");
  res.render('orders/cart.ejs', {
    items: foundOrder.items,
    username: req.session.username,
    loggedIn: req.session.loggedIn

  });
} catch (err) {
  res.send (err)
}
});


// menu route suggested URL change: /orders/menu
// list of items with button to add -- this route is almost done as is
router.get('/', async (req, res, next)=>{
    try {
      // const foundOrder = await Order.find({});
      const foundAllItem = await Item.find({});
      // this should be orders/show.ejs,
      console.log(req.session.orderId, " this is req.session.orderId in menu route")
      res.render('orders/index.ejs', {
        orderId: req.session.orderId,
        items: foundAllItem,
        username: req.session.username,
        loggedIn: req.session.loggedIn
      });
    } catch (err) {
      next(err)
    }
});


<<<<<<< HEAD

=======
>>>>>>> 190aac456be5e0dd1e6e47b7d0b7ffcfd4dae69c
// LAST THING
// another place create order button could go 
// is in order index.  create order index route here
// order INDEX should:
  // always show previous orders
  // AND if there isn't an open order show a button to create one
  // ORDER index route -- 
// URL SHOULD BE get /



// // new: (new order) 
// Done: goal: list the items in the current order
// IGNORE this for now



// ORDER CREATE route -- the button mentioned above should hit this route
// this route should:
// 
//   create a  order
//   store that created order object in the user's orders array
//   store info in session to indicate that
//   there's an open order
router.post('/', async (req, res, next) => {
    try {
        //creates db object for a new order, captures that db object in createdOrder variable
        const createdOrder = await Order.create({});
        // console.log(createdOrder, "this is the order we just created")
        // stores id of the order we just created within session object
        req.session.orderId = createdOrder.id;

        // push that created order object in the user's orders array
        User.findOne({ username: req.session.username }, (err, foundUser) => {
          foundUser.orders.push(createdOrder);
          foundUser.save((err, data) => {
            if(err) console.log(err);
            res.redirect('/orders')            
          })
        });

    }  catch (err2) {
      next(err2, "hey")     
    }
});




// add to order
// change url to additem
// post /additem --> POST /orders/additem

  // DONE get item from database  
  // DONE get current order object from database
  // DONE push item into items array of current order object you just got from db (and save)
  // DONE redirect to cart (order show page) (so user can see item got added)

router.post('/additem', async (req, res, next) => {
    // console.log(req.body);
    try {
      // get item with this id from items collection
      // push into items array in the currently open order
      // which should be an Order (model) that was previously creatd

      // get the item we are trying to add in this variable
      const foundItem = await Item.findById(req.body.itemid);
      // console.log(foundItem, "foundItem in POST /orders/additem");

      // get current order object from database
      const foundOrder = await Order.findById(req.session.orderId);
      // console.log(foundOrder, "foundOrder in POST /orders/additem");

      // push item into items array of current order object you just got from db (and save)      
      foundOrder.items.push(foundItem);
      const data = await foundOrder.save();

      // get user
      // find this order in user's order's array
      // add this item to that array too
      const foundUser = await User.findOne({ username: req.session.username });
      foundUser.orders.id(req.session.orderId).items.push(foundItem);
      // console.log(foundUser.orders.id(req.session.orderId).items, " this is where we're trying to push ")
      const userData = await foundUser.save();

      // redirect
      res.redirect('/orders/cart')

    }  catch (err){

      next(err, "hey")
      
    }
});



//--------------------------------------------------------------------------------------
// PUT (UPDATE)


/// should be 1 or more routes hit by buttons 
/// (like delete, +, -) on the show page
// the route(s) should adjust order in db as necessary
// and then redirect to cart (order show page)

// URLS/routes you might need (you could omit orderID since it is being stored in session)
  // put /remove/:itemid/
  // put /increase/:itemid/
  // put /decrease/:itemid/


// ----------------------------------------------------------------------------------------
// Remove from Cart
router.put('/cart/:itemid', async (req, res) => {
  try {
      // find the item and the order and delete item from order and save
      const foundItem = await Item.findById(req.params.itemid);
      const foundOrder = await Order.findById(req.session.orderId);
      foundOrder.items.id(req.params.itemid).remove();
      const data = await foundOrder.save();

      // find the user and delete the item from the user.order and save
      const foundUser = await User.findOne({ username: req.session.username });
      foundUser.orders.id(req.session.orderId).items.id(req.params.itemid).remove()
      const userData = await foundUser.save();
    res.redirect('/orders/cart');
  } catch (err) {

    res.send(err)
  }
});


//--------------------------------------------------------------------------------------
// DELETE

// cancel the order
// this route should be hit by a "Cancel order button"
// this may mean you need a cancel order button on your show page

router.delete('/:id', async (req, res, next) => {
  try {
    const foundOrder = await Order.findByIdAndRemove(req.session.orderId);
    console.log(foundOrder, "found order biatch------------=======")
    const foundUser = await User.findOne({ username: req.session.username });
    console.log(foundUser, "found order USERSSSSSSSS------------=======")

    foundUser.orders.id(req.session.orderId).remove()
        console.log( "found and removed sukka------------=======")

    const userData = await foundUser.save();

    req.session.orderId = false
    console.log(req.session.orderId, " this is req.session.orderId in the order cancel route after we did all the deletes")


    res.redirect('/')
  } catch (err) {
    next(err)
    res.send(err)
  }
});


//--------------------------------------------------------------------------------------
module.exports = router;
//--------------------------------------------------------------------------------------






