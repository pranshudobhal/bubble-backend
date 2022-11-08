const { User } = require('../models/user.model');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createNewUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const saltRounds = 10;
    const user = await User.find({ email });

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (user.length >= 1) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    } else {
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: hashedPassword,
        profileImageURL: 'https://unsplash.it/400/400',
        followers: [],
        following: [],
      });

      const token = jwt.sign({ userID: newUser._id }, process.env.SECRET, { expiresIn: '24h' });

      await newUser.save();

      const userData = await User.findById(newUser._id)
        .populate([
          {
            path: 'followers',
            select: 'username firstName lastName profileImageURL',
            model: User,
          },
          {
            path: 'following',
            select: 'username firstName lastName profileImageURL',
            model: User,
          },
        ])
        .select('username firstName lastName profileImageURL');

      res.status(201).json({ success: true, message: 'User has been created', userData, token });
    }
  } catch (error) {
    res.json({ success: false, message: 'Error creating new user!', errorMessage: error.message });
  }
};

module.exports = { createNewUser };
