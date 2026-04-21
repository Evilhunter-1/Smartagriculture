const express = require('express');
const { auth } = require('../middleware/auth');
const Soil = require('../models/Soil');
const Crop = require('../models/Crop');

const router = express.Router();

// Smart recommendations
router.get('/', auth, async (req, res) => {
  try {
    let recommendations = [];

    if (req.user.role === 'farmer') {
      // Get user's soil data
      const soils = await Soil.find({ farmer: req.user.id });
      const crops = await Crop.find({ farmer: req.user.id });

      // Crop recommendation based on soil pH
      if (soils.length > 0) {
        const avgPh = soils.reduce((sum, soil) => sum + soil.phLevel, 0) / soils.length;
        if (avgPh < 6) {
          recommendations.push('Soil pH is low. Consider crops like potatoes, blueberries, or rhododendrons.');
        } else if (avgPh > 7.5) {
          recommendations.push('Soil pH is high. Consider crops like asparagus, spinach, or broccoli.');
        } else {
          recommendations.push('Soil pH is optimal. Good for most crops.');
        }
      }

      // Irrigation reminder
      const now = new Date();
      const upcomingIrrigations = crops.filter(crop => {
        return crop.status === 'growing';
      });
      if (upcomingIrrigations.length > 0) {
        recommendations.push('Check irrigation for growing crops. Water early morning to reduce evaporation.');
      }

      // Fertilizer recommendation
      if (soils.length > 0) {
        const lowNutrients = soils.filter(soil => soil.nutrients.nitrogen < 50 || soil.nutrients.phosphorus < 50 || soil.nutrients.potassium < 50);
        if (lowNutrients.length > 0) {
          recommendations.push('Soil nutrients are low. Apply balanced NPK fertilizer.');
        }
      }

      // Disease alerts (placeholder)
      recommendations.push('Monitor crops for common pests. Use organic pesticides if needed.');

    } else if (req.user.role === 'expert') {
      recommendations = [
        'Review farmer soil reports and provide tailored advice.',
        'Monitor regional weather patterns for pest predictions.',
        'Update crop rotation recommendations based on current yields.'
      ];
    } else if (req.user.role === 'supplier') {
      recommendations = [
        'Check inventory levels and restock popular fertilizers.',
        'Offer seasonal discounts on irrigation equipment.',
        'Partner with local farmers for direct supply agreements.'
      ];
    } else if (req.user.role === 'admin') {
      recommendations = [
        'Review user registrations and system usage.',
        'Monitor data integrity across all modules.',
        'Plan feature updates based on user feedback.'
      ];
    }

    res.json({ recommendations });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
