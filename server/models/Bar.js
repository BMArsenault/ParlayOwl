const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBars` array in User.js
const barSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // saved bar id from Yelp
  businessId: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  image: {
    type: String,
  },
  url: {
    type: String,
  },
  rating: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
  }
});

module.exports = barSchema;