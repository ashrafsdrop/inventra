'use client';

import Sidebar from '../dashboard/Sidebar';

export default function PurchasePage() {
  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="Purchase" />

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <div className="lg:hidden flex items-center gap-2 font-['Syne',sans-serif] font-extrabold text-[20px] tracking-tight text-[#0a0d14]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4f6ef7]" />
                Inventra
              </div>
              <h1 className="hidden lg:block font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Purchase Management</h1>
              <p className="hidden lg:block text-sm text-[#6b7280]">Manage purchases, invoices, orders, and suppliers</p>
            </div>
          </div>
        </header>

        <section className="px-4 py-8 md:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Purchase Invoice Card */}
            <a href="/purchase/purchase-invoice" className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-6 shadow-[0_12px_40px_rgba(10,13,20,0.05)] hover:shadow-lg transition cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#4f6ef7]/10 flex items-center justify-center text-2xl">
                  📄
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#0a0d14] mb-2">Purchase Invoice</h3>
              <p className="text-sm text-[#6b7280] mb-4">Create and manage purchase invoices from suppliers</p>
              <div className="inline-block px-3 py-1 rounded-full bg-[#4f6ef7]/10 text-xs font-semibold text-[#4f6ef7]">
                Manage →
              </div>
            </a>

            {/* Purchase Order Card */}
            <a href="/purchase/purchase-order" className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-6 shadow-[0_12px_40px_rgba(10,13,20,0.05)] hover:shadow-lg transition cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0ec4a8]/10 flex items-center justify-center text-2xl">
                  📋
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#0a0d14] mb-2">Purchase Order</h3>
              <p className="text-sm text-[#6b7280] mb-4">Create purchase orders for supplier requests</p>
              <div className="inline-block px-3 py-1 rounded-full bg-[#0ec4a8]/10 text-xs font-semibold text-[#0ec4a8]">
                Manage →
              </div>
            </a>

            {/* Suppliers Card */}
            <a href="/purchase/suppliers" className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-6 shadow-[0_12px_40px_rgba(10,13,20,0.05)] hover:shadow-lg transition cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#f59e0b]/10 flex items-center justify-center text-2xl">
                  🏢
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#0a0d14] mb-2">Suppliers</h3>
              <p className="text-sm text-[#6b7280] mb-4">Manage your supplier and vendor information</p>
              <div className="inline-block px-3 py-1 rounded-full bg-[#f59e0b]/10 text-xs font-semibold text-[#f59e0b]">
                Manage →
              </div>
            </a>

            {/* Purchase Return Card */}
            <a href="#" className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-6 shadow-[0_12px_40px_rgba(10,13,20,0.05)] hover:shadow-lg transition cursor-pointer opacity-50 pointer-events-none">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#f43f5e]/10 flex items-center justify-center text-2xl">
                  🔄
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#0a0d14] mb-2">Purchase Return</h3>
              <p className="text-sm text-[#6b7280] mb-4">Manage returns and refunds from purchases</p>
              <div className="inline-block px-3 py-1 rounded-full bg-[#f43f5e]/10 text-xs font-semibold text-[#f43f5e]">
                Coming Soon
              </div>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
