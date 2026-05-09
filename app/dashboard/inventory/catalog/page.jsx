'use client';

import { useEffect, useMemo, useState } from 'react';
import Sidebar from '../../Sidebar';
import apiFetch from '../../../lib/api';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function createEmptyCategoryForm() {
  return {
    name: '',
    description: '',
  };
}

function createCategoryForm(category) {
  if (!category) return createEmptyCategoryForm();

  return {
    name: category.name || '',
    description: category.description || '',
  };
}

function CategoryModal({ isOpen, isEditMode, initialData, onClose, onSave }) {
  const [formData, setFormData] = useState(() => createCategoryForm(initialData));

  useEffect(() => {
    if (isOpen) {
      queueMicrotask(() => {
        setFormData(createCategoryForm(initialData));
      });
    }
  }, [isOpen, initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert('Please enter a category name');
      return;
    }

    await onSave(formData);
    setFormData(createEmptyCategoryForm());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.07)] px-6 py-4">
          <h2 className="text-lg font-bold text-[#0a0d14]">{isEditMode ? 'Edit Category' : 'Create Category'}</h2>
          <button onClick={onClose} className="cursor-pointer text-[#6b7280] hover:text-[#0a0d14]">
            ✕
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#0a0d14]">
              <span className="text-[#f43f5e]">*</span> Category Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#0a0d14]">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter category description"
              className="w-full resize-none rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white"
            />
          </div>
        </div>

        <div className="flex gap-3 border-t border-[rgba(0,0,0,0.07)] px-6 py-4">
          <button
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 cursor-pointer rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6]"
          >
            {isEditMode ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let mounted = true;

    const loadCategories = async () => {
      try {
        setError('');
        const data = await apiFetch('/api/inventory/categories/');
        const list = Array.isArray(data) ? data : data.results || [];
        const normalized = list.map((category) => ({
          id: category.id,
          name: category.name,
          description: category.description || '',
          productCount: category.product_count ?? category.productCount ?? 0,
        }));

        if (mounted) {
          setCategories(normalized);
        }
      } catch (fetchError) {
        if (mounted) {
          setError(fetchError.message || 'Failed to load categories');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      mounted = false;
    };
  }, [reloadKey]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const query = searchQuery.toLowerCase();
    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query) ||
        String(category.id).toLowerCase().includes(query)
    );
  }, [searchQuery, categories]);

  const handleSaveCategory = async (formData) => {
    const isEditMode = Boolean(selectedCategory);
    const endpoint = isEditMode ? `/api/inventory/categories/${selectedCategory.id}/` : '/api/inventory/categories/';
    const method = isEditMode ? 'PATCH' : 'POST';

    try {
      await apiFetch(endpoint, {
        method,
        body: JSON.stringify(formData),
      });
      alert(isEditMode ? 'Category updated successfully!' : 'Category created successfully!');
      setShowCategoryForm(false);
      setSelectedCategory(null);
      setReloadKey((value) => value + 1);
    } catch (saveError) {
      alert(saveError.message || 'Failed to save category');
      throw saveError;
    }
  };

  const handleDeleteCategory = async (category) => {
    const confirmed = window.confirm(`Delete ${category.name}? This will also remove its subcategories and linked products may be affected.`);
    if (!confirmed) return;

    try {
      await apiFetch(`/api/inventory/categories/${category.id}/`, {
        method: 'DELETE',
      });
      alert('Category deleted successfully!');
      if (selectedCategory?.id === category.id) {
        setSelectedCategory(null);
      }
      setReloadKey((value) => value + 1);
    } catch (deleteError) {
      alert(deleteError.message || 'Failed to delete category');
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="CATEGORIES" />

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <h1 className="font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Categories</h1>
              <p className="text-sm text-[#6b7280]">Manage product categories and subcategories</p>
            </div>

            <button
              onClick={() => {
                setSelectedCategory(null);
                setShowCategoryForm(true);
              }}
              className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6]"
            >
              ➕ Add Category
            </button>
          </div>
        </header>

        <section className="border-b border-[rgba(0,0,0,0.06)] bg-white px-4 py-4 md:px-8">
          <div className="flex max-w-md items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm">
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

        <section className="px-4 py-6 md:px-8">
          {loading ? (
            <div className="rounded-3xl border border-dashed border-[rgba(0,0,0,0.08)] p-6 text-sm text-[#6b7280]">Loading categories...</div>
          ) : error ? (
            <div className="rounded-3xl border border-dashed border-[rgba(0,0,0,0.08)] p-6 text-sm text-[#f43f5e]">{error}</div>
          ) : filteredCategories.length === 0 ? (
            <div className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-12 text-center shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
              <div className="mb-4 flex justify-center">
                <span className="text-5xl">📂</span>
              </div>
              <p className="text-lg font-semibold text-[#6b7280]">No Categories Found</p>
              <p className="mt-2 text-sm text-[#9ca3af]">Try adjusting your search query</p>
            </div>
          ) : (
            <article className="overflow-hidden rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-[rgba(0,0,0,0.07)] bg-[#f4f6fb]">
                    <tr>
                      <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7280]">ID</th>
                      <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7280]">Category Name</th>
                      <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7280]">Description</th>
                      <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7280]">Products</th>
                      <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7280]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCategories.map((category) => (
                      <tr key={category.id} className="border-t border-[rgba(0,0,0,0.05)] transition hover:bg-[#f4f6fb]/50">
                        <td className="px-4 py-4 font-medium text-[#4f6ef7]">{category.id}</td>
                        <td className="px-4 py-4 font-semibold text-[#0a0d14]">{category.name}</td>
                        <td className="px-4 py-4 text-[#6b7280]">{category.description || '-'}</td>
                        <td className="px-4 py-4">
                          <span className="inline-flex rounded-full bg-[#0ec4a8]/10 px-3 py-1 text-xs font-semibold text-[#0ec4a8]">
                            {category.productCount} items
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedCategory(category);
                                setShowCategoryForm(true);
                              }}
                              className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[rgba(0,0,0,0.08)] bg-white px-2 py-1.5 text-xs font-medium text-[#2e3347] transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category)}
                              className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[rgba(0,0,0,0.08)] bg-white px-2 py-1.5 text-xs font-medium text-[#f43f5e] transition hover:bg-[#f43f5e]/10"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-[rgba(0,0,0,0.07)] bg-[#f4f6fb] px-4 py-3 text-xs text-[#6b7280]">
                Showing {filteredCategories.length} of {categories.length} categories
              </div>
            </article>
          )}
        </section>
      </div>

      <CategoryModal
        isOpen={showCategoryForm}
        isEditMode={Boolean(selectedCategory)}
        initialData={selectedCategory}
        onClose={() => {
          setShowCategoryForm(false);
          setSelectedCategory(null);
        }}
        onSave={handleSaveCategory}
      />
    </main>
  );
}
