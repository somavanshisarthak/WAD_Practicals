// Import express
const express = require("express");

// Create app
const app = express();

// Serve static files from public folder
app.use(express.static("public"));

// Start server
app.listen(3000, () => {

    console.log("Server Running on Port 3000");

});