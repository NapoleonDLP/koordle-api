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
  const response = await axios.get(url)
    .then(data => data.data)
    .catch(e => console.log('Word Check Error: ', e));

  return response[0].meta ? true : false;
};

const calculateScore = (attemptedWord, answer) => {
  //declare an empty string
  let score = '';
  //iterate through word
  for (let i = 0; i < attemptedWord.length; i++) {
    //if current letter is equal to the letter in the answer at the same index
    if (attemptedWord[i] === answer[i]) {
      //append 2 to the string
      score += 2;
    } else if (answer.includes(attemptedWord[i])) {
      //if the current letter is found in the answer
        //append 1 to the string
      score += 1;
    } else {
      score += 0;
    }
    //if it is not eqaul and is not found
      //append 0 to the string
  }
  //return the string
  return score;
};

module.exports = {
  generateWord,
  isWordValid,
  calculateScore,
};
