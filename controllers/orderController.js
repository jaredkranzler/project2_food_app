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
  const foundOrder = await Order.findById(req.session.orderId);
  console.log(foundOrder, "foundOrder in POST /orders/additem");
  res.render('orders/cart.ejs', {
    items: foundOrder.items,
    username: req.session.username,
    loggedIn: req.session.loggedIn
  });
});




// menu route suggested URL change: /orders/menu
// list of items with button to add -- this route is almost done as is
router.get('/', async (req, res, next)=>{
    try {
      // const foundOrder = await Order.find({});
      const foundAllItem = await Item.find({});
      // this should be orders/show.ejs,
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








// LAST THING
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
// DETELETE ME DELETE THIS DO NOT USE THIS
router.get('/cart', async (req, res, next) => {
// DELETE ME DELETE THIS DO NOT USE THIS
  try {
    const foundOrders = await Order.find({});
// DELETE ME DELETE THIS DO NOT USE THIS
    res.render('orders/cart.ejs', {
      orders: foundOrders,
      items: foundOrders,
// DELETE ME DELETE THIS DO NOT USE THIS
      username: req.session.username,
      loggedIn: req.session.loggedIn
    });
// DELETE ME DELETE THIS DO NOT USE THIS
  } catch (err) {
    console.log(err, '<------ ERROR');
    next(err);
  }
});
// DELETE ME DELETE THIS DO NOT USE THIS



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
        console.log(createdOrder, "this is the order we just created")
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
  // get current order object from database
  // push item into items array of current order object you just got from db (and save)
  // DONE redirect to cart (order show page) (so user can see item got added)

router.post('/additem', async (req, res, next) => {
    console.log(req.body);
    try {
      // get item with this id from items collection
      // push into items array in the currently open order
      // which should be an Order (model) that was previously creatd

      // get the item we are trying to add in this variable
      const foundItem = await Item.findById(req.body.itemid);
      console.log(foundItem, "foundItem in POST /orders/additem");

      // get current order object from database
      const foundOrder = await Order.findById(req.session.orderId);
      console.log(foundOrder, "foundOrder in POST /orders/additem");

      // push item into items array of current order object you just got from db (and save)      
      foundOrder.items.push(foundItem);
      const data = await foundOrder.save();

      // get user
      // find this order in user's order's array
      // add this item to that array too
      const foundUser = await User.findOne({ username: req.session.username });
      foundUser.orders.id(req.session.orderId).items.push(foundItem);
      console.log(foundUser.orders.id(req.session.orderId).items, " this is where we're trying to push ")
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
router.delete('/cart', async (req, res, next) => {
  try {
    const foundItem   = await Item.findOne(req.body).remove();
    res.redirect('./cart')
  } catch (err) {
    next(err, '<------------delete')
    res.send(err)
  }
});


//--------------------------------------------------------------------------------------
module.exports = router;
//--------------------------------------------------------------------------------------















