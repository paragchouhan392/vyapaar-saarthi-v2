import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Globe2, ExternalLink, Loader } from "lucide-react";
import defaultNewsImage from "/default-news.jpg";

function MarketInsights() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  console.log(import.meta.env.VITE_API_URL);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/news/business`);
        const data = await response.json();

        if (data.success && data.data) {
          // Map the API response to match our UI structure
          const mappedNews = data.data.map((article) => ({
            headline: article.title,
            description: article.description,
            image: article.imageUrl,
            source: article.source,
            publishedAt: article.publishedAt,
            url: article.url,
          }));
          setNewsItems(mappedNews);
          setError(null);
        } else {
          setError("Failed to load news");
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Unable to connect to news service");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="mx-auto flex w-full flex-col gap-4 sm:gap-6 lg:flex-row lg:max-w-7xl">
        <div className="w-full sm:max-w-xs lg:w-xs lg:flex-shrink-0">
          <Sidebar />
        </div>

        <main className="flex-1 w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="w-full">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 sm:px-4 py-2 text-xs sm:text-sm text-primary">
              <Globe2 size={16} />
              <span className="hidden sm:inline">Market Insights</span>
              <span className="sm:hidden">Market</span>
            </div>

            <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Latest Market News
              <span className="mt-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-2xl sm:text-3xl lg:text-4xl">
                Stay updated with trending business insights
              </span>
            </h1>
          </div>

          {loading && (
            <div className="mt-8 sm:mt-10 flex items-center justify-center gap-2 text-primary">
              <Loader size={20} className="animate-spin" />
              <span>Loading news...</span>
            </div>
          )}

          {error && (
            <div className="mt-8 sm:mt-10 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="mt-8 flex flex-col gap-6">
              {newsItems.length > 0 ? (
                newsItems.map((item, index) => (
                  <div
                    key={index}
                    className="
                      group
                      overflow-hidden
                      rounded-3xl
                      border border-white/10
                      bg-gradient-to-br
                      from-slate-950/80
                      to-slate-900/40
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      hover:border-primary/40
                      hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]
                    "
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* CONTENT */}
                      <div className="flex flex-1 flex-col p-6">
                        {/* Source */}
                        <div className="mb-4">
                          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                            {item.source}
                          </span>
                        </div>

                        {/* Headline */}
                        <h2 className="text-2xl font-bold leading-tight text-white">
                          {item.headline}
                        </h2>

                        {/* Description */}
                        <p className="mt-4 text-slate-400 leading-7">
                          {item.description}
                        </p>

                        {/* Bottom */}
                        <div className="mt-auto flex items-center justify-between pt-6">
                          <div className="text-sm text-slate-500">
                            {item.publishedAt
                              ? new Date(item.publishedAt).toLocaleString(
                                  "en-IN",
                                  {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  },
                                )
                              : "Recently Published"}
                          </div>

                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              inline-flex
                              items-center
                              gap-2
                              rounded-xl
                              bg-primary
                              px-5
                              py-3
                              font-medium
                              text-white
                              transition-all
                              hover:scale-105
                            "
                          >
                            Read Article
                            <ExternalLink size={18} />
                          </a>
                        </div>
                      </div>

                      {/* IMAGE */}
                      <div className="w-full lg:w-[350px]">
                        {item.image ? (
                          <img
                            src={item.image || defaultNewsImage}
                            alt={item.headline}
                            className="
                              h-full
                              min-h-[250px]
                              w-full
                              object-cover
                              transition-transform
                              duration-500
                              group-hover:scale-105
                            "
                            onError={(e) => {
                              e.target.src = defaultNewsImage;
                            }}
                          />
                        ) : (
                          <div className="flex h-full min-h-[250px] items-center justify-center bg-slate-900 text-slate-500">
                            No Image
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-400">
                  No news articles available
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default MarketInsights;
