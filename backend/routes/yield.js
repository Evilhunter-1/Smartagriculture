const express = require('express');
const { getYields, createYield, updateYield, deleteYield } = require('../controllers/yieldController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getYields);
router.post('/', auth, createYield);
router.put('/:id', auth, updateYield);
router.delete('/:id', auth, deleteYield);

module.exports = router;