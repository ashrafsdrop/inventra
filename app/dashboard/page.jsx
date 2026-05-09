import RevenueTrendChart from "./RevenueTrendChart";
import CashCollectionChart from "./CashCollectionChart";
import Sidebar from "./Sidebar";
import DashboardMetricCard from "./components/DashboardMetricCard";
import SectionHeader from "./components/SectionHeader";
import DataTableCard from "./components/DataTableCard";
import StatusBadge from "./components/StatusBadge";
import DashboardAuthMenu from "./components/DashboardAuthMenu";

export const metadata = {
  title: "Dashboard | Inventra ERP",
  description: "Operational dashboard for sales, inventory, purchasing, finance, and reporting.",
};

const formatPercent = (value, max) => `${Math.round((value / max) * 100)}%`;

export default async function DashboardPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  let summary = {};
  try {
    const res = await fetch(`${API_BASE}/api/dashboard/summary/`, { cache: "no-store" });
    if (res.ok) summary = await res.json();
  } catch (err) {
    console.error("Failed to fetch dashboard summary:", err);
  }

  const metricsData = summary.metrics || [];
  const chartData = summary.chart_data || [];
  const lowStockItems = summary.low_stock_products || [];
  const recentTransactionRows = summary.recent_transactions || [];
  const topCustomerRows = summary.top_customers || [];
  const topProductRows = summary.top_products || [];
  const cashCollection = summary.cash_collection || { paid: "£0", due: "£0", returns: "£0" };
  const cashCollectionChart = summary.cash_collection_chart || [];
  const collectedSlice = cashCollectionChart.find((entry) => entry.name === "Paid");
  const collectionCenterValue = collectedSlice ? `${collectedSlice.value}%` : "0%";

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="Dashboard" />

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <div className="lg:hidden flex items-center gap-2 font-['Syne',sans-serif] font-extrabold text-[20px] tracking-tight text-[#0a0d14]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4f6ef7]" />
                Inventra
              </div>
              <h1 className="hidden lg:block font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Dashboard</h1>
              <p className="hidden lg:block text-sm text-[#6b7280]">Operational overview for sales, finance, and inventory</p>
            </div>

            <div className="flex flex-1 items-center justify-end gap-3">
              <DashboardAuthMenu />
              <label className="hidden md:flex min-w-[240px] max-w-[360px] flex-1 items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm text-[#6b7280] shadow-sm">
                <span>⌕</span>
                <input className="w-full bg-transparent outline-none placeholder:text-[#9ca3af]" placeholder="Search customers, products, orders" />
              </label>
              <button className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] shadow-sm transition duration-200 hover:border-[#4f6ef7] hover:text-[#4f6ef7] hover:scale-105 hover:shadow-md">
                Create Sale
              </button>
              <button className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition duration-200 hover:bg-[#3d5ce6] hover:scale-105 hover:shadow-xl hover:shadow-[#4f6ef7]/35">
                New Purchase
              </button>
              <button className="cursor-pointer rounded-full border border-[rgba(0,0,0,0.08)] bg-white p-3 text-[#2e3347] shadow-sm transition duration-200 hover:border-[#4f6ef7] hover:text-[#4f6ef7] hover:scale-110 hover:shadow-md">⚙</button>
            </div>
          </div>
        </header>

        <section className="px-4 py-6 md:px-8 md:py-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metricsData.map((metric) => (
              <DashboardMetricCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                change={metric.change}
                tone={metric.tone}
                iconStroke={metric.tone.includes("f43f5e") ? "#f43f5e" : metric.tone.includes("f59e0b") ? "#f59e0b" : metric.tone.includes("0ec4a8") ? "#0ec4a8" : "#4f6ef7"}
              />
            ))}
          </div>
        </section>

        <section className="px-4 pb-6 md:px-8">
          <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
            <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-6 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
              <SectionHeader
                title="Revenue Trend"
                description="Monthly sales and purchase movement across the last 12 months"
                badge="Live data"
              />

              <div className="mt-6 h-[320px]">
                <RevenueTrendChart data={chartData} />
              </div>
            </article>

            <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-6 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
              <SectionHeader
                title="Cash Collection"
                description="Paid, due, and returns from the backend summary"
                badge="Live data"
              />

              <div className="mt-8">
                <CashCollectionChart data={cashCollectionChart} centerValue={collectionCenterValue} centerLabel="Collected" />
              </div>

              <div className="mt-8 grid gap-3">
                <div className="flex items-center justify-between rounded-2xl bg-[#f4f6fb] px-4 py-3 text-sm">
                  <span className="flex items-center gap-2 text-[#2e3347]"><span className="h-2.5 w-2.5 rounded-full bg-[#4f6ef7]" /> Paid</span>
                  <span className="font-semibold text-[#0a0d14]">{cashCollection.paid}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-[#f4f6fb] px-4 py-3 text-sm">
                  <span className="flex items-center gap-2 text-[#2e3347]"><span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" /> Due</span>
                  <span className="font-semibold text-[#0a0d14]">{cashCollection.due}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-[#f4f6fb] px-4 py-3 text-sm">
                  <span className="flex items-center gap-2 text-[#2e3347]"><span className="h-2.5 w-2.5 rounded-full bg-[#f43f5e]" /> Returns</span>
                  <span className="font-semibold text-[#0a0d14]">{cashCollection.returns}</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="px-4 pb-6 md:px-8">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-6 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
              <SectionHeader
                title="Low Stock Alerts"
                description="Products that need replenishment soon"
                badge={`${summary.low_stock_alerts ?? lowStockItems.length} items`}
              />

              <div className="mt-6 space-y-4">
                {lowStockItems.map((item) => (
                  <div key={item.sku} className="rounded-2xl border border-[rgba(0,0,0,0.07)] p-4 cursor-pointer transition hover:bg-[#f4f6fb]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="font-semibold text-[#0a0d14]">{item.item}</div>
                        <div className="text-xs text-[#6b7280]">{item.sku}</div>
                      </div>
                      <div className="text-right text-sm font-semibold text-[#f43f5e]">{item.stock} left</div>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-[#eef2f7]">
                      <div
                        className="h-2 rounded-full bg-[#4f6ef7]"
                        style={{ width: formatPercent(item.stock, item.target) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <DataTableCard
              title="Recent Transactions"
              description="Latest sales and purchases across the business"
              badge="Live feed"
              columns={[
                { label: "ID" },
                { label: "Account" },
                { label: "Type" },
                { label: "Amount" },
                { label: "Status" },
              ]}
              rows={recentTransactionRows}
              rowKey={(row) => row.id}
              renderRow={(row) => (
                <tr key={row.id} className="border-t border-[rgba(0,0,0,0.05)] cursor-pointer transition hover:bg-[#f9fafb]">
                  <td className="px-4 py-3 font-medium text-[#0a0d14]">{row.id}</td>
                  <td className="px-4 py-3 text-[#2e3347]">{row.title}</td>
                  <td className="px-4 py-3 text-[#6b7280]">{row.type}</td>
                  <td className="px-4 py-3 font-semibold text-[#0a0d14]">{row.amount}</td>
                  <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                </tr>
              )}
            />
          </div>
        </section>

        <section className="px-4 pb-8 md:px-8">
          <div className="grid gap-6 xl:grid-cols-2">
            <DataTableCard
              title="Top Customers"
              description="Highest value customers by total sales"
              badge="Top 5"
              columns={[
                { label: "Customer" },
                { label: "Total Sales" },
                { label: "Phone" },
              ]}
              rows={topCustomerRows}
              rowKey={(customer) => customer.name}
              renderRow={(customer) => (
                <tr key={customer.name} className="border-t border-[rgba(0,0,0,0.05)] cursor-pointer transition hover:bg-[#f9fafb]">
                  <td className="px-4 py-3 font-medium text-[#0a0d14]">{customer.name}</td>
                  <td className="px-4 py-3 font-semibold text-[#4f6ef7]">{customer.sales}</td>
                  <td className="px-4 py-3 text-[#6b7280]">{customer.phone}</td>
                </tr>
              )}
            />

            <DataTableCard
              title="Top Products"
              description="Best-selling items this season"
              badge="Top 5"
              columns={[
                { label: "Product" },
                { label: "Qty", align: "right" },
                { label: "Amount", align: "right" },
              ]}
              rows={topProductRows}
              rowKey={(product) => product.name}
              renderRow={(product) => (
                <tr key={product.name} className="border-t border-[rgba(0,0,0,0.05)] cursor-pointer transition hover:bg-[#f9fafb]">
                  <td className="px-4 py-3 font-medium text-[#0a0d14]">{product.name}</td>
                  <td className="px-4 py-3 text-right text-[#2e3347]">{product.quantity.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-semibold text-[#0a0d14]">{product.amount}</td>
                </tr>
              )}
            />
          </div>
        </section>

        <div className="px-4 pb-8 md:px-8">
          <div className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white px-6 py-4 text-center text-xs text-[#6b7280] shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
            Inventra ERP dashboard · live data loaded from the backend API
          </div>
        </div>
      </div>
    </main>
  );
}
