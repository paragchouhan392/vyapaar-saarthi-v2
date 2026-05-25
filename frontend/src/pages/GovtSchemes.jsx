import Sidebar from "../components/Sidebar";
import {
  Landmark,
  ExternalLink,
  ShieldCheck,
  BadgeIndianRupee,
} from "lucide-react";

const schemes = [
  {
    schemeName: "Pradhan Mantri Mudra Yojana (PMMY)",
    agency: "Ministry of Finance",
    benefits:
      "Non-collateral loans up to ₹10 lakhs for micro businesses. Available in 3 categories: Shishu (up to ₹50k), Kishor (₹50k-₹5L), and Tarun (₹5L-₹10L). Low interest rates and flexible repayment terms.",
    schemeLink: "https://www.jansamarth.in/",
  },
  {
    schemeName: "Startup India Scheme",
    agency: "Department for Promotion of Industry and Internal Trade",
    benefits:
      "Fast-track registration, patent filing support, and tax incentives. Fund seedling program for early-stage startups. Access to mentorship and incubation facilities across India.",
    schemeLink: "https://www.startupindia.gov.in/",
  },
  {
    schemeName: "Credit Guarantee Scheme for Micro and Small Enterprises",
    agency: "Ministry of MSME",
    benefits:
      "100% credit guarantee coverage for term loans. No collateral or third-party guarantee required. Covers both new and existing enterprises up to fixed assets of ₹5 crores.",
    schemeLink: "https://www.cgtmse.in/",
  },
  {
    schemeName: "PM Vishwakarma Yojana",
    agency: "Ministry of MSME",
    benefits:
      "Protection for self-employed artisans and micro enterprises. Provides loans up to ₹3 lakhs without collateral. Training and toolkit support with government assistance.",
    schemeLink: "https://pmvishwakarma.gov.in/",
  },
  {
    schemeName: "Goods and Services Tax (GST) Benefits",
    agency: "Ministry of Finance",
    benefits:
      "Reduced tax rates, exemptions, and concessional rates for specified goods and services. Simplified compliance for businesses with turnover below ₹40 lakhs.",
    schemeLink: "https://www.gst.gov.in/",
  },
  {
    schemeName: "Employment Linked Incentive Scheme",
    agency: "Ministry of Labour and Employment",
    benefits:
      "Government covers a portion of employer contribution towards social security. Incentives for hiring workers from disadvantaged sections. Supports businesses in scaling workforce.",
    schemeLink: "https://www.moe.gov.in/",
  },
  {
    schemeName: "Production Linked Incentive (PLI) Scheme",
    agency: "Department for Promotion of Industry and Internal Trade",
    benefits:
      "Direct incentives on incremental sales and production. Sector-specific benefits for manufacturing units. Covers 14 key sectors including electronics, textiles, and pharmaceuticals.",
    schemeLink: "https://pli.gov.in/",
  },
  {
    schemeName: "Ministry of Social Justice - Self Employment Schemes",
    agency: "Ministry of Social Justice & Empowerment",
    benefits:
      "Loans up to ₹2 lakhs for self-employed individuals. Subsidy on loan interest. Special schemes for SC/ST and OBC entrepreneurs with relaxed eligibility criteria.",
    schemeLink: "https://www.socialjustice.gov.in/",
  },
  {
    schemeName: "Stand-Up India Scheme",
    agency: "Ministry of Finance",
    benefits:
      "Loans up to ₹1 crore for SC/ST/Woman entrepreneurs and first-generation entrepreneurs. Flexible repayment terms, mentorship support, and capacity building. Covers services, manufacturing, and trading sectors.",
    schemeLink: "https://www.standupmitra.in/",
  },
  {
    schemeName: "Pradhan Mantri Employment Generation Programme (PMEGP)",
    agency: "Ministry of MSME",
    benefits:
      "Loans up to ₹25 lakhs for manufacturing and ₹10 lakhs for business/services. Government-backed credit with subsidized interest rates. Support for self-employment and job creation.",
    schemeLink: "https://pmegp.gov.in/",
  },
  {
    schemeName: "Atal Innovation Mission",
    agency: "NITI Aayog",
    benefits:
      "Support for innovative startups and entrepreneurs. Access to mentorship, networking, and funding opportunities. Includes Atal Incubation Centers across India for business incubation.",
    schemeLink: "https://www.niti.gov.in/",
  },
  {
    schemeName: "Export Promotion Capital Goods (EPCG) Scheme",
    agency: "Ministry of Commerce & Industry",
    benefits:
      "Duty-free import of capital goods for export-oriented units. Facilitates modernization and capacity building. Applicable to manufacturing and selected service sectors.",
    schemeLink: "https://commerce.gov.in/",
  },
  {
    schemeName: "Technology Development Board (TDB) Scheme",
    agency: "Department of Science and Technology",
    benefits:
      "Financial support for technology development and commercialization. Soft loans with flexible terms for technology-based enterprises. Covers development, deployment, and commercialization phases.",
    schemeLink: "https://www.tdb.gov.in/",
  },
  {
    schemeName: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
    agency: "Ministry of Finance",
    benefits:
      "Universal banking access with zero-balance accounts. Overdraft facility up to ₹10,000. Insurance and pension benefits. Essential for businesses to access formal banking and credit.",
    schemeLink: "https://www.pmjdy.gov.in/",
  },
  {
    schemeName: "EC Scheme - Export Credit (Collateral-free Export Loans)",
    agency: "Ministry of Finance",
    benefits:
      "Subsidized interest rates on collateral-free export loans. Short and medium-term credit for exporters. Competitive rates for working capital and term loans up to ₹2 crores.",
    schemeLink: "https://www.exim.gov.in/",
  },
  {
    schemeName: "Amended Technology Upgradation Fund Scheme (ATUFS)",
    agency: "Ministry of Textiles",
    benefits:
      "Financial support for technology upgradation in textile sector. Capital subsidy and technology deployment loans. Applicable for modernization of equipment and infrastructure.",
    schemeLink: "https://texmin.gov.in/",
  },
  {
    schemeName: "Market Development Assistance (MDA) Scheme",
    agency: "Ministry of Commerce & Industry",
    benefits:
      "Financial assistance for export promotion and market development. Coverage for participation in international exhibitions, fairs, and trade delegations.",
    schemeLink: "https://commerce.gov.in/",
  },
];

function GovtSchemes() {
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
              Government Support Programs
            </div>

            <h1 className="mt-6 text-5xl font-bold leading-tight text-textPrimary">
              Discover Government Schemes
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Built For Your Business Growth
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-textSecondary">
              Explore AI-curated MSME, startup, and business support schemes
              tailored to help entrepreneurs access funding, tax benefits,
              subsidies, and financial assistance.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-card p-6 backdrop-blur-lg">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/20 p-3 text-primary">
                  <Landmark />
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-textPrimary">150+</h2>
                  <p className="text-textSecondary">Active Govt Schemes</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-card p-6 backdrop-blur-lg">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-secondary/20 p-3 text-secondary">
                  <BadgeIndianRupee />
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-textPrimary">
                    ₹500Cr+
                  </h2>
                  <p className="text-textSecondary">
                    Financial Assistance Covered
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-card p-6 backdrop-blur-lg">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-success/20 p-3 text-success">
                  <ShieldCheck />
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-textPrimary">
                    AI Powered
                  </h2>
                  <p className="text-textSecondary">
                    Personalized Recommendations
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {schemes.map((scheme, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card p-7 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -top-20 right-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl"></div>
                </div>

                <div className="relative z-10 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  {scheme.agency}
                </div>

                <h2 className="relative z-10 mt-5 text-2xl font-bold leading-snug text-textPrimary">
                  {scheme.schemeName}
                </h2>

                <p className="relative z-10 mt-4 leading-7 text-textSecondary">
                  {scheme.benefits}
                </p>

                <div className="relative z-10 mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-success">
                    <ShieldCheck size={18} />
                    <span className="text-sm font-medium">
                      Eligible MSMEs & Startups
                    </span>
                  </div>

                  <a
                    href={scheme.schemeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-secondary"
                  >
                    Explore
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default GovtSchemes;
