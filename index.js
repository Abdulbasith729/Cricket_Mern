const express = require('express');
const app = express();
const connectdb = require('./config/config'); // Ensure this path is correct
const port = 4000;
const Player = require('./Models/players'); // Use PascalCase for model names
const PlayerRouter= require('./routes/Player_routes')
// Middleware to parse JSON requests
app.use(express.json());

// Route handler
app.use('/api/v1/players',PlayerRouter)

// Start the server
app.listen(port, async () => {
  try {
    // Connect to the database before starting the server
    await connectdb();
    console.log(`Example app listening on port ${port}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the process if the database connection fails
  }
});
