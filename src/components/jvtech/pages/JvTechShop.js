import React, { useState } from "react";
import { useJvTech } from "../JvTechContext";
import {
  Search,
  BoxSeamFill,
  CartFill,
  XLg,
  Printer,
  PlusLg,
  DashLg,
} from "react-bootstrap-icons";

export default function JvTechShop() {
  const { products, processSale, currentUser } = useJvTech();
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  // Checkout states
  const [customerName, setCustomerName] = useState(
    currentUser?.role === "admin" ? "Walk-in Customer" : "",
  );
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [amountTendered, setAmountTendered] = useState("");
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState(null);

  const formatMoney = (val) =>
    "₱" + Number(val).toLocaleString("en-PH", { minimumFractionDigits: 2 });

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const addToCart = (product) => {
    if (product.stock <= 0) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        if (existing.qty >= product.stock) return prev;
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          if (newQty < 1) return item; // Don't let it go below 1, they can use remove btn
          const product = products.find((p) => p.id === id);
          if (newQty > product.stock) return item;
          return { ...item, qty: newQty };
        }
        return item;
      }),
    );
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    setError("");
    if (cart.length === 0) return setError("Cart is empty");
    if (!customerName.trim()) return setError("Customer name is required");
    if (paymentMethod === "Cash") {
      const tendered = Number(amountTendered);
      if (!amountTendered || isNaN(tendered) || tendered < cartTotal) {
        return setError(
          "Amount tendered must be greater than or equal to total",
        );
      }
    }

    const saleData = {
      customer_name: customerName,
      payment_method: paymentMethod,
      amount_tendered:
        paymentMethod === "Cash" ? Number(amountTendered) : cartTotal,
      items: cart.map((item) => ({
        product_id: item.id,
        name: item.name,
        price: item.price,
        qty: item.qty,
      })),
    };

    const newSale = processSale(saleData);
    setReceipt(newSale);
    setCart([]);
    setAmountTendered("");
    if (currentUser?.role !== "admin") setCustomerName(""); // Keep walk-in for admin
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6 -mt-2">
      {/* Left: Product Catalog */}
      <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => addToCart(p)}
                className={`group flex flex-col bg-white dark:bg-slate-800 rounded-xl border transition-all cursor-pointer overflow-hidden ${
                  p.stock === 0
                    ? "border-slate-200 dark:border-slate-700 opacity-60"
                    : "border-slate-200 dark:border-slate-700 hover:border-cyan-500 hover:shadow-md"
                }`}
              >
                <div className="aspect-square bg-slate-50 dark:bg-slate-900 flex items-center justify-center relative">
                  <BoxSeamFill
                    size={40}
                    className="text-slate-300 dark:text-slate-700 group-hover:scale-110 transition-transform"
                  />

                  {/* Stock Badge */}
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        p.stock > 10
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : p.stock > 0
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {p.stock === 0 ? "Out of stock" : `${p.stock} in stock`}
                    </span>
                  </div>

                  {/* Add overlay */}
                  {p.stock > 0 && (
                    <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-cyan-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        Click to Add
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between border-t border-slate-100 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-2 leading-tight mb-1">
                    {p.name}
                  </h3>
                  <p className="font-bold text-cyan-600 dark:text-cyan-400 text-sm mt-auto">
                    {formatMoney(p.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center text-slate-500 py-12">
              No products match your search.
            </div>
          )}
        </div>
      </div>

      {/* Right: Cart Sidebar */}
      <div className="w-full lg:w-96 flex flex-col min-h-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden shrink-0">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
          <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CartFill className="text-cyan-600" /> Current Order
          </h2>
          <span className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300 text-xs font-bold px-2 py-1 rounded-full">
            {cart.length} items
          </span>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 opacity-60">
              <CartFill size={48} className="mb-4" />
              <p>Your cart is empty.</p>
              <p className="text-sm">Click products to add them.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 group relative"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-slate-900 dark:text-white truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatMoney(item.price)} each
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <button
                          onClick={() => updateCartQty(item.id, -1)}
                          className="px-2 py-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <DashLg size={10} />
                        </button>
                        <span className="px-2 text-xs font-medium w-6 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.id, 1)}
                          className="px-2 py-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <PlusLg size={10} />
                        </button>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white text-sm ml-auto">
                        {formatMoney(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-600 shadow-sm flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <XLg size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Section */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
          <div className="flex justify-between items-end mb-4">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total
            </span>
            <span className="text-2xl font-black text-cyan-600 dark:text-cyan-400">
              {formatMoney(cartTotal)}
            </span>
          </div>

          <div className="space-y-3 mb-4">
            {error && (
              <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">
                Customer Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-1.5 text-sm rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:border-cyan-500"
                placeholder="Required"
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">
                  Payment
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:border-cyan-500"
                >
                  <option value="Cash">Cash</option>
                  <option value="GCash">GCash</option>
                  <option value="Maya">Maya</option>
                  <option value="Card">Card</option>
                </select>
              </div>
              {paymentMethod === "Cash" && (
                <div className="flex-1">
                  <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">
                    Tendered
                  </label>
                  <input
                    type="number"
                    min={cartTotal}
                    value={amountTendered}
                    onChange={(e) => setAmountTendered(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:border-cyan-500"
                    placeholder="Amount"
                  />
                </div>
              )}
            </div>

            {paymentMethod === "Cash" &&
              Number(amountTendered) >= cartTotal && (
                <div className="flex justify-between items-center text-sm pt-1">
                  <span className="text-slate-500 font-medium">Change:</span>
                  <span className="font-bold text-emerald-600">
                    {formatMoney(Number(amountTendered) - cartTotal)}
                  </span>
                </div>
              )}
          </div>

          <button
            onClick={handleCheckout}
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg shadow-cyan-600/30 disabled:opacity-50"
          >
            Process Sale
          </button>
        </div>
      </div>

      {/* Receipt Modal (Identical print layout to JvTechSales) */}
      {receipt && (
        <div className="jvtech-modal-backdrop z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
            <div className="flex justify-end gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 inline-flex items-center gap-2 text-sm font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                <Printer size={14} /> Print
              </button>
              <button
                onClick={() => setReceipt(null)}
                className="px-3 py-1.5 inline-flex items-center gap-2 text-sm font-medium bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors shadow-sm"
              >
                New Sale
              </button>
            </div>
            {/* Printable Receipt */}
            <div
              className="p-8 overflow-y-auto bg-white text-slate-900"
              id="printable-receipt"
            >
              <div className="text-center mb-6 border-b border-dashed border-slate-300 pb-6">
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-3">
                  <img
                    src="/jvtech/images/logo.png"
                    alt="JV Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 mb-1">
                  JV TechHub
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest">
                  Inventory & Sales
                </p>
              </div>
              <div className="flex justify-between text-xs mb-6 font-mono text-slate-600">
                <div>
                  <p>DATE: {formatDate(receipt.created_at).split(",")[0]}</p>
                  <p>
                    CASHIER:{" "}
                    {receipt.cashier_name
                      ? receipt.cashier_name.toUpperCase()
                      : "SYSTEM"}
                  </p>
                </div>
                <div className="text-right">
                  <p>SALE NO: {receipt.id.split("_").pop().toUpperCase()}</p>
                  <p>CUST: {receipt.customer_name.toUpperCase()}</p>
                </div>
              </div>
              <table className="w-full text-sm mb-6 font-mono text-xs">
                <thead>
                  <tr className="border-y border-dashed border-slate-300 text-slate-500">
                    <th className="py-2 text-left font-normal uppercase">
                      Qty x Item
                    </th>
                    <th className="py-2 text-right font-normal uppercase">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {receipt.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 text-slate-900 align-top">
                        {item.qty} {item.name}
                        <br />
                        <span className="text-slate-400 text-[10px]">
                          @ {formatMoney(item.price)}
                        </span>
                      </td>
                      <td className="py-2.5 text-right text-slate-900 align-top">
                        {formatMoney(item.price * item.qty)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="border-t border-dashed border-slate-300 pt-4 pb-6 space-y-2 font-mono text-sm">
                <div className="flex justify-between font-bold text-slate-900 text-base">
                  <span>TOTAL DUE</span>
                  <span>{formatMoney(receipt.total)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>PAYMENT ({receipt.payment_method.toUpperCase()})</span>
                  <span>
                    {formatMoney(receipt.amount_tendered || receipt.total)}
                  </span>
                </div>
                {receipt.payment_method === "Cash" &&
                  receipt.amount_tendered && (
                    <div className="flex justify-between text-slate-600">
                      <span>CHANGE</span>
                      <span>
                        {formatMoney(receipt.amount_tendered - receipt.total)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="text-center text-xs text-slate-500 uppercase tracking-widest font-mono border-t border-dashed border-slate-300 pt-6">
                Thank you!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
