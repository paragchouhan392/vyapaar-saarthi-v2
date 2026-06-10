import Sidebar from "../components/Sidebar";

const stats = [
  { label: "Revenue growth", value: "₹12.4M", note: "+26% vs last quarter" },
  { label: "Net profit", value: "₹4.8M", note: "+18% margin" },
  { label: "Cash runway", value: "8 months", note: "Healthy liquidity" },
  { label: "Customer growth", value: "15%", note: "+3% month-over-month" },
];

const revenuePoints = [
  { label: "Q1", value: 18 },
  { label: "Q2", value: 28 },
  { label: "Q3", value: 35 },
  { label: "Q4", value: 47 },
];

const profitBars = [
  { label: "Gross profit", value: "₹6.2M", width: "78%" },
  { label: "Operating profit", value: "₹5.1M", width: "64%" },
  { label: "Net profit", value: "₹4.8M", width: "60%" },
  { label: "EBITDA", value: "₹5.4M", width: "68%" },
];

const otherHighlights = [
  {
    title: "Revenue mix",
    detail: "Services 62%, subscriptions 23%, advisory 15%.",
  },
  {
    title: "Margin improvement",
    detail: "Cost efficiencies reduced overhead by 12%.",
  },
  {
    title: "Cash flow signal",
    detail: "Positive operating cash flow for 3 consecutive months.",
  },
];

function buildRevenuePath(points) {
  const height = 120;
  const left = 30;
  const step = 120;
  const max = 55;

  return points
    .map((point, index) => {
      const x = left + index * step;
      const y = height - (point.value / max) * (height - 30);
      return `${index === 0 ? "M" : "L"}${x} ${y}`;
    })
    .join(" ");
}

function DashboardPage() {
  const revenuePath = buildRevenuePath(revenuePoints);

  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <div className="w-full lg:max-w-xs">
          <Sidebar />
        </div>

        <main className="flex-1 px-6 py-8 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                Performance dashboard
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                Revenue, profit and growth at a glance
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
                Track the latest revenue and profit trends, drill into cash flow
                signals, and review the key business metrics that matter.
              </p>
            </div>

            <div className="rounded-2xl border border-brand-400/20 bg-brand-500/10 px-4 py-3 text-sm text-brand-50">
              Updated this quarter
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <article key={item.label} className="fintech-card p-5">
                <p className="text-sm text-brand-100">{item.label}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  {item.value}
                </h3>
                <p className="mt-2 text-sm text-slate-300">{item.note}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
            <section className="fintech-card p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                    Revenue growth
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">
                    Quarterly revenue trend
                  </h2>
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100">
                  +28% year-over-year
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-4">
                <svg
                  viewBox="0 0 500 140"
                  className="h-64 w-full"
                  aria-label="Revenue growth chart"
                >
                  <defs>
                    <linearGradient
                      id="lineGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M30 20 L30 120 L470 120"
                    stroke="rgba(148,163,184,0.18)"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d={revenuePath}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {revenuePoints.map((point, index) => {
                    const x = 30 + index * 120;
                    const y = 120 - (point.value / 55) * 90;
                    return (
                      <g key={point.label}>
                        <circle
                          cx={x}
                          cy={y}
                          r="6"
                          fill="#38bdf8"
                          stroke="#ffffff"
                          strokeOpacity="0.9"
                          strokeWidth="2"
                        />
                        <text
                          x={x}
                          y={y - 12}
                          textAnchor="middle"
                          className="text-[11px] fill-slate-200"
                        >{`${point.value}M`}</text>
                      </g>
                    );
                  })}
                </svg>

                <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs text-slate-400 sm:grid-cols-4">
                  {revenuePoints.map((point) => (
                    <div key={point.label}>
                      <p className="font-semibold text-white">{point.label}</p>
                      <p>{point.value}M</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="fintech-card p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                  Profit growth
                </p>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  Profit & margin performance
                </h2>
              </div>

              <div className="mt-6 space-y-6">
                {profitBars.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </div>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-emerald-400"
                        style={{ width: item.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                  Forecast
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Net profit is expected to remain strong next quarter if
                  operating costs remain on target.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-2">
            <section className="fintech-card p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                    Business health
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">
                    Growth signals and revenue mix
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {otherHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-300">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="fintech-card p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                  Other indicators
                </p>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  Key metrics to watch
                </h2>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                    Gross margin
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">58%</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Improved with better pricing
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                    Churn rate
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">6%</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Low customer attrition
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                    Cash conversion
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">72%</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Strong working capital flow
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                    Target pace
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">84%</p>
                  <p className="mt-2 text-sm text-slate-300">
                    On track for quarterly goals
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
