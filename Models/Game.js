const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
  word: { type: String, required: true, lowercase: true },
  result: String,
  active: Boolean,
  user_id: { type: Schema.Types.ObjectId/*, required: true */},
  attempts: [{
    attemptedWord: String,
    attemptedResult: String,
  }],
  created: { timestamp: { type: Date, default: Date.now }},
  updated: { timestamp: { type: Date, default: Date.now }},
});

const Game = mongoose.model('Game', gameSchema);

module.exports = { Game };
