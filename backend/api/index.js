require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const connectDB = require('../config/db');
const authRoutes = require('../routes/auth');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect DB (better way for serverless)
let isConnected = false;

app.use(async (req, res, next) => {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
      console.log("✅ MongoDB Connected");
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Signup API is running (Vercel)', status: 'ok' });
});

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// ✅ THIS IS THE MOST IMPORTANT LINE
module.exports = serverless(app);
