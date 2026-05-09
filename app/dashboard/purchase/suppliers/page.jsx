"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../Sidebar";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    payment_terms: ""
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/suppliers/");
      if (res.ok) {
        const data = await res.json();
        setSuppliers(data.results || data);
      }
    } catch (err) {
      console.error("Failed to fetch suppliers", err);
    }
  };

  const handleCreateSupplier = async () => {
    if (!formData.name) {
      alert("Supplier name is required.");
      return;
    }
    
    try {
      const res = await fetch("http://localhost:8000/api/suppliers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          city: "",
          country: "",
          payment_terms: ""
        });
        setIsDrawerOpen(false);
        fetchSuppliers();
      } else {
        const errorData = await res.json();
        console.error("Failed to create supplier:", errorData);
        alert("Failed to create supplier.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSupplier = async (id) => {
    if (!confirm("Are you sure you want to delete this supplier?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/suppliers/${id}/`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchSuppliers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredSuppliers = suppliers.filter(s => 
    s.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14] flex overflow-hidden">
      <Sidebar activeLabel="Purchase" activeSubLabel="SUPPLIERS" />

      <div className="flex-1 lg:pl-72 flex flex-col h-screen relative">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 px-8 py-6 backdrop-blur-xl">
          <div>
            <h1 className="text-2xl font-bold text-[#0a0d14]">Suppliers</h1>
            <p className="text-sm text-gray-500 mt-1">Manage all your suppliers and vendors</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search suppliers..." 
                className="w-64 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
            </div>
            <button className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition">
              Columns
            </button>
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 rounded-full bg-[#4f6ef7] px-5 py-2 text-sm font-bold text-white shadow-md shadow-[#4f6ef7]/20 transition hover:bg-[#3d5ce6]"
            >
              <span>+</span> Add Supplier
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8 flex flex-col gap-6">
          
          {/* Select Supplier Card */}
          <div className="rounded-3xl border border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#0a0d14] mb-4">Select Supplier</h2>
            <div className="max-w-3xl">
              <label className="block text-sm font-semibold text-[#0a0d14] mb-2">Supplier</label>
              <div className="flex items-center gap-4">
                <select className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50 text-gray-700 appearance-none shadow-sm cursor-pointer">
                  <option>-- Select a supplier --</option>
                  {suppliers.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <button 
                  onClick={() => setIsDrawerOpen(true)}
                  className="whitespace-nowrap flex items-center gap-2 rounded-xl bg-[#4f6ef7] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#4f6ef7]/20 transition hover:bg-[#3d5ce6] cursor-pointer"
                >
                  <span>+</span> New Supplier
                </button>
              </div>
            </div>
          </div>

          {/* All Suppliers List */}
          <div className="rounded-3xl border border-[rgba(0,0,0,0.06)] bg-white shadow-sm flex-1 flex flex-col min-h-[400px]">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#0a0d14]">All Suppliers</h2>
                <p className="text-sm text-gray-500 mt-1">Complete list of all your suppliers and vendor information</p>
              </div>
              <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                {filteredSuppliers.length} suppliers
              </div>
            </div>

            <div className="flex-1 p-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    <th className="pb-4 pr-4">NAME</th>
                    <th className="pb-4 pr-4">EMAIL</th>
                    <th className="pb-4 pr-4">PHONE</th>
                    <th className="pb-4 pr-4">CITY</th>
                    <th className="pb-4 pr-4">COUNTRY</th>
                    <th className="pb-4 pr-4">PAYMENT TERMS</th>
                    <th className="pb-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-gray-500">
                        No suppliers found.
                      </td>
                    </tr>
                  ) : (
                    filteredSuppliers.map((supplier) => (
                      <tr key={supplier.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                        <td className="py-4 pr-4 text-sm font-medium text-[#0a0d14]">{supplier.name}</td>
                        <td className="py-4 pr-4 text-sm text-gray-500">{supplier.email || "-"}</td>
                        <td className="py-4 pr-4 text-sm text-gray-500">{supplier.phone || "-"}</td>
                        <td className="py-4 pr-4 text-sm text-gray-500">{supplier.city || "-"}</td>
                        <td className="py-4 pr-4 text-sm text-gray-500">{supplier.country || "-"}</td>
                        <td className="py-4 pr-4 text-sm text-gray-500">{supplier.payment_terms || "-"}</td>
                        <td className="py-4 text-right">
                          <button 
                            onClick={() => handleDeleteSupplier(supplier.id)}
                            className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                            title="Delete"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
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

        {/* Create Supplier Drawer */}
        <div className={`absolute top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center gap-4 border-b border-gray-100 p-6">
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="text-gray-400 hover:text-gray-700 transition cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <h2 className="text-lg font-bold text-[#0a0d14]">Add New Supplier</h2>
          </div>

          <div className="flex-1 overflow-auto p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Supplier Name *</label>
              <input 
                type="text" 
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50" 
                placeholder="e.g. Apple Inc."
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input 
                type="email" 
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50" 
                placeholder="contact@apple.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
              <input 
                type="text" 
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50" 
                placeholder="+1 (800) 275-2273"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                <input 
                  type="text" 
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50" 
                  placeholder="Cupertino"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                <input 
                  type="text" 
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50" 
                  placeholder="USA"
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Payment Terms</label>
              <input 
                type="text" 
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50" 
                placeholder="e.g. Net 30"
                value={formData.payment_terms}
                onChange={(e) => setFormData({...formData, payment_terms: e.target.value})}
              />
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 bg-white">
            <button 
              onClick={handleCreateSupplier}
              className="w-full rounded-xl bg-[#4f6ef7] py-3.5 text-base font-bold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6] cursor-pointer"
            >
              Save Supplier
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
