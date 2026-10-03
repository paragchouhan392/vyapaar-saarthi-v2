const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.6,
  },
});

// Make sure all percentages (business + market) add up to 100
const normalizeAllocations = (data) => {
  const growth = Array.isArray(data.growthSuggestions)
    ? data.growthSuggestions
    : [];
  const market = Array.isArray(data.marketInvestments)
    ? data.marketInvestments
    : [];

  const total = [...growth, ...market].reduce(
    (sum, item) => sum + (Number(item.percent) || 0),
    0,
  );

  if (total > 0) {
    const scale = 100 / total;
    [...growth, ...market].forEach((item) => {
      item.percent = Number(((Number(item.percent) || 0) * scale).toFixed(1));
    });
  }

  return {
    growthSuggestions: growth,
    marketInvestments: market,
    riskLevel: data.riskLevel || "Balanced",
    summary: data.summary || "",
  };
};

const getInvestmentSuggestions = async ({
  business,
  financials,
  amount,
  riskLevel,
}) => {
  const prompt = `
You are an experienced business consultant and investment advisor for small businesses in India.

BUSINESS DETAILS:
${JSON.stringify(business, null, 2)}

RECENT FINANCIAL RECORDS (may be empty):
${JSON.stringify(financials, null, 2)}

The owner wants to invest: ₹${amount}
Risk preference: ${riskLevel}

TASK:
Split this ₹${amount} between two buckets:
A) Reinvesting in the owner's OWN business (equipment, inventory, marketing, hiring, technology/digital tools, expanding to a new product/location, improving operations, etc.). Choose only areas that make sense for this specific business and its financials.
B) Financial-market instruments (large-cap stocks, bond funds, mutual funds, ETFs, gold, cash buffer, etc.) matching the risk preference.

Decide the split yourself based on the business's financial health, growth potential and the risk preference. If the business has weak cash flow, keep a larger liquidity buffer.

Rules:
- Every item has a "percent". All percents across BOTH lists must add up to 100.
- Give 2-4 items in growthSuggestions and 3-5 items in marketInvestments.
- Be specific to this business, not generic.
- "riskLevel" must be one of: "Conservative", "Balanced", "Growth".
- "summary" is 2-3 sentences explaining the overall split.

Return ONLY valid JSON in exactly this shape:
{
  "growthSuggestions": [
    {
      "title": "",
      "area": "",
      "description": "",
      "percent": 0,
      "expectedImpact": "",
      "risk": "Low | Moderate | High",
      "timeframe": ""
    }
  ],
  "marketInvestments": [
    {
      "name": "",
      "type": "Stock | Bond | Mutual Fund | ETF | Gold | Cash Buffer",
      "percent": 0,
      "risk": "Very Low | Low | Moderate | High",
      "note": ""
    }
  ],
  "riskLevel": "",
  "summary": ""
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response
    .text()
    .replace(/```json|```/g, "")
    .trim();

  return normalizeAllocations(JSON.parse(text));
};

module.exports = {
  getInvestmentSuggestions,
};