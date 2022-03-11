const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBars` array in User.js
const matchSchema = new Schema({
  sportTitle: {
    type: String,
    required: true,
  },
  // saved bar id from Yelp
  matchId: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
  homeTeam: {
    type: String,
  },
  awayTeam: {
    type: String,
    required: true,
  },
  bookmakers: {
    type: String,
    required: true,
  } ,
    markets: {
    type: Int
    }
});

module.exports = matchSchema;