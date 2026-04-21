const Fertilizer = require('../models/Fertilizer');

exports.getFertilizers = async (req, res) => {
  try {
    const fertilizers = await Fertilizer.find({ farmer: req.user.id });
    res.json(fertilizers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createFertilizer = async (req, res) => {
  try {
    const fertilizer = new Fertilizer({ ...req.body, farmer: req.user.id });
    await fertilizer.save();
    res.json(fertilizer);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateFertilizer = async (req, res) => {
  try {
    const fertilizer = await Fertilizer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fertilizer) return res.status(404).json({ message: 'Fertilizer not found' });
    res.json(fertilizer);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteFertilizer = async (req, res) => {
  try {
    const fertilizer = await Fertilizer.findByIdAndDelete(req.params.id);
    if (!fertilizer) return res.status(404).json({ message: 'Fertilizer not found' });
    res.json({ message: 'Fertilizer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};