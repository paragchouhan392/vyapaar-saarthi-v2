const express = require("express");

const {
  generateSuggestions,
} = require("../controllers/investment.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/suggestions",
  authMiddleware,
  generateSuggestions
);

module.exports = router;