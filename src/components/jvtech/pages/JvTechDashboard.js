import React from "react";
import { useJvTech } from "../JvTechContext";
import { Link } from "react-router-dom";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  BoxSeamFill,
  PeopleFill,
  ClipboardDataFill,
  CurrencyDollar,
  CartFill,
  ExclamationTriangleFill,
  PersonFill,
  ArrowRightShort,
} from "react-bootstrap-icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export default function JvTechDashboard() {
  const { currentUser, products, customers, transactions, sales, users } =
    useJvTech();

  const formatMoney = (val) =>
    "₱" + Number(val).toLocaleString("en-PH", { minimumFractionDigits: 2 });
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-PH", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const lowStockProducts = products.filter((p) => p.stock <= 5);
  const recentSales = [...sales]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 4);
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 4);
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 4);

  const totalSalesAmount = sales.reduce((sum, s) => sum + s.total, 0);

  // Sales Chart Data
  const salesChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [12000, 19000, 15000, 25000, 22000, totalSalesAmount || 30000],
        borderColor: "#06b6d4",
        backgroundColor: "rgba(6,182,212,0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Payment Methods Data
  const paymentMethods = sales.reduce((acc, s) => {
    acc[s.payment_method] = (acc[s.payment_method] || 0) + 1;
    return acc;
  }, {});
  const pmData = {
    labels: Object.keys(paymentMethods),
    datasets: [
      {
        data: Object.values(paymentMethods),
        backgroundColor: [
          "#10b981",
          "#06b6d4",
          "#8b5cf6",
          "#f59e0b",
          "#64748b",
        ],
        borderWidth: 0,
      },
    ],
  };

  // Inventory Bar Data
  const topProducts = [...products]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 6);
  const invData = {
    labels: topProducts.map((p) =>
      p.name.length > 15 ? p.name.substring(0, 15) + "..." : p.name,
    ),
    datasets: [
      {
        label: "Stock Level",
        data: topProducts.map((p) => p.stock),
        backgroundColor: "#06b6d4",
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
  };
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } },
    cutout: "70%",
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome Banner */}
      <div
        className="relative overflow-hidden rounded-xl p-6 lg:p-8 mb-6 shadow-xl"
        style={{
          background: "linear-gradient(to right, #0f2744, #0a1628, #0e7490)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        ></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-white">
              Welcome back, {currentUser?.full_name || currentUser?.name}!
            </h2>
            <p className="text-cyan-100/80 mt-1">
              Here's what's happening with your inventory today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/jvtech/shop"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-cyan-700 rounded-lg font-medium text-sm hover:bg-cyan-50 transition-colors shadow-lg shadow-cyan-500/20"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              New Sale
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {["admin", "employee"].includes(currentUser?.role) && (
          <>
            <div className="jvtech-hover-lift bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {products.length}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Products
              </p>
            </div>

            <div className="jvtech-hover-lift bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                  Growing
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {customers.length}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Customers
              </p>
            </div>
          </>
        )}

        <div className="jvtech-hover-lift bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-amber-600 dark:text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
              Recorded
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {transactions.length}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Transactions
          </p>
        </div>

        <div className="jvtech-hover-lift bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-cyan-600 dark:text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 px-2 py-1 rounded-full">
              Complete
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {sales.length}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Sales
          </p>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <ExclamationTriangleFill className="text-amber-600 dark:text-amber-400 text-xl" />
            <h3 className="text-amber-800 dark:text-amber-400 font-bold">
              Low Stock Alert
            </h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
            {lowStockProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white dark:bg-slate-800 border border-amber-100 dark:border-amber-800/50 rounded-lg p-3 min-w-[200px] flex-shrink-0 shadow-sm"
              >
                <p className="font-medium text-slate-900 dark:text-white truncate text-sm mb-1">
                  {p.name}
                </p>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${p.stock === 0 ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}
                >
                  {p.stock === 0 ? "Out of Stock" : `${p.stock} left`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts Row */}
      {["admin", "employee"].includes(currentUser?.role) && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="col-span-1 lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">
              Sales Overview
            </h3>
            <div className="h-64">
              <Line data={salesChartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">
              Payment Methods
            </h3>
            <div className="h-48 flex-1 flex items-center justify-center">
              {Object.keys(paymentMethods).length > 0 ? (
                <Doughnut data={pmData} options={doughnutOptions} />
              ) : (
                <p className="text-slate-400 text-sm">No data available</p>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">
              Top Inventory
            </h3>
            <div className="h-64">
              <Bar
                data={invData}
                options={{ ...chartOptions, indexAxis: "y" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Lists Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Sales
            </h3>
            <Link
              to="/jvtech/sales"
              className="text-sm font-medium text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 flex items-center"
            >
              View all <ArrowRightShort size={18} />
            </Link>
          </div>
          <div className="p-2 flex-1">
            {recentSales.map((sale) => (
              <div
                key={sale.id}
                className="flex justify-between items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <div>
                  <p className="font-medium text-sm text-slate-900 dark:text-white">
                    {sale.customer_name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(sale.created_at)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-cyan-600 dark:text-cyan-400 text-sm">
                    {formatMoney(sale.total)}
                  </p>
                  <p className="text-[10px] text-slate-400 uppercase">
                    {sale.payment_method}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Products
            </h3>
            <Link
              to="/jvtech/products"
              className="text-sm font-medium text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 flex items-center"
            >
              View all <ArrowRightShort size={18} />
            </Link>
          </div>
          <div className="p-2 flex-1">
            {recentProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center shrink-0">
                  <BoxSeamFill size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-slate-900 dark:text-white truncate">
                    {p.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {p.stock} in stock
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded">
                    {formatMoney(p.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users (Admin Only) */}
        {currentUser?.role === "admin" ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                System Users
              </h3>
              <Link
                to="/jvtech/users"
                className="text-sm font-medium text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 flex items-center"
              >
                View all <ArrowRightShort size={18} />
              </Link>
            </div>
            <div className="p-2 flex-1">
              {recentUsers.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0f2744] to-[#0e7490] flex items-center justify-center text-white font-bold shrink-0 text-xs">
                    {(u.full_name || u.name || "?").charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-slate-900 dark:text-white truncate">
                      {u.full_name || u.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {u.username}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-xl p-8 shadow-sm text-white flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
              <PersonFill size={32} />
            </div>
            <h3 className="font-bold text-lg mb-2">Need Support?</h3>
            <p className="text-cyan-100 text-sm">
              Contact the system administrator for account issues or feature
              requests.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
