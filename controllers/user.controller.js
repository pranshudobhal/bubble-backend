const { User } = require('../models/user.model');

const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select('username firstName lastName');
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving user data', errorMessage: error.message });
  }
};

/**
 * TODO:
 * 1. Find and update user data
 */
const updateUserData = async (req, res) => {
  try {
    const { userID } = req.user;
    const user = await User.findById(userID);
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: 'Error updating user data', errorMessage: error.message });
  }
};

/**
 * TODO:
 * 1. Find and delete user
 */
const deleteUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: 'Error deleting user', errorMessage: error.message });
  }
};

module.exports = { getUserByUsername, updateUserData, deleteUser };
