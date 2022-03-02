const DB = require('../db.js');
const randomWord = require('random-word-by-length');

//TODO: find a better solution for acquiring random word
const getNewWord = (req, res) => {
  const wordLength = req.body.wordLength || 5;
  let newWord = randomWord(wordLength);

  while(newWord.length !== wordLength) {
    newWord = randomWord(wordLength)
  }

  console.log('getNewWord Ran: ', newWord);
  res.send({ newWord });
};

//Check if word is a valid word
const isWordValid = (req, res) => {

};

//Create a new game
const postNewGame = (req, res) => {
  // declare new word
  // default set to
};

module.exports = {
  getNewWord,
  postNewGame,
  isWordValid,
};
