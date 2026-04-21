const mongoose = require('mongoose');

const irrigationSchema = new mongoose.Schema({
  crop: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop', required: true },
  schedule: { type: String, required: true },
  waterAmount: { type: Number, required: true },
  lastIrrigation: { type: Date },
  nextIrrigation: { type: Date },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Irrigation', irrigationSchema);