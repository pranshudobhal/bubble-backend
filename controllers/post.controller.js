const { Post } = require('../models/post.model');

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({});
    res.json({ success: true, allPosts });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving posts!', errorMessage: error.message });
  }
};

const createNewPost = async (req, res) => {
  try {
    const allPosts = await Post.find({});
    res.json({ success: true, allPosts });
  } catch (error) {
    res.json({ success: false, message: 'Error creating new post!', errorMessage: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postID } = req.params;
    const allPosts = await Post.find({});
    res.json({ success: true, allPosts });
  } catch (error) {
    res.json({ success: false, message: 'Error deleting post!', errorMessage: error.message });
  }
};

module.exports = { getAllPosts, createNewPost, deletePost };
