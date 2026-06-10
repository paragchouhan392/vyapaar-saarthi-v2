const News = require("../models/news");

const getBusinessNews = async (req, res) => {
    try {
        console.log("Fetching news...");
        const news = await News.find()
            .sort({ publishedAt: -1 })
            .limit(20);

        console.log("News found:", news.length);
        res.json({
            success: true,
            data: news,
            count: news.length
        });
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getBusinessNews
};