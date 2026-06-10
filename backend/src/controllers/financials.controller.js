const financialsModel = require('../models/financials.model');

// GET /financials — return this user's financial entries
async function getFinancials(req, res) {
  try {
    const data = await financialsModel.findOne({ businessId: req.businessId });
    if (!data) {
      return res.status(200).json({ entries: [] });
    }
    res.status(200).json({ entries: data.entries });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching financials', error: error.message });
  }
}

// POST /financials — add or update a monthly entry for this user
async function upsertFinancialEntry(req, res) {
  try {
    const { month, revenue, expenses, customers } = req.body;

    if (!month || revenue == null || expenses == null) {
      return res.status(400).json({ message: 'month, revenue, and expenses are required.' });
    }

    const profit = revenue - expenses;

    let financials = await financialsModel.findOne({ businessId: req.businessId });

    if (!financials) {
      financials = await financialsModel.create({
        businessId: req.businessId,
        entries: [{ month, revenue, expenses, profit, customers: customers || 0 }],
        updatedAt: new Date(),
      });
    } else {
      const existingIndex = financials.entries.findIndex(e => e.month === month);
      if (existingIndex >= 0) {
        // update existing month
        financials.entries[existingIndex] = { month, revenue, expenses, profit, customers: customers || 0 };
      } else {
        financials.entries.push({ month, revenue, expenses, profit, customers: customers || 0 });
        // Keep sorted by date: convert "Mon YYYY" to sortable value
        financials.entries.sort((a, b) => new Date('1 ' + a.month) - new Date('1 ' + b.month));
      }
      financials.updatedAt = new Date();
      await financials.save();
    }

    res.status(200).json({ message: 'Financial entry saved.', entries: financials.entries });
  } catch (error) {
    res.status(500).json({ message: 'Error saving financials', error: error.message });
  }
}

// DELETE /financials/:month — remove a month's entry
async function deleteFinancialEntry(req, res) {
  try {
    const { month } = req.params;
    const decodedMonth = decodeURIComponent(month);

    const financials = await financialsModel.findOne({ businessId: req.businessId });
    if (!financials) return res.status(404).json({ message: 'No data found.' });

    financials.entries = financials.entries.filter(e => e.month !== decodedMonth);
    financials.updatedAt = new Date();
    await financials.save();

    res.status(200).json({ message: 'Entry deleted.', entries: financials.entries });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting entry', error: error.message });
  }
}

module.exports = { getFinancials, upsertFinancialEntry, deleteFinancialEntry };