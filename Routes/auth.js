//Add any dependencies
const bcrypt = require('bcrypt');
const { User } = require('../Models/User.js');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_STRING;

const authenticate = async (req, res) => {
  const { userEmail, password } = req.body;
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    res.status(400).json({ error: 'Email not found' });
    return;
  }

  await bcrypt.compare(password, user.password, async (err, same) => {
    if (err) {
      console.log("ERR: ", err);
      res.status(500);
    } else if (!same) {
      res.status(401).json({ error: 'Password incorrect' });
    } else {
      const payload = { userEmail };
      const token = await jwt.sign(payload, secret, {
        expiresIn: '2 days'
      });
      res.cookie('token', token, { httpOnly: true })
        .json({ redirect: '/'})
    }
  });
};

module.exports = {
  authenticate,
};
