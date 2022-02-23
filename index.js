const express = require('express');
require('dotenv').config();
const { getNewWord } = require('./Routes/word.js');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Get response from server! at / endpoint.')
})

//Word
  //Where should this word be stored? How should this word be checked?
app.get('/new-word', getNewWord);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
