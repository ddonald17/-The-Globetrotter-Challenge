const Challenge = require('../models/Challenge');
const User = require('../models/User');

// Create a new challenge
exports.createChallenge = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Validate request body
    if (!userId) {
      return res.status(400).json({
        message: 'User ID is required'
      });
    }
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Create new challenge
    const challenge = new Challenge({
      creatorId: userId
    });
    
    await challenge.save();
    
    // Get challenge with creator info
    const challengeWithCreator = await challenge.getWithCreator();
    
    res.status(201).json({
      ...challengeWithCreator,
      shareUrl: `${process.env.FRONTEND_URL}/challenge/${challenge.accessCode}`
    });
  } catch (error) {
    console.error('Error creating challenge:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get challenge by access code
exports.getChallengeByAccessCode = async (req, res) => {
  try {
    const { accessCode } = req.params;
    
    const challenge = await Challenge.findOne({ accessCode });
    
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    if (!challenge.active) {
      return res.status(400).json({ message: 'This challenge is no longer active' });
    }
    
    // Get challenge with creator info
    const challengeWithCreator = await challenge.getWithCreator();
    
    res.json(challengeWithCreator);
  } catch (error) {
    console.error('Error fetching challenge:', error);
    res.status(500).json({ message: 'Server error' });
  }
};