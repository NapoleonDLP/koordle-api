const { DB } = require('../db.js');
const { User } = require('../Models/User.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUser = (req, res) => {
  let data = {};
  data.username = req.body.username;
  data.email = req.body.email;

  bcrypt.hash(req.body.password, saltRounds)
    .then(hash => data.password = hash)
    .catch(e => res.status(500))

  try {
    const newUser = new User(data);
    newUser.save();
    res.send(newUser);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
};

const updateUser = (req, res) => {

};

const deleteUser = (req, res) => {

};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
};

