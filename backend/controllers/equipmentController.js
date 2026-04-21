const Equipment = require('../models/Equipment');

exports.getEquipments = async (req, res) => {
  try {
    const equipments = await Equipment.find({ farmer: req.user.id });
    res.json(equipments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createEquipment = async (req, res) => {
  try {
    const equipment = new Equipment({ ...req.body, farmer: req.user.id });
    await equipment.save();
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
    res.json({ message: 'Equipment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};