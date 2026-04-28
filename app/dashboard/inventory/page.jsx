'use client';

import Link from 'next/link';
import Sidebar from '../Sidebar';

export default function InventoryHub() {
  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="Inventory" />

      <div className="lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <h1 className="font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Inventory Management</h1>
              <p className="text-sm text-[#6b7280]">Manage products, categories, stock levels, and inventory operations</p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/inventory/products"
                className="cursor-pointer inline-flex items-center gap-2 rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6]"
              >
                ➕ Add Product
              </Link>
              <Link
                href="/dashboard/inventory/catalog"
                className="cursor-pointer inline-flex items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] shadow-sm transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]"
              >
                ➕ New Category
              </Link>
            </div>
          </div>
        </header>

        {/* Inventory Cards */}
        <section className="px-4 py-6 md:px-8 md:py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Products Card */}
            <Link href="/dashboard/inventory/products">
              <article className="group cursor-pointer rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-8 shadow-[0_12px_40px_rgba(10,13,20,0.05)] transition hover:shadow-[0_20px_50px_rgba(79,110,247,0.1)] hover:border-[#4f6ef7]">
                <div className="mb-4 text-5xl">📦</div>
                <h2 className="font-['Poppins',sans-serif] text-xl font-bold text-[#0a0d14] group-hover:text-[#4f6ef7] transition">Products</h2>
                <p className="mt-2 text-sm text-[#6b7280]">Manage all products, pricing, and stock levels</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#4f6ef7] group-hover:gap-3 transition">
                  View Products
                  <span>→</span>
                </div>
              </article>
            </Link>

            {/* Catalog Card */}
            <Link href="/dashboard/inventory/catalog">
              <article className="group cursor-pointer rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-8 shadow-[0_12px_40px_rgba(10,13,20,0.05)] transition hover:shadow-[0_20px_50px_rgba(79,110,247,0.1)] hover:border-[#4f6ef7]">
                <div className="mb-4 text-5xl">📂</div>
                <h2 className="font-['Poppins',sans-serif] text-xl font-bold text-[#0a0d14] group-hover:text-[#4f6ef7] transition">Categories</h2>
                <p className="mt-2 text-sm text-[#6b7280]">Organize and manage product categories</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#4f6ef7] group-hover:gap-3 transition">
                  View Categories
                  <span>→</span>
                </div>
              </article>
            </Link>

            {/* Stock Levels Card */}
            <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-8 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
              <div className="mb-4 text-5xl">📊</div>
              <h2 className="font-['Poppins',sans-serif] text-xl font-bold text-[#0a0d14]">Stock Levels</h2>
              <p className="mt-2 text-sm text-[#6b7280]">Monitor inventory levels and reorder points</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#4f6ef7]">48</div>
                  <div className="text-xs text-[#6b7280]">Low Stock</div>
                </div>
                <div className="h-12 w-px bg-[rgba(0,0,0,0.07)]" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#f43f5e]">3</div>
                  <div className="text-xs text-[#6b7280]">Out of Stock</div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="px-4 pb-8 md:px-8">
          <div className="grid gap-4 md:grid-cols-4">
            <article className="rounded-2xl border border-[rgba(0,0,0,0.07)] bg-white p-4 shadow-sm">
              <div className="text-xs font-medium uppercase tracking-[0.24em] text-[#6b7280]">Total Products</div>
              <div className="mt-2 text-2xl font-bold text-[#0a0d14]">1,247</div>
            </article>
            <article className="rounded-2xl border border-[rgba(0,0,0,0.07)] bg-white p-4 shadow-sm">
              <div className="text-xs font-medium uppercase tracking-[0.24em] text-[#6b7280]">Categories</div>
              <div className="mt-2 text-2xl font-bold text-[#0a0d14]">24</div>
            </article>
            <article className="rounded-2xl border border-[rgba(0,0,0,0.07)] bg-white p-4 shadow-sm">
              <div className="text-xs font-medium uppercase tracking-[0.24em] text-[#6b7280]">Total Value</div>
              <div className="mt-2 text-2xl font-bold text-[#0a0d14]">£2.4M</div>
            </article>
            <article className="rounded-2xl border border-[rgba(0,0,0,0.07)] bg-white p-4 shadow-sm">
              <div className="text-xs font-medium uppercase tracking-[0.24em] text-[#6b7280]">Reorder Points</div>
              <div className="mt-2 text-2xl font-bold text-[#0a0d14]">127</div>
            </article>
          </div>
        </section>

        {/* New Dashboard Sections */}
        <section className="px-4 pb-8 md:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Activity */}
            <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-6 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Poppins',sans-serif] text-lg font-bold text-[#0a0d14]">Recent Activity</h2>
                <button className="cursor-pointer text-sm font-medium text-[#4f6ef7] hover:text-[#3d5ce6] transition">View All</button>
              </div>
              <div className="space-y-3">
                {[
                  { id: 1, action: 'Stock Added', item: 'Apple iPhone 15', qty: '+50', time: '2 hours ago', icon: '📥', color: 'text-[#0ec4a8]', bg: 'bg-[#0ec4a8]/10' },
                  { id: 2, action: 'Stock Removed', item: 'Dell Monitor 27"', qty: '-12', time: '5 hours ago', icon: '📤', color: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/10' },
                  { id: 3, action: 'New Product', item: 'MacBook Air M3', qty: '+32', time: '1 day ago', icon: '✨', color: 'text-[#4f6ef7]', bg: 'bg-[#4f6ef7]/10' },
                  { id: 4, action: 'Stock Added', item: 'Wireless Mouse Pro', qty: '+100', time: '2 days ago', icon: '📥', color: 'text-[#0ec4a8]', bg: 'bg-[#0ec4a8]/10' },
                ].map((activity) => (
                  <div key={activity.id} className="group flex items-center justify-between p-3 rounded-2xl hover:bg-[#f4f6fb] border border-transparent hover:border-[rgba(0,0,0,0.04)] transition cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${activity.bg} transition-transform group-hover:scale-110`}>
                        <span className="text-lg">{activity.icon}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-[#0a0d14] text-sm group-hover:text-[#4f6ef7] transition-colors">{activity.action}</div>
                        <div className="text-xs text-[#6b7280]">{activity.item}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold text-sm ${activity.color}`}>{activity.qty}</div>
                      <div className="text-xs text-[#9ca3af]">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* Low Stock Alerts */}
            <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-6 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Poppins',sans-serif] text-lg font-bold text-[#0a0d14]">Low Stock Alerts</h2>
                <button className="cursor-pointer text-sm font-medium text-[#f43f5e] hover:text-[#e63946] transition">Resolve All</button>
              </div>
              <div className="space-y-3">
                {[
                  { id: 1, item: 'Mechanical Keyboard RGB', current: 12, required: 50, status: 'Critical', icon: '⌨️' },
                  { id: 2, item: 'USB-C Hub Pro', current: 0, required: 20, status: 'Out of Stock', icon: '🔌' },
                  { id: 3, item: 'Gaming Headset 7.1', current: 18, required: 30, status: 'Low', icon: '🎧' },
                  { id: 4, item: 'Webcam 4K', current: 8, required: 25, status: 'Critical', icon: '📷' },
                ].map((alert) => (
                  <div key={alert.id} className="group flex items-center justify-between p-3 rounded-2xl border border-[rgba(0,0,0,0.04)] hover:border-[#f43f5e]/30 hover:bg-[#f43f5e]/5 transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4f6fb] group-hover:bg-white transition-colors">
                        <span className="text-lg">{alert.icon}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-[#0a0d14] text-sm group-hover:text-[#f43f5e] transition-colors">{alert.item}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${alert.status === 'Out of Stock' ? 'bg-[#f43f5e]/10 text-[#f43f5e]' : alert.status === 'Critical' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' : 'bg-[#eab308]/10 text-[#eab308]'}`}>
                            {alert.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#0a0d14] text-sm">{alert.current} <span className="text-xs font-normal text-[#6b7280]">/ {alert.required}</span></div>
                      <div className="text-[10px] text-[#6b7280] uppercase tracking-wider mt-1">In Stock</div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
