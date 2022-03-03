const randomWord = require('random-word-by-length');
const axios = require('axios');

const generateWord = (wordLength) => {
  let newWord = randomWord(wordLength);

  while (newWord.length !== wordLength) {
    newWord = randomWord(wordLength)
  }

  return newWord;
};

const isWordValid = async (word) => {
  const url = process.env.WEBSTER_URL + word + process.env.WEBSTER_KEY;
  console.log(url)
  const response = await axios.get(url)
    // .then(data => data.json())
    .then(data => data)
    .catch(e => console.log('Word Check Error: ', e));

  console.log(response.data);
};

module.exports = {
  generateWord,
  isWordValid,
};
