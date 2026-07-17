const cron = require("node-cron");

const News = require("../models/news");
const { fetchBusinessNews } = require("../services/news.services");

cron.schedule("*/30 * * * *", async () => {
    try {
        console.log("Starting news fetch...");
        
        const articles = await fetchBusinessNews();
        console.log("Articles fetched:", articles.length);

        /* await News.deleteMany({});
        console.log("Old news deleted"); */

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

        console.log("Business News Updated Successfully");
    } catch (error) {
        console.error("Error updating news:", error.message);
    }
});

console.log("News cron job initialized");