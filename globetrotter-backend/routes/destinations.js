const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');

// Get random destination with clues
router.get('/random', destinationController.getRandomDestination);

// Reveal destination details after guess
router.get('/:id/reveal', destinationController.revealDestination);

// Check if guess is correct
router.post('/check-guess', destinationController.checkGuess);

module.exports = router;