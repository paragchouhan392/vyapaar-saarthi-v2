import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

function formatINR(value) {
  if (!value && value !== 0) return "—";
  if (value >= 1_00_00_000) return `₹${(value / 1_00_00_000).toFixed(2)}Cr`;
  if (value >= 1_00_000) return `₹${(value / 1_00_000).toFixed(2)}L`;
  if (value >= 1_000) return `₹${(value / 1_000).toFixed(1)}K`;
  return `₹${value}`;
}

function pct(a, b) {
  if (!b) return null;
  return Math.round(((a - b) / b) * 100);
}

// ── SVG Line Chart ─────────────────────────────────────────────────────────────
function LineChart({ data, valueKey, color, label }) {
  if (!data || data.length < 2)
    return (
      <div className="flex h-40 items-center justify-center text-sm text-slate-400">
        Add at least 2 months of data to see the trend.
      </div>
    );

  const W = 500,
    H = 130;
  const PAD = { top: 20, right: 20, bottom: 30, left: 48 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const values = data.map((d) => d[valueKey]);
  const maxV = Math.max(...values) || 1;
  const minV = Math.min(...values);
  const range = maxV - minV || maxV;

  const xStep = chartW / (data.length - 1);

  const points = data.map((d, i) => ({
    x: PAD.left + i * xStep,
    y: PAD.top + chartH - ((d[valueKey] - minV) / range) * chartH,
    label: d.month,
    value: d[valueKey],
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`)
    .join(" ");

  // Area fill path
  const areaD =
    pathD +
    ` L${points[points.length - 1].x} ${PAD.top + chartH} L${PAD.left} ${PAD.top + chartH} Z`;

  // Y-axis labels (3 ticks)
  const yTicks = [minV, (minV + maxV) / 2, maxV].map((v, i) => ({
    y: PAD.top + chartH - (i / 2) * chartH,
    label: formatINR(v),
  }));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-44 w-full" aria-label={label}>
      <defs>
        <linearGradient id={`grad-${valueKey}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {yTicks.map((t, i) => (
        <line
          key={i}
          x1={PAD.left}
          x2={W - PAD.right}
          y1={t.y}
          y2={t.y}
          stroke="rgba(148,163,184,0.12)"
          strokeWidth="1"
        />
      ))}

      {/* Y labels */}
      {yTicks.map((t, i) => (
        <text
          key={i}
          x={PAD.left - 6}
          y={t.y + 4}
          textAnchor="end"
          fontSize="9"
          fill="rgba(148,163,184,0.7)"
        >
          {t.label}
        </text>
      ))}

      {/* Area fill */}
      <path d={areaD} fill={`url(#grad-${valueKey})`} />

      {/* Line */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Points + X labels */}
      {points.map((p, i) => (
        <g key={i}>
          <circle
            cx={p.x}
            cy={p.y}
            r="4"
            fill={color}
            stroke="#ffffff"
            strokeOpacity="0.9"
            strokeWidth="1.5"
          />
          <text
            x={p.x}
            y={H - 4}
            textAnchor="middle"
            fontSize="9"
            fill="rgba(148,163,184,0.7)"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ── Bar Chart ──────────────────────────────────────────────────────────────────
function BarChart({ data }) {
  if (!data || data.length === 0)
    return (
      <div className="flex h-40 items-center justify-center text-sm text-slate-400">
        No data yet.
      </div>
    );

  const W = 500,
    H = 130;
  const PAD = { top: 16, right: 16, bottom: 30, left: 16 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const maxRev = Math.max(...data.map((d) => d.revenue)) || 1;
  const barW = Math.min(36, chartW / data.length - 8);
  const gap = chartW / data.length;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-44 w-full"
      aria-label="Revenue vs Expenses"
    >
      {data.map((d, i) => {
        const cx = PAD.left + i * gap + gap / 2;
        const revH = (d.revenue / maxRev) * chartH;
        const expH = (d.expenses / maxRev) * chartH;
        return (
          <g key={i}>
            {/* Revenue bar */}
            <rect
              x={cx - barW / 2}
              y={PAD.top + chartH - revH}
              width={barW * 0.48}
              height={revH}
              rx="3"
              fill="#38bdf8"
              fillOpacity="0.85"
            />
            {/* Expenses bar */}
            <rect
              x={cx - barW / 2 + barW * 0.52}
              y={PAD.top + chartH - expH}
              width={barW * 0.48}
              height={expH}
              rx="3"
              fill="#f87171"
              fillOpacity="0.75"
            />
            <text
              x={cx}
              y={H - 4}
              textAnchor="middle"
              fontSize="9"
              fill="rgba(148,163,184,0.7)"
            >
              {d.month}
            </text>
          </g>
        );
      })}
      {/* Legend */}
      <circle cx={W - 80} cy={PAD.top + 6} r="4" fill="#38bdf8" />
      <text
        x={W - 73}
        y={PAD.top + 10}
        fontSize="9"
        fill="rgba(148,163,184,0.8)"
      >
        Revenue
      </text>
      <circle cx={W - 80} cy={PAD.top + 18} r="4" fill="#f87171" />
      <text
        x={W - 73}
        y={PAD.top + 22}
        fontSize="9"
        fill="rgba(148,163,184,0.8)"
      >
        Expenses
      </text>
    </svg>
  );
}

// ── Profit Margin Mini-bars ────────────────────────────────────────────────────
function MarginBars({ entries }) {
  const last5 = entries.slice(-5);
  return (
    <div className="mt-4 space-y-3">
      {last5.map((e) => {
        const margin =
          e.revenue > 0 ? ((e.profit / e.revenue) * 100).toFixed(1) : 0;
        const isPositive = e.profit >= 0;
        return (
          <div key={e.month}>
            <div className="flex justify-between text-xs text-slate-300">
              <span>{e.month}</span>
              <span
                className={isPositive ? "text-emerald-300" : "text-red-300"}
              >
                {margin}% margin
              </span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full ${isPositive ? "bg-emerald-400" : "bg-red-400"}`}
                style={{ width: `${Math.min(Math.abs(margin), 100)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notAuthenticated, setNotAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/financials`, {
          credentials: "include",
        });
        if (res.status === 401) {
          setNotAuthenticated(true);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setEntries(data.entries || []);
      } catch {
        // server offline — show empty state
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ─── Derived stats ──────────────────────────────────────────────────────────
  const last = entries[entries.length - 1];
  const prev = entries[entries.length - 2];

  const totalRevenue = entries.reduce((s, e) => s + e.revenue, 0);
  const totalProfit = entries.reduce((s, e) => s + e.profit, 0);
  const avgMargin = entries.length
    ? Math.round(
        entries.reduce(
          (s, e) => s + (e.revenue > 0 ? (e.profit / e.revenue) * 100 : 0),
          0,
        ) / entries.length,
      )
    : null;
  const latestCustomers = last?.customers ?? null;

  const revChange = pct(last?.revenue, prev?.revenue);
  const profitChange = pct(last?.profit, prev?.profit);

  // ── Show at most last 8 months in charts for readability
  const chartData = entries.slice(-8).map((e) => ({
    ...e,
    month: e.month.split(" ")[0], // short label e.g. "Jan"
  }));

  const stats = [
    {
      label: "Total revenue",
      value: formatINR(totalRevenue),
      note: entries.length
        ? `Across ${entries.length} month${entries.length > 1 ? "s" : ""}`
        : "No data yet",
    },
    {
      label: "Total profit",
      value: formatINR(totalProfit),
      note: totalProfit >= 0 ? "In the black ✓" : "In the red",
      accent: totalProfit >= 0 ? "text-emerald-300" : "text-red-300",
    },
    {
      label: "Latest month revenue",
      value: last ? formatINR(last.revenue) : "—",
      note:
        revChange != null
          ? `${revChange >= 0 ? "+" : ""}${revChange}% vs previous`
          : "Add more months",
    },
    {
      label: "Avg profit margin",
      value: avgMargin != null ? `${avgMargin}%` : "—",
      note: latestCustomers
        ? `${latestCustomers} active customers`
        : "Customers not tracked",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent text-white flex items-center justify-center">
        <p className="text-slate-400 text-sm animate-pulse">
          Loading dashboard…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <div className="w-full lg:max-w-xs">
          <Sidebar />
        </div>

        <main className="flex-1 px-6 py-8 sm:px-8 lg:px-10">
          {/* Header */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                Performance dashboard
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                Revenue, profit & growth at a glance
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
                Your live financial overview, built from the data you've
                entered.
              </p>
            </div>
            <button
              onClick={() => navigate("/update-financials")}
              className="shrink-0 rounded-2xl border border-brand-400/20 bg-brand-500/10 px-4 py-3 text-sm text-brand-50 hover:bg-brand-500/20 transition"
            >
              + Update financials
            </button>
          </div>

          {/* Auth nudge */}
          {notAuthenticated && (
            <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-100">
              You're not logged in. Please{" "}
              <a href="/" className="underline hover:text-white">
                log in
              </a>{" "}
              to see your dashboard.
            </div>
          )}

          {/* Empty state nudge */}
          {!notAuthenticated && entries.length === 0 && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center">
              <p className="text-base font-semibold text-white">
                No financial data yet
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Add your first month's data to unlock charts and insights.
              </p>
              <button
                onClick={() => navigate("/update-financials")}
                className="mt-5 rounded-2xl bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-400 transition"
              >
                Add financial data →
              </button>
            </div>
          )}

          {/* Stats grid */}
          {entries.length > 0 && (
            <>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                  <article key={item.label} className="fintech-card p-5">
                    <p className="text-sm text-brand-100">{item.label}</p>
                    <h3
                      className={`mt-3 text-2xl font-semibold ${item.accent || "text-white"}`}
                    >
                      {item.value}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300">{item.note}</p>
                  </article>
                ))}
              </div>

              {/* Revenue Trend + Bar Chart */}
              <div className="mt-8 grid gap-4 xl:grid-cols-2">
                <section className="fintech-card p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                        Revenue trend
                      </p>
                      <h2 className="mt-1 text-xl font-semibold text-white">
                        Monthly revenue
                      </h2>
                    </div>
                    {revChange != null && (
                      <div
                        className={`rounded-2xl border px-3 py-2 text-sm ${
                          revChange >= 0
                            ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
                            : "border-red-400/20 bg-red-500/10 text-red-100"
                        }`}
                      >
                        {revChange >= 0 ? "+" : ""}
                        {revChange}% last month
                      </div>
                    )}
                  </div>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                    <LineChart
                      data={chartData}
                      valueKey="revenue"
                      color="#38bdf8"
                      label="Revenue trend"
                    />
                  </div>
                </section>

                <section className="fintech-card p-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                      Profit trend
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-white">
                      Monthly profit
                    </h2>
                  </div>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                    <LineChart
                      data={chartData}
                      valueKey="profit"
                      color="#34d399"
                      label="Profit trend"
                    />
                  </div>
                </section>
              </div>

              {/* Revenue vs Expenses + Margin */}
              <div className="mt-8 grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
                <section className="fintech-card p-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                      Comparison
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-white">
                      Revenue vs Expenses
                    </h2>
                  </div>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                    <BarChart data={chartData} />
                  </div>
                </section>

                <section className="fintech-card p-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                      Margins
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-white">
                      Profit margin by month
                    </h2>
                  </div>
                  <MarginBars entries={entries.slice(-5)} />
                </section>
              </div>

              {/* Customer growth (if data exists) */}
              {entries.some((e) => e.customers > 0) && (
                <div className="mt-8">
                  <section className="fintech-card p-6">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                        Customer growth
                      </p>
                      <h2 className="mt-1 text-xl font-semibold text-white">
                        Active customers trend
                      </h2>
                    </div>
                    <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                      <LineChart
                        data={chartData.filter((d) => d.customers > 0)}
                        valueKey="customers"
                        color="#a78bfa"
                        label="Customer growth"
                      />
                    </div>
                  </section>
                </div>
              )}

              {/* Latest month breakdown */}
              {last && (
                <div className="mt-8">
                  <section className="fintech-card p-6">
                    <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                      Latest month
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-white">
                      {last.month} breakdown
                    </h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      {[
                        {
                          label: "Revenue",
                          value: formatINR(last.revenue),
                          color: "text-sky-300",
                        },
                        {
                          label: "Expenses",
                          value: formatINR(last.expenses),
                          color: "text-red-300",
                        },
                        {
                          label: "Net Profit",
                          value: formatINR(last.profit),
                          color:
                            last.profit >= 0
                              ? "text-emerald-300"
                              : "text-red-300",
                        },
                        {
                          label: "Profit Margin",
                          value:
                            last.revenue > 0
                              ? `${((last.profit / last.revenue) * 100).toFixed(1)}%`
                              : "—",
                          color:
                            last.profit >= 0
                              ? "text-emerald-300"
                              : "text-red-300",
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"
                        >
                          <p className="text-xs uppercase tracking-wider text-slate-400">
                            {item.label}
                          </p>
                          <p
                            className={`mt-2 text-2xl font-semibold ${item.color}`}
                          >
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
