const express = require('express');
const router = express.Router();

const controllers = require('../controllers')

router
  .get('/hello', controllers.hello)
  .get('/routes', controllers.getRoutes)
  .get('/stops', controllers.getStops);
  
module.exports = router;
