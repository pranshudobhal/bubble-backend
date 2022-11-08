const express = require('express');
const router = express.Router();
const { getAllPosts, createNewPost, deletePost, addReactionToPost, removeReactionToPost, getAllPostsByUsername } = require('../controllers/post.controller');

router.get('/', getAllPosts);
router.post('/', createNewPost);
router.delete('/:postID', deletePost);

router.get('/:username', getAllPostsByUsername);

router.post('/:postID/:reaction', addReactionToPost);
router.delete('/:postID/:reaction', removeReactionToPost);

module.exports = router;
