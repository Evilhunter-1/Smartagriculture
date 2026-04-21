const express = require('express');
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['admin', 'farmer', 'expert', 'supplier'])
], register);

router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], login);

module.exports = router;