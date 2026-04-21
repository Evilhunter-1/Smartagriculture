const express = require('express');
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { auth, roleAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, roleAuth(['admin']), getUsers);
router.get('/:id', auth, getUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, roleAuth(['admin']), deleteUser);

module.exports = router;