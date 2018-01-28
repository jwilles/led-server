const express = require('express');
const router = express.Router();

const middleware = require('../middleware');
const controllers = require('../controllers');

router.use(middleware.addCorsHeader);

router
  .get('/hello', controllers.hello)
  .get('/routes', controllers.getRoutes)
  .get('/stops', controllers.getStops)
  .get('/predict', controllers.getPrediction);
  
module.exports = router;
