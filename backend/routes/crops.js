const express = require('express');
const { getCrops, getCrop, createCrop, updateCrop, deleteCrop } = require('../controllers/cropController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getCrops);
router.get('/:id', auth, getCrop);
router.post('/', auth, createCrop);
router.put('/:id', auth, updateCrop);
router.delete('/:id', auth, deleteCrop);

module.exports = router;