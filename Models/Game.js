const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
  word: { type: String, required: true, lowercase: true },
  result: String,
  active: Boolean,
  user_id: { type: mongoose.ObjectId, ref:'User', required: true },
  attempts: [{
    attemptedWord: String,
    attemptedResult: Boolean,
  }],
  created: { timestamp: { type: Date, default: Date.now }},
  updated: { timestamp: { type: Date, default: Date.now }},
});

const Game = mongoose.model('Game', gameSchema);

module.exports = { Game };
