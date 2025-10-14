// server.js
require('dotenv').config();              
const express = require('express');
const mongoose = require('mongoose');

const noteRoutes = require('./routes/NoteRoutes'); 

const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/notesdb';
const PORT   = process.env.PORT || 8081;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health route
app.get('/', (_req, res) => {
  res.send('<h1>Welcome to Note taking application - Week06 Exercise</h1>');
});

// API routes
app.use('/api', noteRoutes);

// Connect & start
(async () => {
  try {
    await mongoose.connect(DB_URL);  // Mongoose v7+ doesn’t need the old options
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Could not connect to MongoDB:', err.message);
    process.exit(1);
  }
})();
