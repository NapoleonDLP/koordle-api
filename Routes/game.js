const { DB } = require('../db.js');
const { generateWord, isWordValid } = require('../helpers.js');
const { Game } = require('../Models/Game.js');
const { User } = require('../Models/User.js');

//TODO: find a better solution for acquiring random word
const getNewWord = (req, res) => {
  const wordLength = req.body.wordLength || 5;
  let newWord = generateWord(wordLength);

  console.log('getNewWord Ran: ', newWord);
  res.send({ newWord });
};

const postWordCheck = async (req, res) => {

  const userId = req.body.user_id;
  const attemptedWord = req.body.word;
  let isWord = isWordValid(attemptedWord);
  let attemptedResult = null;

  try {
    const user = await User.findByIdAndUpdate(userId)
      .populate({ path: 'activeGame', select: 'word ' });

    attemptedResult = attemptedWord === user.activeGame.word;

    const attemptedGame = await Game.findByIdAndUpdate(user.activeGame._id, {
        $push :{
          attempts: {
            attemptedWord,
            attemptedResult
          }
        }
      }, {
        returnDocument: 'after',
      })
      .select('-word');

    res.send(attemptedGame);
  } catch (e) {
    console.log("Error: ", e);
    res.status(500);
  }

  // iterate through req.body.word

  // res.send(req.body.word);
};

//Create a new game
const postNewGame = async (req, res) => {
  const wordLength = req.body.wordLength || 5;
  let data = {};
  data.word = generateWord(wordLength);
  data.user_id = req.body.user_id;

  try {
    const newGame = new Game(data);
    await newGame.save();
    await User.findByIdAndUpdate(req.body.user_id, { activeGame: newGame._id });

    res.send(newGame);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
};

module.exports = {
  getNewWord,
  postNewGame,
  postWordCheck,
};
