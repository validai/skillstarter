const express = require('express');
const authenticate = require('../middlewares/authMiddleware'); // JWT authentication middleware
const User = require('../models/User'); // Import the User model
const router = express.Router();

// Get user profile (protected route)
router.get('/profile', authenticate, async (req, res) => {
  try {
    // Log for debugging
    console.log(`Fetching profile for user ID: ${req.user.id}`);
    
    // Access user ID from the decoded JWT (using `req.user.id`)
    const user = await User.findByPk(req.user.id);  // Find the user by their primary key (ID)

    // If the user is not found, return 404
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // If the user is found, return the user profile (exclude sensitive data if needed)
    res.json({
      id: user.id,
      email: user.email,
      // Add other fields you want to return (but avoid sending sensitive info like password)
    });
  } catch (error) {
    // Log the error for debugging
    console.error(error);

    // Return a 500 status if an error occurs while fetching user data
    res.status(500).json({ message: 'Error fetching user data.' });
  }
});

// Other user-related routes (e.g., login, register) can go here...

module.exports = router;
