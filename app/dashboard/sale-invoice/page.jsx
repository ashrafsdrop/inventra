"use client";

import { useMemo, useState, useEffect } from "react";
import Sidebar from "../Sidebar";

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const emptyForm = {
  id: "",
  invoice_number: "",
  invoice_date: "",
  customer: "",
  total_amount: "",
  paid_amount: "",
  due_amount: "",
  total_tax: "",
  due_date: "",
  profit: "",
  sales_person: "",
};

export default function SaleInvoicePage() {
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInvoiceId, setEditingInvoiceId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [lineItems, setLineItems] = useState([]);

  useEffect(() => {
    fetchInvoices();
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/sales/invoices/");
      const data = await res.json();
      setInvoices(data.results || data);
    } catch (err) {
      console.error("Failed to fetch invoices", err);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/customers/");
      const data = await res.json();
      setCustomers(data.results || data);
    } catch (err) {
      console.error("Failed to fetch customers", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/inventory/products/");
      const data = await res.json();
      setProducts(data.results || data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const metrics = useMemo(() => {
    const list = Array.isArray(invoices) ? invoices : [];
    return list.reduce(
      (accumulator, invoice) => {
        accumulator.totalSales += parseFloat(invoice.total_amount || 0);
        accumulator.totalPaid += parseFloat(invoice.paid_amount || 0);
        accumulator.totalDue += parseFloat(invoice.due_amount || 0);
        accumulator.totalProfit += parseFloat(invoice.profit || 0);
        return accumulator;
      },
      { totalSales: 0, totalPaid: 0, totalDue: 0, totalProfit: 0 }
    );
  }, [invoices]);

  const filteredInvoices = useMemo(() => {
    const list = Array.isArray(invoices) ? invoices : [];
    const normalizedSearch = search.trim().toLowerCase();

    return list.filter((invoice) => {
      const searchMatch =
        !normalizedSearch ||
        [invoice.invoice_number, invoice.customer_name, invoice.sales_person].some((value) => 
          value?.toLowerCase().includes(normalizedSearch)
        );

      const dateMatch = (!startDate || invoice.invoice_date >= startDate) && (!endDate || invoice.invoice_date <= endDate);

      return searchMatch && dateMatch;
    });
  }, [endDate, invoices, search, startDate]);

  const resetForm = () => {
    setFormData({
      ...emptyForm,
      invoice_date: new Date().toISOString().split("T")[0],
    });
    setLineItems([]);
    setEditingInvoiceId(null);
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { product: "", quantity: 1, price: 0, discount: 0, tax: 0 }]);
  };

  const removeLineItem = (index) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const updateLineItem = (index, field, value) => {
    const updated = [...lineItems];
    updated[index][field] = value;
    updated[index].line_total = updated[index].quantity * updated[index].price;
    setLineItems(updated);
  };

  const calculateTotals = () => {
    const total = lineItems.reduce((sum, item) => sum + (item.line_total || 0), 0);
    setFormData(prev => ({
      ...prev,
      total_amount: total.toString(),
    }));
  };

  const openCreateForm = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const openEditForm = (invoice) => {
    setEditingInvoiceId(invoice.id);
    setFormData({
      id: invoice.id,
      invoice_number: invoice.invoice_number || "",
      invoice_date: invoice.invoice_date || "",
      customer: invoice.customer || "",
      total_amount: String(invoice.total_amount || 0),
      paid_amount: String(invoice.paid_amount || 0),
      due_amount: String(invoice.due_amount || 0),
      total_tax: String(invoice.total_tax || 0),
      due_date: invoice.due_date || "",
      profit: String(invoice.profit || 0),
      sales_person: invoice.sales_person || "",
    });
    setIsFormOpen(true);
  };

  const saveInvoice = async () => {
    if (!formData.customer) {
      alert("Please select a customer.");
      return;
    }
    try {
      const isEditing = !!editingInvoiceId;
      const url = isEditing 
        ? `http://localhost:8000/api/sales/invoices/${editingInvoiceId}/`
        : "http://localhost:8000/api/sales/invoices/";
      
      const payload = {
        invoice_number: formData.invoice_number || `INV-${Date.now().toString().slice(-5)}`,
        invoice_date: formData.invoice_date || new Date().toISOString().split("T")[0],
        customer: formData.customer,
        sales_person: formData.sales_person || "",
        total_amount: parseFloat(formData.total_amount) || 0,
        paid_amount: parseFloat(formData.paid_amount) || 0,
        due_amount: parseFloat(formData.due_amount) || 0,
        total_tax: parseFloat(formData.total_tax) || 0,
        profit: parseFloat(formData.profit) || 0,
        status: "UNPAID",
        items: lineItems.map(item => ({
          product: parseInt(item.product),
          quantity: parseInt(item.quantity),
          price: parseFloat(item.price),
          discount: parseFloat(item.discount) || 0,
          tax: parseFloat(item.tax) || 0,
          line_total: parseFloat(item.line_total) || 0,
        }))
      };

      if (formData.due_date) {
        payload.due_date = formData.due_date;
      }

      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Invoice created successfully!");
        setIsFormOpen(false);
        resetForm();
        fetchInvoices();
      } else {
        const error = await res.json();
        console.error("Save error", error);
        alert(`Failed to save invoice: ${JSON.stringify(error)}`);
      }
    } catch (err) {
      console.error("Request error:", err);
      alert(`Error: ${err.message}`);
    }
  };

  const deleteInvoice = async (invoiceId) => {
    if (!confirm("Are you sure you want to delete this invoice?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/sales/invoices/${invoiceId}/`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchInvoices();
      }
    } catch (err) {
      console.error(err);
    }
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
                <p className="text-sm text-[#6b7280]">All sale invoices and transactions</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm text-[#2e3347] shadow-sm">
                  <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} className="w-32 bg-transparent outline-none" />
                  <span>→</span>
                  <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} className="w-32 bg-transparent outline-none" />
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
                        <td className="px-4 py-4 font-medium text-[#0a0d14]">{invoice.invoice_number}</td>
                        <td className="px-4 py-4 text-[#2e3347]">{invoice.invoice_date}</td>
                        <td className="px-4 py-4 text-[#2e3347]">{invoice.customer_name || "-"}</td>
                        <td className="px-4 py-4 font-semibold text-[#0a0d14]">{currencyFormatter.format(invoice.total_amount)}</td>
                        <td className="px-4 py-4 text-[#2e3347]">{currencyFormatter.format(invoice.paid_amount)}</td>
                        <td className="px-4 py-4 text-[#2e3347]">{currencyFormatter.format(invoice.due_amount)}</td>
                        <td className="px-4 py-4 text-[#2e3347]">{currencyFormatter.format(invoice.total_tax)}</td>
                        <td className="px-4 py-4 text-[#2e3347]">{invoice.due_date || "-"}</td>
                        <td className="px-4 py-4 font-semibold text-[#4f6ef7]">{currencyFormatter.format(invoice.profit)}</td>
                        <td className="px-4 py-4 text-[#6b7280]">{invoice.sales_person || "-"}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => openEditForm(invoice)} className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white px-3 py-2 text-xs font-semibold text-[#2e3347] shadow-sm transition hover:border-[#4f6ef7] hover:text-[#4f6ef7] cursor-pointer">
                              Edit
                            </button>
                            <button onClick={() => deleteInvoice(invoice.id)} className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white px-3 py-2 text-xs font-semibold text-[#f43f5e] shadow-sm transition hover:border-[#f43f5e] cursor-pointer">
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
                <p className="text-sm text-[#6b7280]">Enter the invoice details</p>
              </div>
              <button onClick={() => setIsFormOpen(false)} className="text-[#6b7280] transition hover:text-[#0a0d14] cursor-pointer">
                ✕
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Invoice ID
                  <input value={formData.invoice_number} onChange={(event) => setFormData((current) => ({ ...current, invoice_number: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" placeholder="INV-10432" />
                </label>
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Date
                  <input type="date" value={formData.invoice_date} onChange={(event) => setFormData((current) => ({ ...current, invoice_date: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Customer
                  <select value={formData.customer} onChange={(event) => setFormData((current) => ({ ...current, customer: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]">
                    <option value="">Select Customer</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </label>
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Sale Person
                  <input value={formData.sales_person} onChange={(event) => setFormData((current) => ({ ...current, sales_person: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" placeholder="John Doe" />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Total Amount
                  <input type="number" step="0.01" value={formData.total_amount} onChange={(event) => setFormData((current) => ({ ...current, total_amount: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" />
                </label>
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Paid
                  <input type="number" step="0.01" value={formData.paid_amount} onChange={(event) => setFormData((current) => ({ ...current, paid_amount: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Due
                  <input type="number" step="0.01" value={formData.due_amount} onChange={(event) => setFormData((current) => ({ ...current, due_amount: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" />
                </label>
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Tax
                  <input type="number" step="0.01" value={formData.total_tax} onChange={(event) => setFormData((current) => ({ ...current, total_tax: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Due Date
                  <input type="date" value={formData.due_date} onChange={(event) => setFormData((current) => ({ ...current, due_date: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" />
                </label>
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Profit
                  <input type="number" step="0.01" value={formData.profit} onChange={(event) => setFormData((current) => ({ ...current, profit: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" />
                </label>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-[#2e3347]">Line Items</h3>
                  <button onClick={addLineItem} className="text-xs bg-blue-100 text-[#4f6ef7] px-3 py-1 rounded-lg hover:bg-blue-200">
                    + Add Product
                  </button>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {lineItems.length === 0 ? (
                    <p className="text-xs text-[#9ca3af]">No items added yet</p>
                  ) : (
                    lineItems.map((item, idx) => (
                      <div key={idx} className="grid gap-2 grid-cols-6 text-xs">
                        <select value={item.product} onChange={(e) => updateLineItem(idx, "product", e.target.value)} className="col-span-2 rounded border border-gray-200 px-2 py-1 outline-none focus:border-[#4f6ef7]">
                          <option value="">Select Product</option>
                          {products.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                        <input type="number" min="1" value={item.quantity} onChange={(e) => updateLineItem(idx, "quantity", e.target.value)} placeholder="Qty" className="rounded border border-gray-200 px-2 py-1 outline-none focus:border-[#4f6ef7]" />
                        <input type="number" step="0.01" value={item.price} onChange={(e) => updateLineItem(idx, "price", e.target.value)} placeholder="Price" className="rounded border border-gray-200 px-2 py-1 outline-none focus:border-[#4f6ef7]" />
                        <div className="rounded border border-gray-200 px-2 py-1 bg-gray-50 flex items-center">
                          £{(item.line_total || 0).toFixed(2)}
                        </div>
                        <button onClick={() => removeLineItem(idx)} className="text-red-500 hover:text-red-700 font-semibold">×</button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setIsFormOpen(false)} className="flex-1 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-5 py-3 text-sm font-semibold text-[#2e3347] shadow-sm transition hover:border-[#4f6ef7] hover:text-[#4f6ef7] cursor-pointer">
                  Cancel
                </button>
                <button onClick={saveInvoice} className="flex-1 rounded-2xl bg-[#4f6ef7] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6] cursor-pointer">
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
