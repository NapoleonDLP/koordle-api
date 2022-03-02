const DB = require('../db.js');
const { generateWord } = require('../helpers.js');

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
  // declare data object
  // declare new word
  // default set to
};

module.exports = {
  getNewWord,
  postNewGame,
  isWordValid,
};
