// ============================================================
// JV TechHub – React Context
// ============================================================
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  defaultUsers,
  defaultProducts,
  defaultCustomers,
  defaultTransactions,
  defaultSales,
  defaultLogs,
} from "./mockData";

// ── helpers ──────────────────────────────────────────────────
const genId = () =>
  "id_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);

const KEY = {
  user: "jvtech_currentUser",
  products: "jvtech_products",
  customers: "jvtech_customers",
  users: "jvtech_users",
  transactions: "jvtech_transactions",
  sales: "jvtech_sales",
  logs: "jvtech_logs",
  dark: "jvtech_dark",
};

const ssGet = (key, fallback) => {
  try {
    const raw = sessionStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const ssSet = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (_) {}
};

// ── context ──────────────────────────────────────────────────
const JvTechContext = createContext(null);

export const JvTechProvider = ({ children }) => {
  // ── state initialisation (load from sessionStorage or defaults) ──
  const [currentUser, setCurrentUser] = useState(() => ssGet(KEY.user, null));
  const [products, setProducts] = useState(() =>
    ssGet(KEY.products, defaultProducts),
  );
  const [customers, setCustomers] = useState(() =>
    ssGet(KEY.customers, defaultCustomers),
  );
  const [users, setUsers] = useState(() => ssGet(KEY.users, defaultUsers));
  const [transactions, setTransactions] = useState(() =>
    ssGet(KEY.transactions, defaultTransactions),
  );
  const [sales, setSales] = useState(() => ssGet(KEY.sales, defaultSales));
  const [logs, setLogs] = useState(() => ssGet(KEY.logs, defaultLogs));
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem(KEY.dark) === "true";
    } catch {
      return false;
    }
  });

  // ── sessionStorage sync effects ──────────────────────────────
  useEffect(() => {
    ssSet(KEY.user, currentUser);
  }, [currentUser]);
  useEffect(() => {
    ssSet(KEY.products, products);
  }, [products]);
  useEffect(() => {
    ssSet(KEY.customers, customers);
  }, [customers]);
  useEffect(() => {
    ssSet(KEY.users, users);
  }, [users]);
  useEffect(() => {
    ssSet(KEY.transactions, transactions);
  }, [transactions]);
  useEffect(() => {
    ssSet(KEY.sales, sales);
  }, [sales]);
  useEffect(() => {
    ssSet(KEY.logs, logs);
  }, [logs]);

  // ── darkMode sync ────────────────────────────────────────────
  useEffect(() => {
    try {
      localStorage.setItem(KEY.dark, String(darkMode));
    } catch (_) {}
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // ── helpers ──────────────────────────────────────────────────
  const addLog = (user, action, details) => {
    const entry = {
      id: genId(),
      user: user || "system",
      action,
      details,
      ip_address: "127.0.0.1",
      created_at: new Date().toISOString(),
    };
    setLogs((prev) => {
      const updated = [entry, ...prev];
      ssSet(KEY.logs, updated);
      return updated;
    });
  };

  // ── AUTH ─────────────────────────────────────────────────────
  const login = (username, password, mode = "admin") => {
    if (mode === "admin") {
      const found = users.find(
        (u) => u.username === username && u.password === password,
      );
      if (!found) return { success: false, error: "Invalid credentials" };
      const user = { ...found, portal: "admin" };
      setCurrentUser(user);
      ssSet(KEY.user, user);
      addLog(
        found.username,
        "LOGIN",
        `${found.name} logged in via admin portal.`,
      );
      return { success: true };
    } else {
      // customer login: username = email
      const found = customers.find(
        (c) => c.email === username && c.password === password,
      );
      if (!found) return { success: false, error: "Invalid credentials" };
      const user = { ...found, portal: "customer" };
      setCurrentUser(user);
      ssSet(KEY.user, user);
      return { success: true };
    }
  };

  const logout = () => {
    // clear all jvtech_ keys from sessionStorage
    Object.keys(KEY).forEach((k) => {
      try {
        sessionStorage.removeItem(KEY[k]);
      } catch (_) {}
    });
    // reset state to defaults
    setCurrentUser(null);
    setProducts(defaultProducts);
    setCustomers(defaultCustomers);
    setUsers(defaultUsers);
    setTransactions(defaultTransactions);
    setSales(defaultSales);
    setLogs(defaultLogs);
  };

  // ── PRODUCTS ─────────────────────────────────────────────────
  const addProduct = (data) => {
    const product = {
      id: genId(),
      ...data,
      created_at: new Date().toISOString(),
    };
    setProducts((prev) => {
      const updated = [...prev, product];
      ssSet(KEY.products, updated);
      return updated;
    });
    addLog(
      currentUser?.username || "admin",
      "PRODUCT_ADDED",
      `Added product: ${data.name}.`,
    );
    return product;
  };

  const updateProduct = (id, updates) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updates } : p));
      ssSet(KEY.products, updated);
      return updated;
    });
    addLog(
      currentUser?.username || "admin",
      "PRODUCT_UPDATED",
      `Updated product id: ${id}.`,
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      ssSet(KEY.products, updated);
      return updated;
    });
    addLog(
      currentUser?.username || "admin",
      "PRODUCT_DELETED",
      `Deleted product id: ${id}.`,
    );
  };

  // ── CUSTOMERS ────────────────────────────────────────────────
  const addCustomer = (data) => {
    const customer = {
      id: genId(),
      ...data,
      created_at: new Date().toISOString(),
    };
    setCustomers((prev) => {
      const updated = [...prev, customer];
      ssSet(KEY.customers, updated);
      return updated;
    });
    return customer;
  };

  const updateCustomer = (id, updates) => {
    setCustomers((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, ...updates } : c));
      ssSet(KEY.customers, updated);
      return updated;
    });
  };

  const deleteCustomer = (id) => {
    setCustomers((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      ssSet(KEY.customers, updated);
      return updated;
    });
  };

  // ── USERS ────────────────────────────────────────────────────
  const addUser = (data) => {
    const user = { id: genId(), ...data, created_at: new Date().toISOString() };
    setUsers((prev) => {
      const updated = [...prev, user];
      ssSet(KEY.users, updated);
      return updated;
    });
    addLog(
      currentUser?.username || "admin",
      "USER_ADDED",
      `Added user: ${data.name || data.username}.`,
    );
    return user;
  };

  const updateUser = (id, updates) => {
    setUsers((prev) => {
      const updated = prev.map((u) => (u.id === id ? { ...u, ...updates } : u));
      ssSet(KEY.users, updated);
      return updated;
    });
  };

  const deleteUser = (id) => {
    setUsers((prev) => {
      const updated = prev.filter((u) => u.id !== id);
      ssSet(KEY.users, updated);
      return updated;
    });
    addLog(
      currentUser?.username || "admin",
      "USER_DELETED",
      `Deleted user id: ${id}.`,
    );
  };

  // ── SALES / TRANSACTIONS ─────────────────────────────────────
  /**
   * saleData shape:
   * {
   *   customer_id, customer_name,
   *   items: [{ product_id, product_name, qty, unit_price }],
   *   payment_method,
   * }
   */
  const processSale = (saleData) => {
    const {
      customer_id,
      customer_name,
      items,
      payment_method,
      delivery_method,
      delivery_address,
    } = saleData;

    const enrichedItems = items.map((item) => ({
      ...item,
      subtotal: item.qty * (item.unit_price || item.price),
    }));
    const total = enrichedItems.reduce((sum, i) => sum + i.subtotal, 0);

    const saleId = genId();
    const transId = genId();
    const now = new Date().toISOString();

    const newSale = {
      id: saleId,
      transaction_id: transId,
      customer_id,
      customer_name,
      total,
      payment_method,
      delivery_method,
      delivery_address,
      status: "completed",
      created_at: now,
    };

    const newTransaction = {
      id: transId,
      sale_id: saleId,
      customer_id,
      customer_name,
      items: enrichedItems,
      total,
      status: "completed",
      created_at: now,
    };

    // decrement stock
    setProducts((prev) => {
      const updated = prev.map((p) => {
        const lineItem = enrichedItems.find((i) => i.product_id === p.id);
        if (lineItem) {
          return { ...p, stock: Math.max(0, p.stock - lineItem.qty) };
        }
        return p;
      });
      ssSet(KEY.products, updated);
      return updated;
    });

    setSales((prev) => {
      const updated = [newSale, ...prev];
      ssSet(KEY.sales, updated);
      return updated;
    });

    setTransactions((prev) => {
      const updated = [newTransaction, ...prev];
      ssSet(KEY.transactions, updated);
      return updated;
    });

    addLog(
      currentUser?.username || "system",
      "SALE_PROCESSED",
      `Processed sale for ${customer_name} — ₱${total.toLocaleString()}.`,
    );

    return { ...newSale, items: enrichedItems };
  };

  // ── PROFILE ──────────────────────────────────────────────────
  const updateProfile = (updates) => {
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    ssSet(KEY.user, updatedUser);

    // sync into users array (admin portal users)
    if (updatedUser.portal === "admin") {
      setUsers((prev) => {
        const updated = prev.map((u) =>
          u.id === updatedUser.id ? { ...u, ...updates } : u,
        );
        ssSet(KEY.users, updated);
        return updated;
      });
    } else {
      // customer
      setCustomers((prev) => {
        const updated = prev.map((c) =>
          c.id === updatedUser.id ? { ...c, ...updates } : c,
        );
        ssSet(KEY.customers, updated);
        return updated;
      });
    }
  };

  // ── CUSTOMER REGISTRATION ────────────────────────────────────
  const registerCustomer = (data) => {
    // validate email uniqueness
    const emailExists = customers.some(
      (c) => c.email.toLowerCase() === data.email?.toLowerCase(),
    );
    if (emailExists) {
      return { success: false, error: "Email is already registered." };
    }
    const customer = addCustomer({
      ...data,
      password: data.password || "cust123",
    });
    return { success: true, customer };
  };

  // ── DARK MODE ────────────────────────────────────────────────
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // ── CONTEXT VALUE ────────────────────────────────────────────
  const value = {
    // state
    currentUser,
    products,
    customers,
    users,
    transactions,
    sales,
    logs,
    darkMode,
    // auth
    login,
    logout,
    // products
    addProduct,
    updateProduct,
    deleteProduct,
    // customers
    addCustomer,
    updateCustomer,
    deleteCustomer,
    // users
    addUser,
    updateUser,
    deleteUser,
    // sales
    processSale,
    // profile
    updateProfile,
    // registration
    registerCustomer,
    // ui
    toggleDarkMode,
    // logs
    addLog,
  };

  return (
    <JvTechContext.Provider value={value}>{children}</JvTechContext.Provider>
  );
};

export const useJvTech = () => {
  const ctx = useContext(JvTechContext);
  if (!ctx) {
    throw new Error("useJvTech must be used within a JvTechProvider");
  }
  return ctx;
};

export default JvTechContext;
