import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from "recharts";

import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const COLORS = [
  "#6366f1", "#f59e0b", "#10b981",
  "#ef4444", "#3b82f6", "#ec4899",
  "#8b5cf6", "#14b8a6"
];

const CategoryChart = () => {

  const { transactions } = useContext(AppContext);

  const categoryMap = {};

  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      if (!categoryMap[t.category]) categoryMap[t.category] = 0;
      categoryMap[t.category] += t.amount;
    });

  const chartData = Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key]
  }));

  if (chartData.length === 0) {
    return (
      <div className="bg-white p-4 rounded shadow mt-6 w-full min-h-[300px] flex items-center justify-center">
        <p className="text-gray-400">Koi expense data nahi hai</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow mt-6 w-full min-h-[300px]">
      <h2 className="font-bold mb-4">Spending Breakdown</h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            innerRadius={40}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`₹ ${value.toLocaleString()}`, name]}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
