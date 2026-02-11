const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { signupValidation, validate } = require('../middleware/validation');

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ 
    success: true,
    message: 'Auth route is working', 
    timestamp: new Date() 
  });
});

router.post('/signup', signupValidation, validate, async (req, res) => {
  try {
    const { fullName, email, mobileNumber, gender, age, password } = req.body;

    console.log('Signup request received:', { fullName, email, mobileNumber, gender });

    // Check if user exists
    const existingUser = await User.findOne({ 
      $or: [
        { email: email.toLowerCase() }, 
        { mobileNumber }
      ] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email or mobile number' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      fullName,
      email: email.toLowerCase(),
      mobileNumber,
      gender,
      age: new Date(age),
      password: hashedPassword
    });

    await user.save();
    console.log('User created:', user._id);

    // Generate JWT
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
});

module.exports = router;
