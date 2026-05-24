const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  businessType: {
    type: String,
    required: true
  },
  businessDescription: {
    type: String,
    required: true
  }
});

const businessModel = mongoose.model('business', businessSchema);

module.exports = businessModel;