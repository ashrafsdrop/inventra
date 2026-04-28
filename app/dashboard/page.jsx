import RevenueTrendChart from "./RevenueTrendChart";
import CashCollectionChart from "./CashCollectionChart";
import Sidebar from "./Sidebar";
import DashboardMetricCard from "./components/DashboardMetricCard";
import SectionHeader from "./components/SectionHeader";
import DataTableCard from "./components/DataTableCard";
import StatusBadge from "./components/StatusBadge";

export const metadata = {
  title: "Dashboard | Inventra ERP",
  description: "Operational dashboard for sales, inventory, purchasing, finance, and reporting.",
};

const metrics = [
  { label: "Today Sales", value: "£113.2M", change: "+12.4%", tone: "text-[#0ec4a8]" },
  { label: "Sales Due", value: "£59.3M", change: "+3.1%", tone: "text-[#f43f5e]" },
  { label: "Purchase Amount", value: "£13.7M", change: "+8.6%", tone: "text-[#4f6ef7]" },
  { label: "Purchase Due", value: "£7.0M", change: "+1.9%", tone: "text-[#f59e0b]" },
];

const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
const revenueSeries = [42, 58, 72, 67, 63, 66, 78, 71, 69, 73, 76, 74];
const purchaseSeries = [18, 21, 24, 20, 26, 29, 27, 24, 23, 25, 28, 26];
const chartData = months.map((month, index) => ({
  month,
  revenue: revenueSeries[index],
  purchase: purchaseSeries[index],
}));

const lowStock = [
  { sku: "SKU-1024", item: "Apple iPhone 14", stock: 12, target: 50 },
  { sku: "SKU-1148", item: "MacBook Air M2", stock: 7, target: 25 },
  { sku: "SKU-2081", item: "Office Chair Pro", stock: 18, target: 40 },
  { sku: "SKU-3220", item: "Laser Printer X2", stock: 4, target: 20 },
];

const recentTransactions = [
  { id: "TX-10428", title: "Apple Inc.", type: "Sale", amount: "£245,000", status: "Paid" },
  { id: "TX-10429", title: "HP Enterprise", type: "Purchase", amount: "£187,000", status: "Due" },
  { id: "TX-10430", title: "Microsoft Corp", type: "Sale", amount: "£135,000", status: "Paid" },
  { id: "TX-10431", title: "IKEA Systems", type: "Purchase", amount: "£62,000", status: "Return" },
];

const topProducts = [
  { name: "Apple iPhone 13", quantity: 1240, amount: "£992,000" },
  { name: "Apple MacBook Air (M2)", quantity: 412, amount: "£576,800" },
  { name: "Apple iPhone 14", quantity: 890, amount: "£756,500" },
  { name: "HP 240 G8 Core i5", quantity: 327, amount: "£228,900" },
  { name: "Cupboard - Florida 3 Door", quantity: 185, amount: "£46,250" },
];

const topCustomers = [
  { name: "Apple Inc.", sales: "£2.45M", phone: "+1 (800) 275-2273" },
  { name: "HP Enterprise", sales: "£1.87M", phone: "+1 (650) 857-1501" },
  { name: "Microsoft Corp", sales: "£1.35M", phone: "+1 (425) 882-8080" },
  { name: "Dell Technologies", sales: "£1.12M", phone: "+1 (800) 624-9897" },
  { name: "IKEA Systems", sales: "£620K", phone: "+46 8 586 933 00" },
];

const formatPercent = (value, max) => `${Math.round((value / max) * 100)}%`;

export default function DashboardPage() {
  const revenueMax = Math.max(...revenueSeries);
  const purchaseMax = Math.max(...purchaseSeries);

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
            {metrics.map((metric) => (
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
                description="Monthly sales and purchase movement across the fiscal year"
                badge="Apr 2025 - Mar 2026"
              />

              <div className="mt-6 h-[320px]">
                <RevenueTrendChart data={chartData} />
              </div>
            </article>

            <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-6 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
              <SectionHeader
                title="Cash Collection"
                description="Paid, due, and returns across the current period"
                badge="Today"
              />

              <div className="mt-8">
                <CashCollectionChart />
              </div>

              <div className="mt-8 grid gap-3">
                <div className="flex items-center justify-between rounded-2xl bg-[#f4f6fb] px-4 py-3 text-sm">
                  <span className="flex items-center gap-2 text-[#2e3347]"><span className="h-2.5 w-2.5 rounded-full bg-[#4f6ef7]" /> Paid</span>
                  <span className="font-semibold text-[#0a0d14]">£62.8M</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-[#f4f6fb] px-4 py-3 text-sm">
                  <span className="flex items-center gap-2 text-[#2e3347]"><span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" /> Due</span>
                  <span className="font-semibold text-[#0a0d14]">£59.3M</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-[#f4f6fb] px-4 py-3 text-sm">
                  <span className="flex items-center gap-2 text-[#2e3347]"><span className="h-2.5 w-2.5 rounded-full bg-[#f43f5e]" /> Returns</span>
                  <span className="font-semibold text-[#0a0d14]">£0</span>
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
                badge="4 items"
              />

              <div className="mt-6 space-y-4">
                {lowStock.map((item) => (
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
              rows={recentTransactions}
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
              rows={topCustomers}
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
              rows={topProducts}
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
            Inventra ERP dashboard demo · data shown for presentation only
          </div>
        </div>
      </div>
    </main>
  );
}
