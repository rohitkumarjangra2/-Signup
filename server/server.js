const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins during dev, customize as needed
  credentials: true
}));
app.use(express.json());

// Connection to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern-auth-db';
const PORT = process.env.PORT || 5000;

console.log('Connecting to MongoDB at:', MONGO_URI);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully ✅');
    // Start listening only after DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error ❌:', err);
    process.exit(1);
  });

// Base Route
app.get('/', (req, res) => {
  res.send('Authentication API is up and running 🛡️');
});

// Register API Routes
app.use('/api/auth', authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
