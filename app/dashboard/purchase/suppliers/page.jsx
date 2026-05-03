"use client";

import Sidebar from "../../Sidebar";
import Link from "next/link";

export default function Suppliers() {
  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14] flex">
      <Sidebar activeLabel="Purchase" activeSubLabel="SUPPLIERS" />

      <div className="flex-1 lg:pl-72 flex flex-col h-screen">
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
          <div className="rounded-3xl border border-[rgba(0,0,0,0.06)] bg-white shadow-sm flex flex-col h-[calc(100vh-8rem)]">
            
            <div className="p-6 pb-0 flex items-center justify-between">
              <h1 className="text-xl font-bold text-[#0a0d14]">Supplier List</h1>
              <button className="flex items-center gap-2 rounded-xl bg-[#4f6ef7] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#4f6ef7]/20 transition hover:bg-[#3d5ce6]">
                <span>+</span> Create Supplier
              </button>
            </div>

            <div className="p-6 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-3 flex-1 max-w-xl">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    placeholder="Search" 
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50" 
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-[#4f6ef7] p-1.5 text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  </div>
                </div>
                <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                  Filter <span>+</span>
                </button>
                <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition">
                  Columns
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                  Print PDF
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6 flex flex-col">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    <th className="pb-4 pr-4 w-20">ID</th>
                    <th className="pb-4 pr-4">NAME</th>
                    <th className="pb-4 pr-4">PHONE</th>
                    <th className="pb-4 pr-4">ADDRESS</th>
                    <th className="pb-4 text-right w-24">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Empty state shown in image */}
                </tbody>
              </table>

              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="mb-4 text-gray-300">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                    <path d="M3 5V19A9 3 0 0 0 21 19V5"/>
                    <path d="M3 12A9 3 0 0 0 21 12"/>
                    <circle cx="16" cy="17" r="4" fill="white" stroke="currentColor" strokeWidth="1.5"/>
                    <line x1="16" y1="15" x2="16" y2="17" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="16" cy="19" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">No Records Found</h3>
                <p className="text-sm text-gray-500">Try adjusting your filters or search query</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
