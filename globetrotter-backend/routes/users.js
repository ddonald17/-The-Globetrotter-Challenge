const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create new user
router.post('/', userController.createUser);

// Get user by username
router.get('/:username', userController.getUserByUsername);

// Update user score
router.put('/:id/score', userController.updateScore);

module.exports = router;