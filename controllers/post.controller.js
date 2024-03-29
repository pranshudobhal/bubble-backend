const { User } = require('../models/user.model');
const { Post } = require('../models/post.model');

const getAllPosts = async (req, res) => {
  try {
    const { userID } = req.user;

    const loggedInUser = await User.findById(userID);
    const allPosts = await Post.find({ user: { $in: [...loggedInUser.following, userID] } }).populate('user', '_id firstName lastName username profileImageURL');

    res.json({ success: true, allPosts });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving posts!', errorMessage: error.message });
  }
};

const createNewPost = async (req, res) => {
  try {
    const { userID, content } = req.body;

    const newPost = new Post({
      user: userID,
      content: content,
      reactions: {
        thumbsUp: [],
        hooray: [],
        heart: [],
        rocket: [],
        eyes: [],
      },
    });

    await newPost.save();

    const newPostData = await Post.findById(newPost._id).populate('user', '_id firstName lastName username profileImageURL');

    res.json({ success: true, newPostData });
  } catch (error) {
    res.json({ success: false, message: 'Error creating new post!', errorMessage: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postID } = req.params;
    const post = await Post.findByIdAndDelete(postID);

    res.json({ success: true, message: 'Post has been deleted!', post });
  } catch (error) {
    res.json({ success: false, message: 'Error deleting post!', errorMessage: error.message });
  }
};

const addReactionToPost = async (req, res) => {
  try {
    const { postID, reaction } = req.params;
    const { userID } = req.body;

    const post = await Post.findById(postID);
    const getIndividualReaction = post.reactions.get(reaction);

    const hasUserReacted = getIndividualReaction.find((id) => id === userID);

    if (!hasUserReacted) {
      getIndividualReaction.push(userID);
      post.reactions.set(reaction, getIndividualReaction);

      await post.save();
      return res.json({ success: true, message: 'Reaction has been added to post!', postID, reaction, userID });
    }
  } catch (error) {
    res.json({ success: false, message: 'Error adding reaction from post!', errorMessage: error.message });
  }
};

const removeReactionToPost = async (req, res) => {
  try {
    const { postID, reaction } = req.params;
    const { userID } = req.body;

    const post = await Post.findById(postID);
    const getIndividualReaction = post.reactions.get(reaction);
    getIndividualReaction.remove(userID);
    post.reactions.set(reaction, getIndividualReaction);

    await post.save();

    res.json({ success: true, message: 'Reaction has been removed from post!', postID, reaction, userID });
  } catch (error) {
    res.json({ success: false, message: 'Error removing reaction from post!', errorMessage: error.message });
  }
};

const getAllPostsByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    const allUserPosts = await Post.find({ user: user._id }).populate('user', '_id firstName lastName username profileImageURL');

    res.json({ success: true, allUserPosts });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving posts by username!', errorMessage: error.message });
  }
};

module.exports = { getAllPosts, createNewPost, deletePost, addReactionToPost, removeReactionToPost, getAllPostsByUsername };
