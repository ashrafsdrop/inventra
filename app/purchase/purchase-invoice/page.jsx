'use client';

import { useEffect, useMemo, useState } from 'react';
import Sidebar from '../../dashboard/Sidebar';
import apiFetch from '../../lib/api';

function generateInvoiceNumber() {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
  return `PI-${stamp}`;
}

function createEmptyLineItem() {
  return {
    productId: '',
    product: '',
    quantity: '1',
    purchasePrice: '',
    sellingPrice: '',
    tax: '0',
  };
}

function formatMoney(value) {
  const number = Number(value) || 0;
  return `£${number.toLocaleString()}`;
}

function PurchaseInvoiceModal({ isOpen, suppliers, products, onClose, onSave }) {
  const [formData, setFormData] = useState(() => ({
    supplierId: '',
    invoiceNumber: generateInvoiceNumber(),
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    memo: '',
    note: '',
    paidAmount: '0',
    items: [createEmptyLineItem()],
  }));

  useEffect(() => {
    if (isOpen) {
      queueMicrotask(() => {
        setFormData({
          supplierId: '',
          invoiceNumber: generateInvoiceNumber(),
          invoiceDate: new Date().toISOString().split('T')[0],
          dueDate: '',
          memo: '',
          note: '',
          paidAmount: '0',
          items: [createEmptyLineItem()],
        });
      });
    }
  }, [isOpen]);

  const selectedSupplier = suppliers.find((supplier) => String(supplier.id) === String(formData.supplierId));

  const subtotal = formData.items.reduce((sum, item) => {
    const quantity = Number(item.quantity) || 0;
    const price = Number(item.purchasePrice) || 0;
    return sum + quantity * price;
  }, 0);

  const taxTotal = formData.items.reduce((sum, item) => {
    const quantity = Number(item.quantity) || 0;
    const price = Number(item.purchasePrice) || 0;
    const rate = Number(item.tax) || 0;
    return sum + ((quantity * price) * rate) / 100;
  }, 0);

  const totalPayable = subtotal + taxTotal;
  const paidAmount = Number(formData.paidAmount) || 0;
  const dueAmount = Math.max(totalPayable - paidAmount, 0);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData((prev) => {
      const nextItems = [...prev.items];
      nextItems[index] = { ...nextItems[index], [field]: value };

      if (field === 'productId') {
        const selectedProduct = products.find((product) => String(product.id) === String(value));
        if (selectedProduct) {
          nextItems[index].product = selectedProduct.name;
          if (!nextItems[index].purchasePrice) {
            nextItems[index].purchasePrice = String(selectedProduct.purchase_price || 0);
          }
        }
      }

      return { ...prev, items: nextItems };
    });
  };

  const addItem = () => {
    setFormData((prev) => ({ ...prev, items: [...prev.items, createEmptyLineItem()] }));
  };

  const removeItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.length === 1 ? prev.items : prev.items.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const handleSubmit = async () => {
    if (!formData.supplierId) {
      alert('Please select a supplier');
      return;
    }

    const items = formData.items
      .filter((item) => item.productId && Number(item.quantity) > 0)
      .map((item) => {
        const quantity = Number(item.quantity) || 0;
        const purchasePrice = Number(item.purchasePrice) || 0;
        const taxRate = Number(item.tax) || 0;
        const lineTotal = quantity * purchasePrice + ((quantity * purchasePrice) * taxRate) / 100;

        return {
          product: Number(item.productId),
          quantity,
          purchase_price: purchasePrice,
          selling_price: item.sellingPrice ? Number(item.sellingPrice) : null,
          tax: taxRate,
          line_total: lineTotal,
        };
      });

    if (!items.length) {
      alert('Please add at least one product');
      return;
    }

    await onSave({
      supplier: Number(formData.supplierId),
      invoice_number: formData.invoiceNumber,
      invoice_date: formData.invoiceDate,
      due_date: formData.dueDate || null,
      paid_amount: paidAmount,
      due_amount: dueAmount,
      total_amount: totalPayable,
      total_tax: taxTotal,
      memo: formData.memo,
      note: formData.note,
      status: dueAmount > 0 ? 'UNPAID' : 'PAID',
      items,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.07)] px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-[#0a0d14]">Create Purchase</h2>
            <p className="text-sm text-[#6b7280]">Create and save a purchase invoice to the backend</p>
          </div>
          <button onClick={onClose} className="text-2xl text-[#6b7280] hover:text-[#0a0d14]">×</button>
        </div>

        <div className="grid gap-6 overflow-y-auto p-6 xl:grid-cols-[1fr_380px]">
          <div className="rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-[#0a0d14]">Items</h3>
              <span className="text-sm text-[#6b7280]">Invoice {formData.invoiceNumber}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs font-semibold uppercase text-gray-500">
                    <th className="pb-3 pr-3">#</th>
                    <th className="pb-3 pr-3">Product</th>
                    <th className="pb-3 pr-3 w-28">Qty</th>
                    <th className="pb-3 pr-3 w-32">Purchase Price</th>
                    <th className="pb-3 pr-3 w-32">Selling Price</th>
                    <th className="pb-3 pr-3 w-24">Tax %</th>
                    <th className="pb-3 w-12" />
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-50">
                      <td className="py-3 pr-3 text-sm font-medium text-[#4f6ef7]">{index + 1}</td>
                      <td className="py-3 pr-3">
                        <select
                          value={item.productId}
                          onChange={(event) => handleItemChange(index, 'productId', event.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50"
                        >
                          <option value="">Select Product</option>
                          {products.map((product) => (
                            <option key={product.id} value={product.id}>{product.name} {product.sku ? `(${product.sku})` : ''}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 pr-3">
                        <input
                          type="number"
                          min="0"
                          value={item.quantity}
                          onChange={(event) => handleItemChange(index, 'quantity', event.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50"
                        />
                      </td>
                      <td className="py-3 pr-3">
                        <input
                          type="number"
                          min="0"
                          value={item.purchasePrice}
                          onChange={(event) => handleItemChange(index, 'purchasePrice', event.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50"
                        />
                      </td>
                      <td className="py-3 pr-3">
                        <input
                          type="number"
                          min="0"
                          value={item.sellingPrice}
                          onChange={(event) => handleItemChange(index, 'sellingPrice', event.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50"
                        />
                      </td>
                      <td className="py-3 pr-3">
                        <input
                          type="number"
                          min="0"
                          value={item.tax}
                          onChange={(event) => handleItemChange(index, 'tax', event.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50"
                        />
                      </td>
                      <td className="py-3 text-center">
                        <button onClick={() => removeItem(index)} className="text-red-400 transition hover:text-red-600">×</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={addItem}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#0a0d14] shadow-sm transition hover:bg-gray-50"
            >
              + Add Product
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Supplier <span className="text-red-500">*</span></label>
                  <select
                    value={formData.supplierId}
                    onChange={(event) => handleChange('supplierId', event.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500 outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50"
                  >
                    <option value="">Select a supplier</option>
                    {suppliers.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                    ))}
                  </select>
                  {selectedSupplier ? <p className="mt-2 text-xs text-[#6b7280]">Selected: {selectedSupplier.name}</p> : null}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Invoice Date <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    value={formData.invoiceDate}
                    onChange={(event) => handleChange('invoiceDate', event.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(event) => handleChange('dueDate', event.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Invoice Number</label>
                  <input
                    type="text"
                    value={formData.invoiceNumber}
                    onChange={(event) => handleChange('invoiceNumber', event.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Supplier Memo</label>
                  <input
                    type="text"
                    value={formData.memo}
                    onChange={(event) => handleChange('memo', event.target.value)}
                    placeholder="Memo no"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none placeholder:text-gray-300 focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Note</label>
                  <input
                    type="text"
                    value={formData.note}
                    onChange={(event) => handleChange('note', event.target.value)}
                    placeholder="Note"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none placeholder:text-gray-300 focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-semibold text-[#0a0d14]">Payment Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-500"><span>Total amount</span><span>{formatMoney(subtotal)}</span></div>
                <div className="flex justify-between text-gray-500"><span>Total tax amount</span><span>{formatMoney(taxTotal)}</span></div>
                <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-[#0a0d14]"><span>Total Payable</span><span>{formatMoney(totalPayable)}</span></div>
                <div className="flex justify-between text-red-400"><span>Due Amount</span><span>{formatMoney(dueAmount)}</span></div>
                <div className="pt-4">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Paid Amount</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.paidAmount}
                    onChange={(event) => handleChange('paidAmount', event.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full rounded-xl bg-[#6366f1] py-4 text-base font-bold text-white shadow-lg shadow-[#6366f1]/25 transition hover:bg-[#4f46e5]"
            >
              Create Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PurchaseInvoicePage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError('');

        const [invoiceData, supplierData, productData] = await Promise.all([
          apiFetch('/api/purchases/invoices/'),
          apiFetch('/api/suppliers/'),
          apiFetch('/api/inventory/products/'),
        ]);

        const invoiceList = Array.isArray(invoiceData) ? invoiceData : invoiceData.results || [];
        const supplierList = Array.isArray(supplierData) ? supplierData : supplierData.results || [];
        const productList = Array.isArray(productData) ? productData : productData.results || [];

        if (!mounted) return;

        setSuppliers(supplierList);
        setProducts(productList);
        setInvoices(
          invoiceList.map((invoice) => ({
            id: invoice.id,
            invoiceNumber: invoice.invoice_number,
            date: invoice.invoice_date,
            supplierName: invoice.supplier_name || supplierList.find((supplier) => supplier.id === invoice.supplier)?.name || '',
            totalAmount: Number(invoice.total_amount || 0),
            paidAmount: Number(invoice.paid_amount || 0),
            dueAmount: Number(invoice.due_amount || 0),
            totalTax: Number(invoice.total_tax || 0),
            status: invoice.status,
          }))
        );
      } catch (fetchError) {
        if (mounted) {
          setError(fetchError.message || 'Failed to load purchase invoices');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [reloadKey]);

  const metrics = useMemo(
    () => [
      { label: `Total Purchases #${invoices.length}`, value: formatMoney(invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0)), icon: '📊' },
      { label: 'Total Purchase Paid', value: formatMoney(invoices.reduce((sum, invoice) => sum + invoice.paidAmount, 0)), icon: '💰' },
      { label: 'Total Purchase Due', value: formatMoney(invoices.reduce((sum, invoice) => sum + invoice.dueAmount, 0)), icon: '⏳' },
      { label: 'Total Purchase Return', value: formatMoney(0), icon: '📉' },
    ],
    [invoices]
  );

  const filteredInvoices = useMemo(() => {
    if (!searchQuery.trim()) return invoices;
    const query = searchQuery.toLowerCase();
    return invoices.filter(
      (invoice) =>
        invoice.invoiceNumber.toLowerCase().includes(query) ||
        invoice.supplierName.toLowerCase().includes(query) ||
        invoice.status.toLowerCase().includes(query)
    );
  }, [searchQuery, invoices]);

  const handleSaveInvoice = async (payload) => {
    try {
      await apiFetch('/api/purchases/invoices/', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setShowCreateForm(false);
      setReloadKey((value) => value + 1);
      alert('Purchase invoice created successfully!');
    } catch (saveError) {
      alert(saveError.message || 'Failed to create purchase invoice');
      throw saveError;
    }
  };

  const handleDeleteInvoice = async (invoice) => {
    const confirmed = window.confirm(`Delete invoice ${invoice.invoiceNumber}?`);
    if (!confirmed) return;

    try {
      await apiFetch(`/api/purchases/invoices/${invoice.id}/`, { method: 'DELETE' });
      setReloadKey((value) => value + 1);
      alert('Purchase invoice deleted successfully!');
    } catch (deleteError) {
      alert(deleteError.message || 'Failed to delete purchase invoice');
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="PURCHASE" activeSubLabel="PURCHASE INVOICE" />

      <div className="flex min-h-screen flex-1 flex-col lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <h1 className="font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Purchase Invoice</h1>
              <p className="text-sm text-[#6b7280]">Manage and track all purchase invoices</p>
            </div>

            <div className="flex flex-1 items-center justify-end gap-3">
              <label className="hidden min-w-[240px] max-w-[360px] flex-1 items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm text-[#6b7280] shadow-sm md:flex">
                <span>⌕</span>
                <input
                  className="w-full bg-transparent outline-none placeholder:text-[#9ca3af]"
                  placeholder="Search invoices..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </label>
              <button className="hidden cursor-pointer items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] shadow-sm transition hover:border-[#4f6ef7] hover:text-[#4f6ef7] sm:inline-flex">
                Columns
              </button>
              <button
                onClick={() => setShowCreateForm(true)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6]"
              >
                + Create Purchase
              </button>
            </div>
          </div>
        </header>

        <section className="px-4 py-6 md:px-8 md:py-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <article key={metric.label} className="rounded-2xl border border-[rgba(0,0,0,0.07)] bg-white p-4 shadow-sm transition hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-[#6b7280]">{metric.label}</p>
                    <p className="mt-1 text-2xl font-bold text-[#0a0d14]">{metric.value}</p>
                  </div>
                  <span className="text-2xl">{metric.icon}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 pb-8 md:px-8">
          <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-6 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-['Poppins',sans-serif] text-lg font-bold text-[#0a0d14]">Purchase Invoice</h2>
                <p className="text-sm text-[#6b7280]">All purchase invoices and transactions</p>
              </div>
            </div>

            {loading ? (
              <div className="rounded-2xl border border-dashed border-[rgba(0,0,0,0.08)] p-8 text-sm text-[#6b7280]">Loading purchase invoices...</div>
            ) : error ? (
              <div className="rounded-2xl border border-dashed border-[rgba(0,0,0,0.08)] p-8 text-sm text-[#f43f5e]">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[rgba(0,0,0,0.08)]">
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#2e3347]">Invoice</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#2e3347]">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#2e3347]">Supplier</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#2e3347]">Total Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#2e3347]">Paid</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#2e3347]">Due</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#2e3347]">Tax</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#2e3347]">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#2e3347]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="px-4 py-12 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <svg className="mb-3 h-12 w-12 text-[#d1d5db]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="font-medium text-[#6b7280]">No Records Found</p>
                            <p className="text-sm text-[#9ca3af]">Try adjusting your filters or search query</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredInvoices.map((invoice) => (
                        <tr key={invoice.id} className="cursor-pointer border-t border-[rgba(0,0,0,0.05)] transition hover:bg-[#f9fafb]">
                          <td className="px-4 py-3 font-medium text-[#0a0d14]">{invoice.invoiceNumber}</td>
                          <td className="px-4 py-3 text-[#6b7280]">{invoice.date}</td>
                          <td className="px-4 py-3 text-[#6b7280]">{invoice.supplierName}</td>
                          <td className="px-4 py-3 text-[#6b7280]">{formatMoney(invoice.totalAmount)}</td>
                          <td className="px-4 py-3 text-[#6b7280]">{formatMoney(invoice.paidAmount)}</td>
                          <td className="px-4 py-3 text-[#6b7280]">{formatMoney(invoice.dueAmount)}</td>
                          <td className="px-4 py-3 text-[#6b7280]">{formatMoney(invoice.totalTax)}</td>
                          <td className="px-4 py-3">
                            <span className="rounded-full bg-[#4f6ef7]/10 px-3 py-1 text-xs font-semibold text-[#4f6ef7]">{invoice.status}</span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleDeleteInvoice(invoice)}
                              className="rounded-lg border border-[rgba(0,0,0,0.08)] bg-white px-2.5 py-1.5 text-xs font-medium text-[#f43f5e] transition hover:bg-[#f43f5e]/10"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </article>
        </section>
      </div>

      <PurchaseInvoiceModal
        isOpen={showCreateForm}
        suppliers={suppliers}
        products={products}
        onClose={() => setShowCreateForm(false)}
        onSave={handleSaveInvoice}
      />
    </main>
  );
}