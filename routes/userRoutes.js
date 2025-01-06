const express = require('express');
const router = express.Router();

// Register user
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    // Simulate saving to the database
    console.log('User registered:', { username, email });
    res.status(201).send({ message: 'User registered successfully!' });
});

// Get all users
router.get('/users', (req, res) => {
    // Simulate fetching from the database
    const users = [{ id: 1, username: 'JohnDoe' }];
    res.status(200).send(users);
});

module.exports = router;
