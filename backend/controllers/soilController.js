const Soil = require('../models/Soil');

exports.getSoils = async (req, res) => {
  try {
    const soils = await Soil.find({ farmer: req.user.id });
    res.json(soils);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createSoil = async (req, res) => {
  try {
    const soil = new Soil({ ...req.body, farmer: req.user.id });
    await soil.save();
    res.json(soil);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateSoil = async (req, res) => {
  try {
    const soil = await Soil.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!soil) return res.status(404).json({ message: 'Soil not found' });
    res.json(soil);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteSoil = async (req, res) => {
  try {
    const soil = await Soil.findByIdAndDelete(req.params.id);
    if (!soil) return res.status(404).json({ message: 'Soil not found' });
    res.json({ message: 'Soil deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};