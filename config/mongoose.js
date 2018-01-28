const mongoose = require('mongoose');

MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/LedServer'

mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI);

module.exports = {mongoose};


