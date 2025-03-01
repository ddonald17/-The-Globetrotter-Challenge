const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');

// Create new challenge
router.post('/', challengeController.createChallenge);

// Get challenge by access code
router.get('/:accessCode', challengeController.getChallengeByAccessCode);

module.exports = router;