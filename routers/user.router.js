const express = require('express');
const router = express.Router();
const { getUserByUsername, followUser, unFollowUser, updateUserData, deleteUser } = require('../controllers/user.controller');

router.get('/:username', getUserByUsername);

router.post('/follow/:userToFollowID', followUser);
router.delete('/follow/:userToUnfollowID', unFollowUser);

router.post('/', updateUserData);
router.delete('/', deleteUser);

module.exports = router;
