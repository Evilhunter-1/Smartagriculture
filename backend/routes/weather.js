const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Placeholder for weather monitoring
router.get('/', auth, (req, res) => {
  res.json({ message: 'Weather data' });
});

module.exports = router;