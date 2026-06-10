const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const newsRoutes = require('./routes/news.routes');
const financialsRoutes = require('./routes/financials.routes');
const investmentRoutes = require('./routes/investment.routes');

const app = express();

app.use(cors({
  origin: [
        "http://localhost:5173",
        "https://vyapaar-saarthi.vercel.app"
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

console.log("Setting up routes...");

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.use('/auth', authRoutes);
console.log("Auth routes registered");

app.use('/news', newsRoutes);
console.log("News routes registered");

app.use('/investment', investmentRoutes);

app.use('/financials', financialsRoutes);
console.log("Financials routes registered");

require("./cron/news.cron");

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ success: false, message: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;