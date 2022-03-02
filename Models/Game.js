import mongoose from 'mongoose';
const { Schema } = mongoose;

const gameSchema = new Schema({
  word: { type: String, required: true, lowercase: true },
  result: String,
  active: Boolean,
  user_id: { type: Schema.Types.ObjectId, required: true },
  attempts: [{
    attemptedWord: String,
    attemptedResult: String
  }],
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
