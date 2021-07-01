const express = require('express');
const router = express.Router();
const { createNewUser } = require('../controllers/signup.controller');

router.post('/', createNewUser);

module.exports = router;
