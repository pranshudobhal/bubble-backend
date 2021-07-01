const express = require('express');
const router = express.Router();
const { getUser, updateUserData, deleteUser } = require('../controllers/user.controller');

router.get('/', getUser);
router.post('/', updateUserData);
router.delete('/', deleteUser);

module.exports = router;
