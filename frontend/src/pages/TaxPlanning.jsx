import Sidebar from "../components/Sidebar";
import {
  Calculator,
  CheckCircle2,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";

const strategies = [
  {
    title: "Claim every valid business expense",
    description:
      "Keep records for software subscriptions, office rent, utilities, employee training, travel, and professional services. Accurate expense tracking reduces taxable income and helps you document deductions cleanly.",
    impact: "Immediate reduction in taxable profit",
  },
  {
    title: "Plan purchases and investments strategically",
    description:
      "Timing capital purchases or asset investments near the financial year-end can allow you to claim depreciation or investment-related deductions where applicable. Use a quarterly review to align purchases with your tax plan.",
    impact: "Better cash flow and tax timing control",
  },
  {
    title: "Optimize GST and input tax credits",
    description:
      "Match invoices carefully, file returns on time, and review input tax credit eligibility to avoid blocked credits. This improves working capital and prevents leakages caused by missing input claims.",
    impact: "Higher reclaimable credits and lower effective tax burden",
  },
  {
    title: "Use statutory deductions and exemptions correctly",
    description:
      "Understand eligible deductions for employee benefits, prescribed savings, and approved reimbursements. Staying updated on the latest compliance rules helps you avoid both overpayment and penalties.",
    impact: "Legal savings with lower compliance risk",
  },
  {
    title: "Review payroll and TDS planning",
    description:
      "Check salary structures, bonuses, vendor payments, and contractor tax treatment so TDS is correct and advance tax obligations are planned in advance. This avoids interest and notice risk.",
    impact: "Reduced interest, penalties, and surprises",
  },
  {
    title: "Build a year-round tax reserve",
    description:
      "Set aside a fixed percentage of monthly revenue for tax provisioning. This helps you handle advance tax payments, reassessment, and unexpected liabilities without stressing cash flow.",
    impact: "Improved financial stability and planning",
  },
];

const checklist = [
  "Keep invoices, payment proofs, and GST records updated monthly",
  "Review expense categories before filing to maximize valid claims",
  "Track all TDS and GST deadlines in a shared calendar",
  "Estimate advance tax obligations based on current profitability",
  "Run a tax review before the end of each quarter",
];

function TaxPlanning() {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        <div className="w-full lg:max-w-xs">
          <Sidebar />
        </div>

        <main className="flex-1 px-6 py-8 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
              <ShieldCheck size={16} />
              Tax Planning
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl">
              Ways to save tax
              <span className="mt-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Practical planning for smarter cash flow
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              A good tax plan is not only about reducing tax—it is about
              building discipline around records, timing, and compliance so your
              business can grow without avoidable liabilities.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-lg">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-500/20 p-3 text-emerald-200">
                  <Calculator />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                    Tax-saving ideas
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Smart ways to save or plan tax
                  </h2>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {strategies.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-200">
                          {item.description}
                        </p>
                      </div>
                      <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-100 whitespace-nowrap">
                        {item.impact}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-lg">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-brand-500/20 p-3 text-brand-100">
                    <ReceiptText />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                      Planning checklist
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      Monthly tax readiness
                    </h2>
                  </div>
                </div>

                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-200">
                  {checklist.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2
                        className="mt-0.5 flex-shrink-0 text-emerald-200"
                        size={18}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-lg">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber-500/20 p-3 text-amber-200">
                    <PiggyBank />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                      Pro tip
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      Keep tax planning proactive
                    </h2>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-200">
                  Review your tax position every quarter. This helps you catch
                  issues early, adjust procurement and payroll timing, and avoid
                  surprises during filing season.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TaxPlanning;
