const axios = require('axios');
const { words } = require('./words.js');

const randomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

const generateWord = (wordLength) => {
  //currently not doing anything with wordLength
  //keep for future implementation
  const randomIndex = randomNumber(words.length - 1);
  const newWord = words[randomIndex];

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
