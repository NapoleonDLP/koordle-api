const randomWord = require('random-word-by-length');

const generateWord = (wordLength) => {
  let newWord = randomWord(wordLength);

  while (newWord.length !== wordLength) {
    newWord = randomWord(wordLength)
  }

  return newWord;
};

const isWordValid = (word) => {
  const url = process.env.WEBSTER_URL + word + process.env.WEBSTER_KEY;
  fetch(url)
    .then(data => data.json())
    .then(data => console.log("WORD: ", data))
    .catch(e => console.log('Word Check Error: ', e));
};

module.exports = {
  generateWord,
  isWordValid,
};
