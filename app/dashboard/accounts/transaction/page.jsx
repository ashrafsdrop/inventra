'use client';

import { useState } from 'react';
import Sidebar from '../../Sidebar';

export default function TransactionPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [date, setDate] = useState('2026-05-06');
  const [debitAccount, setDebitAccount] = useState('');
  const [creditAccount, setCreditAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [particulars, setParticulars] = useState('');
  const [invoiceType, setInvoiceType] = useState('');
  const [invoiceId, setInvoiceId] = useState('');

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="TRANSACTION" />

      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-white px-4 py-4 md:px-8 flex items-center justify-between">
          <h1 className="font-['Poppins',sans-serif] text-xl font-bold tracking-tight text-[#0a0d14]">Transaction List</h1>
          <div className="flex gap-2">
            <button className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-2 text-sm font-semibold text-[#2e3347] shadow-sm transition hover:border-[#4f6ef7]">
              <span className="text-[#4f6ef7]">📊</span> Create Sale
            </button>
            <button className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-2 text-sm font-semibold text-[#2e3347] shadow-sm transition hover:border-[#4f6ef7]">
              <span className="text-[#a855f7]">🛒</span> Create Purchase
            </button>
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-none bg-[#4f6ef7] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6]"
            >
              <span>+</span> Create Transaction
            </button>
          </div>
        </header>

        {/* Filters Row */}
        <section className="bg-white px-4 py-4 md:px-8 border-b border-[rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0 w-64">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-l-lg border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-3 py-2 text-sm outline-none placeholder:text-[#9ca3af]"
              />
              <button className="flex items-center justify-center rounded-r-lg bg-[#4f6ef7] px-3 py-2 text-white transition hover:bg-[#3d5ce6]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            <button className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-3 py-2 text-sm font-medium text-[#2e3347] transition hover:border-[#4f6ef7]">
              <svg className="w-4 h-4 text-[#6b7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter +
            </button>

            <button className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-3 py-2 text-sm font-medium text-[#2e3347] transition hover:border-[#4f6ef7]">
              Columns
              <svg className="w-4 h-4 text-[#6b7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="flex-1 bg-white p-4 md:p-8">
          <div className="w-full">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="border-b border-[rgba(0,0,0,0.04)] text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">
                <tr>
                  <th className="py-4 font-semibold w-32">DATE</th>
                  <th className="py-4 font-semibold text-center">DEBIT ACCOUNT</th>
                  <th className="py-4 font-semibold text-center">CREDIT ACCOUNT</th>
                  <th className="py-4 font-semibold text-right">AMOUNT</th>
                  <th className="py-4 font-semibold text-right w-24">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5}>
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="mb-4 text-[#9ca3af]">
                        <svg className="w-16 h-16 mx-auto opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m-4 5v5m0 0v-5m0 5h.01" />
                          <circle cx="16" cy="16" r="3" fill="white" stroke="currentColor" strokeWidth="1.5" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 15v2m0 2h.01" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-[#6b7280]">No Records Found</h3>
                      <p className="mt-1 text-sm text-[#9ca3af]">Try adjusting your filters or search query</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Centered Modal: Create Transaction */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-[550px] bg-white rounded-2xl shadow-2xl flex flex-col animate-[fadeIn_0.2s_ease-out] m-4">
            {/* Modal Header */}
            <div className="flex items-center border-b border-[rgba(0,0,0,0.06)] px-6 py-4">
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="text-[#6b7280] hover:text-[#0a0d14] mr-3"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="font-semibold text-[#0a0d14] text-lg">Create Transaction</h2>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <h3 className="text-xl font-bold text-center text-[#0a0d14] mb-8">Transaction</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm mb-2 text-[#f43f5e]">
                    * <span className="text-[#f43f5e]">Date</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-lg border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-2.5 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm mb-2 text-[#f43f5e]">
                      * <span className="text-[#f43f5e]">Debit Account</span>
                      <button className="flex h-4 w-4 items-center justify-center rounded-sm bg-[#4f6ef7] text-white transition hover:bg-[#3d5ce6] text-xs">
                        +
                      </button>
                    </label>
                    <select
                      value={debitAccount}
                      onChange={(e) => setDebitAccount(e.target.value)}
                      className="w-full rounded-lg border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-2.5 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white appearance-none cursor-pointer text-[#6b7280]"
                    >
                      <option value="" disabled>Select Debit ID</option>
                      <option value="1">Account 1</option>
                      <option value="2">Account 2</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm mb-2 text-[#f43f5e]">
                      * <span className="text-[#f43f5e]">Credit Account</span>
                      <button className="flex h-4 w-4 items-center justify-center rounded-sm bg-[#4f6ef7] text-white transition hover:bg-[#3d5ce6] text-xs">
                        +
                      </button>
                    </label>
                    <select
                      value={creditAccount}
                      onChange={(e) => setCreditAccount(e.target.value)}
                      className="w-full rounded-lg border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-2.5 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white appearance-none cursor-pointer text-[#6b7280]"
                    >
                      <option value="" disabled>Select Credit ID</option>
                      <option value="1">Account 1</option>
                      <option value="2">Account 2</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-[#f43f5e]">
                      * <span className="text-[#f43f5e]">Amount</span>
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full rounded-lg border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-2.5 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-[#f43f5e]">
                      * <span className="text-[#f43f5e]">Particulars</span>
                    </label>
                    <input
                      type="text"
                      value={particulars}
                      onChange={(e) => setParticulars(e.target.value)}
                      placeholder="Particulars"
                      className="w-full rounded-lg border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-2.5 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-[#6b7280]">
                    Invoice type - Id
                  </label>
                  <div className="flex">
                    <select
                      value={invoiceType}
                      onChange={(e) => setInvoiceType(e.target.value)}
                      className="w-1/3 rounded-l-lg border border-[rgba(0,0,0,0.08)] border-r-0 bg-[#f4f6fb] px-3 py-2.5 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white appearance-none cursor-pointer text-[#6b7280]"
                    >
                      <option value="" disabled>Select type</option>
                      <option value="Sale">Sale</option>
                      <option value="Purchase">Purchase</option>
                    </select>
                    <input
                      type="text"
                      value={invoiceId}
                      onChange={(e) => setInvoiceId(e.target.value)}
                      placeholder="Enter Invoice Id"
                      className="w-2/3 rounded-r-lg border border-[rgba(0,0,0,0.08)] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#4f6ef7]"
                    />
                  </div>
                </div>

                <div className="pt-6 flex justify-center">
                  <button className="cursor-pointer rounded-lg border-none bg-[#4f6ef7] px-8 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6]">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
          `}} />
        </div>
      )}
    </main>
  );
}
