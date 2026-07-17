const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const getInvestmentSuggestions = async (businessData) => {

  const prompt = `
You are a business consultant and investment advisor.

Business Details:
${JSON.stringify(businessData, null, 2)}

Analyze the business and provide:

1. Areas where money should be invested to grow the business.
2. Areas where excess capital should be invested in financial markets.
3. Risk assessment.
4. Recommended allocation percentages.

Return ONLY valid JSON:

{
  "growthSuggestions": [],
  "marketInvestments": [],
  "riskLevel": "",
  "summary": ""
}
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};

module.exports = {
  getInvestmentSuggestions,
};