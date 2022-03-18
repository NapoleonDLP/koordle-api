//Add any dependencies


const authenticate = async (req, res) => {
  const { userEmail, password } = req.body;
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    res.status(400).json({ error: 'User not found' });
    return;
  }


};

module.exports = {
  authenticate,
};
