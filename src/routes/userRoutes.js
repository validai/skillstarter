const express = require('express');
const router = express.Router();

// Import necessary modules
const authenticate = require('../../middlewares/authMiddleware');
const User = require('../../models/user');  // Assuming you're using Sequelize

// Get user profile (protected route)
router.get('/profile', authenticate, async (req, res) => {
  try {
    console.log(`Fetching profile for user ID: ${req.user.id}`);

    // Retrieve the user from the database
    const user = await User.findByPk(req.user.id);  // Find user by ID from JWT

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Respond with the user's profile data
    res.json({
      id: user.id,
      email: user.email,
      // Include any other profile fields you'd like to return
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Error fetching user data.' });
  }
});

module.exports = router;
