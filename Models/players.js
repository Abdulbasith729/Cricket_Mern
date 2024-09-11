const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  firstName: { // Ensure field names match the schema
    type: String,
    required: true
  },
  email: { // Correct field name
    type: String,
    required: true
  },
  phoneNumber: { // Changed to String to handle non-numeric characters
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    required: true
  }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
