const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  clues: {
    type: [String],
    required: true,
    validate: [array => array.length >= 2, 'At least 2 clues are required']
  },
  funFacts: {
    type: [String],
    required: true,
    validate: [array => array.length >= 3, 'At least 3 fun facts are required']
  },
  trivia: {
    type: [String],
    required: true,
    validate: [array => array.length >= 3, 'At least 3 trivia items are required']
  },
  image: {
    type: String,
    default: null
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Get a destination with clues only (hiding the answer and facts)
DestinationSchema.methods.getCluesOnly = function() {
  return {
    id: this._id,
    clues: this.getRandomClues(2),
    city: this.city, // Useful for displaying as a possible answer
  };
};

// ✅ Helper method to get random clues
DestinationSchema.methods.getRandomClues = function(count) {
  const shuffled = [...this.clues].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

DestinationSchema.methods.getRevealInfo = function() {
  return {
    id: this._id,
    city: this.city,
    country: this.country,
    funFacts: this.funFacts,
    trivia: this.trivia,
    image: this.image
  };
};

module.exports = mongoose.model('Destination', DestinationSchema);
