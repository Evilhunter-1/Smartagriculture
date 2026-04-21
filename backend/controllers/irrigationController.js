const Irrigation = require('../models/Irrigation');

exports.getIrrigations = async (req, res) => {
  try {
    const irrigations = await Irrigation.find({ farmer: req.user.id });
    res.json(irrigations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createIrrigation = async (req, res) => {
  try {
    const irrigation = new Irrigation({ ...req.body, farmer: req.user.id });
    await irrigation.save();
    res.json(irrigation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateIrrigation = async (req, res) => {
  try {
    const irrigation = await Irrigation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!irrigation) return res.status(404).json({ message: 'Irrigation not found' });
    res.json(irrigation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteIrrigation = async (req, res) => {
  try {
    const irrigation = await Irrigation.findByIdAndDelete(req.params.id);
    if (!irrigation) return res.status(404).json({ message: 'Irrigation not found' });
    res.json({ message: 'Irrigation deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};