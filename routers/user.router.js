const express = require('express');
const router = express.Router();
const { getLoggedInUserData, getAllUsers, getUserByUsername, followUser, unFollowUser } = require('../controllers/user.controller');

router.get('/allUsers', getAllUsers);

router.get('/', getLoggedInUserData);
router.get('/:username', getUserByUsername);

router.post('/follow/:userToFollowID', followUser);
router.delete('/follow/:userToUnfollowID', unFollowUser);

module.exports = router;
