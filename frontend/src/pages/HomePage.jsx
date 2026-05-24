import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const initialFormState = {
  businessName: "",
  email: "",
  password: "",
  businessType: "",
  businessDescription: "",
};

function HomePage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [authError, setAuthError] = useState("");
  const [formData, setFormData] = useState(initialFormState);

  const openModal = (type) => {
    setModalType(type);
    setAuthMessage("");
    setAuthError("");
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAuthMessage("");
    setAuthError("");
    setFormData(initialFormState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setAuthMessage("");
    setAuthError("");

    const endpoint = modalType === "login" ? "/auth/login" : "/auth/register";
    const payload =
      modalType === "login"
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            businessName: formData.businessName,
            email: formData.email,
            password: formData.password,
            businessType: formData.businessType,
            businessDescription: formData.businessDescription,
          };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      setAuthMessage(data.message || "Authentication successful");
      setTimeout(() => {
        closeModal();
        navigate("/dashboard");
      }, 700);
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalTitle = modalType === "login" ? "Login" : "Register";

  return (
    <main className="fintech-shell fintech-grid">
      <section className="mx-auto flex max-w-6xl flex-col px-6 py-16 lg:px-10">
        <div className="fintech-card overflow-hidden p-8 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="fintech-pill">
                Smart money for growing businesses
              </span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Grow your business with trusted financial guidance.
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                Vyapaar Saarthi helps you plan smarter investments, understand
                market opportunities, discover government schemes, and manage
                taxes with confidence.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openModal("register")}
                  className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => openModal("login")}
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Login
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-brand-400/20 bg-gradient-to-br from-brand-500/15 to-emerald-500/10 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                What you get
              </p>
              <ul className="mt-5 space-y-4 text-slate-100">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-400" />
                  <span>
                    Actionable investment ideas for your self-owned business.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span>
                    Security market insights tailored to your risk profile.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-300" />
                  <span>
                    Relevant government schemes and benefits for your business
                    type.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span>
                    Practical tax planning support for better cash flow.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                Features
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                Everything you need to plan and grow
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article className="fintech-card p-5">
              <p className="text-sm text-brand-100">Self business</p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                Investment suggestions
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Find the right capital allocation ideas for equipment,
                inventory, marketing, and expansion.
              </p>
            </article>

            <article className="fintech-card p-5">
              <p className="text-sm text-brand-100">Security markets</p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                Investment suggestions
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Explore market-linked opportunities and understand how to
                diversify your portfolio responsibly.
              </p>
            </article>

            <article className="fintech-card p-5">
              <p className="text-sm text-brand-100">Govt schemes</p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                Business-specific support
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Discover schemes, subsidies, and benefits that match your
                business category and growth stage.
              </p>
            </article>

            <article className="fintech-card p-5">
              <p className="text-sm text-brand-100">Tax planning</p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                Smarter planning
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Get practical guidance to reduce tax burden and keep your
                finances organized throughout the year.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-3">
          <article className="fintech-card p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
              Business insights
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              Cash-flow planning
            </h3>
            <p className="mt-3 text-sm text-slate-300">
              Track inflows, optimize working capital, and prepare for seasonal
              demand changes with a clearer financial picture.
            </p>
          </article>

          <article className="fintech-card p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
              Market readiness
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              Risk-aware investing
            </h3>
            <p className="mt-3 text-sm text-slate-300">
              Balance stability and growth with suggestions tailored to your
              goals, business stage, and comfort with market fluctuations.
            </p>
          </article>

          <article className="fintech-card p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
              Compliance support
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              Policy and paperwork
            </h3>
            <p className="mt-3 text-sm text-slate-300">
              Stay informed about important government updates, filing
              requirements, and scheme deadlines that can affect your business.
            </p>
          </article>
        </section>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
            Why entrepreneurs trust Vyapaar Saarthi
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-3xl font-semibold text-white">24/7</p>
              <p className="mt-2 text-sm text-slate-300">
                Access practical guidance whenever you need a quick decision.
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">100%</p>
              <p className="mt-2 text-sm text-slate-300">
                Business-focused recommendations built around real-world
                financial needs.
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">Smart</p>
              <p className="mt-2 text-sm text-slate-300">
                From scheme discovery to tax planning, every insight supports
                sustainable growth.
              </p>
            </div>
          </div>
        </section>
      </section>

      {isModalOpen && (
        <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="modal-panel fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative z-10 w-full max-w-lg rounded-[1.75rem] border border-brand-400/20 bg-surface-900/95 p-6 shadow-fintech sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand-100">
                  {modalType === "login"
                    ? "Welcome back"
                    : "Create your account"}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  {modalTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white transition hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {modalType === "register" && (
                <>
                  <div>
                    <label className="mb-2 block text-sm text-slate-200">
                      Business name
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Enter your business name"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-brand-400"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-200">
                      Business type
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-4 flex items-center text-brand-200">
                        ●
                      </div>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-[1.2rem] border border-white/10 bg-gradient-to-r from-slate-950/90 via-slate-900/90 to-brand-900/60 px-10 py-3.5 pr-12 text-white shadow-[0_14px_35px_rgba(37,99,235,0.12)] outline-none transition duration-200 hover:border-brand-400/50 focus:border-brand-400 focus:bg-slate-900/95"
                      >
                        <option value="" className="bg-slate-950 text-white">
                          Select business type
                        </option>
                        <option value="retail" className="bg-slate-950 text-white">
                          Retail
                        </option>
                        <option value="services" className="bg-slate-950 text-white">
                          Services
                        </option>
                        <option
                          value="manufacturing"
                          className="bg-slate-950 text-white"
                        >
                          Manufacturing
                        </option>
                        <option
                          value="agriculture"
                          className="bg-slate-950 text-white"
                        >
                          Agriculture
                        </option>
                        <option
                          value="technology"
                          className="bg-slate-950 text-white"
                        >
                          Technology
                        </option>
                        <option value="other" className="bg-slate-950 text-white">
                          Other
                        </option>
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-brand-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-200">
                      Business description
                    </label>
                    <textarea
                      rows="3"
                      name="businessDescription"
                      value={formData.businessDescription}
                      onChange={handleChange}
                      placeholder="Briefly describe your business"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-brand-400"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="mb-2 block text-sm text-slate-200">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-brand-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-200">
                  {modalType === "login" ? "Password" : "Create password"}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={
                    modalType === "login"
                      ? "Enter your password"
                      : "Create a secure password"
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-brand-400"
                />
              </div>

              {authMessage && (
                <p className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                  {authMessage}
                </p>
              )}

              {authError && (
                <p className="rounded-2xl border border-danger-400/30 bg-danger-500/10 px-4 py-3 text-sm text-rose-100">
                  {authError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting
                  ? "Processing..."
                  : modalType === "login"
                    ? "Continue to dashboard"
                    : "Create account"}
              </button>
            </form>

            <p className="mt-5 text-sm text-slate-300">
              {modalType === "login" ? "New here?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() =>
                  setModalType(modalType === "login" ? "register" : "login")
                }
                className="font-semibold text-brand-200 underline decoration-brand-200/70 underline-offset-2"
              >
                {modalType === "login" ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

export default HomePage;
