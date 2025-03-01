// models/Challenge.js
const mongoose = require('mongoose');
const crypto = require('crypto');

const ChallengeSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  accessCode: {
    type: String,
    unique: true,
    default: () => crypto.randomBytes(4).toString('hex')
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 604800 // Auto-delete after 7 days
  }
});

// Method to get challenge with creator info
ChallengeSchema.methods.getWithCreator = async function() {
  await this.populate('creatorId');
  return {
    id: this._id,
    accessCode: this.accessCode,
    creator: this.creatorId.getPublicProfile(),
    active: this.active,
    createdAt: this.createdAt
  };
};

module.exports = mongoose.model('Challenge', ChallengeSchema);