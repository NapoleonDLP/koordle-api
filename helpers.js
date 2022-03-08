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

//CURENTLY BREAKING ON JJJJJJ
const isWordValid = async (word) => {
//   const url = process.env.WEBSTER_URL + word + process.env.WEBSTER_KEY;
//   const response = await axios.get(url)
//     .then(data => data.data)
//     .catch(e => console.log('Word Check Error: ', e));
//   console.log("WEBSTER: ", response)
//   return response[0].meta ? true : false;
};

const calculateScore = (attemptedWord, answer) => {
  let score = '';
  for (let i = 0; i < attemptedWord.length; i++) {
    if (attemptedWord[i] === answer[i]) {
      score += 2;
    } else if (answer.includes(attemptedWord[i])) {
      score += 1;
    } else {
      score += 0;
    }
  }
  return score;
};

module.exports = {
  generateWord,
  isWordValid,
  calculateScore,
};
