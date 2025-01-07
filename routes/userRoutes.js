const express = require('express');
const authenticate = require('../middleware/auth');  // JWT authentication middleware
const User = require('../models/User');  // Import User model

const router = express.Router();

// Get user profile (protected route)
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);  // Access user ID from the decoded JWT
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data.' });
  }
});

module.exports = router;
