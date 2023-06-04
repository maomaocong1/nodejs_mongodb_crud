const express = require('express');
const router = express.Router();
const User = require('../models/user');

const authenticateToken = require('../service/authenticateToken');

router.use(authenticateToken);

// Create a new user
router.post('/', (req, res) => {
    console.log(req.body);
  const { name, email, password } = req.body;
  console.log(req.body);
  const newUser = new User({
    name,
    email,
    password
  });

  newUser.save()
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

// Read all users
router.get('/',(req, res) => {
    console.log(req);
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Read a single user by email
router.get('/email/:email', (req, res) => {
    const { email } = req.params;
  
    User.findOne({ email })
      .then(user => {
        if (!user) {
          res.status(404).json({ error: 'User not found' });
        } else {
          res.json(user);
        }
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  });

// Read a single user by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    User.findById(id)
      .then(user => {
        if (!user) {
          res.status(404).json({ error: 'User not found' });
        } else {
          res.json(user);
        }
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  });


// Update a user by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;


  User.findByIdAndUpdate(id, { name, email, password }, { new: true })
    .then(user => {
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(user);
      }
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});





// Delete a user by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  User.findByIdAndRemove(id)
    .then(user => {
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});



module.exports = router;
