export const site = {
  name: "Purvang Doshi & Associates",
  shortName: "Purvang Doshi & Associates",
  tagline: "Chartered Accountants",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.purvangdoshi.com",
  description:
    "Purvang Doshi & Associates is a Mahesana-based Chartered Accountants firm delivering taxation, audit, corporate, valuation and cross-border advisory services to individuals, SMEs, corporates, NRIs and foreign entities.",
  email: "purvangdoshica@gmail.com",
  phone: "+91 63544 90042",
  phoneRaw: "+916354490042",
  whatsapp: "916354490042",
  address: {
    locality: "Mahesana",
    region: "Gujarat",
    country: "India",
  },
  hours: "Mon–Sat, 9:00 AM – 6:00 PM",
  founded: "2024",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Resources", href: "/resources" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const services = [
  { slug: "taxation", name: "Taxation", short: "Income tax, GST & NRI taxation", long: "Income tax return filing, tax planning, GST registration & returns, TDS compliance, and specialised NRI taxation covering DTAA, repatriation and capital-gains advisory." },
  { slug: "audit", name: "Audit & Assurance", short: "Statutory, internal, tax & GST audit", long: "Statutory audits, internal audits, tax audits and GST audits performed with a risk-based approach that gives management and stakeholders genuine assurance." },
  { slug: "corporate", name: "Corporate Services", short: "Company registration & formation", long: "Company & LLP registration, ROC compliance, secretarial services, and end-to-end support for setting up new business entities in India." },
  { slug: "advisory", name: "Advisory", short: "International tax & strategic advisory", long: "International tax structuring, transfer pricing and strategic financial advisory for businesses expanding across borders or planning major transactions." },
  { slug: "virtual-cfo", name: "Virtual CFO", short: "Outsourced financial leadership", long: "Outsourced financial leadership — MIS reporting, cash-flow management, budgeting and board-level financial guidance without a full-time CFO hire." },
  { slug: "valuation", name: "Business Valuation", short: "Independent, defensible valuations", long: "Independent, defensible valuations for M&A, fundraising, ESOP pricing, and regulatory or dispute purposes." },
  { slug: "loans", name: "Loans", short: "Home, MSME & corporate loan support", long: "End-to-end support for home loans, MSME loans and corporate credit facilities — from documentation to bank liaisoning." },
  { slug: "payroll", name: "Payroll & Bookkeeping", short: "End-to-end back-office support", long: "Monthly bookkeeping, payroll processing, statutory filings and back-office accounting so your team can focus on the business." },
  { slug: "fema", name: "FEMA & RBI Compliance", short: "Cross-border compliance", long: "FDI/ODI filings, FEMA advisory and RBI compliance for foreign companies and NRIs transacting with India." },
  { slug: "due-diligence", name: "Due Diligence", short: "Financial & regulatory due diligence", long: "Financial and regulatory due diligence for M&A, investment and lending decisions — thorough, timely and clearly reported." },
] as const;

export const industries = [
  { name: "Manufacturing", desc: "Costing, GST on inputs/outputs, factory compliance and export incentive advisory." },
  { name: "Real Estate", desc: "RERA compliance, project accounting and construction-sector taxation." },
  { name: "Textiles", desc: "Inventory-heavy accounting, job-work GST and export documentation." },
  { name: "Healthcare", desc: "Practice accounting, trust compliance and healthcare-specific tax planning." },
  { name: "IT & Startups", desc: "Entity setup, ESOP structuring, funding-round support and startup tax benefits." },
  { name: "Trading & Retail", desc: "Inventory reconciliation, multi-state GST and retail margin analysis." },
] as const;
