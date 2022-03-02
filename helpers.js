const randomWord = require('random-word-by-length');

const generateWord = (wordLength) => {
  let newWord = randomWord(wordLength);

  while (newWord.length !== wordLength) {
    newWord = randomWord(wordLength)
  }

  return newWord;
};

module.exports = {
  generateWord,
};
