const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username } = req.body;
    
    // Validate username
    if (!username || username.length < 3 || username.length > 20) {
      return res.status(400).json({
        message: 'Username must be between 3 and 20 characters'
      });
    }
    
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: 'Username already taken'
      });
    }
    
    // Create new user
    const user = new User({ username });
    await user.save();
    
    res.status(201).json(user.getPublicProfile());
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by username
exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.getPublicProfile());
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user score
exports.updateScore = async (req, res) => {
  try {
    const { id } = req.params;
    const { destinationId, correct } = req.body;
    
    // Validate request body
    if (typeof correct !== 'boolean' || !destinationId) {
      return res.status(400).json({
        message: 'Request must include destinationId and correct boolean'
      });
    }
    
    // Find user
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update score and game history
    await user.addToHistory(destinationId, correct);
    
    res.json(user.getPublicProfile());
  } catch (error) {
    console.error('Error updating score:', error);
    res.status(500).json({ message: 'Server error' });
  }
};