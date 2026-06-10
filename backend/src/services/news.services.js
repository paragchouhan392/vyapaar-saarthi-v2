const axios = require("axios");

const fetchBusinessNews = async () => {
    try {
        console.log("Fetching from NewsAPI with key:", process.env.NEWS_API_KEY?.substring(0, 5) + "...");
        
        // Try using 'everything' endpoint with business keywords
        const response = await axios.get(
            `https://newsapi.org/v2/everything`,
            {
                params: {
                    q: "India business economy finance",
                    sortBy: "publishedAt",
                    language: "en",
                    pageSize: 20,
                    apiKey: process.env.NEWS_API_KEY
                }
            }
        );

        console.log("API Response status:", response.status);
        console.log("API Response data keys:", Object.keys(response.data));
        console.log("Total results:", response.data.totalResults);
        console.log("Articles count:", response.data.articles?.length || 0);
        
        if (response.data.status !== 'ok') {
            console.error("API Error:", response.data.message);
        }

        return response.data.articles || [];
    } catch (error) {
        console.error("NewsAPI Error:", error.message);
        if (error.response) {
            console.error("Response status:", error.response.status);
            console.error("Response data:", error.response.data);
        }
        return [];
    }
};

module.exports = {
    fetchBusinessNews
};