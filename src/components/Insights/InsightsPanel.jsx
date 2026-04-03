import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const InsightsPanel = () => {

  const { transactions } = useContext(AppContext);

  // Expense data
  const expenseData = transactions.filter(t => t.type === "expense");

  // Highest spending category
  const categoryTotals = {};
  expenseData.forEach(t => {
    if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
    categoryTotals[t.category] += t.amount;
  });

  let highestCategory = "None";
  let highestAmount = 0;
  Object.entries(categoryTotals).forEach(([cat, amt]) => {
    if (amt > highestAmount) {
      highestAmount = amt;
      highestCategory = cat;
    }
  });

  // Total income & expense
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  // Monthly comparison data
  const monthlyMap = {};

  transactions.forEach(t => {
    const date = new Date(t.date);
    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric"
    });

    if (!monthlyMap[month]) {
      monthlyMap[month] = { month, income: 0, expense: 0 };
    }

    if (t.type === "income") {
      monthlyMap[month].income += t.amount;
    } else {
      monthlyMap[month].expense += t.amount;
    }
  });

  const monthlyData = Object.values(monthlyMap).sort(
    (a, b) => new Date(a.month) - new Date(b.month)
  );

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="font-bold text-lg mb-4">Insights</h2>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div className="bg-red-50 p-3 rounded">
          <p className="text-sm text-gray-500">Highest Category</p>
          <p className="font-bold text-red-500 text-lg">{highestCategory}</p>
        </div>

        <div className="bg-orange-50 p-3 rounded">
          <p className="text-sm text-gray-500">Top Spending</p>
          <p className="font-bold text-orange-500 text-lg">₹ {highestAmount.toLocaleString()}</p>
        </div>

        <div className="bg-green-50 p-3 rounded">
          <p className="text-sm text-gray-500">Total Income</p>
          <p className="font-bold text-green-600 text-lg">₹ {totalIncome.toLocaleString()}</p>
        </div>

        <div className="bg-red-50 p-3 rounded">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="font-bold text-red-600 text-lg">₹ {totalExpense.toLocaleString()}</p>
        </div>

      </div>

      {/* Monthly Comparison Chart */}
      <h3 className="font-semibold text-md mb-3">Monthly Comparison</h3>

      {monthlyData.length === 0 ? (
        <p className="text-gray-400 text-sm">Koi data nahi hai</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `₹ ${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="income" fill="#10b981" name="Income" />
            <Bar dataKey="expense" fill="#ef4444" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      )}

    </div>
  );
};

export default InsightsPanel;
