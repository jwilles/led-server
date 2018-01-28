const express = require('express');
const app = express();

const routes = require('./app/routes');
const PORT = process.env.PORT || 3000

const db = require('./config/mongoose');


app.use('/', routes);

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
});



