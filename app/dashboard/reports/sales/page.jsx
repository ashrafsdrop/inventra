'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "../../Sidebar";

const salesReportData = [
  { period: "January", sales: 145000, target: 150000, customers: 234, orders: 512 },
  { period: "February", sales: 168000, target: 150000, customers: 256, orders: 589 },
  { period: "March", sales: 152000, target: 150000, customers: 243, orders: 534 },
  { period: "April", sales: 178000, target: 150000, customers: 278, orders: 612 },
  { period: "May", sales: 192000, target: 150000, customers: 301, orders: 667 },
  { period: "June", sales: 186000, target: 150000, customers: 289, orders: 645 },
];

const StatCard = ({ label, value, change, tone }) => (
  <div className="rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm transition hover:shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-[#6b7280]">{label}</p>
        <p className="mt-2 text-2xl font-bold text-[#0a0d14]">{value}</p>
      </div>
      <div className={`rounded-2xl px-3 py-1 text-sm font-semibold ${tone}`}>
        {change}
      </div>
    </div>
  </div>
);

export default function SalesReportsPage() {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${API_BASE}/api/dashboard/summary/`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setTopProducts(data.top_products || []);
        }
      } catch (err) {
        console.error("Failed to fetch top products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopProducts();
  }, []);
  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="SALES REPORTS" />

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <div className="flex items-center gap-2">
                <Link href="/dashboard/reports" className="text-[#6b7280] hover:text-[#4f6ef7]">
                  Reports
                </Link>
                <span className="text-[#d1d5db]">/</span>
                <span className="text-[#4f6ef7] font-semibold">Sales</span>
              </div>
              <h1 className="mt-1 font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Sales Reports</h1>
              <p className="text-sm text-[#6b7280]">Track sales performance, revenue trends, and customer insights</p>
            </div>

            <button className="cursor-pointer rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition duration-200 hover:bg-[#3d5ce6]">
              Export Report
            </button>
          </div>
        </header>

        <section className="px-4 py-6 md:px-8 md:py-8">
          {/* Key Metrics */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
            <StatCard label="Total Sales" value="£1.22M" change="+15.3%" tone="bg-[#0ec4a8]/15 text-[#0ec4a8]" />
            <StatCard label="Avg Order Value" value="£2,450" change="+8.2%" tone="bg-[#4f6ef7]/15 text-[#4f6ef7]" />
            <StatCard label="Conversion Rate" value="3.84%" change="+2.1%" tone="bg-emerald-500/15 text-emerald-600" />
            <StatCard label="Customer Count" value="1,934" change="+12.7%" tone="bg-purple-500/15 text-purple-600" />
          </div>

          {/* Monthly Performance */}
          <div className="mb-8 rounded-3xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0a0d14]">Monthly Performance</h2>
              <p className="text-sm text-[#6b7280]">Sales against target</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-[rgba(0,0,0,0.08)]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Period</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Sales</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Target</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Variance</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Customers</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {salesReportData.map((row) => (
                    <tr key={row.period} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[#f9fafb] transition cursor-pointer">
                      <td className="px-4 py-3 font-medium text-[#0a0d14]">{row.period}</td>
                      <td className="px-4 py-3 text-[#0a0d14]">£{(row.sales / 1000).toFixed(0)}K</td>
                      <td className="px-4 py-3 text-[#6b7280]">£{(row.target / 1000).toFixed(0)}K</td>
                      <td className="px-4 py-3">
                        <span className={`font-semibold ${row.sales >= row.target ? "text-[#0ec4a8]" : "text-[#f43f5e]"}`}>
                          {row.sales >= row.target ? "+" : "-"}£{Math.abs((row.sales - row.target) / 1000).toFixed(0)}K
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#0a0d14]">{row.customers}</td>
                      <td className="px-4 py-3 text-[#0a0d14]">{row.orders}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="rounded-3xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0a0d14]">Top Products</h2>
              <p className="text-sm text-[#6b7280]">Best performing products by revenue</p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-[#6b7280]">Loading top products...</p>
              </div>
            ) : topProducts.length > 0 ? (
              <div className="space-y-4">
                {topProducts.map((product, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-2xl border border-[rgba(0,0,0,0.04)] p-4 hover:bg-[#f9fafb] transition cursor-pointer">
                    <div className="flex-1">
                      <p className="font-medium text-[#0a0d14]">{product.name}</p>
                      <p className="text-sm text-[#6b7280]">{product.quantity.toLocaleString()} units sold</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#0a0d14]">{product.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-[#6b7280]">No top products data available</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
