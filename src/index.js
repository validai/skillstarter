require('dotenv').config();

const express = require('express');
const app = express();
const db = require('../config/db.js'); // Adjust path as needed
const sequelize = require('./config/db'); // Adjust path if necessary

console.log('Starting server...');
let userRoutes;

try {
    userRoutes = require('./routes/userRoutes');
    console.log('User routes loaded successfully');
} catch (error) {
    console.error('Error loading userRoutes:', error);
}

app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Hello, Render!');
});

// Connect routes
if (userRoutes) {
    app.use('/api', userRoutes);
} else {
    console.error('Failed to load user routes');
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log('Error connecting to database:', err));