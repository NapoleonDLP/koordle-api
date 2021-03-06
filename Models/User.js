const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, lowercase: true, unique: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  activeGame: { type: mongoose.ObjectId, ref: 'Game' },
  playedGames: [ Schema.Types.ObjectId ],
  wins: Number,
  losses: Number,

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = { User };
