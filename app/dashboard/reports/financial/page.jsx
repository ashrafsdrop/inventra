import Sidebar from "../../Sidebar";

export const metadata = {
  title: "Financial Reports | Inventra ERP",
  description: "Financial reports coming soon",
};

export default function FinancialReportsPage() {
  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="FINANCIAL REPORTS" />

      <div className="lg:pl-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="px-4 py-4 md:px-8">
            <h1 className="font-['Poppins',sans-serif] text-xl font-bold tracking-tight text-[#0a0d14]">Financial Reports</h1>
          </div>
        </header>

        <section className="flex-1 bg-white p-4 md:p-8 flex items-center justify-center">
          <div className="text-center text-[#6b7280]">
            <h2 className="text-lg font-medium">Financial Reports</h2>
            <p className="mt-2 text-sm">Content coming soon...</p>
          </div>
        </section>
      </div>
    </main>
  );
}
