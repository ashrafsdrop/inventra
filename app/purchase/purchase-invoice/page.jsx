'use client';

import { useState } from 'react';
import Sidebar from '../../dashboard/Sidebar';
import SectionHeader from '../../dashboard/components/SectionHeader';
import StatusBadge from '../../dashboard/components/StatusBadge';

const SUPPLIERS = [
  { id: 1, name: 'Apple Inc.' },
  { id: 2, name: 'HP Enterprise' },
  { id: 3, name: 'Dell Technologies' },
  { id: 4, name: 'Microsoft Corp' },
  { id: 5, name: 'IKEA Systems' },
];

const PRODUCTS = [
  { id: 1, name: 'Apple iPhone 14', sku: 'SKU-1024' },
  { id: 2, name: 'MacBook Air M2', sku: 'SKU-1148' },
  { id: 3, name: 'Office Chair Pro', sku: 'SKU-2081' },
  { id: 4, name: 'Laser Printer X2', sku: 'SKU-3220' },
  { id: 5, name: 'Apple iPhone 13', sku: 'SKU-1001' },
  { id: 6, name: 'HP 240 G8 Core i5', sku: 'SKU-1156' },
  { id: 7, name: 'Dell Monitor 27"', sku: 'SKU-2045' },
  { id: 8, name: 'Cupboard - Florida 3 Door', sku: 'SKU-3310' },
];

function Calendar({ value, onChange, onClose }) {
  const [currentMonth, setCurrentMonth] = useState(new Date(value));

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth(currentMonth); i += 1) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth(currentMonth); i += 1) {
    days.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleSelectDate = (day) => {
    if (!day) return;

    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onChange(selectedDate.toISOString().split('T')[0]);
    onClose();
  };

  const monthYear = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 w-80">
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrevMonth} className="p-2 hover:bg-[#f4f6fb] rounded-lg transition text-[#0a0d14]">
          ←
        </button>
        <h2 className="text-sm font-semibold text-[#0a0d14]">{monthYear}</h2>
        <button onClick={handleNextMonth} className="p-2 hover:bg-[#f4f6fb] rounded-lg transition text-[#0a0d14]">
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-[#6b7280]">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const selectedValue = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
          const isSelected = day && value === selectedValue.toISOString().split('T')[0];

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectDate(day)}
              disabled={!day}
              className={`aspect-square rounded-lg text-sm font-medium transition ${
                !day
                  ? 'cursor-default'
                  : isSelected
                    ? 'bg-[#4f6ef7] text-white hover:bg-[#3d5ce6]'
                    : 'text-[#0a0d14] hover:bg-[#f4f6fb]'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PurchaseInvoicePage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    products: [{ product: '', productId: '', quantity: '', purchasePrice: '', sellingPrice: '', tax: '' }],
    supplier: '',
    supplierId: '',
    date: new Date().toISOString().split('T')[0],
    memo: '',
    note: '',
    payments: [],
  });
  const [supplierSearch, setSupplierSearch] = useState('');
  const [showSupplierDropdown, setShowSupplierDropdown] = useState(false);
  const [productModalIndex, setProductModalIndex] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  const metrics = [
    { label: 'Total Purchases #0', value: '₾ 0', icon: '📊', tone: 'text-[#0ec4a8]' },
    { label: 'Total Purchase Paid', value: '₾ 0', icon: '💰', tone: 'text-[#4f6ef7]' },
    { label: 'Total Purchase Due', value: '₾ 0', icon: '⏳', tone: 'text-[#f43f5e]' },
    { label: 'Total Purchase Return', value: '₾ 0', icon: '📉', tone: 'text-[#f59e0b]' },
  ];

  const invoices = [];

  const handleAddProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { product: '', productId: '', quantity: '', purchasePrice: '', sellingPrice: '', tax: '' }],
    });
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...formData.products];
    newProducts[index][field] = value;
    setFormData({ ...formData, products: newProducts });
  };

  const adjustProductQuantity = (index, delta) => {
    const newProducts = [...formData.products];
    const currentQuantity = parseInt(newProducts[index].quantity, 10) || 0;
    const nextQuantity = Math.max(0, currentQuantity + delta);
    newProducts[index].quantity = nextQuantity === 0 ? '' : String(nextQuantity);
    setFormData({ ...formData, products: newProducts });
  };

  const handleSupplierSelect = (supplier) => {
    setFormData({ ...formData, supplier: supplier.name, supplierId: supplier.id });
    setSupplierSearch('');
    setShowSupplierDropdown(false);
  };

  const handleProductSelect = (index, product) => {
    const newProducts = [...formData.products];
    newProducts[index].product = product.name;
    newProducts[index].productId = product.id;
    setFormData({ ...formData, products: newProducts });
    setProductModalIndex(null);
    setProductSearch('');
  };

  const filteredSuppliers = SUPPLIERS.filter((supplier) =>
    supplier.name.toLowerCase().includes(supplierSearch.toLowerCase())
  );

  const getFilteredProducts = () => {
    return PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      product.sku.toLowerCase().includes(productSearch.toLowerCase())
    );
  };

  const calculateTotal = () => {
    return formData.products.reduce((sum, product) => {
      const amount = (parseFloat(product.quantity) || 0) * (parseFloat(product.purchasePrice) || 0);
      const tax = (amount * (parseFloat(product.tax) || 0)) / 100;
      return sum + amount + tax;
    }, 0);
  };

  const calculateTax = () => {
    return formData.products.reduce((sum, product) => {
      const amount = (parseFloat(product.quantity) || 0) * (parseFloat(product.purchasePrice) || 0);
      const tax = (amount * (parseFloat(product.tax) || 0)) / 100;
      return sum + tax;
    }, 0);
  };

  const handleSubmit = () => {
    console.log('Creating purchase:', formData);
    setShowCreateForm(false);
    setFormData({
      products: [{ product: '', productId: '', quantity: '', purchasePrice: '', sellingPrice: '', tax: '' }],
      supplier: '',
      supplierId: '',
      date: new Date().toISOString().split('T')[0],
      memo: '',
      note: '',
      payments: [],
    });
    setSupplierSearch('');
  };

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="PURCHASE INVOICE" />

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <div className="lg:hidden flex items-center gap-2 font-['Syne',sans-serif] font-extrabold text-[20px] tracking-tight text-[#0a0d14]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4f6ef7]" />
                Inventra
              </div>
              <h1 className="hidden lg:block font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Purchase Invoice</h1>
              <p className="hidden lg:block text-sm text-[#6b7280]">Manage and track all purchase invoices</p>
            </div>

            <div className="flex flex-1 items-center justify-end gap-3">
              <label className="hidden md:flex min-w-[240px] max-w-[360px] flex-1 items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm text-[#6b7280] shadow-sm">
                <span>⌕</span>
                <input className="w-full bg-transparent outline-none placeholder:text-[#9ca3af]" placeholder="Search invoices..." />
              </label>
              <button className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] shadow-sm transition duration-200 hover:border-[#4f6ef7] hover:text-[#4f6ef7] hover:scale-105 hover:shadow-md">
                Columns
              </button>
              <button onClick={() => setShowCreateForm(true)} className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition duration-200 hover:bg-[#3d5ce6] hover:scale-105 hover:shadow-xl hover:shadow-[#4f6ef7]/35">
                + Create Purchase
              </button>
            </div>
          </div>
        </header>

        <section className="px-4 py-6 md:px-8 md:py-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-[rgba(0,0,0,0.07)] bg-white p-4 shadow-sm hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-[#6b7280] font-medium">{metric.label}</p>
                    <p className="text-2xl font-bold text-[#0a0d14] mt-1">{metric.value}</p>
                  </div>
                  <span className="text-2xl">{metric.icon}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 pb-8 md:px-8">
          <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-6 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-['Poppins',sans-serif] text-lg font-bold text-[#0a0d14]">Purchase Invoice</h2>
                <p className="text-sm text-[#6b7280]">All purchase invoices and transactions</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(0,0,0,0.08)]">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#2e3347] uppercase tracking-wide">Invoice</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#2e3347] uppercase tracking-wide">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#2e3347] uppercase tracking-wide">Supplier</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#2e3347] uppercase tracking-wide">Total Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#2e3347] uppercase tracking-wide">Paid</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#2e3347] uppercase tracking-wide">Due</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#2e3347] uppercase tracking-wide">Tax</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-4 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <svg className="w-12 h-12 text-[#d1d5db] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="text-[#6b7280] font-medium">No Records Found</p>
                          <p className="text-sm text-[#9ca3af]">Try adjusting your filters or search query</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-t border-[rgba(0,0,0,0.05)] cursor-pointer transition hover:bg-[#f9fafb]">
                        <td className="px-4 py-3 font-medium text-[#0a0d14]">{invoice.id}</td>
                        <td className="px-4 py-3 text-[#2e3347]">{invoice.date}</td>
                        <td className="px-4 py-3 text-[#6b7280]">{invoice.supplier}</td>
                        <td className="px-4 py-3 font-semibold text-[#0a0d14]">{invoice.amount}</td>
                        <td className="px-4 py-3 text-[#0ec4a8]">{invoice.paid}</td>
                        <td className="px-4 py-3 text-[#f43f5e]">{invoice.due}</td>
                        <td className="px-4 py-3 text-[#f59e0b]">{invoice.tax}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </article>
        </section>
      </div>

      {/* Create Purchase Invoice Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[rgba(0,0,0,0.07)] px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0a0d14]">Create Purchase Invoice</h2>
              <button onClick={() => setShowCreateForm(false)} className="text-[#6b7280] hover:text-[#0a0d14] text-2xl">×</button>
            </div>

            <div className="p-6 space-y-6">
              {/* Products Table */}
              <div>
                <label className="block text-sm font-semibold text-[#0a0d14] mb-3">Products</label>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[rgba(0,0,0,0.08)]">
                        <th className="px-3 py-2 text-left text-xs font-semibold text-[#2e3347]">#</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-[#2e3347]">Product</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-[#2e3347]">Quantity</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-[#2e3347]">Purchase Price</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-[#2e3347]">Selling Price</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-[#2e3347]">Amount</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-[#2e3347]">Tax%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.products.map((product, index) => (
                        <tr key={index} className="border-t border-[rgba(0,0,0,0.05)]">
                          <td className="px-3 py-2 text-sm text-[#6b7280]">{index + 1}</td>
                          <td className="px-3 py-2">
                            <button
                              type="button"
                              onClick={() => {
                                setProductModalIndex(index);
                                setProductSearch('');
                              }}
                              className="w-full px-2 py-2 rounded-lg border border-[rgba(0,0,0,0.08)] text-sm focus:outline-none focus:border-[#4f6ef7] bg-white text-left hover:bg-[#f9fafb] transition"
                            >
                              {product.product || 'Select product'}
                            </button>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1 rounded-lg border border-[rgba(0,0,0,0.08)] bg-white px-1 py-1">
                              <button
                                type="button"
                                onClick={() => adjustProductQuantity(index, -1)}
                                className="flex h-8 w-8 items-center justify-center rounded-md text-[#6b7280] transition hover:bg-[#f4f6fb] hover:text-[#0a0d14]"
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <input
                                type="number"
                                min="0"
                                placeholder="1"
                                className="w-full border-none bg-transparent px-1 py-1 text-sm focus:outline-none"
                                value={product.quantity}
                                onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                              />
                              <button
                                type="button"
                                onClick={() => adjustProductQuantity(index, 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-md text-[#6b7280] transition hover:bg-[#f4f6fb] hover:text-[#0a0d14]"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              placeholder="50000"
                              className="w-full px-2 py-2 rounded-lg border border-[rgba(0,0,0,0.08)] text-sm focus:outline-none focus:border-[#4f6ef7]"
                              value={product.purchasePrice}
                              onChange={(e) => handleProductChange(index, 'purchasePrice', e.target.value)}
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              placeholder="50000"
                              className="w-full px-2 py-2 rounded-lg border border-[rgba(0,0,0,0.08)] text-sm focus:outline-none focus:border-[#4f6ef7]"
                              value={product.sellingPrice}
                              onChange={(e) => handleProductChange(index, 'sellingPrice', e.target.value)}
                            />
                          </td>
                          <td className="px-3 py-2 text-sm text-[#0a0d14] font-medium">
                            {((parseFloat(product.quantity) || 0) * (parseFloat(product.purchasePrice) || 0)).toFixed(2)}
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              placeholder="0"
                              className="w-full px-2 py-2 rounded-lg border border-[rgba(0,0,0,0.08)] text-sm focus:outline-none focus:border-[#4f6ef7]"
                              value={product.tax}
                              onChange={(e) => handleProductChange(index, 'tax', e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={handleAddProduct}
                  className="mt-4 flex items-center gap-2 text-[#4f6ef7] font-semibold hover:text-[#3d5ce6] transition"
                >
                  + Add Product
                </button>
              </div>

              {/* Supplier & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0a0d14] mb-2">
                    Supplier <span className="text-[#f43f5e]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search supplier..."
                      className="w-full px-3 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] focus:outline-none focus:border-[#4f6ef7]"
                      value={showSupplierDropdown ? supplierSearch : formData.supplier}
                      onChange={(e) => {
                        setSupplierSearch(e.target.value);
                        setShowSupplierDropdown(true);
                      }}
                      onFocus={() => setShowSupplierDropdown(true)}
                      onBlur={() => setTimeout(() => setShowSupplierDropdown(false), 100)}
                    />
                    {showSupplierDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[rgba(0,0,0,0.08)] rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto">
                        {filteredSuppliers.map((supplier) => (
                          <button
                            key={supplier.id}
                            type="button"
                            onClick={() => handleSupplierSelect(supplier)}
                            className="w-full text-left px-4 py-3 hover:bg-[#f4f6fb] text-sm text-[#0a0d14] border-b border-[rgba(0,0,0,0.05)] last:border-b-0 font-medium"
                          >
                            {supplier.name}
                          </button>
                        ))}
                        {filteredSuppliers.length === 0 && (
                          <div className="px-4 py-3 text-sm text-[#6b7280]">No suppliers found</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0a0d14] mb-2">
                    Date <span className="text-[#f43f5e]">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCalendar((current) => !current)}
                      className="w-full px-3 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] focus:outline-none focus:border-[#4f6ef7] bg-white text-left hover:bg-[#f9fafb] transition flex items-center justify-between text-[#0a0d14]"
                    >
                      <span>{formData.date}</span>
                      <span className="text-lg">📅</span>
                    </button>
                    {showCalendar && (
                      <div className="absolute top-full left-0 mt-2 z-30">
                        <Calendar
                          value={formData.date}
                          onChange={(date) => setFormData({ ...formData, date })}
                          onClose={() => setShowCalendar(false)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Memo & Note */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0a0d14] mb-2">Supplier Memo</label>
                  <input
                    type="text"
                    placeholder="Memo no"
                    className="w-full px-3 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] focus:outline-none focus:border-[#4f6ef7]"
                    value={formData.memo}
                    onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0a0d14] mb-2">Note</label>
                  <input
                    type="text"
                    placeholder="Note"
                    className="w-full px-3 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] focus:outline-none focus:border-[#4f6ef7]"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  />
                </div>
              </div>

              {/* Payment Summary */}
              <div className="rounded-2xl bg-[#f4f6fb] p-4 space-y-3">
                <h3 className="font-semibold text-[#0a0d14]">Payment Summary</h3>
                <div className="flex justify-between items-center">
                  <span className="text-[#6b7280]">Total amount</span>
                  <span className="font-semibold text-[#0a0d14]">{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6b7280]">Total tax amount</span>
                  <span className="font-semibold text-[#0a0d14]">{calculateTax().toFixed(2)}</span>
                </div>
                <div className="border-t border-[rgba(0,0,0,0.1)] pt-3 flex justify-between items-center">
                  <span className="font-semibold text-[#0a0d14]">Total Payable</span>
                  <span className="text-lg font-bold text-[#4f6ef7]">{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6b7280]">Due Amount</span>
                  <span className="font-semibold text-[#f43f5e]">0.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6b7280]">Paid Amount:</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-[rgba(0,0,0,0.07)]">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] text-[#2e3347] font-medium hover:bg-[#f9fafb] transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded-xl bg-[#4f6ef7] text-white font-semibold hover:bg-[#3d5ce6] transition"
                >
                  Create Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Selection Modal */}
      {productModalIndex !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="sticky top-0 bg-white border-b border-[rgba(0,0,0,0.07)] px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0a0d14]">Select Product</h2>
              <button onClick={() => setProductModalIndex(null)} className="text-[#6b7280] hover:text-[#0a0d14] text-2xl">×</button>
            </div>

            <div className="p-6 space-y-4 flex-1 overflow-y-auto scrollbar-hide">
              <div>
                <input
                  type="text"
                  placeholder="Search products by name or SKU..."
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(0,0,0,0.08)] focus:outline-none focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/10"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto scrollbar-hide">
                {getFilteredProducts().map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      if (productModalIndex !== null) {
                        handleProductSelect(productModalIndex, product);
                      }
                    }}
                    className="text-left p-4 rounded-xl border border-[rgba(0,0,0,0.08)] hover:border-[#4f6ef7] hover:bg-[#f9fafb] transition"
                  >
                    <div className="font-semibold text-[#0a0d14]">{product.name}</div>
                    <div className="text-sm text-[#6b7280] mt-1">{product.sku}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setProductModalIndex(null)}
                className="w-full px-4 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] text-[#2e3347] font-medium hover:bg-white transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
