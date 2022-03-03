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
  let isWord = isWordValid(req.body.word);
  let userId = req.body.user_id;

  //get word from user.activegame
  let game = await User.findById(userId, 'activeGame')


  // iterate through req.body.word

  res.send(req.body.word);
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
