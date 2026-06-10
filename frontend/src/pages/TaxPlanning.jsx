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
      <div className="mx-auto flex w-full flex-col gap-4 sm:gap-6 lg:flex-row lg:max-w-7xl">
        <div className="w-full sm:max-w-xs lg:w-xs lg:flex-shrink-0">
          <Sidebar />
        </div>

        <main className="flex-1 w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="w-full">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 sm:px-4 py-2 text-xs sm:text-sm text-primary">
              <ShieldCheck size={16} />
              <span className="hidden sm:inline">Tax Planning</span>
              <span className="sm:hidden">Tax</span>
            </div>

            <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Ways to save tax
              <span className="mt-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-2xl sm:text-3xl lg:text-4xl">
                Practical planning for smarter cash flow
              </span>
            </h1>

            <p className="mt-3 sm:mt-5 max-w-3xl text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-slate-300">
              A good tax plan is not only about reducing tax—it is about
              building discipline around records, timing, and compliance so your
              business can grow without avoidable liabilities.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 w-full grid-cols-1 lg:grid-cols-3">
            {/* Main strategies section */}
            <section className="lg:col-span-2 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/70 p-4 sm:p-6 backdrop-blur-lg">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <div className="rounded-xl bg-emerald-500/20 p-2 sm:p-3 text-emerald-200 flex-shrink-0">
                  <Calculator size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-brand-100">
                    Tax-saving ideas
                  </p>
                  <h2 className="mt-1 sm:mt-2 text-lg sm:text-2xl font-semibold text-white">
                    Smart ways to save or plan tax
                  </h2>
                </div>
              </div>

              <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
                {strategies.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-slate-200">
                          {item.description}
                        </p>
                      </div>
                      <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 sm:px-3 py-1 text-xs font-semibold text-emerald-100 w-fit">
                        {item.impact}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Right sidebar with checklist and pro tip */}
            <section className="flex flex-col gap-6 sm:gap-8 w-full">
              {/* Checklist Card */}
              <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/70 p-4 sm:p-6 backdrop-blur-lg">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <div className="rounded-xl bg-brand-500/20 p-2 sm:p-3 text-brand-100 flex-shrink-0">
                    <ReceiptText size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-brand-100">
                      Planning checklist
                    </p>
                    <h2 className="mt-1 sm:mt-2 text-lg sm:text-2xl font-semibold text-white">
                      Monthly tax readiness
                    </h2>
                  </div>
                </div>

                <ul className="mt-3 sm:mt-5 space-y-2 sm:space-y-3 text-xs sm:text-sm leading-5 sm:leading-6 text-slate-200">
                  {checklist.map((item) => (
                    <li key={item} className="flex gap-2 sm:gap-3">
                      <CheckCircle2
                        className="mt-0.5 flex-shrink-0 text-emerald-200"
                        size={16}
                      />
                      <span className="break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro Tip Card */}
              <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/70 p-4 sm:p-6 backdrop-blur-lg">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <div className="rounded-xl bg-amber-500/20 p-2 sm:p-3 text-amber-200 flex-shrink-0">
                    <PiggyBank size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-brand-100">
                      Pro tip
                    </p>
                    <h2 className="mt-1 sm:text-xl font-semibold text-white">
                      Keep tax planning proactive
                    </h2>
                  </div>
                </div>

                <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-6 sm:leading-7 text-slate-200">
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
