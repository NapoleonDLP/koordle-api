//Add any dependencies
const bcrypt = require('bcrypt');
const { User } = require('../Models/User.js');

const authenticate = async (req, res) => {
  const { userEmail, password } = req.body;
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    res.status(400).json({ error: 'Email not found' });
    return;
  }

  bcrypt.compare(password, user.password, (err, same) => {
    if (err) {
      console.log("ERR: ", err);
      res.status(500);
    } else {
      //send JWT token
      console.log('SAMSIES: ', same, err);
    }
  })
  console.log("USER FROM AUTH/DB: ", user);
};

module.exports = {
  authenticate,
};
