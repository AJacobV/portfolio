import React, { useState } from "react";
import { useJvTech } from "../JvTechContext";
import {
  Search,
  BoxSeamFill,
  CartFill,
  XLg,
  Receipt,
  Printer,
  PlusLg,
  DashLg,
  ShieldLockFill,
} from "react-bootstrap-icons";

export default function JvTechCustomerPortal() {
  const { products, processSale, currentUser } = useJvTech();
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState("GCash");
  const [amountTendered, setAmountTendered] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [deliveryAddress, setDeliveryAddress] = useState(
    currentUser?.address || "",
  );
  const [mobileNumber, setMobileNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");

  const [error, setError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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
          if (newQty < 1) return item;
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

  const handleInitiateCheckout = () => {
    setError("");
    if (cart.length === 0) return setError("Your cart is empty");

    if (deliveryMethod === "delivery" && !deliveryAddress.trim()) {
      return setError("Please enter your complete delivery address");
    }

    if (paymentMethod === "Cash") {
      const tendered = Number(amountTendered);
      if (!amountTendered || isNaN(tendered) || tendered < cartTotal) {
        return setError(
          "Amount tendered must be greater than or equal to total",
        );
      }
    } else if (paymentMethod === "GCash" || paymentMethod === "Maya") {
      const cleanNumber = mobileNumber.replace(/\D/g, "");
      if (!cleanNumber) return setError("Please enter your mobile number");
      if (cleanNumber.length !== 11 || !cleanNumber.startsWith("09")) {
        return setError(
          "Please enter a valid 11-digit mobile number starting with 09 (e.g. 09123456789)",
        );
      }
    } else if (paymentMethod === "Card") {
      if (
        !cardNumber.trim() ||
        !cardExpiry.trim() ||
        !cardCvv.trim() ||
        !cardName.trim()
      ) {
        return setError("Please complete your credit/debit card details");
      }
    }

    setShowConfirmModal(true);
  };

  const handleConfirmOrder = () => {
    const saleData = {
      customer_name:
        currentUser?.customer_name ||
        currentUser?.full_name ||
        currentUser?.name ||
        "Guest",
      payment_method: paymentMethod,
      delivery_method: deliveryMethod,
      delivery_address: deliveryMethod === "delivery" ? deliveryAddress : null,
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
    setShowConfirmModal(false);
    setCart([]);
    setAmountTendered("");
    setMobileNumber("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
    setCardName("");
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
    <div className="space-y-8 min-h-[calc(100vh-8rem)]">
      {/* Hero */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent mb-4 tracking-tight">
          Welcome to JV TechHub Store
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          Browse our premium collection of authentic gadgets and accessories.
          Find what you need today.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Product Catalog */}
        <div className="flex-1 w-full space-y-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search our catalog..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-base shadow-sm transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold px-3 py-1 rounded-full">
                {filteredProducts.length} items
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className={`group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border shadow-sm transition-all overflow-hidden ${
                  p.stock === 0
                    ? "border-slate-200 dark:border-slate-800 opacity-60 grayscale"
                    : "border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1"
                }`}
              >
                <div className="aspect-square bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center relative overflow-hidden">
                  <BoxSeamFill
                    size={48}
                    className="text-slate-300 dark:text-slate-700 transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Stock Badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                        p.stock > 10
                          ? "bg-emerald-100/90 text-emerald-700 dark:bg-emerald-900/90 dark:text-emerald-400 shadow-sm"
                          : p.stock > 0
                            ? "bg-amber-100/90 text-amber-700 dark:bg-amber-900/90 dark:text-amber-400 shadow-sm"
                            : "bg-red-100/90 text-red-700 dark:bg-red-900/90 dark:text-red-400 shadow-sm"
                      }`}
                    >
                      {p.stock === 0 ? "Out of stock" : `${p.stock} left`}
                    </span>
                  </div>

                  {/* Add to Cart Overlay */}
                  {p.stock > 0 && (
                    <div className="absolute inset-0 bg-slate-900/40 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={() => addToCart(p)}
                        className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm"
                      >
                        <CartFill /> Add to Cart
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-2 leading-snug mb-1">
                      {p.name}
                    </h3>
                    {p.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                        {p.description}
                      </p>
                    )}
                  </div>
                  <p className="font-black text-emerald-600 dark:text-emerald-400 text-lg mt-auto">
                    {formatMoney(p.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center text-slate-500 py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
              <Search
                size={48}
                className="mx-auto mb-4 text-slate-300 dark:text-slate-700"
              />
              <p className="text-lg font-medium">
                No products match your search.
              </p>
              <p className="text-sm mt-1">Try a different keyword.</p>
            </div>
          )}
        </div>

        {/* Right: Cart Sidebar */}
        <div className="w-full lg:w-96 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden shrink-0 sticky top-24">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
            <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-lg">
              <CartFill className="text-emerald-600 dark:text-emerald-500" />{" "}
              Your Cart
            </h2>
            <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full">
              {cart.length} items
            </span>
          </div>

          <div className="max-h-[40vh] lg:max-h-[35vh] overflow-y-auto p-5 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 opacity-60 py-10">
                <CartFill
                  size={48}
                  className="mb-4 text-slate-200 dark:text-slate-700"
                />
                <p className="font-medium">Your cart is empty.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 bg-white dark:bg-slate-900 group relative border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="w-16 h-16 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700">
                      <BoxSeamFill
                        size={20}
                        className="text-slate-300 dark:text-slate-600"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <p className="font-medium text-sm text-slate-900 dark:text-white truncate pr-6">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {formatMoney(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                          <button
                            onClick={() => updateCartQty(item.id, -1)}
                            className="p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          >
                            <DashLg size={12} />
                          </button>
                          <span className="px-2 text-xs font-bold w-6 text-center text-slate-900 dark:text-white">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateCartQty(item.id, 1)}
                            className="p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          >
                            <PlusLg size={12} />
                          </button>
                        </div>
                        <span className="font-black text-slate-900 dark:text-white text-sm">
                          {formatMoney(item.price * item.qty)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-0 right-0 p-1 text-slate-400 hover:text-red-500 transition-colors bg-white dark:bg-slate-900"
                    >
                      <XLg size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
            <div className="flex justify-between items-end mb-6">
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Total
              </span>
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                {formatMoney(cartTotal)}
              </span>
            </div>

            <div className="space-y-4 mb-6">
              {error && (
                <div className="text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-800/50">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-slate-900 dark:text-white"
                  >
                    <option value="GCash">GCash</option>
                    <option value="Maya">Maya</option>
                    <option value="Card">Credit/Debit Card</option>
                    <option value="Cash">Cash on Delivery</option>
                  </select>
                </div>
              </div>

              {paymentMethod === "Cash" && (
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Amount Tendered
                    </label>
                    <input
                      type="number"
                      value={amountTendered}
                      onChange={(e) => setAmountTendered(e.target.value)}
                      placeholder={formatMoney(cartTotal)}
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {(paymentMethod === "GCash" || paymentMethod === "Maya") && (
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      value={mobileNumber}
                      onChange={(e) =>
                        setMobileNumber(e.target.value.replace(/\D/g, ""))
                      }
                      maxLength={11}
                      placeholder="09123456789"
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "Card" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Juan Dela Cruz"
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                        CVV
                      </label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Delivery Method
                  </label>
                  <select
                    value={deliveryMethod}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-slate-900 dark:text-white"
                  >
                    <option value="pickup">Store Pickup</option>
                    <option value="delivery">Delivery</option>
                  </select>
                </div>
              </div>

              {deliveryMethod === "delivery" && (
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Delivery Address
                    </label>
                    <textarea
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Enter your complete delivery address"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-white resize-none mb-3"
                    />
                    {deliveryAddress.trim() && (
                      <div className="w-full h-32 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-inner relative group">
                        <iframe
                          title="Delivery Location Map"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          src={`https://maps.google.com/maps?q=${encodeURIComponent(deliveryAddress)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleInitiateCheckout}
              disabled={cart.length === 0}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:shadow-none hover:-translate-y-0.5 active:translate-y-0"
            >
              Checkout Now
            </button>
            <div className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
              <ShieldLockFill className="inline mr-1 mb-0.5" /> Secure checkout
              powered by JV TechHub
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && !receipt && (
        <div className="jvtech-modal-backdrop z-50">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] jvtech-fade-in relative">
            <div className="absolute top-0 inset-x-0 h-2 bg-blue-500"></div>

            <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Review Order
              </h2>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors"
              >
                <XLg size={16} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Order Summary
              </h3>
              <div className="space-y-3 mb-6">
                {cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-start text-sm"
                  >
                    <div className="pr-4">
                      <span className="font-medium text-slate-900 dark:text-slate-100">
                        {item.name}
                      </span>
                      <div className="text-slate-500 text-xs mt-0.5">
                        Qty: {item.qty} × {formatMoney(item.price)}
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {formatMoney(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                    {formatMoney(cartTotal)}
                  </span>
                </div>
              </div>

              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Delivery & Payment
              </h3>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Method</span>
                  <span className="font-bold text-slate-900 dark:text-white capitalize">
                    {deliveryMethod}
                  </span>
                </div>
                {deliveryMethod === "delivery" && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Address</span>
                    <span className="font-bold text-slate-900 dark:text-white text-right truncate max-w-[150px]">
                      {deliveryAddress}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-xs mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500">Payment</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {paymentMethod}
                  </span>
                </div>
                {paymentMethod === "Cash" && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Tendered</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {formatMoney(amountTendered)}
                    </span>
                  </div>
                )}
                {(paymentMethod === "GCash" || paymentMethod === "Maya") && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Mobile No.</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {mobileNumber}
                    </span>
                  </div>
                )}
                {paymentMethod === "Card" && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Card</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      ending in {cardNumber.slice(-4) || "****"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
              <button
                onClick={handleConfirmOrder}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black uppercase tracking-widest text-sm transition-colors shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal (Emerald Theme) */}
      {receipt && (
        <div className="jvtech-modal-backdrop z-50">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] jvtech-fade-in relative">
            <div className="absolute top-0 inset-x-0 h-2 bg-emerald-500 jvtech-no-print"></div>

            <div className="flex justify-end gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 jvtech-no-print">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 inline-flex items-center gap-2 text-sm font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                <Printer size={14} /> Print Order
              </button>
              <button
                onClick={() => setReceipt(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm transition-colors"
              >
                <XLg size={16} />
              </button>
            </div>

            <div
              className="p-8 overflow-y-auto bg-white text-slate-900"
              id="printable-receipt"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4 jvtech-no-print">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-1">
                  Order Confirmed!
                </h2>
                <p className="text-sm text-slate-500">
                  Thank you for shopping at JV TechHub.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500">Order No.</span>
                  <span className="font-bold text-slate-900">
                    {receipt.id.split("_").pop().toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500">Date</span>
                  <span className="font-bold text-slate-900">
                    {formatDate(receipt.created_at)}
                  </span>
                </div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500">Payment Method</span>
                  <span className="font-bold text-slate-900">
                    {receipt.payment_method}
                  </span>
                </div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500">Customer</span>
                  <span className="font-bold text-slate-900 truncate max-w-[150px]">
                    {receipt.customer_name}
                  </span>
                </div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500">Delivery Method</span>
                  <span className="font-bold text-slate-900 capitalize">
                    {receipt.delivery_method}
                  </span>
                </div>
                {receipt.delivery_method === "delivery" && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Address</span>
                    <span className="font-bold text-slate-900 text-right truncate max-w-[150px]">
                      {receipt.delivery_address}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Order Summary
              </h3>
              <div className="space-y-3 mb-6">
                {receipt.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-start text-sm"
                  >
                    <div className="pr-4">
                      <span className="font-medium text-slate-900">
                        {item.name}
                      </span>
                      <div className="text-slate-500 text-xs mt-0.5">
                        Qty: {item.qty} × {formatMoney(item.price)}
                      </div>
                    </div>
                    <span className="font-bold text-slate-900">
                      {formatMoney(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="text-xl font-black text-emerald-600">
                    {formatMoney(receipt.total)}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setReceipt(null)}
                  className="jvtech-no-print w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
