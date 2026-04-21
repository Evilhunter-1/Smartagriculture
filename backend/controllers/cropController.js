const Crop = require('../models/Crop');

exports.getCrops = async (req, res) => {
  try {
    const crops = await Crop.find({ farmer: req.user.id });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ message: 'Crop not found' });
    res.json(crop);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createCrop = async (req, res) => {
  try {
    const crop = new Crop({ ...req.body, farmer: req.user.id });
    await crop.save();
    res.json(crop);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!crop) return res.status(404).json({ message: 'Crop not found' });
    res.json(crop);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findByIdAndDelete(req.params.id);
    if (!crop) return res.status(404).json({ message: 'Crop not found' });
    res.json({ message: 'Crop deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};