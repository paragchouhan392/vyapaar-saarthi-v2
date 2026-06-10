const express = require("express");

const {
  generateSuggestions,
} = require("../controllers/investment.controller");

const router = express.Router();

router.post(
  "/suggestions",
  generateSuggestions
);

module.exports = router;