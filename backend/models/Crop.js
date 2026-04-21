const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  plantingDate: { type: Date, required: true },
  harvestDate: { type: Date },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['planted', 'growing', 'harvested'], default: 'planted' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Crop', cropSchema);