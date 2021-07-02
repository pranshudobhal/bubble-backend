const express = require('express');
const router = express.Router();
const { getAllPosts, createNewPost, deletePost } = require('../controllers/post.controller');

router.get('/', getAllPosts);
router.post('/', createNewPost);
router.delete('/:postID', deletePost);

module.exports = router;
