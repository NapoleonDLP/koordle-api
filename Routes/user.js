const { DB } = require('../db.js');
const { User } = require('../Models/User.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields'});
  }

  let data = { username, email };

  await bcrypt.hash(req.body.password, saltRounds)
    .then(hash => data.password = hash)
    .catch(e => {
      console.log('Hashing Error: ', e);
      res.status(500);
    });

  try {
    let newUser = new User(data);
    await newUser.save();

    newUser = newUser.toObject();
    delete newUser.password;

    res.send(newUser);
  } catch (e) {
    console.log('DB Error: ', e);
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

