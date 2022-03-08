const { DB } = require('../db.js');
const { generateWord, isWordValid, calculateScore } = require('../helpers.js');
const { Game } = require('../Models/Game.js');
const { User } = require('../Models/User.js');

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
  let score = null;

  try {
    const user = await User.findByIdAndUpdate(userId)
      .populate({ path: 'activeGame', select: 'word ' });

    attemptedResult = attemptedWord === user.activeGame.word;
    score = await calculateScore(attemptedWord, user.activeGame.word);

    const attemptedGame = await Game.findByIdAndUpdate(user.activeGame._id, {
        $push :{
          attempts: {
            attemptedWord,
            attemptedResult,
            score,
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
    let newGame = new Game(data);
    await newGame.save();
    newGame = newGame.toObject();
    delete newGame.word;
    console.log("NU NU: ", newGame)

    await User.findByIdAndUpdate(req.body.user_id, { activeGame: newGame._id }, { returnDocument: 'after' });
    res.send(newGame);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
};

const getAnswerByGameId = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    const attemptsCount = game.attempts.length;
    const lastAttempt = game.attempts[attemptsCount-1];

    if ((lastAttempt.attemptedResult) || (attemptsCount >= 6)) {
      res.send({ answer: game.word });
    } else {
      console.log('Game is not over. Answer will not be revealed');
      res.status(500);
    }
  } catch (e) {
    console.log('Error: ', e);
    res.status(500);
  }
};

module.exports = {
  getNewWord,
  postNewGame,
  postWordCheck,
  getAnswerByGameId,
};
