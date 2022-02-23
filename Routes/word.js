const DB = require('../db.js');
const randomWord = require('random-word-by-length');

const getNewWord = (req, res) => {
  const newWord = randomWord(5);

  res.send({ newWord });
};

module.exports = {
  getNewWord };
