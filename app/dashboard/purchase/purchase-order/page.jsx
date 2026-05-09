"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../Sidebar";

export default function PurchaseOrder() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    supplier: "",
    order_date: new Date().toISOString().split("T")[0],
    status: "DRAFT",
    items: [{ product: "", quantity: 1, purchase_price: 0, line_total: 0 }],
  });

  useEffect(() => {
    fetchOrders();
    fetchSuppliers();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/purchases/orders/");
      const data = await res.json();
      setPurchaseOrders(data.results || data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/suppliers/");
      const data = await res.json();
      setSuppliers(data.results || data);
    } catch (err) {
      console.error("Failed to fetch suppliers", err);
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

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { product: "", quantity: 1, purchase_price: 0, line_total: 0 },
      ],
    }));
  };

  const handleRemoveItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData((prev) => {
      const newItems = [...prev.items];
      if (field === "product") {
        newItems[index][field] = value;
        const selectedProduct = products.find((p) => p.id.toString() === value);
        if (selectedProduct) {
          newItems[index].purchase_price = selectedProduct.cost_price || selectedProduct.price || 0;
        }
      } else {
        newItems[index][field] = value;
      }

      newItems[index].line_total = newItems[index].quantity * newItems[index].purchase_price;
      return { ...prev, items: newItems };
    });
  };

  const getTotalAmount = () => {
    return formData.items.reduce((sum, item) => sum + (item.line_total || 0), 0);
  };

  const handleSubmit = async () => {
    if (!formData.supplier) {
      alert("Please select a supplier.");
      return;
    }
    try {
      const payload = {
        ...formData,
        total_amount: getTotalAmount(),
      };

      const res = await fetch("http://localhost:8000/api/purchases/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsDrawerOpen(false);
        setFormData({
          supplier: "",
          order_date: new Date().toISOString().split("T")[0],
          status: "DRAFT",
          items: [{ product: "", quantity: 1, purchase_price: 0, line_total: 0 }],
        });
        fetchOrders();
      } else {
        const errorData = await res.json();
        console.error("Failed to submit form:", errorData);
        alert("Failed to submit. Check console for details.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      await fetch(`http://localhost:8000/api/purchases/orders/${id}/`, {
        method: "DELETE",
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders = Array.isArray(purchaseOrders) ? purchaseOrders.filter(order => 
    order.id?.toString().includes(searchQuery) ||
    order.supplier_name?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const totalOrdersCount = Array.isArray(purchaseOrders) ? purchaseOrders.length : 0;
  const totalAmountValue = Array.isArray(purchaseOrders) ? purchaseOrders.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0) : 0;
  const pendingOrdersCount = Array.isArray(purchaseOrders) ? purchaseOrders.filter(o => o.status !== 'COMPLETED').length : 0;
  const completedOrdersCount = Array.isArray(purchaseOrders) ? purchaseOrders.filter(o => o.status === 'COMPLETED').length : 0;

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14] flex overflow-hidden">
      <Sidebar activeLabel="Purchase" activeSubLabel="PURCHASE ORDER" />

      <div className="flex-1 lg:pl-72 flex flex-col h-screen relative">
        {/* Header matches the new top bar design */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 px-8 py-6 backdrop-blur-xl">
          <div>
            <h1 className="text-2xl font-bold text-[#0a0d14]">Purchase Order</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and track all purchase orders</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search orders..." 
                className="w-64 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
            </div>
            <button className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition cursor-pointer">
              Columns
            </button>
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 rounded-full bg-[#4f6ef7] px-5 py-2 text-sm font-bold text-white shadow-md shadow-[#4f6ef7]/20 transition hover:bg-[#3d5ce6] cursor-pointer"
            >
              <span>+</span> Create Purchase
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8 flex flex-col gap-6">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white p-5 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Total Orders #{totalOrdersCount}</p>
                  <h3 className="text-2xl font-bold text-[#0a0d14]">${totalAmountValue.toFixed(2)}</h3>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white p-5 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Total Completed</p>
                  <h3 className="text-2xl font-bold text-[#0a0d14]">{completedOrdersCount}</h3>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white p-5 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Total Pending</p>
                  <h3 className="text-2xl font-bold text-[#0a0d14]">{pendingOrdersCount}</h3>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-50 text-yellow-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white p-5 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Total Returned</p>
                  <h3 className="text-2xl font-bold text-[#0a0d14]">0</h3>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* List Section */}
          <div className="rounded-3xl border border-[rgba(0,0,0,0.06)] bg-white shadow-sm flex-1 flex flex-col min-h-[400px]">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#0a0d14]">Purchase Order</h2>
                <p className="text-sm text-gray-500 mt-1">All purchase orders and transactions</p>
              </div>
            </div>

            <div className="flex-1 p-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    <th className="pb-4 pr-4">ORDER</th>
                    <th className="pb-4 pr-4">DATE</th>
                    <th className="pb-4 pr-4">SUPPLIER</th>
                    <th className="pb-4 pr-4">TOTAL AMOUNT</th>
                    <th className="pb-4 pr-4">STATUS</th>
                    <th className="pb-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-gray-500">
                        No purchase orders found.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                        <td className="py-4 pr-4 text-sm font-medium text-[#0a0d14]">
                          PO-{order.id}
                        </td>
                        <td className="py-4 pr-4 text-sm text-gray-500">
                          {new Date(order.order_date).toLocaleDateString()}
                        </td>
                        <td className="py-4 pr-4 text-sm text-gray-500">
                          {order.supplier_name || "-"}
                        </td>
                        <td className="py-4 pr-4 text-sm text-gray-500">
                          ${parseFloat(order.total_amount || 0).toFixed(2)}
                        </td>
                        <td className="py-4 pr-4">
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${
                            order.status === 'COMPLETED' ? 'bg-blue-50 text-blue-600' : 
                            order.status === 'DRAFT' ? 'bg-gray-50 text-gray-600' :
                            'bg-blue-50 text-blue-600'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button 
                            onClick={() => handleDelete(order.id)}
                            className="text-red-500 hover:text-red-600 text-xs font-medium transition cursor-pointer"
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
          </div>
        </div>

        {/* Overlay Background */}
        {isDrawerOpen && (
          <div 
            className="absolute inset-0 bg-gray-900/40 z-40 backdrop-blur-[2px] transition-opacity" 
            onClick={() => setIsDrawerOpen(false)}
          />
        )}

        {/* Create Purchase Order Drawer */}
        <div className={`absolute top-0 right-0 h-full w-[45%] min-w-[500px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center gap-4 border-b border-gray-100 p-6">
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="text-gray-400 hover:text-gray-700 transition cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <h2 className="text-lg font-bold text-[#0a0d14]">Create Purchase order</h2>
          </div>

          <div className="flex-1 overflow-auto p-6">
            {/* Supplier Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
              <select 
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              >
                <option value="">Select Supplier</option>
                {suppliers.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-sm font-medium text-gray-700">
                  <th className="pb-3 pr-4 w-12">SL</th>
                  <th className="pb-3 pr-4">Product</th>
                  <th className="pb-3 pr-4 w-24">Price</th>
                  <th className="pb-3 pr-4 w-24">Quantity</th>
                  <th className="pb-3 pr-4 w-24">Total</th>
                  <th className="pb-3 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-50">
                    <td className="py-4 pr-4 text-sm font-medium text-[#f59e0b]">
                      {index + 1}
                    </td>
                    <td className="py-4 pr-4">
                      <select
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50"
                        value={item.product}
                        onChange={(e) => handleItemChange(index, "product", e.target.value)}
                      >
                        <option value="">Select Product</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-4 pr-4">
                      <input
                        type="number"
                        placeholder="Price"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50"
                        value={item.purchase_price}
                        onChange={(e) => handleItemChange(index, "purchase_price", parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td className="py-4 pr-4">
                      <input
                        type="number"
                        placeholder="Qty"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#4f6ef7] focus:ring-1 focus:ring-[#4f6ef7]/50"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value) || 0)}
                      />
                    </td>
                    <td className="py-4 pr-4 text-sm font-medium text-[#0a0d14]">
                      ${(item.line_total || 0).toFixed(2)}
                    </td>
                    <td className="py-4 text-center">
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="15" y1="9" x2="9" y2="15" />
                          <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4">
              <button
                onClick={handleAddItem}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition cursor-pointer"
              >
                <span>+</span> Add Product
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-2xl font-bold text-[#0a0d14]">
                  ${getTotalAmount().toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 bg-white">
            <button
              onClick={handleSubmit}
              className="w-full rounded-xl bg-[#6366f1] py-3.5 text-base font-bold text-white shadow-lg shadow-[#6366f1]/25 transition hover:bg-[#4f46e5] cursor-pointer"
            >
              Create Purchase Order
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}