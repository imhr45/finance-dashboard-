import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const SummaryCards = () => {

  const { transactions } = useContext(AppContext);

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card title="Balance" value={balance} color="text-blue-600" />
      <Card title="Income" value={income} color="text-green-600" />
      <Card title="Expenses" value={expense} color="text-red-600" />
    </div>
  );
};

const Card = ({ title, value, color }) => {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-gray-500 text-sm">{title}</h2>
      <p className={`text-2xl font-bold ${color}`}>₹ {value.toLocaleString()}</p>
    </div>
  );
};

export default SummaryCards;
