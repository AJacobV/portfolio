import React, { useState } from "react";
import { useJvTech } from "../JvTechContext";
import {
  Search,
  EyeFill,
  Receipt,
  ChevronRight,
} from "react-bootstrap-icons";

export default function JvTechTransactions() {
  const { transactions } = useJvTech();
  const [search, setSearch] = useState("");
  const [selectedTx, setSelectedTx] = useState(null);

  const filtered = transactions
    .filter(
      (t) =>
        t.id.toLowerCase().includes(search.toLowerCase()) ||
        t.customer_name.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatMoney = (val) =>
    "₱" + Number(val).toLocaleString("en-PH", { minimumFractionDigits: 2 });

  return (
    <div className="relative h-full flex flex-col">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-sm"
            />
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {filtered.length} transactions found
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Total Amount</th>
                  <th className="px-6 py-4">Items</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-slate-500 dark:text-slate-400"
                    >
                      <Receipt size={32} className="mx-auto mb-3 opacity-20" />
                      <p>No transactions found.</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((tx) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                        {tx.id.split("_").pop().toUpperCase()}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                        {tx.customer_name}
                      </td>
                      <td className="px-6 py-4 font-semibold text-cyan-600 dark:text-cyan-400">
                        {formatMoney(tx.total)}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                          {tx.item_count} items
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs">
                        {formatDate(tx.created_at)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedTx(tx)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-cyan-700 bg-cyan-50 hover:bg-cyan-100 dark:text-cyan-400 dark:bg-cyan-900/30 dark:hover:bg-cyan-900/50 rounded-lg transition-colors"
                        >
                          <EyeFill size={12} /> View Details
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

      {/* Slide-in Detail Panel */}
      {selectedTx && (
        <>
          <div
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setSelectedTx(null)}
          ></div>
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 jvtech-slide-in border-l border-slate-200 dark:border-slate-800 flex flex-col">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Transaction Details
                </h2>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1 uppercase">
                  {selectedTx.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Customer
                  </p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {selectedTx.customer_name}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Date
                  </p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {formatDate(selectedTx.created_at).split(",")[0]}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 col-span-2 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      Total Amount
                    </p>
                    <p className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
                      {formatMoney(selectedTx.total)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      Cashier
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {selectedTx.cashier || "System"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">
                  Line Items ({selectedTx.item_count})
                </h3>
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-semibold border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="px-4 py-2">Item</th>
                        <th className="px-4 py-2 text-center">Qty</th>
                        <th className="px-4 py-2 text-right">Price</th>
                        <th className="px-4 py-2 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {selectedTx.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-3 text-slate-900 dark:text-white font-medium">
                            {item.name}
                          </td>
                          <td className="px-4 py-3 text-center text-slate-600 dark:text-slate-400">
                            {item.qty}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-500 dark:text-slate-400">
                            {formatMoney(item.price)}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-900 dark:text-white font-semibold">
                            {formatMoney(item.price * item.qty)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedTx(null)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
