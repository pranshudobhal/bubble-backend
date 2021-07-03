const { User } = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
  try {
    const { userNameOrEmail, password } = req.body;

    const usernameCheck = await User.findOne({ username: userNameOrEmail });
    const emailCheck = await User.findOne({ email: userNameOrEmail });

    const user = usernameCheck || emailCheck;

    if (!user) {
      return res.status(401).json({ success: false, message: 'No such user exists!!!' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ success: false, message: 'Error logging in!!!' });
    }

    const userData = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const token = jwt.sign({ userID: user._id }, process.env.SECRET, { expiresIn: '24h' });
    res.status(200).json({ success: true, userData, token });
  } catch (error) {
    res.json({ success: false, message: 'Some error with login!' });
  }
};

module.exports = { loginUser };
