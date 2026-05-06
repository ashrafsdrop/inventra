import Link from "next/link";
import Sidebar from "../../Sidebar";

export const metadata = {
  title: "Vendor Analytics | Inventra ERP",
  description: "Vendor performance, reliability, and cost efficiency",
};

const vendorData = [
  {
    name: "TechSupply Co.",
    spend: 245000,
    orders: 28,
    rating: 4.8,
    onTime: 98,
    quality: 96,
    leadTime: 5.2,
    cost: 8.5,
    trend: "up",
  },
  {
    name: "Global Distributors",
    spend: 189000,
    orders: 22,
    rating: 4.5,
    onTime: 95,
    quality: 92,
    leadTime: 6.1,
    cost: 9.2,
    trend: "down",
  },
  {
    name: "Prime Vendors",
    spend: 167000,
    orders: 19,
    rating: 4.2,
    onTime: 92,
    quality: 89,
    leadTime: 7.3,
    cost: 9.8,
    trend: "up",
  },
  {
    name: "Quality Import",
    spend: 142000,
    orders: 16,
    rating: 4.6,
    onTime: 97,
    quality: 94,
    leadTime: 5.8,
    cost: 8.9,
    trend: "up",
  },
  {
    name: "Trade Partners",
    spend: 128000,
    orders: 14,
    rating: 3.9,
    onTime: 88,
    quality: 85,
    leadTime: 8.5,
    cost: 10.2,
    trend: "down",
  },
];

const performanceMetrics = [
  { label: "Active Vendors", value: vendorData.length, icon: "🏢" },
  { label: "Total Spend", value: `£${(vendorData.reduce((sum, v) => sum + v.spend, 0) / 1000).toFixed(0)}K`, icon: "💷" },
  { label: "Avg Rating", value: (vendorData.reduce((sum, v) => sum + v.rating, 0) / vendorData.length).toFixed(1), icon: "⭐" },
  { label: "Avg On-Time %", value: `${Math.round(vendorData.reduce((sum, v) => sum + v.onTime, 0) / vendorData.length)}%`, icon: "✓" },
];

const RatingStars = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={i < Math.floor(rating) ? "text-amber-400" : "text-gray-300"}>
        ★
      </span>
    ))}
    <span className="ml-2 text-sm font-semibold text-[#0a0d14]">{rating}</span>
  </div>
);

export default function VendorAnalyticsPage() {
  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="VENDOR ANALYTICS" />

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <div className="flex items-center gap-2">
                <Link href="/dashboard/reports" className="text-[#6b7280] hover:text-[#4f6ef7]">
                  Reports
                </Link>
                <span className="text-[#d1d5db]">/</span>
                <span className="text-[#4f6ef7] font-semibold">Vendor Analytics</span>
              </div>
              <h1 className="mt-1 font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Vendor Analytics</h1>
              <p className="text-sm text-[#6b7280]">Evaluate vendor performance, reliability, and cost efficiency</p>
            </div>

            <button className="cursor-pointer rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition duration-200 hover:bg-[#3d5ce6]">
              Export Report
            </button>
          </div>
        </header>

        <section className="px-4 py-6 md:px-8 md:py-8">
          {/* Performance Overview */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
            {performanceMetrics.map((metric, idx) => (
              <div key={idx} className="rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[#6b7280]">{metric.label}</p>
                    <p className="mt-2 text-2xl font-bold text-[#0a0d14]">{metric.value}</p>
                  </div>
                  <span className="text-3xl">{metric.icon}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Vendor Performance Details */}
          <div className="rounded-3xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0a0d14]">Vendor Performance</h2>
              <p className="text-sm text-[#6b7280]">Detailed metrics for all vendors</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-[rgba(0,0,0,0.08)]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Vendor</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Total Spend</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Orders</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Rating</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">On-Time %</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Quality</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Avg Lead Time</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Cost Index</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorData.map((vendor, idx) => (
                    <tr key={idx} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[#f9fafb] transition cursor-pointer">
                      <td className="px-4 py-3 font-medium text-[#0a0d14]">{vendor.name}</td>
                      <td className="px-4 py-3 text-[#0a0d14] font-semibold">£{(vendor.spend / 1000).toFixed(0)}K</td>
                      <td className="px-4 py-3 text-[#0a0d14]">{vendor.orders}</td>
                      <td className="px-4 py-3">
                        <RatingStars rating={vendor.rating} />
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full px-2 py-1 bg-[#0ec4a8]/15 text-[#0ec4a8] font-semibold text-xs">
                          {vendor.onTime}%
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#0a0d14]">{vendor.quality}%</td>
                      <td className="px-4 py-3 text-[#0a0d14]">{vendor.leadTime} days</td>
                      <td className="px-4 py-3">
                        <span className="text-[#0a0d14] font-semibold">{vendor.cost}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vendor Scorecard */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vendorData.slice(0, 3).map((vendor, idx) => (
              <div key={idx} className="rounded-3xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm hover:shadow-lg transition cursor-pointer">
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="font-bold text-[#0a0d14]">{vendor.name}</h3>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    vendor.trend === "up"
                      ? "bg-[#0ec4a8]/15 text-[#0ec4a8]"
                      : "bg-[#f59e0b]/15 text-[#f59e0b]"
                  }`}>
                    {vendor.trend === "up" ? "↑" : "↓"} Trend
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#6b7280]">On-Time Delivery</span>
                      <span className="text-sm font-semibold text-[#0a0d14]">{vendor.onTime}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[#e5e7eb]">
                      <div className="h-full rounded-full bg-[#4f6ef7]" style={{ width: `${vendor.onTime}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#6b7280]">Quality Score</span>
                      <span className="text-sm font-semibold text-[#0a0d14]">{vendor.quality}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[#e5e7eb]">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${vendor.quality}%` }} />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[rgba(0,0,0,0.08)]">
                    <p className="text-xs text-[#6b7280] mb-3">Key Metrics</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-[#f9fafb] p-3">
                        <p className="text-xs text-[#6b7280]">Avg Lead Time</p>
                        <p className="mt-1 text-sm font-bold text-[#0a0d14]">{vendor.leadTime}d</p>
                      </div>
                      <div className="rounded-lg bg-[#f9fafb] p-3">
                        <p className="text-xs text-[#6b7280]">Total Spend</p>
                        <p className="mt-1 text-sm font-bold text-[#0a0d14]">£{(vendor.spend / 1000).toFixed(0)}K</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
