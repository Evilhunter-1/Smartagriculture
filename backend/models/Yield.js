const mongoose = require('mongoose');

const yieldSchema = new mongoose.Schema({
  crop: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop', required: true },
  quantity: { type: Number, required: true },
  quality: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  harvestDate: { type: Date, required: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Yield', yieldSchema);