require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../lib/db');
const authRoutes = require('../lib/routes/auth');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to DB on each request for serverless
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Database connection failed', 
      error: error.message 
    });
  }
});

app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Salata Rides API is running', 
    status: 'ok',
    endpoints: {
      signup: '/api/auth/signup',
      test: '/api/auth/test'
    }
  });
});

app.get('/api', (req, res) => {
  res.json({ 
    success: true,
    message: 'API endpoint is working', 
    status: 'ok' 
  });
});

app.use('/api/auth', authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found',
    path: req.path 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!', 
    error: err.message 
  });
});

module.exports = app;
