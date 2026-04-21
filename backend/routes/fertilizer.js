const express = require('express');
const { getFertilizers, createFertilizer, updateFertilizer, deleteFertilizer } = require('../controllers/fertilizerController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getFertilizers);
router.post('/', auth, createFertilizer);
router.put('/:id', auth, updateFertilizer);
router.delete('/:id', auth, deleteFertilizer);

module.exports = router;