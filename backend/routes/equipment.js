const express = require('express');
const { getEquipments, createEquipment, updateEquipment, deleteEquipment } = require('../controllers/equipmentController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getEquipments);
router.post('/', auth, createEquipment);
router.put('/:id', auth, updateEquipment);
router.delete('/:id', auth, deleteEquipment);

module.exports = router;