const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const { getFinancials, upsertFinancialEntry, deleteFinancialEntry } = require('../controllers/financials.controller');

const router = express.Router();

router.get('/', authMiddleware, getFinancials);
router.post('/', authMiddleware, upsertFinancialEntry);
router.delete('/:month', authMiddleware, deleteFinancialEntry);

module.exports = router;