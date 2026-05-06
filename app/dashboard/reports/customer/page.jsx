import Link from "next/link";
import Sidebar from "../../Sidebar";

export const metadata = {
  title: "Customer Analytics | Inventra ERP",
  description: "Customer behavior, lifetime value, and segmentation",
};

const customerSegments = [
  { segment: "Premium", count: 145, totalValue: 1850000, avgValue: 12759, retention: "95%" },
  { segment: "Core", count: 512, totalValue: 1280000, avgValue: 2500, retention: "78%" },
  { segment: "Growth", count: 287, totalValue: 328000, avgValue: 1143, retention: "62%" },
  { segment: "At Risk", count: 98, totalValue: 42000, avgValue: 429, retention: "35%" },
];

const topCustomers = [
  { name: "Apple Inc.", totalSales: 245000, orders: 42, lastOrder: "2 days ago", status: "Active" },
  { name: "HP Enterprise", totalSales: 187000, orders: 38, lastOrder: "5 days ago", status: "Active" },
  { name: "Microsoft Corp", totalSales: 156000, orders: 31, lastOrder: "1 week ago", status: "Active" },
  { name: "Dell Technologies", totalSales: 142000, orders: 28, lastOrder: "10 days ago", status: "Active" },
  { name: "IKEA Systems", totalSales: 128000, orders: 24, lastOrder: "2 weeks ago", status: "Inactive" },
];

const customerMetrics = [
  { label: "Total Customers", value: 1042, change: "+12.5%" },
  { label: "New Customers", value: 156, change: "+8.3%" },
  { label: "Avg Customer Value", value: "£2,847", change: "+15.2%" },
  { label: "Customer Retention", value: "81.3%", change: "+3.1%" },
];

const StatCard = ({ label, value, change }) => (
  <div className="rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
    <p className="text-sm text-[#6b7280]">{label}</p>
    <p className="mt-2 text-2xl font-bold text-[#0a0d14]">{value}</p>
    <p className="mt-1 text-xs font-semibold text-[#0ec4a8]">{change}</p>
  </div>
);

export default function CustomerAnalyticsPage() {
  const totalCustomers = customerSegments.reduce((sum, seg) => sum + seg.count, 0);
  const totalValue = customerSegments.reduce((sum, seg) => sum + seg.totalValue, 0);

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="CUSTOMER ANALYTICS" />

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <div className="flex items-center gap-2">
                <Link href="/dashboard/reports" className="text-[#6b7280] hover:text-[#4f6ef7]">
                  Reports
                </Link>
                <span className="text-[#d1d5db]">/</span>
                <span className="text-[#4f6ef7] font-semibold">Customer Analytics</span>
              </div>
              <h1 className="mt-1 font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Customer Analytics</h1>
              <p className="text-sm text-[#6b7280]">Analyze customer behavior, lifetime value, and segmentation</p>
            </div>

            <button className="cursor-pointer rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition duration-200 hover:bg-[#3d5ce6]">
              Export Report
            </button>
          </div>
        </header>

        <section className="px-4 py-6 md:px-8 md:py-8">
          {/* Key Metrics */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
            {customerMetrics.map((metric, idx) => (
              <StatCard key={idx} label={metric.label} value={metric.value} change={metric.change} />
            ))}
          </div>

          {/* Customer Segmentation */}
          <div className="mb-8 rounded-3xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0a0d14]">Customer Segmentation</h2>
              <p className="text-sm text-[#6b7280]">Customers grouped by value and engagement</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {customerSegments.map((segment, idx) => {
                const colors = {
                  Premium: { bg: "from-amber-500/20 to-amber-600/20", text: "text-amber-600", bar: "bg-amber-500" },
                  Core: { bg: "from-blue-500/20 to-blue-600/20", text: "text-blue-600", bar: "bg-blue-500" },
                  Growth: { bg: "from-emerald-500/20 to-emerald-600/20", text: "text-emerald-600", bar: "bg-emerald-500" },
                  "At Risk": { bg: "from-red-500/20 to-red-600/20", text: "text-red-600", bar: "bg-red-500" },
                };
                const color = colors[segment.segment];

                return (
                  <div key={idx} className={`rounded-2xl bg-gradient-to-br ${color.bg} border border-[rgba(0,0,0,0.08)] p-5 cursor-pointer hover:shadow-md transition`}>
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <p className={`font-bold ${color.text} text-lg`}>{segment.segment}</p>
                        <p className="text-sm text-[#6b7280]">{segment.count} customers</p>
                      </div>
                      <p className="text-right font-semibold text-[#0a0d14]">£{(segment.totalValue / 1000).toFixed(0)}K</p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-[rgba(0,0,0,0.08)]">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#6b7280]">Avg Value</span>
                        <span className="font-semibold text-[#0a0d14]">£{segment.avgValue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#6b7280]">Retention</span>
                        <span className={`font-semibold ${color.text}`}>{segment.retention}</span>
                      </div>
                      <div className="mt-3 h-2 w-full rounded-full bg-white/50">
                        <div className={`h-full rounded-full ${color.bar}`} style={{ width: segment.retention }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Customers */}
          <div className="rounded-3xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0a0d14]">Top Customers</h2>
              <p className="text-sm text-[#6b7280]">Highest-value customer accounts</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-[rgba(0,0,0,0.08)]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Customer</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Total Sales</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Orders</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Last Order</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {topCustomers.map((customer, idx) => (
                    <tr key={idx} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[#f9fafb] transition cursor-pointer">
                      <td className="px-4 py-3 font-medium text-[#0a0d14]">{customer.name}</td>
                      <td className="px-4 py-3 text-[#0a0d14] font-semibold">£{(customer.totalSales / 1000).toFixed(0)}K</td>
                      <td className="px-4 py-3 text-[#0a0d14]">{customer.orders}</td>
                      <td className="px-4 py-3 text-[#6b7280]">{customer.lastOrder}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          customer.status === "Active"
                            ? "bg-[#0ec4a8]/15 text-[#0ec4a8]"
                            : "bg-[#f59e0b]/15 text-[#f59e0b]"
                        }`}>
                          {customer.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
