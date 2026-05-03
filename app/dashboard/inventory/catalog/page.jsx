'use client';

import { useState, useMemo } from 'react';
import Sidebar from '../../Sidebar';

const mockCategories = [
  { id: 'C001', name: 'Electronics', productCount: 342, description: 'Digital devices and components' },
  { id: 'C002', name: 'Computers & Laptops', productCount: 128, description: 'Desktop and portable computing' },
  { id: 'C003', name: 'Networking', productCount: 87, description: 'Network infrastructure equipment' },
  { id: 'C004', name: 'Peripherals', productCount: 215, description: 'Computer accessories and peripherals' },
  { id: 'C005', name: 'Furniture', productCount: 94, description: 'Office and home furniture' },
];

function SectionHeader({ title, description, badge }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="font-['Syne',sans-serif] text-lg font-bold text-[#0a0d14]">{title}</h2>
        <p className="text-sm text-[#6b7280]">{description}</p>
      </div>
      <span className="rounded-2xl bg-[#f4f6fb] px-3 py-2 text-xs font-medium text-[#2e3347]">{badge}</span>
    </div>
  );
}

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return mockCategories;
    const query = searchQuery.toLowerCase();
    return mockCategories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="CATEGORIES" />

      <div className="lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <h1 className="font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Categories</h1>
              <p className="text-sm text-[#6b7280]">Manage product categories and subcategories</p>
            </div>

            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6]"
            >
              ➕ Add Category
            </button>
          </div>
        </header>

        {/* Search */}
        <section className="border-b border-[rgba(0,0,0,0.06)] bg-white px-4 py-4 md:px-8">
          <div className="flex items-center gap-3 max-w-md">
            <div className="flex-1 flex items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-[#9ca3af]"
              />
            </div>
          </div>
        </section>

        {/* Table Section */}
        <section className="px-4 py-6 md:px-8">
          {filteredCategories.length === 0 ? (
            <div className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-12 text-center shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
              <div className="flex justify-center mb-4">
                <span className="text-5xl">📂</span>
              </div>
              <p className="text-lg font-semibold text-[#6b7280]">No Categories Found</p>
              <p className="text-sm text-[#9ca3af] mt-2">Try adjusting your search query</p>
            </div>
          ) : (
            <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white shadow-[0_12px_40px_rgba(10,13,20,0.05)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#f4f6fb] border-b border-[rgba(0,0,0,0.07)]">
                    <tr>
                      <th className="px-4 py-4 font-semibold text-xs uppercase tracking-[0.16em] text-[#6b7280]">ID</th>
                      <th className="px-4 py-4 font-semibold text-xs uppercase tracking-[0.16em] text-[#6b7280]">Category Name</th>
                      <th className="px-4 py-4 font-semibold text-xs uppercase tracking-[0.16em] text-[#6b7280]">Description</th>
                      <th className="px-4 py-4 font-semibold text-xs uppercase tracking-[0.16em] text-[#6b7280]">Products</th>
                      <th className="px-4 py-4 font-semibold text-xs uppercase tracking-[0.16em] text-[#6b7280]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCategories.map((category) => (
                      <tr key={category.id} className="border-t border-[rgba(0,0,0,0.05)] hover:bg-[#f4f6fb]/50 transition">
                        <td className="px-4 py-4 font-medium text-[#4f6ef7]">{category.id}</td>
                        <td className="px-4 py-4 font-semibold text-[#0a0d14]">{category.name}</td>
                        <td className="px-4 py-4 text-[#6b7280]">{category.description}</td>
                        <td className="px-4 py-4">
                          <span className="inline-flex rounded-full bg-[#0ec4a8]/10 px-3 py-1 text-xs font-semibold text-[#0ec4a8]">
                            {category.productCount} items
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedCategory(category)}
                              className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-[rgba(0,0,0,0.08)] bg-white px-2 py-1.5 text-xs font-medium text-[#2e3347] hover:border-[#4f6ef7] hover:text-[#4f6ef7] transition"
                            >
                              ✏️ Edit
                            </button>
                            <button className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-[rgba(0,0,0,0.08)] bg-white px-2 py-1.5 text-xs font-medium text-[#f43f5e] hover:bg-[#f43f5e]/10 transition">
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="border-t border-[rgba(0,0,0,0.07)] bg-[#f4f6fb] px-4 py-3 text-xs text-[#6b7280]">
                Showing {filteredCategories.length} of {mockCategories.length} categories
              </div>
            </article>
          )}
        </section>
      </div>
    </main>
  );
}
