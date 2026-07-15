import React, { useState } from "react";
import { useJvTech } from "../JvTechContext";
import { Search, ListCheck, LockFill } from "react-bootstrap-icons";

export default function JvTechLogs() {
  const { logs, currentUser } = useJvTech();
  const [search, setSearch] = useState("");

  if (currentUser?.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mb-4">
          <LockFill size={24} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Access Denied
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          You do not have permission to view system logs.
        </p>
      </div>
    );
  }

  const filtered = logs
    .filter(
      (l) =>
        l.user.toLowerCase().includes(search.toLowerCase()) ||
        l.action.toLowerCase().includes(search.toLowerCase()) ||
        l.details.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search logs by user, action, or details..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-sm"
          />
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm">
          <ListCheck size={16} className="text-cyan-600 dark:text-cyan-400" />
          {filtered.length} log entries
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4">Log ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4">IP Address</th>
                <th className="px-6 py-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-slate-500 dark:text-slate-400"
                  >
                    <ListCheck size={32} className="mx-auto mb-3 opacity-20" />
                    <p>No log entries found.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((log, index) => (
                  <tr
                    key={log.id}
                    className={`${index % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50/50 dark:bg-slate-800/20"} hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors`}
                  >
                    <td className="px-6 py-4 font-mono text-xs text-slate-400 dark:text-slate-500">
                      {log.id.split("_").pop().toUpperCase()}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {log.user}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                      {log.details}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-500">
                      {log.ip_address}
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs">
                      {formatDate(log.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
