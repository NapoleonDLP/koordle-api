const DB = require('../db.js');
const randomWord = require('random-word-by-length');

const getNewWord = (req, res) => {
  const wordLength = req.body.wordLength || 5;
  let newWord = randomWord(wordLength);

  while(newWord.length !== wordLength) {
    newWord = randomWord(wordLength)
  }

  console.log('getNewWord Ran: ', newWord);
  res.send({ newWord });
};

module.exports = {
  getNewWord };
