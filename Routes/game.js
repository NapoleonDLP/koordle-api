const { DB } = require('../db.js');
const { generateWord } = require('../helpers.js');
const { Game } = require('../Models/Game.js');

//TODO: find a better solution for acquiring random word
const getNewWord = (req, res) => {
  const wordLength = req.body.wordLength || 5;
  let newWord = generateWord(wordLength);

  console.log('getNewWord Ran: ', newWord);
  res.send({ newWord });
};

//Check if word is a valid word
const isWordValid = (req, res) => {

};

//Create a new game
const postNewGame = (req, res) => {
  const wordLength = req.body.wordLength || 5;
  // declare data object
  let data = {};
  // declare new word
  data.word = generateWord(wordLength);

  try {
    const newGame = new Game(data);
    newGame.save();
    res.send()
  } catch (e) {
    res.send(e)
  }
  // default set to
  // data.user_id = req.body.user_id || ;

};

module.exports = {
  getNewWord,
  postNewGame,
  isWordValid,
};
