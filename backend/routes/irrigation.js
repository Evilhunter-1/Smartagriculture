const express = require('express');
const { getIrrigations, createIrrigation, updateIrrigation, deleteIrrigation } = require('../controllers/irrigationController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getIrrigations);
router.post('/', auth, createIrrigation);
router.put('/:id', auth, updateIrrigation);
router.delete('/:id', auth, deleteIrrigation);

module.exports = router;