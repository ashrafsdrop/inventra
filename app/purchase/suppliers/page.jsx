'use client';

import { useState } from 'react';
import Sidebar from '../../dashboard/Sidebar';
import SectionHeader from '../../dashboard/components/SectionHeader';

export default function SuppliersPage() {
  const [showCreateSupplier, setShowCreateSupplier] = useState(false);
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Apple Inc.', email: 'contact@apple.com', phone: '+1 (800) 275-2273', address: '1 Apple Park Way', city: 'Cupertino', country: 'USA', paymentTerms: 'Net 30' },
    { id: 2, name: 'HP Enterprise', email: 'sales@hpe.com', phone: '+1 (650) 857-1501', address: '1 HP Street', city: 'Palo Alto', country: 'USA', paymentTerms: 'Net 45' },
    { id: 3, name: 'Dell Technologies', email: 'supplier@dell.com', phone: '+1 (800) 624-9897', address: 'One Dell Way', city: 'Round Rock', country: 'USA', paymentTerms: 'Net 30' },
  ]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    paymentTerms: '',
  });
  const [selectedSupplier, setSelectedSupplier] = useState('');

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert('Please enter supplier name');
      return;
    }
    const newSupplier = {
      id: suppliers.length + 1,
      ...formData,
    };
    setSuppliers([...suppliers, newSupplier]);
    setShowCreateSupplier(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      paymentTerms: '',
    });
  };

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="SUPPLIERS" />

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <div className="lg:hidden flex items-center gap-2 font-['Syne',sans-serif] font-extrabold text-[20px] tracking-tight text-[#0a0d14]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4f6ef7]" />
                Inventra
              </div>
              <h1 className="hidden lg:block font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Suppliers</h1>
              <p className="hidden lg:block text-sm text-[#6b7280]">Manage all your suppliers and vendors</p>
            </div>

            <div className="flex flex-1 items-center justify-end gap-3">
              <label className="hidden md:flex min-w-[240px] max-w-[360px] flex-1 items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm text-[#6b7280] shadow-sm">
                <span>⌕</span>
                <input className="w-full bg-transparent outline-none placeholder:text-[#9ca3af]" placeholder="Search suppliers..." />
              </label>
              <button className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] shadow-sm transition duration-200 hover:border-[#4f6ef7] hover:text-[#4f6ef7] hover:scale-105 hover:shadow-md">
                Columns
              </button>
              <button onClick={() => setShowCreateSupplier(true)} className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition duration-200 hover:bg-[#3d5ce6] hover:scale-105 hover:shadow-xl hover:shadow-[#4f6ef7]/35">
                + Add Supplier
              </button>
            </div>
          </div>
        </header>

        <section className="px-4 py-8 md:px-8">
          {/* Supplier Selector */}
          <div className="mb-8 rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-6 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
            <h2 className="text-lg font-bold text-[#0a0d14] mb-4">Select Supplier</h2>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-[#0a0d14] mb-2">Supplier</label>
                <select
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(0,0,0,0.08)] focus:outline-none focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/10 text-[#0a0d14]"
                >
                  <option value="">-- Select a supplier --</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setShowCreateSupplier(true)}
                className="px-4 py-3 rounded-xl bg-[#4f6ef7] text-white font-semibold hover:bg-[#3d5ce6] transition"
              >
                + New Supplier
              </button>
            </div>

            {/* Selected Supplier Details */}
            {selectedSupplier && (
              <div className="mt-6 pt-6 border-t border-[rgba(0,0,0,0.07)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(() => {
                    const supplier = suppliers.find((s) => s.id === parseInt(selectedSupplier));
                    return supplier ? (
                      <>
                        <div>
                          <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1">Name</p>
                          <p className="text-lg font-semibold text-[#0a0d14]">{supplier.name}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1">Email</p>
                          <p className="text-lg font-semibold text-[#0a0d14]">{supplier.email || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1">Phone</p>
                          <p className="text-lg font-semibold text-[#0a0d14]">{supplier.phone || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1">Payment Terms</p>
                          <p className="text-lg font-semibold text-[#0a0d14]">{supplier.paymentTerms || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1">Address</p>
                          <p className="text-lg font-semibold text-[#0a0d14]">{supplier.address || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1">City, Country</p>
                          <p className="text-lg font-semibold text-[#0a0d14]">{supplier.city}, {supplier.country}</p>
                        </div>
                      </>
                    ) : null;
                  })()}
                </div>
              </div>
            )}
          </div>

          {/* All Suppliers Table */}
          <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-6 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
            <SectionHeader
              title="All Suppliers"
              description="Complete list of all your suppliers and vendor information"
              badge={`${suppliers.length} suppliers`}
            />

            <div className="mt-6 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(0,0,0,0.08)]">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#2e3347] uppercase tracking-wide">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#2e3347] uppercase tracking-wide">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#2e3347] uppercase tracking-wide">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#2e3347] uppercase tracking-wide">City</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#2e3347] uppercase tracking-wide">Country</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#2e3347] uppercase tracking-wide">Payment Terms</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <svg className="w-12 h-12 text-[#d1d5db] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 8.048m-7.472 3.596a5.5 5.5 0 117.572 0m-7.572 0L9.88 9.88m6.24 6.24l2.12-2.12m0 0a5.5 5.5 0 117.572 0m-7.572 0l2.12 2.12" />
                          </svg>
                          <p className="text-[#6b7280] font-medium">No Suppliers Found</p>
                          <p className="text-sm text-[#9ca3af]">Add a new supplier to get started</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    suppliers.map((supplier) => (
                      <tr key={supplier.id} className="border-t border-[rgba(0,0,0,0.05)] cursor-pointer transition hover:bg-[#f9fafb]">
                        <td className="px-4 py-3 font-medium text-[#0a0d14]">{supplier.name}</td>
                        <td className="px-4 py-3 text-[#6b7280]">{supplier.email}</td>
                        <td className="px-4 py-3 text-[#6b7280]">{supplier.phone}</td>
                        <td className="px-4 py-3 text-[#6b7280]">{supplier.city}</td>
                        <td className="px-4 py-3 text-[#6b7280]">{supplier.country}</td>
                        <td className="px-4 py-3 text-[#6b7280]">{supplier.paymentTerms}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </article>
        </section>
      </div>

      {/* Create Supplier Modal */}
      {showCreateSupplier && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[rgba(0,0,0,0.07)] px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0a0d14]">Add New Supplier</h2>
              <button onClick={() => setShowCreateSupplier(false)} className="text-[#6b7280] hover:text-[#0a0d14] text-2xl">×</button>
            </div>

            <div className="p-6 space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0a0d14] mb-2">
                    Supplier Name <span className="text-[#f43f5e]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter supplier name"
                    className="w-full px-3 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] focus:outline-none focus:border-[#4f6ef7]"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0a0d14] mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="w-full px-3 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] focus:outline-none focus:border-[#4f6ef7]"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0a0d14] mb-2">Phone</label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full px-3 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] focus:outline-none focus:border-[#4f6ef7]"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0a0d14] mb-2">Payment Terms</label>
                  <input
                    type="text"
                    placeholder="e.g., Net 30"
                    className="w-full px-3 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] focus:outline-none focus:border-[#4f6ef7]"
                    value={formData.paymentTerms}
                    onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                  />
                </div>
              </div>

              {/* Address Info */}
              <div>
                <label className="block text-sm font-semibold text-[#0a0d14] mb-2">Address</label>
                <input
                  type="text"
                  placeholder="Enter street address"
                  className="w-full px-3 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] focus:outline-none focus:border-[#4f6ef7]"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>

              {/* City & Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0a0d14] mb-2">City</label>
                  <input
                    type="text"
                    placeholder="Enter city"
                    className="w-full px-3 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] focus:outline-none focus:border-[#4f6ef7]"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0a0d14] mb-2">Country</label>
                  <input
                    type="text"
                    placeholder="Enter country"
                    className="w-full px-3 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] focus:outline-none focus:border-[#4f6ef7]"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-[rgba(0,0,0,0.07)]">
                <button
                  onClick={() => setShowCreateSupplier(false)}
                  className="px-4 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] text-[#2e3347] font-medium hover:bg-[#f9fafb] transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded-xl bg-[#4f6ef7] text-white font-semibold hover:bg-[#3d5ce6] transition"
                >
                  Add Supplier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
