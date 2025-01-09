require('dotenv').config(); // Load environment variables

const app = require('./src/index'); // Import your app setup
const PORT = process.env.PORT || 3000; // Use the port from .env or fallback to 3000

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
