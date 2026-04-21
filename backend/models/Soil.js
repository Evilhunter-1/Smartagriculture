const mongoose = require('mongoose');

const soilSchema = new mongoose.Schema({
  location: { type: String, required: true },
  phLevel: { type: Number, required: true },
  nutrients: {
    nitrogen: { type: Number, default: 0 },
    phosphorus: { type: Number, default: 0 },
    potassium: { type: Number, default: 0 }
  },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Soil', soilSchema);