"use client";

import { useState } from "react";
import Sidebar from "../../Sidebar";

export default function PurchaseOrder() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true); // default open to match image 3

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14] flex overflow-hidden">
      <Sidebar activeLabel="Purchase" activeSubLabel="PURCHASE ORDER" />

      <div className="flex-1 lg:pl-72 flex flex-col h-screen relative">
        {/* Header (same as invoice page) */}
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
          <div className="rounded-3xl border border-[rgba(0,0,0,0.06)] bg-white shadow-sm flex flex-col h-full min-h-[500px]">
            
            <div className="p-6 pb-4">
              <h1 className="text-xl font-bold text-[#0a0d14] mb-4">Purchase Order</h1>
              
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition">
                  Columns
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 pt-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    <th className="pb-4 pr-4 w-20">ID</th>
                    <th className="pb-4 pr-4">CREATE DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Empty state or list items would go here */}
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* Overlay Background */}
        {isDrawerOpen && (
          <div 
            className="absolute inset-0 bg-gray-900/40 z-40 backdrop-blur-[2px] transition-opacity" 
            onClick={() => setIsDrawerOpen(false)}
          />
        )}

        {/* Create Purchase Order Drawer */}
        <div className={`absolute top-0 right-0 h-full w-[45%] min-w-[500px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center gap-4 border-b border-gray-100 p-6">
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="text-gray-400 hover:text-gray-700 transition"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <h2 className="text-lg font-bold text-[#0a0d14]">Create Purchase order</h2>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-sm font-medium text-gray-700">
                  <th className="pb-3 pr-4 w-12">SL</th>
                  <th className="pb-3 pr-4">Product</th>
                  <th className="pb-3 pr-4 w-32">Quantity</th>
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
                    <input type="text" placeholder="Quantity" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50" />
                  </td>
                  <td className="py-4 text-center">
                    <button className="text-gray-400 hover:text-red-500 transition">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4">
              <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition cursor-pointer">
                <span>+</span> Add Product
              </button>
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 bg-white">
            <button className="w-full rounded-xl bg-[#6366f1] py-3.5 text-base font-bold text-white shadow-lg shadow-[#6366f1]/25 transition hover:bg-[#4f46e5] cursor-pointer">
              Create Purchase Order
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
