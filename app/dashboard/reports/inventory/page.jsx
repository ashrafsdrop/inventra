import Link from "next/link";
import Sidebar from "../../Sidebar";

export const metadata = {
  title: "Inventory Reports | Inventra ERP",
  description: "Stock levels, product performance, and warehouse status",
};

const inventoryData = [
  { sku: "SKU-1024", product: "Apple iPhone 14", stock: 156, target: 200, reorder: 50, status: "ok" },
  { sku: "SKU-1025", product: "MacBook Air M2", stock: 42, target: 60, reorder: 15, status: "low" },
  { sku: "SKU-1026", product: "iPad Pro", stock: 89, target: 120, reorder: 30, status: "ok" },
  { sku: "SKU-1027", product: "AirPods Pro", stock: 12, target: 100, reorder: 40, status: "critical" },
  { sku: "SKU-1028", product: "Apple Watch", stock: 178, target: 150, reorder: 40, status: "ok" },
];

const categoryPerformance = [
  { category: "Electronics", value: 45000, items: 234, variance: "+12.5%" },
  { category: "Accessories", value: 28500, items: 567, variance: "+8.3%" },
  { category: "Office Supplies", value: 15200, items: 892, variance: "-2.1%" },
  { category: "Furniture", value: 32100, items: 156, variance: "+18.7%" },
];

const StatCard = ({ label, value, subtext, color }) => (
  <div className="rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
    <p className="text-sm text-[#6b7280]">{label}</p>
    <p className={`mt-2 text-2xl font-bold ${color}`}>{value}</p>
    <p className="mt-1 text-xs text-[#6b7280]">{subtext}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const statusStyles = {
    ok: "bg-[#0ec4a8]/15 text-[#0ec4a8]",
    low: "bg-[#f59e0b]/15 text-[#f59e0b]",
    critical: "bg-[#f43f5e]/15 text-[#f43f5e]",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[status]}`}>
      {status === "critical" ? "Critical" : status === "low" ? "Low Stock" : "In Stock"}
    </span>
  );
};

export default function InventoryReportsPage() {
  const totalValue = inventoryData.reduce((sum, item) => sum + item.stock * 100, 0);
  const lowStockCount = inventoryData.filter((item) => item.status !== "ok").length;

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="INVENTORY REPORTS" />

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <div className="flex items-center gap-2">
                <Link href="/dashboard/reports" className="text-[#6b7280] hover:text-[#4f6ef7]">
                  Reports
                </Link>
                <span className="text-[#d1d5db]">/</span>
                <span className="text-[#4f6ef7] font-semibold">Inventory</span>
              </div>
              <h1 className="mt-1 font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Inventory Reports</h1>
              <p className="text-sm text-[#6b7280]">Monitor stock levels, product performance, and warehouse status</p>
            </div>

            <button className="cursor-pointer rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition duration-200 hover:bg-[#3d5ce6]">
              Export Report
            </button>
          </div>
        </header>

        <section className="px-4 py-6 md:px-8 md:py-8">
          {/* Key Metrics */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
            <StatCard label="Total Inventory Value" value={`£${(totalValue / 1000).toFixed(0)}K`} subtext="Across all SKUs" color="text-[#0a0d14]" />
            <StatCard label="Total Items" value={inventoryData.reduce((sum, item) => sum + item.stock, 0)} subtext="Units in stock" color="text-[#0a0d14]" />
            <StatCard label="Low Stock Items" value={lowStockCount} subtext="Requires attention" color="text-[#f59e0b]" />
            <StatCard label="Active SKUs" value={inventoryData.length} subtext="Products tracked" color="text-[#0a0d14]" />
          </div>

          {/* Stock Status */}
          <div className="mb-8 rounded-3xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0a0d14]">Stock Status</h2>
              <p className="text-sm text-[#6b7280]">Current inventory levels vs targets</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-[rgba(0,0,0,0.08)]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">SKU</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Product</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Current</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Target</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Reorder Point</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#6b7280]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((item) => (
                    <tr key={item.sku} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[#f9fafb] transition cursor-pointer">
                      <td className="px-4 py-3 font-medium text-[#0a0d14]">{item.sku}</td>
                      <td className="px-4 py-3 text-[#0a0d14]">{item.product}</td>
                      <td className="px-4 py-3 text-[#0a0d14] font-semibold">{item.stock}</td>
                      <td className="px-4 py-3 text-[#6b7280]">{item.target}</td>
                      <td className="px-4 py-3 text-[#6b7280]">{item.reorder}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={item.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Category Performance */}
          <div className="rounded-3xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0a0d14]">Category Performance</h2>
              <p className="text-sm text-[#6b7280]">Inventory value by category</p>
            </div>

            <div className="space-y-4">
              {categoryPerformance.map((category, idx) => (
                <div key={idx} className="rounded-2xl border border-[rgba(0,0,0,0.04)] p-4 hover:bg-[#f9fafb] transition cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-medium text-[#0a0d14]">{category.category}</p>
                    <p className="text-sm font-semibold text-[#0ec4a8]">{category.variance}</p>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-2 w-full rounded-full bg-[#e5e7eb] mr-4">
                      <div className="h-full rounded-full bg-[#4f6ef7]" style={{ width: `${(category.value / 50000) * 100}%` }} />
                    </div>
                    <p className="text-sm font-semibold text-[#0a0d14] whitespace-nowrap">£{(category.value / 1000).toFixed(1)}K</p>
                  </div>
                  <p className="text-xs text-[#6b7280]">{category.items} items</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
