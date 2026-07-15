import React, { useState, useMemo } from "react";
import {
  PlusLg,
  PencilFill,
  TrashFill,
  Search,
  BoxSeamFill,
  XLg,
} from "react-bootstrap-icons";
import { useJvTech } from "../JvTechContext";

const formatPrice = (price) =>
  "₱" + Number(price).toLocaleString("en-PH", { minimumFractionDigits: 2 });

const EMPTY_FORM = {
  name: "",
  price: "",
  stock: "",
  description: "",
};

export default function JvTechProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useJvTech();

  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editMode, setEditMode] = useState(null); // null = create, id = edit
  const [deleteConfirm, setDeleteConfirm] = useState(null); // product id or null
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  // ── Filtered list ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return (products || []).filter(
      (p) =>
        (p.name || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q),
    );
  }, [products, searchQuery]);

  // ── Toast helper ───────────────────────────────────────────────────────────
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // ── Modal helpers ──────────────────────────────────────────────────────────
  const openAdd = () => {
    setFormData(EMPTY_FORM);
    setErrors({});
    setEditMode(null);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setFormData({
      name: product.name || "",
      price: product.price !== undefined ? String(product.price) : "",
      stock: product.stock !== undefined ? String(product.stock) : "",
      description: product.description || "",
    });
    setErrors({});
    setEditMode(product.id ?? product.product_id ?? product._id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditMode(null);
    setFormData(EMPTY_FORM);
    setErrors({});
  };

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Product name is required.";
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0)
      e.price = "Price must be a positive number.";
    const qty = parseInt(formData.stock, 10);
    if (isNaN(qty) || qty < 0) e.stock = "Quantity must be 0 or more.";
    return e;
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const payload = {
      name: formData.name.trim(),
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      description: formData.description.trim(),
    };
    if (editMode !== null) {
      updateProduct(editMode, payload);
      showToast("Product updated successfully!");
    } else {
      addProduct(payload);
      showToast("Product added successfully!");
    }
    closeModal();
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const confirmDelete = (product) => {
    setDeleteConfirm(product.id ?? product.product_id ?? product._id);
  };

  const handleDelete = () => {
    if (deleteConfirm !== null) {
      deleteProduct(deleteConfirm);
      showToast("Product deleted.");
    }
    setDeleteConfirm(null);
  };

  // ── Stock badge ────────────────────────────────────────────────────────────
  const StockBadge = ({ qty }) => {
    if (qty === 0)
      return (
        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400">
          Out of stock
        </span>
      );
    if (qty <= 10)
      return (
        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
          {qty} low stock
        </span>
      );
    return (
      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
        {qty} in stock
      </span>
    );
  };

  // ── Form field helper ──────────────────────────────────────────────────────
  const Field = ({ label, name, type = "text", required, ...rest }) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={formData[name]}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, [name]: e.target.value }))
        }
        className={`w-full px-3 py-2 rounded-lg border text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          errors[name]
            ? "border-red-400"
            : "border-slate-300 dark:border-slate-600"
        }`}
        {...rest}
      />
      {errors[name] && (
        <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <>
      {/* ── Toast ────────────────────────────────────────────────────────── */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-fade-in">
          {toast}
        </div>
      )}

      {/* ── Delete Confirm Dialog ─────────────────────────────────────────── */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl p-6 w-full max-w-sm mx-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                <TrashFill
                  className="text-red-600 dark:text-red-400"
                  size={18}
                />
              </div>
              <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                Delete Product
              </h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 hover:bg-red-700 text-white transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add / Edit Modal ──────────────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                {editMode !== null ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-500"
              >
                <XLg size={16} />
              </button>
            </div>
            {/* Modal body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Field
                label="Product Name"
                name="name"
                required
                placeholder="e.g. Mechanical Keyboard"
              />
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Price (₱)"
                  name="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  required
                  placeholder="0.00"
                />
                <Field
                  label="Quantity"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  required
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Optional product description…"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition"
                >
                  {editMode !== null ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Products
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your product catalog
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={14}
            />
            <input
              type="text"
              placeholder="Search products…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-52 transition"
            />
          </div>
          {/* Add button */}
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition shadow-sm"
          >
            <PlusLg size={16} />
            Add Product
          </button>
        </div>
      </div>

      {/* ── Table Card ────────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-600">
            <BoxSeamFill size={40} className="mb-3 opacity-50" />
            <p className="text-sm font-medium">No products found</p>
            <p className="text-xs mt-1">
              Try a different search or add a new product.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-16">
                    Image
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((product) => {
                  const id = product.id ?? product.product_id ?? product._id;
                  const qty = Number(product.stock ?? 0);
                  return (
                    <tr
                      key={id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                    >
                      {/* Image placeholder */}
                      <td className="px-4 py-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                          <BoxSeamFill
                            size={18}
                            className="text-slate-400 dark:text-slate-500"
                          />
                        </div>
                      </td>
                      {/* Product name */}
                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-100 max-w-[180px] truncate">
                        {product.name}
                      </td>
                      {/* Price */}
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-mono whitespace-nowrap">
                        {formatPrice(product.price)}
                      </td>
                      {/* Stock */}
                      <td className="px-4 py-3">
                        <StockBadge qty={qty} />
                      </td>
                      {/* Description */}
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 max-w-[240px] truncate">
                        {product.description || (
                          <span className="italic opacity-50">
                            No description
                          </span>
                        )}
                      </td>
                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEdit(product)}
                            className="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
                            title="Edit"
                          >
                            <PencilFill size={14} />
                          </button>
                          <button
                            onClick={() => confirmDelete(product)}
                            className="p-2 rounded-lg text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                            title="Delete"
                          >
                            <TrashFill size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
