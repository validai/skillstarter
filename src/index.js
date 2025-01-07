// Load Enviroment Variabes
require('dotenv').config();


// Importing necessary modules
const express = require('express');
const userRoutes = require('./routes/userRoutes');

// Initialize the express app
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());  // This allows the app to handle JSON data

// Simple route definition
app.get('/', (req, res) => {
  res.send('Hello, Render!');
});

// Connect routes to your app
app.use('/api', userRoutes);  // Adding user routes under the '/api' path

// Start the server
const PORT = process.env.PORT || 3000;  // Use an environment variable or fallback to port 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
