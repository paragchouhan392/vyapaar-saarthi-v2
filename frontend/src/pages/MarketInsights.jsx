import Sidebar from "../components/Sidebar";
import {
  AlertTriangle,
  BarChart3,
  Globe2,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const marketAlerts = [
  {
    title: "Iran conflict raises shipping and energy risk",
    tag: "Supply chain disruption",
    summary:
      "Fresh escalation in the Middle East has pushed up shipping insurance premiums and delayed vessel arrivals on routes linked to the Gulf, with oil and petrochemical costs also showing volatility. Import-dependent businesses should review lead times and alternate sourcing plans immediately.",
  },
  {
    title:
      "Freight costs remain elevated for electronics and industrial inputs",
    tag: "Logistics pressure",
    summary:
      "Freight rates for containerized cargo are staying firm as carriers re-route sailings and reduce capacity on vulnerable lanes. Manufacturers using imported components may see higher landed costs and longer inventory buffers in the next 4–8 weeks.",
  },
  {
    title: "Indian markets remain resilient, but volatility is rising",
    tag: "Market sentiment",
    summary:
      "Domestic equities are still holding key support levels, though global risk-off sentiment is pushing up volatility across cyclicals and oil-linked sectors. Businesses with export exposure should reassess pricing policies and hedging plans.",
  },
];

const watchlist = [
  "Crude oil and petrochemical input costs",
  "Container freight rates and port congestion",
  "Export demand in automotive, textiles, and machinery",
  "Currency volatility for USD-linked procurement",
  "Inventory coverage for critical raw materials",
];

function MarketInsights() {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        <div className="w-full lg:max-w-xs">
          <Sidebar />
        </div>

        <main className="flex-1 px-6 py-8 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
              <Globe2 size={16} />
              Market Insights
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl">
              Current market scenario
              <span className="mt-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                What businesses should watch right now
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              Here’s a quick view of how the latest geopolitical and macro
              developments are affecting supply chains, pricing, and business
              planning in India and global trade.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-lg">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-500/20 p-3 text-amber-200">
                  <AlertTriangle />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                    Live signal
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Iran war risk is pressuring supply chains
                  </h2>
                </div>
              </div>

              <p className="mt-4 text-base leading-7 text-slate-200">
                The latest escalation in the Middle East is affecting
                energy-sensitive logistics and causing routing uncertainty.
                Businesses dependent on imported inputs, fuel, and shipping
                should prioritize alternative suppliers, shorter reorder cycles,
                and stronger buffer stock on critical components.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-brand-100">Operational impact</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    Delays in shipping, higher freight charges, and uncertain
                    inventory availability for time-sensitive goods.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-brand-100">Pricing impact</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    Elevated fuel and transport costs can flow into product
                    pricing and reduce margins for import-heavy businesses.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-lg">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-500/20 p-3 text-emerald-200">
                  <TrendingUp />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                    Business response
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    What to do now
                  </h2>
                </div>
              </div>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                <li>
                  • Recheck critical suppliers and keep backup vendors ready.
                </li>
                <li>• Increase safety stock for high-impact raw materials.</li>
                <li>
                  • Review short-term pricing and customer delivery commitments.
                </li>
                <li>
                  • Track FX and fuel costs in your monthly margin review.
                </li>
              </ul>

              <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-4">
                <p className="text-sm font-semibold text-emerald-100">
                  Quick takeaway
                </p>
                <p className="mt-2 text-sm text-slate-100">
                  Businesses that plan for supply volatility and revisit cash
                  flow assumptions now will reduce disruption risk and preserve
                  margins.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-10 grid gap-6">
            {marketAlerts.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-lg"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                      {item.tag}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary">
                    Current update
                  </div>
                </div>
                <p className="mt-4 text-base leading-7 text-slate-200">
                  {item.summary}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-lg">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-brand-500/20 p-3 text-brand-100">
                <BarChart3 />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                  Watchlist
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Key indicators to monitor
                </h2>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {watchlist.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MarketInsights;
