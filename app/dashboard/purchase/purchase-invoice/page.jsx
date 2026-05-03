"use client";

import Sidebar from "../../Sidebar";

export default function PurchaseInvoice() {
  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14] flex">
      <Sidebar activeLabel="Purchase" activeSubLabel="PURCHASE INVOICE" />

      <div className="flex-1 lg:pl-72 flex flex-col h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 px-4 py-4 backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-4">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4f6ef7] text-white shadow-md shadow-[#4f6ef7]/20 transition hover:bg-[#3d5ce6]">
              &lt;
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-xl bg-[#4f6ef7]/10 px-4 py-2 text-sm font-semibold text-[#4f6ef7] hover:bg-[#4f6ef7]/20 transition flex items-center gap-2">
              <span>📈</span> Create Sale
            </button>
            <button className="rounded-xl bg-[#a855f7]/10 px-4 py-2 text-sm font-semibold text-[#a855f7] hover:bg-[#a855f7]/20 transition flex items-center gap-2">
              <span>🛒</span> Create Purchase
            </button>
            <button className="rounded-xl bg-[#4f6ef7]/10 px-4 py-2 text-sm font-semibold text-[#4f6ef7] hover:bg-[#4f6ef7]/20 transition flex items-center gap-2">
              <span>🔄</span> Create Transaction
            </button>
            <button className="rounded-xl bg-[#a855f7]/10 px-4 py-2 text-sm font-semibold text-[#a855f7] hover:bg-[#a855f7]/20 transition flex items-center gap-2">
              <span>🖨️</span> POS
            </button>
            <div className="h-6 w-px bg-gray-300 mx-2"></div>
            <button className="text-gray-500 hover:text-gray-800 transition">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            </button>
            <button className="text-gray-500 hover:text-gray-800 transition">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6 items-start">
            
            {/* Left Column: Products Table */}
            <div className="rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
                    <th className="pb-3 pr-4 w-12">#</th>
                    <th className="pb-3 pr-4">Product</th>
                    <th className="pb-3 pr-4 w-32">Quantity</th>
                    <th className="pb-3 pr-4 w-32">Purchase Price</th>
                    <th className="pb-3 pr-4 w-32">Selling Price</th>
                    <th className="pb-3 pr-4 w-24">Amount</th>
                    <th className="pb-3 pr-4 w-20">Tax%</th>
                    <th className="pb-3 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50">
                    <td className="py-4 pr-4 text-sm font-medium text-[#f59e0b]">1</td>
                    <td className="py-4 pr-4">
                      <select className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50 text-gray-400">
                        <option>Select Product</option>
                      </select>
                    </td>
                    <td className="py-4 pr-4">
                      <input type="number" defaultValue={1} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50" />
                    </td>
                    <td className="py-4 pr-4">
                      <input type="number" defaultValue={50000} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50 text-gray-400" />
                    </td>
                    <td className="py-4 pr-4">
                      <input type="number" defaultValue={50000} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50 text-gray-400" />
                    </td>
                    <td className="py-4 pr-4 text-sm">0</td>
                    <td className="py-4 pr-4">
                      <input type="number" defaultValue={0} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50" />
                    </td>
                    <td className="py-4 text-center">
                      <button className="text-red-400 hover:text-red-600 transition">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4 flex justify-center">
                <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-[#0a0d14] shadow-sm hover:bg-gray-50 transition cursor-pointer">
                  <span>+</span> Add Product
                </button>
              </div>
            </div>

            {/* Right Column: Forms */}
            <div className="flex flex-col gap-6">
              
              {/* Supplier Form Card */}
              <div className="rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-sm">
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      Supplier <span className="text-red-500">*</span>
                      <button className="ml-1 flex h-5 w-5 items-center justify-center rounded bg-[#4f6ef7] text-white hover:bg-[#3d5ce6] transition text-xs font-bold">+</button>
                    </label>
                    <select className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-400 outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50 appearance-none">
                      <option>Select a supplier</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input type="text" defaultValue="2026-04-29" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50" />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                      Supplier Memo
                    </label>
                    <input type="text" placeholder="Memo no" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50 placeholder-gray-300" />
                  </div>

                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      Note
                    </label>
                    <input type="text" placeholder="Note" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50 placeholder-gray-300" />
                  </div>
                </div>
              </div>

              {/* Payment Summary Card */}
              <div className="rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-[#0a0d14] mb-4">Payment Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Total amount</span>
                    <span>0.00</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Total tax amount</span>
                    <span>0.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#0a0d14] text-base pt-1">
                    <span>Total Payable</span>
                    <span>0.00</span>
                  </div>
                  <div className="flex justify-between text-red-400">
                    <span>Due Amount</span>
                    <span>0.00</span>
                  </div>
                  
                  <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                    <span className="font-medium text-gray-700">Paid Amount:</span>
                    <button className="flex items-center gap-1.5 rounded-xl border border-dashed border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition cursor-pointer">
                      <span>+</span> Add Payment
                    </button>
                  </div>
                </div>
              </div>

              {/* Create Purchase Button */}
              <button className="w-full rounded-xl bg-[#6366f1] py-4 text-base font-bold text-white shadow-lg shadow-[#6366f1]/25 transition hover:bg-[#4f46e5] cursor-pointer">
                Create Purchase
              </button>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
