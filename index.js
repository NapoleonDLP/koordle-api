const express = require('express');
require('dotenv').config();
const Games = require('./Routes/game.js');
const Users = require('./Routes/user.js');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Get response from server! at / endpoint.')
})

//Game
  //Where should this word be stored? How should this word be checked?
  //Check word for result
app.get('/new-word', Games.getNewWord);
app.post('/new-game', Games.postNewGame);

//User
  //Register new user
  //Update user profile
  //Login
  //Update settings
app.post('/register', Users.createUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
