const { User } = require('../models/user.model');

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}).select('firstName lastName username profileImageURL');
    res.json({ success: true, allUsers });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving all users', errorMessage: error.message });
  }
};

const getLoggedInUserData = async (req, res) => {
  try {
    const { userID } = req.user;

    const loggedInUser = await User.findById(userID)
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

    res.json({ success: true, loggedInUser });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving logged in user', errorMessage: error.message });
  }
};

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

module.exports = { getLoggedInUserData, getAllUsers, getUserByUsername, followUser, unFollowUser };
