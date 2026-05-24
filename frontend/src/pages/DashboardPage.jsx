import Sidebar from "../components/Sidebar";

const quickStats = [
  { label: "Business health", value: "82%", note: "+8% this month" },
  { label: "Suggested investments", value: "5", note: "Ready to review" },
  { label: "Govt schemes", value: "3", note: "Relevant to your sector" },
  { label: "Tax actions", value: "2", note: "Checklist pending" },
];

const updates = [
  "Review your last investment plan and adjust your risk mix.",
  "Check for new government support programs applicable to your business type.",
  "Plan upcoming tax submissions to avoid late penalties.",
];

function DashboardPage() {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        <div className="w-full lg:max-w-xs">
          <Sidebar />
        </div>

        <main className="flex-1 px-6 py-8 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                Welcome back
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">
                Your fintech dashboard
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Stay on top of your business growth plan with curated insights,
                funding opportunities, and smart tax guidance.
              </p>
            </div>

            <div className="rounded-2xl border border-brand-400/20 bg-brand-500/10 px-4 py-3 text-sm text-brand-50">
              Secure login session active
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickStats.map((item) => (
              <article key={item.label} className="fintech-card p-5">
                <p className="text-sm text-brand-100">{item.label}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  {item.value}
                </h3>
                <p className="mt-2 text-sm text-slate-300">{item.note}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <section className="fintech-card p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                    Insights
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    Smart prompts for today
                  </h3>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {updates.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="fintech-card p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                Next best action
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                Focus on growth
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                Use the sidebar to explore your personalized roadmap. This screen
                is ready for deeper business insights and future page modules.
              </p>

              <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-4">
                <p className="text-sm font-semibold text-emerald-100">
                  Recommendation
                </p>
                <p className="mt-2 text-sm text-slate-100">
                  Review the government schemes section first to unlock the best
                  support opportunities for your business category.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
