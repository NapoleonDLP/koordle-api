const cookieParser = require('cookie-parser');
const express = require('express');
require('dotenv').config();
const Games = require('./Routes/game.js');
const Users = require('./Routes/user.js');
const Auth = require('./Routes/auth.js');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const withAuth = require('./Routes/middleware.js');
const CLIENT_URL = process.env.CLIENT_URL;

app.use(express.json());
app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Get response from server! at / endpoint.')
})

//Game
  //Where should this word be stored? How should this word be checked?
  //Check word for result
app.get('/new-word', Games.getNewWord);
app.post('/new-game', withAuth ,Games.postNewGame);
app.post('/word-check', Games.postWordCheck);
app.get('/get-answer/:id', Games.getAnswerByGameId);

//User
  //Register new user
  //Update user profile
  //Update settings
  app.post('/register', Users.createUser);

  //Auth
  //Login
  app.post('/authenticate', Auth.authenticate);
  app.get('/checkToken', withAuth, () => res.sendStatus(200));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
