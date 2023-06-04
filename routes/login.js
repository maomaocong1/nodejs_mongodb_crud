const express = require('express');
const router = express.Router();
const User = require('../models/user');
const path = require('path');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const secretKey = 'secretKey';


// Create a new user
router.post('/', (req, res) => {
  const {email, password } = req.body;
  console.log(email);
  console.log(req.body);
  User.findOne({email}).then(user => {
    if (!user){
        res.status(201).json({message: "User not found"});
    }
    else if (user.password != password){
        res.status(201).json({message: "password not correct"});
    }else{
        
        const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

        // Send the JWT token as a response
        res.status(200).json({token});
    }
    
  }).catch(error => {
    res.status(400).json({ error: error.message });
  });
});

router.get('/', (req, res) => {
    const tmp = path.normalize(path.join(__dirname, '../static/login.html'));
    res.sendFile(tmp);
  });


module.exports = router;
