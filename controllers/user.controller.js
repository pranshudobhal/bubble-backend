const { User } = require('../models/user.model');

const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username })
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

    if (!user) {
      return res.json({ success: false, message: 'No such user exists' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving user data', errorMessage: error.message });
  }
};

const followUser = async (req, res) => {
  try {
    const { userID } = req.user;
    const { userToFollowID } = req.params;

    const user = await User.findById(userID);
    user.following.push(userToFollowID);

    const followedUser = await User.findById(userToFollowID);
    followedUser.followers.push(userID);

    await user.save();
    await followedUser.save();

    const followedUserData = await User.findById(userToFollowID)
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

    res.json({ success: true, followedUserData });
  } catch (error) {
    res.json({ success: false, message: 'Error following user', errorMessage: error.message });
  }
};

const unFollowUser = async (req, res) => {
  try {
    const { userID } = req.user;
    const { userToUnfollowID } = req.params;

    const user = await User.findById(userID);
    user.following.remove(userToUnfollowID);

    const unfollowedUser = await User.findById(userToUnfollowID);
    unfollowedUser.followers.remove(userID);

    await user.save();
    await unfollowedUser.save();

    const unfollowedUserData = await User.findById(userToUnfollowID)
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

    res.json({ success: true, unfollowedUserData });
  } catch (error) {
    res.json({ success: false, message: 'Error unfollowing user', errorMessage: error.message });
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

module.exports = { getUserByUsername, followUser, unFollowUser, updateUserData, deleteUser };
