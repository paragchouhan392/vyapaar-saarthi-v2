import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  ArrowRight,
  BriefcaseBusiness,
  CircleDollarSign,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const plan = [
  {
    name: "Large-cap stocks",
    type: "Stock",
    percent: 35,
    risk: "Moderate",
    note: "Measured upside with broad market exposure.",
  },
  {
    name: "Indian bond fund",
    type: "Bond",
    percent: 25,
    risk: "Low",
    note: "Stable income and lower volatility for capital preservation.",
  },
  {
    name: "Balanced mutual fund",
    type: "Mutual Fund",
    percent: 20,
    risk: "Moderate",
    note: "Diversified equity and debt mix for steady growth.",
  },
  {
    name: "Gold ETF",
    type: "ETF",
    percent: 10,
    risk: "Low",
    note: "Useful hedge against inflation and market shocks.",
  },
  {
    name: "Money market / cash buffer",
    type: "Cash Buffer",
    percent: 10,
    risk: "Very Low",
    note: "Liquidity reserve for emergencies and short-term needs.",
  },
];

const riskBands = [
  { label: "Conservative", score: 1, color: "bg-emerald-400" },
  { label: "Balanced", score: 2, color: "bg-sky-400" },
  { label: "Growth", score: 3, color: "bg-amber-400" },
];

function InvestmentIdeas() {
  const [amount, setAmount] = useState(50000);
  const [selectedRisk, setSelectedRisk] = useState(2);
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const riskMeterWidth = useMemo(
    () => `${(selectedRisk / 3) * 100}%`,
    [selectedRisk],
  );

  useEffect(() => {
    if (!isAnalyzing) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [isAnalyzing]);

  const allocations = useMemo(() => {
    return plan.map((item) => ({
      ...item,
      amount: Number((amount * (item.percent / 100)).toFixed(2)),
    }));
  }, [amount]);

  const handleSuggest = () => {
    setShowResults(false);
    setIsAnalyzing(true);
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
              Build a fixed allocation plan
              <span className="mt-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Based on your investment budget
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              Enter your available amount, choose a comfort level, and let the
              system generate a fixed allocation plan across stocks, bonds,
              mutual funds, ETFs, and a cash buffer.
            </p>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-lg">
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
                  Suggested for this plan
                </p>
                <p className="mt-2 text-sm text-slate-100">
                  The suggested amounts will be calculated automatically after
                  you press “Suggest”.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSuggest}
                disabled={!isValidAmount}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-secondary disabled:cursor-not-allowed disabled:bg-slate-700"
              >
                <Sparkles size={18} />
                Suggest
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
                      ? "Analyzing your profile..."
                      : showResults
                        ? "Fixed allocation result"
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
                      Fetching live market data, checking risk preferences, and
                      preparing a balanced mix for your investment budget.
                    </p>
                  </div>
                ) : showResults ? (
                  <div className="space-y-4">
                    {allocations.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {item.name}
                            </p>
                            <p className="text-sm text-slate-300">
                              {item.type} • {item.percent}% allocation
                            </p>
                          </div>
                          <p className="text-lg font-semibold text-brand-100">
                            ₹
                            {item.amount.toLocaleString("en-IN", {
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                        <p className="mt-2 text-sm text-slate-200">
                          {item.note}
                        </p>
                      </div>
                    ))}
                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-4">
                      <p className="text-sm font-semibold text-emerald-100">
                        Risk profile used
                      </p>
                      <p className="mt-2 text-sm text-slate-100">
                        {riskBands[selectedRisk - 1]?.label || "Balanced"} risk
                        allocation with a fixed mix of equities, debt, ETFs, and
                        liquidity.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-sm leading-6 text-slate-200">
                    <p>
                      Your personalized suggestion will appear here after the
                      analysis completes.
                    </p>
                    <p>
                      This demo uses a fixed plan so every user gets the same
                      percentage-based allocation logic.
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
