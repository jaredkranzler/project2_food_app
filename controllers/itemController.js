const express = require('express');
const router  = express.Router();

// ------------------------------------------------------
// require the model
const Item  = require('../models/item');
const Order = require('../models/order');
const User = require('../models/user');

router.use((req, resp, next) => {
 if(!req.session.username){ 
          req.session.message = 'please login first';
          res.redirect('/auth/login');
        }else {
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
  if(!req.session.username){ 
    req.session.message = 'please login first';
    res.redirect('/auth/login');
  } else {
    Item.find({}, (err, theItems) => {
      res.render('items/new.ejs', {
        items: theItems,
        username: req.session.username,
        loggedIn: req.session.loggedIn
      });
    });
  }
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
        name: "Sushi Donut" ,
        image: "http://www.bravotv.com/sites/nbcubravotv/files/styles/blog-post--mobile/public/field_blog_image/2016/11/feast-week-mashup-poll-promote_0.jpg?itok=xDnLnaGk&timestamp=1480357600",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum mi eget mi tempus tincidunt. Nullam lacinia consectetur mi at tempus. In hac habitasse platea dictumst. ",
        price: 8.50
      },

      {
        name: "Sushi Burrito" ,
        image: "https://i1.wp.com/www.onegreenplanet.org/wp-content/uploads/2017/12/lunchbox-upgrade-brown-rice-sushi-burritos.jpg?fit=1200%2C750",
        body: "Morbi gravida est et maximus ultricies. Cras id ultricies arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut metus commodo, tincidunt lectus vestibulum, semper urna. Suspendisse lobortis ligula tempor lectus vestibulum, vel aliquet libero ornare.",
        price: 9.50
      },

      {
        name: "Salmon" ,
        image: "http://fitclub.ir/wp-content/uploads/2017/11/%D8%AA%D8%B1%DA%A9%DB%8C%D8%A8-%D8%BA%D8%B0%D8%A7%DB%8C%DB%8C.jpg",
        body: "Mauris feugiat ligula eu urna sagittis facilisis. Nulla massa mi, lacinia in tincidunt egestas, tristique ac risus. Sed cursus nulla id risus aliquam, a malesuada libero volutpat. Etiam ornare ante non nulla molestie, sit amet lobortis ligula vestibulum. ",
        price: 14.50
      },

      {
        name: "Salad",
        image: "https://cdn-image.foodandwine.com/sites/default/files/1509031600/arugua-and-squash-salad-XL-RECIPE1217.jpg",
        body: "Nam enim nibh, suscipit ut egestas at, venenatis vel urna. Nunc at lacus lacinia, scelerisque turpis vitae, sagittis erat. Nunc aliquet, sapien ut placerat varius, lorem felis ultrices mauris, vitae feugiat sapien nunc eget ex. Nunc nibh massa, sodales nec nisl id, rutrum dignissim ipsum.",
        price: 3.50
      },

      {
        name: "Pasta",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX5Y6iNBPyeJQBKg5tN26_en3IUZibRFNcZ6uVi_u7ud8P595x",
        body: "Vestibulum erat mauris, elementum in consectetur vel, fringilla at quam. Etiam convallis justo ut arcu scelerisque, sed tristique tortor luctus.",
        price: 22.00
      },

      {
        name: "Pizza",
        image: "https://res.cloudinary.com/norgesgruppen/image/upload/c_fill,f_auto,h_574,q_80,w_945/tbagzeanc4qhrnlanzgi.jpg",
        body: "Vivamus vitae semper ante. Nulla a tristique magna. Quisque aliquet lectus in elit tempor consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta urna sem, nec venenatis ipsum consequat vel. Nunc id purus mi. Maecenas et lacus velit. ",
        price: 15.00
      },

      {
        name: "Mozzarella",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPKrl4weU3Y7j-JCk1uwwrehsdk7RPp38NAwLog_AvaPHrSr0z",
        body: " Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut augue nisl, gravida sit amet fermentum in, consectetur pharetra libero. ",
        price: 7.00
      },

      {
        name: "Crepes",
        image: "https://img.sndimg.com/food/image/upload/w_896,h_504,c_fill,fl_progressive,q_80/v1/img/recipes/18/41/0/mlUJhy1T3CFzP1eDMACA_DSC_0003.jpg",
        body: "Mauris enim augue, placerat vitae porta vel, egestas et nisi.",
        price: 1.50 
      },

      {
        name: "Brownie a la mode",
        image: "https://pinchofyum.com/wp-content/uploads/Coconut-Oil-Brownies.jpg",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum mi eget mi tempus tincidunt. Nullam lacinia consectetur mi at tempus. In hac habitasse platea dictumst. ",
        price: 32.00
      },

      {
        name: "New York Style Cheesecake",
        image: "https://cms.splendidtable.org/sites/default/files/styles/w2000/public/coconut-cheesecake-LEDE.jpg?itok=Iixck5x7",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum mi eget mi tempus tincidunt. Nullam lacinia consectetur mi at tempus. In hac habitasse platea dictumst. ",
        price: 5.00
      }
    ], (err, addItem) => {
      res.send('items added')
  });
});




//-------------------------------------------------------

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

}
})
// --------------------------------------------------------------------------------
module.exports = router;
// --------------------------------------------------------------------------------



















