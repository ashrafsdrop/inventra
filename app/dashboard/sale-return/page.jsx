"use client";

import { useState, useEffect, useMemo } from "react";
import Sidebar from "../Sidebar";

const emptyForm = {
  id: "",
  sale_invoice: "",
  date: "",
  notes: "",
  status: "APPROVED",
};

export default function SaleReturnPage() {
  const [returns, setReturns] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReturnId, setEditingReturnId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReturns();
    fetchInvoices();
  }, []);

  const fetchReturns = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/sales/returns/");
      const data = await res.json();
      setReturns(data.results || data);
    } catch (err) {
      console.error("Failed to fetch returns", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoices = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/sales/invoices/");
      const data = await res.json();
      setInvoices(data.results || data);
    } catch (err) {
      console.error("Failed to fetch invoices", err);
    }
  };

  const stats = useMemo(() => {
    return {
      totalReturns: returns.length,
      approvedReturns: returns.filter(r => r.status === "APPROVED").length,
      pendingReturns: returns.filter(r => r.status === "PENDING").length,
    };
  }, [returns]);

  const filteredReturns = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return returns.filter((ret) => {
      const searchMatch =
        !normalizedSearch ||
        [ret.id, ret.sale_invoice, ret.notes].some((value) =>
          String(value).toLowerCase().includes(normalizedSearch)
        );

      const dateMatch =
        (!startDate || ret.date >= startDate) &&
        (!endDate || ret.date <= endDate);

      return searchMatch && dateMatch;
    });
  }, [returns, search, startDate, endDate]);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingReturnId(null);
  };

  const openCreateForm = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const openEditForm = (saleReturn) => {
    setEditingReturnId(saleReturn.id);
    setFormData({
      id: saleReturn.id,
      sale_invoice: saleReturn.sale_invoice,
      date: saleReturn.date,
      notes: saleReturn.notes,
      status: saleReturn.status,
    });
    setIsFormOpen(true);
  };

  const saveReturn = async () => {
    if (!formData.sale_invoice || !formData.date) {
      alert("Invoice and date are required");
      return;
    }

    try {
      const isEditing = !!editingReturnId;
      const url = isEditing
        ? `http://localhost:8000/api/sales/returns/${editingReturnId}/`
        : "http://localhost:8000/api/sales/returns/";

      const payload = {
        sale_invoice: parseInt(formData.sale_invoice),
        date: formData.date,
        notes: formData.notes || "",
        status: formData.status,
      };

      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(`Sale return ${isEditing ? "updated" : "created"} successfully!`);
        setIsFormOpen(false);
        resetForm();
        fetchReturns();
      } else {
        const error = await res.json();
        alert(`Error: ${JSON.stringify(error)}`);
      }
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

  const deleteReturn = async (returnId) => {
    if (!confirm("Are you sure you want to delete this sale return?")) return;

    try {
      const res = await fetch(
        `http://localhost:8000/api/sales/returns/${returnId}/`,
        { method: "DELETE" }
      );

      if (res.ok) {
        alert("Sale return deleted successfully!");
        fetchReturns();
      } else {
        alert("Failed to delete sale return");
      }
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

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
              <h1 className="hidden lg:block font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">
                Sale Return
              </h1>
              <p className="hidden lg:block text-sm text-[#6b7280]">
                Manage sale return records
              </p>
            </div>

            <div className="flex flex-1 items-center justify-end gap-3">
              <button onClick={openCreateForm} className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition duration-200 hover:bg-[#3d5ce6] hover:scale-105 hover:shadow-xl">
                + Create Return
              </button>
            </div>
          </div>
        </header>

        <section className="px-4 py-6 md:px-8 md:py-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Total Returns", value: stats.totalReturns },
              { label: "Approved", value: stats.approvedReturns },
              { label: "Pending", value: stats.pendingReturns },
            ].map((metric, index) => (
              <article
                key={metric.label}
                className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white px-5 py-4 shadow-[0_12px_40px_rgba(10,13,20,0.05)]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                      index === 0
                        ? "bg-[#0ec4a8]/10 text-[#0ec4a8]"
                        : index === 1
                        ? "bg-[#4f6ef7]/10 text-[#4f6ef7]"
                        : "bg-[#a855f7]/10 text-[#a855f7]"
                    }`}
                  >
                    {index === 0 ? "↩" : index === 1 ? "✓" : "⏳"}
                  </div>
                  <div>
                    <div className="text-sm text-[#6b7280]">{metric.label}</div>
                    <div className="text-2xl font-semibold text-[#0a0d14]">
                      {metric.value}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-0 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
            <div className="flex flex-col gap-4 border-b border-[rgba(0,0,0,0.06)] px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5">
              <div>
                <h2 className="font-['Poppins',sans-serif] text-lg font-bold text-[#0a0d14]">
                  Sale Returns
                </h2>
                <p className="text-sm text-[#6b7280]">
                  All sale return records
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm text-[#2e3347] shadow-sm">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    className="w-32 bg-transparent outline-none"
                  />
                  <span>→</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    className="w-32 bg-transparent outline-none"
                  />
                  <span>📅</span>
                </div>
                <button
                  onClick={openCreateForm}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6]"
                >
                  + Create Return
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
                    placeholder="Search returns..."
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white text-xs uppercase tracking-[0.16em] text-[#6b7280]">
                  <tr className="border-b border-[rgba(0,0,0,0.06)]">
                    <th className="px-4 py-4 font-semibold">ID</th>
                    <th className="px-4 py-4 font-semibold">Date</th>
                    <th className="px-4 py-4 font-semibold">Sale Invoice</th>
                    <th className="px-4 py-4 font-semibold">Notes</th>
                    <th className="px-4 py-4 font-semibold">Status</th>
                    <th className="px-4 py-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReturns.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-20">
                        <div className="flex flex-col items-center justify-center text-center text-[#9aa3b2]">
                          <div className="mb-3 text-[#c9d2e1]">
                            <svg
                              className="h-14 w-14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 7v5l3 2" />
                              <circle cx="12" cy="12" r="8" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-[#6b7280]">
                            No Records Found
                          </h3>
                          <p className="text-sm text-[#94a3b8]">
                            Try adjusting your filters or search query
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredReturns.map((ret) => (
                      <tr
                        key={ret.id}
                        className="border-t border-[rgba(0,0,0,0.04)] text-sm hover:bg-[#f9fafb]"
                      >
                        <td className="px-4 py-4 font-medium text-[#0a0d14]">
                          #{ret.id}
                        </td>
                        <td className="px-4 py-4 text-[#2e3347]">{ret.date}</td>
                        <td className="px-4 py-4 text-[#2e3347]">
                          {ret.sale_invoice}
                        </td>
                        <td className="px-4 py-4 text-[#2e3347]">
                          {ret.notes || "-"}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                              ret.status === "APPROVED"
                                ? "bg-[#0ec4a8]/10 text-[#0ec4a8]"
                                : ret.status === "PENDING"
                                ? "bg-[#f59e0b]/10 text-[#f59e0b]"
                                : "bg-[#ef4444]/10 text-[#ef4444]"
                            }`}
                          >
                            {ret.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditForm(ret)}
                              className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white px-3 py-2 text-xs font-semibold text-[#2e3347] shadow-sm transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteReturn(ret.id)}
                              className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white px-3 py-2 text-xs font-semibold text-[#f43f5e] shadow-sm transition hover:border-[#f43f5e]"
                            >
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
                <h2 className="font-['Poppins',sans-serif] text-xl font-bold text-[#0a0d14]">
                  {editingReturnId ? "Edit Sale Return" : "Create Sale Return"}
                </h2>
                <p className="text-sm text-[#6b7280]">
                  Enter the sale return details
                </p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-[#6b7280] transition hover:text-[#0a0d14] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 p-6">
              <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                Sale Invoice
                <select
                  value={formData.sale_invoice}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      sale_invoice: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]"
                  required
                >
                  <option value="">Select Sale Invoice</option>
                  {invoices.map((inv) => (
                    <option key={inv.id} value={inv.id}>
                      {inv.invoice_number} - {inv.customer_name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                Date
                <input
                  type="date"
                  value={formData.date}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      date: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]"
                  required
                />
              </label>

              <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                Status
                <select
                  value={formData.status}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      status: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]"
                >
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </label>

              <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                Notes
                <textarea
                  value={formData.notes}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      notes: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]"
                  rows="3"
                  placeholder="Return reason or notes..."
                />
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-5 py-3 text-sm font-semibold text-[#2e3347] shadow-sm transition hover:border-[#4f6ef7] hover:text-[#4f6ef7] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={saveReturn}
                  className="flex-1 rounded-2xl bg-[#4f6ef7] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6] cursor-pointer"
                >
                  {editingReturnId ? "Update Return" : "Create Return"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
