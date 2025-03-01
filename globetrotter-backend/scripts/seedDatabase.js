const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Destination = require('../models/Destination');

// Load environment variables
dotenv.config();

// Function to seed database
async function seedDatabase() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI;
    
    mongoose.connect(mongoUri)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));
    
    
    // Read destinations data
    const dataPath = path.join(__dirname, '../data/destinations.json');
    const destinations = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    console.log(`Found ${destinations.length} destinations to seed`);
    
    // Clear existing destinations
    await Destination.deleteMany({});
    console.log('Cleared existing destinations');
    
    // Insert new destinations
    const result = await Destination.insertMany(destinations);
    console.log(`Successfully seeded ${result.length} destinations`);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
    
    console.log('Database seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
    
    // Disconnect from MongoDB
    try {
      await mongoose.disconnect();
      console.log('MongoDB disconnected');
    } catch (disconnectError) {
      console.error('Error disconnecting from MongoDB:', disconnectError);
    }
  }
}

// Run the seeder
seedDatabase();