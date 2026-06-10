const mongoose = require('mongoose');

const financialEntrySchema = new mongoose.Schema({
  month: { type: String, required: true },       // e.g. "Jan 2025"
  revenue: { type: Number, required: true },      // in ₹
  expenses: { type: Number, required: true },     // in ₹
  profit: { type: Number, required: true },       // in ₹
  customers: { type: Number, default: 0 },        // active customers count
}, { _id: false });

const financialsSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'business',
    required: true,
    unique: true,
  },
  entries: {
    type: [financialEntrySchema],
    default: [],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const financialsModel = mongoose.model('financials', financialsSchema);
module.exports = financialsModel;