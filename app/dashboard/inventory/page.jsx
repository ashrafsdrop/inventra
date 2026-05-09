'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import apiFetch from '../../lib/api';

function StockBadge({ quantity, reorderQty }) {
  let status = 'In Stock';
  let color = 'bg-[#0ec4a8]/10 text-[#0ec4a8]';

  if (quantity <= 0) {
    status = 'Out of Stock';
    color = 'bg-[#f43f5e]/10 text-[#f43f5e]';
  } else if (quantity <= reorderQty) {
    status = 'Low Stock';
    color = 'bg-[#f59e0b]/10 text-[#f59e0b]';
  }

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${color}`}>{status}</span>;
}

function formatPercent(value, max) {
  if (!max) return '0%';
  return `${Math.round((value / max) * 100)}%`;
}

function activityMeta(activity) {
  if (activity.movement_type === 'IN' || activity.quantity_change > 0) {
    return { icon: '📥', color: 'text-[#0ec4a8]', bg: 'bg-[#0ec4a8]/10' };
  }

  if (activity.movement_type === 'OUT' || activity.quantity_change < 0) {
    return { icon: '📤', color: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/10' };
  }

  return { icon: '✨', color: 'text-[#4f6ef7]', bg: 'bg-[#4f6ef7]/10' };
}

export default function InventoryHub() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadSummary = async () => {
      try {
        const data = await apiFetch('/api/inventory/summary/');
        if (isMounted) setSummary(data);
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load inventory summary.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadSummary();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalProducts = summary?.total_products ?? 0;
  const categoriesCount = summary?.categories_count ?? 0;
  const totalValue = summary?.total_value_display ?? '£0';
  const reorderPoints = summary?.reorder_points ?? 0;
  const lowStockCount = summary?.low_stock_count ?? 0;
  const outOfStockCount = summary?.out_of_stock_count ?? 0;
  const recentActivity = summary?.recent_activity ?? [];
  const lowStockProducts = summary?.low_stock_products ?? [];

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="INVENTORY HOME" />

      <div className="lg:pl-72">
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

        {error ? (
          <section className="px-4 py-6 md:px-8 md:py-8">
            <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
              {error}
            </div>
          </section>
        ) : null}

        <section className="px-4 py-6 md:px-8 md:py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/dashboard/inventory/products">
              <article className="group cursor-pointer rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-8 shadow-[0_12px_40px_rgba(10,13,20,0.05)] transition hover:shadow-[0_20px_50px_rgba(79,110,247,0.1)] hover:border-[#4f6ef7]">
                <div className="mb-4 text-5xl">📦</div>
                <h2 className="font-['Poppins',sans-serif] text-xl font-bold text-[#0a0d14] group-hover:text-[#4f6ef7] transition">Products</h2>
                <p className="mt-2 text-sm text-[#6b7280]">Manage all products, pricing, and stock levels</p>
                <div className="mt-4 text-sm text-[#2e3347]">
                  <span className="font-semibold text-[#4f6ef7]">{loading ? 'Loading...' : totalProducts.toLocaleString()}</span> live products
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#4f6ef7] group-hover:gap-3 transition">
                  View Products
                  <span>→</span>
                </div>
              </article>
            </Link>

            <Link href="/dashboard/inventory/catalog">
              <article className="group cursor-pointer rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-8 shadow-[0_12px_40px_rgba(10,13,20,0.05)] transition hover:shadow-[0_20px_50px_rgba(79,110,247,0.1)] hover:border-[#4f6ef7]">
                <div className="mb-4 text-5xl">📂</div>
                <h2 className="font-['Poppins',sans-serif] text-xl font-bold text-[#0a0d14] group-hover:text-[#4f6ef7] transition">Categories</h2>
                <p className="mt-2 text-sm text-[#6b7280]">Organize and manage product categories</p>
                <div className="mt-4 text-sm text-[#2e3347]">
                  <span className="font-semibold text-[#4f6ef7]">{loading ? 'Loading...' : categoriesCount.toLocaleString()}</span> live categories
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#4f6ef7] group-hover:gap-3 transition">
                  View Categories
                  <span>→</span>
                </div>
              </article>
            </Link>

            <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-8 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
              <div className="mb-4 text-5xl">📊</div>
              <h2 className="font-['Poppins',sans-serif] text-xl font-bold text-[#0a0d14]">Stock Levels</h2>
              <p className="mt-2 text-sm text-[#6b7280]">Monitor inventory levels and reorder points</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#4f6ef7]">{loading ? '...' : lowStockCount}</div>
                  <div className="text-xs text-[#6b7280]">Low Stock</div>
                </div>
                <div className="h-12 w-px bg-[rgba(0,0,0,0.07)]" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#f43f5e]">{loading ? '...' : outOfStockCount}</div>
                  <div className="text-xs text-[#6b7280]">Out of Stock</div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="px-4 pb-8 md:px-8">
          <div className="grid gap-4 md:grid-cols-4">
            <article className="rounded-2xl border border-[rgba(0,0,0,0.07)] bg-white p-4 shadow-sm">
              <div className="text-xs font-medium uppercase tracking-[0.24em] text-[#6b7280]">Total Products</div>
              <div className="mt-2 text-2xl font-bold text-[#0a0d14]">{loading ? 'Loading...' : totalProducts.toLocaleString()}</div>
            </article>
            <article className="rounded-2xl border border-[rgba(0,0,0,0.07)] bg-white p-4 shadow-sm">
              <div className="text-xs font-medium uppercase tracking-[0.24em] text-[#6b7280]">Categories</div>
              <div className="mt-2 text-2xl font-bold text-[#0a0d14]">{loading ? 'Loading...' : categoriesCount.toLocaleString()}</div>
            </article>
            <article className="rounded-2xl border border-[rgba(0,0,0,0.07)] bg-white p-4 shadow-sm">
              <div className="text-xs font-medium uppercase tracking-[0.24em] text-[#6b7280]">Total Value</div>
              <div className="mt-2 text-2xl font-bold text-[#0a0d14]">{loading ? 'Loading...' : totalValue}</div>
            </article>
            <article className="rounded-2xl border border-[rgba(0,0,0,0.07)] bg-white p-4 shadow-sm">
              <div className="text-xs font-medium uppercase tracking-[0.24em] text-[#6b7280]">Reorder Points</div>
              <div className="mt-2 text-2xl font-bold text-[#0a0d14]">{loading ? 'Loading...' : reorderPoints.toLocaleString()}</div>
            </article>
          </div>
        </section>

        <section className="px-4 pb-8 md:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-6 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Poppins',sans-serif] text-lg font-bold text-[#0a0d14]">Recent Activity</h2>
                <button className="cursor-pointer text-sm font-medium text-[#4f6ef7] hover:text-[#3d5ce6] transition">View All</button>
              </div>

              {loading ? (
                <div className="rounded-2xl border border-dashed border-[rgba(0,0,0,0.08)] p-6 text-sm text-[#6b7280]">Loading recent inventory activity...</div>
              ) : recentActivity.length ? (
                <div className="space-y-3">
                  {recentActivity.map((activity) => {
                    const meta = activityMeta(activity);
                    const quantityLabel = activity.quantity_change > 0 ? `+${activity.quantity_change}` : `${activity.quantity_change}`;

                    return (
                      <div key={activity.id} className="group flex items-center justify-between p-3 rounded-2xl hover:bg-[#f4f6fb] border border-transparent hover:border-[rgba(0,0,0,0.04)] transition cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${meta.bg} transition-transform group-hover:scale-110`}>
                            <span className="text-lg">{meta.icon}</span>
                          </div>
                          <div>
                            <div className="font-semibold text-[#0a0d14] text-sm group-hover:text-[#4f6ef7] transition-colors">{activity.action}</div>
                            <div className="text-xs text-[#6b7280]">{activity.item}</div>
                            <div className="text-[11px] text-[#9ca3af]">{activity.reference || activity.sku}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold text-sm ${meta.color}`}>{quantityLabel}</div>
                          <div className="text-xs text-[#9ca3af]">{activity.time}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-[rgba(0,0,0,0.08)] p-6 text-sm text-[#6b7280]">No recent stock movements yet.</div>
              )}
            </article>

            <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-6 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Poppins',sans-serif] text-lg font-bold text-[#0a0d14]">Low Stock Alerts</h2>
                <button className="cursor-pointer text-sm font-medium text-[#f43f5e] hover:text-[#e63946] transition">Resolve All</button>
              </div>

              {loading ? (
                <div className="rounded-2xl border border-dashed border-[rgba(0,0,0,0.08)] p-6 text-sm text-[#6b7280]">Loading low stock products...</div>
              ) : lowStockProducts.length ? (
                <div className="space-y-3">
                  {lowStockProducts.map((product) => {
                    const quantity = Number(product.quantity || 0);
                    const reorderQty = Number(product.reorder_qty || 0);
                    const currentRatio = reorderQty > 0 ? formatPercent(quantity, reorderQty) : '0%';
                    const isOutOfStock = quantity <= 0;
                    const statusClass = isOutOfStock ? 'bg-[#f43f5e]/10 text-[#f43f5e]' : 'bg-[#f59e0b]/10 text-[#f59e0b]';
                    const statusLabel = isOutOfStock ? 'Out of Stock' : 'Critical';

                    return (
                      <div key={product.id} className="group flex items-center justify-between p-3 rounded-2xl border border-[rgba(0,0,0,0.04)] hover:border-[#f43f5e]/30 hover:bg-[#f43f5e]/5 transition cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4f6fb] group-hover:bg-white transition-colors">
                            <span className="text-lg">📦</span>
                          </div>
                          <div>
                            <div className="font-semibold text-[#0a0d14] text-sm group-hover:text-[#f43f5e] transition-colors">{product.name}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${statusClass}`}>{statusLabel}</span>
                              <span className="text-[10px] text-[#9ca3af] uppercase tracking-wider">SKU {product.sku}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#0a0d14] text-sm">{quantity} <span className="text-xs font-normal text-[#6b7280]">/ {reorderQty}</span></div>
                          <div className="text-[10px] text-[#6b7280] uppercase tracking-wider mt-1">{currentRatio} of reorder point</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-[rgba(0,0,0,0.08)] p-6 text-sm text-[#6b7280]">No low stock alerts right now.</div>
              )}
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
