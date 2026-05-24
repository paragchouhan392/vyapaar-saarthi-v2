import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: "◈" },
  { name: "Investment Ideas", path: "/investment-ideas", icon: "⬢" },
  { name: "Market Insights", path: "/market-insights", icon: "◍" },
  { name: "Govt Schemes", path: "/govt-schemes", icon: "▣" },
  { name: "Tax Planning", path: "/tax-planning", icon: "✦" },
];

function Sidebar() {
  return (
    <aside className="flex h-full min-h-screen w-full max-w-xs flex-col border-r border-white/10 bg-slate-950/80 px-5 py-6 backdrop-blur">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-brand-100">
          Vyapaar Saarthi
        </p>
        <h1 className="mt-3 text-xl font-semibold text-white">Business Dashboard</h1>
        <p className="mt-2 text-sm text-slate-300">
          Access your financial planning workspace after login.
        </p>
      </div>

      <nav className="mt-8 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-brand-500/20 text-white"
                  : "text-slate-200 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <span className="text-base text-brand-200">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-4">
        <p className="text-sm font-semibold text-emerald-100">Today’s focus</p>
        <p className="mt-2 text-sm text-slate-200">
          Review your business finance plan and upcoming scheme deadlines.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
