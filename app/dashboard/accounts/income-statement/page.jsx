'use client';

import Sidebar from '../../Sidebar';

export default function IncomeStatementPage() {
  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="INCOME STATEMENT" />
      <div className="lg:pl-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-white px-4 py-4 md:px-8 flex items-center justify-between">
          <h1 className="font-['Poppins',sans-serif] text-xl font-bold tracking-tight text-[#0a0d14]">Income Statement</h1>
          <button className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-2 text-sm font-semibold text-[#2e3347] transition hover:border-[#4f6ef7]">
            Print PDF
          </button>
        </header>
        <section className="flex-1 bg-white p-4 md:p-8 flex items-center justify-center">
          <div className="text-center text-[#6b7280]">
            <h2 className="text-lg font-medium">Income Statement</h2>
            <p className="mt-2 text-sm">Content coming soon...</p>
          </div>
        </section>
      </div>
    </main>
  );
}
