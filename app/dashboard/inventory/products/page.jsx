'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Sidebar from '../../Sidebar';
import apiFetch from '../../../lib/api';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Mock category data
const initialCategories = [
  { id: 'C001', name: 'Electronics' },
  { id: 'C002', name: 'Computers & Laptops' },
  { id: 'C003', name: 'Networking' },
  { id: 'C004', name: 'Peripherals' },
  { id: 'C005', name: 'Furniture' },
];

// Mock brand data
const initialBrands = [
  { id: 'B001', name: 'Apple' },
  { id: 'B002', name: 'Dell' },
  { id: 'B003', name: 'HP' },
  { id: 'B004', name: 'Corsair' },
  { id: 'B005', name: 'Logitech' },
];

// Mock subcategory data
const initialSubcategories = [
  { id: 'SC001', name: 'Smartphones' },
  { id: 'SC002', name: 'Laptops' },
  { id: 'SC003', name: 'Monitors' },
  { id: 'SC004', name: 'Keyboards' },
  { id: 'SC005', name: 'Mice' },
];

// products will be loaded from the backend
const mockProducts = [];

function getImageUrl(imagePath) {
  if (!imagePath) return null;
  if (/^https?:\/\//i.test(imagePath)) return imagePath;
  return `${API_BASE}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
}

function createEmptyProductForm() {
  return {
    name: '',
    category: '',
    brand: '',
    subCategory: '',
    sku: '',
    purchasePrice: '',
    salePrice: '',
    vat: '',
    quantity: '',
    uom: 'Unit',
    reorderQty: '',
    description: '',
    image: null,
    imagePreview: null,
  };
}

function createProductForm(product) {
  if (!product) return createEmptyProductForm();

  return {
    name: product.name || '',
    category: product.categoryId || '',
    brand: product.brandId || '',
    subCategory: product.subcategoryId || '',
    sku: product.sku || '',
    purchasePrice: product.purchasePrice ?? '',
    salePrice: product.salePrice ?? '',
    vat: product.vat ?? '',
    quantity: product.quantity ?? '',
    uom: product.uom || 'Unit',
    reorderQty: product.reorderQty ?? '',
    description: product.description || '',
    image: null,
    imagePreview: product.imageUrl || null,
  };
}

function buildProductPayload(formData) {
  const payload = new FormData();

  payload.append('name', formData.name || '');
  payload.append('sku', formData.sku || '');
  payload.append('category', formData.category || '');
  if (formData.brand) payload.append('brand', formData.brand);
  if (formData.subCategory) payload.append('subcategory', formData.subCategory);
  payload.append('purchase_price', String(formData.purchasePrice || 0));
  payload.append('sale_price', String(formData.salePrice || 0));
  payload.append('tax', String(formData.vat || 0));
  payload.append('quantity', String(formData.quantity || 0));
  payload.append('reorder_qty', String(formData.reorderQty || 0));
  payload.append('unit_of_measure', formData.uom || 'Unit');
  payload.append('description', formData.description || '');

  if (formData.image instanceof File) {
    payload.append('image', formData.image);
  }

  return payload;
}

const allColumns = [
  { id: 'id', label: 'ID', visible: true },
  { id: 'image', label: 'IMAGE', visible: true },
  { id: 'name', label: 'NAME', visible: true },
  { id: 'brand', label: 'BRAND', visible: true },
  { id: 'subCategory', label: 'SUB CATEGORY', visible: true },
  { id: 'sku', label: 'SKU', visible: true },
  { id: 'purchasePrice', label: 'PURCHASE PRICE', visible: true },
  { id: 'vat', label: 'VAT', visible: true },
  { id: 'salePrice', label: 'SALE PRICE', visible: true },
  { id: 'quantity', label: 'QUANTITY', visible: true },
  { id: 'uom', label: 'UOM', visible: true },
  { id: 'reorderQty', label: 'REORDER QTY', visible: true },
];

function StockBadge({ quantity, reorderQty }) {
  let status = 'In Stock';
  let color = 'bg-[#0ec4a8]/10 text-[#0ec4a8]';

  if (quantity <= 0) {
    status = 'Out of Stock';
    color = 'bg-[#f43f5e]/10 text-[#f43f5e]';
  } else if (quantity <= reorderQty) {
    status = 'Low Stock';
    color = 'bg-[#f59e0b]/10 text-[#f59e0b]';
  }

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${color}`}>{status}</span>;
}

// Add Product Modal Component
function AddProductModal({ isOpen, isEditMode, initialData, onClose, onSave, categories, brands, subcategories, onOpenCategoryModal, onOpenBrandModal, onOpenSubcategoryModal }) {
  const [formData, setFormData] = useState(() => createProductForm(initialData));

  useEffect(() => {
    if (isOpen) {
      queueMicrotask(() => {
        setFormData(createProductForm(initialData));
      });
    }
  }, [isOpen, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      imagePreview: null,
    }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.sku || !formData.category) {
      alert('Please fill in required fields: Name, SKU, and Category');
      return;
    }
    await onSave(formData);
    setFormData(createEmptyProductForm());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Modal Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-[rgba(0,0,0,0.07)] bg-white px-6 py-4">
          <h2 className="text-lg font-bold text-[#0a0d14]">{isEditMode ? 'Edit Product' : 'Create Product'}</h2>
          <button onClick={onClose} className="cursor-pointer text-[#6b7280] hover:text-[#0a0d14]">
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Image Upload Field */}
          <div>
            <label className="block text-sm font-semibold text-[#0a0d14] mb-3">Product Image</label>
            {formData.imagePreview ? (
              <div className="relative inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formData.imagePreview}
                  alt="Product preview"
                  className="h-32 w-32 rounded-2xl border border-[rgba(0,0,0,0.08)] object-cover"
                />
                <button
                  onClick={handleImageRemove}
                  type="button"
                  className="cursor-pointer absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#f43f5e] text-white shadow-lg hover:bg-[#e63946] transition"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className="relative flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#4f6ef7]/30 bg-[#4f6ef7]/5 transition hover:border-[#4f6ef7] hover:bg-[#4f6ef7]/10">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="text-center">
                  <div className="text-2xl mb-1">📷</div>
                  <div className="text-xs font-medium text-[#6b7280]">Upload Image</div>
                </div>
              </label>
            )}
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-[#0a0d14] mb-2">
              <span className="text-[#f43f5e]">*</span> Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Product name"
              className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white"
            />
          </div>

          {/* Category and Brand Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0a0d14] mb-2">
                <span className="text-[#f43f5e]">*</span> Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white appearance-none cursor-pointer"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={onOpenCategoryModal}
                className="cursor-pointer mt-2 text-xs text-[#4f6ef7] hover:text-[#3d5ce6] font-medium"
              >
                + Create New Category
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0a0d14] mb-2">Brand</label>
              <div className="relative">
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white appearance-none cursor-pointer"
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={onOpenBrandModal}
                className="cursor-pointer mt-2 text-xs text-[#4f6ef7] hover:text-[#3d5ce6] font-medium"
              >
                + Create New Brand
              </button>
            </div>
          </div>

          {/* Sub Category and UoM Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0a0d14] mb-2">Sub Category</label>
              <div className="relative">
                <select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white appearance-none cursor-pointer"
                >
                  <option value="">Select Sub Category</option>
                  {subcategories.map((subcat) => (
                    <option key={subcat.id} value={subcat.id}>
                      {subcat.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={onOpenSubcategoryModal}
                className="cursor-pointer mt-2 text-xs text-[#4f6ef7] hover:text-[#3d5ce6] font-medium"
              >
                + Create New Sub Category
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0a0d14] mb-2">
                <span className="text-[#f43f5e]">*</span> UoM
              </label>
              <select
                name="uom"
                value={formData.uom}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white appearance-none cursor-pointer"
              >
                <option value="Unit">Unit</option>
                <option value="Box">Box</option>
                <option value="Pack">Pack</option>
                <option value="Pallet">Pallet</option>
              </select>
            </div>
          </div>

          {/* SKU and Quantity Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0a0d14] mb-2">
                <span className="text-[#f43f5e]">*</span> SKU No
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                placeholder="SKU-0000"
                className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0a0d14] mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white"
              />
            </div>
          </div>

          {/* Pricing Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0a0d14] mb-2">Sale Price</label>
              <input
                type="number"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0a0d14] mb-2">Reorder Quantity</label>
              <input
                type="number"
                name="reorderQty"
                value={formData.reorderQty}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white"
              />
            </div>
          </div>

          {/* Purchase Price and VAT Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0a0d14] mb-2">Purchase Price</label>
              <input
                type="number"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0a0d14] mb-2">
                <span className="text-[#f43f5e]">*</span> VAT/Tax
              </label>
              <input
                type="number"
                name="vat"
                value={formData.vat}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-[#0a0d14] mb-2">Product Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description..."
              rows="4"
              className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white resize-none"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 flex gap-3 border-t border-[rgba(0,0,0,0.07)] bg-white px-6 py-4">
          <button
            onClick={onClose}
            className="cursor-pointer flex-1 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="cursor-pointer flex-1 rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6]"
          >
            {isEditMode ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Add Category Modal Component
function AddCategoryModal({ isOpen, onClose, onSave }) {
  const [categoryName, setCategoryName] = useState('');

  const handleSave = () => {
    if (!categoryName.trim()) {
      alert('Please enter a category name');
      return;
    }
    onSave(categoryName);
    setCategoryName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.07)] px-6 py-4">
          <h2 className="text-lg font-bold text-[#0a0d14]">Create New Category</h2>
          <button onClick={onClose} className="cursor-pointer text-[#6b7280] hover:text-[#0a0d14]">
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <label className="block text-sm font-semibold text-[#0a0d14] mb-2">
            <span className="text-[#f43f5e]">*</span> Category Name
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white"
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          />
        </div>

        {/* Modal Footer */}
        <div className="flex gap-3 border-t border-[rgba(0,0,0,0.07)] px-6 py-4">
          <button
            onClick={onClose}
            className="cursor-pointer flex-1 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="cursor-pointer flex-1 rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6]"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

// Add Brand Modal Component
function AddBrandModal({ isOpen, onClose, onSave }) {
  const [brandName, setBrandName] = useState('');

  const handleSave = () => {
    if (!brandName.trim()) {
      alert('Please enter a brand name');
      return;
    }
    onSave(brandName);
    setBrandName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.07)] px-6 py-4">
          <h2 className="text-lg font-bold text-[#0a0d14]">Create New Brand</h2>
          <button onClick={onClose} className="cursor-pointer text-[#6b7280] hover:text-[#0a0d14]">
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <label className="block text-sm font-semibold text-[#0a0d14] mb-2">
            <span className="text-[#f43f5e]">*</span> Brand Name
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Enter brand name"
            className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white"
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          />
        </div>

        {/* Modal Footer */}
        <div className="flex gap-3 border-t border-[rgba(0,0,0,0.07)] px-6 py-4">
          <button
            onClick={onClose}
            className="cursor-pointer flex-1 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="cursor-pointer flex-1 rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6]"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

// Add Subcategory Modal Component
function AddSubcategoryModal({ isOpen, onClose, onSave }) {
  const [subcategoryName, setSubcategoryName] = useState('');

  const handleSave = () => {
    if (!subcategoryName.trim()) {
      alert('Please enter a subcategory name');
      return;
    }
    onSave(subcategoryName);
    setSubcategoryName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.07)] px-6 py-4">
          <h2 className="text-lg font-bold text-[#0a0d14]">Create New Sub Category</h2>
          <button onClick={onClose} className="cursor-pointer text-[#6b7280] hover:text-[#0a0d14]">
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <label className="block text-sm font-semibold text-[#0a0d14] mb-2">
            <span className="text-[#f43f5e]">*</span> Sub Category Name
          </label>
          <input
            type="text"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            placeholder="Enter subcategory name"
            className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm outline-none transition focus:border-[#4f6ef7] focus:bg-white"
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          />
        </div>

        {/* Modal Footer */}
        <div className="flex gap-3 border-t border-[rgba(0,0,0,0.07)] px-6 py-4">
          <button
            onClick={onClose}
            className="cursor-pointer flex-1 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="cursor-pointer flex-1 rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6]"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleColumns, setVisibleColumns] = useState(allColumns);
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showBrandForm, setShowBrandForm] = useState(false);
  const [showSubcategoryForm, setShowSubcategoryForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState(initialCategories);
  const [brands, setBrands] = useState(initialBrands);
  const [subcategories, setSubcategories] = useState(initialSubcategories);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const [productData, categoryData, brandData, subcategoryData] = await Promise.all([
          apiFetch('/api/inventory/products/'),
          apiFetch('/api/inventory/categories/'),
          apiFetch('/api/inventory/brands/'),
          apiFetch('/api/inventory/subcategories/'),
        ]);

        const list = Array.isArray(productData) ? productData : productData.results || [];
        const categoriesList = Array.isArray(categoryData) ? categoryData : categoryData.results || [];
        const brandsList = Array.isArray(brandData) ? brandData : brandData.results || [];
        const subcategoriesList = Array.isArray(subcategoryData) ? subcategoryData : subcategoryData.results || [];

        if (mounted) {
          setCategories(
            categoriesList.length
              ? categoriesList.map((item) => ({ id: item.id, name: item.name }))
              : initialCategories
          );
          setBrands(
            brandsList.length ? brandsList.map((item) => ({ id: item.id, name: item.name })) : initialBrands
          );
          setSubcategories(
            subcategoriesList.length
              ? subcategoriesList.map((item) => ({ id: item.id, name: item.name }))
              : initialSubcategories
          );
        }

        const normalized = list.map((p) => ({
          id: p.id || p.sku,
          image: p.image || null,
          imageUrl: getImageUrl(p.image),
          name: p.name,
          categoryId: p.category || '',
          brandId: p.brand || '',
          subcategoryId: p.subcategory || '',
          category: p.category_name || '',
          brand: p.brand_name || '',
          subCategory: p.subcategory_name || '',
          sku: p.sku,
          purchasePrice: p.purchase_price,
          vat: p.tax || 0,
          salePrice: p.sale_price,
          quantity: p.quantity,
          uom: p.unit_of_measure || 'Unit',
          reorderQty: p.reorder_qty,
          description: p.description || '',
        }));
        if (mounted) setProducts(normalized);
      } catch (err) {
        if (mounted) setError(err.message || 'Failed to load products');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [reloadKey]);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    const source = products.length ? products : mockProducts;
    if (!searchQuery.trim()) return source;
    const query = searchQuery.toLowerCase();
    return source.filter(
      (product) =>
        (product.name || '').toString().toLowerCase().includes(query) ||
        (product.sku || '').toString().toLowerCase().includes(query) ||
        (product.brand || '').toString().toLowerCase().includes(query)
    );
  }, [searchQuery, products]);

  const handleToggleColumn = (columnId) => {
    setVisibleColumns((prev) =>
      prev.map((col) => (col.id === columnId ? { ...col, visible: !col.visible } : col))
    );
  };

  const handleAddProduct = async (formData) => {
    const isEditMode = Boolean(selectedProduct);
    const endpoint = isEditMode ? `/api/inventory/products/${selectedProduct.id}/` : '/api/inventory/products/';
    const method = isEditMode ? 'PATCH' : 'POST';

    try {
      await apiFetch(endpoint, {
        method,
        body: buildProductPayload(formData),
      });
      alert(isEditMode ? 'Product updated successfully!' : 'Product created successfully!');
      setShowAddForm(false);
      setSelectedProduct(null);
      setReloadKey((value) => value + 1);
    } catch (err) {
      alert(err.message || 'Failed to save product');
      throw err;
    }
  };

  const handleAddCategory = (categoryName) => {
    const newCategory = {
      id: `C${String(categories.length + 1).padStart(3, '0')}`,
      name: categoryName,
    };
    setCategories((prev) => [...prev, newCategory]);
    alert('Category created successfully!');
  };

  const handleAddBrand = (brandName) => {
    const newBrand = {
      id: `B${String(brands.length + 1).padStart(3, '0')}`,
      name: brandName,
    };
    setBrands((prev) => [...prev, newBrand]);
    alert('Brand created successfully!');
  };

  const handleAddSubcategory = (subcategoryName) => {
    const newSubcategory = {
      id: `SC${String(subcategories.length + 1).padStart(3, '0')}`,
      name: subcategoryName,
    };
    setSubcategories((prev) => [...prev, newSubcategory]);
    alert('Sub Category created successfully!');
  };

  const handleDeleteProduct = async (product) => {
    const confirmed = window.confirm(`Delete ${product.name}? This cannot be undone.`);
    if (!confirmed) return;

    try {
      await apiFetch(`/api/inventory/products/${product.id}/`, {
        method: 'DELETE',
      });
      alert('Product deleted successfully!');
      setReloadKey((value) => value + 1);
      if (selectedProduct?.id === product.id) {
        setSelectedProduct(null);
      }
    } catch (err) {
      alert(err.message || 'Failed to delete product');
    }
  };

  const visibleColsArray = visibleColumns.filter((col) => col.visible);

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#0a0d14]">
      <Sidebar activeLabel="PRODUCTS" />

      <div className="lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[#f4f6fb]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <h1 className="font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#0a0d14]">Products</h1>
              <p className="text-sm text-[#6b7280]">Manage your product inventory and details</p>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-3 py-3 text-xs font-medium text-[#2e3347] shadow-sm transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]">
                📄 Print PDF
              </button>
              <button className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-3 py-3 text-xs font-medium text-[#2e3347] shadow-sm transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]">
                ⬇️ Download CSV
              </button>
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setShowAddForm(true);
                }}
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border-none bg-[#4f6ef7] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/25 transition hover:bg-[#3d5ce6]"
              >
                ➕ Create Product
              </button>
            </div>
          </div>
        </header>

        {/* Search and Filters */}
        <section className="border-b border-[rgba(0,0,0,0.06)] bg-white px-4 py-4 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-1 max-w-md flex items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3 text-sm">
                <span>🔍</span>
                <input
                  type="text"
                  placeholder="Search products by name, SKU, brand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent outline-none placeholder:text-[#9ca3af]"
                />
              </div>

              <button className="cursor-pointer inline-flex items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] shadow-sm transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]">
                ⛓️ Filter +
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowColumnMenu(!showColumnMenu)}
                className="cursor-pointer inline-flex items-center gap-2 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-sm font-medium text-[#2e3347] shadow-sm transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]"
              >
                ⚙️ Columns
              </button>

              {showColumnMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white shadow-lg z-40">
                  <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
                    <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-[0.16em]">Show/Hide Columns</p>
                    {allColumns.map((column) => (
                      <label key={column.id} className="flex items-center gap-3 cursor-pointer hover:bg-[#f4f6fb] p-2 rounded-lg">
                        <input
                          type="checkbox"
                          checked={visibleColumns.find((c) => c.id === column.id)?.visible || false}
                          onChange={() => handleToggleColumn(column.id)}
                          className="cursor-pointer accent-[#4f6ef7]"
                        />
                        <span className="text-sm text-[#2e3347]">{column.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Table Section */}
        <section className="px-4 py-6 md:px-8">
          {loading ? (
            <div className="rounded-3xl border border-dashed border-[rgba(0,0,0,0.08)] p-6 text-sm text-[#6b7280]">Loading products...</div>
          ) : error ? (
            <div className="rounded-3xl border border-dashed border-[rgba(0,0,0,0.08)] p-6 text-sm text-[#f43f5e]">{error}</div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-12 text-center shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
              <div className="flex justify-center mb-4">
                <span className="text-5xl">💾</span>
              </div>
              <p className="text-lg font-semibold text-[#6b7280]">No Records Found</p>
              <p className="text-sm text-[#9ca3af] mt-2">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white shadow-[0_12px_40px_rgba(10,13,20,0.05)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#f4f6fb] border-b border-[rgba(0,0,0,0.07)]">
                    <tr>
                      {visibleColsArray.map((column) => (
                        <th key={column.id} className="px-4 py-4 font-semibold text-xs uppercase tracking-[0.16em] text-[#6b7280]">
                          {column.label}
                        </th>
                      ))}
                      <th className="px-4 py-4 font-semibold text-xs uppercase tracking-[0.16em] text-[#6b7280]">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-t border-[rgba(0,0,0,0.05)] hover:bg-[#f4f6fb]/50 transition">
                        {visibleColsArray.map((column) => (
                          <td key={`${product.id}-${column.id}`} className="px-4 py-4 text-[#0a0d14]">
                            {column.id === 'image' && (
                              product.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={product.image} alt={product.name || 'product'} className="h-12 w-12 rounded-xl object-cover" />
                              ) : (
                                <div className="h-12 w-12 rounded-xl bg-[#f4f6fb] flex items-center justify-center text-2xl">📦</div>
                              )
                            )}
                            {column.id === 'purchasePrice' && <span className="text-[#2e3347]">£{product[column.id]}</span>}
                            {column.id === 'salePrice' && <span className="font-semibold text-[#4f6ef7]">£{product[column.id]}</span>}
                            {column.id === 'quantity' && <StockBadge quantity={product.quantity} reorderQty={product.reorderQty} />}
                            {column.id === 'vat' && <span className="text-[#6b7280]">£{product[column.id]}</span>}
                            {!['image', 'purchasePrice', 'salePrice', 'quantity', 'vat'].includes(column.id) && product[column.id]}
                          </td>
                        ))}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowAddForm(true);
                              }}
                              className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-[rgba(0,0,0,0.08)] bg-white px-2 py-1.5 text-xs font-medium text-[#2e3347] hover:border-[#4f6ef7] hover:text-[#4f6ef7] transition"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product)}
                              className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-[rgba(0,0,0,0.08)] bg-white px-2 py-1.5 text-xs font-medium text-[#f43f5e] hover:bg-[#f43f5e]/10 transition"
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

              {/* Table Footer */}
              <div className="border-t border-[rgba(0,0,0,0.07)] bg-[#f4f6fb] px-4 py-3 text-xs text-[#6b7280]">
                Showing {filteredProducts.length} of {products.length || mockProducts.length} products
              </div>
            </article>
          )}
        </section>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddForm}
        isEditMode={Boolean(selectedProduct)}
        initialData={selectedProduct}
        onClose={() => {
          setShowAddForm(false);
          setSelectedProduct(null);
        }}
        onSave={handleAddProduct}
        categories={categories}
        brands={brands}
        subcategories={subcategories}
        onOpenCategoryModal={() => {
          setShowAddForm(false);
          setShowCategoryForm(true);
        }}
        onOpenBrandModal={() => {
          setShowAddForm(false);
          setShowBrandForm(true);
        }}
        onOpenSubcategoryModal={() => {
          setShowAddForm(false);
          setShowSubcategoryForm(true);
        }}
      />

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={showCategoryForm}
        onClose={() => {
          setShowCategoryForm(false);
          setShowAddForm(true);
        }}
        onSave={handleAddCategory}
      />

      {/* Add Brand Modal */}
      <AddBrandModal
        isOpen={showBrandForm}
        onClose={() => {
          setShowBrandForm(false);
          setShowAddForm(true);
        }}
        onSave={handleAddBrand}
      />

      {/* Add Subcategory Modal */}
      <AddSubcategoryModal
        isOpen={showSubcategoryForm}
        onClose={() => {
          setShowSubcategoryForm(false);
          setShowAddForm(true);
        }}
        onSave={handleAddSubcategory}
      />
    </main>
  );
}
