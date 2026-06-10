const Business = require("../models/business.model");
const {
  getInvestmentSuggestions,
} = require("../services/gemini.services");

const generateSuggestions = async (req, res) => {

  try {

    const { userId } = req.body;

    const business = await Business.findOne({
      userId,
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    const suggestions =
      await getInvestmentSuggestions(business);

    res.json({
      success: true,
      data: JSON.parse(suggestions),
    });

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