"use client";

import Sidebar from "../Sidebar";

export default function SaleReturnPage() {
  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14] flex">
      <Sidebar activeLabel="SALE RETURN" />

      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <div className="lg:hidden flex items-center gap-2 font-['Syne',sans-serif] font-extrabold text-[20px] tracking-tight text-[#0a0d14]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4f6ef7]" />
                Inventra
              </div>
              <h1 className="hidden lg:block font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Sale Return</h1>
              <p className="hidden lg:block text-sm text-[#6b7280]">Review and print sale return records</p>
            </div>

            <div className="flex flex-1 items-center justify-end gap-3">
              <div className="hidden md:flex items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm text-[#2e3347] shadow-sm">
                <span>2026-05-01</span>
                <span>→</span>
                <span>2026-05-31</span>
                <span>📅</span>
              </div>
              <button className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] shadow-sm transition duration-200 hover:border-[#4f6ef7] hover:text-[#4f6ef7] hover:scale-105 hover:shadow-md">
                Columns
              </button>
              <button className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-2xl border-none bg-white px-4 py-3 text-sm font-medium text-[#2e3347] shadow-sm transition duration-200 hover:border-[#4f6ef7] hover:text-[#4f6ef7] hover:scale-105 hover:shadow-md">
                Print PDF
              </button>
            </div>
          </div>
        </header>

        <section className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-6 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-['Poppins',sans-serif] text-lg font-bold text-[#0a0d14]">Sale Return</h2>
              <button className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-2.5 text-sm font-medium text-[#2e3347] shadow-sm transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]">
                Columns
              </button>
            </div>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-[rgba(0,0,0,0.06)]">
              <table className="w-full text-left">
                <thead className="bg-[#f4f6fb] text-xs uppercase tracking-[0.16em] text-[#6b7280]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">ID</th>
                    <th className="px-4 py-3 font-semibold">DATE</th>
                    <th className="px-4 py-3 font-semibold">SALE INVOICE ID</th>
                    <th className="px-4 py-3 font-semibold">NOTES</th>
                    <th className="px-4 py-3 font-semibold">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="5" className="px-4 py-20">
                      <div className="flex flex-col items-center justify-center text-center text-[#9aa3b2]">
                        <div className="mb-3 text-[#c9d2e1]">
                          <svg className="h-14 w-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 7v5l3 2" />
                            <circle cx="12" cy="12" r="8" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-[#6b7280]">No Records Found</h3>
                        <p className="text-sm text-[#94a3b8]">Try adjusting your filters or search query</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}