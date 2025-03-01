// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  score: {
    correct: {
      type: Number,
      default: 0
    },
    incorrect: {
      type: Number,
      default: 0
    }
  },
  gameHistory: [{
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination'
    },
    correct: Boolean,
    playedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Method to update user score
UserSchema.methods.updateScore = function(correct) {
  if (correct) {
    this.score.correct += 1;
  } else {
    this.score.incorrect += 1;
  }
  return this.save();
};

// Method to add game to history
UserSchema.methods.addToHistory = function(destinationId, correct) {
  this.gameHistory.push({
    destinationId,
    correct
  });
  return this.updateScore(correct);
};

// Method to get public user profile
UserSchema.methods.getPublicProfile = function() {
  return {
    username: this.username,
    score: this.score,
    createdAt: this.createdAt
  };
};

module.exports = mongoose.model('User', UserSchema);