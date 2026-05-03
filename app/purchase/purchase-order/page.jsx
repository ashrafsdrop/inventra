'use client';

import { useState } from 'react';
import Sidebar from '../../dashboard/Sidebar';

export default function PurchaseOrderPage() {
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [orderData, setOrderData] = useState({
    products: [{ product: '', quantity: '' }],
  });

  const orders = [];

  const handleAddProduct = () => {
    setOrderData({
      ...orderData,
      products: [...orderData.products, { product: '', quantity: '' }],
    });
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...orderData.products];
    newProducts[index][field] = value;
    setOrderData({ ...orderData, products: newProducts });
  };

  const handleSubmit = () => {
    console.log('Creating purchase order:', orderData);
    setShowCreateOrder(false);
    setOrderData({
      products: [{ product: '', quantity: '' }],
    });
  };

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="PURCHASE ORDER" />

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <div className="lg:hidden flex items-center gap-2 font-['Syne',sans-serif] font-extrabold text-[20px] tracking-tight text-[#0a0d14]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4f6ef7]" />
                Inventra
              </div>
              <h1 className="hidden lg:block font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Purchase Order</h1>
              <p className="hidden lg:block text-sm text-[#6b7280]">Manage and create purchase orders</p>
            </div>

            <div className="flex flex-1 items-center justify-end gap-3">
              <label className="hidden md:flex min-w-[240px] max-w-[360px] flex-1 items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm text-[#6b7280] shadow-sm">
                <span>⌕</span>
                <input className="w-full bg-transparent outline-none placeholder:text-[#9ca3af]" placeholder="Search orders..." />
              </label>
              <button className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] shadow-sm transition duration-200 hover:border-[#4f6ef7] hover:text-[#4f6ef7] hover:scale-105 hover:shadow-md">
                Columns
              </button>
              <button onClick={() => setShowCreateOrder(true)} className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition duration-200 hover:bg-[#3d5ce6] hover:scale-105 hover:shadow-xl hover:shadow-[#4f6ef7]/35">
                + Create Order
              </button>
            </div>
          </div>
        </header>

        <section className="px-4 py-8 md:px-8">
          <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-6 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-['Poppins',sans-serif] text-lg font-bold text-[#0a0d14]">Purchase Order</h2>
                <p className="text-sm text-[#6b7280]">All purchase orders</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(0,0,0,0.08)]">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#2e3347] uppercase tracking-wide">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#2e3347] uppercase tracking-wide">Create Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="2" className="px-4 py-12 text-center">
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
                    orders.map((order) => (
                      <tr key={order.id} className="border-t border-[rgba(0,0,0,0.05)] cursor-pointer transition hover:bg-[#f9fafb]">
                        <td className="px-4 py-3 font-medium text-[#0a0d14]">{order.id}</td>
                        <td className="px-4 py-3 text-[#6b7280]">{order.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </article>
        </section>
      </div>

      {/* Create Purchase Order Modal */}
      {showCreateOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl">
            <div className="border-b border-[rgba(0,0,0,0.07)] px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0a0d14]">Create Purchase order</h2>
              <button onClick={() => setShowCreateOrder(false)} className="text-[#6b7280] hover:text-[#0a0d14] text-2xl">×</button>
            </div>

            <div className="p-6 space-y-6">
              {/* Products Table */}
              <div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[rgba(0,0,0,0.08)]">
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#2e3347]">SL</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#2e3347]">Product</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#2e3347]">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderData.products.map((product, index) => (
                        <tr key={index} className="border-t border-[rgba(0,0,0,0.05)]">
                          <td className="px-4 py-3 text-sm text-[#6b7280]">{index + 1}</td>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              placeholder="Product"
                              className="w-full px-3 py-2 rounded-lg border border-[rgba(0,0,0,0.08)] text-sm focus:outline-none focus:border-[#4f6ef7]"
                              value={product.product}
                              onChange={(e) => handleProductChange(index, 'product', e.target.value)}
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              placeholder="Quantity"
                              className="w-full px-3 py-2 rounded-lg border border-[rgba(0,0,0,0.08)] text-sm focus:outline-none focus:border-[#4f6ef7]"
                              value={product.quantity}
                              onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
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

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-[rgba(0,0,0,0.07)]">
                <button
                  onClick={() => setShowCreateOrder(false)}
                  className="px-4 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] text-[#2e3347] font-medium hover:bg-[#f9fafb] transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded-xl bg-[#4f6ef7] text-white font-semibold hover:bg-[#3d5ce6] transition"
                >
                  Create Purchase Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
