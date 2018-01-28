const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    minlength: 1
  },
  display: {
    route: {
      type: String
    },
    text: {
      type: String
    }
  }
});
