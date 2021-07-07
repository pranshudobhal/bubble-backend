const { Post } = require('../models/post.model');

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({}).populate('user', '_id firstName lastName username profileImageURL');
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
    const updatedPost = post.reactions.get(reaction);
    updatedPost.push(userID);
    post.reactions.set(reaction, updatedPost);

    await post.save();

    res.json({ success: true, message: 'Reaction has been added to post!', postID, reaction, userID });
  } catch (error) {
    res.json({ success: false, message: 'Error adding reaction from post!', errorMessage: error.message });
  }
};

const removeReactionToPost = async (req, res) => {
  try {
    const { postID, reaction } = req.params;
    const { userID } = req.body;

    const post = await Post.findById(postID);
    const updatedPost = post.reactions.get(reaction);
    updatedPost.remove(userID);
    post.reactions.set(reaction, updatedPost);

    await post.save();

    res.json({ success: true, message: 'Reaction has been removed from post!', postID, reaction, userID });
  } catch (error) {
    res.json({ success: false, message: 'Error removing reaction from post!', errorMessage: error.message });
  }
};

module.exports = { getAllPosts, createNewPost, deletePost, addReactionToPost, removeReactionToPost };
