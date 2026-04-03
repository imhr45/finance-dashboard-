import { createContext, useState, useEffect } from "react";
import { mockTransactions } from "../Data/mockTransaction.js";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [showForm, setShowForm] =
    useState(false);

  
  const [editData, setEditData] =
    useState(null);

  const [transactions, setTransactions] =
    useState(() => {

      const saved =
        localStorage.getItem("transactions");

      return saved
        ? JSON.parse(saved)
        : mockTransactions;

    });

  const [role, setRole] =
    useState("viewer");

  useEffect(() => {

    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );

  }, [transactions]);

  return (

    <AppContext.Provider
      value={{

        transactions,
        setTransactions,

        role,
        setRole,

        showForm,
        setShowForm,

      
        editData,
        setEditData

      }}
    >

      {children}

    </AppContext.Provider>

  );

};