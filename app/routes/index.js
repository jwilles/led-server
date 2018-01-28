const express = require('express');
const router = express.Router();

const helloController = require('../controllers').hello

router.get('/hello', helloController);

module.exports = router;
