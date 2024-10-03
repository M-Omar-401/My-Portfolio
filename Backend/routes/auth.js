const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Received registration data:', { name, email, password });

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ name, email, password });
    console.log('User object to save:', user);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    try {
      const savedUser = await user.save();
      console.log('Saved user:', savedUser);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (saveError) {
      console.error('Error saving user:', saveError);
      res.status(500).json({ message: 'Error saving user' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for admin credentials first
    if (email === 'admin@gmail.com' && password === 'admin') {
      const token = jwt.sign(
        { id: 'admin', name: 'Admin User', email: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return res.json({ token });
    }

    // Proceed with normal user login
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});




module.exports = router;
