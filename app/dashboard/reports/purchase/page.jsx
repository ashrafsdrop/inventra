import Link from "next/link";
import Sidebar from "../../Sidebar";

export const metadata = {
  title: "Purchase Reports | Inventra ERP",
  description: "Purchase trends, vendor performance, and order history",
};

const purchaseData = [
  { period: "January", amount: 125000, orders: 45, vendors: 12, avgOrder: 2778 },
  { period: "February", amount: 142000, orders: 52, vendors: 14, avgOrder: 2731 },
  { period: "March", amount: 138000, orders: 48, vendors: 13, avgOrder: 2875 },
  { period: "April", amount: 156000, orders: 58, vendors: 15, avgOrder: 2689 },
  { period: "May", amount: 168000, orders: 62, vendors: 16, avgOrder: 2710 },
];

const vendorPerformance = [
  { name: "TechSupply Co.", amount: 245000, orders: 28, rating: 4.8, onTimeDelivery: "98%" },
  { name: "Global Distributors", amount: 189000, orders: 22, rating: 4.5, onTimeDelivery: "95%" },
  { name: "Prime Vendors", amount: 167000, orders: 19, rating: 4.2, onTimeDelivery: "92%" },
  { name: "Quality Import", amount: 142000, orders: 16, rating: 4.6, onTimeDelivery: "97%" },
  { name: "Trade Partners", amount: 128000, orders: 14, rating: 3.9, onTimeDelivery: "88%" },
];

const StatCard = ({ label, value, subtext, icon }) => (
  <div className="rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-[#6b7280]">{label}</p>
        <p className="mt-2 text-2xl font-bold text-[#0a0d14]">{value}</p>
        <p className="mt-1 text-xs text-[#6b7280]">{subtext}</p>
      </div>
      <span className="text-2xl">{icon}</span>
    </div>
  </div>
);

export default function PurchaseReportsPage() {
  const totalSpend = purchaseData.reduce((sum, item) => sum + item.amount, 0);
  const avgMonthlySpend = totalSpend / purchaseData.length;

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="PURCHASE REPORTS" />

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <div className="flex items-center gap-2">
                <Link href="/dashboard/reports" className="text-[#6b7280] hover:text-[#4f6ef7]">
                  Reports
                </Link>
                <span className="text-[#d1d5db]">/</span>
                <span className="text-[#4f6ef7] font-semibold">Purchase</span>
              </div>
              <h1 className="mt-1 font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Purchase Reports</h1>
              <p className="text-sm text-[#6b7280]">Analyze purchase trends, vendor performance, and order history</p>
            </div>

            <button className="cursor-pointer rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition duration-200 hover:bg-[#3d5ce6]">
              Export Report
            </button>
          </div>
        </header>

        <section className="px-4 py-6 md:px-8 md:py-8">
          {/* Key Metrics */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
            <StatCard label="Total Spend (5M)" value={`£${(totalSpend / 1000).toFixed(0)}K`} subtext="All purchases" icon="💷" />
            <StatCard label="Avg Monthly Spend" value={`£${(avgMonthlySpend / 1000).toFixed(0)}K`} subtext="Last 5 months" icon="📊" />
            <StatCard label="Active Vendors" value={vendorPerformance.length} subtext="Supplier count" icon="🏢" />
            <StatCard label="Total Orders" value={purchaseData.reduce((sum, item) => sum + item.orders, 0)} subtext="Purchase orders" icon="🛒" />
          </div>

          {/* Monthly Trend */}
          <div className="mb-8 rounded-3xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0a0d14]">Monthly Purchase Trend</h2>
              <p className="text-sm text-[#6b7280]">Purchase amounts and order frequency</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-[rgba(0,0,0,0.08)]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Period</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Amount</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Orders</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Vendors</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Avg Order Value</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">vs Target</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseData.map((row, idx) => (
                    <tr key={idx} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[#f9fafb] transition cursor-pointer">
                      <td className="px-4 py-3 font-medium text-[#0a0d14]">{row.period}</td>
                      <td className="px-4 py-3 text-[#0a0d14] font-semibold">£{(row.amount / 1000).toFixed(0)}K</td>
                      <td className="px-4 py-3 text-[#0a0d14]">{row.orders}</td>
                      <td className="px-4 py-3 text-[#0a0d14]">{row.vendors}</td>
                      <td className="px-4 py-3 text-[#0a0d14]">£{row.avgOrder.toLocaleString()}</td>
                      <td className="px-4 py-3 text-[#0ec4a8] font-semibold">+5.2%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vendor Performance */}
          <div className="rounded-3xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0a0d14]">Vendor Performance</h2>
              <p className="text-sm text-[#6b7280]">Top vendors and their metrics</p>
            </div>

            <div className="space-y-3">
              {vendorPerformance.map((vendor, idx) => (
                <div key={idx} className="rounded-2xl border border-[rgba(0,0,0,0.04)] p-4 hover:bg-[#f9fafb] transition cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-[#0a0d14]">{vendor.name}</p>
                      <p className="text-xs text-[#6b7280] mt-1">{vendor.orders} orders</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#0a0d14]">£{(vendor.amount / 1000).toFixed(0)}K</p>
                      <p className="text-xs text-[#6b7280]">Total spend</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-3 border-t border-[rgba(0,0,0,0.04)]">
                    <div>
                      <p className="text-xs text-[#6b7280]">Rating</p>
                      <p className="mt-1 text-sm font-semibold text-[#f59e0b]">⭐ {vendor.rating}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6b7280]">On-Time Delivery</p>
                      <p className="mt-1 text-sm font-semibold text-[#0ec4a8]">{vendor.onTimeDelivery}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6b7280]">Reliability</p>
                      <div className="mt-1 h-2 w-full rounded-full bg-[#e5e7eb]">
                        <div className="h-full rounded-full bg-[#4f6ef7]" style={{ width: `${vendor.rating * 20}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
