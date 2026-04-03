import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import AddTransactionForm from "./AddTransactionForm";

const TransactionTable = () => {

  const {
    transactions,
    setTransactions,
    role,
    showForm,
    setShowForm,
    editData,
    setEditData
  } = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const handleEdit = (transaction) => {
    setEditData(transaction);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
  };

  const filteredData = transactions
    .filter(t => {
      const matchesSearch = t.category
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesType = typeFilter === "all" || t.type === typeFilter;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") return new Date(b.date) - new Date(a.date);
      return new Date(a.date) - new Date(b.date);
    });

  const handleExportCSV = () => {
    const headers = ["Date", "Category", "Amount", "Type"];
    const rows = filteredData.map(t => [t.date, t.category, t.amount, t.type]);
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="font-bold text-lg">Transactions</h2>
        <div className="flex gap-2 flex-wrap">
          <button onClick={handleExportCSV} className="bg-green-500 text-white px-4 py-2 rounded">
            Export CSV
          </button>
          {role === "admin" && (
            <button
              onClick={() => { setEditData(null); setShowForm(true); }}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              + Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border p-2 rounded">
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border p-2 rounded">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border min-w-[500px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Date</th>
              <th className="p-2">Category</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Type</th>
              {role === "admin" && <th className="p-2">Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={role === "admin" ? 5 : 4} className="text-center p-6 text-gray-400">
                  
                </td>
              </tr>
            ) : (
              filteredData.map(t => (
                <tr key={t.id} className="text-center border-t">
                  <td className="p-2">{t.date}</td>
                  <td className="p-2">{t.category}</td>
                  <td className="p-2">₹ {t.amount.toLocaleString()}</td>
                  <td className={`p-2 capitalize font-medium ${t.type === "income" ? "text-green-600" : "text-red-500"}`}>
                    {t.type}
                  </td>
                  {role === "admin" && (
                    <td className="p-2 space-x-2">
                      <button onClick={() => handleEdit(t)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                      <button onClick={() => handleDelete(t.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <AddTransactionForm
          onClose={() => { setShowForm(false); setEditData(null); }}
          editData={editData}
        />
      )}

    </div>
  );
};

export default TransactionTable;
