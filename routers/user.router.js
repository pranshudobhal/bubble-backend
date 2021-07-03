const express = require('express');
const router = express.Router();
const { getUserByUsername, updateUserData, deleteUser } = require('../controllers/user.controller');

router.get('/:username', getUserByUsername);
router.post('/', updateUserData);
router.delete('/', deleteUser);

module.exports = router;
