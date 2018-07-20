const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

require('./db/db');






app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));


const itemController = require('./controllers/itemController.js')
app.use('/items', itemController);



app.get('/', (req, res) => {
  res.render('home.ejs', { theNumber: undefined })
});





const PORT = 3000;

app.listen(PORT, () => {
  const timestamp = (new Date(Date.now())).toLocaleString();
  console.log(timestamp + ': Server is listening on ' + PORT);
});