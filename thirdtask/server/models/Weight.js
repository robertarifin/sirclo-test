/**
 * Model for Weight item that has date, minWeight, maxWeight as its property
 * 
 * @author Robert Arifin <arifinrobert2012@gmail.com>
 */

const mongoose = require('mongoose');
const weightSchema = new mongoose.Schema({ 
  date: {
    type: Date,
    required: true
  },
  
  minWeight: {
    type: Number,
    required: true
  },

  maxWeight: {
    type: Number,
    required: true
  }
});

const Weight = mongoose.model('Weight', weightSchema);

module.exports = Weight;