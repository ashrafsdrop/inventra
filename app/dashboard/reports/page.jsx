import Link from "next/link";
import Sidebar from "../Sidebar";

export const metadata = {
  title: "Reports | Inventra ERP",
  description: "Comprehensive business reports and analytics",
};

const reportCategories = [
  {
    title: "Sales Reports",
    description: "Track sales performance, revenue trends, and customer insights",
    href: "/dashboard/reports/sales",
    icon: "📊",
    color: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-500/30",
  },
  {
    title: "Inventory Reports",
    description: "Monitor stock levels, product performance, and warehouse status",
    href: "/dashboard/reports/inventory",
    icon: "📦",
    color: "from-emerald-500/20 to-emerald-600/20",
    borderColor: "border-emerald-500/30",
  },
  {
    title: "Purchase Reports",
    description: "Analyze purchase trends, vendor performance, and order history",
    href: "/dashboard/reports/purchase",
    icon: "🛒",
    color: "from-purple-500/20 to-purple-600/20",
    borderColor: "border-purple-500/30",
  },
  {
    title: "Financial Reports",
    description: "View financial statements, profit & loss, and cash flow analysis",
    href: "/dashboard/reports/financial",
    icon: "💰",
    color: "from-amber-500/20 to-amber-600/20",
    borderColor: "border-amber-500/30",
  },
  {
    title: "Customer Analytics",
    description: "Analyze customer behavior, lifetime value, and segmentation",
    href: "/dashboard/reports/customer",
    icon: "👥",
    color: "from-pink-500/20 to-pink-600/20",
    borderColor: "border-pink-500/30",
  },
  {
    title: "Vendor Analytics",
    description: "Evaluate vendor performance, reliability, and cost efficiency",
    href: "/dashboard/reports/vendor",
    icon: "🏢",
    color: "from-indigo-500/20 to-indigo-600/20",
    borderColor: "border-indigo-500/30",
  },
];

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="Reports" />

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <h1 className="font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Reports</h1>
              <p className="text-sm text-[#6b7280]">Comprehensive business analytics and reporting</p>
            </div>

            <button className="cursor-pointer rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] shadow-sm transition duration-200 hover:border-[#4f6ef7] hover:text-[#4f6ef7] hover:scale-105 hover:shadow-md">
              Export All
            </button>
          </div>
        </header>

        <section className="px-4 py-6 md:px-8 md:py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reportCategories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group relative overflow-hidden rounded-3xl border transition-all duration-300 hover:shadow-lg"
                style={{
                  borderColor: "rgba(0,0,0,0.08)",
                  background: "white",
                }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                {/* Content */}
                <div className="relative p-6">
                  <div className="mb-4 text-4xl">{category.icon}</div>

                  <h3 className="mb-2 text-lg font-bold text-[#0a0d14] transition-colors duration-300 group-hover:text-[#4f6ef7]">
                    {category.title}
                  </h3>

                  <p className="mb-4 text-sm text-[#6b7280] transition-colors duration-300 group-hover:text-[#525e7f]">
                    {category.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-semibold text-[#4f6ef7] transition-all duration-300 group-hover:gap-3">
                    View Report
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-[#4f6ef7] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
