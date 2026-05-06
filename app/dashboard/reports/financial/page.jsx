import Link from "next/link";
import Sidebar from "../../Sidebar";

export const metadata = {
  title: "Financial Reports | Inventra ERP",
  description: "Financial statements, profit & loss, and cash flow analysis",
};

const incomeStatement = [
  { item: "Total Revenue", value: 2850000, indent: 0 },
  { item: "Cost of Goods Sold", value: -1425000, indent: 0 },
  { item: "Gross Profit", value: 1425000, indent: 0, highlight: true },
  { item: "Operating Expenses", value: -285000, indent: 0 },
  { item: "EBITDA", value: 1140000, indent: 0, highlight: true },
  { item: "Depreciation & Amortization", value: -142500, indent: 1 },
  { item: "Operating Income", value: 997500, indent: 0, highlight: true },
];

const cashFlow = [
  { period: "Jan", operating: 185000, investing: -45000, financing: -12000, net: 128000 },
  { period: "Feb", operating: 195000, investing: -38000, financing: -15000, net: 142000 },
  { period: "Mar", operating: 210000, investing: -52000, financing: -18000, net: 140000 },
  { period: "Apr", operating: 225000, investing: -48000, financing: -20000, net: 157000 },
  { period: "May", operating: 240000, investing: -55000, financing: -22000, net: 163000 },
];

const balanceSheet = [
  { category: "Assets", items: [
    { name: "Current Assets", value: 1250000 },
    { name: "Fixed Assets", value: 2100000 },
    { name: "Total Assets", value: 3350000, highlight: true },
  ] },
  { category: "Liabilities", items: [
    { name: "Current Liabilities", value: 450000 },
    { name: "Long-term Liabilities", value: 800000 },
    { name: "Total Liabilities", value: 1250000, highlight: true },
  ] },
  { category: "Equity", items: [
    { name: "Common Stock", value: 1500000 },
    { name: "Retained Earnings", value: 600000 },
    { name: "Total Equity", value: 2100000, highlight: true },
  ] },
];

const StatCard = ({ label, value, change, color }) => (
  <div className="rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
    <p className="text-sm text-[#6b7280]">{label}</p>
    <p className={`mt-2 text-2xl font-bold ${color}`}>{value}</p>
    <p className={`mt-1 text-xs font-semibold ${change.includes("+") ? "text-[#0ec4a8]" : "text-[#f43f5e]"}`}>{change}</p>
  </div>
);

export default function FinancialReportsPage() {
  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="FINANCIAL REPORTS" />

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <div className="flex items-center gap-2">
                <Link href="/dashboard/reports" className="text-[#6b7280] hover:text-[#4f6ef7]">
                  Reports
                </Link>
                <span className="text-[#d1d5db]">/</span>
                <span className="text-[#4f6ef7] font-semibold">Financial</span>
              </div>
              <h1 className="mt-1 font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Financial Reports</h1>
              <p className="text-sm text-[#6b7280]">Financial statements, profit & loss, and cash flow analysis</p>
            </div>

            <button className="cursor-pointer rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition duration-200 hover:bg-[#3d5ce6]">
              Export Report
            </button>
          </div>
        </header>

        <section className="px-4 py-6 md:px-8 md:py-8">
          {/* Key Metrics */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
            <StatCard label="Total Revenue" value="£2.85M" change="+18.5% YoY" color="text-[#0ec4a8]" />
            <StatCard label="Gross Profit" value="£1.43M" change="+22.1% YoY" color="text-[#0a0d14]" />
            <StatCard label="Operating Income" value="£997.5K" change="+15.3% YoY" color="text-[#4f6ef7]" />
            <StatCard label="Net Profit Margin" value="28.4%" change="+2.1pp YoY" color="text-[#0a0d14]" />
          </div>

          {/* Income Statement */}
          <div className="mb-8 rounded-3xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0a0d14]">Income Statement</h2>
              <p className="text-sm text-[#6b7280]">Year-to-date financial performance</p>
            </div>

            <div className="space-y-2">
              {incomeStatement.map((row, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 cursor-pointer transition hover:shadow-sm ${
                    row.highlight ? "bg-[#4f6ef7]/10 border border-[#4f6ef7]/20 font-semibold" : "hover:bg-[#f9fafb]"
                  }`}
                  style={{ marginLeft: `${row.indent * 20}px` }}
                >
                  <span className="text-[#0a0d14]">{row.item}</span>
                  <span className={`font-semibold ${row.value > 0 ? "text-[#0a0d14]" : "text-[#f43f5e]"}`}>
                    £{Math.abs(row.value).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cash Flow */}
          <div className="mb-8 rounded-3xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0a0d14]">Cash Flow Analysis</h2>
              <p className="text-sm text-[#6b7280]">Monthly cash movement</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-[rgba(0,0,0,0.08)]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Period</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Operating</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Investing</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Financing</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Net Cash Flow</th>
                  </tr>
                </thead>
                <tbody>
                  {cashFlow.map((row, idx) => (
                    <tr key={idx} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[#f9fafb] transition cursor-pointer">
                      <td className="px-4 py-3 font-medium text-[#0a0d14]">{row.period}</td>
                      <td className="px-4 py-3 text-[#0ec4a8] font-semibold">£{(row.operating / 1000).toFixed(0)}K</td>
                      <td className="px-4 py-3 text-[#f43f5e] font-semibold">£{(row.investing / 1000).toFixed(0)}K</td>
                      <td className="px-4 py-3 text-[#f43f5e] font-semibold">£{(row.financing / 1000).toFixed(0)}K</td>
                      <td className="px-4 py-3 text-[#4f6ef7] font-bold">£{(row.net / 1000).toFixed(0)}K</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Balance Sheet */}
          <div className="grid gap-6 lg:grid-cols-3">
            {balanceSheet.map((section, idx) => (
              <div key={idx} className="rounded-3xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-[#0a0d14]">{section.category}</h3>
                <div className="space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 cursor-pointer transition hover:shadow-sm ${
                        item.highlight ? "bg-[#4f6ef7]/10 border border-[#4f6ef7]/20 font-semibold" : "hover:bg-[#f9fafb]"
                      }`}
                    >
                      <span className="text-[#0a0d14]">{item.name}</span>
                      <span className="font-semibold text-[#0a0d14]">£{(item.value / 1000).toFixed(0)}K</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
