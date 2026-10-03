const Business = require("../models/business.model");
const Financials = require("../models/financials.model");
const { getInvestmentSuggestions } = require("../services/gemini.services");

const RISK_LABELS = { 1: "Conservative", 2: "Balanced", 3: "Growth" };

const generateSuggestions = async (req, res) => {
  try {
    const { amount, risk } = req.body;

    const investAmount = Number(amount);
    if (!investAmount || investAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "A valid investment amount is required",
      });
    }

    const business = await Business.findById(req.businessId).lean();

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    const financialRecord = await Financials.findOne({
      businessId: req.businessId,
    }).lean();
    const financials = financialRecord?.entries || [];

    const data = await getInvestmentSuggestions({
      business,
      financials,
      amount: investAmount,
      riskLevel: RISK_LABELS[risk] || "Balanced",
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateSuggestions,
};