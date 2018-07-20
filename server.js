const express = require('express');
const app = express();

require('./db/db');

const PORT = 3000;

app.listen(PORT, () => {
  const timestamp = (new Date(Date.now())).toLocaleString();
  console.log(timestamp + ': Server is listening on ' + PORT);
});