const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const newsRoutes = require('./routes/news.routes');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

console.log("Setting up routes...");

// Test endpoint
app.get('/', (req, res) => {
  console.log("Root endpoint hit");
  res.json({ message: 'Server is running' });
});

app.use('/auth', authRoutes);
console.log("Auth routes registered");

app.use('/news', newsRoutes);
console.log("News routes registered");

// Direct test route for news
app.get('/news/test', (req, res) => {
  console.log("News test route hit");
  res.json({ message: 'News test endpoint working' });
});

require("./cron/news.cron");

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ 
    success: false,
    message: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;