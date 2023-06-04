const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = 'secretKey';


console.log(secretKey);
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
// Add these lines after the MongoDB connection
app.use('/users', userRoutes);
app.use('/login', loginRoutes);


app.get('/users', authenticateToken, (req, res) => {
    // If the token is valid, send a response
    res.json({ message: 'Protected endpoint accessed' });
  });


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



  function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
  
    // Check if the authorization header is present
    if (authHeader) {
      const token = authHeader.split(' ')[1];
  
      // Verify the token
      jwt.verify(token, secretKey, (err, user) => {
        console.log(err);
        if (err) {
          return res.sendStatus(403); // Invalid token
        }
  
        // Store the decoded user object in the request for further use
        req.user = user;
  
        next();
      });
    } else {
      res.sendStatus(401); // Unauthorized
    }
  }

