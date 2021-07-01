const { User } = require('../models/user.model');

const getUser = async (req, res) => {
  try {
    const { userID } = req.user;
    const user = await User.findById(userID).select('_id email firstName lastName');
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

module.exports = { getUser, updateUserData, deleteUser };
