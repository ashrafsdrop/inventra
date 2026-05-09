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
  name: "",
  email: "",
  phone: "",
  address: "",
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/customers/");
      const data = await res.json();
      const customerList = data.results || data;
      setCustomers(customerList);
    } catch (err) {
      console.error("Failed to fetch customers", err);
      alert("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    return {
      totalCustomers: customers.length,
      totalSales: 0,
      averageSales: 0,
    };
  }, [customers]);

  const filteredCustomers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return customers.filter((customer) => {
      if (!normalizedSearch) return true;
      return [customer.id, customer.name, customer.email, customer.phone].some((value) =>
        String(value).toLowerCase().includes(normalizedSearch)
      );
    });
  }, [customers, search]);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingCustomerId(null);
  };

  const openCreateForm = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const openEditForm = (customer) => {
    setEditingCustomerId(customer.id);
    setFormData({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
    });
    setIsFormOpen(true);
  };

  const saveCustomer = async () => {
    if (!formData.name || !formData.email) {
      alert("Name and email are required");
      return;
    }

    try {
      const isEditing = !!editingCustomerId;
      const url = isEditing
        ? `http://localhost:8000/api/customers/${editingCustomerId}/`
        : "http://localhost:8000/api/customers/";

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "",
        address: formData.address || "",
        username: formData.name.toLowerCase().replace(/\s+/g, "_"),
      };

      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(`Customer ${isEditing ? "updated" : "created"} successfully!`);
        setIsFormOpen(false);
        resetForm();
        fetchCustomers();
      } else {
        const error = await res.json();
        alert(`Error: ${JSON.stringify(error)}`);
      }
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

  const deleteCustomer = async (customerId) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/customers/${customerId}/`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Customer deleted successfully!");
        fetchCustomers();
      } else {
        alert("Failed to delete customer");
      }
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14] flex">
      <Sidebar activeLabel="CUSTOMERS" />

      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <div className="lg:hidden flex items-center gap-2 font-['Syne',sans-serif] font-extrabold text-[20px] tracking-tight text-[#0a0d14]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4f6ef7]" />
                Inventra
              </div>
              <h1 className="hidden lg:block font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Customers</h1>
              <p className="hidden lg:block text-sm text-[#6b7280]">Manage customer records and imports</p>
            </div>

            <div className="flex flex-1 items-center justify-end gap-3">
              <label className="hidden md:flex min-w-[240px] max-w-[360px] flex-1 items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm text-[#6b7280] shadow-sm">
                <span>⌕</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full bg-transparent outline-none placeholder:text-[#9ca3af]"
                  placeholder="Search customers..."
                />
              </label>
              <button className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] shadow-sm transition duration-200 hover:border-[#4f6ef7] hover:text-[#4f6ef7] hover:scale-105 hover:shadow-md">
                Filter +
              </button>
              <button className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] shadow-sm transition duration-200 hover:border-[#4f6ef7] hover:text-[#4f6ef7] hover:scale-105 hover:shadow-md">
                Columns
              </button>
              <button onClick={openCreateForm} className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition duration-200 hover:bg-[#3d5ce6] hover:scale-105 hover:shadow-xl hover:shadow-[#4f6ef7]/35">
                + Add Customer
              </button>
            </div>
          </div>
        </header>

        <section className="px-4 py-6 md:px-8 md:py-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total Customers", value: stats.totalCustomers },
              { label: "Total Sales", value: stats.totalSales },
              { label: "Average Sales", value: stats.averageSales },
              { label: "Imports", value: 1 },
            ].map((metric, index) => (
              <article key={metric.label} className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white px-5 py-4 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
                <div className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${index === 0 ? "bg-[#0ec4a8]/10 text-[#0ec4a8]" : index === 1 ? "bg-[#4f6ef7]/10 text-[#4f6ef7]" : index === 2 ? "bg-[#a855f7]/10 text-[#a855f7]" : "bg-[#38bdf8]/10 text-[#38bdf8]"}`}>
                    {index === 0 ? "👥" : index === 1 ? "$" : index === 2 ? "◔" : "⇪"}
                  </div>
                  <div>
                    <div className="text-sm text-[#6b7280]">{metric.label}</div>
                    <div className="text-2xl font-semibold text-[#0a0d14]">
                      {index === 0 ? metric.value : currencyFormatter.format(metric.value)}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-0 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
            <div className="flex flex-col gap-4 border-b border-[rgba(0,0,0,0.06)] px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5">
              <div>
                <h2 className="font-['Poppins',sans-serif] text-lg font-bold text-[#0a0d14]">Customers</h2>
                <p className="text-sm text-[#6b7280]">List view styled to match the rest of the dashboard</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={openCreateForm} className="inline-flex items-center gap-2 rounded-2xl bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6]">
                  + Add Customer
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
                    <th className="px-4 py-4 font-semibold">ID</th>
                    <th className="px-4 py-4 font-semibold">Name</th>
                    <th className="px-4 py-4 font-semibold">Email</th>
                    <th className="px-4 py-4 font-semibold">Phone</th>
                    <th className="px-4 py-4 font-semibold">Address</th>
                    <th className="px-4 py-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-20">
                        <div className="flex flex-col items-center justify-center text-center text-[#9aa3b2]">
                          <div className="mb-3 text-[#c9d2e1]">
                            <svg className="h-14 w-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 19a8 8 0 0 1 8-8h0a8 8 0 0 1 8 8" />
                              <circle cx="12" cy="8" r="3" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-[#6b7280]">No Records Found</h3>
                          <p className="text-sm text-[#94a3b8]">Try adjusting your filters or search query</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="border-t border-[rgba(0,0,0,0.04)] text-sm hover:bg-[#f9fafb]">
                        <td className="px-4 py-4 font-medium text-[#0a0d14]">{customer.id}</td>
                        <td className="px-4 py-4 text-[#2e3347]">{customer.name}</td>
                        <td className="px-4 py-4 text-[#2e3347]">{customer.email}</td>
                        <td className="px-4 py-4 text-[#2e3347]">{customer.phone}</td>
                        <td className="px-4 py-4 text-[#2e3347]">{customer.address}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => openEditForm(customer)} className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white px-3 py-2 text-xs font-semibold text-[#2e3347] shadow-sm transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]">
                              Edit
                            </button>
                            <button onClick={() => deleteCustomer(customer.id)} className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white px-3 py-2 text-xs font-semibold text-[#f43f5e] shadow-sm transition hover:border-[#f43f5e]">
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
                <h2 className="font-['Poppins',sans-serif] text-xl font-bold text-[#0a0d14]">{editingCustomerId ? "Edit Customer" : "Create Customer"}</h2>
                <p className="text-sm text-[#6b7280]">Keep the customer record aligned with the table view</p>
              </div>
              <button onClick={() => setIsFormOpen(false)} className="text-[#6b7280] transition hover:text-[#0a0d14]">
                ✕
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Customer ID
                  <input disabled value={formData.id} className="w-full rounded-xl border border-gray-200 bg-gray-100 px-3 py-2.5 outline-none text-gray-500" placeholder="Auto-generated" />
                </label>
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Name
                  <input value={formData.name} onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" placeholder="Company Name" required />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Email
                  <input type="email" value={formData.email} onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" required />
                </label>
                <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                  Phone
                  <input value={formData.phone} onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" />
                </label>
              </div>

              <label className="space-y-1 text-sm font-medium text-[#2e3347]">
                Address
                <input value={formData.address} onChange={(event) => setFormData((current) => ({ ...current, address: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4f6ef7]" />
              </label>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setIsFormOpen(false)} className="flex-1 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-5 py-3 text-sm font-semibold text-[#2e3347] shadow-sm transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]">
                  Cancel
                </button>
                <button onClick={saveCustomer} className="flex-1 rounded-2xl bg-[#4f6ef7] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6]">
                  {editingCustomerId ? "Update Customer" : "Create Customer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
