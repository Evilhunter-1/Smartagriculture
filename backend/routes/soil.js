const express = require('express');
const { getSoils, createSoil, updateSoil, deleteSoil } = require('../controllers/soilController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getSoils);
router.post('/', auth, createSoil);
router.put('/:id', auth, updateSoil);
router.delete('/:id', auth, deleteSoil);

module.exports = router;