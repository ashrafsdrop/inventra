"use client";

import { useMemo, useState } from "react";
import Sidebar from "../Sidebar";

const initialInvoices = [
  {
    id: "INV-10428",
    date: "2026-05-01",
    customer: "Apple Inc.",
    totalAmount: 245000,
    paid: 200000,
    due: 45000,
    tax: 12250,
    dueDate: "2026-05-15",
    profit: 38000,
    salePerson: "Ayesha Khan",
  },
  {
    id: "INV-10429",
    date: "2026-05-02",
    customer: "HP Enterprise",
    totalAmount: 187000,
    paid: 150000,
    due: 37000,
    tax: 9350,
    dueDate: "2026-05-17",
    profit: 29500,
    salePerson: "Daniel Roberts",
  },
  {
    id: "INV-10430",
    date: "2026-05-03",
    customer: "Microsoft Corp",
    totalAmount: 135000,
    paid: 135000,
    due: 0,
    tax: 6750,
    dueDate: "2026-05-18",
    profit: 21600,
    salePerson: "Maya Singh",
  },
  {
    id: "INV-10431",
    date: "2026-05-04",
    customer: "IKEA Systems",
    totalAmount: 62000,
    paid: 42000,
    due: 20000,
    tax: 3100,
    dueDate: "2026-05-20",
    profit: 8400,
    salePerson: "Ayesha Khan",
  },
];

const customerOptions = ["Apple Inc.", "HP Enterprise", "Microsoft Corp", "Dell Technologies", "IKEA Systems"];
const salesPersonOptions = ["Ayesha Khan", "Daniel Roberts", "Maya Singh"];

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const emptyForm = {
  id: "",
  date: "2026-05-04",
  customer: customerOptions[0],
  totalAmount: "",
  paid: "",
  due: "",
  tax: "",
  dueDate: "",
  profit: "",
  salePerson: salesPersonOptions[0],
};

export default function SaleInvoicePage() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("2026-05-01");
  const [endDate, setEndDate] = useState("2026-05-31");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInvoiceId, setEditingInvoiceId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const metrics = useMemo(() => {
    const totals = invoices.reduce(
      (accumulator, invoice) => {
        accumulator.totalSales += invoice.totalAmount;
        accumulator.totalPaid += invoice.paid;
        accumulator.totalDue += invoice.due;
        accumulator.totalProfit += invoice.profit;
        return accumulator;
      },
      { totalSales: 0, totalPaid: 0, totalDue: 0, totalProfit: 0 }
    );

    return totals;
  }, [invoices]);

  const filteredInvoices = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return invoices.filter((invoice) => {
      const inSearch =
        !normalizedSearch ||
        [invoice.id, invoice.customer, invoice.salePerson].some((value) => value.toLowerCase().includes(normalizedSearch));

      const inDateRange = (!startDate || invoice.date >= startDate) && (!endDate || invoice.date <= endDate);

      return inSearch && inDateRange;
    });
  }, [endDate, invoices, search, startDate]);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingInvoiceId(null);
  };

  const openCreateForm = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const openEditForm = (invoice) => {
    setEditingInvoiceId(invoice.id);
    setFormData({
      id: invoice.id,
      date: invoice.date,
      customer: invoice.customer,
      totalAmount: String(invoice.totalAmount),
      paid: String(invoice.paid),
      due: String(invoice.due),
      tax: String(invoice.tax),
      dueDate: invoice.dueDate,
      profit: String(invoice.profit),
      salePerson: invoice.salePerson,
    });
    setIsFormOpen(true);
  };

  const saveInvoice = () => {
    const nextInvoice = {
      id: formData.id || `INV-${String(invoices.length + 10428).padStart(5, "0")}`,
      date: formData.date,
      customer: formData.customer,
      totalAmount: Number(formData.totalAmount || 0),
      paid: Number(formData.paid || 0),
      due: Number(formData.due || 0),
      tax: Number(formData.tax || 0),
      dueDate: formData.dueDate,
      profit: Number(formData.profit || 0),
      salePerson: formData.salePerson,
    };

    setInvoices((current) =>
      editingInvoiceId
        ? current.map((invoice) => (invoice.id === editingInvoiceId ? nextInvoice : invoice))
        : [nextInvoice, ...current]
    );

    setIsFormOpen(false);
    resetForm();
  };

  const deleteInvoice = (invoiceId) => {
    setInvoices((current) => current.filter((invoice) => invoice.id !== invoiceId));
  };

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14] flex">
      <Sidebar activeLabel="SALE INVOICE" />

      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <div className="lg:hidden flex items-center gap-2 font-['Syne',sans-serif] font-extrabold text-[20px] tracking-tight text-[#0a0d14]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4f6ef7]" />
                Inventra
              </div>
              <h1 className="hidden lg:block font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Sale Invoice</h1>
              <p className="hidden lg:block text-sm text-[#6b7280]">Manage and track all sale invoices</p>
            </div>

            <div className="flex flex-1 items-center justify-end gap-3">
              <div className="hidden md:flex min-w-[240px] max-w-[360px] flex-1 items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm text-[#6b7280] shadow-sm">
                <span>⌕</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full bg-transparent outline-none placeholder:text-[#9ca3af]"
                  placeholder="Search invoices..."
                />
              </div>
              <button className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] shadow-sm transition duration-200 hover:border-[#4f6ef7] hover:text-[#4f6ef7] hover:scale-105 hover:shadow-md">
                Filter +
              </button>
              <button className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] shadow-sm transition duration-200 hover:border-[#4f6ef7] hover:text-[#4f6ef7] hover:scale-105 hover:shadow-md">
                Columns
              </button>
              <button onClick={openCreateForm} className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition duration-200 hover:bg-[#3d5ce6] hover:scale-105 hover:shadow-xl hover:shadow-[#4f6ef7]/35">
                + Create Sale
              </button>
            </div>
          </div>
        </header>

        <section className="px-4 py-6 md:px-8 md:py-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total Sales", value: metrics.totalSales },
              { label: "Total Sale Paid", value: metrics.totalPaid },
              { label: "Total Sale Due", value: metrics.totalDue },
              { label: "Total Sale Profit", value: metrics.totalProfit },
            ].map((metric, index) => (
              <article key={metric.label} className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white px-5 py-4 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
                <div className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${index === 0 ? "bg-[#0ec4a8]/10 text-[#0ec4a8]" : index === 1 ? "bg-[#a855f7]/10 text-[#a855f7]" : index === 2 ? "bg-[#4f6ef7]/10 text-[#4f6ef7]" : "bg-[#38bdf8]/10 text-[#38bdf8]"}`}>
                    {index === 0 ? "◔" : index === 1 ? "▭" : index === 2 ? "$" : "↗"}
                  </div>
                  <div>
                    <div className="text-sm text-[#6b7280]">{metric.label}</div>
                    <div className="text-2xl font-semibold text-[#0a0d14]">{currencyFormatter.format(metric.value)}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-0 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
            <div className="flex flex-col gap-4 border-b border-[rgba(0,0,0,0.06)] px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5">
              <div>
                <h2 className="font-['Poppins',sans-serif] text-lg font-bold text-[#0a0d14]">Sale Invoice</h2>
                <p className="text-sm text-[#6b7280]">Invoice records shown from the screenshot layout</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm text-[#2e3347] shadow-sm">
                  <input value={startDate} onChange={(event) => setStartDate(event.target.value)} className="w-28 bg-transparent outline-none" />
                  <span>→</span>
                  <input value={endDate} onChange={(event) => setEndDate(event.target.value)} className="w-28 bg-transparent outline-none" />
                  <span>📅</span>
                </div>
                <button onClick={openCreateForm} className="inline-flex items-center gap-2 rounded-2xl bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6]">
                  + Create Sale
                </button>
              </div>
            </div>

            <div className="border-b border-[rgba(0,0,0,0.06)] px-4 py-3 md:px-5">
              <div className="flex items-center gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm text-[#6b7280] shadow-sm">
                  <span>⌕</span>
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="w-full bg-transparent outline-none placeholder:text-[#9ca3af]"
                    placeholder="Search"
                  />
                </div>
                <button className="inline-flex items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] shadow-sm transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]">
                  Filter +
                </button>
                <button className="inline-flex items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] shadow-sm transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]">
                  Columns
                  <span>▾</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white text-xs uppercase tracking-[0.16em] text-[#6b7280]">
                  <tr className="border-b border-[rgba(0,0,0,0.06)]">
                    <th className="px-4 py-4 font-semibold">Invoice</th>
                    <th className="px-4 py-4 font-semibold">Date</th>
                    <th className="px-4 py-4 font-semibold">Customer</th>
                    <th className="px-4 py-4 font-semibold">Total Amount</th>
                    <th className="px-4 py-4 font-semibold">Paid</th>
                    <th className="px-4 py-4 font-semibold">Due</th>
                    <th className="px-4 py-4 font-semibold">Tax</th>
                    <th className="px-4 py-4 font-semibold">Due Date</th>
                    <th className="px-4 py-4 font-semibold">Profit</th>
                    <th className="px-4 py-4 font-semibold">Sale Person</th>
                    <th className="px-4 py-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="px-4 py-20">
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
                  ) : (
                    filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="border-t border-[rgba(0,0,0,0.04)] text-sm hover:bg-[#f9fafb]">
                        <td className="px-4 py-4 font-medium text-[#0a0d14]">{invoice.id}</td>
                        <td className="px-4 py-4 text-[#2e3347]">{invoice.date}</td>
                        <td className="px-4 py-4 text-[#2e3347]">{invoice.customer}</td>
                        <td className="px-4 py-4 font-semibold text-[#0a0d14]">{currencyFormatter.format(invoice.totalAmount)}</td>
                        <td className="px-4 py-4 text-[#2e3347]">{currencyFormatter.format(invoice.paid)}</td>
                        <td className="px-4 py-4 text-[#2e3347]">{currencyFormatter.format(invoice.due)}</td>
                        <td className="px-4 py-4 text-[#2e3347]">{currencyFormatter.format(invoice.tax)}</td>
                        <td className="px-4 py-4 text-[#2e3347]">{invoice.dueDate}</td>
                        <td className="px-4 py-4 font-semibold text-[#4f6ef7]">{currencyFormatter.format(invoice.profit)}</td>
                        <td className="px-4 py-4 text-[#6b7280]">{invoice.salePerson}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => openEditForm(invoice)} className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white px-3 py-2 text-xs font-semibold text-[#2e3347] shadow-sm transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]">
                              Edit
                            </button>
                            <button onClick={() => deleteInvoice(invoice.id)} className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white px-3 py-2 text-xs font-semibold text-[#f43f5e] shadow-sm transition hover:border-[#f43f5e]">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </article>
        </section>
      </div>

      {isFormOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30 backdrop-blur-sm">
          <div className="h-full w-full max-w-xl overflow-y-auto bg-white shadow-[0_20px_60px_rgba(10,13,20,0.24)]">
            <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] px-6 py-5">
              <div>
                <h2 className="font-['Poppins',sans-serif] text-xl font-bold text-[#0a0d14]">{editingInvoiceId ? "Edit Invoice" : "Create Invoice"}</h2>
                <p className="text-sm text-[#6b7280]">Enter the invoice details shown in the list view</p>
              </div>
              <button onClick={() => setIsFormOpen(false)} className="text-[#6b7280] transition hover:text-[#0a0d14]">
                ✕
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Invoice ID
                  <input value={formData.id} onChange={(event) => setFormData((current) => ({ ...current, id: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" placeholder="INV-10432" />
                </label>
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Date
                  <input value={formData.date} onChange={(event) => setFormData((current) => ({ ...current, date: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Customer
                  <select value={formData.customer} onChange={(event) => setFormData((current) => ({ ...current, customer: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]">
                    {customerOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Sale Person
                  <select value={formData.salePerson} onChange={(event) => setFormData((current) => ({ ...current, salePerson: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]">
                    {salesPersonOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Total Amount
                  <input type="number" value={formData.totalAmount} onChange={(event) => setFormData((current) => ({ ...current, totalAmount: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" />
                </label>
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Paid
                  <input type="number" value={formData.paid} onChange={(event) => setFormData((current) => ({ ...current, paid: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Due
                  <input type="number" value={formData.due} onChange={(event) => setFormData((current) => ({ ...current, due: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" />
                </label>
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Tax
                  <input type="number" value={formData.tax} onChange={(event) => setFormData((current) => ({ ...current, tax: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Due Date
                  <input value={formData.dueDate} onChange={(event) => setFormData((current) => ({ ...current, dueDate: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" />
                </label>
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Profit
                  <input type="number" value={formData.profit} onChange={(event) => setFormData((current) => ({ ...current, profit: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" />
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setIsFormOpen(false)} className="flex-1 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-5 py-3 text-sm font-semibold text-[#2e3347] shadow-sm transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]">
                  Cancel
                </button>
                <button onClick={saveInvoice} className="flex-1 rounded-2xl bg-[#4f6ef7] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6]">
                  {editingInvoiceId ? "Update Invoice" : "Create Invoice"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
