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


![alt text](https://github.com/jaredkranzler/project2_food_app/blob/master/Wireframe/wireframe.jpg)

itemSchema:
  title: String,
  image: String,
  body: String
  price: Number

userSchema:
  username: String,
  password: String,
  creditCard: {
    name: String,
    ccNum: Number,
    expDate: Date,
    secNum: Number
    }