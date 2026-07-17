const express = require("express");
const router = express.Router();

const {
    getBusinessNews
} = require("../controllers/news.controller");

const { fetchBusinessNews } = require("../services/news.services");
const News = require("../models/news");

router.get("/business", getBusinessNews);

// Manual trigger endpoint for testing
router.get("/sync", async (req, res) => {
    try {
        console.log("Manual news sync triggered");

        const articles = await fetchBusinessNews();
        console.log("Articles fetched:", articles.length);

        await News.deleteMany({});

        await News.insertMany(
            articles.map(article => ({
                title: article.title,
                description: article.description,
                imageUrl: article.urlToImage,
                source: article.source.name,
                publishedAt: article.publishedAt,
                url: article.url,
                category: "business"
            }))
        );

        res.json({
            success: true,
            message: "News synced successfully",
            count: articles.length
        });
    } catch (error) {
        console.error("Error syncing news:", error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;