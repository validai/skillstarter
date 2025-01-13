const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import jwt
const User = require('./user'); // Import User model from the same folder
const sequelize = require('../src/config/db'); // Database connection
require('dotenv').config();
const cors = require('cors');

// Initialize Express
const app = express();

const frontendUrl = process.env.FRONTEND_URL;
// Middleware
app.use(cors({ origin: frontendUrl })); // Adjust to your frontend's origin
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// API Route for Adding a User Profile
app.post('/api/addUserProfile', async (req, res) => {
  const { email, password, firstName, lastName, dob, residence, bio, skills, profilePicture } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      dob,
      residence,
      bio,
      selectedSkills: skills,
      profilePicture,
    });

    const secretKey = process.env.JWT_SECRET_KEY || 'defaultSecretKey';
    
   // Function to create JWT token
const createToken = (userData, secretKey) => {
    if (!secretKey) {
      throw new Error('Secret key is required to create a JWT.');
    }
  
    return jwt.sign(
      { id: userData.id, email: userData.email }, // Payload
      secretKey, // Secret key
      { expiresIn: '1h' } // Token expiration time
    );
    
  };
  
  // Usage
  const token = createToken(newUser, secretKey);

    res.status(201).json({
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        dob: newUser.dob,
        residence: newUser.residence,
        bio: newUser.bio,
        selectedSkills: newUser.selectedSkills,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
      message: 'Profile created successfully',
      token, // Send token to the frontend
    });
  } catch (error) {
    console.error('Error in /api/addUserProfile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the Database and Server
(async () => {
  try {
    await sequelize.sync({ alter: true }); // Adjust schema
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing the database:', error.message);
  }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});