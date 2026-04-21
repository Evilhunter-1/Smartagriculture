const Yield = require('../models/Yield');

exports.getYields = async (req, res) => {
  try {
    const yields = await Yield.find({ farmer: req.user.id });
    res.json(yields);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createYield = async (req, res) => {
  try {
    const yieldData = new Yield({ ...req.body, farmer: req.user.id });
    await yieldData.save();
    res.json(yieldData);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateYield = async (req, res) => {
  try {
    const yieldData = await Yield.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!yieldData) return res.status(404).json({ message: 'Yield not found' });
    res.json(yieldData);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteYield = async (req, res) => {
  try {
    const yieldData = await Yield.findByIdAndDelete(req.params.id);
    if (!yieldData) return res.status(404).json({ message: 'Yield not found' });
    res.json({ message: 'Yield deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};