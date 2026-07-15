import React, { useState } from "react";
import { useJvTech } from "../JvTechContext";
import {
  Search,
  Receipt,
  Printer,
  XLg,
  WalletFill,
  Cash,
  CreditCardFill,
  DeviceSsd,
} from "react-bootstrap-icons";

export default function JvTechSales() {
  const { sales } = useJvTech();
  const [search, setSearch] = useState("");
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const filtered = sales
    .filter(
      (s) =>
        s.id.toLowerCase().includes(search.toLowerCase()) ||
        s.customer_name.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const formatMoney = (val) =>
    "₱" + Number(val).toLocaleString("en-PH", { minimumFractionDigits: 2 });
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getMethodBadge = (method) => {
    switch (method.toLowerCase()) {
      case "cash":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            <Cash size={12} /> Cash
          </span>
        );
      case "gcash":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            <WalletFill size={12} /> GCash
          </span>
        );
      case "maya":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
            <WalletFill size={12} /> Maya
          </span>
        );
      case "card":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            <CreditCardFill size={12} /> Card
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <DeviceSsd size={12} /> {method}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm jvtech-no-print">
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
          {filtered.length} sales found
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm jvtech-no-print">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4">Sale ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Total Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Cashier</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-slate-500 dark:text-slate-400"
                  >
                    <Receipt size={32} className="mx-auto mb-3 opacity-20" />
                    <p>No sales found.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((sale) => (
                  <tr
                    key={sale.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                      {sale.id.split("_").pop().toUpperCase()}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {sale.customer_name}
                    </td>
                    <td className="px-6 py-4 font-semibold text-cyan-600 dark:text-cyan-400">
                      {formatMoney(sale.total)}
                    </td>
                    <td className="px-6 py-4">
                      {getMethodBadge(sale.payment_method)}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {sale.cashier_name || "System"}
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs">
                      {formatDate(sale.created_at)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedReceipt(sale)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm"
                      >
                        <Receipt size={12} /> Receipt
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div className="jvtech-modal-backdrop jvtech-no-print">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
            {/* Modal Actions */}
            <div className="flex justify-end gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 inline-flex items-center gap-2 text-sm font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                <Printer size={14} /> Print
              </button>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm transition-colors"
              >
                <XLg size={16} />
              </button>
            </div>

            {/* Receipt Content (Printed area) */}
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
                <p className="text-xs text-slate-500 mt-2">
                  123 Technology Ave, Metro Manila
                </p>
                <p className="text-xs text-slate-500">TIN: 123-456-789-000</p>
              </div>

              <div className="flex justify-between text-xs mb-6 font-mono text-slate-600">
                <div>
                  <p>
                    DATE: {formatDate(selectedReceipt.created_at).split(",")[0]}
                  </p>
                  <p>
                    TIME:{" "}
                    {formatDate(selectedReceipt.created_at)
                      .split(",")[1]
                      .trim()}
                  </p>
                  <p>
                    CASHIER:{" "}
                    {selectedReceipt.cashier_name
                      ? selectedReceipt.cashier_name.toUpperCase()
                      : "SYSTEM"}
                  </p>
                </div>
                <div className="text-right">
                  <p>SALE NO:</p>
                  <p className="font-bold text-slate-900">
                    {selectedReceipt.id.split("_").pop().toUpperCase()}
                  </p>
                  <p className="mt-1">CUSTOMER:</p>
                  <p className="font-bold text-slate-900 truncate max-w-[120px]">
                    {selectedReceipt.customer_name.toUpperCase()}
                  </p>
                </div>
              </div>

              <table className="w-full text-sm mb-6">
                <thead>
                  <tr className="border-y border-dashed border-slate-300 text-xs text-slate-500">
                    <th className="py-2 text-left font-normal uppercase tracking-wider">
                      Qty x Item
                    </th>
                    <th className="py-2 text-right font-normal uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  {selectedReceipt.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 text-slate-900 align-top">
                        <div className="flex">
                          <span className="w-6 shrink-0">{item.qty}</span>
                          <span className="uppercase pr-2">{item.name}</span>
                        </div>
                        <div className="text-slate-400 pl-6 text-[10px]">
                          @ {formatMoney(item.price)}
                        </div>
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
                  <span>{formatMoney(selectedReceipt.total)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>
                    PAYMENT ({selectedReceipt.payment_method.toUpperCase()})
                  </span>
                  <span>
                    {formatMoney(
                      selectedReceipt.amount_tendered || selectedReceipt.total,
                    )}
                  </span>
                </div>
                {selectedReceipt.payment_method === "Cash" &&
                  selectedReceipt.amount_tendered && (
                    <div className="flex justify-between text-slate-600">
                      <span>CHANGE</span>
                      <span>
                        {formatMoney(
                          selectedReceipt.amount_tendered -
                            selectedReceipt.total,
                        )}
                      </span>
                    </div>
                  )}
              </div>

              <div className="text-center text-xs text-slate-500 uppercase tracking-widest font-mono border-t border-dashed border-slate-300 pt-6">
                <p>Thank you for shopping!</p>
                <p className="mt-1">Please come again.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Print-only visible area, mirrors the selected receipt without modal wrapper */}
      <div className="hidden print:block bg-white text-black p-4 max-w-sm mx-auto font-mono text-sm">
        {selectedReceipt && (
          <div className="p-4" id="print-area">
            <div className="text-center mb-6 border-b border-dashed border-black pb-6">
              <h2 className="text-xl font-bold uppercase tracking-widest mb-1">
                JV TechHub
              </h2>
              <p className="text-xs uppercase tracking-widest">
                Inventory & Sales
              </p>
              <p className="text-xs mt-2">123 Technology Ave, Metro Manila</p>
            </div>

            <div className="flex justify-between text-xs mb-6">
              <div>
                <p>
                  DATE: {formatDate(selectedReceipt.created_at).split(",")[0]}
                </p>
                <p>
                  TIME:{" "}
                  {formatDate(selectedReceipt.created_at).split(",")[1].trim()}
                </p>
                <p>
                  CASHIER:{" "}
                  {selectedReceipt.cashier_name
                    ? selectedReceipt.cashier_name.toUpperCase()
                    : "SYSTEM"}
                </p>
              </div>
              <div className="text-right">
                <p>
                  SALE NO: {selectedReceipt.id.split("_").pop().toUpperCase()}
                </p>
                <p>CUST: {selectedReceipt.customer_name.toUpperCase()}</p>
              </div>
            </div>

            <table className="w-full text-xs mb-6">
              <thead>
                <tr className="border-y border-dashed border-black">
                  <th className="py-2 text-left font-normal uppercase">
                    Qty x Item
                  </th>
                  <th className="py-2 text-right font-normal uppercase">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedReceipt.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2 align-top uppercase">
                      {item.qty} {item.name}
                      <br />
                      <span className="text-[10px]">
                        @ {formatMoney(item.price)}
                      </span>
                    </td>
                    <td className="py-2 text-right align-top">
                      {formatMoney(item.price * item.qty)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t border-dashed border-black pt-4 pb-6 space-y-1">
              <div className="flex justify-between font-bold text-base">
                <span>TOTAL DUE</span>
                <span>{formatMoney(selectedReceipt.total)}</span>
              </div>
              <div className="flex justify-between">
                <span>
                  PAYMENT ({selectedReceipt.payment_method.toUpperCase()})
                </span>
                <span>
                  {formatMoney(
                    selectedReceipt.amount_tendered || selectedReceipt.total,
                  )}
                </span>
              </div>
              {selectedReceipt.payment_method === "Cash" &&
                selectedReceipt.amount_tendered && (
                  <div className="flex justify-between">
                    <span>CHANGE</span>
                    <span>
                      {formatMoney(
                        selectedReceipt.amount_tendered - selectedReceipt.total,
                      )}
                    </span>
                  </div>
                )}
            </div>

            <div className="text-center text-xs uppercase tracking-widest border-t border-dashed border-black pt-6">
              <p>Thank you for shopping!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
