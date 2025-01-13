const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT package
const User = require('../models/user'); // Adjust the path to your Sequelize model
const cors = require('cors');
require('dotenv').config(); // Ensure environment variables are loaded

const app = express(); // Initialize the app
const router = express.Router();

// Middleware
const frontendUrl = process.env.FRONTEND_URL;
// Middleware
app.use(cors({ origin: frontendUrl })); // Adjust to your frontend's origin
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// Your secret key for JWT - ensure this is stored securely
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Sign-in route
router.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the Users table
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token (optional but highly recommended for authentication)
    const token = jwt.sign(
      { email: user.email, id: user.id }, // Payload (user info)
      JWT_SECRET, // Secret key to sign the token
      { expiresIn: '1h' } // Expiration time (1 hour)
    );

    // Return the response with the token and user data
    return res.status(200).json({
      message: 'Login successful',
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
        residence: user.residence,
        dob: user.dob,
        selectedSkills: user.selectedSkills,
        bio: user.bio,
      },
      token, // Send the JWT token to the frontend
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Use the router
app.use(router);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
