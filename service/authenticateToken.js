const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = 'secretKey';


function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if the authorization header is present
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log(secretKey, token);
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

module.exports = authenticateToken;
