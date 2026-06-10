import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const currentYear = new Date().getFullYear();
const YEARS = [currentYear - 1, currentYear, currentYear + 1];

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

function formatINR(value) {
  if (value >= 1_00_00_000) return `₹${(value / 1_00_00_000).toFixed(2)}Cr`;
  if (value >= 1_00_000) return `₹${(value / 1_00_000).toFixed(2)}L`;
  if (value >= 1_000) return `₹${(value / 1_000).toFixed(1)}K`;
  return `₹${value}`;
}

export default function UpdateFinancials() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({
    monthLabel: "Jan",
    year: String(currentYear),
    revenue: "",
    expenses: "",
    customers: "",
  });

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function fetchEntries() {
    try {
      const res = await fetch(`${API_BASE}/financials`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setEntries(data.entries || []);
      else showToast(data.message || "Failed to load data", "error");
    } catch {
      showToast("Could not connect to server", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEntries();
  }, []);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const revenue = Number(form.revenue);
    const expenses = Number(form.expenses);
    const customers = Number(form.customers) || 0;

    if (!revenue || !expenses) {
      showToast("Revenue and expenses are required", "error");
      return;
    }
    if (revenue < 0 || expenses < 0) {
      showToast("Values cannot be negative", "error");
      return;
    }

    setSaving(true);
    const month = `${form.monthLabel} ${form.year}`;

    try {
      const res = await fetch(`${API_BASE}/financials`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month, revenue, expenses, customers }),
      });
      const data = await res.json();
      if (res.ok) {
        setEntries(data.entries || []);
        showToast("Financial data saved successfully!");
        setForm((prev) => ({
          ...prev,
          revenue: "",
          expenses: "",
          customers: "",
        }));
      } else {
        showToast(data.message || "Failed to save", "error");
      }
    } catch {
      showToast("Could not connect to server", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(month) {
    setDeleteTarget(month);
    try {
      const res = await fetch(
        `${API_BASE}/financials/${encodeURIComponent(month)}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const data = await res.json();
      if (res.ok) {
        setEntries(data.entries || []);
        showToast("Entry deleted");
      } else {
        showToast(data.message || "Delete failed", "error");
      }
    } catch {
      showToast("Could not connect to server", "error");
    } finally {
      setDeleteTarget(null);
    }
  }

  const selectedMonth = `${form.monthLabel} ${form.year}`;
  const existingEntry = entries.find((e) => e.month === selectedMonth);

  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 rounded-2xl px-5 py-3 text-sm font-medium shadow-xl transition-all ${
            toast.type === "error"
              ? "border border-red-400/30 bg-red-500/20 text-red-100"
              : "border border-emerald-400/30 bg-emerald-500/20 text-emerald-100"
          }`}
        >
          {toast.msg}
        </div>
      )}

      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <div className="w-full lg:max-w-xs">
          <Sidebar />
        </div>

        <main className="flex-1 px-6 py-8 sm:px-8 lg:px-10">
          {/* Header */}
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
              Financial data
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
              Update your financials
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
              Add monthly revenue, expenses, and customer data. This powers your
              dashboard charts and insights.
            </p>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            {/* Form */}
            <section className="fintech-card p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                Add / Update entry
              </p>
              <h2 className="mt-2 text-xl font-semibold text-white">
                Monthly financial data
              </h2>
              {existingEntry && (
                <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                  ⚠ An entry for <strong>{selectedMonth}</strong> already
                  exists. Submitting will overwrite it.
                </div>
              )}
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* Month + Year */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-slate-400">
                      Month
                    </label>
                    <select
                      name="monthLabel"
                      value={form.monthLabel}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white focus:border-brand-400 focus:outline-none"
                    >
                      {MONTHS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-slate-400">
                      Year
                    </label>
                    <select
                      name="year"
                      value={form.year}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white focus:border-brand-400 focus:outline-none"
                    >
                      {YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Revenue */}
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wider text-slate-400">
                    Revenue (₹)
                  </label>
                  <input
                    type="number"
                    name="revenue"
                    value={form.revenue}
                    onChange={handleChange}
                    placeholder="e.g. 500000"
                    min="0"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-400 focus:outline-none"
                    required
                  />
                  {form.revenue && (
                    <p className="mt-1 text-xs text-slate-400">
                      = {formatINR(Number(form.revenue))}
                    </p>
                  )}
                </div>

                {/* Expenses */}
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wider text-slate-400">
                    Expenses (₹)
                  </label>
                  <input
                    type="number"
                    name="expenses"
                    value={form.expenses}
                    onChange={handleChange}
                    placeholder="e.g. 320000"
                    min="0"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-400 focus:outline-none"
                    required
                  />
                  {form.expenses && (
                    <p className="mt-1 text-xs text-slate-400">
                      = {formatINR(Number(form.expenses))}
                    </p>
                  )}
                </div>

                {/* Live profit preview */}
                {form.revenue && form.expenses && (
                  <div
                    className={`rounded-xl border px-4 py-3 text-sm ${
                      Number(form.revenue) >= Number(form.expenses)
                        ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
                        : "border-red-400/20 bg-red-500/10 text-red-100"
                    }`}
                  >
                    Estimated profit:{" "}
                    <strong>
                      {formatINR(Number(form.revenue) - Number(form.expenses))}
                    </strong>{" "}
                    (
                    {Math.round(
                      ((Number(form.revenue) - Number(form.expenses)) /
                        Number(form.revenue)) *
                        100,
                    )}
                    % margin)
                  </div>
                )}

                {/* Customers */}
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wider text-slate-400">
                    Active customers{" "}
                    <span className="text-slate-500">(optional)</span>
                  </label>
                  <input
                    type="number"
                    name="customers"
                    value={form.customers}
                    onChange={handleChange}
                    placeholder="e.g. 120"
                    min="0"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-2xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-400 disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : existingEntry
                      ? "Update entry"
                      : "Save entry"}
                </button>
              </form>
            </section>

            {/* Existing entries table */}
            <section className="fintech-card p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                History
              </p>
              <h2 className="mt-2 text-xl font-semibold text-white">
                Saved entries
              </h2>

              {loading ? (
                <div className="mt-8 text-center text-sm text-slate-400">
                  Loading…
                </div>
              ) : entries.length === 0 ? (
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-slate-400">
                  No entries yet. Add your first month above.
                </div>
              ) : (
                <div className="mt-6 space-y-3 max-h-[520px] overflow-y-auto pr-1">
                  {[...entries].reverse().map((entry) => (
                    <div
                      key={entry.month}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">
                          {entry.month}
                        </span>
                        <button
                          onClick={() => handleDelete(entry.month)}
                          disabled={deleteTarget === entry.month}
                          className="text-xs text-slate-500 hover:text-red-400 transition disabled:opacity-50"
                        >
                          {deleteTarget === entry.month
                            ? "Deleting…"
                            : "Delete"}
                        </button>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
                        <span>
                          Revenue:{" "}
                          <strong className="text-white">
                            {formatINR(entry.revenue)}
                          </strong>
                        </span>
                        <span>
                          Expenses:{" "}
                          <strong className="text-white">
                            {formatINR(entry.expenses)}
                          </strong>
                        </span>
                        <span
                          className={
                            entry.profit >= 0
                              ? "text-emerald-300"
                              : "text-red-300"
                          }
                        >
                          Profit: <strong>{formatINR(entry.profit)}</strong>
                        </span>
                        {entry.customers > 0 && (
                          <span>
                            Customers:{" "}
                            <strong className="text-white">
                              {entry.customers}
                            </strong>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
