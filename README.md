#Food-App

by: Jared Kranzler & Steve Brennison

##User Stories
* User can Register.
* User can Login.
* User can see recomendations on home page.
* User can navigate to food category.
* User can see image, price, and description.
* User can add items to their order and remove them.
* User can checkout
* User can add and store Credit Card info in profile
* User can see past orders

##MVP
* User register
* User Login
* User can Navigate
* User can add things to cart
* User can see items and item details
* User can add info to profile


![alt text](https://github.com/jaredkranzler/project2_food_app/blob/master/Wireframe/1-Home.png)

![alt text](https://github.com/jaredkranzler/project2_food_app/blob/master/Wireframe/2-Menu.png)

![alt text](https://github.com/jaredkranzler/project2_food_app/blob/master/Wireframe/3-Cart.png)

![alt text](https://github.com/jaredkranzler/project2_food_app/blob/master/Wireframe/4-Checkout.png)

![alt text](https://github.com/jaredkranzler/project2_food_app/blob/master/Wireframe/5-Profile.png)

![alt text](https://github.com/jaredkranzler/project2_food_app/blob/master/Wireframe/6-Confirm.png)

```
itemSchema({
  title: String,
  image: String,
  body: String,
  price: Number
})

orderSchema({
  orderDate: date,
  item: [itemSchema]
})

userSchema({
  username: (type: String, required: true},
  password: (type: String, required: true},
  firstName: (type: String, required: true},
  lastename: (type: String, required: true},
  address: (type: String, required: true},
  apt: String,
  city: (type: String, required: true},
  state: (type: String, required: true},
  zipcode: (type: String, required: true},
  creditCard: {
    name: (type: String, required: true},
    ccNum: (type: String, required: true},
    expDate: (type: String, required: true},
    secNum: (type: String, required: true}
  }
})
```