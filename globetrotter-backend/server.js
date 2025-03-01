const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const destinationRoutes = require('./routes/destinations');
const userRoutes = require('./routes/users');
const challengeRoutes = require('./routes/challenges');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));


// Routes
app.use('/api/destinations', destinationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/challenges', challengeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});