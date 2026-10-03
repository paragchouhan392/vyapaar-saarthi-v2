import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  AlertCircle,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  LineChart,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { API_BASE, authHeaders } from "../utils/api";

const ENDPOINT = `${API_BASE}/investment/suggestions`;

const riskBands = [
  { label: "Conservative", score: 1, color: "bg-emerald-400" },
  { label: "Balanced", score: 2, color: "bg-sky-400" },
  { label: "Growth", score: 3, color: "bg-amber-400" },
];

const formatINR = (value) =>
  `₹${Number(value).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

function InvestmentIdeas() {
  const [amount, setAmount] = useState(50000);
  const [selectedRisk, setSelectedRisk] = useState(2);
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const riskMeterWidth = useMemo(
    () => `${(selectedRisk / 3) * 100}%`,
    [selectedRisk],
  );

  const growthItems = useMemo(() => {
    if (!result) return [];
    return (result.growthSuggestions || []).map((item) => ({
      ...item,
      allocated: (Number(amount) * (Number(item.percent) || 0)) / 100,
    }));
  }, [result, amount]);

  const marketItems = useMemo(() => {
    if (!result) return [];
    return (result.marketInvestments || []).map((item) => ({
      ...item,
      allocated: (Number(amount) * (Number(item.percent) || 0)) / 100,
    }));
  }, [result, amount]);

  const businessPercent = growthItems.reduce(
    (sum, i) => sum + (Number(i.percent) || 0),
    0,
  );
  const marketPercent = marketItems.reduce(
    (sum, i) => sum + (Number(i.percent) || 0),
    0,
  );

  const handleSuggest = async () => {
    setError("");
    setResult(null);
    setIsAnalyzing(true);

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          amount: Number(amount),
          risk: selectedRisk,
        }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || "Could not generate suggestions");
      }

      setResult(json.data);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isValidAmount = Number(amount) > 0;

  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <div className="w-full lg:max-w-xs">
          <Sidebar />
        </div>

        <main className="flex-1 px-6 py-8 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
              <BriefcaseBusiness size={16} />
              Investment Ideas
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl">
              AI-powered investment plan
              <span className="mt-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                For your business and the market
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              Enter your available amount and comfort level. Our AI studies your
              business profile and financials, then suggests how much to
              reinvest in your own business and how much to put in the market.
            </p>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <section className="h-fit self-start rounded-3xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-lg xl:sticky xl:top-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-brand-500/20 p-3 text-brand-100">
                  <CircleDollarSign />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                    Budget input
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    How much do you want to invest?
                  </h2>
                </div>
              </div>

              <label className="mt-6 block text-sm font-medium text-slate-100">
                Investment amount
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-lg text-slate-200">₹</span>
                <input
                  type="number"
                  min="1000"
                  step="100"
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value))}
                  className="w-full bg-transparent text-lg text-white outline-none"
                />
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-100">
                    Risk meter
                  </p>
                  <p className="text-sm text-brand-100">
                    {riskBands[selectedRisk - 1]?.label || "Balanced"}
                  </p>
                </div>
                <div className="mt-3 h-3 rounded-full bg-white/10">
                  <div
                    className={`h-3 rounded-full ${riskBands[selectedRisk - 1]?.color || "bg-sky-400"}`}
                    style={{ width: riskMeterWidth }}
                  />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {riskBands.map((band) => (
                    <button
                      key={band.label}
                      type="button"
                      onClick={() => setSelectedRisk(band.score)}
                      className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                        selectedRisk === band.score
                          ? "border-primary bg-primary/20 text-white"
                          : "border-white/10 bg-white/5 text-slate-200"
                      }`}
                    >
                      {band.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-4">
                <p className="text-sm font-semibold text-emerald-100">
                  What the AI looks at
                </p>
                <p className="mt-2 text-sm text-slate-100">
                  Your business details, recent financial records, budget and
                  risk preference. It then splits your money between growing
                  your own business and market investments.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSuggest}
                disabled={!isValidAmount || isAnalyzing}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-secondary disabled:cursor-not-allowed disabled:bg-slate-700"
              >
                <Sparkles size={18} />
                {isAnalyzing ? "Analyzing..." : "Suggest"}
                <ArrowRight size={18} />
              </button>
            </section>

            <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-lg">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-500/20 p-3 text-amber-200">
                  <TrendingUp />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                    Analysis panel
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    {isAnalyzing
                      ? "Analyzing your business..."
                      : result
                        ? "Your AI investment plan"
                        : "Ready when you are"}
                  </h2>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                {isAnalyzing ? (
                  <div className="space-y-3">
                    <div className="h-2 w-full animate-pulse rounded-full bg-white/10" />
                    <div className="h-2 w-4/5 animate-pulse rounded-full bg-white/10" />
                    <div className="h-2 w-3/4 animate-pulse rounded-full bg-white/10" />
                    <p className="pt-2 text-sm leading-6 text-slate-200">
                      Reviewing your business profile and financials, and
                      preparing a plan that fits your risk comfort.
                    </p>
                  </div>
                ) : error ? (
                  <div className="flex items-start gap-3 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-4">
                    <AlertCircle
                      className="mt-0.5 shrink-0 text-red-300"
                      size={18}
                    />
                    <div>
                      <p className="text-sm font-semibold text-red-100">
                        Could not generate suggestions
                      </p>
                      <p className="mt-1 text-sm text-slate-200">{error}</p>
                    </div>
                  </div>
                ) : result ? (
                  <div className="space-y-6">
                    {/* Overall split */}
                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-emerald-100">
                          Overall split ({result.riskLevel || "Balanced"})
                        </p>
                        <p className="text-sm text-slate-100">
                          Business {businessPercent.toFixed(0)}% • Market{" "}
                          {marketPercent.toFixed(0)}%
                        </p>
                      </div>
                      <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="bg-amber-400"
                          style={{ width: `${businessPercent}%` }}
                        />
                        <div
                          className="bg-sky-400"
                          style={{ width: `${marketPercent}%` }}
                        />
                      </div>
                      {result.summary && (
                        <p className="mt-3 text-sm leading-6 text-slate-100">
                          {result.summary}
                        </p>
                      )}
                    </div>

                    {/* Invest in own business */}
                    <div>
                      <div className="mb-3 flex items-center gap-2 text-amber-200">
                        <Building2 size={18} />
                        <h3 className="text-lg font-semibold text-white">
                          Invest in your own business
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {growthItems.map((item, index) => (
                          <div
                            key={`${item.title}-${index}`}
                            className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold text-white">
                                  {item.title}
                                </p>
                                <p className="text-sm text-slate-300">
                                  {item.area} • {item.percent}% • Risk:{" "}
                                  {item.risk}
                                </p>
                              </div>
                              <p className="text-lg font-semibold text-amber-200">
                                {formatINR(item.allocated)}
                              </p>
                            </div>
                            <p className="mt-2 text-sm text-slate-200">
                              {item.description}
                            </p>
                            <p className="mt-2 text-xs text-slate-400">
                              Expected impact: {item.expectedImpact} •
                              Timeframe: {item.timeframe}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Invest in market */}
                    <div>
                      <div className="mb-3 flex items-center gap-2 text-sky-200">
                        <LineChart size={18} />
                        <h3 className="text-lg font-semibold text-white">
                          Invest in the market
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {marketItems.map((item, index) => (
                          <div
                            key={`${item.name}-${index}`}
                            className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold text-white">
                                  {item.name}
                                </p>
                                <p className="text-sm text-slate-300">
                                  {item.type} • {item.percent}% • Risk:{" "}
                                  {item.risk}
                                </p>
                              </div>
                              <p className="text-lg font-semibold text-brand-100">
                                {formatINR(item.allocated)}
                              </p>
                            </div>
                            <p className="mt-2 text-sm text-slate-200">
                              {item.note}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs leading-5 text-slate-400">
                      These suggestions are AI-generated for guidance only and
                      are not professional financial advice. Please verify
                      before investing.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 text-sm leading-6 text-slate-200">
                    <p>
                      Your personalized plan will appear here after the analysis
                      completes.
                    </p>
                    <p>
                      The AI will suggest how much to reinvest in your own
                      business and how much to place in the market.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default InvestmentIdeas;
